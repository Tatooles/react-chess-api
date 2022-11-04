const serverless = require("serverless-http");
const express = require("express");
const stockfish = require('stockfish');
const engine = stockfish();
const app = express();

app.use(express.json());

engine.onmessage = (event) => {
};

app.post('/', (req, res) => {
  const position = req.body.position;
  let difficulty = req.body.positon;
  let depth = req.body.depth;

  console.log(req.body);

  if (!position) {
    res.status(400).send({ message: "Position is required!" });
    return;
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

app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from from a root that has been updated!",
  });
});

app.get("/hello", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from path!",
  });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
