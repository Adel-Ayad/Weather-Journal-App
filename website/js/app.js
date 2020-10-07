let baseURL = 'http://api.openweathermap.org/data/2.5/weather?';
let apiKEY = '6fb1b93facf0b26c02a4d5d087248a73';
let zipCode = document.getElementById('zip');




document.getElementById('generate').addEventListener('click', function () {
    console.log(zipCode)
    getWeather(baseURL, zipCode, apiKEY)
        .then(async (data) => {
            postData('/currentWeather', { temp: data.main.temp, Date: data.name });
        });
});

const getWeather = async (baseURL, zipCode, apiKEY) => {
    const res = await fetch(`${baseURL}zip=${zipCode.value}&units=metric&appid=${apiKEY}`);

    try {
        const data = await res.json();
        return (data)
        // console.log(data);
    } catch (error) {
        console.log("error" + error);
    }
}
/* Function to POST data */
const postData = async (url = '', data = {}) => {
    console.log(data)
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header        
    });

    try {
        const newData = await response.json();
        console.log("your new data " + newData);
        //return newData
    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
}
