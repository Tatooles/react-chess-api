const express = require('express');
const stockfish = require('stockfish');
const engine = await stockfish();
const app = express();
const PORT = 8080;

app.use(express.json());

engine.onmessage = function (event) {
    //NOTE: Web Workers wrap the response in an object.
    console.log(event.data ? event.data : event);
};


console.log(engine);
// engine.postMessage("uci");

// run_engine();

// const run_engine = async () => {
//     await engine().then((val) => {

//     })
// }

app.get('/bestmove', (req, res) => {
    // Probably want to use a get with query params
    // https://stackoverflow.com/questions/6912584/how-to-get-get-query-string-variables-in-express-js-on-node-js
    // Then use UCI commands to generate the best move and return that
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
    () => console.log(`Server running on ${PORT}`)
);