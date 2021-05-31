/* Welcome page scripts */

let weatherType = 'N/A';
let weatherDescription = 'N/A';
let temperatureDegC = 'N/A';
let co_ords = "0";
let humidity = "0";
let wind_speed = "0";
let weatherCode = "0";
let cityInput = "-";

function getCity() {
    cityInput = document.getElementById("citySelectInput").value;
    if (cityInput != ""){
        getWeather(cityInput);
    }

}

function getWeather(city) {
    var key = 'f44075067509a70c53f09a47cf5a02e4';
    var getCityData = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + key;

    var request = new XMLHttpRequest();
    request.open('GET', getCityData, true);

    request.onload = function() {
        console.log("logging data");
        var data = JSON.parse(this.response);
        weatherType = data.weather[0].main;
        weatherDescription = data.weather[0].description;
        temperatureDegC = kelvinToCelsius(data.main.temp);
        co_ords = data.coord.lat + ' , ' + data.coord.lon;
        humidity = data.main.humidity + ' %';
        wind_speed = (data.wind.speed * 3.6).toFixed(2) + ' KM/H';
        weatherCode = data.weather[0].id;

        console.log(city +":", weatherType, weatherDescription, temperatureDegC);
        setFirstHeading();
        setWeatherInfo();
        
    };

    request.send();
    welcomeFadeOut();
    

}

function welcomeFadeOut() {
    let welcomeContent = document.getElementById("welcomeContainer");

    welcomeContent.style.animation = "fadeout 2s";
    
    setTimeout(function() {
        $(welcomeContent).css('display', 'none'); console.log(" welcome page hidden");
    }, 2000);

    mainContentFadeIn();

}

function mainContentFadeIn(){
    let mainContent = document.getElementById("weatherPageContainer");
    mainContent.style.animation = "fadein 2s";

    setTimeout(function() {
        $(mainContent).css('display', 'inherit'); console.log("main content visible");
    }, 2000);

}

function syncDelay(milliseconds){
    var start = new Date().getTime();
    var end=0;
    while( (end-start) < milliseconds){
        end = new Date().getTime();
    }
}

function kelvinToCelsius(tempK) {
    let tempC = tempK - 273.15;
    let tempCRounded = Math.round(tempC);
    return tempCRounded;
}

/* Weather Page Scripts */

//Set background colour of page depending on season

/*function setBackgroundColour() {
    let page = document.getElementById('weatherPage');
    let date = new Date();
    let currentMonth = date.getMonth();

    // Winter Colour
    if (currentMonth == 10 || currentMonth == 11 || currentMonth == 0){
        page.style.backgroundColor = "#c9fffb";
    }
    // Spring Colour
    else if (currentMonth == 1 || currentMonth == 2 || currentMonth == 3){
        page.style.backgroundColor = "#c9ffc9";
    }
    // Summer Colour
    else if (currentMonth == 4 || currentMonth == 5 || currentMonth == 6){
        page.style.backgroundColor = "#feffc9";
    }
    // Autumn Colour
    else if (currentMonth == 7 || currentMonth == 8 || currentMonth == 9){
        page.style.backgroundColor = "#ffdec9";
    }
}*/

function setFirstHeading(){
    let co_ord_display = document.getElementById('co-ordinates-res');
    let humidity_display = document.getElementById('humidity-res');
    let wind_speed_display = document.getElementById('wind-speed-res');

    co_ord_display.innerText = co_ords;
    humidity_display.innerText = humidity;
    wind_speed_display.innerText = wind_speed;
}

function setWeatherInfo(){
    let iconsPath = "https://cormacmcmanus00.github.io/Weather-App/Icons/weather-icons-master/svg/";
    let weather_img_display = document.getElementById("weatherIcon");
    console.log("Weather code = " + weatherCode);

    // Group 2XX - Thunderstorms
    if (weatherCode >= 200 && weatherCode <= 299) {
        weather_img_display.setAttribute("src",iconsPath + "THUNDER");
    }

    // Group 3XX - Drizzle
    if (weatherCode >= 300 && weatherCode <= 399) {
        weather_img_display.setAttribute("src",iconsPath + "DRIZZLE");
    }

    /**************** NO GROUP 400 (MAYBE RESERVED FOR ERRORS?) ****************/

    // Group 5XX - Rain
    if (weatherCode >= 500 && weatherCode <= 599){
        weather_img_display.setAttribute("data",iconsPath + "RAIN.svg");
    }
    // Group 6XX - Snow
    else if (weatherCode >= 600 && weatherCode <= 699){
        weather_img_display.setAttribute("data",iconsPath + "SNOW.svg");
    }
    // Group 7XX - Atmosphere
    else if (weatherCode >= 700 && weatherCode <= 799){
        weather_img_display.setAttribute("data",iconsPath + "NA.svg");
    }
    // CODE 800 - Clear
    else if (weatherCode == 800){
        weather_img_display.setAttribute("data",iconsPath + "SUN.svg");
    }
     // Group 8XX - Clouds
    else if (weatherCode > 800){
        weather_img_display.setAttribute("data",iconsPath + "CLOUDY.svg");
    }
    else{
        weather_img_display.setAttribute("data",iconsPath + "NA.svg");
    }


    // Set location name
    let displayLocation = document.getElementById("locationName");
    displayLocation.innerText = cityInput;

    // Set weather description
    let displayWeatherType = document.getElementById("weatherTypeAndTemp");
    displayWeatherType.innerText = weatherType + " | " + temperatureDegC + "°C";
}
