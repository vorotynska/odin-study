const etchContainer = document.getElementById("etch-container");
const numberForm = document.querySelector(".number-form");
const openNumberForm = document.getElementById("open-number-form");
const closeNumberForm = document.getElementById("close-form-btn");
const numberInput = document.getElementById("number-input");
const addNumberBtn = document.getElementById("add-number-btn");

function getRandomColorResult() {
  const colors = ["red", "green", "chocolate", "blue", "yellow", "orange", "purple", "pink", "gray", "brown", "magenta", "cyan", "lightblue", "lightgreen", "lightgray",];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

function createGrid(squaresPerSide) {
    etchContainer.innerHTML = ""; // Очищаем контейнер перед добавлением новых квадратов
    const containerSize = 400;// Размер контейнера
    const squareSize = containerSize / squaresPerSide; // Размер одного квадрата
    
    for (let i = 0; i < squaresPerSide * squaresPerSide; i++) {
        const square = document.createElement("div");
        square.setAttribute("id", "square"); // Присваиваем класс для стилей
        square.style.width = `${squareSize}px`;
         square.style.height = `${squareSize}px`;
         etchContainer.appendChild(square);

        square.addEventListener("mouseover", () => {
            square.style.backgroundColor = getRandomColorResult(); // Меняем цвет при наведении
        });

        square.addEventListener("mouseleave", () => {
            square.style.background = "white"; // Возвращаем начальный цвет
        });
      }
}

openNumberForm.addEventListener("click", () => {
   numberForm.classList.toggle("hidden");
   etchContainer.style.display = "none";
});

closeNumberForm.addEventListener("click", () => {
    numberForm.classList.toggle("hidden");
    etchContainer.style.display = "flex";
  });

numberForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputNumber = parseInt(numberInput.value);
  if (inputNumber > 0 && inputNumber <= 100) {
    createGrid(inputNumber);
    numberForm.classList.toggle("hidden");
    etchContainer.style.display = "flex";
  } else {
    alert("Please enter a number between 1 and 100");
  }
});

// Пример вызова 
createGrid(15);

