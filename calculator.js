let calculator_input_Number_V = document.getElementById('calculator_input_Number');
let calculator_input_Number_Previews_V = document.getElementById('calculator_input_Number_Previews');
let Calculator_input_AC_V = document.getElementById('Calculator_input_AC');

let DisplayValue;

function display(DisplayValue) {
    calculator_input_Number_V.value += DisplayValue;
}

Calculator_input_AC_V.addEventListener('click', () => {
    calculator_input_Number_V.value = "";
    calculator_input_Number_Previews_V.value = "";
});

function displaySolve() {
    let eq = calculator_input_Number_V.value;
    calculator_input_Number_Previews_V.value = eq;
    try {
        let y = eval(eq);
        calculator_input_Number_V.value = y;
    } catch (error) {
        calculator_input_Number_V.value = "Error";
    }
}

// Special feature: Show "I love u" when 0000 is entered
function checkSpecialInput() {
    if (calculator_input_Number_V.value === '0000') {
        showILoveYou();
    }
}

// Add event listener to check for special input
calculator_input_Number_V.addEventListener('input', checkSpecialInput);

// Shake detection
let lastX, lastY, lastZ;
let moveCounter = 0;

function showILoveYou() {
    calculator_input_Number_V.value = 'I love u';
    setTimeout(() => {
        calculator_input_Number_V.value = '';
        calculator_input_Number_Previews_V.value = '';
    }, 2000);
}

if ('DeviceMotionEvent' in window) {
    window.addEventListener('devicemotion', (event) => {
        const diffX = Math.abs(event.accelerationIncludingGravity.x - lastX);
        const diffY = Math.abs(event.accelerationIncludingGravity.y - lastY);
        const diffZ = Math.abs(event.accelerationIncludingGravity.z - lastZ);

        if (diffX + diffY + diffZ > 30) {
            moveCounter++;
        } else {
            moveCounter = 0;
        }

        if (moveCounter > 10) {
            showILoveYou();
            moveCounter = 0;
        }

        lastX = event.accelerationIncludingGravity.x;
        lastY = event.accelerationIncludingGravity.y;
        lastZ = event.accelerationIncludingGravity.z;
    });
}

// Prevent scrolling on iOS
document.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });