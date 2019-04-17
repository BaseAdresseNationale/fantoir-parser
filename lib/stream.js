const split = require('split2')
const pumpify = require('pumpify')
const through = require('through2')
const getStream = require('get-stream')

const {parseVoie} = require('./voie')
const {parseCommune} = require('./commune')

const FIELDS = [
  'id',
  'codeTypeVoie',
  'typeVoie',
  'codeDepartement',
  'codeCommune',
  'codeRivoli',
  'cleRivoli',
  'libelleVoie',
  'voiePrivee',
  'codeMajic',
  'codeNatureVoie',
  'natureVoie',
  'dateAnnulation',
  'dateAjout',
  'typeAnnulation',
  'lieuDitBati',
  'motDirecteur'
]

function flatten(record) {
  return Buffer.from(record).toString()
}

function isAlphaNumeric(char) {
  return (char >= '0' && char <= '9') || (char >= 'A' && char <= 'Z')
}

function parseRecord(record, accept = ['voie']) {
  // EOF
  if (record.substr(0, 6) === '999999') {
    if (accept.includes('eof')) {
      return {type: 'eof'}
    }

    return
  }

  // Initial record
  if (!isAlphaNumeric(record.charAt(0))) {
    return
  }

  // Direction record
  if (!isAlphaNumeric(record.charAt(3))) {
    return
  }

  // Commune record
  if (!isAlphaNumeric(record.charAt(6))) {
    if (accept.includes('commune')) {
      return parseCommune(flatten(record))
    }

    return
  }

  // Voie
  if (accept.includes('voie')) {
    return parseVoie(flatten(record))
  }
}

function createParser(options = {}) {
  const accept = options.accept || ['voie']
  return pumpify.obj(
    split(),
    through.obj(function (chunk, enc, cb) {
      const parsedValue = parseRecord(chunk, accept)
      if (parsedValue) {
        this.push(parsedValue)
      }

      cb()
    })
  )
}

function parseStream(stream, options = {}) {
  return getStream.array(
    pumpify.obj(
      stream,
      createParser(options)
    )
  )
}

module.exports = {
  createParser,
  parseStream,
  FIELDS
}
