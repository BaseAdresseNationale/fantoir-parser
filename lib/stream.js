const {Transform} = require('stream')
const split = require('split2')
const pumpify = require('pumpify')
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
  'libelleVoie',
  'voiePrivee',
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

function parseRecord(record, {accept, parseDate, computeCompleteIds}) {
  const codeTypo = record.slice(16, 18)
  // Commune record
  if (codeTypo === '13' && accept.includes('commune')) {
    return parseCommune(flatten(record), {parseDate, computeCompleteIds})
  }

  // Voie
  if (codeTypo === '14' && accept.includes('voie')) {
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
    new Transform({
      transform(chunk, enc, cb) {
        const parsedValue = parseRecord(chunk, {accept, parseDate, computeCompleteIds})
        if (parsedValue) {
          this.push(parsedValue)
        }

        cb()
      },
      objectMode: true
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
