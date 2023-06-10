import './style.css'


document.querySelector('#app').innerHTML = `
  <div>
    <form id="calculatorForm">
        <label for="number1">Number 1:</label>
        <input type="number" id="number1" name="number1"><br>

        <label for="number2">Number 2:</label>
        <input type="number" id="number2" name="number2"><br>

        <label for="operation">Operation:</label>
        <select id="operation" name="operation">
            <option value="add">Add</option>
            <option value="subtract">Subtract</option>
            <option value="divide">Divide</option>
            <option value="multiply">Multiply</option>
            <option value="sin">Sin</option>
            <option value="cos">Cos</option>
            <option value="tan">Tan</option>
            <option value="cot">Cot</option>
        </select><br>

        <input type="submit" value="Calculate">
    </form>
    <div id="result"></div>
  </div>
`
document
  .getElementById("calculatorForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    let number1 = parseFloat(document.getElementById("number1").value);
    let number2 = parseFloat(document.getElementById("number2").value);
    let operation = document.getElementById("operation").value;

    // Prepare the request payload
    let payload = {
      number1: number1,
      number2: number2,
      operation: operation,
    };

    // Make the API request
    fetch("http://localhost:3000/api/calculate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        // Display the result
        document.getElementById("result").innerHTML =
          "Result: " +
          data.result +
          " (Calculation Time: " +
          data.calculationTime +
          " ms)";
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

  
  document.getElementById("operation").addEventListener("change", function () {
    let operation = document.getElementById("operation").value;
    if (operation === "sin" || operation === "cos" || operation === "tan" || operation === "cot") {
      document.getElementById("number2").disabled = true;
    } else {
      document.getElementById("number2").disabled = false;
    }
  })