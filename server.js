const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
const port = 3002
const database = require('./database')

require('dotenv').config()

database()

// controllers
const flashcards = require('./routes/flashcards')
const auth = require('./routes/auth')

// config
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')))

// middleware
app.use(express.json())
app.use(
	cors({
		credentials: true
	})
)
app.use(cookieParser())

// static pages
app.get('/', (req, res) => res.render('pages/index'))
app.get('/create', (req, res) => res.render('pages/create'))
app.get('/login', (req, res) => res.render('pages/login'))

// api
app.use('/flashcards', flashcards)
app.use('/auth', auth)

app.listen(process.env.PORT || port, () => console.log('listening at ' + port))
