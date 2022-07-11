"use strict";
//! Constructor
//*
// 1. New {} is created
// 2. function is called, this = {}
// 3. {} linked to prototype
// 4. function automatically return {}
function Person(firstName, birthYear) {
  //* Instance propreties
  this.firstName = firstName;
  this.birthYear = birthYear;
  // function automatically return {}

  // // // this.calAge = function () {
  // // //   return 2022 - this.birthYear;
  // // // };
  //* We dont declare functions in consctructor, we use protoypes. because we will all the time take a copy of the consctructor with his methods.
}
const yacine = new Person("Khouini Yacine", 2001);
const Mohamed = new Person("Khouini Mohamed", 1940);
// console.log(yacine, Mohamed);
//* Instance Of
// console.log(yacine instanceof Person); //True
//////////console.log(yacine.calAge());

//! Prototypes
//* We don't want to attach the method to every single object
Person.prototype.calcAge = function () {
  return 2022 - this.birthYear;
};

/*console.log(yacine.calcAge());
console.log(Mohamed.calcAge());
//! The prototype of linked objects : isPrototypeOf()
console.log(yacine.__proto__);
console.log(yacine.__proto__ === Person.prototype);
console.log(Person.prototype.isPrototypeOf(yacine)); //True
console.log(Person.prototype.isPrototypeOf(Mohamed)); //True
console.log(Person.prototype.isPrototypeOf(Person)); //False

//! Protoype properties
Person.prototype.nationaty = 'Tunisian';
console.log(yacine.nationaty);
console.log(yacine.hasOwnProperty('firstName')); //True
console.log(yacine.hasOwnProperty('nationality')); //False

console.log(yacine.__proto__); // Person.prototype
console.log(yacine.__proto__.__proto__); // Object.prototype
console.log(yacine.__proto__.__proto__.__proto__); // null


const arr = [4, 5, 6, 5, 4];
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype);
console.log(arr.__proto__.__proto__); // Object.prototype

Array.prototype.unique = function () {
  return [...new Set(this)];
};
console.log(arr.unique());

con ole.dir(x => x); // Fonctions prototype
*/
//! Coding Challenge #1

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
function Car(make, speed) {
  this.speed = speed;
  this.make = make;
}

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};
Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

const Car1 = new Car('BMW', 120);
const Car2 = new Car('Marcedes', 65);

Car1.accelerate();
Car2.brake();
*/

//! Class ES6
// class PersonCl {
//   constructor(firstName, birthYear) {
//     this.firstName = firstName;
//     this.birthYear = birthYear;
//   }
//   //* Method will be added to .prototype
//   calcAge() {
//     console.log(2022 - this.birthYear);
//   }
// }

// const Majd = new PersonCl('aaaaa', 2000);
// Majd.calcAge();
// console.log(Majd.__proto__ == PersonCl.prototype);
// PersonCl.prototype.greet = function () {
//   console.log('Hello', this.firstName);
// };

// Majd.greet();

//! Getters ans setters
const account = {
  owner: "Yacine",
  movments: [23, -54, 52, 102],
  get latest() {
    return this.movments.splice(-1)[0];
  },
  set latest(mov) {
    this.movments.push(mov);
  },
};

// console.log(account.latest);
// account.latest = 50;

class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  //* Method will be added to .prototype
  //! instance methods
  calcAge() {
    console.log(2022 - this.birthYear);
  }
  get age() {
    return 2022 - this.birthYear;
  }
  //! Setting a property that already exists
  set fullName(name) {
    // console.log(name);
    if (name.includes(" ")) this._fullName = name;
    else {
      alert(`${name} is not a fullname!`);
    }
  }
  get fullName() {
    return this._fullName;
  }
  //! static methods , works only with the constructir PersonCl
  static hey() {
    console.log("Hello world!");
  }
}

const P1 = new PersonCl("Med Yacine Khouini", 2001);
// const P2 = new PersonCl('Med', 2001);
// console.log(P1.age);
// PersonCl.hey();

const personProto = {
  calcAge() {
    console.log(2022 - this.birthYear);
  },
  init(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  },
};
const PT3 = Object.create(personProto);
/*PT3.fullName = 'Mehrez';
PT3.birthYear = 1999;*/
/*PT3.init('Mahrez T', 1999);
PT3.calcAge();*/

// console.log(personProto === PT3.__proto__);
// Coding Challenge #2

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/
/*
class Car {
  constructor(make, speed) {
    this.speed = speed;
    this.make = make;
  }
  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }
  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }
  get speedUS() {
    return this.speed / 1.6;
  }
  set speedUS(value) {
    this.speed = value * 1.6;
  }
}

const C1 = new Car('BMW', 200);
C1.accelerate();
console.log(C1.speedUS);
C1.speedUS = 20;
console.log(C1.speedUS);
console.log(C1.speed);
C1.accelerate();
console.log(C1.speedUS);*/

//! Inheritance

function PersonI(fullName, birthYear) {
  this.fullName = fullName;
  this.birthYear = birthYear;
}
PersonI.prototype.calcAge = function () {
  console.log(2022 - this.birthYear);
};
function Student(fullName, birthYear, course) {
  PersonI.call(this, fullName, birthYear);
  this.course = course;
}
Student.prototype = Object.create(PersonI.prototype);
const P4 = new PersonI("Ryzen", 2005);
Student.prototype.introduce = function () {
  console.log(`My name is ${this.fullName} and I study ${this.course}`);
};
const S1 = new Student("Med Khouini", 2004, "TWIN");
/*S1.introduce();
S1.calcAge();
console.log(S1 instanceof PersonI);
console.log(S1 instanceof Student);*/

// Coding Challenge #3

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/
/*
function Car(make, speed) {
  this.speed = speed;
  this.make = make;
}

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};
Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

function EV(make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
}
EV.prototype = Object.create(Car.prototype);
EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};
EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.make} is going at ${this.speed} km/h, with a charge of ${this.charge}%`
  );
};
const Tesla = new EV('Tesla', 140, 50);
Tesla.chargeBattery(100);

Tesla.accelerate();
Tesla.accelerate();
Tesla.accelerate();
Tesla.brake();*/

class Student2 extends PersonCl {
  constructor(fullName, birthYear, course) {
    super(fullName, birthYear);
    this.course = course;
  }
  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }
  get age() {
    return `I'm ${2022 - this.birthYear} years old`;
  }
}
const S2 = new Student2("Flen Fouleni", 2005, "Computer Science");
/*S2.introduce();
console.log(S2.age);
*/
//! Coding Challenge #4

/* 
1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
2. Make the 'charge' property private;
3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. They experiment with chining!

DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/
class CarCl {
  constructor(make, speed) {
    this.speed = speed;
    this.make = make;
  }
  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }
  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
    return this;
  }
  get speedUS() {
    return this.speed / 1.6;
  }
  set speedUS(value) {
    this.speed = value * 1.6;
  }
}
class EVCl extends CarCl {
  #charge;
  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }
  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }
  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(`${this.make} is going at ${this.speed} km/h, with a charge of ${this.#charge}%`);
    return this;
  }
}
const R = new EVCl("Rivian", 120, 23);
R.accelerate().chargeBattery(100).brake().accelerate();
console.log(R.speedUS);
