# Calculator App

A simple, **calculator App** which enables the user to `add`, `subtract`, `divide`, and `multiply` a set of numbers.

<br>

## Overview



<br>

## Document Initialization

```js
const calculator = document.getElementById("calculator");

calculator.addEventListener("click", (event) => {
  if (event.target.classList.contains("number")) {
    // Runs function actions to set the number
  } else if (event.target.classList.contains("operator")) {
    // Runs function to set the operator / calculate
  } else if (event.target.classList.contains("equals")) {
    // Runs function to calculate the sum
  }
});
```
Starting off, instead of giving each and every button element their own `event listener`, we set up a single event listener on the whole *calculator object*, then based on the **click-event's target**, we can run a set of operations.

<br>

## Number Incrementation 

```js
let base = 0;

if (event.target.classList.contains("number")) {
  increaseNum();
}

function increaseNum(number variable) {
  number = parseInt(number) // Convert innerText string into a int

  if (vaiable === "base") { // Equation -> Base Operator Coefficient (# / #)
    base = base * 10 + number; // 4 > 5 does the following (4 -> 40, 40 + 5 -> 45)
    displayNums(); // Displays the new set of values
  } else {
    // Repeats, however, for the coefficient, rather than the base.
  }
}
```
When a user clicks a number, we want two things to happen.
1. We want to add the number to the root number... ie: 4 + 5 = 45.
2. We want to display this new set of variables on the screen.

<br>

## Setting the Operator

```js
let operator = null;

if (event.target.classList.contains("operator")) {
  setOperator();
}

function setOperator(operation) {
  if (operation = "C") {
    // User clicked "Clear", so clear the display
  } else if (coefficient === true) {
    // A coefficient already exists, meaning we treat this as an addition AND setting the operator
  } else {
      operator = operation; // Sets the operator
      displayNums();
  }
}
```
When the user clicks an operator button, we there are a few checks to happen.
1. If the user clicked "Clear", clear all variables!
2. If there is already an existing coefficient, treat this as a sum and calculate the previous total.
3. Set the operator variable to the appropriate value.

<br>

## Calculating

```js
calculate();

function calculate(reset = false) { // Set default value to parameter
  switch (operator) { // Different operations based on the inputted operator.
    case "+":
      base += coefficient;
      break;
    // Continued for other cases...
  }

  if (reset === true) { // Actives only when the user clicks "="
    // Clears all variables aside from the base which now holds the sum of the calculation.
  }

  displayNums();
}
```
Aside from simply summing the totals based on the inputted operaters, this function also has a very important role. To enable functionality like continuously clicking "=" to keep summing from the last operator/coefficient, or enabling the user to use the an operator as a sum so they can chain operators.

<br>

## Displaying Operations

```js
displayNums(10, "-", 3);

displayNums(base, operation, coefficient) {
  display.innerHTML = "";

  if (base) { // If a base value exists
    const baseElement = document.createElement("p");

    baseElement.innerText = base; // Sets the value to the base's value
    display.appendChild(baseElement); // Appends to the display.
  }
  // Continues for all components of the equation.
}
```
This one's much easier.
First, clear the display. If there's pre-existing content, then it'll just scale rather than starting anew. Once that's done, simply check to see if every component of the equation exists, and then add them to the display element!

<br>