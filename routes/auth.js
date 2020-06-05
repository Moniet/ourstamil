const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET
const PASSWORD = process.env.PASSWORD

router.post('/', (req, res) => {
	const password = req.body.password

	if (password === PASSWORD) {
		const token = jwt.sign({ password }, process.env.SECRET)
		res.cookie('access_token', token, {
			httpOnly: true
		})
		return res.status(200).end()
	}

	res.status(400).json({ error: 'Unauthorized' })
})

router.get('/loggedIn', (req, res) => {
	const token = req.cookies.access_token

	if (!token) return res.status(401).json({ error: 'Unauthorized' })

	const decoded = jwt.decode(token, SECRET)

	if (decoded.password === PASSWORD) {
		return res.redirect(200, '/')
	}
})

module.exports = router
