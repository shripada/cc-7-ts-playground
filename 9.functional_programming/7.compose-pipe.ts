// We can create higher order functions from existing functions.
// we have already seen point free style using currying and partial application.
// Currying helped us to create sequence of functions and thereby enabled partial applications to create
// point free functions.

// Let us consider the following functions

const increment = (num: number) => num + 1;
const double = (num: number) => num * 2;

// How do we now right a function that doubles a given number and then increments using the above functions?
const doubleAndInc = (num: number) => {
	const doubled = double(num);
	const incremented = increment(num);
	return incremented;
};
