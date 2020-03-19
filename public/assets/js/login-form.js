const form = document.querySelector('#login')
const password = document.querySelector('#password')
const baseUrl = 'https://ourstamil.herokuapp.com'

if (form) {
	form.addEventListener('submit', async e => {
		e.preventDefault()
		console.log(password.val)
		const res = await fetch(`${baseUrl}/auth`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ password: password.value })
		})
		if (res.status === 200) {
			alert('successfully loggedin')
			return (window.location = 'https://ourstamil.herokuapp.com/')
		}

		alert('wrong password')
	})
}
