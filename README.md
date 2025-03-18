# weather-forecast
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Weather Forecast</title>
    <link rel="stylesheet" href="task3.css">
</head>
<body>
    <div class="container">
        <h1>Weather Forecast</h1>
        
        <div class="location-input">
            <input type="text" id="city" placeholder="Enter city name">
            <button onclick="getWeather()">Get Weather</button>
            <button onclick="detectLocation()">Use My Location</button>
        </div>

        <div id="weather-info" class="weather-info"></div>

        <div id="error-message" class="error-message"></div>
    </div>

    <script src="task3.js"></script>
</body>
</html>
