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

const aCounter = counter(200); // initial count state is 0 by default.

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

type Listener<T> = (state: T) => void;

const createStore = <S, A>(
	initialState: S,
	reducer: (state: S, action: A) => S,
) => {
	let state: S = initialState;
	let listeners: Listener<S>[] = [];

	return {
		dispatch(action: A): void {
			let newState = reducer(state, action);
			if (newState !== state) {
				state = newState;
				listeners.forEach((l) => l(state));
			}
		},

		currentValue() {
			return state;
		},

		// returns a remove lister for the listener added.
		addListener(listener: Listener<S>): () => void {
			listeners.push(listener);
			return () => this.removeListener(listener);
		},

		removeListener(listener: Listener<S>) {
			listeners = listeners.filter((l) => l !== listener);
		},
	};
};

const counterReducer = (state: number, action: CounterAction): number => {
	switch (action.type) {
		case "INCREMENT":
			return state + action.data;
		case "DECREMENT":
			return state - action.data;
		case "RESET":
			return action.value;
	}
	return state;
};

interface AppConfigState {
	numOfThreads: number;
	adminPassword: string;
	baseURL: string;
	pointToStart: {
		x: number;
		y: number;
	};
}

type AppConfigActions =
	| { type: "THREADS"; count: number }
	| { type: "STARTPOINT"; point: { x: number; y: number } };

// Reducer must be a pure function.
const appConfigReducer = (
	state: AppConfigState,
	action: AppConfigActions,
): AppConfigState => {
	switch (action.type) {
		case "THREADS":
			const newState = { ...state };
			newState.numOfThreads = action.count;
			return newState; // state !== newState.
	}
	return state;
};

const initalAppState: AppConfigState = {
	adminPassword: "admin",
	baseURL: "b/u/r/l",
	numOfThreads: 10,
	pointToStart: { x: 10, y: 10 },
};

const appStore = createStore(initalAppState, appConfigReducer);

// inside image processing module
const unsubscribe = appStore.addListener((state: AppConfigState) => {
	console.log("State Changed!!! \n", state);
});

// somewhere in the app, modifying the thread count
appStore.dispatch({ type: "THREADS", count: 5 });
appStore.dispatch({ type: "THREADS", count: 5 });
//unsubscribe();
appStore.dispatch({ type: "THREADS", count: 15 });
