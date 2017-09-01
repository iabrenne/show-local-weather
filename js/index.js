var latitude ;
var longitude;

var url = "https://fcc-weather-api.glitch.me/api/current";

var getWeather = function(my_coords) {
		$.getJSON(url, my_coords, function(data) {
				$("#weather-description").html(data.weather[0].description);
		});

};
var getPosSuccess = function(pos){

	latitude = pos.coords.latitude ;
	longitude = pos.coords.longitude ;
	var myCoords = { lon : longitude, lat : latitude };
	getWeather(myCoords);	
	
};

var getPosError = function(err){

	throw err;
	
};





var main = function(){

  
	navigator.geolocation.getCurrentPosition(getPosSuccess, getPosError);
		
};

$(document).ready(main);

