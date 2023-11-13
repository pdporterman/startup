const express = require('express');
const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');
const app = express();
const port = 4000;

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const collection = db.collection('users');

// Test that you can connect to the database
(async function testConnection() {
await client.connect();
await db.command({ ping: 1 });
})().catch((ex) => {
console.log(`Unable to connect to database with ${url} because ${ex.message}`);
process.exit(1);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
  
  // JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// GetScores
apiRouter.get('/scores', (_req, res) => {
  res.send(collection.find({}).toArray());
});

// SubmitScore
apiRouter.post('/score', (req, res) => {
  updateScores(req.body);
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});


// updateScores considers a new score for inclusion in the high scores.
// The high scores are saved in memory and disappear whenever the service is restarted.
let scores = [
  {
      "name": "bob",
      "pass": "bob123",
      "moves": 145
  }
];

function updateScores(newScore) {
  collection.updateOne({name:newScore.name}, {
    $min:{moves:newScore.moves}
  }).then(({matchedCount})=>{
    if (matchedCount == 0) collection.insertOne(newScore);
  });
}
