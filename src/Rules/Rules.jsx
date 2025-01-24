const minValue = 'MIN_VALUE'
const maxValue = 'MAX_VALUE'
const emailValue = 'EMAIL_VALUE'

export const minValidators = (min) => ({
    value: minValue,
    min,
});
export const maxValidators = max => ({
    value: maxValue,
    max,
});

export const emailValidators = () => ({
    value: emailValue,
});

export default { minValue, maxValue, emailValue }