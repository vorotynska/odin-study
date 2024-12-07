const display = document.getElementById("display");
const displayNumber = document.getElementById("display-number");
const buttonsContainerNumber = document.getElementById("buttons-container-number");
const buttonsContainerOperator = document.getElementById("buttons-container-operator");

const numbers = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", "."];
const operators = ["+/-", "AC", "->", "*", "/", "+", "-", "="];

let currentNumber = "0";

numbers.map((number) => {
    buttonsContainerNumber.innerHTML += `
      <button class="btn-num">${number}</button>
    
    `;
})

operators.map((operator) => {
    buttonsContainerOperator.innerHTML += `
      <button class="btn-operator">${operator}</button>
       
    `;
});

const secondChild = buttonsContainerOperator.children[1]; // Индексация начинается с 0
secondChild.style.background = "#eb5e28";

