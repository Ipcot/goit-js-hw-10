import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('input#search-box'),
};
refs.input.addEventListener('input', debounce(onInputHandler, DEBOUNCE_DELAY));

function onInputHandler(e) {
  e.preventDefault();
  let inputSymbols = e.target.value.trim();
  if (inputSymbols) {
    fetchCountries(inputSymbols)
      .then(showCountry)
      .catch(Notify.failure('Oops, there is no country with that name'));
  }
}

function showCountry(payload) {
  if (payload.length > 10) {
    return Notify.info('Too many matches found. Please enter a more specific name.');
    } else if(payload.length <= 10 && payload.length >= 2 ) {
      payload.map(country => {
          return console.log(country.name.official, country.name.official);
      })
    }
//   return console.log(payload[0].name.official);
}

function renderCountyInfo() {}

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
