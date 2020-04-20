/*
This is a Simple App that Consumes openweather Free API using Fetch Method .
YOU CAN GET the Temperature at your position in Fahrenheit or Degree °C

Check The Documentation of The API : https://openweathermap.org/api

*/


window.onload = () => {

    let lon;
    let lat;
    let tempDescription = document.querySelector('.temperature-description');
    let tempdegree = document.querySelector('.temperature-degree');
    let locationTimeZone = document.querySelector('.location-timezone')
    let img = document.querySelector('.icon');
    let hearder = document.querySelector('.header');
    let changeUnity = document.querySelector('.degree-section');
    let unity = document.querySelector('.degree-section span');
    let units = "imperial";// FOR Fahrenheit   And metric for degree C



    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position)
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            const KEY_API = "f3ee291adaedde65eea30e7545bc9cac"
            let api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${KEY_API}`;

            //const proxy = `https://cors-anywhere.herokuapp.com/`; to enable cors in localal host

            // Call the API
            getCurrentWether(api);
        })



    } else {
        alert("Please let Us know your location in Order to provide you the current Temerature in your City")
    }



    // The Function that Calls the API
    function getCurrentWether(api) {
        fetch(api)
            .then(res => {
                return res.json();
            })
            .then(data => {
                console.log(data)
                // Extracting Data from the Response
                const temp = data.main.temp;
                const { description, icon } = data.weather[0];
                const nameArea = data.name;
                const country = data.sys.country;
                // 
                const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`

                // Set Dom Elements from the API
                tempdegree.textContent = temp;
                locationTimeZone.textContent = nameArea;
                tempDescription.textContent = description;
                img.src = iconUrl
                hearder.textContent = `Check the Current Weather in ${country}`;

                // Change Temperature to °C
                let celesius = (temp - 32) * (5 / 9)

                changeUnity.addEventListener('click', () => {

                    if (unity.textContent === "°C") {
                        tempdegree.textContent = temp
                        unity.textContent = "F"
                    } else {
                        tempdegree.textContent = Math.floor(celesius)
                        unity.textContent = "°C"
                    }
                });
            })
            .catch(err => {
                console.log(err.message);
            })
    }





}