const API_KEY = 'e27b1643e179e1673a28ad09acf13f41'; 
async function getWeather() {
    const city = document.getElementById('city').value;
    if (!city) {
        document.getElementById('error-message').innerText = 'Please enter a city name.';
        return;
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await response.json();

        if (data.cod === '404') {
            document.getElementById('error-message').innerText = 'City not found. Please try again.';
            return;
        }

        displayWeather(data);
    } catch (error) {
        document.getElementById('error-message').innerText = 'Failed to fetch weather data.';
    }
}

function detectLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(fetchWeatherByCoords, showError);
    } else {
        document.getElementById('error-message').innerText = 'Geolocation is not supported by this browser.';
    }
}

async function fetchWeatherByCoords(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        document.getElementById('error-message').innerText = 'Failed to fetch weather data based on location.';
    }
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weather-info');
    const city = data.city.name;
    const forecast = data.list;

    const dailyForecast = groupByDay(forecast);

    let weatherHTML = `<h2>Weather in ${city}</h2>`;

    dailyForecast.forEach((day) => {
        const date = new Date(day[0].dt_txt).toLocaleDateString();
        const temp = day[0].main.temp;
        const description = day[0].weather[0].description;
        const humidity = day[0].main.humidity;

        weatherHTML += `
            <p><strong>${date}</strong></p>
            <p>Temperature: ${temp}°C</p>
            <p>Weather: ${description}</p>
            <p>Humidity: ${humidity}%</p>
            <hr>
        `;
    });

    weatherInfo.innerHTML = weatherHTML;
    document.getElementById('error-message').innerText = ''; 
}


function groupByDay(forecast) {
    const grouped = [];
    forecast.forEach((item) => {
        const date = new Date(item.dt_txt).toLocaleDateString();
        if (!grouped[date]) {
            grouped[date] = [];
        }
        grouped[date].push(item);
    });

    return Object.values(grouped);
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById('error-message').innerText = 'User denied the request for geolocation.';
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById('error-message').innerText = 'Location information is unavailable.';
            break;
        case error.TIMEOUT:
            document.getElementById('error-message').innerText = 'The request to get user location timed out.';
            break;
        default:
            document.getElementById('error-message').innerText = 'An unknown error occurred.';
            break;
    }
}
