const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.json());

app.get('/bestmove', (req, res) => {
    res.status(200).send({
        piece: 'pawn',
        square: 'e4'
    });
});

app.post('/makemove/:move', (req, res) => {
    const { move } = req.params;
    const { notes } = req.body;

    if (!notes) {
        res.status(418).send({ message: "Note is required!" });
    }

    res.send({
        move: `Your move is ${move} and the note is ${notes}`
    });
});

app.listen(
    PORT,
    () => console.log(`Server running on http://localhost:${PORT}`)
);