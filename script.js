const apiKey = "13c1bf787e288963b89a6bc9d877d450";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    if (!city) {
        alert("Please enter a city name");
        return;
    }

    document.querySelector(".city").innerHTML = "Loading...";
    document.querySelector(".temp").innerHTML = "--°C";

    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

        if (!response.ok) {
            alert("City not found!");
            return;
        }

        const data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        let condition = data.weather[0].main.toLowerCase();

        // WEATHER ICON MATCHING SYSTEM
        if (condition.includes("cloud")) {
            weatherIcon.src = "images/clouds.png";
        } 
        else if (condition.includes("clear")) {
            weatherIcon.src = "images/clear.png";
        } 
        else if (condition.includes("rain")) {
            weatherIcon.src = "images/rain.png";
        } 
        else if (condition.includes("drizzle")) {
            weatherIcon.src = "images/drizzle.png";
        } 
        else if (condition.includes("mist") || condition.includes("fog") || condition.includes("haze")) {
            weatherIcon.src = "images/mist.png";
        } 
        else if (condition.includes("snow")) {
            weatherIcon.src = "images/snow.png";
        } 
        else {
            weatherIcon.src = "images/clouds.png"; // fallback
        }

    } catch (error) {
        alert("Error fetching weather data");
        console.error(error);
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        checkWeather(searchBox.value);
    }
});
