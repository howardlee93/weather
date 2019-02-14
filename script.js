//script.js 


$(document).ready(function(){

const $key = ###### // api key
const $metric = '&units=metric';
const $imperial = '&units=imperial';
var toggled = 'f';

//date    	
var date = new Date();
    var currentMonth = ["January" , "February", "March", "April", "May", "June", "July", "August", "September", "October",
    "November", "December"][(new Date()).getMonth()];
    var weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][(new Date()).getDay()]
    var day = date.getDate();
    var year = new Date().getFullYear();
    $("#date").text(weekday + ", " + day + " " + currentMonth + ", " + year); 

//event listener 
$("#get-weather").click(function (){
	var $city = $('#city').val();
	$("#display-city").text($city);
	getWeather($city);
	$("#convert").show();
});

	$("#display").after("<button id ='convert' style ='display:none;'>Convert temperature</button>");



function getWeather(city){
	$.getJSON(
		"http://api.openweathermap.org/data/2.5/weather?q=" 
		+ city 
		+ $imperial 
		+ "&appid=" 
		+$key, function(data){
			var weather_description = data["weather"][0]["description"];
			var temp = data["main"]["temp"];
			let $convertTemp = temp; 
			var $icon = "<img id ='icon' src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png'</img>";
			displayWeather($convertTemp, weather_description, $icon);
	});
	};

	function displayWeather(temperature, weather_description, icon){
			$("#display").html(temperature + " degrees fahrenheit" +'<br>' +  "Condition: " + weather_description);
			$("#display").show();
			$("#display").before(icon);
			$("#convert").click(function(){
			if (toggled == 'f'){
				$convertTemp = Math.round((temperature -32)*(5/9));
				$("#display").html($convertTemp + " degrees celsius" +'<br>' +  "Condition: " + weather_description);
				toggled = 'c'
			}else {
				$("#display").html(temperature + " degrees fahrenheit" +'<br>' +  "Condition: " + weather_description);
				toggled = 'f';
			}
			});
		};
})
