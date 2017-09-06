var latitude ;
var longitude;
var scaleSymb = "&#8451;";

var url1 = "https://fcc-weather-api.glitch.me/api/current";
var url2 = "https://maps.googleapis.com/maps/api/geocode/json?&key=AIzaSyADrt9E0uLxQRM_L_VxPQ_UbeAgAmDjMI0";

var toggleScale = function(){

	if ( scaleSymb == "&#8451;" ){
		scaleSymb ="&#8457";
		$("#scale-div").html(scaleSymb);
	}
  else {
		scaleSymb ="&#8451;";
		$("#scale-div").html(scaleSymb);
	}
};

$("#scale-a").on("click",toggleScale);


var getWeather = function(my_coords) {
		$.getJSON(url1, my_coords, function(data) {
        $("#temp").html(data.main.temp);
        $("#scale-div").html(scaleSymb);
				$("#weather-description").html(data.weather[0].description);
        $("#weather-icon").attr("src", data.weather[0].icon);   
		});

};


var getLocation = function(myLat, myLng){
		var queryString = {latlng : myLat + "," + myLng, result_type : "locality" };
		$.getJSON(url2, queryString, function (data){
			$("#location").html(data.results[0].formatted_address);
		});
};


var getPosSuccess = function(pos){

	latitude = pos.coords.latitude ;
	longitude = pos.coords.longitude ;
  console.log(latitude, longitude );
	var myCoords = { lon : longitude, lat : latitude };

  getLocation(latitude, longitude);
	getWeather(myCoords);	
	
};

var getPosError = function(err){

	throw err;
	
};





var main = function(){

  navigator.geolocation.getCurrentPosition(getPosSuccess, getPosError);
		
};

$(document).ready(main);

