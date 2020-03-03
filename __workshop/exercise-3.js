// Exercise 3 - `getAddressPosition`
// ---------------------------------
// 1. Go to https://darksky.net/dev/ and read the documentation
// 2. Signup and get a free API key
// 3. Complete the code of the function.
// The `position` parameter is an object with `lat` and `lng`.
// 4. Make sure your function only returns a `Promise` for the current temperature
// (a number) and nothing else

// Given a position (latitude and longitude), returns the position
const request = require("request-promise");

function getCurrentTemperatureAtPosition(position) {
//this is what we will send to the serve and wait for a response
return request(`https://api.darksky.net/forecast/c12bf190570a63f4cbe4226ed3790e6f/${position.lat},${position.log}`)

.then (data => { //the data represents the receive data from the server but i could have called it anything 
    let returnedData = JSON.parse(data) //turn the data into an object
//console.log(data)
    return {
        currentTemp: returnedData.currently.temperature //return the current temperature and goes to the other return which is the return of the function

    };
    
})
// .then(data => console.log(data))

}

getCurrentTemperatureAtPosition({log: 45.5017,lat: 73.5673}) //this returns the temperature as a promise 

.then(temp => {
    console.log(temp)
})