const request = require('request');

const weatherapi=(lat, long, callback )=>{
    const weatherUrl ='https://api.darksky.net/forecast/INSERT KEY/'+lat+','+long+'?units=si';

    request({ url: weatherUrl, json: true }, (err, res)=>{
        
        const currently=res.body.currently;
        const daily=res.body.daily;

        if(err){
            callback('Unable to connect to the darksky weather service, please make sure you have an internet connection and try again later.', undefined);
        } else if (res.body.error) {
            callback(res.body.error, undefined);
        } else {   
            callback(undefined, daily.data[0].summary+' It is currently '+currently.temperature+' degrees outside. There is a '+currently.precipProbability+'% chance of rain.')
        }
    });
}

module.exports=weatherapi



// Tradtional way (without callback)

// const weatherUrl ='https://api.darksky.net/forecast/INSERT KEY/37.8267,-122.4233?units=si';

// request({ url: weatherUrl, json: true }, (err, res)=>{
//     // IF YOU DO NOT PUT THE json ARG ABOVE
//     // const currently=JSON.parse(res.body.currently);

//     const currently=res.body.currently;
//     const daily=res.body.daily;

//     if(err){
//         console.log('Unable to connect to the darksky weather service, please make sure you have an internet connection and try again later.');
//     } else if (res.body.error) {
//         console.log(res.body.error);
//     } else {   
//         console.log(daily.data[0].summary+' It is currently '+currently.temperature+' degrees outside. There is a '+currently.precipProbability+'% chance of rain.')
//     }
// });
