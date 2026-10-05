async function fetchData() {
    const city = document.getElementById("cityInput").value;
    
    try {
        // Step 1: Convert City Name to Latitude & Longitude
        const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`);
        const geoData = await geoRes.json();
        
        if (!geoData.results) {
            alert("City not found. Please try another name.");
            return;
        }
        
        const lat = geoData.results[0].latitude;
        const lon = geoData.results[0].longitude;

        // Step 2: Fetch Current Weather
        const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m`);
        const weatherData = await weatherRes.json();
        
        // Step 3: Fetch Air Quality
        const aqiRes = await fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=european_aqi,pm2_5`);
        const aqiData = await aqiRes.json();

        // Step 4: Inject Data into HTML DOM
        document.getElementById("temp").innerText = weatherData.current.temperature_2m;
        document.getElementById("wind").innerText = weatherData.current.wind_speed_10m;
        document.getElementById("aqi").innerText = aqiData.current.european_aqi;
        document.getElementById("pm25").innerText = aqiData.current.pm2_5;
        
    } catch (error) {
        console.error("Data Fetch Error:", error);
        alert("Failed to connect to the weather servers.");
    }
}

// Automatically load default city data when the page opens
window.onload = fetchData;