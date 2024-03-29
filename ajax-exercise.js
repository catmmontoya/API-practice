import axios from "axios";

function showDogPhoto(evt) {
  axios.get("https://dog.ceo/api/breeds/image/random").then((res) => {
    const imgUrl = res.data.message;
    document.querySelector("#dog-image").innerHTML = `<img src=${imgUrl}`;
  });
}

document
  .querySelector("#get-dog-image")
  .addEventListener("click", showDogPhoto);

function showWeather(evt) {
  const zipcode = document.querySelector("#zipcode-field").value;

  axios.get(`/weather.txt?zipcode=${zipcode}`).then((res) => {
    const zipUrl = res.data.forecast;
    document.querySelector("#weather-info").innerHTML = res.data;
  });
}

document
  .querySelector("#weather-button")
  .addEventListener("click", showWeather);

async function orderCookies(evt) {
  evt.preventDefault();
  const cookieType = document.querySelector("#cookie-type-field");
  const qty = document.querySelector("#qty-field");
  const response = await axios.post("/order-cookies.jason", {
    cookieType: cookieType,
    qty: qty,
  });
  const orderStatus = document.querySelector("#order-status");
  orderStatus.innerText = res.data.message;
  if (res.data.resultCode === "ERROR") {
    orderStatus.classList.add("order-error");
  } else {
    orderStatus.classList.remove("order-error");
  }
}
document.querySelector("#order-form").addEventListener("submit", orderCookies);

// PART 4: iTunes Search

async function iTunesSearch(evt) {
  evt.preventDefault();
  const searchTerm = document.querySelector("#search-term").value;

  const formData = { term: searchTerm };
  const queryString = new URLSearchParams(formData).toString();
  const url = `http://itunes.apple.com/search/${queryString}`;

  const response = await axios.get(url);
  let displayString = "";
  for (const result of response.data.results) {
    displayString += `<li> Artist: ${result.artistName} Song: ${result.trackName}</li>`;
    document.querySelector("itunes-results").innerHTML = displayString;
  }
}

document
  .querySelector("#itunes-search-form")
  .addEventListener("submit", iTunesSearch);
