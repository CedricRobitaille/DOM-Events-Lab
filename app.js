/*-------------------------------- Constants --------------------------------*/

const calculator = document.getElementById("calculator"); // Grab the calculator element
const display = document.querySelector(".display"); // Grab the display element



/*-------------------------------- Variables --------------------------------*/

let operator = null; // Set the default operator to null. Null to signify whether or not we have a value attributed.
let base = 0; // 1st variable in the equation
let coefficient = 0; // 2nd variable in the equation

let coefficientContinuation = false; // By default, do not enable operator running (1 + 2 - 3 / 3 = #)
let summed = false; // Variable to track if the last action was the '=' button.



/*------------------------ Cached Element References ------------------------*/

// No clue what this section's supposed to be for... Sorry!



/*----------------------------- Event Listeners -----------------------------*/

calculator.addEventListener("click", (event) => { // event.target to collect source the inner-most elem (ie: the buttons)
  if (event.target.classList.contains("number")) { // If the button selected is a number button

    // Checks if the last action was a '='.
    // That way, if a user puts in a new number, it starts again at the beginning.
    if (summed === true) {  // If user just summed
      operator = null;  // Reset operator value
      base = 0; // Reset base value
      coefficient = 0;  // Reset coefficient value
    }

    // If an operator has been set, the numbers added are for the coefficient, otherwise, they're for the base.
    if (operator === null) {  // Operator hasn't been set
      increaseNum(event.target.innerHTML, "base") // Increase the BASE based on the button's num
    } else {  // Operator has been set
      coefficientContinuation = true; // A operator and coefficient has been set, the user can now do operation running (1 + 2 - 3 / 4 = #)
      increaseNum(event.target.innerHTML, "coefficient") // Increase the COEFFICIENT based on the button's num
    }

  } else if (event.target.classList.contains("operator")) { // The user has selected an operator

    // Basically, if there's already a chain of 2+4, then the user clicks another operator...
    // We want to calculate the sum of what we have, then continue adding an operator.
    // That way, we can do  3 + 2 - 8 / 7 = and it will continue summing without needing to press = every time!
    if (coefficientContinuation && summed === false) {
      calculate();
    }

    summed = false; // Reset the user's last operation to NOT summed.
    setOperator(event.target.innerHTML); // Set the operator value to the button's innerText
    coefficient = 0; // ( # -> operator -> #)... The second # cant come before the operator's set.

  } else if (event.target.classList.contains("equals")) { // The user has selected "="

    calculate(true); // Sums all values. Trued to denote that we're resetting coefficient after.

  }
});



/*-------------------------------- Functions --------------------------------*/

/**
 * Upon clicking a number value, this function increases the root number by the provided number.
 * @param {number} number - The number the user clicked
 * @param {string} variable - The stage of the expression the user's on. IE: Base / Coefficient
 */
function increaseNum(number, variable) {
  number = parseInt(number); // Convert the button.innerHTML text into a int. ("7" -> 7)
  if (variable === "base") {  // Edit the base's value
    base = base * 10 + number; // 4>5 does the following: (4 -> 40, 40 + 5 -> 45)
    displayNums(true, false, false); // Display the new set of numbers. Base only.

  } else {  // Edit the coefficient's value
    coefficient = coefficient * 10 + number;  // 4>5 does the following: (4 -> 40, 40 + 5 -> 45)
    displayNums(true, true, true); // Display the new set of values. Base, Operator and Coefficient

  }  
}

/**
 * Upon clicking an operator, this function sets the operator value.
 * @param {string} operation - String value of the operation to be used.
 */
function setOperator(operation) {
  if (operation == "C") { // if the user clicks C, dont waste time with anything else.
    clearVals();  // Clears all values
    displayNums();  // Displays empty screen
    return; // Exits the function
  }

  operator = operation; // Sets the value of the operator variable to the correct operation

  if (coefficient.length > 0) { // Checks if there is a value in the coefficient. If yes, start running (1 + 2 - 3 / 4 = #)
    calculate(); // Calculate the sum with this new operator in use!
  } else {  // No value was found in the coefficient!
    displayNums(true, false, true); // Display the new set - Base and Operator ONLY.
  }
}


/**
 * Sums up the numbers provided by the operator!
 * @param {boolean} reset - Only set as true if the user has explicitly clicked the '=' symbol.
 */
function calculate(reset = false) {

  switch (operator) { // Action based on the operator selected.
    case "+": // User clicked "+"
      // parseInt() - Converts string to integer [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt]
      base = base + coefficient;
      break;
    
    case "-": // User clicked "-"
      base = base - coefficient;
      break;

    case "*": // User clicked "*"
      base = base * coefficient;
      break;

    case "/": // User clicked "/"
      if (coefficient === 0) { // IT IS IMPOSSIBLE TO DIVIDE BY 0. DO NOT ALLOW THIS.
        clearVals(); // Resets all values. 
        display.innerHTML = "Can't divide by 0" // Display the error log.
        return;

      } else { // No errors, continue with division.
        base = base / coefficient;
      } 
      break;
  }

  summed = true; // The user just summed. So if the user immediately clicks a number, it resets the whole equation.

  if (reset === true) { // The user clicked "=" so we reset the coefficient and the operator.
    coefficient = 0;
    operator = null;
  }

  displayNums(true, false, false); // Display ONLY the base number.
}


/**
 * 
 * @param {boolean} b - Base Value, True / false
 * @param {boolean} c - Coefficient Value, True / false
 * @param {boolean} operation - Operator Value, True / false
 */
function displayNums(b, c, operation) {
  clearDisplay(); // Start by resetting and clearing the display!
  if (b) { // If a base has been provided.
    const baseElem = document.createElement("p")  // Create new p element
    baseElem.innerText = base;  // set the p's inner text to the base value
    display.appendChild(baseElem);  // Append the base element to the display
  }
  if (operation) { // If the operator has been provided
    const operatorElem = document.createElement("p")  // Create new p element
    operatorElem.innerText = operator;  // set the p's inner text to the operator
    display.appendChild(operatorElem);  // Append the operator element to the display
  }
  if (c) { // If the coefficient has been provided
    const coefficientElem = document.createElement("p")  // Create new p element
    coefficientElem.innerText = coefficient;  // set the p's inner text to the coefficient value
    display.appendChild(coefficientElem);  // Append the coefficient element to the display
  }
}

/**
 * Clears the display
 */
function clearDisplay() {
  display.innerHTML = ""; // Removes any children, and replaces it with an empty space.
}

/**
 * Resets all values
 */
function clearVals() {
  base = 0;  // Resets the base
  coefficient = 0;  // Resets the coefficient
  operator = null;  // Resets the operator
}