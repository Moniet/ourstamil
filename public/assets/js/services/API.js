export async function postFlashcard(data) {
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			credentials: 'true'
		},
		body: JSON.stringify(data)
	}

	const res = await fetch(`/flashcards`, options)

	if (res.status === 400) alert("Unauthorized Action. You're not logged in.")
}
