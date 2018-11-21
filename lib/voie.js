const naturesVoies = require('../natures-voies.json')
const {extractDates, parseCodeDepartement} = require('./util')

const TYPE_VOIE = {
  1: 'voie',
  2: 'ensemble immobilier',
  3: 'lieu-dit',
  4: 'pseudo-voie',
  5: 'voie provisoire'
}

function parseVoie(record) {
  const codeTypeVoie = record.charAt(108)
  const typeVoie = TYPE_VOIE[codeTypeVoie]
  const dates = extractDates(record)

  const result = {
    type: 'voie',
    codeTypeVoie,
    typeVoie,
    codeDepartement: parseCodeDepartement(record),
    codeCommune: record.substr(0, 2) + record.substr(3, 3),
    codeRivoli: record.substr(6, 4),
    cleRivoli: record.charAt(10),
    libelleVoie: record.substr(15, 26).trim(),
    voiePrivee: record.substr(48, 1) === '1',
    codeMajic: record.substr(103, 5),
    motDirecteur: record.substr(112, 8).trim(),
    ...dates
  }

  result.id = `${result.codeCommune}-${result.codeRivoli}`
  result.hid = `voie:${result.id}@${dates.dateAjout}`

  const codeNatureVoie = record.substr(11, 4).trim()
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
