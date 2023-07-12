const test = require('ava')
const {parseVoie} = require('../lib/voie')
const {parseDateISO} = require('../lib/dates')

test('parse voie', t => {
  const rawRecord = '991000197101A01114RES AIR FRANCE DUGAZON                                                    0 00000000198701012DUGAZON 00000000'
  t.deepEqual(parseVoie(rawRecord, {parseDate: parseDateISO, computeCompleteIds: true}), {
    type: 'voie',
    dateAjout: '1987-01-01',
    codeCommune: '97101',
    codeDepartement: '971',
    codeRivoli: 'A011',
    codeNatureVoie: 'RES',
    codeTypeVoie: '2',
    hid: 'voie:97101-A011@1987-01-01',
    id: '97101-A011',
    libelleVoie: 'AIR FRANCE DUGAZON',
    libelleVoieComplet: 'RESIDENCE AIR FRANCE DUGAZON',
    motDirecteur: 'DUGAZON',
    natureVoie: 'RESIDENCE',
    typeVoie: 'ensemble immobilier',
    voiePrivee: false,
  })
})
