const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const flashcards = require('./routes/flashcards')
const port = 3002

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// middleware
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')))
app.use(express.json())

// static pages
app.get('/', (req, res) => res.render('pages/index'))
app.get('/create', (req, res) => res.render('pages/create'))

// api
app.use('/flashcards', flashcards)

app.listen(port, console.log('listening at ' + port))
