"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// PROJECT
let currentAccount;
function createsUsernames(accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLocaleLowerCase()
      .split(" ")
      .map(function (item) {
        return item[0];
      })
      .join("");
  });
}
createsUsernames(accounts);
function displayMovments(acc) {
  containerMovements.innerHTML = "";
  acc.movements.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";
    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__value">${mov}</div>
  </div>`;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
}
function displayUI(acc) {
  displayMovments(acc);
  printBalance(acc);
  calcSummary(acc);
}
function printBalance(acc) {
  acc.balance = acc.movements.reduce((acc, curr) => acc + curr, 0);
  labelBalance.textContent = `${acc.balance} €`;
}
function calcSummary(acc) {
  labelSumIn.textContent = acc.movements.filter(mov => mov >= 0).reduce((acc, curr) => acc + curr, 0) + "€";
  labelSumOut.textContent = acc.movements.filter(mov => mov < 0).reduce((acc, curr) => acc + Math.abs(curr), 0) + "€";
  labelSumInterest.textContent =
    acc.movements
      .filter(mov => mov >= 0)
      .map(deposit => (deposit * acc.interestRate) / 100)
      .filter(interest => interest > 1)
      .reduce((acc, curr) => acc + curr)
      .toFixed(2) + "€";
}
btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  currentAccount = accounts.find(account => account.username === inputLoginUsername.value);
  if (currentAccount?.pin === parseInt(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(" ")[0]}`;
    containerApp.style.opacity = "100";
    inputLoginPin.value = inputLoginUsername.value = "";
    inputLoginPin.blur();
    inputLoginUsername.blur();
    displayUI(currentAccount);
  } else {
    containerApp.style.opacity = "0";
    labelWelcome.textContent = "Log in to get started";
    inputLoginPin.value = inputLoginUsername.value = "";
    inputLoginPin.blur();
    inputLoginUsername.blur();
  }
});
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const transferToInput = inputTransferTo.value;
  const amount = parseInt(inputTransferAmount.value);
  const transferTo = accounts.find(acc => acc.username === transferToInput);
  if (
    amount > 0 &&
    transferTo &&
    transferTo.username !== currentAccount.username &&
    currentAccount.balance - amount > 0
  ) {
    currentAccount.movements.push(parseInt(-amount));
    transferTo.movements.push(parseInt(amount));
    displayUI(currentAccount);
    inputTransferTo.value = inputTransferAmount.value = "";
    inputTransferTo.blur();
    inputTransferAmount.blur();
  }
});
btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  if (inputCloseUsername.value === currentAccount.username && parseInt(inputClosePin.value) === currentAccount.pin) {
    //! The findeIndex Method
    const index = accounts.findIndex(acc => acc.username === currentAccount.username);
    //Delete user
    accounts.splice(index, 1);
    //Hide UI
    containerApp.style.opacity = 0;
    inputCloseUsername.value = "";
    inputClosePin.value = "";
  }
});
/////////////////////////////////////////////////
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

//! Challenge
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, 
and stored the data into an array (one array for each). For now, they are just interested in knowing whether a 
dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), 
and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! 
So create a shallow copy of Julia's array, and remove the cat ages from that copied array 
(because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") 
or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
/*
function checkDogs(dogsJulia, dogsKate) {
  const newJulia = dogsJulia.slice();
  newJulia.splice(0, 1);
  newJulia.splice(-2, 2);
  const correctedDogs = [...newJulia, ...dogsKate];
  correctedDogs.forEach(function (value, i) {
    const msg = value >= 3 ? "an adult" : "still a puppy 🐶";
    console.log(`Dog number ${i + 1} is ${msg} and is ${value} years old`);
  });
}

checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
*/
//! The map method
//*Simple map
/*const euroToUSD = 1.1;
const MouvmentUSD = account1.movements.map(function (mov) {
  return mov * euroToUSD;
});
console.log(account1.movements);
console.log(MouvmentUSD);
*/
//* Complex Map
/*const movementsDescriptions = account1.movements.map(function (mov, i) {
  return `Movment ${i + 1}: You ${mov > 0 ? "deposited" : "withdrew"} ${Math.abs(mov)}`;
});

console.log(movementsDescriptions);
*/

//! The filter method
/*const deposits = account1.movements.filter(function (mov) {
  return mov > 0;
});
console.log(deposits);
const withdrawals = account1.movements.filter(function (mov) {
  return mov < 0;
});
console.log(withdrawals);*/

//! The reduce method
//* Somme
/*const balance = account1.movements.reduce(function (acc, cur, i, arr) {
  console.log(`Itération ${i}`);
  console.log("acc:", acc);
  console.log("cur:", cur);
  return acc + cur;
}, 0);

console.log(balance);*/
//* Maximim
/*console.log(Math.max(...account1.movements));
const max = account1.movements.reduce((max, curr) => {
  if (curr > max) {
    return curr;
  } else return max;
}, account1.movements[0]);*/

//! Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀*/

const calcAverageHumanAge = dogs =>
  dogs
    .map(dogAge => (dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4))
    .reduce((acc, curr, _, arr) => acc + curr / arr.length, 0);

/*function calcAverageHumanAge(dogs) {
  let humanAge = dogs.map(dogAge => (dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4));
  humanAge = humanAge.filter(dogAge => dogAge >= 18);
  return humanAge.reduce((acc, curr, _, arr) => acc + curr / arr.length, 0);
}*/
/*console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));
*/
//! The find Method
// console.log(accounts.find(account => account.owner === "Jessica Davis"));
//! The findeIndex Method
//* check the close event handler
