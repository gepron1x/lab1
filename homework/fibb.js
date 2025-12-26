function fibb(n) {
    if (n === 0) return 0;
    if (n === 1) return 1;

    let a = 0n; // big int
    let b = 1n;

    for (let i = 2; i <= n; i++) {
        let t = b;
        b = a + b;
        a = t;
    }

    return b;
}

console.log(fibb(2));
console.log(fibb(10));
console.log(fibb(20));
console.log(fibb(30));
