customElements.define(
	'flashcard-example',
	class extends HTMLElement {
		constructor() {
			super()

			const template = document.querySelector('#example')
			const templateContent = template.content

			const shadowRoot = this.attachShadow({ mode: 'open' }).appendChild(
				templateContent.cloneNode(true)
			)
		}
	}
)
