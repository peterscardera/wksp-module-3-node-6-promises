// Exercise 4 - `getCurrentTemperature`
// -----------------------------------
// While it's useful to get the current temperature for a specific lat/lng,
// most often we want to provide the name of a place instead.
// 
// You already created a function that can do address ==> position,
// and one that can do position ==> temperature. For this exercise,
// re-use these two functions to create one that goes directly from address ==> temperature.
// 
// You can copy/paste your code from the previous exercises,
// or require them at the top of this file.
// Remember to _export_ them from their file, if you plan on _requiring_ them.

////------EXER 2 i copied instead of export --------------------------------------------------------------------------------------------------------------------------
const opencage = require('opencage-api-client'); //


function getAddressPosition(address) {
    const requestObj = {
        key: '',
        q: address
    };

    return opencage.geocode(requestObj)
        .then(data => { //data is what we got back from server 
            if (data.status.code == 200) {
                if (data.results.length > 0) {
                    const place = data.results[0];
                   // console.log(place.geometry);
                   let holder = place.geometry
                    return holder
                }
            } else {
                // other possible response codes:
                // https://opencagedata.com/api#codes
                console.log('error', data.status.message);
            }
        })
        .catch(error => console.log('error', error.message));
}

// console.log(getAddressPosition('1455 Boulevard de Maisonneuve O, Montréal, QC H3G 1M8')); //returns the log and lat 



////------EXER 3 i copied instead of export --------------------------------------------------------------------------------------------------------------------------
const request = require("request-promise");

function getCurrentTemperatureAtPosition(position) {
//this is what we will send to the serve and wait for a response
return request(`https://api.darksky.net/forecast/c12bf190570a63f4cbe4226ed3790e6f/${position.lat},${position.long}`)

.then (data => { //the data represents the receive data from the server but i could have called it anything 
    let returnedData = JSON.parse(data) //turn the data into an object
//console.log(data)
    return {
        currentTemp: returnedData.currently.temperature
    };
    
})
.then(data => console.log(data))

}

// getCurrentTemperatureAtPosition() //to get the temp
//------------------------------------------------------------------------------------------------------------------
// Given an address as a string, returns the temperature
// Use the getCurrentTemperatureAtPosition function
function getCurrentTemperature(address) {

    getAddressPosition(address)
    .then(holder => { //holder is holding the long and lat object 
       // console.log(holder) returns { lat: 45.497118, lng: -73.579044 } which we got frmo the get getAddressPosition
        getCurrentTemperatureAtPosition({ //now were passing it on this function and reassining 
            lat: holder.lat,
            long: holder.lng
        })
    })
    

}



getCurrentTemperature('1455 Boulevard de Maisonneuve O, Montréal, QC H3G 1M8');