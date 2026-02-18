// * Object literal types
// We can create an object using literal syntax
const lion = {
    //? Exercise - what happens when you hover over const lion?
    name: 'Lion',
    livesInLand: true,
    isPredator: true,
    estimatedCount: 3000,
};
// * function that displays an animal
function displayStringForAnimal(animal) {
    const displayStr = `${animal.name} is ${animal.isPredator ? 'a predator' : 'not a predator'}\n. It is ${animal.estimatedCount > 10000 ? 'not endangered' : 'endangered!'}`;
    return displayStr;
}
function displayToConsole(animal) {
    const displayStr = displayStringForAnimal(animal);
    console.log(displayStr);
}
displayToConsole(lion);
const aCat = {
    name: 'Tom',
    livesInLand: true,
    estimatedCount: 100000,
    isPredator: true,
};
displayToConsole(aCat); //! Exercise: Fix the error - few fields are missing.
// * Typescript follows structured typing.
const aDog = {
    name: 'Dog',
    livesInLand: true,
    isPredator: false,
    estimatedCount: 1000000,
    domesticated: true,
};
displayToConsole(aDog); // * TypeScript ignores additional fields. It has everything that the function is expecting and much more. All the extra fields are ignored.
// * optional properties.
function logAnimal(animal) {
    displayToConsole(animal);
    if (animal.isDomesticated) {
        //* optinal param check, if it is absent, value will be undefined.
        console.log('Domesticated!');
    }
}
logAnimal(lion);
logAnimal(aDog);
const getRectangleArea = (rectangle) => {
    return rectangle.width * rectangle.height;
};
const getRectanglePerimeter = (rectangle) => {
    return 2 * (rectangle.width + rectangle.height);
};
/*
 * Arrays and Tuples
 */
// * You can also describe the types of arrays in TypeScript. There are two different syntaxes for doing this.
// * The first option is the square bracket syntax. This syntax is similar to the type annotations we've made so far, but with the addition of two square brackets at the end to indicate an array.
let albums = [
    'Rubber Soul',
    'Revolver',
    "Sgt. Pepper's Lonely Hearts Club Band",
];
let dates = [1965, 1966, 1967];
let albums1 = [
    'Rubber Soul',
    'Revolver',
    "Sgt. Pepper's Lonely Hearts Club Band",
];
let selectedDiscography = [
    {
        artist: 'Bob dyle',
        title: 'Rubber Soul',
        year: 1965,
    },
    {
        artist: 'The Beatles',
        title: 'Revolver',
        year: 1966,
    },
];
// ! exercise try removing types and see what TS inferes
// !You can not push some differently typed object than typed or inferred earlier
selectedDiscography.push({ name: 'Karma', type: 'cat' });
let album1 = ['Rubber Soul', 29];
album1[1] = 'Hi'; // ! error
// * Tuples are useful for grouping related information together without having to create a new type.
let albumWithPlayCount = [
    {
        artist: 'The Beatles',
        title: 'Revolver',
        year: 1965,
    },
    10000,
];
const albumWithPlayCount1 = [
    {
        artist: 'The Beatles',
        title: 'Revolver',
        year: 1965,
    },
    10000,
];
const processCart = (cart) => {
    // Do something with the cart in here
};
processCart({
    userId: 'user123',
    items: ['item1', 'item2', 'item3'], // ! fixme
});
const processRecipe = (recipe) => {
    console.log(recipe.title);
    console.log('Instructions: ', recipe.instructions);
    if (recipe.ingredients) {
        // !fixme
        for (let ingredient of recipe.ingredients) {
            console.log(ingredient);
        }
    }
};
processRecipe({
    title: 'Chocolate Chip Cookies',
    ingredients: [
        { name: 'Flour', quantity: '2 cups' },
        { name: 'Sugar', quantity: '1 cup' },
    ],
    instructions: 'Mix flour and sugar',
});
//! fixme, ensure someone can pass only two numbers
//! as a tuple
const setRange = (range) => {
    const x = range[0];
    const y = range[1];
    // Do something with x and y in here
    // x and y should both be numbers!
};
setRange([1, 2]); //
//! Fixme
const goToLocation = (coordinates) => {
    const latitude = coordinates[0];
    const longitude = coordinates[1];
    const elevation = coordinates[2];
    // Do something with latitude, longitude, and elevation in here
    if (elevation) {
        console.log(elevation);
    }
};
goToLocation([2, 3, 3]);
function statusOfTicTacToeBoard(board) {
    / * I am not bothered about implementing */;
    return 'drawn';
}
const winningX = ['x', 'o', 'x', 'x', 'x', 'o', 'o', 'x', 'o'];
statusOfTicTacToeBoard(winningX);
const winningO = ['x', 'o', 'x', 'o', 'o', 'o', 'o', 'x', 'o'];
statusOfTicTacToeBoard(winningO);
const drawn = ['x', 'o', 'x', 'x', 'o', 'x', 'o', 'x', 'o'];
statusOfTicTacToeBoard(drawn);
const progress = [undefined, 'x', 'o', 'x', 'o', 'x', 'o', 'x', 'o'];
statusOfTicTacToeBoard(progress);
export {};
// We want a student database.
// A student is going to have a name, he can be undergrad, graduate, post graduate.
// he can subsribe to few subjects. We do not know all subjects in advance. Example: maths, science, kannada, english, chemistry.
// He can have a score out of 100.
// Student should have an address. Address should have street, city, and state, and pincode (a number)
// For now, our database simply resides in memory in an array. That is our database.
// ? What is the type of student?
// ? What is the type of the database?
// ! Exercise
// We want a dealership chain across country for a vehicle brand.  And we want the dealership in only in "Mumbai", "Delhi", "Chennai", "Bangalore". And each location maintains the vehicles in stock. A vehicle has a name, optional registration number, fuel type (petrol, diesel, electric). we need to be able to maintain the inventory for all these 4 cities in a single data structure.
// ? can we have our type for VehicleInventory that captures vehciles in stock for these exact
// ? cities?
//# sourceMappingURL=object-array-tuple-type.js.map