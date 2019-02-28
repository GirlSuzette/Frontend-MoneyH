const addCommas = number => {
    let amount;

    if (typeof number === "number") {
        amount = number.toString()
    } else if (typeof number === "string") {
        amount = number.split('').filter(char => char !== ".").join('')
    }

    amount = amount.split('').map((num, index, arr) => {
        const leng = arr.length

        const firstDot = leng - 4
        const secondDot = leng - 7
        if ((leng >= 4 && index === firstDot) || (leng >= 7 && index === secondDot)) {
            return num + ","
        } else {
            return num
        }
    }).join("")
    // amount = parseInt(amount)
    return amount + ".00"
}
module.exports = addCommas
