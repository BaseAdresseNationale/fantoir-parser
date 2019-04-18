const {PassThrough} = require('stream')

function bufferToStream(buffer) {
  const stream = new PassThrough()
  stream.push(buffer)
  stream.end()
  return stream
}

function extractDates(record, parseDate) {
  const result = {}

  const dateAjout = record.substr(81, 7)
  if (dateAjout === '0000000') {
    throw new Error('Données inattendues : date d’ajout manquante')
  }

  result.dateAjout = parseDate(dateAjout)

  const annulation = record.charAt(73)
  if (annulation === 'Q') {
    result.typeAnnulation = 'avec transfert'
  }

  if (annulation === 'O') {
    result.typeAnnulation = 'sans transfert'
  }

  const dateAnnulation = record.substr(74, 7)
  if (dateAnnulation !== '0000000') {
    result.dateAnnulation = parseDate(dateAnnulation)
  }

  return result
}

function parseCodeDepartement(str) {
  if (str.substr(0, 2) === '97') {
    return str.substr(0, 3)
  }

  return str.substr(0, 2)
}

module.exports = {bufferToStream, parseCodeDepartement, extractDates}
