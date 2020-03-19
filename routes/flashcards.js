const express = require('express')
const router = express.Router()
const fs = require('fs')
const { promisify } = require('util')
const readFileAsync = promisify(fs.readFile)
const writeFileAsync = promisify(fs.writeFile)
const jwt = require('jsonwebtoken')
const PASSWORD = process.env.PASSWORD
const SECRET = process.env.SECRET

router.post('/', async (req, res) => {
	const token = req.cookies.access_token
	const decoded = jwt.decode(token, SECRET)

	if (!token || !decoded || PASSWORD !== decoded.password) return res.status(400).end()

	const { word, definition } = req.body
	const entry = req.body

	try {
		const data = await readFileAsync('./db.json')
		const json = JSON.parse(data)
		const newData = {
			...entry.data,
			createdAt: new Date()
		}

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
		const parsed = JSON.parse(data)
		const newData = { data: parsed.data.reverse() }
		const json = res.json(newData)
	} catch (err) {
		console.log(err)
	}
})

module.exports = router
