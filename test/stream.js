const test = require('ava')
const intoStream = require('into-stream')
const {parseStream} = require('../lib/stream')

test('parse input stream', async t => {
  const input = intoStream([
    '991000197101A01114RES AIR FRANCE DUGAZON                                                    0 00000000198701012DUGAZON 00000000',
    '991000197101A01414LOT PETIT ACAJOU                                                          0 00000000199602272ACAJOU  20051220'
  ].join('\n'))
  const records = await parseStream(input)
  t.is(records.length, 2)
  t.is(records[0].id, '97101-A011')
})
