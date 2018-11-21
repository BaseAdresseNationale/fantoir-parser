const test = require('ava')
const {parseVoie} = require('../lib/voie')

test('parse voie', t => {
  const rawRecord = '5400840020FALL DES ACACIAS                N  3  0          00000000000000 00000001987001               001151   ACACIAS'
  t.deepEqual(parseVoie(rawRecord), {
    type: 'voie',
    dateAjout: '1987-01-01',
    cleRivoli: 'F',
    codeCommune: '54084',
    codeDepartement: '54',
    codeMajic: '00115',
    codeNatureVoie: 'ALL',
    codeRivoli: '0020',
    codeTypeVoie: '1',
    hid: 'voie:54084-0020@1987-01-01',
    id: '54084-0020',
    libelleVoie: 'DES ACACIAS',
    libelleVoieComplet: 'ALLEE DES ACACIAS',
    motDirecteur: 'ACACIAS',
    natureVoie: 'ALLEE',
    typeVoie: 'voie',
    voiePrivee: false
  })
})
