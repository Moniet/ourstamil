const express = require('express')
const router = express.Router()
const fs = require('fs')
const { promisify } = require('util')
const readFileAsync = promisify(fs.readFile)
const writeFileAsync = promisify(fs.writeFile)
const jwt = require('jsonwebtoken')
const PASSWORD = process.env.PASSWORD
const SECRET = process.env.SECRET
const Flashcard = require('../models/Flashcard')
const Example = require('../models/Example')

router.post('/', async (req, res) => {
	const token = req.cookies.access_token
	const decoded = jwt.decode(token, SECRET)

	if (!token || !decoded || PASSWORD !== decoded.password) return res.status(400).end()

	const { value, definition, tags, difficulty, tamilText, examples } = req.body.data
	const entry = req.body

	try {
		const flashcard = new Flashcard({ value, definition, tags, tamilText, difficulty })
		const exampleIds = []

		for (let dataSet of examples) {
			const example = new Example(Object.assign(dataSet, { flashcard: flashcard._id }))
			flashcard.examples.push(example)
			await example.save()
		}

		await flashcard.updateOne({ examples: exampleIds })
		await flashcard.save()

		const result = await Flashcard.find({ _id: flashcard._id })
			.populate('examples')
			.exec()

		res.status(200).json({
			message: 'success',
			flashcards: result
		})
	} catch (err) {
		res.status(400).end()
	}
})

router.get('/', async (req, res) => {
	try {
		const data = await Flashcard.find({})
			.sort({ created: -1 })
			.populate('examples')
			.exec()
		const json = res.json({ data })
	} catch (err) {
		console.log(err)
	}
})

module.exports = router
