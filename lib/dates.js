function parseDateNative(str) {
  if (str.length !== 7) {
    throw new Error('parseDate is expecting a string with size 7. Given: ' + str.length)
  }

  const year = str.slice(0, 4)
  const dayOfYear = str.slice(4, 7)
  const date = new Date(year) // UTC
  date.setDate(dayOfYear)
  return date
}

function parseDateISO(str) {
  const date = parseDateNative(str)
  return date.toISOString().slice(0, 10)
}

function parseDateInteger(str) {
  if (str.length !== 7) {
    throw new Error('parseDate is expecting a string with size 7. Given: ' + str.length)
  }

  return Number.parseInt(str, 10)
}

function convertIntToISO(dateInt) {
  const d = dateInt % 1000
  const y = (dateInt - d) / 1000
  const date = new Date(y) // UTC
  date.setDate(d)
  return date
}

module.exports = {parseDateISO, parseDateInteger, parseDateNative, convertIntToISO}
