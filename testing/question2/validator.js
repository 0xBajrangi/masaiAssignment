function validator(pass) {
    if (pass.length < 6) {
        return "minimum length should be 6"
    }
    let symbol = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', ',', '.', '<', '>', '/', ';', ':', ']', '[', '{', '}', `\\`, '|', '?'];
    let smallLetters = "abcdefghijklmnopqrstuvwxyz".split("");
    let capLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    let num = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let caplettercount = 0;
    let smalllettercount = 0;
    let numcount = 0;
    let numofSymbols = 0;
    for (let i = 0; i < pass.length; i++){
        if (symbol.includes(pass[i])) {
            numofSymbols++;
        }else if (smallLetters.includes(pass[i])) {
            smalllettercount++;
        }else if (capLetters.includes(pass[i])) {
            caplettercount++;
        }else if (num.includes(pass[i])) {
            numcount++;
        }
    }
    if (!numofSymbols) {
        return "missing Symbol"
    } else if (!smalllettercount) {
        return "small character missing"
    } else if (!caplettercount) {
        return "missing capital letters letters"
    } else if (!numcount) {
        return "missing number"
    } else {
        return "valid"
    }
}

module.exports = validator;