export default function mainFunc() {
    var input = document.getElementById('search_str');

    if (input.value != '') {

        var param = document.getElementById('search_str').value;
        const Http = new XMLHttpRequest();
        const url = 'http' + 's'+'://api.openweathermap.org/data/2.5/weather?q=' + param + '&units=metric' + '&APPID=a701373c514912374872f7a940df00a7';

        Http.open("GET", url);
        Http.send();
        Http.onload = (e) => {
            console.log(Http.responseText);

            var resp = document.getElementById('response');
            resp = Http.responseText;
            var respJSON = JSON.parse(resp);
            console.log(respJSON.cod);

            if (typeof(respJSON.cod) !== 'undefined' && respJSON.cod != 200) {
                alert(respJSON.message);
                return false;
            }
            //выводим иконку погоды
            var icon = respJSON.weather[0].icon;
            // response.innerHTML = icon;
            // console.log(icon);
            // resp = document.getElementById('weatherImg').setAttribute('src', "http://openweathermap.org/img/w/" + icon + ".png");


//Выводим флаг стран
            var res = respJSON.sys.country.toLowerCase();
            var resFlags = document.getElementById('flags').setAttribute('src', "https://openweathermap.org/images/flags/" + res + ".png");

            // console.log(respJSON.sys.country)

            var cityName = respJSON.name;
            var countryn = respJSON.sys.country;
            var weatherMain = respJSON.weather[0].main;
            var description = respJSON.weather[0].description;
            var mainTemp = respJSON.main.temp;
            var pressure = respJSON.main.pressure;
            var humidity = respJSON.main.humidity;

            var tempMin = respJSON.main.temp_min;
            var tempMax = respJSON.main.temp_max;

            var windSpeed = respJSON.wind.speed;
            var windDeg = respJSON.wind.deg;

            var coordLon = respJSON.coord.lon;
            var coordLat = respJSON.coord.lat;
            initMap(respJSON.coord.lon, respJSON.coord.lat);
            console.log(coordLon, coordLat);

            response.innerHTML = "<h2 style='font-size:20px;'>Current Weather in: " + "<img src='https://openweathermap.org/images/flags/" + res + ".png'>&nbsp;" + cityName + " ," + countryn + "</h2>" +

                "<div class='row'> <div class='col-sm-6 text-right'><strong>Weather:</strong> </div><div class='col-sm-6 text-left'>" + weatherMain + "</div></div>" +
                "<div class='row'> <div class='col-sm-6 text-right cw'><strong>Description:</strong> </div><div class='col-sm-6 text-left'><img src='https://openweathermap.org/img/w/" + icon + ".png '>  " + description + "</div></div>" +
                "<div class='row'> <div class='col-sm-6 text-right'><strong>Temperature: </strong></div><div class='col-sm-6 text-left'>" + mainTemp + "&deg;C</div></div>" +
                "<div class='row'> <div class='col-sm-6 text-right'><strong>Pressure: </strong></div><div class='col-sm-6 text-left'>" + pressure + " hPa</div></div>" +
                "<div class='row'> <div class='col-sm-6 text-right'><strong>Humidity: </strong></div><div class='col-sm-6 text-left'>" + humidity + "%</div></div>" +
                "<div class='row'> <div class='col-sm-6 text-right'><strong>Min. Temperature: </strong></div><div class='col-sm-6 text-left'>" + tempMin + "&deg;C</div></div>" +
                "<div class='row'> <div class='col-sm-6 text-right'><strong>Max. Temperature: </strong></div><div class='col-sm-6 text-left'>" + tempMax + "&deg;C</div></div>" +
                "<div class='row'> <div class='col-sm-6 text-right'><strong>Wind Speed: </strong></div><div class='col-sm-6 text-left'>" + windSpeed + "m/s</div></div>" +
                "<div class='row'> <div class='col-sm-6 text-right'><strong>Wind Direction: </strong></div><div class='col-sm-6 text-left'>" + windDeg + "&deg;</div></div>";

            console.log(weatherMain, description, mainTemp, pressure, humidity, tempMin, tempMax, windSpeed, windDeg, countryn, cityName)

        }
        ;

    } else {
        document.getElementById('error').innerHTML = "<div class='alert alert-danger ' id='errorCity'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>Field can not be empty</div>"

    }
}