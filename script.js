const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let currentOperand = "";
let operator = "";
let firstValue = null;

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (!isNaN(value) || value === ".") {
      appendNumber(value);
    } 
    else if (value === "AC") {
      clearAll();
    } 
    else if (value === "DEL") {
      deleteLast();
    } 
    else if (value === "%") {
      percentage();
    } 
    else if (value === "=") {
      calculate();
    } 
    else {
      setOperator(value);
    }
  });
});

function appendNumber(num) {
  if (num === "." && currentOperand.includes(".")) return;
  currentOperand += num;
  updateDisplay(currentOperand);
}

function setOperator(op) {
  if (currentOperand === "") return;
  firstValue = parseFloat(currentOperand);
  operator = op;
  currentOperand = "";
}

function calculate() {
  if (firstValue === null || currentOperand === "") return;
  const secondValue = parseFloat(currentOperand);

  let result;
  switch (operator) {
    case "+": result = firstValue + secondValue; break;
    case "-": result = firstValue - secondValue; break;
    case "*": result = firstValue * secondValue; break;
    case "/": result = secondValue !== 0 ? firstValue / secondValue : "Error"; break;
  }

  updateDisplay(result);
  currentOperand = result.toString();
  firstValue = null;
}

function clearAll() {
  currentOperand = "";
  operator = "";
  firstValue = null;
  updateDisplay("0");
}

function deleteLast() {
  currentOperand = currentOperand.slice(0, -1);
  updateDisplay(currentOperand || "0");
}

function percentage() {
  if (currentOperand === "") return;
  currentOperand = (parseFloat(currentOperand) / 100).toString();
  updateDisplay(currentOperand);
}

function updateDisplay(value) {
  display.textContent = value;
}
