const fs = require('fs')
const path = require('path')
const csvParser = require('csv-parser')

const inputFile = path.join(__dirname, '..', 'data', 'natures_voies.csv')
const outputFile = path.join(__dirname, '..', 'natures-voies.json')

const naturesVoies = {}

fs.createReadStream(inputFile, {encoding: 'utf8'})
  .pipe(csvParser())
  .on('data', row => {
    const {code, libelle} = row
    naturesVoies[code] = libelle.includes(';') ? libelle.split(';') : libelle
  })
  .on('end', () => {
    fs.writeFileSync(outputFile, JSON.stringify(naturesVoies), {encoding: 'utf8'})
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(0)
  })
