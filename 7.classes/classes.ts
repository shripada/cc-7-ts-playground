// Before classes were introduced into JS,
// The following methods were being used to create an object ( can still be used)

import { release } from 'node:os';

// * Object literal   (still is used)
const person = {
  firstName: 'testFirstName',
  lastName: 'testLastName',
  greet: function () {
    return 'Hello, my name is ' + this.firstName;
  },
};
//!--------------
// * Constructor functions
// * ------
interface PersonConstructor {
  new (fname: string, lname: string): { firstName: string; lastName: string };
}

const Person: PersonConstructor = function (
  this: { firstName: string; lastName: string },
  fname: string,
  lname: string,
) {
  this.firstName = fname;
  this.lastName = lname;
} as unknown as PersonConstructor;

// Adding methods to the prototype for shared behavior across instances
Person.prototype.greet = function () {
  return 'Hello, my name is ' + this.firstName;
};

const personOne = new Person('testFirstNameOne', 'testLastNameOne');
// * --------------
//!--------------

// * Object.create
const personPrototype = {
  name: '',
  greet: function () {
    return 'Hello, my name is ' + this.name;
  },
};

const john = Object.create(personPrototype);
john.name = 'John';
// * -------
//!--------------
//* Factory functions
function createPerson(name: string) {
  return {
    name: name,
    greet: function () {
      return 'Hello, my name is ' + this.name;
    },
  };
}

const person1 = createPerson('Alice');

//!-------------
// Among the above the one using constructor function pattern with prototypal inheritance, is sugar coated using Class. At the same time Class also solves some drawbacks of using constructor functions directly where someone might break the convention and just invoke it without new keyword and cause bad side effects.
// * TypeScript supports full JS classes and adds few more niceties.
class Person0 {
  name: string; // Each memeber must be initialised to a valid value, either here, or in constructor
  dob: Date;
}

class Person1 {
  name = ''; // all vars initialized using property initializer expression, so no constructor might be needed.
  dob = '';
}

class Person2 {
  name: string;
  dob: Date;

  constructor(name: string, dob: Date) {
    this.name = name;
    this.dob = dob;
  }
}

const ram = new Person2('Ram', new Date('10-Dec-2020'));

// We can also short circuit var creation via constructor
class Person3 {
  constructor(name: string, dob: Date) {} // members name and dob will be automatically created.
}

// Class can be used as type. Classes get compiled to js classes so they will exist at runtime too but as js classes.
function displayPerson(person: Person2) {
  console.log(person.name, person.dob);
}

displayPerson({ name: '', dob: new Date() }); // TS allows this, as TS uses structural typing

// Classes can have readonly/optional/ public/ private props.

class Album {
  readonly title: string; // by default all props and methods are public
  readonly artist: string;
  readonly releaseYear: number;
  private collection?: number; // private optional prop, not accessible outside of class. private is only static time.
  #privateAtRuntime: number; // properties prefixed with # are an ES6 extenison of JS to enforce privateness to class vars. And this will persist at runtime too.

  constructor(title: string, artist: string, releaseYear: number) {
    this.title = title;
    this.artist = artist;
    this.releaseYear = releaseYear;
    this.#privateAtRuntime = 10;
  }
}
const album = new Album('ZZ', 'Michael', 1988);
album.title = 'Thriller'; // not allowed as title is readonly

// * Implementing class methods
