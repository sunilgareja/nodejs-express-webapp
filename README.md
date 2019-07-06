# nodejs-express-webapp

To install: 
1. Make sure you have NodeJs installed on your computer.
2. Download as zip or clone this git repository to your device.
3. Once the file is downloaded, open with your code editor, and using the terminal run the following command: 
- `npm install` 

I am using the Mapbox API and DarkSky API to make weather forecast requests, simply sign up to the following:
- https://darksky.net/dev
- https://www.mapbox.com/

Once signed up, get the appropriate API keys/ URLS and insert them into the following files:
- > src > utils > geocode.js (mapbox API)
- > src > utils > weatherapi.js (darksky API)

I am using the Handlebars Js template to render content on the page, make sure you customize the content so it suits your requirements
- > templates

To make life easier you could go a global search for the keyword: 'Insert' to see where I have mentioned the above changes to be made

Finally to run the app redirect to the following directory:
- > src
and in the terminal type the following:
- `node app.js`

