// Redux is a popular FP pattern to
// manage application state.

// Reducer, is a pure function, that creates a new
// state every time it is called, with an existing state, and an action

// A counter example
// we can reset to a given value
// we can increment
// we can decrement

const counter = (initialCount = 0) => {
	let count = initialCount; // state
	return {
		increment(inc: number = 1) {
			// action
			count = count + inc;
		},
		decrement(dec: number = 1) {
			// action
			count = count - dec;
		},
		reset(value: number = 0) {
			// action
			count = value;
		},
		currentValue() {
			// just a probing, getter of the state
			return count;
		},
	};
};

const aCounter = counter(); // initial count state is 0 by default.

aCounter.increment(10);
aCounter.decrement(4);
aCounter.increment(3);
aCounter.currentValue();

// Here state can only be modified via the actions identified.

// Our aim is to generalise the actions. Having them
// as methods is not going to work for us, as these methods will change from system to system.

type CounterAction =
	| { type: "INCREMENT"; data: number }
	| { type: "DECREMENT"; data: number }
	| { type: "RESET"; value: number };

const createStore = <T, A>(initial: T, reducer: (state: T, action: A) => T) => {
	let state: T = initial;

	return {
		dispatch(action: A) {
			// needs to apply the action, and should
			// compute new state
			state = reducer(state, action);
		},
		currentState() {
			return state;
		},
	};
};

// reducers must be pure functions. They will always create
// a shallow copy of existing state, and modify it and return it.
const counterReducer = (state: number, action: CounterAction): number => {
	let newState = state;
	switch (action.type) {
		case "INCREMENT":
			newState = newState + action.data;
			break;
		case "DECREMENT":
			newState = newState - action.data;
			break;
		case "RESET":
			newState = action.value;
			break;
	}
	return newState;
};

const counterStore = createStore(0, counterReducer);

counterStore.dispatch({ type: "INCREMENT", data: 10 });
console.log(counterStore.currentState()); // 10

counterStore.dispatch({ type: "DECREMENT", data: 10 });
console.log(counterStore.currentState()); // 0

// ! please write vitest tests to test counterStore.
