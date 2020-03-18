const formData = {}
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

			this.shadowRoot.firstElementChild.addEventListener('input', e => {
				console.log(exampleCount)
			})
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

document.addEventListener('DOMContentLoaded', () => {
	updateFormData()
})
