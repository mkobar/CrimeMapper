// crime.js - for hack hartford crime watcher project
// using data.hartford.gov open data API and leaflet.js to create quick copy of
// http://crime.chicagotribune.com/community/englewood
// for hartford
// 

jQuery(document).ready(function(){
	get_gtag();
	
function get_gtag()
{
	var homicide = 0;  // UCR 01
	var sexassault = 0; // UCR 02
	var robbery = 0;  // UCR 03
	var assault = 0;  // UCR 04
	var burglary = 0;  // UCR 05
	var theft = 0;  // UCR 06
	var mvtheft = 0;  // UCR 07
var myIcon = L.divIcon({
      className: 'my-div--icon',
      iconSize: [8, 8]
    });

//var marker = L.marker([50,-20], {icon: myIcon}).addTo(map);
//    marker.valueOf()._icon.style.backgroundColor = 'green'; //or any color
	
   $.ajax({
      //url: 'https://data.hartford.gov/resource/889t-nwfu.json?$limit=50&$offset=10',
      //url: 'https://data.hartford.gov/resource/889t-nwfu.json?$order=date DESC&$limit=30',
      url: 'https://data.hartford.gov/resource/889t-nwfu.json?$order=date DESC',
      dataType: 'json',
      success: function(json) {
	     // alert('json: ' + json);
$.each(json, function(index, element) {
	// show only 01 to 07 UCR code
	if ( element.ucr_1_category[0] == "0" && parseInt(element.ucr_1_category[1]) < 8
		&& element.date > 1414773296) {
		/**
    alert('neighborhood: ' + ( element.neighborhood || 'ERROR' ) + '<br>'
	  + 'lat is: ' + element.geom.latitude + '<br>'
	  + 'lon is: ' + element.geom.longitude + '<br>'
	  + 'date: ' + element.date + '<br>'
	  + 'ucr1: ' +  element.ucr_1_category );
	  **/
       var marker = L.marker([element.geom.latitude, element.geom.longitude],
	   {title: element.ucr_1_category,
	   icon: myIcon} ).addTo(map);
       // now violent crime in red - property crime in blue
       if (parseInt(element.ucr_1_category[1]) == 1 ||  // homicide
	   parseInt(element.ucr_1_category[1]) == 2 ||  // sexassault
	   parseInt(element.ucr_1_category[1]) == 3 ||  // robbery
	   parseInt(element.ucr_1_category[1]) == 4) {  // assault
           marker.valueOf()._icon.style.backgroundColor = 'red'; //or any color
       }
       else {
           marker.valueOf()._icon.style.backgroundColor = 'blue'; //or any color
       }

       // sum up catigories
       if (parseInt(element.ucr_1_category[1]) == 1) { 
	 homicide++;
       }
       if (parseInt(element.ucr_1_category[1]) == 2) { 
	 sexassault++;
       }
       if (parseInt(element.ucr_1_category[1]) == 3) { 
         //alert("robbery: "+robbery);
	 robbery++;
       }
       if (parseInt(element.ucr_1_category[1]) == 4) { 
         //alert("assualt: "+assualt);
	 assault++;
       }
       if (parseInt(element.ucr_1_category[1]) == 5) { 
	 burglary++;
       }
       if (parseInt(element.ucr_1_category[1]) == 6) { 
         //alert("theft: "+theft);
	 theft++;
       }
       if (parseInt(element.ucr_1_category[1]) == 6) { 
	 mvtheft++;
       }
    }
});
    current_results = json.results;
    var vtotal = homicide+sexassault+assault+robbery;
    $('#total-vcrimes').html("<span style=\"color:red\"><b2>Total Violent Crimes: " + vtotal+"</style></b2>");
    $('#homicide').html("Homicide: " +homicide);
    $('#sexassault').html("Sexual Assault: " +sexassault);
    $('#robbery').html("Robbery: " +robbery);
    $('#assault').html("Assault: " +assault);
    var ptotal=burglary+theft+mvtheft;
    $('#total-pcrimes').html("<span style=\"color:blue\"><b2>Total Property Crimes: " + ptotal+"</style></b2>");
    $('#burglary').html("Burglary: " +burglary);
    $('#theft').html("Theft: " +theft);
    $('#mvtheft').html("Motor Vehicle Theft: " +mvtheft);

}, error: function( xhr, status, errorThrown ) {
alert( "Sorry, there was a problem!" );
console.log( "Error: " + errorThrown );
console.log( "Status: " + status );
console.dir( xhr );
}
});
	//location.href = "#mapview";
	return true;
}


document.addEventListener("deviceready", function(){
	
	if(navigator.network.connection.type == Connection.NONE){
		$("#home_network_button").text('No Internet Access')
								 .attr("data-icon", "delete")
								 .button('refresh');
	}
	//setTimeout(function() {location.href = "#vote";},1250);
	get_gtag();
	location.href = "#mapview";

});

// from trailer only - from vote page
$("#map-vote").on('click', function(){
	rest_status = get_gtag();
	location.href = "#mapview";
});

});
