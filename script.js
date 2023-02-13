let numGlobal1 = null;
let numGlobal2 = null;
let operatorGlobal = null;
let mathResult = null;
let decimalCount1 = 0;
let decimalCount2 = 0;
let countOperatorEntry = 0;
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

const displayResult = () => { 
    displayContainer.innerText = mathResult;
}

const clearAllfunc = () => {
    numGlobal1 = null;
    numGlobal2 = null;
    operatorGlobal = null;
    decimalCount1 = 0;
    decimalCount2 = 0;
    countOperatorEntry = 0;
    //erase the content in the calculator display
    displayContainer.innerText = '';
}

//function to crete numbers with decimal values
const insertDecimalDot = (key) => {
    //append numGlobal1 only if the numGlobal@ is empty and operatorGlobal is also empty
    //check if decimalCount1 is zero it prevents  numbers like 12.23.23.23 ie multiple dots
        if(numGlobal2 === null && operatorGlobal === null && decimalCount1 === 0){
            if(numGlobal1 === null) numGlobal1 = '';
            numGlobal1 += key;
            displayContainer.innerText = numGlobal1;
            decimalCount1++;
        }
        //append numGlobal2 only if numGlobal1 is initialized and operator is received
        else if(numGlobal1 !== null && operatorGlobal !== null && decimalCount2 === 0){
            if(numGlobal2 === null) numGlobal2 = '';
            numGlobal2 += key;
            displayContainer.innerText = numGlobal2;
            decimalCount2++;
        }
}

//function to convert pos to negat numberse or vice versa
const changeNumbSign = (key) => {
    //check below conditions 
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

//function to remove the last appended digit
const popLastDigit = (key) => {
    //pop the last digit only if the number is not null
    if(numGlobal1 !== null && numGlobal2 === null && operatorGlobal === null){
            numGlobal1 = numGlobal1.slice(0,-1);
            displayContainer.innerText = numGlobal1;
        }
    else if(numGlobal2 !== null && numGlobal1 !== null && operatorGlobal !== null){
           numGlobal2 = numGlobal2.slice(0,-1);
           displayContainer.innerText = numGlobal2;
       }
}
 
//function to get the number from the user
const createNumber = (key) => {
    //check for operatorGlobal 1+2 ie if operatorGlobal is + then numGlobal1 is already received from the user
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

//function to get the operator from the user for the first time only
const getOperator = (key) => {
    //get the operatorGlobal only if the numGlobal1 is already recieved
    //check if the operatorGlobal is null or not 
    if(operatorGlobal === null && numGlobal1 !== null){
        operatorGlobal = key;
        //assign the below var 1 if the user inputs the first operator ie 1+
        countOperatorEntry = 1;
    }
    //check for numGlobal1
    else if(numGlobal1 !== null){
        //now increment by 1 for second operator ie 1+2- here 1 is first ope and - is second
        //imp -  countOperatorEntry will be = 0 once the opearatorAssign is called 
        //if 1+2 is entered and = is pressed then output is 3 next operation is press 9 without the pressing any operator in between
        //then the countOperatorEntry will be = 0 because the function opearatorAssign is called once
        // ie 1+2 = next press 9+6 = so contOpeartorEntry changes from 0 - 1
        // countOperatorEntry will be greater than 2 if a operator is pressed continuously ie 2 + 1 * - * +
        //now countOperatorEntry is equal to 5
        countOperatorEntry += 1;
        //check for a special condition 
        //the below condition occurs whrn 4+6 = is pressed the output is 10 and immediately the 
        //number is pressed say 9 without any operator in between the result and the new number 
        //entered so in order to start new calculation and flush the result stored in numGlobal1 
        //following operation is performed 4+6 = output 10 press 9+8 = output 17 instead 9+ 
        //output will come as 19
        if(numGlobal1 === mathResult && numGlobal2 !== null && countOperatorEntry === 1){
            //if the result is not needed for calculation then perform the following opeartions
            numGlobal1 = numGlobal2;
            numGlobal2 = null;
        }
        //check for 1+3+8-9*7 will be performed by the below condition
        //if 2+---++*5 is entered still the 2*5 will be calculated
        else if(numGlobal1 !== null && numGlobal2 !== null && countOperatorEntry >= 2){
            operate();
            clearAllfunc();
            displayResult();
            numGlobal1 = mathResult;
            numGlobal2 = null;
            countOperatorEntry = 1;
        }
        //after all the above checks change the opearator for next iteration
         operatorGlobal = key;
    }
}

//get the result when = is pressed
const operateAssignOnNumb = () => {
    //below condition checks if the operands and operator is initialized by the user
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
        countOperatorEntry = 0;
    }
}

const changeKeyColor = (key) => {
    //change the color of the key when the key is pressed through keyboard
    //since NaN === NaN is false because NaN is not a number so it is not equal to anything including itself
    //so isNaN is a function
    if(['.','Delete','<','=','+/-','+','-','*','/','%','Enter','Backspace','_'].includes(key)|| !isNaN(key) && key !== ' '){
        if(key === 'Enter') key = '=';
        else if(key === 'Backspace') key = '<';
        else if(key === '_') key = '+/-';
        //data-key is not a default attribute but it is created for easy access of the html element
        const newButton = document.querySelector(`button[data-key ="${key}"]`);
        //add a class which colors the button on screen
        newButton.classList.add('newColor');
        //remove the color of the button after 70 millisecond
        setTimeout(() => {
            newButton.classList.remove('newColor');},'70');
    }  
}

const getUserInput = (e) => {
    let key = null;
    //e.key will be undefined if the input is recieved through mouse click
    //e.target.innerText gives the value inside respective html element
    //when the user presses the button on the screen the eventlistener fires up and passes the event to this function
    //since the button has the innerText make the key equal to that
    if(e.key === undefined)key = e.target.innerText;
    else {
        //if the user types the value eventListener passes the different event where e.key will be made equal to key
        key = e.key;
        //call function to change the color on the screen
        changeKeyColor(key);
    }
    //check if the entered value is number or not if number is entered theen isNaN returns false
    if(!isNaN(key)) createNumber(key);
    //check whether operator is pressed or not if key is equal to any opearaor within the array 
    //then returns true else false
    else if(['+','-','*','/','%'].includes(key)) getOperator(key);
    else if(key === '.') insertDecimalDot(key);
    //key = +/- when clicked on screen by mouse but through keyboard it is _
    else if(key === '+/-' || key === '_') changeNumbSign(key);
    // Backspace is for keyboard
    else if(key === '<' || key === 'Backspace') popLastDigit(key);
    //Since NaN === NaN is false we cannot check for the condition parseInt(key) === NaN 
    // NaN is not a number so Not a Number is not equal to itself
    //Delete for keyboard
    else if(key === 'clear' || key === 'Delete') clearAllfunc();
    //Enter for keyboard
    else if(key === '=' || key === 'Enter') operateAssignOnNumb();
    // Very IMp-- e.preventDefault() prevents the keyboard keys firing the eventListeners multiple times
    //without this when Enter is pressed the first the keyDown event listener is fired 
    //if there is a button in focus on the screen ie with outline(remove Outline:none in css)
    //then second eventListener is fired ie the click eventListener so now numGlobal2 becomes
    //equal to the the button in focus
    //button on the screen will be focused when both click and keyboard methods are used for rest of
    //the situation when only click or only keyboard is used the program works fine without the eventlistener
    e.preventDefault();
}

const calcButtons = document.querySelectorAll('.subClassAll');
calcButtons.forEach((button) => {button.addEventListener('click',getUserInput)});
document.addEventListener('keydown',getUserInput);
