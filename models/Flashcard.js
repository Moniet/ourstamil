const mongoose = require('mongoose')
const Schema = mongoose.Schema

const flashcardSchema = new Schema({
	definition: {
		type: String,
		required: true
	},
	value: {
		type: String,
		required: true
	},
	tags: [String],
	tamilText: String,
	difficulty: {
		type: String,
		enum: ['beginner', 'intermediate', 'advanced'],
		default: 'beginner'
	},
	created: {
		type: Date,
		default: Date.now
	},
	examples: [{ type: Schema.Types.ObjectId, ref: 'Example' }]
})

const Flashcard = mongoose.model('Flashcard', flashcardSchema)

module.exports = Flashcard
