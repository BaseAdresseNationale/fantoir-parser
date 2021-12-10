const {extractDates, parseCodeDepartement} = require('./util')

function parseCommune(record, options = {}) {
  if (!options.parseDate) {
    throw new Error('parseDate is required')
  }

  const dates = extractDates(record, options.parseDate)

  const result = {
    type: 'commune',
    codeDepartement: parseCodeDepartement(record),
    codeCommune: record.slice(0, 2) + record.slice(3, 6),
    cleRivoli: record.charAt(10),
    nomCommune: record.slice(11, 41).trim(),
    ...dates
  }

  result.id = `${result.codeCommune}`

  if (options.computeCompleteIds) {
    result.hid = `commune:${result.codeCommune}@${dates.dateAjout}`
  }

  return result
}

module.exports = {parseCommune}
