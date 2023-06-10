const express = require("express");
const cors = require ('cors')
const app = express();
const port = 3000;

// Enable JSON request body parsing
app.use(express.json());
app.use(cors());

// Define the API endpoint
app.post("/api/calculate", (req, res) => {
  const { number1, number2, operation } = req.body;

  const start = process.hrtime(); // Get the high-resolution timestamp before the calculation

  let result;

  switch (operation) {
    case "add":
      result = number1 + number2;
      break;
    case "subtract":
      result = number1 - number2;
      break;
    case "divide":
      result = number1 / number2;
      break;
    case "multiply":
      result = number1 * number2;
      break;
    case "sin":
    case "cos":
    case "tan":
    case "cot":
      result = Math[operation](number1);
      break;
    default:
      return res.status(400).json({ error: "Invalid operation" });
  }

  const end = process.hrtime(start); // Get the high-resolution timestamp after the calculation
  const calculationTime = end[0] * 1000 + end[1] / 1000000; // Calculate the time difference in milliseconds

  res.json({ number1, number2, result, calculationTime });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});