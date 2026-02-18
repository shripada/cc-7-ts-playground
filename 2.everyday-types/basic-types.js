// * Basic types
let example1 = 'Hello World!'; //
let example2 = 42;
let example3 = true;
let example4 = Symbol(); // Unique value
let example5 = 123n; // Very large numbers
let example6 = null;
let example7 = undefined;
// * Type inference
// Not always we need to supply type. Many times TS can infer the type.
let dob = '31 Aug 2020';
dob = 20; // TS fixes the inferred type earlier. Only string is allowed for dob
let isReleased = true;
let trackCount = 13;
// Function parameters always need annotation
function add(a, b) {
    //* hover to see what typescript is inferring
    return a + b;
}
add(1, 2);
add('s', 1);
add({}, 1);
// It is a good practice to mention type of return value as well.
// This will guide implementation to return correct value.
function addP(a, b) {
    return a + b;
}
// `any` type basically downgrades the type checking and takes us back to js
// ! using `any` is therefore discouraged.
function addDownGraded(a, b) {
    return a.split(b); // ! we can do whatever we want here!
}
// * Exercise 1:
// Fix the error, and ensure it returns value of proper type
function subtract(a, b) {
    return;
}
// * Exercise 2:
export let example11 = 'Hello World!';
export let example22 = 42;
export let example33 = true;
export let example44 = Symbol();
export let example55 = 123n;
//# sourceMappingURL=basic-types.js.map