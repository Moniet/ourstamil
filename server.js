const express = require('express')
const app = express()
const cors = require('cors')
const fs = require('fs')
const { promisify } = require('util')
const path = require('path')

const readFileAsync = promisify(fs.readFile)
const writeFileAsync = promisify(fs.writeFile)
const port = 3002

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
	res.render('pages/index')
})

app.post('/flashcards', async (req, res) => {
	const { word, definition } = req.body
	console.log(req.body)

	const entry = req.body

	try {
		const data = await readFileAsync('./db.json')
		const json = JSON.parse(data)
		const newData = { ...entry.data, tags: entry.data.tags.split(',') }

		json.data.push(addTags)
		const result = await writeFileAsync('./db.json', newData)
		res.json({ message: 'success', flashcards: newData })
	} catch (err) {
		console.log(err)
	}
})

app.get('/flashcards', async (req, res) => {
	try {
		const data = await readFileAsync('./db.json')
		const json = res.json(JSON.parse(data))
	} catch (err) {
		console.log(err)
	}
})

app.listen(port, console.log('listening at ' + port))
