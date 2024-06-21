const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { handleUserInput } = require("./chatbot"); // Import the function from chatbot.js
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public"))); // Serve static files from the "public" directory

let sessions = {};

app.post("/chat", (req, res) => {
  const sessionId = req.body.sessionId;
  const message = req.body.message;
  if (!sessions[sessionId]) {
    sessions[sessionId] = { currentOrder: [], orderHistory: [] };
  }
  const response = handleUserInput(sessions[sessionId], message);
  res.send(response);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
