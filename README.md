# fantoir-parser
Analyseur de fichiers FANTOIR

## Utilisation

### Analyser un Buffer ou une String

```js
const {parseBuffer} = require('@etalab/fantoir-parser')

const records = await parseBuffer(input, options)
```

### Analyser un flux (Stream)

```js
const {parseStream} = require('@etalab/fantoir-parser')

const records = await parseStream(inputStream, options)
```

### Créer un parser (TransformStream)

```js
const {createParser} = require('@etalab/fantoir-parser')

const parser = createParse(options)

input.pipe(parser).pipe(output)
```

### Configuration

| Nom du paramètre | Description |
| --- | --- |
| `accept` | Liste des types de valeurs acceptés (parmi `commune`, `voie`, `eof`). Par défaut `['voie']`. |
| `dateFormat` | Type de date attendu après l’extraction (parmi `iso`, `native`, `integer`). Par défaut `iso`. Le plus rapide est `integer`. |
| `memoizeDateFormat` | Booléen indiquant si on met en cache les valeurs obtenues lors de l’extraction des dates. Par défaut `false`. Pertinent pour `dateFormat: 'iso'`. |

## Licence

MIT
