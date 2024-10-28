// Select the elements
const buttons = document.querySelectorAll('.btn');
const screen = document.querySelector('.screen');
const clearButton = document.querySelector('.btn-clear');
const equalButton = document.querySelector('.btn-equal');

// Variable to hold the current input and operator
let currentInput = '';
let operator = '';
let firstOperand = '';

// Function to update the screen
function updateScreen(value) {
    screen.value = value;
}

// Function to handle button clicks
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonValue = button.getAttribute('data-num');

        // If the button is an operator
        if (buttonValue) {
            if (currentInput === '') return; // Prevent operator input without a number

            // If there's already an operator, calculate the result first
            if (operator) {
                firstOperand = calculate(firstOperand, currentInput, operator);
                updateScreen(firstOperand);
            } else {
                firstOperand = currentInput;
            }

            operator = buttonValue;
            currentInput = '';
        } else if (button.classList.contains('btn-equal')) {
            if (firstOperand === '' || currentInput === '') return; // Prevent calculation without numbers
            const result = calculate(firstOperand, currentInput, operator);
            updateScreen(result);
            currentInput = result; // Set current input to result for further calculations
            operator = ''; // Reset operator
            firstOperand = ''; // Reset first operand
        } else if (button.classList.contains('btn-clear')) {
            currentInput = '';
            operator = '';
            firstOperand = '';
            updateScreen('');
        } else {
            // If it's a number or decimal point
            currentInput += buttonValue;
            updateScreen(currentInput);
        }
    });
});

// Function to perform calculations
function calculate(first, second, operator) {
    first = parseFloat(first);
    second = parseFloat(second);

    switch (operator) {
        case '+':
            return first + second;
        case '-':
            return first - second;
        case '*':
            return first * second;
        case '/':
            if (second === 0) {
                alert("Cannot divide by zero");
                return '';
            }
            return first / second;
        default:
            return second;
    }
}