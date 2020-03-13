const express = require('express');
const app = express();
const fs = require('fs');
const { promisify } = require('util');

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
const port = 3002;

app.use(express.json());

app.post('/flashcards', async (req, res) => {
	const { word, definition } = req.body;
	console.log(req.body);

	const entry = {
		word,
		definition
	};

	try {
		const data = await readFileAsync('./db.json');
		const json = JSON.parse(data);
		json.data.push(entry);
		const newData = JSON.stringify(json);
		const result = await writeFileAsync('./db.json', newData);
		console.log(result);
		res.json({ message: 'success', flashcards: newData });
	} catch (err) {
		console.log(err);
	}
});

app.get('/flashcards', async (req, res) => {
	try {
		const data = await readFileAsync('./db.json');
		res.json(data);
	} catch (err) {
		console.log(err);
	}
});

app.listen(port, console.log('listening at ' + port));
