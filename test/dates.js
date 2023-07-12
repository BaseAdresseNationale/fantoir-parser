const test = require('ava')
const {parseDateISO} = require('../lib/dates')

test('parseDateISO', t => {
  t.is(parseDateISO('20180311'), '2018-03-11')
})
