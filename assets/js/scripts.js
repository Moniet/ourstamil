let themeButton = document.querySelector('.switch');

themeButton.addEventListener('click', changeTheme);

function changeTheme() {
	const body = document.querySelector('body');
	const data = body.dataset;

	console.log(!data.theme);

	if (!data.theme) {
		body.setAttribute('data-theme', 'light');
	} else {
		body.removeAttribute('data-theme');
	}
}
