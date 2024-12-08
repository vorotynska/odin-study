const display = document.getElementById("display");
const displayNumber = document.getElementById("display-number");
const buttonsContainerNumber = document.getElementById("buttons-container-number");
const buttonsContainerOperator = document.getElementById("buttons-container-operator");

const numbers = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", ".",];
const operators = ["+/-", "AC", "->", "*", "/", "+", "-", "="];

numbers.map((number) => {
  if (number === ".") {
    buttonsContainerNumber.innerHTML += `
      <button class="btn btn-num decimal">${number}</button>
    `;
  } else {
    buttonsContainerNumber.innerHTML += `
      <button class="btn btn-num">
      ${number}
      </button>
    `;
  }
})

operators.map((operator) => {
  if (operator === '=') {
    buttonsContainerOperator.innerHTML += `
      <button class="btn-operator equal">${operator}</button>`; 
    } else if (operator === "AC") {
      buttonsContainerOperator.innerHTML += `
        <button class="btn-operator clear">${operator}</button>`;
  } else {
    buttonsContainerOperator.innerHTML += `
      <button class="btn-operator">${operator}</button>
      `;
  }
});

const secondChild = buttonsContainerOperator.children[1]; // Индексация начинается с 0
secondChild.style.background = "#eb5e28";

let currentInput = ""; // Текущее значение
let previousInput = ""; // Предыдущее значение
let operator = null; // Оператор

// Функция обновления дисплея
const updateDisplay = () => {
  displayNumber.textContent = currentInput || "0";
  console.log('update')
};

const addNumbers = document.getElementsByClassName("btn-num");
[...addNumbers].forEach(
  (button) => (button.onclick = () => {
    if (button.textContent === "." && currentInput.includes(".")) return;
    currentInput = currentInput === "0"? button.textContent : currentInput + button.textContent;
    displayNumber.textContent = currentInput;
  })
)

const addOperator = document.getElementsByClassName("btn-operator");
[...addOperator].forEach(
  (button) => (button.onclick = () => {
    //currentNumber = currentNumber === "0"? button.textContent : currentNumber + button.textContent;
    //displayNumber.textContent = currentNumber;
    
    // Вычисление
    if (button.classList.contains("equal")) {
       calculate();
       displayNumber.textContent = currentInput || 0;
      return;
}

  // Очистка
  if (button.classList.contains("clear")) {
    currentInput = "";
    previousInput = "";
    operator = null;
    updateDisplay();
    return;
  }

  if (currentInput === "") return; // Ничего не делать, если ничего не введено
      if (previousInput) {
        calculate();
      } else {
        previousInput = currentInput;
      }
      operator = button.textContent;
      currentInput = "";
      return;
  })
)

// Функция вычисления
const calculate = () => {
  if (!previousInput || !currentInput || !operator) return;

  const prev = parseFloat(previousInput);
  const curr = parseFloat(currentInput);
  console.log(prev, curr, operator);
  switch (operator) {
    case "+":
      currentInput = prev + curr;
      console.log(currentInput)
      break;
    case "-":
      currentInput = prev - curr;
      console.log(currentInput)
      break;
    case "*":
      currentInput = prev * curr;
      break;
    case "/":
      currentInput = curr !== 0 ? prev / curr : "Error";
      break;
    default:
      return;
  }

  previousInput = "";
  operator = null;
};