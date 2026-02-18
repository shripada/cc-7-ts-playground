// ! Exercise : Create an instance of Flight.
const aFlight = {
    date: '3-Feb-2026',
    operator: 'Indigo',
    destination: { airport: 'Mangalore', latitude: 10, longitude: 14 },
    origin: { airport: 'Bangalore', latitude: 15, longitude: 14 },
    price: 2000,
    supersonic: false,
    displayInfo(sequence) {
        return '';
    },
};
// ! Exercise: Create an instance of PassengerFlight. How do we implement displayInfo?
const aPassengerFlight = {
    date: '3-Feb-2026',
    operator: 'Indigo',
    destination: { airport: 'Mangalore', latitude: 10, longitude: 14 },
    origin: { airport: 'Bangalore', latitude: 15, longitude: 14 },
    price: 2000,
    supersonic: false,
    make: 'Airbus',
    countryOfOrigin: 'India',
    displayInfo(sequence) {
        const that = this;
        function doStuff2() {
            console.log(that.operator);
        }
        const doStuff3 = () => {
            console.log(that.operator);
        };
        // doStuff3();
        console.log(sequence);
        // Going to get a `this` parameter
        // When a function becomes part of an object, it is called as method.
        // return `${this.operator} flight is from ${this.origin.airport} to ${this.destination.airport}`;
        return this.operator;
    },
    //   displayInfo: () => {
    //     return `${this.operator} flight is from ${this.origin.airport} to ${this.destination.airport}`;
    //   },
};
function doStuff1() {
    // global in node, and window in browser. globalThis
    // you get implicitely the `this` argument
    console.log(this);
}
// doStuff1(); //this will be global.
console.log(aPassengerFlight.displayInfo(3));
const adder = (a, b) => a + b;
adder(1, 2);
const displayInfo = aPassengerFlight.displayInfo;
globalThis.operator = 'Delta Airlines';
console.log(displayInfo(4)); // ? What do you think will happen now?
export {};
//# sourceMappingURL=interface.js.map