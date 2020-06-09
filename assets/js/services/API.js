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
	if (res.status === 401) return alert("Unauthorized Action. You're not logged in.")
	if (res.status === 400) return alert("Woops! Could not create Flashcard. Somethings missing :O")
	if (!res.ok) return alert("Server May be offline.")

	alert("Yaay! Successfully created the tings!")
}

export async function loadFlashcards() {
	const res = await fetch(`/flashcards`)

	if (res.status === 200) return await res.json()
	return null
}