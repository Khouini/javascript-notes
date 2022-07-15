"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

///////////////////////////////////////
function render(data, className = "") {
  const html = `<article class="country ${className}">
    <img class="country__img" src="${data.flags.svg}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(Number(data.population) / 1000000).toFixed(1)}</p>
      <p class="country__row"><span>🗣️</span>${Object.values(data.languages)[0]}</p>
      <p class="country__row"><span>💰</span>${
        data.currencies[Object.keys(data.currencies)[0]]["name"] +
        ` (${data.currencies[Object.keys(data.currencies)[0]]["symbol"]})`
      }</p>
    </div>
  </article>`;
  countriesContainer.insertAdjacentHTML("beforeEnd", html);
}
function renderError(msg) {
  countriesContainer.insertAdjacentHTML("beforeend", msg);
}
//* Old school
/*function getCountryData(country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();
  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    render(data);
  });
}
getCountryData('tunisia');
getCountryData('france');
getCountryData('usa');*/

/*function getCountryAndNeighbour(country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();
  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    // Render counrt 1
    render(data);
    // Get neighbour counrty 2
    const [neighbour] = data.borders;
    if (!neighbour) return;
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
    request2.send();
    request2.addEventListener('load', function () {
      const [data2] = JSON.parse(this.responseText);
      // Render counrt 2
      render(data2, 'neighbour');
    });
  });
}
getCountryAndNeighbour('tunisia');*/
//! The callback hell
/*setTimeout(() => {
  console.log('1 second passed');
  setTimeout(() => {
    console.log('2 seconds passed');
    setTimeout(() => {
      console.log('3 seconds passed');
    }, 1000);
  }, 1000);
}, 1000);*/

//! Promises
//* Before creating getJSON()
/*function getCountryData(country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => {
      if (!response.ok) throw `Counrty not found (${response.status})`;
      return response.json();
    })
    .then(data => {
      render(data[0]);
      let neighbour = data[0].borders[0];
      neighbour = 'A';
      // console.log(neighbour);
      if (!neighbour) return;
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then(response => {
      if (!response.ok)
        throw `Neighbour country not found (${response.status})`;
      return response.json();
    })
    .then(data => render(data[0], 'neighbour'))
    .catch(err => {
      console.log(`${err}⚠️⚠️`);
      renderError(`Something went wrong! ⚠️⚠️ ${err}`);
    })
    .finally(() => (countriesContainer.style.opacity = 1));
}
btn.addEventListener('click', function () {
  getCountryData('tunisia');
});*/
//* After creating getJSON()
function getJSON(url, error = "Error Smtg went wrong") {
  return fetch(url).then(response => {
    if (!response.ok) throw `${error} (${response.status})`;
    return response.json();
  });
}
function getCountryData(country) {
  getJSON(`https://restcountries.com/v3.1/name/${country}`, "Country not found")
    .then(data => {
      const neighbour = data[0].borders?.[0];
      render(data[0]);
      if (!neighbour) throw new Error("Neighbour country not found");
      return getJSON(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then(data => render(data[0], "neighbour"))
    .catch(err => {
      console.log(`${err}⚠️⚠️`);
      renderError(`Something went wrong! ⚠️⚠️ ${err}`);
    })
    .finally(() => (countriesContainer.style.opacity = 1));
}
/*btn.addEventListener('click', function () {
  getCountryData('australia');
});*/

// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/

/*
whereAmI(52.508, 13.381);
whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474);*/
//! the Event loop
//* 1) The synchronnus code
//* 2) The micro task queue (promises)
//* 3) The call back queue
/*console.log('Start');
setTimeout(() => console.log('0 seconds passed'), 0);
Promise.resolve('Resolve Promise 1').then(res => console.log(res));
Promise.resolve('Resolve promise 2').then(res => {
  for (let i = 0; i < 100000000; i++) {}
  console.log(res);
});
console.log('End');*/

//! Building a simple promise

/*const myPromise = new Promise(function (resolve, reject) {
  console.log('This is happening');
  setTimeout(function () {
    // like a fetch (api); asunchronous, that's why use promises
    if (Math.random() >= 0.5) resolve('You win');
    else reject(new Error('You loose'));
  }, 2000);
});

myPromise.then(res => console.log(res)).catch(err => console.error(err));*/

//! Promosifying setTimeout
const wait = seconds => {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
};

// wait(1)
//   .then((/*no resolve returned*/) => {
//     console.log('1 seconds passed');
//     return wait(1);
//   })
//   .then((/*no resolve returned*/) => {
//     console.log('2 seconds passed');
//     return wait(1);
//   })
//   .then((/*no resolve returned*/) => {
//     console.log('3 seconds passed');
//     return wait(1);
//   })
//   .then((/*no resolve returned*/) => console.log('4 seconds passed'));
//! Final
/*Promise.resolve('abc').then(res => console.log(res));
Promise.reject(new Error('A problem!')).catch(err => console.error(err));*/

//! Geolocation
//////////////////////////////////////////////////
// navigator.geolocation.getCurrentPosition(
//   position => console.log(position),
//   err => console.error(err)
// );
///////////////////////////////////////////
function getPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      position => resolve(position),
      err => reject(new Error("Problem with getting your location"))
    );
    //* We can do simply this =>
    // navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}
function whereAmI() {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;
      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json&auth=263896209563783231588x22369`);
    })
    .then(response => {
      if (!response.ok) throw new Error(`PROBLEM (${response.status})`);
      return response.json();
    })
    .then(data => {
      if (data.longt != 0) {
        console.log(`You are in ${data.country}, ${data.city}`);
        return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
      } else throw new Error("Location not found");
    })
    .then(res => {
      if (!res.ok) throw new Error(`Country not found ${res.status}`);
      return res.json();
    })
    .then(data => render(data[0]))
    .catch(err => {
      // console.error(`Something went wrong, ${err}`);
      console.error(err);
    })
    .finally(() => (countriesContainer.style.opacity = 1));
}
btn.addEventListener("click", function () {
  whereAmI();
});
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀

function createImg(imgPath) {
  countriesContainer.style.opacity = 1;
  const img = document.createElement('img');
  img.src = imgPath;
  return new Promise((resolve, reject) => {
    img.addEventListener('load', function () {
      countriesContainer.appendChild(img);
      resolve(img);
    });
    img.addEventListener('error', function () {
      reject(new Error('Image not loaded'));
    });
  });
}
let current_img;
createImg('img/1.jpg')
.then(img => {
  current_img = img;
  return wait(2);
})
.then(img => {
  current_img.style.display = 'none';
  //return wait(2);
  })
  .then(() => createImg('img/2.jpg'))
  .then(img => {
    current_img = img;
    return wait(2);
  })
  .then(img => {
    current_img.style.display = 'none';
  })
  .catch(err => console.log(err));
  
  */
//! Async/ await
async function whereAmI2() {
  //* Before we do:
  /*fetch(`https://restcountries.com/v3.1/name/${country}`).then(res =>
    console.log(res)
  );*/
  /////////////////////////////////
  try {
    const position = await getPosition();
    const { latitude: lat, longitude: lng } = position.coords;
    const responseGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json&auth=263896209563783231588x22369`);
    if (!responseGeo.ok) throw new Error("Problem with getting geolocalisation");
    const dataGeo = await responseGeo.json();
    const resp = await fetch(`https://restcountries.com/v3.1/name/${dataGeo.country}`);
    if (!resp.ok) throw new Error("Problem with getting the country informations");
    const [data] = await resp.json();
    render(data);
    countriesContainer.style.opacity = 1;
    return `Your are in ${dataGeo.country}, ${dataGeo.city}`; //! look below at the long comment
  } catch (err) {
    renderError(`Something went !wrong! ${err}`);
    console.error(err);
    throw err;
    //* whe rethrew the error because when we try to return smth the promise whereAmI2 we will always get fullfield, we don't get a reject. that's why we must rethrew the error to get the error when we return smth with the promise
  }
}
// console.log('1: Getting location');
//! Mixed old school + async/await
/*
whereAmI2()
  .then(city => console.log('2: ' + city))
  .catch(err => console.error(`2: ${err.message}!!DANGER`)) //! look up at the long comment
  .finally(() => console.log('3: Finished getting location'));
*/
//! Using async/await only
/*(async function () {
  try {
    const city = await whereAmI2();
    console.log('2: ' + city);
  } catch {
    console.error(`2: ${err.message}!!DANGER`); //! look up at the long comment
  }
  console.log('3: Finished getting location');
})();*/
async function getJSON2(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Problem to get api");
  return await response.json();
}
async function capitalOf3Countries(C1, C2, C3) {
  //* We are getting the api's seperatly
  //! We don't do this
  /*const [data1] = await (
    await fetch(`https://restcountries.com/v3.1/name/${C1}`)
  ).json();
  const [data2] = await (
    await fetch(`https://restcountries.com/v3.1/name/${C2}`)
  ).json();
  const [data3] = await (
    await fetch(`https://restcountries.com/v3.1/name/${C3}`)
  ).json();
  console.log(data1.capital, data2.capital, data3.capital);*/
  //! WE use Promise.all because it loads all the apis at the time => MORE PERFORMANCE (less time of loading)
  const data = await Promise.all([
    getJSON2(`https://restcountries.com/v3.1/name/${C1}`),
    getJSON2(`https://restcountries.com/v3.1/name/${C2}`),
    getJSON2(`https://restcountries.com/v3.1/name/${C3}`),
  ]);
  const capitals = data.map(el => el[0].capital[0]);
  console.log(capitals);
}
// capitalOf3Countries('Tunisia', 'france', 'germany');
//! Race => Getting the fastest fetch
/*(async function () {
  const res = await Promise.race([
    getJSON2(`https://restcountries.com/v3.1/name/italy`),
    getJSON2(`https://restcountries.com/v3.1/name/egypt`),
    getJSON2(`https://restcountries.com/v3.1/name/emirates`),
  ]);
  console.log(res[0].capital[0]);
})();*/

function timeout(ms) {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error("Request took too long")), ms);
  });
}
/*Promise.race([
  getJSON2(`https://restcountries.com/v3.1/name/emirates`),
  timeout(200),
])
  .then(res => console.log(res[0].capital[0]))
  .catch(err => console.error(`smthg went wrong ${err}`));*/

//!Promise.allSettled() //////// Promise.any()
/*Promise.allSettled([
  Promise.resolve('success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success'),
]).then(res => console.log(res));*/
/*Promise.all([
  Promise.resolve('success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success'),
]).then(res => console.log(res));*/
//! Any: Returns the fastest sucess Promise
/*Promise.any([
  Promise.resolve('success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success'),
]).then(res => console.log(res));*/

// Coding Challenge #3

/* 
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.

PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'paralell' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.

GOOD LUCK 😀
*/
function createImg(imgPath) {
  countriesContainer.style.opacity = 1;
  const img = document.createElement("img");
  img.src = imgPath;
  return new Promise((resolve, reject) => {
    img.addEventListener("load", function () {
      countriesContainer.appendChild(img);
      resolve(img);
    });
    img.addEventListener("error", function () {
      reject(new Error("Image not loaded"));
    });
  });
}
async function loadNPause() {
  try {
    let imgElement = await createImg("img/1.jpg");
    await wait(2);
    imgElement.style.display = "none";
    imgElement = await createImg("img/2.jpg");
    await wait(2);
    imgElement.style.display = "none";
  } catch (err) {
    console.log(err);
  }
}
async function loadNPause2() {
  let imgElement;
  try {
    for (let i = 1; i < 3; i++) {
      imgElement = await createImg(`img/${i}.jpg`);
      await wait(2);
      imgElement.style.display = "none";
    }
  } catch (err) {
    console.log(err);
  }
}

// loadNPause2();
async function loadAll(arr) {
  //! async because it is a function
  try {
    //! Loading all images at the same time
    const imgs = arr.map(async el => await createImg(el));
    const imgsEls = await Promise.all(imgs);
    imgsEls.forEach(img => img.classList.add("parallel"));
  } catch (err) {
    console.log(err);
  }
}
loadAll(["img/img-1.jpg", "img/img-2.jpg", "img/img-3.jpg"]);
