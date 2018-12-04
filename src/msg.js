const Commands = require('./commands')

// Split arguments
const splitArgs = (msg) => ({
  cmd: msg.content.split(' ')[0],
  args: msg.content.split(' ').slice(1)
})

// Check if element is command
const isCmd = (cmd) => cmd.charAt(0) === '/' && Commands[cmd.substr(1)]

// Handle user message
const handleMessage = (msg) => {
  const { cmd, args } = splitArgs(msg)

  // If command is valid, execute the correct handler
  if (msg.author.id !== msg.client.user.id && isCmd(cmd)) {
    Commands[cmd.substr(1)](...[msg].concat(args))
  }
}

module.exports = {
  handleMessage: handleMessage
}
