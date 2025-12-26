function gcd(a, b) {
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
  return a;
}

console.log(gcd(18, 9));
console.log(gcd(17, 9));
console.log(gcd(32, 16));
console.log(gcd(67, 31));