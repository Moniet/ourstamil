require('dotenv').config()
const mongoose = require('mongoose')
const uri = process.env.MONGODB_URI

const database = () => {
	mongoose.connect(uri, [{ useNewUrlParser: true, useUnifiedTopology: true }])

	const connection = mongoose.connection

	if (!connection) {
		console.log('Error Connecting to MongoDB')
	}
}

module.exports = database
