let arr = ["a", "b", "c", "d", "e"];
//! The slice
/*console.log(arr.slice(1, -1));
console.log(arr.slice(1));
console.log([...arr]); // creates a copy
console.log(arr.slice()); // creates a copy*/

//! The splice // Mutate the original
// console.log(arr.splice(2));
// arr.splice(-1);
/*const numberOfElmentsToDelete = 2;
arr.splice(0, numberOfElmentsToDelete);
console.log(arr);*/

//! REVERSE // Mutate the original
/*let arr2 = ["j", "i", "h", "g", "f"];
arr2.reverse();
console.log(arr2);*/

//! Concat
/*const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]);*/

//! Join
// console.log(letters.join(" / "));

//! The at method
//* Getting the last element of an array
// arr = ["a", "b", "c", "d", "e"];
// console.log(arr[arr.length - 1]);
// console.log(arr.slice(-1)[0]);
// console.log(arr.at(-1));

/*const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
//* normal looping with for of
for (const [i, movement] of movements.entries()) {
  if (movement > 0) console.log(`Mouvment ${i + 1}: You have deposited ${movement}`);
  else console.log(`Mouvment ${i + 1}: You withdrew ${Math.abs(movement)}`);
}
console.log("--------------- forEach --------------");
//0: function(200);
//2: function(450);
// ...
//! forEach method (it is a callback function)
//* arrays
movements.forEach(function (movement, i, arr) {
  if (movement > 0) console.log(`Mouvment ${i + 1}: You have deposited ${movement}`);
  else console.log(`Mouvment ${i + 1}: You withdrew ${Math.abs(movement)}`);
});*/
//* map
const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);
/*
currencies.forEach(function (value, key, map) {
  console.log(`Item ${key}: ${value}`);
});*/

//* set

// const currenciesUnique = new Set(["USD", "GBP", "EUR", "USD"]);
// currenciesUnique.forEach(function (value, _, set) {
//   console.log(`Item ${value}: ${value}`);
// });
