const {extractDates, parseCodeDepartement} = require('./util')

function parseCommune(record, options = {}) {
  if (!options.parseDate) {
    throw new Error('parseDate is required')
  }

  // Les communes ont un code typo = 13
  const dates = extractDates(record, options.parseDate)
  const codeTypo = record.slice(16, 18)
  if (codeTypo === '13') {
    const result = {
      type: 'commune',
      codeDepartement: parseCodeDepartement(record),
      codeCommune: record.slice(7, 12),
      nomCommune: record.slice(18, 88).trim(),
      ...dates
    }

    result.id = `${result.codeCommune}`

    if (options.computeCompleteIds) {
      result.hid = `commune:${result.codeCommune}@${dates.dateAjout}`
    }

    return result
  }
}

module.exports = {parseCommune}
