// Library imports
require('dotenv').config()
const Discord = require('discord.js')
const Storage = require('node-persist')

// Local imports
const { version } = require('./package.json')
const { handleMessage } = require('./src/msg.js')

// Initialize client
const client = new Discord.Client()

// Log bot version when client is ready
client.on('ready', () => {
  console.log(`\n~> EssJey BOT v${version} up and running ! \\o/ `)
})

// Handle messages
client.on('message', handleMessage)

// Launch client when storage is initialized
console.log('Stargint EssJey bot...')
Storage.init()
  .then(() => console.log('|> Storage ready !'))
  .then(() => client.login(process.env.DISCORD_BOT_TOKEN))
