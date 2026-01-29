const apiKey = "13c1bf787e288963b89a6bc9d877d450"; // Replace with your OpenWeather API Key

// Get weather by city name
async function getWeatherByCity() {
    const city = document.getElementById("cityInput").value;
    if (!city) {
        alert("Enter a city name");
        return;
    }
    fetchWeather(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
}

// Get weather using user's location
function getWeatherByLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchWeather(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
        });
    } else {
        alert("Geolocation not supported");
    }
}

// Fetch weather data
async function fetchWeather(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200) {
            alert("Location not found");
            return;
        }

        document.getElementById("cityName").innerText = data.name;
        document.getElementById("temperature").innerText = `Temperature: ${data.main.temp}°C`;
        document.getElementById("condition").innerText = `Condition: ${data.weather[0].main}`;
        document.getElementById("humidity").innerText = `Humidity: ${data.main.humidity}%`;
        document.getElementById("wind").innerText = `Wind Speed: ${data.wind.speed} m/s`;

    } catch (error) {
        alert("Error fetching weather data");
    }
}
