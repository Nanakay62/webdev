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

//adding lcoal storage function.

const history = document.getElementById("historyList");
const searcher = document.getElementById("searcher");
const searchCard = document.getElementById("search-card");

let saved = localStorage.getItem("historyList") ? JSON.parse(localStorage.getItem("historyList")):[];

searchCard.addEventListener("history", (e) => {
    e.preventDefault();
    saved.push(searcher.value);
    localStorage.setItem("historyList", JSON.stringify(saved));
    listBuilder(searcher.value);
    searcher.value = "";
  });

  const listBuilder = (text) => {
    const histories = document.createElement("li");
    histories.innerHTML = text;
    historyList.appendChild(histories);
  };

  //function to display history after refreshing
  const getHistory = JSON.parse(localStorage.getItem("historyList"));
  getHistory.forEach((histories) => {
  listBuilder(histories);
});

// delete history
const deleteHistory = (btn) => {
    let el = btn.parentNode;
    const index = [...el.parentElement.children].indexOf(el);
    saved.splice(index, 1);
    localStorage.setItem("histories", JSON.stringify(saved));
    el.remove();
  };