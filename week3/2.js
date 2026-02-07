const nums = [1, 2, 3, 4, 5];

const doubled = nums.map(num => num * 2);

console.log(doubled); // Output: [2, 4, 6, 8, 10]

const filtered = nums.filter(num => num % 2 === 0);

console.log(filtered); // Output: [2, 4]

const sum = nums.reduce((acc, num) => acc + num, 0);

console.log(sum); // Output: 15

const resutlt = nums
    .filter(n => n % 2 === 0)
    .map(n => n ** 2)

console.log(resutlt); // Output: [4, 16]