const {createParser, parseStream} = require('./lib/stream')
const {parseBuffer} = require('./lib/buffer')

module.exports = {
  parseBuffer,
  parseStream,
  createParser
}
