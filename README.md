# fantoir-parser
Analyseur de fichiers FANTOIR

## Utilisation

### Analyser un Buffer ou une String

```js
const {parseBuffer} = require('@ban-team/fantoir-parser')

const records = await parseBuffer(input, options)
```

### Analyser un flux (Stream)

```js
const {parseStream} = require('@ban-team/fantoir-parser')

const records = await parseStream(inputStream, options)
```

### Créer un parser (TransformStream)

```js
const {createParser} = require('@ban-team/fantoir-parser')

const parser = createParse(options)

input.pipe(parser).pipe(output)
```

### Configuration

| Nom du paramètre | Description |
| --- | --- |
| `accept` | Liste des types de valeurs acceptés (parmi `commune`, `voie`, `eof`). Par défaut `['voie']`. |
| `dateFormat` | Type de date attendu après l’extraction (parmi `iso`, `native`, `integer`). Par défaut `iso`. Le plus rapide est `integer`. |
| `memoizeDateFormat` | Booléen indiquant si on met en cache les valeurs obtenues lors de l’extraction des dates. Par défaut `false`. Pertinent pour `dateFormat: 'iso'`. |
| `computeCompleteIds` | Booléen indiquant si l’analyseur doit construire une identifiant complet avec date de début. Par défaut : `false` |

## Licence

MIT
