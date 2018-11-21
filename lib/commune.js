const {extractDates, parseCodeDepartement} = require('./util')

function parseCommune(record) {
  const dates = extractDates(record)

  const result = {
    type: 'commune',
    codeDepartement: parseCodeDepartement(record),
    codeCommune: record.substr(0, 2) + record.substr(3, 3),
    cleRivoli: record.charAt(10),
    nomCommune: record.substr(11, 30).trim(),
    ...dates
  }

  result.id = `${result.codeCommune}`
  result.hid = `commune:${result.codeCommune}@${dates.dateAjout}`

  return result
}

module.exports = {parseCommune}
