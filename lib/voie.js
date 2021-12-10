const naturesVoies = require('../natures-voies.json')
const {extractDates, parseCodeDepartement} = require('./util')

const TYPE_VOIE = {
  1: 'voie',
  2: 'ensemble immobilier',
  3: 'lieu-dit',
  4: 'pseudo-voie',
  5: 'voie provisoire'
}

function parseVoie(record, options = {}) {
  if (!options.parseDate) {
    throw new Error('parseDate is required')
  }

  const codeTypeVoie = record.charAt(108)
  const typeVoie = TYPE_VOIE[codeTypeVoie]
  const dates = extractDates(record, options.parseDate)

  const result = {
    type: 'voie',
    codeTypeVoie,
    typeVoie,
    codeDepartement: parseCodeDepartement(record),
    codeCommune: record.slice(0, 2) + record.slice(3, 6),
    codeRivoli: record.slice(6, 10),
    cleRivoli: record.charAt(10),
    libelleVoie: record.slice(15, 41).trim(),
    voiePrivee: record.slice(48, 49) === '1',
    codeMajic: record.slice(103, 108),
    motDirecteur: record.slice(112, 120).trim(),
    ...dates
  }

  result.id = `${result.codeCommune}-${result.codeRivoli}`

  if (options.computeCompleteIds) {
    result.hid = `voie:${result.id}@${dates.dateAjout}`
  }

  const codeNatureVoie = record.slice(11, 15).trim()
  if (codeNatureVoie.length > 0) {
    result.codeNatureVoie = codeNatureVoie
    if (codeNatureVoie in naturesVoies) {
      const natureVoie = naturesVoies[codeNatureVoie]
      result.natureVoie = Array.isArray(natureVoie) ? natureVoie[0] : natureVoie
    } else {
      result.natureVoie = codeNatureVoie
    }
  }

  result.libelleVoieComplet = buildLibelleVoieComplet(result.natureVoie, result.libelleVoie)

  if (typeVoie === 'lieu-dit') {
    result.lieuDitBati = record.charAt(109) === '1'
  }

  return result
}

function buildLibelleVoieComplet(natureVoie, libelleVoie) {
  if (!natureVoie || natureVoie === libelleVoie || libelleVoie.startsWith(natureVoie)) {
    return libelleVoie
  }

  if (natureVoie === 'GRANDE RUE' && libelleVoie.startsWith('GRAND RUE')) {
    return libelleVoie
  }

  return natureVoie + ' ' + libelleVoie
}

module.exports = {parseVoie}
