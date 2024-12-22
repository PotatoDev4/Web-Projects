const numbersArray = ['0','1','2','3','4','5','6','7','8','9'];
const operators = ["+","-","*","/","."];
const fieldElem = document.querySelector('.js-calc-field');
let count = '';
fieldElem.innerText = 0;

function calculation(number) {
    if (number == '0' && !count) {
        
    } else {
        count += number;
        fieldElem.innerText = count;
    }
}

function reset() {
    count = '';
    fieldElem.innerText = '0';
}

function result() {
    if (count){
        const finalCount = eval(count);
        fieldElem.innerText = finalCount;
        count = String(finalCount);
    }
}

function del(){
    if (count){
        count = count.slice(0, -1);
        if (count){
            fieldElem.innerText = count;
        } else {
            fieldElem.innerText = '0';
        }
    }
}

document.body.addEventListener('keydown', (event)=>{
    if (event.key in numbersArray){
        calculation(event.key);
    } else if (check(event, operators)) {
        calculation(event.key);
    } else if (event.key === 'Backspace'){
        del();
    } else if (event.key === 'Enter') {
        const resultElem = document.getElementById('result');
        resultElem.click()
    }
})
function check(event, array){
    let value = false;
    array.forEach(element => {
        if (event.key === element) {
            value = true;
        }
    });
    return value
}