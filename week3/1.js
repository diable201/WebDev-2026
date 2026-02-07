if (true) {
    var leaked = "leaked"
 }

 console.log(leaked) // "leaked"

//  if (true) {
//     let notLeaked = "not leaked"
//  }

//  console.log(notLeaked) // ReferenceError: notLeaked is not defined


//  const name = "John"
//     name = "Doe" // TypeError: Assignment to constant variable.

const user = {
    name: "Alice"
}
// user.name = "Bob" // This is allowed, we can change properties of a const object
// console.log(user.name) // "Bob"

user = { name: "Charlie" } // TypeError: Assignment to constant variable.