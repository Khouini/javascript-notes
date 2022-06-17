"use strict";
//! Parsing arguments | Values vs references
// const car = "BMW E39";
// const yacine = {
//   name: "Yacine Khouini",
//   age: 20,
// };

// function manage(person, karhba) {
//   person.age = 90; // The object change
//   karhba = "Clio bombé"; // car does not change
// }

// manage(yacine, car);
// console.log(car, yacine); // car does not change and the object change

//! The CallBack function / Higher level function / Abstraction
// function upperFirstWord(str) {
//   const [first, ...others] = str.toLowerCase().split(" ");
//   return [first.toUpperCase(), ...others].join(" ");
// }
// function oneWord(str) {
//   return str.replaceAll(" ", "").toLowerCase();
// }
// function tasnformer(str, fct) {
//   console.log("Original string: ", str);
//   console.log("Transformed string: ", fct(str));
//   console.log("Transformed by: ", fct.name);
// }
// tasnformer("meD YAcine KHouinI", upperFirstWord);
// console.log("**************");
// tasnformer("meD YAcine KHouinI", oneWord);

//! Functions returning functions
// function greet(greeting) {
//   return function (name) {
//     console.log(greeting, name);
//   };
// }
// * 1ére méthode d'appel
// const fctHeyName = greet("Hey");
// fctHeyName("Yacine");
// * 2éme méthode d'appel
// greet("Hey")("Yacine");

// //! Call and apply methodes
const tunis = {
  airline: "TUNISAIR",
  iataCode: "TUN",
  bookings: [],
  book(flightNum, name) {
    console.log(`${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`);
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

const Paris = {
  airline: "PARISAIR",
  iataCode: "PAR",
  bookings: [],
};
//*  the book declaration is important
// const book = tunis.book;
// // book(23, "Yacine Khouini");
// tunis.book(235, "Trukns Khouini");

//* Call Method (call the function)
// book.call(Paris, 678, "Hatem Khouini");

//* Apply Method (call the function)
// const data = [123, "Flen Foulnei"];
// book.apply(Paris, data);
// // book.call(Paris, ...data);

//* The bind method (creates a new function)
// const BookTN = book.bind(tunis);
// const BookP = book.bind(Paris);

// BookTN(555, "M K");
// BookP(1, "Wiliams");

//* The flight number is already set
// const bookTN23 = book.bind(Paris, 23);
// bookTN23("Johny Deeb");
Paris.planes = 100;
Paris.buyPlanes = function () {
  //   console.log(this);
  this.planes++;
  console.log(this.planes);
};
// document.querySelector(".buy").addEventListener("click", Paris.buyPlanes); // Don't work; because when we the this in paris takes le event listener thats why we shoud use the bind which creates o new method
// document.querySelector(".buy").addEventListener("click", Paris.buyPlanes.bind(Paris)); // Works
//* estaamel console.log(this) fel objet bech tefhem akther
//* Conclusion : with the event listener we use the bind method to call a function

//* For testing
// console.log("Tunis", tunis.bookings);
// console.log("Paris", Paris.bookings);

//! Partaial application
//* Using bind method
// const addTaxe = (rate, value) => value + value * rate;
// const taxe2 = addTaxe.bind(null, 2);
// console.log(taxe2(2));

//* Using function returning function
function calculTaxe(rate) {
  return function (value) {
    return value + value * rate;
  };
}
// const calculTaxe2 = calculTaxe(2);
// console.log(calculTaxe2(2));

//! Challenge
const poll = {
  question: "What is your favourite programming language?",
  options: ["0: JavaScript", "1: Python", "2: Rust", "3: C++"],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    const answer = Number(prompt(`${this.question}\n${this.options.join("\n")}`));
    if (answer >= 0 && answer < this.answers.length && typeof answer === "number") {
      this.answers[answer] += 1;
      this.displayResults();
    } else {
      console.log("The answer does note make sense!");
    }
  },
  displayResults(type = "string") {
    if (type == "array") {
      console.log(this.answers);
    } else if (type == "string") {
      console.log(`Poll results are ${this.answers.join(", ")}`);
    }
  },
};
document.querySelector(".poll").addEventListener("click", poll.registerNewAnswer.bind(poll));
const display = poll.displayResults;
// display.call({ answers: [1, 5, 3, 9, 6, 1] }, "array");
// display.call({ answers: [1, 5, 3, 1] });

//! Immediatly Involved Function Expression
/*(function () {
  console.log("Once");
})();

(() => console.log("Once also"))();
*/
{
  const isPrivate = 2; // meme si let
  var isNotPrivate = 4;
}
// console.log(isPrivate); // Does not work
// console.log(isNotPrivate); // Works
