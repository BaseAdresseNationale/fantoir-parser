function parseDateNative(str) {
  if (str.length !== 8) {
    throw new Error('parseDate is expecting a string with size 8. Given: ' + str.length)
  }

  const year = str.slice(0, 4)
  const month = str.slice(4, 6) - 1
  const day = str.slice(6, 8)
  const date = new Date(year, month, day, 1, 0, 0) // UTC
  return date
}

function parseDateISO(str) {
  const date = parseDateNative(str)
  return date.toISOString().slice(0, 10)
}

function parseDateInteger(str) {
  if (str.length !== 8) {
    throw new Error('parseDate is expecting a string with size 8. Given: ' + str.length)
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
