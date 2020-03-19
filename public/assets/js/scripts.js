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

document.addEventListener('DOMContentLoaded', async () => {
	body.style.opacity = 1
	const theme = localStorage.getItem('theme')

	if (theme === 'dark') body.setAttribute('data-theme', 'dark')
	themeButton.addEventListener('click', changeTheme)

	const res = await fetch('https://ourstamil.herokuapp.com/auth/loggedIn', {
		method: 'GET',
		credentials: 'include'
	})

	if (res.status === 200) document.querySelector('.create-link').style.display = 'block'
})
