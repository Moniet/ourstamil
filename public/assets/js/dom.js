const baseUrl = 'http://localhost:3002'

// flashcard elements
const title = document.querySelector('.flashcard__title')
const difficulty = document.querySelector('.flashcard__difficulty')
const definition = document.querySelector('.flashcard__body-definition')
const examples = document.querySelector('.examples')

// controls
const nextBtn = document.querySelector('.next-button')
const prevBtn = document.querySelector('.prev-button')

let count = 0

async function loadFlashcards() {
	const baseUrl = 'http://localhost:3002'
	const res = await fetch(`${baseUrl}/flashcards`)

	if (res.status === 200) return await res.json()
	return null
}

// get next / prev card
function getCardData(flashcards, index) {
	return flashcards[index]
}

// update dom

function updateFlashcard(flashcards, index) {
	const data = getCardData(flashcards, index)

	if (!!data) {
		title.textContent = data.value
		difficulty.textContent = data.difficulty
		definition.textContent = data.definition

		examples.textContent = ''
		data.examples.forEach(example => {
			const container = document.createElement('flashcard-example')
			const title = document.createElement('p')
			const translation = document.createElement('p')
			const tense = document.createElement('p')
			const tone = document.createElement('p')

			title.slot = 'title'
			translation.slot = 'translation'
			tense.slot = 'tense'
			tone.slot = 'tone'

			title.textContent = example.example
			translation.textContent = example.translation
			tense.textContent = example.tense
			tone.textContent = example.tone

			container.appendChild(title)
			container.appendChild(translation)
			container.appendChild(tense)
			container.appendChild(tone)

			examples.appendChild(container)
		})

		return null
	}
}

function error() {
	alert('end of the line bech!')
}

async function init() {
	const flashcards = await loadFlashcards()
	updateFlashcard(flashcards.data, 0)

	nextBtn.addEventListener('click', () =>
		updateFlashcard(flashcards.data, count + 1 < flashcards.data.length ? ++count : error())
	)
	prevBtn.addEventListener('click', () =>
		updateFlashcard(flashcards.data, count - 1 >= 0 ? --count : error())
	)
}

init()
