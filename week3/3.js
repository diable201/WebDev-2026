function* range(n) {
    for (let i = 0; i < n; i++) {
        yield i;
    }
}

const result = range(10000)
    .filter(n => n % 2 === 0)
    .map(n => n * 3)
    .take(5)
    .toArray();

console.log(result); // Output: [0, 6, 12, 18, 24]