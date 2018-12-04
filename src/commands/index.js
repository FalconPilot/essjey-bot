// Handlers
const Alias = require('./alias')

// Command definitions
const Commands = {

  // Alias commands
  whois: Alias.list,
  iam: Alias.add
}

module.exports = Commands
