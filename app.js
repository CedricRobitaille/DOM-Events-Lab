/*-------------------------------- Constants --------------------------------*/

const calculator = document.getElementById("calculator");
const display = document.querySelector(".display");


/*-------------------------------- Variables --------------------------------*/

let operator = null;
let base = 0; // Array so we can track digits
let coefficient = 0; // Array so we can track digits

let coefficientContinuation = false; // By default, do not enable operator running
let summed = false;

/*------------------------ Cached Element References ------------------------*/



/*----------------------------- Event Listeners -----------------------------*/

calculator.addEventListener("click", (event) => { // event.target to collect source the innermost elem
  if (event.target.classList.contains("number")) {
    if (summed === true) { // If you just summed, and then input new nums -> Reset Everything
      operator = null;
      base = 0;
      coefficient = 0;
    }

    if (operator === null) {
      increaseNum(event.target.innerHTML, "base")
    } else {
      coefficientContinuation = true;
      increaseNum(event.target.innerHTML, "coefficient")
    }

  } else if (event.target.classList.contains("operator")) {

    if (coefficientContinuation) {
      // Basically, if there's already a chain of 2+4, then the user clicks another operator...
      // We want to calculate the sum of what we have, then continue adding an operator.
      // That way, we can do  3 + 2 - 8 / 7 = and it will continue summing without needing to press = every time!
      calculate();
    }
    summed = false;
    setOperator(event.target.innerHTML);

    coefficient = 0;

  } else if (event.target.classList.contains("equals")) {

    calculate();

  }
})




/*-------------------------------- Functions --------------------------------*/

function increaseNum(number, variable) {
  number = parseInt(number);
  if (variable === "base") {
    
    base = base*10 + number;

    displayNums(true, false, false);
  } else {
    coefficient = coefficient * 10 + number;
    displayNums(true, true, true);
  }

  
}

function setOperator(operation) {
  if (operation == "C") {
    clearVals();
    displayNums();
    return;
  }
  operator = operation;
  if (coefficient.length > 0) {
    console.log("yes");
    calculate();
  } else {
    displayNums(true, false, true);
  }
  
}

function calculate() {

  if (coefficient.length == 0) {
    coefficient = base;
  }
  switch (operator) {
    case "+":
      // parseInt() - Converts string to integer [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt]
      base = base + coefficient;
      console.log(base)
      break;
    
    case "-":
      base = base - coefficient;
      console.log(base)
      break;

    case "*":
      base = base * coefficient;
      console.log(base)
      break;

    case "/":
      if (coefficient === 0) {
        clearVals(); // 
        display.innerHTML = "Can't divide by 0"
        return;
      } else {
        base = base / coefficient;
        console.log(base)
      } 
      break;
  }
  summed = true;

  displayNums(true, false, false);
}


/**
 * 
 * @param {boolean} b - Base Value, True / false
 * @param {boolean} c - Coefficient Value, True / false
 * @param {boolean} operation - Operator Value, True / false
 */
function displayNums(b, c, operation) {
  clearDisplay();
  if (b) {
    const baseElem = document.createElement("p")
    baseElem.classList.add("display-value");
    baseElem.innerText = base;
    display.appendChild(baseElem);
  }
  if (operation) {
    const operatorElem = document.createElement("p")
    operatorElem.classList.add("display-value");
    operatorElem.innerText = operator;
    console.log(operator)
    display.appendChild(operatorElem);
  }
  if (c) {
    const coefficientElem = document.createElement("p")
    coefficientElem.classList.add("display-value");
    coefficientElem.innerText = coefficient;
    display.appendChild(coefficientElem);
  }
}



function clearDisplay() {
  display.innerHTML = "";
}


function clearVals() {
  base = [];
  coefficient = [];
  operator = null;
}