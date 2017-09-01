$.getJSON("https://fcc-weather-api.glitch.me/api/current?lat=43.1242711&lon=87.9105899",function(data){
	$("#clouds").html(data.weather[0].description);

	
});
