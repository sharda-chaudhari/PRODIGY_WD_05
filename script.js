const API_KEY = '87e2da448b5b2d3a104077554b2e9045'; // Replace with your OpenWeatherMap API key

// Fetch weather data based on user input (city name)
async function fetchWeatherByCity() {
    const cityInput = document.getElementById('city-input').value.trim();
    
    if (!cityInput) {
        document.getElementById('location').textContent = "Please enter a city!";
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=metric&appid=${API_KEY}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();

        // Check if the API response is ok
        if (response.ok) {
            displayWeather(data);
        } else {
            // Log the error to the console
            console.log('API Error:', data);
            document.getElementById('location').textContent = data.message || "City not found!";
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        document.getElementById('location').textContent = "Unable to fetch weather data.";
    }
}

// Fetch weather data based on the user's geolocation
async function getLocationWeather() {
    if (!navigator.geolocation) {
        document.getElementById('location').textContent = "Geolocation is not supported by this browser.";
        return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
        
        try {
            const response = await fetch(url);
            const data = await response.json();

            if (response.ok) {
                displayWeather(data);
            } else {
                console.log('API Error (location-based):', data);
                document.getElementById('location').textContent = "Unable to fetch weather for your location.";
            }
        } catch (error) {
            console.error("Error fetching weather data:", error);
            document.getElementById('location').textContent = "Unable to fetch weather data.";
        }
    }, (error) => {
        console.log("Geolocation Error:", error);
        document.getElementById('location').textContent = "Error getting your location.";
    });
}

// Display weather data in the UI
function displayWeather(data) {
    const location = `${data.name}, ${data.sys.country}`;
    const temperature = `${data.main.temp}°C`;
    const conditions = data.weather[0].description;

    document.getElementById('location').textContent = location;
    document.getElementById('temperature').textContent = `Temperature: ${temperature}`;
    document.getElementById('conditions').textContent = `Conditions: ${conditions}`;
}
