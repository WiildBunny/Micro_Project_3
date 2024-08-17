// Get the input field
const display = document.querySelector('input[name="display"]');

// Get all the buttons
const buttons = document.querySelectorAll('.btn input[type="button"]');

// Initialize the current value
let currentValue = "";

// Function to reset the form input
function resetInput() {
  currentValue = "";
  display.value = "";
  display.style.backgroundColor = "#181f32"; // Reset the background color
}

// Add event listeners to the buttons
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.value;

    // Check if the button is a number
    if (!isNaN(value) || value === ".") {
      currentValue += value; // Add the new value to the right of the current value
      display.value = currentValue;
    }

    // Check if the button is an operator
    if (["+", "-", "/", "x"].includes(value)) {
      if (currentValue === "" && value !== "+" && value !== "-") {
        alert("You can only start with + or - operators.");
      } else if (
        ["+", "-", "/", "x"].includes(currentValue[currentValue.length - 1]) &&
        value !== "-" &&
        value !== "+"
      ) {
        if (
          (currentValue[currentValue.length - 1] === "/" ||
            currentValue[currentValue.length - 1] === "x") &&
          value !== "-"
        ) {
          alert("Only + or - operator is allowed after / and * operators.");
        } else {
          alert("You cannot use two consecutive operators.");
        }
      } else {
        currentValue += value; // Add the new value to the right of the current value
        display.value = currentValue;
      }
    }

    // Check if the button is the equals button
    if (value === "=") {
      try {
        let result = eval(currentValue.replace("x", "*")); // Replace "x" with "*" for multiplication

        // Format the result
        if (result % 1 !== 0) {
          result = parseFloat(result.toFixed(3)); // Limit to 3 decimal places and remove trailing zeros
        }

        display.value = result;
        currentValue = result.toString(); // Convert the result to a string
        display.style.backgroundColor = "black"; // Change the background color to black

        // If display is empty, reset input
        if (display.value === "") {
          resetInput();
        }
      } catch (e) {
        alert("Invalid expression");
        resetInput();
      }
    }

    // Check if the button is the reset button
    if (value === "RESET") {
      resetInput();
    }

    // Check if the button is the delete button
    if (value === "DEL") {
      currentValue = currentValue.slice(0, -1); // Remove the rightmost character
      display.value = currentValue;

      // If display is empty, reset input
      if (display.value === "") {
        resetInput();
      }
    }
  });
});

// Add event listener to the input field to capture keyboard input
display.addEventListener("keypress", (e) => {
  const keyValue = e.key;

  // Check if the key is a number
  if (!isNaN(keyValue) || keyValue === ".") {
    currentValue += keyValue; // Add the new value to the right of the current value
    display.value = currentValue;
  }

  // Check if the key is an operator
  if (["+", "-", "/", "*"].includes(keyValue)) {
    if (currentValue === "" && keyValue !== "+" && keyValue !== "-") {
      alert("You can only start with + or - operators.");
    } else if (
      ["+", "-", "/", "*"].includes(currentValue[currentValue.length - 1]) &&
      keyValue !== "-" &&
      keyValue !== "+"
    ) {
      if (
        (currentValue[currentValue.length - 1] === "/" ||
          currentValue[currentValue.length - 1] === "*") &&
        keyValue !== "-"
      ) {
        alert("Only + or - operator is allowed after / and * operators.");
      } else {
        alert("You cannot use two consecutive operators.");
      }
    } else {
      currentValue += keyValue; // Add the new value to the right of the current value
      display.value = currentValue;
    }
  }

  // Check if the key is the enter key (equals button)
  if (e.key === "Enter") {
    try {
      let result = eval(currentValue.replace("x", "*")); // Replace "x" with "*" for multiplication

      // Format the result
      if (result % 1 !== 0) {
        result = parseFloat(result.toFixed(3)); // Limit to 3 decimal places and remove trailing zeros
      }

      display.value = result;
      currentValue = result.toString(); // Convert the result to a string
      display.style.backgroundColor = "black"; // Change the background color to black

      // If display is empty, reset input
      if (display.value === "") {
        resetInput();
      }
    } catch (e) {
      alert("Invalid expression");
      resetInput();
    }
  }

  // Check if the key is the backspace key (delete button)
  if (e.key === "Backspace") {
    currentValue = currentValue.slice(0, -1); // Remove the rightmost character
    display.value = currentValue;

    // If display is empty, reset input
    if (display.value === "") {
      resetInput();
    }
  }

  // Prevent the default behavior of the key press
  e.preventDefault();
});
