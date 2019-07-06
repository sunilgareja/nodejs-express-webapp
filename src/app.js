const path=require('path');
const express = require('express');
var LocalStorage = require('node-localstorage').LocalStorage;
const hbs = require('hbs');
const geocode=require('./utils/geocode');
const forecastapi=require('./utils/weatherapi');
// const postscribe=require('postscribe');

localStorage = new LocalStorage('./scratch');

const app=express();
const port = process.env.PORT || 3000;

// define paths for express configs
const direcoryName=path.join(__dirname, '../public');
const viewsPath= path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(direcoryName));

app.get('/', (req, res)=>{
    localStorage.setItem('title', 'Home Page');
    res.render('index', {
        title: localStorage.getItem('title'),

    });
});

app.get('/projects', (req, res)=>{
    localStorage.setItem('title', 'Projects Page');
    res.render('projects', {
        title: localStorage.getItem('title'),

    });
});

app.get('/projects/weather-app', (req, res)=>{
    localStorage.setItem('title', 'Weather App');
    res.render('weather-app', {
        title: localStorage.getItem('title'),

    });
});

app.get('/about', (req, res)=>{
    localStorage.setItem('title', 'About Page');
    res.render('about', {
        title: localStorage.getItem('title'),

    });
});

app.get('/help', (req, res)=>{
    localStorage.setItem('title', 'Help Page');
    res.render('help', {
        title: localStorage.getItem('title'),
        message: "This is the help page.",

    });
});

// API request to Darksky weather and Mapbox API
app.get('/weather', (req, res) =>{

    const searchLocation=req.query.address;

    if(!searchLocation){
        return res.send({
            error: 'You must provide an address'
        });

    } else {
        geocode(searchLocation, (err, data)=>{
            if(err) { 
                return res.send({
                    error: err
                });
            }

            forecastapi(data.lat, data.long, (err, forecastData)=>{
                if(err){
                    return res.send({
                        error: err
                    });
                }
                
                res.send({
                    address:searchLocation,
                    location: data.location,
                    forecast: forecastData,
                    lat: data.lat,
                    long: data.long
                });
            });

        });

    }

});



app.get('/projects/*', (req, res)=>{
    localStorage.setItem('title', 'Project Not Found');
    res.render('404', {
        title: localStorage.getItem('title'),
        message: "Oops! Project not found, it was either removed or does not exist yet."
    });

});

app.get('*', (req, res)=>{
    localStorage.setItem('title', 'Page Not Found!');
    res.render('404', {
        title: localStorage.getItem('title'),
        message: "Oops, page not found."
    });
});


app.listen(port, ()=>{
    console.log('litening on port '+port);
});