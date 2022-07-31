const readline = require('readline');

const cmd = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/**
 * Emulate Python's `input` function.
 */
async function terminalInput(prompt) {
    return new Promise(r => cmd.question(prompt ? prompt : "", r));
}

/**
 * Emulate Python's `print` function.
 * @param args any arguments to be printed
 */
function print(...args) {
    console.log(...args);
}

async function main() {
    print("Welcome to the calculator made by @IngPleb! To exit, type 'exit'.")

    const LEFT_HAND_NUMBER = 1
    const RIGHT_HAND_NUMBER = 2
    const OPERATOR = 3

    let firstNumber = 0
    let secondNumber = 0

    let mode = LEFT_HAND_NUMBER
    while (true) {
        if (mode > OPERATOR)
            mode = LEFT_HAND_NUMBER

        switch (mode) {
            case  LEFT_HAND_NUMBER:
                print("Enter the left hand number:");
                break;
            case RIGHT_HAND_NUMBER:
                print("Enter the right hand number:");
                break
            case OPERATOR:
                print("Enter the operator (+, -, *, /):");
                break;
            default:
                throw new Error("There was an internal error! Invalid mode!")
        }

        const input = await terminalInput()

        if ("exit" === input.toLowerCase())
            break


        if (mode === LEFT_HAND_NUMBER || mode === RIGHT_HAND_NUMBER) {
            let parsedNumber = parseFloat(input)

            if (isNaN(parsedNumber)) {
                print("Invalid number! (" + input + ")")
                continue;
            }

            if (mode === LEFT_HAND_NUMBER)
                firstNumber = parsedNumber
            else
                secondNumber = parsedNumber
        } else {
            let result
            switch (input) {
                case "+":
                    result = firstNumber + secondNumber
                    break
                case "-":
                    result = firstNumber - secondNumber
                    break
                case "*":
                    result = firstNumber * secondNumber
                    break
                case "/":
                    result = firstNumber / secondNumber
                    break
                default:
                    print("Invalid mathematical operation! (Valid operations are +, -, *, /)")
                    continue
            }
            print("Result: " + firstNumber + " " + input + " " + secondNumber + " = " + result)
        }

        mode = mode + 1
    }
}

main().then(r => {
    print("Goodbye :c ")
    process.exit()
})