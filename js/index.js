var latitude ;
var longitude;
var scaleSymb = "&#8451;";

var url1 = "https://fcc-weather-api.glitch.me/api/current";
var url2 = "https://maps.googleapis.com/maps/api/geocode/json?&key=AIzaSyADrt9E0uLxQRM_L_VxPQ_UbeAgAmDjMI0";

var toggleScale = function(){
  /* Celsius to Fahrenheight */
	if ( scaleSymb == "&#8451;" ){
		scaleSymb ="&#8457";
		var tempF = $("#temp").html() * 1.8 + 32 ;
 		$("#temp").html(tempF.toFixed(2));
		$("#scale-div").html(scaleSymb);
	}
  /* Fahrenheight to Celsius */
  else {
		scaleSymb ="&#8451;";
    var tempC = ( $("#temp").html() - 32) / 1.8 ;
    $("#temp").html(tempC.toFixed(2));
		$("#scale-div").html(scaleSymb);
	}
};




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
	var myCoords = { lon : longitude, lat : latitude };

  getLocation(latitude, longitude);
	getWeather(myCoords);	
	
};

var getPosError = function(err){

	throw err;
	
};





var main = function(){
  $("#scale-div").click(toggleScale);
  navigator.geolocation.getCurrentPosition(getPosSuccess, getPosError);
		
};

$(document).ready(main);

