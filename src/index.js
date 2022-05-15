import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('input#search-box'),
    countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
    
};
refs.input.addEventListener('input', debounce(onInputHandler, DEBOUNCE_DELAY));

function onInputHandler(e) {
  e.preventDefault();
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
  let inputSymbols = e.target.value.trim();
  if (inputSymbols) {
    fetchCountries(inputSymbols).then(showCountry);
  }
}

function showCountry(payload) {
  if (payload.length > 10) {
    return Notify.info('Too many matches found. Please enter a more specific name.');
  } else if (payload.length <= 10 && payload.length >= 2) {
    return renderCountyInfo(payload);
  } else {
      return renderOneCountry(payload);
  }
}
///////// render counrty list /////////////////////////
function renderCountyInfo(array) {
  const countryList = array.reduce((acc, country) => {
    return (
      acc +
      `<li class="list"><img class="img-on-list" src="${country.flags.svg}" alt=""><p class="country-name">${country.name.official}</p></li>`
    );
  }, '');
  refs.countryList.insertAdjacentHTML('beforeend', countryList);
}

function renderOneCountry(array) {
  const oneCountry = array.map(
    country =>
      `<img class="info-img" src="${country.flags.svg}" alt=""><span>${country.name.official}</span><p>Capital ${country.capital}</p><p>Population: ${country.population}</p><p>Languages: ${Object.values(country.languages).join(", ")} </p>`
  );
    refs.countryInfo.insertAdjacentHTML('beforeend', oneCountry);
}

// const markup = `<li class="flag"><img src="${country.flag.svg}" alt=""><p>${country.name.official}</p></li>`
// .catch(Notify.failure('Oops, there is no country with that name'))
// console.log(
//   fetch(
//     'restcountries.com/v2/all?fields=name.official,capital,population,flags.svg,languages',
//   ).then(response => response.json()).then(data => console.log(data))
// );

// const r = fetch('https://restcountries.com/v3.1/name/peru')
//   .then(res => {
//     return res.json();
//   })
//   .then(data => console.log(data[0].name.official))
//   .catch(error => console.log(error));
