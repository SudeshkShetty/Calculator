let numGlobal1 = null;
let numGlobal2 = null;
let operatorGlobal = null;
let mathResult = null;
let decimalCount1 = 0;
let decimalCount2 = 0;
let countDisplay = 0;
const add = (numbAdd1,numbAdd2) => numbAdd1+numbAdd2;
const subtract = (numbSubtract1,numbSubtract2) => numbSubtract1-numbSubtract2;
const multiply = (numbMulti1,numbMulti2) => numbMulti1*numbMulti2;
const divide = (numbDivide1,numbDivide2) => numbDivide1/numbDivide2; 
const modulus = (numbMod1,numbMod2) => numbMod1%numbMod2;
const displayContainer = document.querySelector('.displayContainer');

const operate = () => {
    switch(operatorGlobal){
        case '+':
            mathResult=add(Number(numGlobal1),Number(numGlobal2));
            break;
        case '-':
            mathResult=subtract(numGlobal1,numGlobal2);
            break;
        case '*':
            mathResult=multiply(numGlobal1,numGlobal2);
            break;
        case '/':
            mathResult=divide(numGlobal1,numGlobal2);
            break;
        case '%':
            mathResult=modulus(numGlobal1,numGlobal2);
            break;
        default:
            return 'Error';
    }
}

function displayResult(){ 
    displayContainer.innerText = mathResult;
}

function clearAllfunc(){
    numGlobal1 = null;
    numGlobal2 = null;
    operatorGlobal = null;
    decimalCount1 = 0;
    decimalCount2 = 0;
    countDisplay = 0;
    displayContainer.innerText = '';
}

function insertDecimalDot(key){
        if(numGlobal2 === null && operatorGlobal === null && decimalCount1 === 0){
            if(numGlobal1 === null) numGlobal1 = '';
            numGlobal1 += key;
            displayContainer.innerText = numGlobal1;
            decimalCount1++;
        }
        else if(numGlobal1 !== null && operatorGlobal !== null && decimalCount2 === 0){
            if(numGlobal2 === null) numGlobal2 = '';
            numGlobal2 += key;
            displayContainer.innerText = numGlobal2;
            decimalCount2++;
        }
}

function changeNumbSign(key){
    if(numGlobal2 === null && operatorGlobal === null){
        if(numGlobal1 === null) numGlobal1 = '1';
        numGlobal1 *= -1;
        displayContainer.innerText = numGlobal1;
    }
    else if(numGlobal1 !== null && operatorGlobal !== null){
        if(numGlobal2 === null) numGlobal2 = '1';
        numGlobal2 *= -1;
        displayContainer.innerText = numGlobal2;
    }
}

function popLastDigit(key){
    if(numGlobal1 !== null && numGlobal2 === null && operatorGlobal === null){
            numGlobal1 = numGlobal1.slice(0,-1);
            displayContainer.innerText = numGlobal1;
        }
    else if(numGlobal2 !== null && numGlobal1 !== null && operatorGlobal !== null){
           numGlobal2 = numGlobal2.slice(0,-1);
           displayContainer.innerText = numGlobal2;
       }
}
 
function createNumber(key){
    if(operatorGlobal === null){
        if(numGlobal1 === null) numGlobal1 = '';
        numGlobal1 += key;
        displayContainer.innerText = numGlobal1;
    }
    else if(operatorGlobal !== null){
        if(numGlobal2 === null) numGlobal2 = '';
        numGlobal2 += key;
        displayContainer.innerText = numGlobal2;
     }
}

function getOperator(key){
    if(operatorGlobal === null && numGlobal1 !== null){
        operatorGlobal = key;
        countDisplay = 1;
    }
    else if(numGlobal1 !== null){
        countDisplay += 1;

        if(countDisplay > 2){
            countDisplay = 2;
        }
        if(numGlobal1 === mathResult && numGlobal2 !== null && countDisplay === 1){
            numGlobal1 = numGlobal2;
            numGlobal2 = null;
        }

        else if(numGlobal1 !== null && numGlobal2 !== null && countDisplay === 2){
            operate();
            clearAllfunc();
            displayResult();
            numGlobal1 = mathResult;
            numGlobal2 = null;
            countDisplay = 1;
        }
         operatorGlobal = key;
    }
}

function operateAssignOnNumb(){
    if(numGlobal1 === null || numGlobal2 === null || operatorGlobal === null){
        clearAllfunc();
        displayContainer.innerHTML = 'Syntax Error';   
    }
    else{
        operate();
        displayResult();
        numGlobal1 = mathResult;
        numGlobal2 = null;
        decimalCount1 = 0;
        decimalCount2 = 0;
        countDisplay = 0;
    }
}

function changeKeyColor(key){
    if(['.','Delete','<','=','+/-','+','-','*','/','%','Enter','Backspace','_'].includes(key)|| !isNaN(key) && key !== ' '){
        if(key === 'Enter') key = '=';
        else if(key === 'Backspace') key = '<';
        else if(key === '_') key = '+/-';
        const newButton = document.querySelector(`button[data-key ="${key}"]`);
        newButton.classList.add('newColor');
        setTimeout(() => {
            newButton.classList.remove('newColor');},'70');
    }  
}

function getUserInput(e){
    let key = null;
    if(e.key === undefined)key = e.target.innerText;
    else {
        key = e.key;
        changeKeyColor(key);
    }
    if(key === '.') insertDecimalDot(key);
    else if(key === '+/-' || key === '_') changeNumbSign(key);
    else if(key === '<' || key === 'Backspace') popLastDigit(key);
    //Since NaN === NaN is false we cannot check for the condition parseInt(key) === NaN 
    // NaN is not a number so Not a Number is not equal to itself
    else if(!isNaN(key)) createNumber(key);
    else if(isNaN(key) && !(['.','clear','<','=','+/-'].includes(key))&& ['+','-','*','/','%'].includes(key)) getOperator(key);
    else if(key === 'clear' || key === 'Delete') clearAllfunc();
    else if(key === '=' || key === 'Enter') operateAssignOnNumb();
   e.preventDefault();
}

function removeTransition(e){
    if(e.propertyName !== 'transform') return; 
    this.classList.remove('newColor');
}
const calcButtons = document.querySelectorAll('.subClassAll');
calcButtons.forEach((button) => {button.addEventListener('click',getUserInput)});
document.addEventListener('keydown',getUserInput);
