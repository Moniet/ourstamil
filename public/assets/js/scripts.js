const themeButton = document.querySelector('.theme-button')
const body = document.querySelector('body')
const data = body.dataset

function changeTheme() {
	if (!data.theme) {
		body.setAttribute('data-theme', 'dark')
		localStorage.setItem('theme', 'dark')
	} else {
		body.removeAttribute('data-theme')
		localStorage.setItem('theme', '')
	}
}

const baseUrl = 'http://localhost:3002'

const loadFlashcards = async () => {
	const baseUrl = 'http://localhost:3002'

	const res = await fetch(`${baseUrl}/flashcards`)

	if (res.status === 200) {
		return await res.json()
	}

	return null
}

document.addEventListener('DOMContentLoaded', async () => {
	const theme = localStorage.getItem('theme')
	if (theme === 'dark') body.setAttribute('data-theme', 'dark')

	body.style.opacity = 1

	const flashcards = await loadFlashcards()
	themeButton.addEventListener('click', changeTheme)
})
