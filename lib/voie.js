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

  const codeTypeVoie = record.charAt(110)
  const typeVoie = TYPE_VOIE[codeTypeVoie]
  const dates = extractDates(record, options.parseDate)
  const codeTypo = record.slice(16, 18)
  if (codeTypo === '14') {
    const result = {
      type: 'voie',
      codeTypeVoie,
      typeVoie,
      codeDepartement: parseCodeDepartement(record),
      codeCommune: record.slice(7, 12),
      codeRivoli: record.slice(12, 16),
      libelleVoie: record.slice(22, 92).trim(),
      voiePrivee: record.charAt(93) === '1',
      motDirecteur: record.slice(111, 119).trim(),
      ...dates
    }
    result.id = `${result.codeCommune}-${result.codeRivoli}`

    if (options.computeCompleteIds) {
      result.hid = `voie:${result.id}@${dates.dateAjout}`
    }

    const codeNatureVoie = record.slice(18, 22).trim()

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
      // ?
      result.lieuDitBati = record.charAt(110) === '1'
    }

    return result
  }
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
