function extractDates(record, parseDate) {
  const result = {}

  const dateAjout = record.slice(81, 88)
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

  const dateAnnulation = record.slice(74, 81)
  if (dateAnnulation !== '0000000') {
    result.dateAnnulation = parseDate(dateAnnulation)
  }

  return result
}

function parseCodeDepartement(str) {
  if (str.slice(0, 2) === '97') {
    return str.slice(0, 3)
  }

  return str.slice(0, 2)
}

module.exports = {parseCodeDepartement, extractDates}
