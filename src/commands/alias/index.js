const Storage = require('node-persist')

const { checkArgs, notifyError } = require('../../utils')

const ALIAS_LIST = 'alias_list'

// Set a new user alias
const add = ({ msg, cmd }, nickname, pagelink) => {

  // Function usage
  const usage = [
    'Usage : `/iam NICKNAME PAGELINK`,',
    'Where `NICKNAME` is your creator\'s nickname and `PAGELINK` is a link to your creator page.',
    '**EXAMPLE :** `/iam DevinTownsend https://google.com`',
    '',
    '**WARNING : Do NOT use any space when writing your nickname !**',
    '`/iam jean_jacques LINK` = Correct',
    '`/iam Jean Jacques LINK` = Incorrect'
  ].join('\n')

  // Check arguments and start pipe
  checkArgs([nickname, pagelink], usage)
    .catch(usage => msg.reply(usage))
    .then(() => Storage.getItem(ALIAS_LIST))
    .then(data => data || {})
    .then(data => Storage.setItem(ALIAS_LIST, {
      ...data,
      [msg.author.id]: {
        nickname: nickname,
        pagelink: pagelink
      }
    }))

    // Notify errors
    .catch(notifyError(msg, cmd))
}

// List all aliased users
const list = ({ msg, cmd }) => {
  Storage.getItem(ALIAS_LIST)
    .then(data => data || {})

    // Fetch server data to get server nickname
    .then(data => Promise.all(Object
      .entries(data)
      .map(([id, properties]) => {
        const user = msg.client.users.get(id)
        return msg.channel.guild.fetchMember(user)
          .then(serverData => ({
            serverData: serverData,
            properties: properties
          }))
      })
    ))

    // Use fetched data to reply
    .then(data => {

      // Compose message
      const list = data
        .map(({ serverData, properties }) => {
          const nick = serverData.nickname || serverData.user.username
          return `**${nick}** : ${properties.nickname} / <${properties.pagelink}>`
        })
        .join('\n')
      
      // Return composed message
      msg.reply(`Here's the complete user list :\n\n${list}`)
    })

    // Handle errors
    .catch(notifyError(msg, cmd))
}

module.exports = {
  add: add,
  list: list
}
