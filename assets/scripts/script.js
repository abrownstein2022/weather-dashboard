
// 1ce7c4dc7aa95ed0725c005dcae7644f

//40.7128° N, 74.0060° W
// https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}. 

//use another API to call the weather api - fetch is an api
//console.log is also an api.  document object is an api. can see this in official JS documentation.
//MDN web docs https://developer.mozilla.org/en-US/
//https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
//https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
//https://developer.mozilla.org/en-US/docs/Web/API/fetch#examples
//use this one: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
//fetch().then().then().catch()
//fetch is a method.  It accepts a url or an api endpoint and makes a request to that.
//when it makes a request, 
function test(){
}
test();  //takes much less time (less than 1ms) 
//built in functions are called methods - fetch is a method
//there's a chance there could be a delay when making the call to the API on another server
//that can take some time to come back. fetch runs this call in the background and we don't want to wait too long.
//even 3 seconds is too long.  returns a promise in the background. 2 conditions.  get data or do not get data. resolve or reject.
//catch automatically knows if the return is not ok.  Look at network tab in inspect in google dev tools.  status return code 200 means ok.  
//Anything other than 200 is NOT ok.  Fetch is not the only way to make the request. Could use XMLHTTPRequest and axios.
//JSON() is a method that the web understands and converts data to a readable, understandable format, which is JSON format
//we don't need to export this to a json file because the "then((data" line stores that data in its JSON format.  data is an object passed to the
//method so we can process it.
//Installed extension Live Server in VS code so we do not have to refresh the browser after making changes in vs code 
//To check if the code works,"open with live server" and then do inspect in dev tools and go to console tab.  This still didn't allow us to bypass.
//Moesif Origin & CORS Changer  www.moesif.com.  Chrome extension installed.  Allows us to make cross domain request.
//only use curly braces in lat, lon and appid below if it's a variable
//favicon is the icon that's in the browser tab 
//when look at weather data returned, 8 rows for each dates (look at dev tools - console and expand second row arrow)
//live share extension is a tool that allows another person to collaborate on your project at the same time
//fetch is a method (built-in function) in JS.  Fetch is also an API. see line 7.  API stands for application programming interface.
//making a request using lat and long in this api call using fetch
//api endpoint https is called the api endpoint
//open weather map is a server that has multiple api endspoint.  The line below for the weather is just one of them.
//.then is a method that runs a callback function inside of it
//asdfasfd.addEventListener("click",startButton) - example of callback function, which here is startButton
//making request to endpoint then making callback function to do next
//fetch returns a promise, handle promise in then
//promise has 3 states: fulfilled (got data), rejected (error like 404), pending (still not filfilled or rejected) 
//fetch lat and log from a different openweather map website to pass to the weather api
//if the return status in networks tab in dev tools is ok, it's 200 or 204 etc.  If not ok, catch takes over which 
//might be a 404 or 500.
//what is response below? it's a parameter - we can name it anything
//"(response) => response.json()" is a callback function run by .then 
//response holds non-readable data (only done when ok). then next line below starting with "let data" puts data
//in json file and it's readable
//first .then resolves the first promise which was returned from the fetch.
//second .then resolves the second promise that we got from applying the json method on the response. 
//each promise needs a .then
//if more promises, more .then
//drilling object 
//data below is the promise
//first we use the geocoding API to get the lat and long of the city entered, then we use the lat and lon values 
//to get the weather forecast with the forecast API
//below we have to use variables and return the variable but arrow function shorthand we don't have to do that
fetch(
  "http://api.openweathermap.org/geo/1.0/direct?q=London&limit=1&appid=1ce7c4dc7aa95ed0725c005dcae7644f"
)
  .then(function (response) {
    let data = response.json();
    //console.log(data);
    return data;
  })
  .then(function (returnData) {
    //console.log(returnData);
    // console.log(returnData.lon);
    let lat = returnData[0].lat;
   // console.log(lat);
    let lon = returnData[0].lon;
   // console.log(lon);

    // Promise states.......
    // when return executes, any statement below that doesn't execute....
    // console.log is only for debugging and checking the things, data etc.
    //this example uses arrow function while the one above in line 60 uses the older way.  I need to know both ways.
    //template literals allow vars, text and expressions in string and have back ticks vs simple strings that only use single or double quotes
    //use backticks around entire string that contains the variables, which makes it a template literal
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=1ce7c4dc7aa95ed0725c005dcae7644f`
    )  //0: weather: Array(1) 0:{id: 801, main: 'Clouds', description: 'few clouds', icon: '02d'}
    //02d = day 02n = night
      .then((response) => {
        return response.json();
      })
      .then((returnData) => {
        //[0] is the first array under list - first weather data for city entered
        console.log(returnData);
        let desc = returnData[0].weather[0].description;
        let id = returnData[0].weather[0].id;
        let icon = returnData[0].weather[0].icon;
        let main = returnData[0].weather[0].main;
        let iconimage = icon + '.png';
        console.log(iconimage);
      })
      .catch(err => {
        //console.log(err);  throws problem in inspect
      });
  })
  .catch(function(err) {
    console.log(err);
    return err;
  });
//if multiple statements or using {}, must use return
// fetch('https://api.openweathermap.org/data/2.5/forecast?lat=40.7128&lon=74.0060&appid=1ce7c4dc7aa95ed0725c005dcae7644f') 
//   .then((response) =>{
//    return response.json()
//   } )
//   .then((data) => console.log(data))
//   .catch((error) => console.log(error));

// why they should be in sequence?

