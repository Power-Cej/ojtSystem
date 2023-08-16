function formatNumber(number, minimum) {
    return number.toLocaleString('en-US', {
        minimumIntegerDigits: minimum,
        useGrouping: false
    })
}

export default formatNumber;
