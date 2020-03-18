import { postFlashcard } from './services/API.js'

let formData = {
	category: 'word',
	definition: '',
	value: '',
	tags: [],
	difficulty: 'beginner',
	tamilText: '',
	examples: [
		{
			tense: 'Present Tense',
			example: 'Na marindita',
			translation: 'I forgot',
			tone: 'Neutral'
		},
		{
			tense: 'Present Tense',
			example: 'Ne marinditiya',
			translation: 'I forgot',
			tone: 'Neutral'
		}
	]
}
let exampleCount = 0

customElements.define(
	'form-example',
	class extends HTMLElement {
		constructor() {
			super()

			const template = document.querySelector('#form-example')
			const templateContent = template.content

			const shadowRoot = this.attachShadow({ mode: 'open' }).appendChild(
				templateContent.cloneNode(true)
			)

			const element = this.shadowRoot.firstElementChild
			element.setAttribute('data-theme', exampleCount)
			element.addEventListener('input', e => {
				const index = element.dataset.theme
				const key = e.target.name
				const value = e.target.value

				const data = formData.examples[index] || {}
				data[key] = value

				formData.examples[index] = data
			})

			const lastChild = element.lastElementChild

			lastChild.addEventListener('click', e => {
				exampleCount--
				const index = element.dataset.theme
				delete formData.examples[index]

				element.remove()
			})

			exampleCount++
		}
	}
)

function updateFormData() {
	const generalForm = document.querySelector('#general-form-data')
	generalForm.addEventListener('input', e => {
		formData[e.target.name] = e.target.value
		console.log(formData)
	})
}

function addExample() {
	const add = document.querySelector('#add')
	add.addEventListener('click', () => {
		const examples = document.querySelector('#examples')
		const formExample = document.createElement('form-example')
		examples.appendChild(formExample)
	})
}

function handleSubmit(e) {
	e.preventDefault()

	const data = Object.assign(formData, {
		examples: Object.values(formData.examples)
	})

	postFlashcard({ data })
}

document.addEventListener('DOMContentLoaded', () => {
	const form = document.querySelector('form')
	form.addEventListener('submit', handleSubmit)

	updateFormData()
	addExample()
})
