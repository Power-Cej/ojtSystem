function formatCurrency(number, minimumFractionDigits = 2) {
    return number
        .toLocaleString("en-US", {
            style: "currency",
            currency: "PHP",
            minimumFractionDigits
        })
        .replace("PHP", "")
        .trimStart();
}

export default formatCurrency;
