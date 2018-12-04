// Check required arguments and return promise
const checkArgs = (args, usage) => {
  return new Promise((resolve, reject) => {
    if (args.length === args.filter(arg => arg).length) {
      resolve(args)
    } else {
      reject(usage)
    }
  })
}

// Generic error notification
const notifyError = (msg, cmd) => (err) => {
  console.log(`[ERROR] (${cmd}) Details below`)
  console.log(err)
  const lines = [
    `Sorry, an error occured when you tried using the \`${cmd}\` command ! :'(`,
    '*If the error persists and no one noticed, try contacting a mod.*'
  ].join('\n')
  msg.reply(lines)
}

module.exports = {
  checkArgs: checkArgs,
  notifyError: notifyError
}
