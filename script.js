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

getCountryData("india");
