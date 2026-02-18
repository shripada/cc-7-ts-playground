const logAlbumInfo = (title, trackCount, isReleased, releaseDate, // optional param
format = 'CD') => {
    // Arrow function
    // rest of function body
    return '';
};
logAlbumInfo('Midnights', 13, true, '2022-10-21');
logAlbumInfo('American Beauty', 10, true);
logAlbumInfo('Midnights', 13, true, 'stream');
// * Rest Parameters
function getAlbumFormats(album, ...formats) {
    for (let format of formats) {
        console.log('Next format: ', format);
    }
    return `${album.title} is available in the following formats: ${formats.join(', ')}`;
}
getAlbumFormats({ artist: 'Radiohead', title: 'OK Computer', year: 1997 }, 'CD');
//* Also we can supply variable args by spreading an array as well.
const albumFormats = ['CD', 'LP', 'Cassette'];
getAlbumFormats({ artist: 'Radiohead', title: 'OK Computer', year: 1997 }, ...albumFormats);
const getCitizenInfo = ({ name, country, passportNumber }) => console.log(name, country, passportNumber);
function getCitizenInfo1({ country, name, passportNumber }) {
    console.log(name);
    console.log(country);
    console.log(passportNumber);
}
getCitizenInfo({ name: 'Ram', country: 'India', passportNumber: 'XCZ-23' });
const fns = (s) => {
    return '';
}; // !fixme
// * functions are first class citizens in JS, you can treat them like other values. A function that takes another function as its arg, or returns another function as return value is known as higher order function (More on this later)
const higherOrder = (fn) => {
    return fn(10); //! fixme by invoking fn
};
function binarySearch(students, searchStudent, compareFunc) {
    //TODO: implement
    return true;
}
export {};
//# sourceMappingURL=functions.js.map