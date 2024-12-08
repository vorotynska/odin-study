// script.js

// Получаем элементы
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentInput = ""; // Текущее значение
let previousInput = ""; // Предыдущее значение
let operator = null; // Оператор

// Функция обновления дисплея
const updateDisplay = () => {
  display.textContent = currentInput || "0";
};

// Обработка нажатий кнопок
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    // Очистка
    if (button.classList.contains("clear")) {
      currentInput = "";
      previousInput = "";
      operator = null;
      updateDisplay();
      return;
    }

    // Числа и десятичная точка
    if (button.classList.contains("number") || button.classList.contains("decimal")) {
      if (value === "." && currentInput.includes(".")) return; // Не допускать двойных точек
      currentInput += value;
      updateDisplay();
      return;
    }

    // Операторы
    if (button.classList.contains("operator")) {
      if (currentInput === "") return; // Ничего не делать, если ничего не введено
      if (previousInput) {
        calculate();
      } else {
        previousInput = currentInput;
      }
      operator = value;
      currentInput = "";
      return;
    }

    // Вычисление
    if (button.classList.contains("equal")) {
      calculate();
      updateDisplay();
      return;
    }
  });
});

// Функция вычисления
const calculate = () => {
  if (!previousInput || !currentInput || !operator) return;

  const prev = parseFloat(previousInput);
  const curr = parseFloat(currentInput);
  switch (operator) {
    case "+":
      currentInput = prev + curr;
      break;
    case "-":
      currentInput = prev - curr;
      break;
    case "×":
      currentInput = prev * curr;
      break;
    case "÷":
      currentInput = curr !== 0 ? prev / curr : "Error";
      break;
    default:
      return;
  }

  previousInput = "";
  operator = null;
};
