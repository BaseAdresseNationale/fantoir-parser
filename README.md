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

## Licence

MIT
