const express = require('express');
const stockfish = require('stockfish');
const engine = stockfish();
const app = express();
const PORT = 8080;

app.use(express.json());

engine.onmessage = (event) => {
    if (typeof event == 'string' && event.startsWith('bestmove')) {
        console.log(event);
    }
};


app.get('/bestmove', (req, res) => {
    // Probably want to use a get with query params
    // https://stackoverflow.com/questions/6912584/how-to-get-get-query-string-variables-in-express-js-on-node-js
    // Then use UCI commands to generate the best move and return that
    res.status(200).send({
        piece: 'pawn',
        square: 'e4'
    });
});

app.post('/', (req, res) => {
    const position = req.body.position;
    let difficulty = req.body.positon;
    let depth = req.body.depth;

    if (!position) {
        res.status(418).send({ message: "Position is required!" });
    }

    if (!difficulty) {
        console.log("no difficulty set");
        // Set default difficulty
    }

    if (!depth) {
        depth = 18;
    }

    engine.onmessage = (event) => {
        if (typeof event == 'string' && event.startsWith('bestmove')) {
            console.log(event);
            res.send({
                move: event.slice(9)
            });
        }
    };

    engine.postMessage("uci");
    engine.postMessage("ucinewgame");
    engine.postMessage(`position fen ${position}`);
    engine.postMessage(`go depth ${depth}`);
});

app.listen(
    PORT, () => console.log(`Server running on ${PORT}`)
);