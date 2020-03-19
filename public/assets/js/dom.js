import Hammer from './hammer'

const baseUrl = 'https://ourstamil.herokuapp.com'

// flashcard elements
const title = document.querySelector('.flashcard__title')
const difficulty = document.querySelector('.flashcard__difficulty')
const definition = document.querySelector('.details__definition')
const examples = document.querySelector('.examples')
const header = document.querySelector('#flashcard-header')

// controls
const nextBtn = document.querySelector('.next-button')
const prevBtn = document.querySelector('.prev-button')

let count = 0

async function loadFlashcards() {
	const res = await fetch(`${baseUrl}/flashcards`)

	if (res.status === 200) return await res.json()
	return null
}

function updateFlashcard(flashcards, index) {
	if (!title) return null
	console.log('updating')

	const data = flashcards[index]

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
	}
}

async function init() {
	const flashcards = await loadFlashcards()
	flashcards && updateFlashcard(flashcards.data, 0)

	title.addEventListener('click', () => {
		document.querySelector('.flashcard__body').classList.toggle('hide')
	})

	nextBtn.addEventListener('click', () =>
		updateFlashcard(flashcards.data, count + 1 < flashcards.data.length ? ++count : error())
	)
	prevBtn.addEventListener('click', () =>
		updateFlashcard(flashcards.data, count - 1 >= 0 ? --count : error())
	)

	function error(action) {
		if (action === 'start') count = 0
		if (action === 'end') count = flashcards.length - 1
		updateFlashcard(flashcards.data, count)
	}
	const container = document.querySelector('.flashcard')
	const hammer = new Hammer(container)

	hammer.on('swipeleft swiperight', ev => {
		if (ev.type === 'swipeleft') {
			updateFlashcard(
				flashcards.data,
				count + 1 < flashcards.data.length ? ++count : error('start')
			)
		}

		if (ev.type === 'swiperight') {
			updateFlashcard(flashcards.data, count - 1 >= 0 ? --count : error('end'))
		}
	})

	hammer.on('panleft panright pancancel panend', ev => {
		if (ev.type === 'panleft') {
			contai.style.transform = `translate(-${ev.distance < 0 ? 0 : ev.distance / 5}px)`
		}
		if (ev.type === 'panright') {
			contai.style.transform = `translate(${ev.distance < 0 ? 0 : ev.distance / 5}px)`
		}

		if (ev.type === 'panend') {
			contai.style.transform = `translate(0)`
		}
	})
}

init()
