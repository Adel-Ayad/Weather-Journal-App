/* global varibles*/
//Api stuff
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?',
    apiKEY = '6fb1b93facf0b26c02a4d5d087248a73',
    //Inputs
    zipCode = document.getElementById('zip'),
    cityName = document.getElementById('name'),
    feeling = document.getElementById('feelings'),
    //Recent entry
    mostRecentEntryTitle = document.getElementById('mostRecentEntryTitle'),
    noZipOrName = document.getElementById('noZipOrName'),
    city = document.getElementById('city'),
    dateEle = document.getElementById('dateEle'),
    temp = document.getElementById('temp'),
    content = document.getElementById('content'),
    //Search method
    searchMethodButton = document.getElementById('searchMethodButton'),
    holderZip = document.querySelector(".holderZip"),
    holderName = document.querySelector(".holderName");
//Date
d = new Date();
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const date = `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;



/*Change Search Method */
searchMethodButton.addEventListener('click', function () {
    // hide the shown and show the hidden
    holderZip.classList.toggle("hiddenClass");
    holderName.classList.toggle("hiddenClass");

    // clear input boxes to prevent errors or getting the same result 
    zipCode.value = null;
    cityName.value = null;

    // change the text inside the button
    if (searchMethodButton.innerText == 'Search by Zipcode') {
        searchMethodButton.innerText = 'Search by City Name'
    }

    else { searchMethodButton.innerText = 'Search by Zipcode' }

})



document.getElementById('generate').addEventListener('click', function () {
    //If there is zipcode or city name then play getweather func + post data to server + and UpdateUI
    if (zipCode.value || cityName.value) {
        getWeather(baseURL, zipCode, cityName, apiKEY)
            .then(async (data) => {
                postData('/recieveprojectData', { temp: data.main.temp, city: data.name, country: data.sys.country, date: date, feeling: feeling.value });
                updateUI();
            })

    } else {
        //If there is no zipcode or city name Notify the User and clear the Most recent entry
        alert("Please enter your city's name OR zipcode");
        mostRecentEntryTitle.innerHTML = ``;
        noZipOrName.innerHTML = `Please enter your city's name OR zipcode`;
        city.innerHTML = ``;
        dateEle.innerHTML = ``;
        temp.innerHTML = ``;
        content.innerHTML = ``;


    }

});

/*Get the Weather info from Api */
const getWeather = async (baseURL, zipCode, cityName, apiKEY) => {
    /*By zip code */
    if (zipCode.value) {
        let res = await fetch(`${baseURL}zip=${zipCode.value}&units=metric&appid=${apiKEY}`);
        try {
            const apiRecievedData = await res.json();
            console.log(apiRecievedData);
            zipCode.value = null;
            //if the zipcode is WRONG Notify the User and clear the Most recent entry
            if (apiRecievedData.cod == "404") {
                //console.log("You have entered non-existed zipcode")
                alert("You had entered non-existed zipcode");
                mostRecentEntryTitle.innerHTML = ``;
                noZipOrName.innerHTML = `Please Enter a Correct zipcode`;
                city.innerHTML = ``;
                dateEle.innerHTML = ``;
                temp.innerHTML = ``;
                content.innerHTML = ``;


            }
            // if every thing is OK return the data
            else { return (apiRecievedData) }

        } catch (error) {
            console.log("error" + error);
        }

    }
    /*By city name */
    else {
        let res = await fetch(`${baseURL}q=${cityName.value.charAt(0).toUpperCase() + cityName.value.slice(1)}&units=metric&appid=${apiKEY}`);

        try {
            const apiRecievedData = await res.json();
            console.log(apiRecievedData);
            cityName.value = null;
            if (apiRecievedData.cod == "404") {
                //console.log("You have entered non-existed city name")
                alert("You had entered non-existed city name");
                mostRecentEntryTitle.innerHTML = ``;
                noZipOrName.innerHTML = `Please Enter a Correct city name`;
                city.innerHTML = ``;
                dateEle.innerHTML = ``;
                temp.innerHTML = ``;
                content.innerHTML = ``;


            }
            else { return (apiRecievedData) }

        } catch (error) {
            console.log("error" + error);
        }
    }

}
/*  POST Weather data to server to be processed*/
const postData = async (url = '', dataToBePosted = {}) => {

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToBePosted)
    });
    try {
        console.log(dataToBePosted);
    } catch (error) {
        console.log(error);
    }


}

/*Fetch and Recieve the processed data Then Update UI accordingly */
const updateUI = async () => {
    const req = await fetch('/fetchWeatherData')
    try {
        const projectData = await req.json();
        mostRecentEntryTitle.innerHTML = `Most Recent Entry`;
        noZipOrName.innerHTML = ``;
        city.innerHTML = `City: ${projectData.city}, ${projectData.country}`;
        dateEle.innerHTML = `Date: ${projectData.date}`;
        temp.innerHTML = `Tempreture: ${projectData.temp}° C`;
        if (projectData.feeling) {
            content.innerHTML = `You feel ${projectData.feeling}.`;
            feeling.value = null;
        }
        else {
            content.innerHTML = `It seems you feel Nothing.`;
        }
    } catch (error) {
        noZipOrName.innerHTML = `Something went wrong, Please try again`;
        console.log(error);

    }
}