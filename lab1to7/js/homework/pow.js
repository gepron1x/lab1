function pow(x, n) {
    let r = 1;
    for(let i = 0; i < n; i++) {
        r *= x;
    }
    return r;
}

console.log(pow(2, 0));
console.log(pow(3, 2));
console.log(pow(4, 3));