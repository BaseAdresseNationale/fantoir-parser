const intoStream = require('into-stream')
const {parseStream} = require('./stream')

function parseBuffer(buffer, options = {}) {
  return parseStream(intoStream(buffer), options)
}

module.exports = {parseBuffer}
