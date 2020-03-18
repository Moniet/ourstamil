const express = require('express')
const router = express.Router()
const fs = require('fs')
const { promisify } = require('util')
const readFileAsync = promisify(fs.readFile)
const writeFileAsync = promisify(fs.writeFile)

router.post('/', async (req, res) => {
	const { word, definition } = req.body
	const entry = req.body

	try {
		const data = await readFileAsync('./db.json')
		const json = JSON.parse(data)
		const newData = { ...entry.data, tags: entry.data.tags.split(',') }

		json.data.push(newData)

		const result = await writeFileAsync('./db.json', JSON.stringify(json))
		res.json({ message: 'success', flashcards: newData })
	} catch (err) {
		console.log(err)
	}
})

router.get('/', async (req, res) => {
	try {
		const data = await readFileAsync('./db.json')
		const json = res.json(JSON.parse(data))
	} catch (err) {
		console.log(err)
	}
})

module.exports = router
