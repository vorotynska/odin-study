const display = document.getElementById("display");
const displayNumber = document.getElementById("display-number");
const buttonsContainerNumber = document.getElementById("buttons-container-number");
const buttonsContainerOperator = document.getElementById("buttons-container-operator");

const numbers = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", "."];
const operators = ["+/-", "AC", "->", "*", "/", "+", "-", "="];

numbers.forEach((number) => {
  buttonsContainerNumber.innerHTML += `
    <button class="btn btn-num">${number}</button>
  `;
});

operators.forEach((operator) => {
  buttonsContainerOperator.innerHTML += `
    <button class="btn btn-operator">${operator}</button>
  `;
});

let currentInput = "0";
let previousInput = "";
let operator = null;

// Обновление дисплея
const updateDisplay = () => {
  displayNumber.textContent = currentInput.length > 10
    ? parseFloat(currentInput).toExponential(5)
    : currentInput || "0";
};

// Обработка чисел
const addNumbers = document.getElementsByClassName("btn-num");
[...addNumbers].forEach((button) =>
  button.addEventListener("click", () => {
    if (button.textContent === "." && currentInput.includes(".")) return;
    if (currentInput === "0" && button.textContent !== ".") currentInput = "";
    currentInput += button.textContent;
    updateDisplay();
  })
);

// Обработка операторов
const addOperator = document.getElementsByClassName("btn-operator");
[...addOperator].forEach((button) =>
  button.addEventListener("click", () => {
    if (button.textContent === "=") {
      calculate();
      updateDisplay();
      return;
    }

    if (button.textContent === "AC") {
      currentInput = "0";
      previousInput = "";
      operator = null;
      updateDisplay();
      return;
    }

    if (button.textContent === "+/-") {
      currentInput = (parseFloat(currentInput) * -1).toString();
      updateDisplay();
      return;
    }

    if (button.textContent === "->") {
      currentInput = currentInput.slice(0, -1) || "0";
      updateDisplay();
      return;
    }

    if (currentInput === "") return;

    if (previousInput) {
      calculate();
    } else {
      previousInput = currentInput;
    }

    operator = button.textContent;
    currentInput = "";
  })
);

// Функция вычисления
const calculate = () => {
  if (!previousInput || !currentInput || !operator) return;

  const prev = parseFloat(previousInput);
  const curr = parseFloat(currentInput);

  switch (operator) {
    case "+":
      currentInput = (prev + curr).toString();
      break;
    case "-":
      currentInput = (prev - curr).toString();
      break;
    case "*":
      currentInput = (prev * curr).toString();
      break;
    case "/":
      currentInput = curr !== 0 ? (prev / curr).toString() : "Error";
      break;
  }

  previousInput = "";
  operator = null;
  updateDisplay();
};
