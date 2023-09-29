"use strict";

// https://countries-api-836d.onrender.com/countries/

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

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
function getCountryAndNeighbor(country) {
  const request = new XMLHttpRequest();
  request.open("GET", `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener("load", function (e) {
    const [, data] = JSON.parse(this.responseText);
    console.log(data);

    renderCountry(data);

    //request for country 2
    const request2 = new XMLHttpRequest();
    const [, , code] = data.borders;
    request2.open("GET", `https://restcountries.com/v3.1/alpha/${code}`);
    request2.send();
    request2.addEventListener("load", function (e) {
      const [data] = JSON.parse(this.responseText);
      console.log(data);
      renderCountry(data);
    });
  });
}

getCountryAndNeighbor("india");

function renderCountry(data) {
  const html = `<article class="country">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>POP ${data.population}</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>`;

  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
}
