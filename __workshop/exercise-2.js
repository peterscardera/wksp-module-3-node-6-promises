// Exercise 2 - `getAddressPosition`
// ---------------------------------
// 1. Complete the code of this function to return a `Promise` for a lat/lng object
// 2. Use the [OpenCage Data API](https://opencagedata.com/) to do this
//     - Sign up for an account (free) and follow the various guides to get started.
//     - [NodeJs tutorial](https://opencagedata.com/tutorials/geocode-in-nodejs)
//     - missing from the above is the need for the `key` in the request object.
//     - disregard the `.env` guidelines for now.
// 3. Once you have it working, pass it a few address to see what the responses look like.
// 4. Make sure to only return an object with lat/lng and not the whole response

const opencage = require('opencage-api-client'); //


function getAddressPosition(address) {
    const requestObj = {
        key: '-', // removed my api for security but it worked. We get this key by registering (depends)
        q: address
    };

    return opencage.geocode(requestObj) //long and lat gets back here 
        .then(data => { //data is what we got back from server 
            if (data.status.code == 200) { // > 0 meaning the array has smt in it
                    const place = data.results[0];
                   // console.log(place.geometry);
                   let holder = place.geometry
                    return holder //so holder goes to the other return on the top
                
            } else {
                // other possible response codes:
                // https://opencagedata.com/api#codes
                console.log('error', data.status.message);
            }
        })
        .catch(error => console.log('error', error.message));
}

getAddressPosition('1455 Boulevard de Maisonneuve O, Montréal, QC H3G 1M8').then(holder => {
    console.log(holder)
})



//getAddressPosition returns as PROMISE holding the lat and long !!


