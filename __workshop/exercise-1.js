// Exercise 1 - `getIssPosition`
// -----------------------------
//   1. Install the request-promise module with `yarn`
//      making sure it's added to `package.json`.
//   2. Complete the code of this function so that it returns
//      the position of the ISS as a `Promise`.
//   3. Use the data from http://api.open-notify.org/iss-now.json to do your work
//   4. The ISS API returns the position keys as `latitude` and `longitude`.
//      Return them as `lat` and `lng` instead.

// require the 'request-promise' module.
const request = require("request-promise");
// Returns the current position of the ISS
function getIssPosition() {

return request("http://api.open-notify.org/iss-now.json") //a promise

.then (info => { //info is the data but in a string with quotes and we dont really want a string

    let answer = JSON.parse(info) //we assign it to a variable. In this case, i called it"answer" and pase it to a n object. Which is the opposite of JSON.stringify(). console.log(info)//{"iss_position": {"latitude": "-25.1486", "longitude": "173.7050"}, "timestamp": 1582603511, "message": "success"}

        return {
            lat:answer.iss_position.latitude,
            long:answer.iss_position.longitude
        };

})
.then(data => console.log(data))

}
getIssPosition()

// psst.... don't forget to call the function




// NOTE:
// in order to see the result of the promise, you need to console.log
// the data WITHIN the promise chain (in its own then)

// You are 'returning' the value, beacause you will need this functionality
// in another exercise.

// If you console.log the the function call, you will not see the result as console.log
// doesn't wait for the promise to be resolved to execute.

// psst.... don't forget to call the function
