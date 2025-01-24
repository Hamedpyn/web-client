import testEmail from "./Regex";
import Rules from "./Rules"


const Validator = (value, validations) => {

    let validationResult = []

    for (const validator of validations) {
        if (validator.value === Rules.minValue) {
            value.trim().length < validator.min && validationResult.push(false)
        }
        if (validator.value === Rules.maxValue) {
            value.trim().length > validator.max && validationResult.push(false)
        }
        if (validator.value === Rules.emailValue) {
            !testEmail(value) && validationResult.push(false)
        }

    }
    if (validationResult.length) {
        return false
    } else {
        return true
    }

};
export default Validator;