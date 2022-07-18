// create a weather class to implement weather search, show and extra functionality.
class Weather {
  constructor(apiKey) {
     // set this._apiKey to apiKey to get access of it in overall classl
     this._apiKey = apiKey;
   }
 
   // arrow function to search weather
   searchWeather = async () => {
     // get search bar value
     const city = searchBar.value;
     // asyncronous fetch request to get weather of a particular city by using city(search bar value) and this._apiKey
     const res = await fetch(
       "https://api.openweathermap.org/data/2.5/weather?q=" +
         city +
         "&units=metric&appid=" +
         this._apiKey
     );
     // convert response into json object
     const data = await res.json();
     // call and pass data to this.displayWeather function
     this.displayWeather(data);
   };
 
   // arrow function to show current weather
   displayWeather = (data) => {
     // extract values from data object and its sub keys by using object destructing
     const { name } = data;
     const { icon, description } = data.weather[0];
     const { temp, humidity } = data.main;
     const { speed } = data.wind;
     // set different values to different elements.
     document.querySelector(".city").innerText = `Wheather in ${name}`;
     document.querySelector(
       ".icon"
     ).src = `http://openweathermap.org/img/wn/${icon}.png`;
     document.querySelector(".description").innerText = description;
     document.querySelector(".temp").innerText = `${temp}°C"`;
     document.querySelector(".humidity").innerText = `Humidity ${humidity}%`;
     document.querySelector(".wind").innerText = `Wind Speed ${speed}km/h`;
   };
 }
 
 // main control variable
 const controller = new Weather("619470e8c09c144ce4542826c171544c");
 
 // get search bar by using querySelector
 const searchBar = document.querySelector(".search button");
 // add click event on searchBar
 searchBar.addEventListener("click", controller.searchWeather);
 
 let weather = {
   "apiKey": "619470e8c09c144ce4542826c171544c",
   fetchWeather: function(city) {
       fetch("https://api.openweathermap.org/data/2.5/weather?q="+ city + "&units=metric&appid="+ this.apiKey).then((response) => response.json()).then((data)=> this.displayWeather(data));   
        },
        displayWeather: function(data){
           const  {name}= data;
           const {icon, description} = data.weather[0];
           const {temp, humidity} =data.main;
           const {speed} = data.wind;
           console.log(name,icon,description,temp,humidity,speed);
           document.querySelector(".city").innerText = "Weather in " + name;
           document.querySelector(".icon").src = " http://openweathermap.org/img/wn/"+ icon + ".png";
           document.querySelector(".description").innerText = description;
           document.querySelector(".temp").innerText = temp + " °C" ;
           document.querySelector(".humidity").innerText = "Humidity " + humidity + "%";
           document.querySelector(".wind").innerText =  "Wind Speed" + speed + "km/h";
        },
        search:function(){
           this.fetchWeather(document.querySelector(".search-bar").value);
        }
} 

document.querySelector(".search button").addEventListener("click", function() {
   weather.search();

})


//adding local storage function
 const history = document.getElementById("historyList"),
   searcher = document.getElementById("searcher"),
   searchCard = document.getElementById("search-card"),
   searchBarr = document.getElementById("search-bar");
   delHistory = document.getElementById("del-history");
 
 // if localStorage has historyList then return it else and empty array
 //let saved = localStorage.getItem("historyList")
 let saved = localStorage.getItem("searchBarr")
   ? JSON.parse(localStorage.getItem("searchBarr"))
   : [];
 
 // add change event on searchCard
 searchCard.addEventListener("change", (e) => {
   // prevent default behaviour
   e.preventDefault();
   // push search bar value in saved
   saved.push(searchBarr.value);
   // set localStorage historyList item with saved

  // localStorage.setItem("historyList", JSON.stringify(saved));
  localStorage.setItem("searchBarr", JSON.stringify(saved));

   // call listBuilder function and pass search bar value as a argument
   listBuilder(searchBarr.value);
   // set search bar value to ""(empty string)
   searchBar.value = "";
 });
 
 // arrow function to history of searched cities.
 const listBuilder = (text) => {
   // create li element
   const histories = document.createElement("li");
   // set li innerText to text
   histories.innerText = text;
   // append histories into historyList
   historyList.appendChild(histories);
 };
 
 //function to display history after refreshing
 saved.forEach((histories) => {
   listBuilder(histories);
 });
 
 // add click event on delHistory
 delHistory.addEventListener("click", () => {
   history.firstElementChild.remove();
   saved.splice(0, 1);
   // set localStorage historyList item with saved
   localStorage.setItem("historyList", JSON.stringify(saved));
 });




/*
 let weather = {
   "apiKey": "619470e8c09c144ce4542826c171544c",
   fetchWeather: function(city) {
       fetch("https://api.openweathermap.org/data/2.5/weather?q="+ city + "&units=metric&appid="+ this.apiKey).then((response) => response.json()).then((data)=> this.displayWeather(data));   
        },
        displayWeather: function(data){
           const  {name}= data;
           const {icon, description} = data.weather[0];
           const {temp, humidity} =data.main;
           const {speed} = data.wind;
           console.log(name,icon,description,temp,humidity,speed);
           document.querySelector(".city").innerText = "Weather in " + name;
           document.querySelector(".icon").src = " http://openweathermap.org/img/wn/"+ icon + ".png";
           document.querySelector(".description").innerText = description;
           document.querySelector(".temp").innerText = temp + " °C" ;
           document.querySelector(".humidity").innerText = "Humidity " + humidity + "%";
           document.querySelector(".wind").innerText =  "Wind Speed" + speed + "km/h";
        },
        search:function(){
           this.fetchWeather(document.querySelector(".search-bar").value);
        }
} 

document.querySelector(".search button").addEventListener("click", function() {
   weather.search();

})

 // arrow function to search weather
 searchWeather = async () => {
   // get search bar value
   const city = searchBar.value;
   // asyncronous fetch request to get weather of a particular city by using city(search bar value) and this._apiKey
   const res = await fetch(
     `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this._apiKey}`
   );
   // convert response into json object
   const data = await res.json();
   //call and pass data to this.displayWeather function
   this.displayWeather(data, city);
 };

 // arrow function to show current weather
 displayWeather = (data, city) => {
   // extract values from data object and its sub keys by using object destructing
   const { name } = data;
   const { icon, description } = data.weather[0];
   const { temp, humidity } = data.main;
   const { speed } = data.wind;
   // set different values to different elements.
   document.querySelector(".city").innerText = `Weather in ${name}`;
   document.querySelector(
     ".icon"
   ).src = `http://openweathermap.org/img/wn/${icon}.png`;
   document.querySelector(".description").innerText = description;
   document.querySelector(".temp h2").innerText = `${temp}°C`;
   document.querySelector(".humidity").innerText = `Humidity ${humidity}%`;
   document.querySelector(".wind").innerText = `Wind Speed ${speed}km/h`;
   // push search bar value in saved
   saved.push(city);
   // set localStorage historyList item with saved
   localStorage.setItem("historyList", JSON.stringify(saved));
   // call listBuilder function and pass search bar value as a argument
   listBuilder(city);
   // set search bar value to ""(empty string)
   searchBar.value = "";
 };


// mian control variable
const controller = new Weather("619470e8c09c144ce4542826c171544c");


const searchBar = document.querySelector(".search-bar");
// get search btn by using querySelector
const searchBtn = document.querySelector(".search button");
// add click event on searchBar
searchBtn.addEventListener("click", () => {
 // remove start and end white spaces from search bar value
 const searchBarValue = searchBar.value.trim();
 // if search bar value equals to "" then set result to true else false
 const result = searchBarValue === "";
 // if result equals to true then alert user else search weather
 if (result) {
   alert("Please enter a valid city name.");
 } else {
   controller.searchWeather();
 }
});

//adding local storage function
const history = document.getElementById("historyList"),
searchCard = document.getElementById("search-card"),
   delHistory = document.getElementById("del-history",)
 delHistory = document.getElementById("del-history");

// if localStorage has historyList then return it else and empty array
let saved = localStorage.getItem("searchBar")
 ? JSON.parse(localStorage.getItem("searchBar"))
 : [];

// arrow function to history of searched cities.
const listBuilder = (text) => {
 // create li element
 const histories = document.createElement("li");
 // set li innerText to text
 histories.innerText = text;
 // append histories into historyList
 history.appendChild(histories);
};

//function to display history after refreshing
saved.forEach((histories) => {
 listBuilder(histories);
});

// add click event on delHistory
delHistory.addEventListener("click", () => {
 // remove ul first li
 history.firstElementChild.remove();
 // remove 0 element from saved
 saved.splice(0, 1);
 // set localStorage historyList item with saved
 localStorage.setItem("historyList", JSON.stringify(saved));
});
*/