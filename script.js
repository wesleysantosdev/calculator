/* adding all the important buttons to variables */
const numberButtons = document.querySelectorAll('.number-button')
const operationButtons = document.querySelectorAll('.operator')
const equalsButton = document.querySelector('#button-equals')
const backspaceButton = document.querySelector('#button-backspace')
const clearButton = document.querySelector('#button-clear')
const previousOperandTextElement = document.querySelector('.previous-operand')
const currentOperandTextElement = document.querySelector('.current-operand')

class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }
    
    /*function to add ',' in between the numbers automatically, converting the digits*/
    formatDisplayNumber(number){
        const stringNumber = number.toString();

        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];

        let integerDisplay;

        if (isNaN(integerDigits)){
            integerDisplay = '';
        }else {
            integerDisplay = integerDigits.toLocaleString("en", {maximumFractionDigits: 0,
         });
        }

        if (decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        }else {
            return integerDisplay;
        }
    }
     
    delete (){
        /* this line will make sure that it deletes only the last digit by click (the click will be called by an event listener) */
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    calculate(){
        let result;

        const previousOperandFloat = parseFloat (this.previousOperand)
        const currentOperandFloat = parseFloat (this.currentOperand)

        if (isNaN(previousOperandFloat) || isNaN(currentOperandFloat)) return;

        switch (this.operation) {
            case '+':
                result = previousOperandFloat + currentOperandFloat; 
               break;
            case '-':
                result = previousOperandFloat - currentOperandFloat;
                break;   
            case 'x': 
                result = previousOperandFloat * currentOperandFloat;
                break; 
            case '÷':
                result = previousOperandFloat / currentOperandFloat;
                break;
            default:
                return;      
        }

        this.currentOperand = result;
        this.operation = undefined;
        this.previousOperand = '';
    }

    chooseOperation(operation){
        if (this.currentOperand === '') return;
        
        if (this.previousOperand !== ''){
            this.calculate();
        }

        this.operation = operation;
        /* here, we're gonna put the currentOperand on the previousOperand place, only after we click any operator.*/
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    appendNumber(number){
        /* this will make sure that we only have one ',' */
       if (this.currentOperand.includes('.') && number === '.') return;

       this.currentOperand = `${this.currentOperand}${number.toString()}`
    }   

    clear(){
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    /* this will change the text elements inside the display */
    updateDisplay(){
        /* the ${this.operation} is to also show the operator simbol to the display. */
        this.previousOperandTextElement.innerText = `${this.formatDisplayNumber(this.previousOperand)} ${this.operation || ''}`;
        this.currentOperandTextElement.innerText = this.formatDisplayNumber(this.currentOperand);
    }
}

const calculator = new Calculator(
    previousOperandTextElement,
    currentOperandTextElement
);

/* iteration using for of to able the 'click' for all number buttons */
for (const numberButton of numberButtons) {
    numberButton.addEventListener('click', () => {
        calculator.appendNumber(numberButton.innerText);
        calculator.updateDisplay();
    });    
}

for (const operationButton of operationButtons) {
    operationButton.addEventListener ('click', () => {
       calculator.chooseOperation(operationButton.innerText);
       calculator.updateDisplay();
    });
    
}

clearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

equalsButton.addEventListener ('click', () => {
    calculator.calculate();
    calculator.updateDisplay();
});

backspaceButton.addEventListener ('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});
