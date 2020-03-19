import { postFlashcard } from './services/API.js'

let exampleCount = 0
const doc = (document._currentScript || document.currentScript).ownerDocument
const template = document.querySelector('#form-example')
const templateContent = template.content

customElements.define(
	'form-example',
	class extends HTMLElement {
		constructor() {
			super()
		}

		connectedCallback() {
			const temp = document.importNode(templateContent, true)
			this.appendChild(temp)

			const element = this.firstElementChild
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

let formData = {
	category: 'word',
	definition: '',
	value: '',
	tags: '',
	difficulty: 'beginner',
	tamilText: '',
	examples: []
}

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

async function handleSubmit(e) {
	e.preventDefault()

	const data = Object.assign(formData, {
		examples: Object.values(formData.examples)
	})

	await postFlashcard({ data })

	const inputs = a
}

document.addEventListener('DOMContentLoaded', () => {
	const form = document.querySelector('#create-form')
	form.addEventListener('submit', handleSubmit)

	updateFormData()
	addExample()
})
