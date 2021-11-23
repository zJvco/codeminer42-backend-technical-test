// Validate if type of value is number
function validateNumber(...args) {
    for (let i = 0; i < args.length; i++) {
        if (typeof(args[i]) != "number") {
            return false;
        }
    }
    return true;
}

// Validate if type of value is string
function validateString(...args) {
    for (let i = 0; i < args.length; i++) {
        if (typeof(args[i]) != "string") {
            return false;
        }
    }
    return true;
}

module.exports = { validateNumber, validateString }