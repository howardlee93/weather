//js 


$(document).ready(function(){

const $key =  ########//api key
const $metric = '&units=metric';
const $imperial = '&units=imperial';
var $img = $('<img src="img/weather.png"></img>');
var fTemp = $('#fTemp');
var cTemp = $('#cTemp');
let convertTemp;


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
	displayWeather($city);
	$("#display").after('<br>',"<button id ='convert'>Convert!</button>");

});


$("#get-weather").keypress(function (e) {
    if (e.which === 13)
    var $city = $('#city').val();
	$("#display-city").text($city);
	displayWeather($city);
	//$("#display").after('<br>',"<button id ='convert'>Convert!</button>");
});

$("#convert").click(function(){
	var toggled = !toggleC;
	if (toggled){
		$convertTemp = Math.round((temp -32)*(5/9));
		$("#display").html($convertTemp + " degrees celsius" +'<br>' +  "Condition: " + weather_description);
	}else {
		$("#display").html($convertTemp + " degrees fahrenheit" +'<br>' +  "Condition: " + weather_description);
	}
});

function displayWeather(city){
	$.getJSON(
		"http://api.openweathermap.org/data/2.5/weather?q=" 
		+ city 
		+ $imperial 
		+ "&appid=" 
		+$key, function(data){
			var weather_description = data["weather"][0]["description"];
			var temp = data["main"]["temp"];
			let $convertTemp = temp; 
			var $icon = "<img id ='icon' style = 'height: 10%; width: 10%;'src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png'</img>" 
			$("#display").before($icon);

			$("#display").html($convertTemp + " degrees fahrenheit" +'<br>' +  "Condition: " + weather_description);
			$("#display").show()
	});
	};

})
