const student = {
    name: 'Alice',
    age: 20,
    courses: ['Math', 'Science']
}

const json = JSON.stringify(student)
console.log(json) // {"name":"Alice","age":20,"courses":["Math","Science"]}

const parsedStudent = JSON.parse(json)
console.log(parsedStudent) // { name: 'Alice', age: 20, courses: [ 'Math', 'Science' ] }


console.log(parsedStudent.name) // "Alice"

console.log(JSON.stringify(student, null, 2))

