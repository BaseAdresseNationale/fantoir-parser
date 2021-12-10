const split = require('split2')
const pumpify = require('pumpify')
const through = require('through2')
const getStream = require('get-stream')
const {memoize} = require('lodash')

const {parseVoie} = require('./voie')
const {parseCommune} = require('./commune')
const dates = require('./dates')

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

function parseRecord(record, {accept, parseDate, computeCompleteIds}) {
  // EOF
  if (record.slice(0, 6) === '999999') {
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
      return parseCommune(flatten(record), {parseDate, computeCompleteIds})
    }

    return
  }

  // Voie
  if (accept.includes('voie')) {
    return parseVoie(flatten(record), {parseDate, computeCompleteIds})
  }
}

function createParseDate(dateFormat = 'iso') {
  if (dateFormat === 'iso') {
    return dates.parseDateISO
  }

  if (dateFormat === 'native') {
    return dates.parseDateNative
  }

  if (dateFormat === 'integer') {
    return dates.parseDateInteger
  }

  throw new Error('No dateFormat given')
}

function createParser(options = {}) {
  const accept = options.accept || ['voie']
  const parseDateFn = createParseDate(options.dateFormat || 'iso')
  const parseDate = options.memoizeParseDate ? memoize(parseDateFn) : parseDateFn
  const {computeCompleteIds} = options

  return pumpify.obj(
    split(),
    through.obj(function (chunk, enc, cb) {
      const parsedValue = parseRecord(chunk, {accept, parseDate, computeCompleteIds})
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
