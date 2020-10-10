const baseURL = 'http://api.openweathermap.org/data/2.5/weather?';
const apiKEY = '6fb1b93facf0b26c02a4d5d087248a73';
const zipCode = document.getElementById('zip');
const cityName = document.getElementById('name');
const noZipOrName = document.getElementById('noZipOrName');
const mostRecentEntryTitle = document.getElementById('mostRecentEntryTitle');
const feeling = document.getElementById('feelings');
const city = document.getElementById('city');
const temp = document.getElementById('temp');
const content = document.getElementById('content');
const dateEle = document.getElementById('dateEle');
const searchMethodButton = document.getElementById('searchMethodButton');
d = new Date();
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const date = `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
const holderZip = document.querySelector(".holderZip");
const holderName = document.querySelector(".holderName");

searchMethodButton.addEventListener('click', function () {
    holderZip.classList.toggle("hiddenClass");
    holderName.classList.toggle("hiddenClass");

    if (searchMethodButton.innerText == 'Search by Zipcode') {
        searchMethodButton.innerText = 'Search by City Name'
    }

    else { searchMethodButton.innerText = 'Search by Zipcode' }




})
document.getElementById('generate').addEventListener('click', function () {
    //console.log(zipCode)
    if (zipCode.value || cityName.value) {
        getWeather(baseURL, zipCode, cityName, apiKEY)
            .then(async (data) => {
                postData('/recieveWeatherData', { temp: data.main.temp, city: data.name, country: data.sys.country, date: date, feeling: feeling.value });
                updateUI();
            })

    } else {
        noZipOrName.innerHTML = `Please enter your city's name OR zipcode`
        mostRecentEntryTitle.innerHTML = ``
        city.innerHTML = ``
        temp.innerHTML = ``
        content.innerHTML = ``
        dateEle.innerHTML = ``
        alert("Please enter your city's name OR zipcode");
    }

});

const getWeather = async (baseURL, zipCode, cityName, apiKEY) => {
    if (zipCode.value) {
        let res = await fetch(`${baseURL}zip=${zipCode.value}&units=metric&appid=${apiKEY}`);
        try {
            const apiRecievedData = await res.json();
            console.log(apiRecievedData);
            zipCode.value = null;
            if (apiRecievedData.cod == "404") {
                //console.log("You have entered non-existed zipcode")
                alert("You had entered non-existed zipcode");
                noZipOrName.innerHTML = `Please Enter a Correct zipcode`
                mostRecentEntryTitle.innerHTML = ``
                city.innerHTML = ``
                temp.innerHTML = ``
                content.innerHTML = ``
                dateEle.innerHTML = ``

            }
            else { return (apiRecievedData) }

        } catch (error) {
            console.log("error" + error);
        }

    }

    else {
        let res = await fetch(`${baseURL}q=${cityName.value.charAt(0).toUpperCase() + cityName.value.slice(1)}&units=metric&appid=${apiKEY}`);

        try {
            const apiRecievedData = await res.json();
            console.log(apiRecievedData);
            zipCode.value = null;
            if (apiRecievedData.cod == "404") {
                //console.log("You have entered non-existed city name")
                alert("You had entered non-existed city name");
                noZipOrName.innerHTML = `Please Enter a Correct city name`
                mostRecentEntryTitle.innerHTML = ``
                city.innerHTML = ``
                temp.innerHTML = ``
                content.innerHTML = ``
                dateEle.innerHTML = ``

            }
            else { return (apiRecievedData) }

        } catch (error) {
            console.log("error" + error);
        }
    }

}
/* Function to POST data */
const postData = async (url = '', dataToBePosted = {}) => {

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToBePosted),
    });
    try {
        console.log(dataToBePosted)
    } catch (error) {
        console.log(error);
    }


}


const updateUI = async () => {
    const req = await fetch('/fetchWeatherData')
    try {
        const weatherData = await req.json()
        noZipOrName.innerHTML = ``
        mostRecentEntryTitle.innerHTML = `Most Recent Entry`
        city.innerHTML = `City: ${weatherData[0].city}, ${weatherData[0].country}`
        dateEle.innerHTML = `Date: ${weatherData[0].date}`
        temp.innerHTML = `Tempreture: ${weatherData[0].temp}° C`
        if (weatherData[0].feeling) {
            content.innerHTML = `You feel ${weatherData[0].feeling}.`
            feeling.value = null
        }
        else {
            content.innerHTML = `It seems you feel Nothing.`
        }
    } catch (error) {
        console.log(error)

    }
}