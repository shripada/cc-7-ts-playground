function displayID(id) {
    if (typeof id === 'number') {
        // type narrowing.
        console.log(id.toFixed(7));
    }
    else {
        console.log(id.toUpperCase());
    }
}
displayID('zzz');
function goTo(direction) {
    switch (direction) {
        case 'East':
        case 'North':
        case 'South':
        case 'West':
    }
}
export {};
// Some times depending on the
//# sourceMappingURL=union-types.js.map