const mongoose = require('mongoose')
const server = '127.0.0.1:27017'
const dbName = 'tamil-flashcards'

const database = () => {
	mongoose.connect(`mongodb://${server}/${dbName}`, { useNewUrlParser: true })

	const connection = mongoose.connection

	if (!connection) {
		console.log('Error Connecting to MongoDB')
	}
}

module.exports = database
