function extractDates(record, parseDate) {
  const result = {}

  const dateAjout = record.slice(102, 110)
  if (dateAjout === '0000000') {
    throw new Error('Données inattendues : date d’ajout manquante')
  }

  result.dateAjout = parseDate(dateAjout)

  const annulation = record.charAt(93)
  if (annulation === 'Q') {
    result.typeAnnulation = 'avec transfert'
  }

  if (annulation === 'O') {
    result.typeAnnulation = 'sans transfert'
  }

  const dateAnnulation = record.slice(94, 101)
  if (dateAnnulation !== '0000000') {
    result.dateAnnulation = parseDate(dateAnnulation)
  }

  return result
}

function parseCodeDepartement(str) {
  if (str.slice(7, 9) === '97') {
    return str.slice(7, 10)
  }

  return str.slice(7, 9)
}

module.exports = {parseCodeDepartement, extractDates}
