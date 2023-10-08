"use strict";

// https://countries-api-836d.onrender.com/countries/

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

function renderError(msg) {
  countriesContainer.insertAdjacentText("beforeend", msg);
  countriesContainer.style.opacity = 1;
}

///////////////////////////////////////
// function getCountryData(country) {
//   const request = new XMLHttpRequest();
//   request.open("GET", `https://restcountries.com/v2/name/${country}`);
//   request.send();

//   request.addEventListener("load", function (e) {
//     const [, data] = JSON.parse(this.responseText);
//     console.log(data);

//     const html = `<article class="country">
//     <img class="country__img" src="${data.flag}" />
//     <div class="country__data">
//       <h3 class="country__name">${data.name}</h3>
//       <h4 class="country__region">${data.region}</h4>
//       <p class="country__row"><span>👫</span>POP ${data.population}</p>
//       <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//       <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
//     </div>
//   </article>`;

//     countriesContainer.insertAdjacentHTML("beforeend", html);
//     countriesContainer.style.opacity = 1;
//   });
// }
// function getCountryAndNeighbor(country) {
//   const request = new XMLHttpRequest();
//   request.open("GET", `https://restcountries.com/v2/name/${country}`);
//   request.send();

//   request.addEventListener("load", function (e) {
//     const [, data] = JSON.parse(this.responseText);
//     console.log(data);

//     renderCountry(data);

//     //request for country 2
//     const request2 = new XMLHttpRequest();
//     const [code] = data.borders;
//     request2.open("GET", `https://restcountries.com/v3.1/alpha/${code}`);
//     request2.send();
//     request2.addEventListener("load", function (e) {
//       const [data] = JSON.parse(this.responseText);
//       console.log(data);
//       // renderCountry(data);
//     });
//   });
// }

// getCountryAndNeighbor("india");

function renderCountry(data) {
  const html = `<article class="country">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>POP ${data.population}</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>`;

  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
}

////////////Fetch api

// const request = fetch("https://restcountries.com/v2/name/india");
// console.log(request);

// function getCountryData() {
//   fetch("https://restcountries.com/v2/name/india").then(function (response) {
//     console.log(response);
//     response.json().then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
//   });
// }

function getJson(url, errorMsg = "Something went wrong") {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`${errorMsg} ${response.status}`);
    return response.json();
  });
}

// function getCountryData(country) {
//    return fetch(`https://restcountries.com/v2/name/${country}`)
//     .then((response) => {
//       if (!response.ok) throw new Error(`Country not found ${response.status}`);
//       return response.json();
//     })
//     .then((data) => {
//       const countryData = data[1];
//       renderCountry(countryData);
//       console.log(countryData);
//       const neighborCountry = data[1].borders[0];
//       console.log(neighborCountry);
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighborCountry}`);
//     })
//     .then((response) => response.json())
//     .then((data) => {
//       const [countryData] = data;
//       console.log(countryData);
//       renderCountry(countryData);
//     })
//     .catch((err) => {
//       console.error(err);
//       renderError(err.message);
//     })
//     .finally((data) => console.log(data));
// }

function getCountryData(country) {
  getJson(`https://restcountries.com/v2/name/${country}`, "Country not found")
    .then((data) => {
      const countryData = data[1];
      renderCountry(countryData);
      console.log(countryData);
      const neighborCountry = data[1].borders[0];
      console.log(neighborCountry);
      return getJson(
        `https://restcountries.com/v3.1/alpha/${neighborCountry}`,
        "Could not find border"
      );
    })
    .then((data) => {
      const [countryData] = data;
      console.log(countryData);
      renderCountry(countryData);
    })
    .catch((err) => {
      console.error(err);
      renderError(err.message);
    })
    .finally((data) => console.log(data));
}

// getCountryData("berlin");

/////////////////////////////////////////////Challenges

// 1. Create a function 'whereAmI' which takes as inputs a latitude value ('lat')
// and a longitude value ('lng') (these are GPS coordinates, examples are in test
// data below).

function whereAmI(lat, lng) {
  // 2. Do “reverse geocoding” of the provided coordinates. Reverse geocoding means
  // to convert coordinates to a meaningful location, like a city and country name.
  // Use this API to do reverse geocoding: https://geocode.xyz/api. The AJAX call
  // will be done to a URL with this format:
  // https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and
  // promises to get the data. Do not use the 'getJSON' function we created, that
  // is cheating 😉
  fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
  )
    .then((response) => {
      if (!response.ok)
        throw new Error(`Could not find location ${response.status}`);
      const convertedData = response.json();
      return convertedData;
    })
    // 3. Once you have the data, take a look at it in the console to see all the attributes
    // that you received about the provided location. Then, using this data, log a
    // message like this to the console: “You are in Berlin, Germany”
    .then((data) => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.continent}`);
      return data;
    })
    // PART 2
    // 6. Now it's time to use the received data to render a country. So take the relevant
    // attribute from the geocoding API result, and plug it into the countries API that
    // we have been using.
    .then((data) => {
      // 7. Render the country and catch any errors, just like we have done in the last
      // lecture (you can even copy this code, no need to type the same code)
      return fetch(`https://restcountries.com/v2/name/${data.countryName}`);
    })
    .then((response) => {
      if (!response.ok) throw new Error(`Something wrong ${response.status}`);
      return response.json();
    })
    .then((data) => renderCountry(data[1]))
    // 4. Chain a .catch method to the end of the promise chain and log errors to the
    // console
    // 5. This API allows you to make only 3 requests per second. If you reload fast, you
    // will get this error with code 403. This is an error with the request. Remember,
    // fetch() does not reject the promise in this case. So create an error to reject
    // the promise yourself, with a meaningful error message
    .catch((err) => console.error(`${err.message}`));
}

// The Complete JavaScript Course 31
// Test data:
// § Coordinates 1: 52.508, 13.381 (Latitude, Longitude)
// whereAmI(19.037, 72.873);
// § Coordinates 2: 19.037, 72.873
// § Coordinates 3: -33.933, 18.474

//////////////////////////testing Event Loop//////////

// console.log("hello");
//call back function of set timeout added to call back queue
setTimeout(() => console.log("time out"), 0);
// call back function added to microtask queue
Promise.resolve("promise data").then((res) => {
  for (let i = 0; i < 10; i++) {
    // console.log("promise");
  }
});
// console.log("world");

////////////////////////////Building promise

const promise = new Promise(function (resolve, reject) {
  if (Math.random() >= 0.5) {
    resolve("you won");
  } else {
    // reject(new Error("you lost"));
  }
});

promise.then((res) => console.log(res)).catch((err) => console.error(err));

const getPosition = () => {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
console.log("from getPosition ", getPosition());
function whereAmI(lat, lng) {
  getPosition()
    .then((data) => {
      console.log(data);
      const { longitude, latitude } = data.coords;
      return fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
      );
    })
    .then((response) => {
      if (!response.ok)
        throw new Error(`Could not find location ${response.status}`);
      const convertedData = response.json();
      return convertedData;
    })
    .then((data) => {
      console.log(`You are in ${data.city}, ${data.continent}`);
      return data;
    })
    .then((data) => {
      return fetch(`https://restcountries.com/v2/name/${data.countryName}`);
    })
    .then((response) => {
      if (!response.ok) throw new Error(`Something wrong ${response.status}`);
      return response.json();
    })
    .then((data) => renderCountry(data[1]))
    .catch((err) => console.error(`${err.message}`));
}

// btn.addEventListener("click", whereAmI);

// Your tasks:
// Tasks are not super-descriptive this time, so that you can figure out some stuff by
// yourself. Pretend you're working on your own 😉
// PART 1
// 1. Create a function 'createImage' which receives 'imgPath' as an input.
// This function returns a promise which creates a new image (use
// document.createElement('img')) and sets the .src attribute to the
// provided image path
const imageContainer = document.querySelector(".images");

function createImage(imgPath) {
  return new Promise(function (resolve, reject) {
    const imageEle = document.createElement("img");
    imageEle.src = imgPath;

    // 2. When the image is done loading, append it to the DOM element with the
    // 'images' class, and resolve the promise. The fulfilled value should be the
    // image element itself. In case there is an error loading the image (listen for
    // the'error' event), reject the promise
    imageEle.addEventListener("load", function (e) {
      resolve(imageEle);
      imageContainer.insertAdjacentElement("beforebegin", imageEle);
    });
    imageEle.addEventListener("error", function (e) {
      reject(new Error("Image not found"));
    });
  });
}

const wait = (seconds) => {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, seconds * 1000);
  });
};

let currentImage;
// 4. Consume the promise using .then and also add an error handler
// createImage("img/img-1.jpg")
//   .then((img) => {
//     console.log(img);
//     currentImage = img;
//     // 5. After the image has loaded, pause execution for 2 seconds using the 'wait'
//     // function we created earlier
//     return wait(2);
//   })
//   .then(() => {
//     console.log("setting display");
//     // 6. After the 2 seconds have passed, hide the current image (set display CSS
//     // property to 'none'), and load a second image (Hint: Use the image element
//     // returned by the 'createImage' promise to hide the current image. You will
//     // need a global variable for that 😉)
//     currentImage.style.display = "none";
//     return createImage("img/img-2.jpg");
//   })
//   .then((img) => {
//     currentImage = img;
//     return wait(2);
//   })
//   .then(() => {
//     currentImage.style.display = "none";
//   })
//   .catch((err) => console.error(`${err}`));
// 7. After the second image has loaded, pause execution for 2 seconds again
// 8. After the 2 seconds have passed, hide the current image
// Test data: Images in the img folder. Test the error handler by passing a wrong
// image path. Set the network speed to “Fast 3G” in the dev tools Network tab,
// otherwise images load too fast

//////////////////////////async and await

function getUserCoords() {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

const whereAmIAsync = async () => {
  // const userLocData = await getUserCoords();
  // const { latitude, longitude } = userLocData.coords;
  const { latitude, longitude } = { latitude: 0, longitude: 0 };
  const userCountryData = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
  );
  if (!userCountryData.ok) Promise.reject("could't get user country data");
  const userCountryDataJson = await userCountryData.json();
  console.log(userCountryDataJson);
  const userCountryName = userCountryDataJson.countryName;
  const res = await fetch(
    `https://restcountries.com/v2/name/${userCountryName}`
  );
  if (!res.ok) throw new Error("could not get user country name");
  const data = await res.json();
  renderCountry(data[1]);
  console.log(data);
};

// whereAmIAsync()
//   .then((res) => console.log("log from then method", res))
//   .catch((err) => {
//     console.log(`error from catch, ${err}`);
//   });
// console.log("after where am i async function ");

// const [promiseResult] = whereAmIAsync("india");
// console.log(promiseResult);

//////////////promises in parallel
// function getJson(url, errorMsg = "Something went wrong") {
//   return fetch(url).then((response) => {
//     if (!response.ok) throw new Error(`${errorMsg} ${response.status}`);
//     return response.json();
//   });
// }

// const get3Countries = async function (c1, c2, c3) {
//   try {
//     // const [, data1] = await getJson(`https://restcountries.com/v2/name/${c1}`);
//     // const [data2] = await getJson(`https://restcountries.com/v2/name/${c2}`);
//     // const [data3] = await getJson(`https://restcountries.com/v2/name/${c3}`);
//     // console.log(data1.capital, data2.capital, data3.capital);
//     const data = await Promise.all([
//       getJson(`https://restcountries.com/v2/name/${c1}`),
//       getJson(`https://restcountries.com/v2/name/${c2}`),
//       getJson(`https://restcountries.com/v2/name/${c3}`),
//     ]);
//     data.forEach((country) => console.log(country[0].capital));
//   } catch (err) {
//     console.error(err);
//   }
// };

// get3Countries("india", "japan", "korea");

//////////////////////////udemy////////////////////////
// const getJSON = function (country, tag) {
//   return fetch(`https://restcountries.com/v3.1/${tag}/${country}`)
//   .then(response => {
//     if (!response.ok) throw new Error(
//       `Country ${country}, or search type ${tag} is invalid or could not be found (${response.status})`)
//   return response.json()
//   }); // prettier-ignore
// };

// const getMultipleCountries = async function (...arrCountries) {
//   try {
//     const promiseHelper = (name) => getJSON(name, `name`);

//     const promises = [];
//     arrCountries.forEach((country) => promises.push(promiseHelper(country)));

//     const data = await (await Promise.all(promises)).flat();
//     data.forEach((country, i, arr) => (arr[i] = country.capital[0]));
//     // map didn't mutate the array which is why I use forEach()

//     return data;
//   } catch (err) {
//     console.error(`Error occured: ${err.message}`);
//     console.error(err);
//     throw err;
//   }
// };

// (async function () {
//   try {
//     console.log(
//       await getMultipleCountries(
//         `portugal`,
//         `canada`,
//         `tanzania`,
//         `South Africa`
//       )
//     );
//   } catch {
//     console.error(`Error occured: ${err.message}`);
//     throw err;
//   }
// })();
//////////////////////////////udemy/////////////////////

/////////////////////promise race

(async function () {
  const res = await Promise.race([
    getJson(`https://restcountries.com/v2/name/italy`),
    getJson(`https://restcountries.com/v2/name/india`),
    getJson(`https://restcountries.com/v2/name/korea`),
  ]);
  console.log(res);
})();

///////////////cancelling promises after certain time
function timeout(secs) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      reject(new Error("took too long"));
    }, secs * 1000);
  }).catch((err) => console.error(err));
}

(async function () {
  Promise.race([
    getJson(`https://restcountries.com/v2/name/tanzania`),
    timeout(0),
  ]).then((res) => console.log(res));
})().catch((err) => console.error(err.message));

// Promise.race([
//   getJson(`https://restcountries.com/v2/name/tanzania`),
//   timeout(1),
// ])
//   .then((res) => console.log(res))
//   .catch((err) => console.error(err));

////////////////////////promise allSettled

Promise.allSettled([
  Promise.resolve("resolved"),
  Promise.reject("rejected"),
]).then((res) => console.log(res));

//////////////////////Promise.any
Promise.any([
  Promise.reject("resolved"),
  Promise.reject("rejected"),
  Promise.reject("rejected"),
]).then((res) => console.log(res));

Promise.all([]).then((res) => console.log(res));

// 1. Write an async function 'loadNPause' that recreates Challenge #2, this time
// using async/await (only the part where the promise is consumed, reuse the
// 'createImage' function from before)
async function loadNPause() {
  try {
    let img = await createImage("img/img-1.jpg");
    currentImage = img;
    await wait(2);
    currentImage.style.display = "none";

    img = await createImage("img/img-2.jpg");
    currentImage = img;
    await wait(2);
    currentImage.style.display = "none";
  } catch (err) {
    console.log(err);
  }
}
loadNPause();
// 2. Compare the two versions, think about the big differences, and see which one
// you like more
// 3. Don't forget to test the error handler, and to set the network speed to “Fast 3G”
// in the dev tools Network tab
// PART 2
// 1. Create an async function 'loadAll' that receives an array of image paths
// 'imgArr'
// 2. Use .map to loop over the array, to load all the images with the
// 'createImage' function (call the resulting array 'imgs')
// 3. Check out the 'imgs' array in the console! Is it like you expected?
// 4. Use a promise combinator function to actually get the images from the array 😉
// 5. Add the 'parallel' class to all the images (it has some CSS styles)
// Test data Part 2: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-
// 3.jpg']. To test, turn off the 'loadNPause' function

// let currentImage;
// // 4. Consume the promise using .then and also add an error handler
// createImage("img/img-1.jpg")
//   .then((img) => {
//     console.log(img);
//     currentImage = img;
//     // 5. After the image has loaded, pause execution for 2 seconds using the 'wait'
//     // function we created earlier
//     return wait(2);
//   })
//   .then(() => {
//     console.log("setting display");
//     // 6. After the 2 seconds have passed, hide the current image (set display CSS
//     // property to 'none'), and load a second image (Hint: Use the image element
//     // returned by the 'createImage' promise to hide the current image. You will
//     // need a global variable for that 😉)
//     currentImage.style.display = "none";
//     return createImage("img/img-2.jpg");
//   })
//   .then((img) => {
//     currentImage = img;
//     return wait(2);
//   })
//   .then(() => {
//     currentImage.style.display = "none";
//   })
//   .catch((err) => console.error(`${err}`));

// function createImage(imgPath) {
//   return new Promise(function (resolve, reject) {
//     const imageEle = document.createElement("img");
//     imageEle.src = imgPath;

//     imageEle.addEventListener("load", function (e) {
//       resolve(imageEle);
//       imageContainer.insertAdjacentElement("beforebegin", imageEle);
//     });
//     imageEle.addEventListener("error", function (e) {
//       reject(new Error("Image not found"));
//     });
//   });
// }
