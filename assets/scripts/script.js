// https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}. 
//use another API to call the weather api - fetch is an api
//console.log is also an api.  document object is an api. can see this in official JS documentation.
//MDN web docs https://developer.mozilla.org/en-US/
//https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
//https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
//https://developer.mozilla.org/en-US/docs/Web/API/fetch#examples
//use this one: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
//fetch().then().then().catch()
//built in functions are called methods. fetch is a method.  It accepts a url or an api endpoint and makes a request to that.
//when it makes a request, 
// function test(){
// }
// test();  //takes much less time (less than 1ms) 
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
//if Origin & CORS Changer  www.moesif.com.  Chrome extension installed.  Allows us to make cross domain request.
//only use curly braces in lat, lon and appid below if it's a variable
//favicon is the icon that's in the browser tab 
//when look at weather data returned, 8 rows for each dates (look at dev tools - console and expand second row arrow)
//live share extension is a tool that allows another person to collaborate on your project at the same time
//fetch is a method (built-in function) in JS.  Fetch is also an API. .  API stands for application programming interface.
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

let cityName = document.querySelector("#city-name");
let currDay = document.querySelector("#thedate");
let weatherImg = document.querySelector("#weather-img");  //use this var to assign url each time
let currTemp = document.querySelector("#temp");
let currWind = document.querySelector("#wind");
let currHumidity = document.querySelector("#humidity");

let showRightSide = document.querySelector(".outer-div-right");
//if pastCitySearches array does not exist in Local Storage, initialize it as a new empty array.  If it already exists in local storage, get those values
//If we don't do it this way, we will only be storing values for one run of the application.  Once we refresh, it will overwrite the previous local storage saves.
let cityArray = JSON.parse(localStorage.getItem("pastCitySearches")) || []; //OR
let searchcity = document.getElementById("search-input"); //gets city object
//let searchform = document.getElementById("search");  //gets form
// let prevSearchForm = document.getElementById("prev-searches"); //dynamically created buttons from local storage for prev city searches
// searchform.addEventListener("submit",getSearchCityValue);  //submit is an event that we need to capture
let searchBtn = document.getElementById("search-btn"); //dynamically created buttons from local storage for prev city searches
searchBtn.addEventListener("click", function(){
  if (document.getElementById("search-input").value != "") {
    handleSearch(searchcity.value);
  } else {
    alert("Please enter a city value in the textbox.");
   }  
}); 

const apiKey = "1ce7c4dc7aa95ed0725c005dcae7644f";  //for weather api calls
//https://www.3schools.in/2021/11/how-to-create-button-in-javascript.html
//https://stackoverflow.com/questions/45056949/adding-button-to-specific-div
//e is submit event which is going to contain all properites of the event (originally passed e below from Click event but changed code to pass city)
function handleSearch(city){  
//prevents default functionality of form to submit the data to the server so city entered will stay 
  // e.preventDefault();  //stops default behavior so we can capture the value
   //console.log(city);
 fetch(
  `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
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
  //this function needs to be above the function below to be called by it
  //this will split up the array into a smaller chunk that we want to work with
   function chunk (arr, len) {
    var chunks = [],
        i = 0,
        n = arr.length;
    while (i < n) {
      chunks.push(arr.slice(i, i += len));
    }
    return chunks;
  }
  /** started to repeat this behavior, so move to external function for easy repetition */
  const formatDate = (str) => str.slice(5,7) + '/' + str.slice(8,10) + '/' + str.slice(0,4);
    // Promise states.......
    // when return executes, any statement below that doesn't execute....
    // console.log is only for debugging and checking the things, data etc.
    //this example uses arrow function while the one above in line 60 uses the older way.  I need to know both ways.
    //template literals allow vars, text and expressions in string and have back ticks vs simple strings that only use single or double quotes
    //use backticks around entire string that contains the variables, which makes it a template literal
    //to get weather units in Farenheit, need to add parm for units=imperial
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
    )  //0: weather: Array(1) 0:{id: 801, main: 'Clouds', description: 'few clouds', icon: '02d'}
    //02d = day 02n = night
      .then((response) => {  //this is another way to do what we did above 
        return response.json();
      })
      .then((returnData) => {
        //[0] is the first array under list - first weather data for city entered
        //this return a promise so if anything is wrong in this then, the rest is skipped and goes to catch
       console.log(returnData);
        let desc = returnData.list[0].weather[0].description;
        let icon = returnData.list[0].weather[0].icon;
        let theday = formatDate(returnData.list[0].dt_txt);
        //slice starts at 0 like an array and is strange in that the second parm has the ending index that excluded
       
        let city = returnData.city.name;
        let temp = returnData.list[0].main.temp;
        let wind = returnData.list[0].wind.speed;
        let humidity = returnData.list[0].main.humidity;
        //can console.log multiple variables as seen below
      //  console.log({theday, desc, icon, city, temp, wind,humidity});
        weatherImg.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
        //use backticks to make template literal so spcace will not be ignored
        //use innerHTML instead of textContent so interpreted correctly not as text
        currDay.innerHTML = `&nbsp;(` + theday + `)`;
        cityName.textContent = city;
        currTemp.textContent = temp + ' °F';
        currWind.textContent = wind + ' MPH';
        currHumidity.textContent = humidity + ' %';
        //now we need to split the array above to only show the data for days after the first day
        //since the current day has already started and may not have as many array elements as future
        //days that show 5 timeblocks per day in the returnData
        //item below is the nth item of the list array from the returned data object
        //can work with item, index and array we're looking at
        //callbackfunction is everything in parens after filter
        //array.filter(callback)
        //callback is (currentItem, currentIndex, originalArray)=>{}   
        //task for alexis: turn into named function
        //array.filter((currentItem, currentIndex, originalArray)=>{})   
        //filter loops through item in array and returns array with items that passed the test we provided
        //item before the arrow is the first variable so no parens needed
        //so we will get array of all dates not equal to today
        // array.filter(item => comparison)
        // array.filter((item) => { return comparison })
        // array.filter(myFunc)
        // array.filter(item => item !== other) return all items that do not equal other
        // filter is a higher order method that is only available to arrays, so it forEach
        const todaysDate = returnData.list[0].dt_txt
        const daysAfterToday = returnData.list.filter(item => item.dt_txt !== todaysDate)
        // chunk takes an array and chunk length, and returns an array OF arrays
        // There are 8 timeframes in each day
        let daysArray = chunk(daysAfterToday, 8)
        //console.log({daysArray})
        /* 
        daysArray = [
          [morning, noon, ...],
          [timeframe1, timeframe2, ...],
          [timeframe1, timeframe2, ...],
          [timeframe1, timeframe2, ...],
          [timeframe1, timeframe2, ...],
        ]
        */
        // forEach is higher order function which also runs simple for loop like a regular loop under the hood
        // forEach takes in each element and applies some functionality
        daysArray.forEach((day, idx) => {
          const today = day[2]
          //console.log({today, idx})
          // let humidEl = document.querySelector(`humidity${idx}`)
          // humidEl.innerHTML = day.main.humidity;
          document.querySelector(`#weather-img${idx}`).src = `https://openweathermap.org/img/wn/${today.weather[0].icon}@2x.png`;
          document.querySelector(`#thedate${idx}`).innerHTML = formatDate(today.dt_txt);
          document.querySelector(`#temp${idx}`).innerHTML = today.main.temp + ' °F';
          document.querySelector(`#wind${idx}`).innerHTML = today.wind.speed + ' MPH';
          document.querySelector(`#humidity${idx}`).innerHTML = today.main.humidity + ' %';

        })
        //we're still inside the then block - only save city in local storage if data returned from API
        //and not already in LS as in validation below
        saveCityData(city); //puts in local storage              
        showRightSide.classList.remove("hide");   //now show the right section, which is hidden when page opens  

        //clear parent element
        createCityButtons();

      })
      .catch(err => {
        //need to use try..catch to catch the error and handle it before it bombs. Stops JS execution.
        console.log(err);  //throws problem in inspect
      });
  })
  .catch(function(err) {
    //console.log(err);
    return err;
  });
}  //end of function  handleSearch()  
//if multiple statements or using {}, must use return
// fetch('https://api.openweathermap.org/data/2.5/forecast?lat=40.7128&lon=74.0060&appid=1ce7c4dc7aa95ed0725c005dcae7644f') 
//   .then((response) =>{
//    return response.json()
//   } )
//   .then((data) => console.log(data))
//   .catch((error) => console.log(error));
//read city data from local storage
function createCityButtons(){ 
 // location.reload();  //reload every time we start ***HOW TO DO THIS SO USER SEES CITY BUTTON RIGH AFTER PRESSING SEARCH BUTTON
  let data = JSON.parse(localStorage.getItem('pastCitySearches'));
  //we only have at most 8 values in LS but could be fewer so need to go to array length
  //data is an array returned from JSON.parse (utility returns objs into arrays)
  //JSON is not great at parsing.  If it finds any issues at all, it will bomb.
  if(data) {   //11/29/22 use boolean here so only go into code if at least one value in array
  //identifies the selector  
  var btnDivEl = document.getElementById('prev-searches');  
  //12/14/22 clear out the parent content so we can add all the history buttons from scratch
  //added this line below and moved the line above from below so the city search buttons would be displayed
  //after the user enters their city search in the input box, not when they refresh.  Timing/scope issue.
  btnDivEl.textContent = ""; 
  for (let i = 0; i < data.length; i++) {
    var btn = document.createElement("button");
    // btn.type = "submit";  //same as submit button for new city
    btn.id = "city-btn" + i;
    btn.className = "city-btn";
    btn.innerText = data[i];  //loop and read local storage with city history
    // btn.innerText = cityVar;
    //btn.onclick = handleSearch;  //fix this and called function to work for city search and city buttons****
    // Attach the "click" event to your button
    // The target is the actual element that was clicked, and is referenced by the event
    btn.addEventListener('click', function(e){ handleSearch(e.target.innerText) });
  
    btnDivEl.appendChild(btn);
  }
 }
  /** Javascript is weird
   * Tyepcasting (type coersion) can cause undesired behavior
   * 
   * '2' + 2 = '22'
   *  2 + '2' = 4
   *  'b' + 'a' + unnamed + 'a' = 'baNaNa' 
   *  typeof NaN == 'number'
   * 
   * Always use template strings, they are better at handling string concat
   *  `string${var}`
   */
  /** Example of simple method to create elements with string literals
  * find the parent container - where you want to put the elements
  * create an empty string to concat other literal elements to
  * let str = ``
  * data.forEach(cityName => str += `<button onClick='handleSearch'>${cityName.substring(0,100)}</button>`)
  * container.innerHTML = str
  */
}
;
//array.includes - check if array has a particular value
  function saveCityData(city){
    //first check if this city already exists in LS
    //the extra = below checks for the data type - strict inequality operator
    // for (let i = 0; i <= cityArray.length; i++) {
    //   if(cityArray[i] === city) {
    //   }else{
    //     cityArray.push(city);  //push this new value to cityArray
    //     localStorage.setItem("pastCitySearches", JSON.stringify(cityArray));  
    //   }
    // }
    //if current city does not include current entered city, will be saved
    if(!cityArray.includes(city)){
      cityArray.unshift(city);  //unshift will save this new values at the beginning of the array
      //use slice below so will only leave 8 most recent saves in this area since
      //we only want to display at most 8 past city searches
      localStorage.setItem("pastCitySearches", JSON.stringify(cityArray.slice(0,8))); 
    }
  }

 function init(){
  //e.preventDefault();
  createCityButtons();  //from local storage
 }

  init();