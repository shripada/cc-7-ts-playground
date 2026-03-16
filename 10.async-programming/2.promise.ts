// Promise API brought in standard way to abstract
// out async operations and made it consistent to consume the data
// as well as the errors.

const aPromise = new Promise<number>((resolve, reject) => {
	// any sync or async operation can be performed here.

	// in case of success, you can record the value or result
	// using resolve.  resolve(value);

	// setTimeout(() => reject(100), 10000);
	const success = true;
	if (success) {
		resolve(10); // calling resolve anywhere
		// inside executor function
		// will immediately end the execution and resolve the value.
		resolve(100);
		reject("");
		console.log("Trying to fool promise");
	} else {
		reject(new Error("Some error occured"));
		// throw new Error("Some error occured"); // a reject can be achieved by throwing an exception as well.
	}

	// in case of an error, your will record error using reject(error)
});

// How do we consume the value that is resolved?
// aPromise.then((resolved) => console.log(resolved));
// aPromise.then((resolved) => console.log(resolved));
// aPromise.then((resolved) => console.log(resolved));
// aPromise.then(
// 	(resolved) => console.log(resolved),
// 	(rejected) => console.log(rejected),
// );

// aPromise
// 	.then((resolved) => console.log(resolved)) // return value of then will be a promise always. if the promise is resovled, then the promise returned will be resolved promise with whatever value that is returned by resolve callback.
// 	.catch((rejected) => {
// 		console.log(rejected);
// 	})

const finalPromise = aPromise
	.finally(() => {
		// throw new Error("finally is fatal!"); // this will end up create a rejected promise
		// however a normal return has no bearing on the promise chain, it is going to be ignored.
		return Promise.reject(888888); // all returns except returning a rejected promise will be ignored.
	}) // finally will always pass through the promise on which it is invoked.
	.then((value: number) => {
		// return Promise.resolve(1000); // return undefined.
		console.log("The value after final:", value);
		throw new Error("an exception inside then!"); // return value will be a rejecred promise
	})
	.then((value1) => console.log(value1)) // then will always call this callback on resolved promise. if it is called on rejected promise, it will simply return promise.
	.catch((err) => {
		console.log(err, err.message);
		// return 12345;
		throw new Error("an exception inside catch!");
	})
	.finally(() => {
		console.log(
			"finally will be called on a promise, be it resolved or rejected",
		);
		return 999999;
	});

finalPromise
	.then((val) => console.log(val))
	.catch((rej) => console.log(rej.message));

// const  resolve = <T>(value:T) => new Promise<T>((resolve) => {
//     resolve(value);
// })

// // Create a resolved promise with value 'greeting'
// const resolvedPromise = resolve('greeting');

// const  reject = (value:any) => new Promise((_, reject) => {
//     reject(value);
// })

// const rejectedPromise = reject(new Error("Some error"));

// Promise.resolve(),  Promise.reject() APIs achieve the same functionality discussed above.
