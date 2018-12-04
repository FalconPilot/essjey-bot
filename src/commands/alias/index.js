const Storage = require('node-persist')

const { checkArgs } = require('../../utils')

const ALIAS_LIST = 'alias_list'

// Set a new user alias
const add = (msg, nickname, pagelink) => {

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
    .then(console.log)
}

// List all aliased users
const list = (msg) => {
  Storage.getItem(ALIAS_LIST)
    .then(data => data || {})
    .then(data => Promise.all(Object
        .entries(data)
        .map(([id, properties]) => {
          const user = msg.client.users.get(id)
          return msg.channel.guild.fetchMember(user)
          // return `**${serverNick.nickname}** : ${properties.nickname} / <${properties.pagelink}>`
        })
    ))
    .then(console.log)
}

module.exports = {
  add: add,
  list: list
}
