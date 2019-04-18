const test = require('ava')
const {parseDateISO} = require('../lib/dates')

test('parseDateISO', t => {
  t.is(parseDateISO('2018070'), '2018-03-11')
})
