import assert from "node:assert/strict";

// Regular function that adds three numbers
function addThree(a: number, b: number, c: number): number {
	return a + b + c;
}

// Curried variant that lets us partially apply inputs
function addThreeNumbers(a: number): (b: number) => (c: number) => number {
	return function (b: number): (c: number) => number {
		return function (c: number): number {
			return a + b + c;
		};
	};
}

const add5 = addThreeNumbers(5);
const add10 = addThreeNumbers(10);
const add5and10 = add5(10);
const resultFromAdders = add5and10(20);
assert.strictEqual(resultFromAdders, 35);
assert.strictEqual(addThreeNumbers(1)(2)(3), 6);
assert.strictEqual(add10(5)(2), 17);

function log(
	module: string,
	level: "WARN" | "DEBUG" | "INFO",
	message: string,
): void {
	console.log(`${module}: ${level}: ${message}`);
}

log("service", "DEBUG", "The memory usage is high");
log("service", "DEBUG", "function doStuff called!");

function logServiceWarn(message: string): void {
	log("service", "WARN", message);
}

logServiceWarn("Memory overrun detected!");

const curriedLog = function (
	module: string,
): (level: "WARN" | "DEBUG" | "INFO") => (message: string) => void {
	return function (
		level: "WARN" | "DEBUG" | "INFO",
	): (message: string) => void {
		return function (message: string) {
			console.log(`${module}: ${level}: ${message}`);
		};
	};
};

const logServiceWarn1 = curriedLog("service")("WARN");
logServiceWarn1("Memory might overrun soon!");

const logServiceDebug = curriedLog("service")("DEBUG");
logServiceDebug("Reached here");

/**
 * Generic curry helper that keeps collecting arguments until it can call the base function.
 */
function curry<T extends (...args: any[]) => any>(
	fn: T,
): (...args: Parameters<T>) => ReturnType<T> {
	return function curried(this: unknown, ...args: any[]): any {
		if (args.length >= fn.length) {
			return fn.apply(this, args);
		}
		return (...nextArgs: any[]) => curried(...args, ...nextArgs);
	};
}

{
	function add(a: number, b: number, c: number): number {
		return a + b + c;
	}

	const curriedAdd = curry(add);
	const add5 = curriedAdd(5);
	const add5and10 = add5(10);
	const result = add5and10(20);
	assert.strictEqual(result, 35);
}
