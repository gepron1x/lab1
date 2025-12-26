function minDigit(x) {
    minValue = 9;
    while(x > 0) {
        let digit = x % 10;
        if (digit == 0) return 0;
        if(digit < minValue) minValue = digit;

        x = (x - digit) / 10;
    }
    return minValue;
}

console.log(minDigit(80085));
console.log(minDigit(123456789));
console.log(minDigit(9432));
