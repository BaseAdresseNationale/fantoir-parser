const {bufferToStream} = require('./util')
const {parseStream} = require('./stream')

function parseBuffer(buffer, options = {}) {
  return parseStream(bufferToStream(buffer), options)
}

module.exports = {parseBuffer}
