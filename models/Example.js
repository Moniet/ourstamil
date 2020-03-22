const mongoose = require('mongoose')
const Schema = mongoose.Schema

const exampleSchema = new Schema({
	tense: {
		type: String,
		enum: ['past', 'present', 'future']
	},
	example: {
		type: String,
		required: true
	},
	translation: {
		type: String,
		required: true
	},
	tone: {
		type: String,
		enum: ['neutral', 'polite', 'formal', 'informal', 'aggressive'],
		default: 'neutral',
		required: true
	},
	flashcard: { type: Schema.Types.ObjectId, ref: 'Flashcard' },
	created: {
		type: Date,
		default: Date.now
	}
})

const Example = mongoose.model('Example', exampleSchema)

module.exports = Example
