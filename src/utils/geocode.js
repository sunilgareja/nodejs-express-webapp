const request = require('request');

const geocode =(address, callback)=>{

    const geoUrl='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=INSERT ACCESS TOKEN&limit=1';
    
    request({ url: geoUrl, json: true }, (err, res)=>{
        // const lat= res.body.features[0].center[1];
        // const long= res.body.features[0].center[0];
        if (err){
            callback('Unable to connect to connect to the mapbox service, please make sure you are connected to the internet and try again later.', undefined);
        } else if (res.body.features == undefined || res.body.features == null ||res.body.features.length === 0 ){
            callback('Unable to find the location. Please try another search.', undefined)
        } else {

            for(let i=0; i<res.body.features.length; i++){
                var latitude=res.body.features[i].center[1];
                var longditude=res.body.features[i].center[0];
                var location=res.body.features[i].place_name;

                callback(undefined, {
                    lat: latitude,
                    long: longditude,
                    location: location
                });
            }

        }
    });
}

module.exports=geocode;



// Make requests without request lib
// const https = require('https');
// const request= https.request(geoUrl, (response)=>{
//     let data='';
//     response.on('data', (chunk)=>{
//         data = data+chunk.toString();
//     });
//     response.on('end', ()=>{
//         const body= JSON.parse(data);
//         console.log(body);
//     });
// });
// request.end();


// Without callback
// const geoUrl='https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=INSERT ACCESS TOKEN&limit=1';

// request({ url: geoUrl, json: true }, (err, res)=>{
//     const lat= res.body.features[0].center[1];
//     const long= res.body.features[0].center[0];

//     if(err){
//         console.log('Unable to connect to connect to the mapbox service, please make sure you are connected to the internet and try again later.');
//     } else if (res.body.features.lenth === 0) {
//         console.log('Unable to find the location. Try another search.');
//     } else {   
//         console.log(lat, long);
//     }

// });