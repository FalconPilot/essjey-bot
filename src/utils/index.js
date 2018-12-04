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

module.exports = {
  checkArgs: checkArgs
}
