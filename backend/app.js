const express = require('express')
const fs = require('fs')
const cors = require('cors');
const app = express()
const port = 3020

// Define an array of allowed origins
const allowedOrigins = ['http://blackjack.orionsoft.site', 'http://localhost'];

// Configure cors middleware with allowed origins
app.use(
  cors({
    origin: allowedOrigins,
  })
);

// Middleware to parse JSON requests
app.use(express.json())

// Read data from db.json
function readData() {
  const data = fs.readFileSync('db.json', 'utf-8')
  return JSON.parse(data)
}

// Write data to db.json
function writeData(data) {
  fs.writeFileSync('db.json', JSON.stringify(data, null, 2))
}

// Sample route to get data
app.get('/scores', (req, res) => {
  const data = readData();

	// Sort the data in descending order
  data.sort((a, b) => {
    const itemA = new Date(a.score);
    const itemB = new Date(b.score);
    return itemB - itemA;
  });

  res.json(data);
});

// Sample route to add data
app.post('/scores', (req, res) => {
  const newData = req.body;
  const data = readData();
  const playerIndex = data.findIndex((row) => row.player === newData.player);
  if (playerIndex !== -1) {
    // If the player already exists, update the score if newData's score is higher
    if (newData.score > data[playerIndex].score) {
      data[playerIndex].score = newData.score;
    }
  } else {
    // If the player doesn't exist, add them to the data array
    data.push(newData);
  }
  writeData(data);
  res.json(newData);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

