function sum(a, b) {
    if (
        typeof(a) === 'number' &&
        typeof(b)  === 'number'
    ) {
        return a + b;
    } else {
        throw new TypeError('кукушечки, a или b не число');
    }
}

module.exports = sum;
