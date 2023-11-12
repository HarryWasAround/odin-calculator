//global variables for later use
const Ldisplay = document.getElementById("lower-dis");
const Udisplay = document.getElementById('upper-dis');
let num1;
let operator;
let num2;

//Display chosen operations correctly and with the right spacing
function getNums() {
    const buttons = document.querySelectorAll('li');
    buttons.forEach((item) => {
        item.addEventListener("click", () => {
            let value = item.textContent;
            if (value == 'AC') {
                location.reload();
            }else if (value === '.' && Ldisplay.textContent.includes('.')) {
                Ldisplay.textContent = Ldisplay.textContent;
            }else if (value === '.') {
                Ldisplay.textContent = Ldisplay.textContent + `${value}`;
            }else if (value === '=') {
                Ldisplay.textContent = Ldisplay.textContent;
            }else if (isNaN(value)) {
                Ldisplay.textContent = Ldisplay.textContent + ' ' +  value + ' ';
            } else {
                Ldisplay.textContent = Ldisplay.textContent + `${value}`;
            }
        });
    });
}

//handy methods for solving operations
const methods = {
    operators : {
        '-' : (a, b) => a - b,
        '+' : (a, b) => a + b,
        '*' : (a, b) => a * b,
        '/' : (a, b) => a / b,
        '%' : (a, b) => a % b,
    }
}

//use methods to get a result
function operate(a, op, b) {
    return methods['operators'][op](a, b);
}

//use the previous functions to display result
function displayResults() {
    getNums(); 

    const equals = document.querySelector('.big');
    equals.addEventListener('click', () => {
        var content = Ldisplay.textContent.split(' ');
        num1 = +content[0];
        operator = content[1];
        num2 = +content[2];
        let text = Ldisplay.textContent;

        if (content.length > 3) {
            for (let i = 0; i < 100000; i++) {
                Udisplay.textContent = text;
                content.splice(0, 3);
                content.unshift(operate(num1, operator, num2));
                num1 = +content[0];
                operator = content[1];
                num2 = +content[2];
                Ldisplay.textContent = content.join('');
                if (content.length === 1) {
                    break;
                }
            }
        }
        Udisplay.textContent = content.join(' ');

        if (content[0] === Infinity || operate(num1, operator, num2) === Infinity) {
            Ldisplay.textContent = 'Nice try (;';
            setTimeout(() => {
                location.reload();
            }, 2000);  
        }else if (isNaN(operate(num1, operator, num2))) {
            Ldisplay.style.cssText = 'font-size: 18px';
            Ldisplay.textContent = 'You did not imput a solvable operation';
            setTimeout(() => {
                location.reload();
            }, 2000);
        }else if (operate(num1, operator, num2) === Math.floor(operate(num1, operator, num2))) {
            Ldisplay.textContent = operate(num1, operator, num2);
        }else{
            Ldisplay.textContent = operate(num1, operator, num2).toFixed(2);
        }
    });


}
displayResults();