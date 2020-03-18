const baseUrl = 'http://localhost:3002'

export async function postFlashcard(data) {
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
		body: JSON.stringify(data)
	}

	const res = await fetch(`${baseUrl}/flashcards`, options)
}
