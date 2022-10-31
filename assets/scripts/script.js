
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
fetch('https://api.openweathermap.org/data/2.5/forecast?lat=40.7128&lon=74.0060&appid=1ce7c4dc7aa95ed0725c005dcae7644f') 
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.log(error));

