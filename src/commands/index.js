// Handlers
const Alias = require('./alias')

// Command definitions
const Commands = {

  // Alias commands
  whois: {
    handler: Alias.list
  },
  iam: {
    handler: Alias.add
  }
}

module.exports = Commands
