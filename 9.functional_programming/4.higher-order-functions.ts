import assert from "node:assert/strict";

/**
 * createMultiplier returns a function configured with a specific multiplier.
 */
function createMultiplier(multiplier: number): (num: number) => number {
	return function (num: number): number {
		return num * multiplier;
	};
}

const multiplyByTwo = createMultiplier(2);
const multiplyByTen = createMultiplier(10);
assert.strictEqual(multiplyByTwo(5), 10);
assert.strictEqual(multiplyByTen(5), 50);

/**
 * createGreeter builds a customized greeter function.
 */
function createGreeter(greeting: string): (name: string) => string {
	return function (name: string): string {
		return `${greeting}, ${name}!`;
	};
}

const sayHello = createGreeter("Hello");
const sayHi = createGreeter("Hi");
assert.strictEqual(sayHello("Bob"), "Hello, Bob!");
assert.strictEqual(sayHi("Charlie"), "Hi, Charlie!");

/**
 * Each counter returned by createCounter maintains its own private state.
 */
function createCounter(): () => number {
	let count = 0;
	return function (): number {
		count++;
		return count;
	};
}

const counter1 = createCounter();
const counter2 = createCounter();
console.log("\n--- Closures with State ---");
console.log("Counter 1:", counter1());
console.log("Counter 1:", counter1());
console.log("Counter 2:", counter2());
console.log("Counter 1:", counter1());
console.log("Counter 2:", counter2());

/*
## Higher Order functions

A function that takes one or more functions as its arguments and/or returns a function as its return value is known as a **Higher-Order function**.

Examples: `forEachElement`, `createGreeter`.

---

## Closure mechanism

A **closure** is the combination of a function bundled together with references to its surrounding state (the *lexical environment*).

Closures give inner functions access to outer scopes, and they are created every time a function is defined.

---
*/
