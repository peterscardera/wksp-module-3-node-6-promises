// Exercise 5 - `getDistanceFromIss`
// ---------------------------------
// Again here you should re-use two previously created functions, plus the `getDistance` function provided to you in `workshop.js`.
//
// One of the functions does address ==> position and the other simply does nothing ==> position.
// The `getDistance` function needs the two positions to compute the final value.


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



////------EXER 1 i copied instead of export --------------------------------------------------------------------------------------------------------------------------
const request = require("request-promise");
// Returns the current position of the ISS
function getIssPosition() {

return request("http://api.open-notify.org/iss-now.json")

.then (info => { //info is the data but in a string with quotes and we dont really want a string

    let answer = JSON.parse(info) //we assign it to a variable. In this case, i called it"answer" and pase it to a n object. Which is the opposite of JSON.stringify(). console.log(info)//{"iss_position": {"latitude": "-25.1486", "longitude": "173.7050"}, "timestamp": 1582603511, "message": "success"}

        return {
            lat:answer.iss_position.latitude,
            lng:answer.iss_position.longitude
        };

})
//.then(data => console.log(data))

}
//getIssPosition()



// Euclidian distance between two points
function getDistance(pos1, pos2) {
    return Math.sqrt(Math.pow(pos1.lat - pos2.lat, 2) + Math.pow(pos1.lng - pos2.lng, 2));
}

// Given an address (a string), returns the distance between that address and the ISS
// You'll need to use getDistance, getIssPosition and getAddressPosition
function getDistanceFromIss(address) {


     let promise1 = getAddressPosition(address)

     //the below is to see the location logged
    // .then(locationM => {
    //     console.log(locationM)
    // })

     let promise2 = getIssPosition()

     //the below is to see the location logged
    //  .then(location =>{
    //     console.log(location)
    // })



   return Promise.all([promise1,promise2])
    
    //right after the Promise.all([promise1,promise2]) 
    /*
    .then(locations => {
        console.log(locations)
    })
    */

    /*
        we would get :
        [
    { lat: 45.497118, lng: -73.579044 },
    { lat: '-15.4462', long: '98.4343' } // CHANGED IT TO lng!!
    ]
    */

    .then(holder => {
        return getDistance(
            holder[0],
            holder[1]
        )
    })




}



getDistanceFromIss('1455 Boulevard de Maisonneuve O, Montréal, QC H3G 1M8')

.then(answer=>{
    console.log(answer)
})