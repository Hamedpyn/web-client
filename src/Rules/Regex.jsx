const testEmail = (value) => {
    const emailPatten= /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/g
    return emailPatten.test(value)
};
export default testEmail 