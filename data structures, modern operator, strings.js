"use strict";

//! Data needed for a later exercise
const flights =
  "_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30";

//! Data needed for first part of the section
const restaurant = {
  name: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],
  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  orderDelivery: function ({ starterIndex = 1, mainIndex = 2, time, adress = "Tunis" }) {
    console.log(
      `order recieved! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${adress} at ${time}`
    );
  },
  orderPasta: function (ing1, ing2, ing3) {
    console.log(`There is your delicious Pasta with ${ing1}, ${ing2}, ${ing3}`);
  },
  orderPizza: function (mainIngredient, ...otherIngredients) {
    //! function with rest arguments
    return `There your pizza with main ingredient ${mainIngredient} and the other ingredients: ${otherIngredients}`;
  },
};
// function with one parameter (object)
// restaurant.orderDelivery({
//   starterIndex: 1,
//   mainIndex: 1,
//   time : "13h30",
//   adress: "Nabeul, Mora"
// })

//!Arrays
//* Destructuring arrays
// const arr = [5, 7, 44, 67];
// const [x, y, z] = arr;
//console.log(x, y, z);

//* Switching
//let [first, , secondary] = restaurant.starterMenu;
//console.log(first, secondary);
//[first, secondary] = [secondary, first];
//console.log(first, secondary);

//* Receive more than one return
// [first, secondary] = restaurant.order(0, 2);
// console.log(first, secondary);

//* Destructuring inside Destructuring (nested)
// const nested = [2, 5, [34, 77]];
// const [ , first, secondary] = nested;
// console.log(first, secondary);
// const [i, , [j, k]] = nested;
// console.log(i, j, k);

//*  Default values

// const [i=1, j=1, k=1] = [44, 67]
// console.log(i, j, k);

//! Objects
//* Destructuring Objects
// const {name, openingHours, categories} = restaurant;
// console.log(name, openingHours, categories);
//* Destructuring Objects with resaiging different names
// const {name: restaurantName, openingHours: Hours, categories: Tags} = restaurant;
// console.log(restaurantName, Hours, Tags);
//* Destructuring Objects with default values if object dosen't exist
// const {menu = [], starterMenu:starters = []} = restaurant;
// console.log(menu, starters);

//*  Mutating variables : variables = obj
// let [a, b] = [2, 5];
// let obj = {a : 45, b : 56, c : 222};
// ({a, b} = obj);
// console.log(a, b);

//* Destructuring inside Destructuring Objects (nested)
// const {fri : {open: o, close: c}} = restaurant.openingHours;
// console.log(o, c);

//!  The spread operator ... (get individual elements of the array)

// const arr=  [34, 56, 33, 46];
// const newArr = [1, 2, 3, ...arr];
// console.log(...newArr);

//const newMenu = [...restaurant.mainMenu, "Burger"];
// console.log(newMenu);

//*  Join 2 arrays
// const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
// console.log(menu);

//? iterables : arrays, strings, maps, sets NOT OBJECTS

// const str = "Yacine";
// console.log(...str);

// * function with the spread operation as parametera
// const ingredients =  [prompt("Enter Ingredient 1"), prompt("Enter Ingredient 2"), prompt("Enter Ingredient 3")];
// restaurant.orderPasta(...ingredients);AbortController;

//* The spread operator with objects  / Copy an object
// const newRestaurent = {founded: 2001, ...restaurant};
// console.log(newRestaurent);
//! Spread, because on right side of =
// const spreadArr = [1, 2, 3, ...[5, 6, 7]];
// console.log(spreadArr);
//! Rest Pattern, because on left side of =
// const [a, b, ...others] = spreadArr;
// console.log(others);
//* The Rest Pattern with arrays
// const [firstFood, secondFood, ...otherFood] = [...restaurant.mainMenu, ...restaurant.starterMenu];
// console.log(firstFood, secondFood, otherFood);
//* The Rest Pattern with objects
// const { sat, ...weekdays } = restaurant.openingHours;
// console.log(weekdays);
//! function with rest arguments

// function add(...numbers) {
//   let sum = 0;
//   for (let i = 0; i < numbers.length; i++) {
//     sum = sum + numbers[i];
//   }
//   return sum;
// }
// console.log(add(5, 5));
// console.log(add(5, 5, 7, 3));
// const numbers = [5, 5, 7, 3];
// console.log(add(...numbers));

// console.log(restaurant.orderPizza("Escalope", "Psaal", "Champigion"));

//! SHORT Circuting
// const checkGuests = restaurant.guests ? restaurant.guests : 10;
// restaurant.guests = 3;
// const checkGuests = restaurant.guests || 10; // naajmou nestaamlou hethi fi blaset el if
// console.log(checkGuests);

// const pizza = restaurant.orderPizza && restaurant.orderPizza("Escalope", "Psaal", "Champigion");
// console.log(pizza);
//! SHORT Circuting with nullish operator
//? nullish values are null and undefined not (0 and "")
// restaurant.guests = 0;
// const checkGuests = restaurant.guests ?? 10;
// console.log(checkGuests);

const rest1 = {
  name: "Bella Napoli",
  nbGuests: 0,
};
const rest2 = {
  name: "The Cliff",
};

//! OR, Nullish Assaignment operator

// rest1.nbGuests = rest1.nbGuests || 10;
// rest2.nbGuests = rest2.nbGuests || 10;
// rest1.nbGuests ??= 10;
// rest2.nbGuests ??= 10;
// console.log(rest1, rest2);

//! CHALLENGE
const game = {
  team1: "Bayern Munich",
  team2: "Borrussia Dortmund",
  players: [
    [
      "Neuer",
      "Pavard",
      "Martinez",
      "Alaba",
      "Davies",
      "Kimmich",
      "Goretzka",
      "Coman",
      "Muller",
      "Gnarby",
      "Lewandowski",
    ],
    [
      "Burki",
      "Schulz",
      "Hummels",
      "Akanji",
      "Hakimi",
      "Weigl",
      "Witsel",
      "Hazard",
      "Brandt",
      "Sancho",
      "Gotze",
    ],
  ],
  score: "4:0",
  scored: ["Lewandowski", "Gnarby", "Lewandowski", "Hummels"],
  date: "Nov 9th, 2037",
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};
