import Hammer from './hammer'
// API
import { loadFlashcards } from './services/API'

// flashcard elements
const title = document.querySelector('.flashcard__title')
const difficulty = document.querySelector('.flashcard__difficulty')
const definition = document.querySelector('.details__definition')
const examples = document.querySelector('.examples')
const header = document.querySelector('#flashcard-header')
const date = document.querySelector('.flashcard__date')

// controls
const nextBtn = document.querySelector('.next-button')
const prevBtn = document.querySelector('.prev-button')

let count = 0

function updateFlashcard(flashcards, index) {
	const data = flashcards[index]

	if (!!data) {
		const time = new Date(data.created)
		const month = time.getMonth()
		const day = time.getDate()
		title.textContent = data.value
		difficulty.textContent = data.difficulty
		definition.textContent = data.definition
		date.textContent = `${day < 10 ? '0' + day : day}/${
			month + 1 < 10 ? '0' + (month + 1) : month + 1
		}/${time.getFullYear()}`

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

			title.textContent = example.example || 'default'
			translation.textContent = example.translation || 'default'
			tense.textContent = example.tense || 'default'
			tone.textContent = example.tone || 'default'

			container.setAttribute('data-id', example._id)

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

	updateFlashcard(flashcards.data, 0)

	title.addEventListener('click', () => {
		document.querySelector('.flashcard__body').classList.toggle('hide')
	})
	nextBtn.addEventListener('click', () =>
		updateFlashcard(flashcards.data, count + 1 < flashcards.data.length ? ++count : error())
	)
	prevBtn &&
		prevBtn.addEventListener('click', () =>
			updateFlashcard(flashcards.data, count - 1 >= 0 ? --count : error())
		)

	function error(action) {
		if (action === 'start') count = 0
		if (action === 'end') count = flashcards.length - 1
		updateFlashcard(flashcards.data, count)
	}
	const container = document.querySelector('.container')
	const hammer = new Hammer(container)
	const tracker = new Hammer(title)

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

	tracker.on('panleft panright pancancel panend panup pandown', ev => {
		if (ev.type === 'panleft') {
			header.style.transform = `translate(-${ev.distance < 0 ? 0 : ev.distance / 5}px)`
		}
		if (ev.type === 'panright') {
			header.style.transform = `translate(${ev.distance < 0 ? 0 : ev.distance / 5}px)`
		}

		if (ev.type === 'panend') {
			header.style.transform = `translate(0)`
		}
	})
}

if (title) init()
