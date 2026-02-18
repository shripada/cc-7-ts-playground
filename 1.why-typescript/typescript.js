console.log(8 * null); // JS will do a type coercion here, null will be converted to 0
// → 0
console.log('5' - 1); // 5 will be coerced to number
// → 4
console.log('5' + 1); // 1 will be coerced to string
// → 51
console.log('five' * 2); // NaN
// → NaN
console.log(false == 0); // 0 is coerced to a boolean false
// → true
const student = {
    name: 'John Apple',
    dob: '25Feb2010',
};
student.getReport(); // JS is dynamically typed and loaded language. You will crash when this is run. No static time warnings!.
student.college; // JS will allow, and return undefined
const numbers = [1, 2, 3, 5];
numbers[0]; // 1
numbers[10]; // undefined. If we try to access non existent index, we get undefined.
numbers[0] = 'We can assign a string!'; // We can assign values of any types. no static time warnings.
export {};
//# sourceMappingURL=typescript.js.map