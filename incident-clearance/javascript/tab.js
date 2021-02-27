"use strict";

var model = {"incident": null,"blockage": null,"collision":null, "detail_blockage_1":null,"detail_blockage_2":null,"detail_blockage_3":null,
 "number_travel":null,"number_shoulder":null, "involved_veh": null, "responder": null, "responder_number": null, "center_choice": null,
 "pavement_condition":null, "hazmat_condition":null, "season_time": null, "hour_time": null, "weekend_time":null, "holiday_time":null, "location":null, "direction":null,
 "exit":null};
//first label initialization
var newLine_1 = document.createElementNS('http://www.w3.org/2000/svg','line');
var txtElem_1 = document.createElementNS('http://www.w3.org/2000/svg','text');
var txtElem2_1 = document.createElementNS('http://www.w3.org/2000/svg','text');
var inside_txt_1;
var percent_txt_1;
//second label initialization
var newLine_2 = document.createElementNS('http://www.w3.org/2000/svg','line');
var txtElem_2 = document.createElementNS('http://www.w3.org/2000/svg','text');
var txtElem2_2 = document.createElementNS('http://www.w3.org/2000/svg','text');
var inside_txt_2;
var percent_txt_2;
//third label initialization
var newLine_3 = document.createElementNS('http://www.w3.org/2000/svg','line');
var txtElem_3 = document.createElementNS('http://www.w3.org/2000/svg','text');
var txtElem2_3 = document.createElementNS('http://www.w3.org/2000/svg','text');
var inside_txt_3;
var percent_txt_3;
//average time line initialization
var txtElem3 = document.createElementNS('http://www.w3.org/2000/svg','text');
var last_line;

//global variables will be used in other functions
var travel_drop;
var shoulder_drop;
var total_lane;

var aux_lane;
var tunnel_lane;
var toll_lane;

var involved_car_s;
var involved_truck_s;
var involved_bus_s;
var involved_pickup_s;
var involved_van_s; //Van only shows for 495
var involved_suv_s; //SUV only shows for 70
var involved_car;
var involved_truck;
var involved_bus;
var involved_pickup;
var involved_van;
var involved_suv;
var involved_pedestrian;
var involved_cyclist;
var involved_motor;
var involved_total;	
var num_car;
var num_truck;
var num_bus;
var num_pickup;
var num_van;
var num_suv;
var num_pedestrian;
var num_cyclist;
var num_motor;
var num_total;	

var first_responder;
var chart_value;
var police_value;
var tow_value;
var fireboard_value;
var medical_value;
var others_value;
var num_chart;
var num_police;
var num_tow;
var num_fireboard;
var num_medical;
var num_responder;
var num_others;
var exit;
var direction;

var num_hour;

var center;
var pavement;
var hazmat;

var date;
var month;
var year;
var day;
var temp;
var hour;
var dayOfWeek;
var weekend;
var holiday;
var nonholiday = 0;
var nonholiday_sh = 1;
var season;
var timepickers;

var location_choice;

//Used for I-95 locations
var bc = 0;
var cecil = 0;
var harford = 0;

var dry = 0;
var wet = 0;
var snow = 0;
var unspecified = 0;
var week = 0;	
var spring = 0;
var summer = 0;
var fall = 0;
var winter = 0;	
var daytime = 0;
var nighttime = 0;
var cpi = 0;
var cpd = 0;
var prob;
var popup = 0;
var checkresult;
var ninetenam = 0;
var road = location.search.substring(1); //Represents the road being worked on. Defaults to I-95.

$(document).ready(function(){
	//timepicker initialization
	timepickers = $('.timepicker').wickedpicker();
	//datepicker with day of week
	$("#datepicker").datepicker({
		defaultDate: new Date(),
		onSelect: function(dateText, inst) {
			var date = $.datepicker.parseDate(inst.settings.dateFormat || $.datepicker._defaults.dateFormat, dateText, inst.settings);
			var dateText = $.datepicker.formatDate("DD", date, inst.settings);
			$("p.name").text(dateText); // Just the day of week
		}
	});
	$( "#datepicker" ).val($.datepicker.formatDate("mm-dd-yy", new Date()));
	//tab could be mouseover
	$('.incident-info .menu .item').tab();
	 
	getDate();
	my_getTime();

	
	// click radiocheck and update the summary
	$("#checkbox-size input").click(updateSum);
	$("#checkbox-size select#t3_1").click(updateSum2);
	$("#checkbox-size select#t3_2").click(updateSum2);
	
	//IV page dropdown
	$("#checkbox-size select").click(updateSum2);

	if (road == "I-495") { //Can run road-specific models for different roads
		$("#location_495").removeAttr("style"); //Changes which location tab gets displayed based on the road
		$("#involved_vehicles_5").removeAttr("style"); //Displays VAN vehicle for picking
		$("#iv8").removeAttr("style"); //Displays VAN vehicle for picking
		
		// Location page dropdowns
		$("#dropdown_location_495 select").click(updateSum2);
		$("#dropdown_direction_495 select").click(updateSum2);
		$("#dropdown_exit_495 select").click(updateSum2);
	}
	else if(road == "I-695"){
		$("#location_695").removeAttr("style");
		
		//Location page dropdowns
		$("#dropdown_location_695 select").click(updateSum2);
		$("#dropdown_direction_695 select").click(updateSum2);
		$("#dropdown_exit_695 select").click(updateSum2);
	}
	else if (road == "I-270") {
		$("#location_270").removeAttr("style");
		
		//Location page dropdowns
		$("#dropdown_location_270 select").click(updateSum2);
		$("#dropdown_direction_270 select").click(updateSum2);
		$("#dropdown_exit_270 select").click(updateSum2);
	}
	else if (road == "I-70") {
		$("#location_70").removeAttr("style");
		$("#involved_vehicles_6").removeAttr("style"); //Displays SUV vehicle for picking
		$("#iv9").removeAttr("style"); //Displays SUV vehicle for picking
		
		//Location page dropdowns
		$("#dropdown_location_70 select").click(updateSum2);
		$("#dropdown_direction_70 select").click(updateSum2);
		$("#dropdown_exit_70 select").click(updateSum2);
	}
	else if (road == "US-29") {
		$("#location_29").removeAttr("style");
		
		//Location page dropdowns
		$("#dropdown_location_29 select").click(updateSum2);
		$("#dropdown_direction_29 select").click(updateSum2);
		$("#dropdown_exit_29 select").click(updateSum2);
	}
	else{
		$("#location_95").removeAttr("style");
	}

	//IV page dropdown
	$("#checkbox-size select").click(updateTime);

	// click radiocheck and update the estimated time
	$("#checkbox-size input").click(updateTime);
	$("#checkbox-size select#t3_1").click(updateTime);
	$("#checkbox-size select#t3_2").click(updateTime);
	$("#Save-9").click(updateTime);

	$("button[name='save']").click(printSum);
	$("button[name='save']").click(printTime);
	$("button[name='save']").click(activeNext);

	var radioValue1;
	var radioValue2;
	var radioValue3;
	var radioValue4;
	
	//next button handler	
	$("#Next-1").click(function(){
		radioValue1 = $("input[name='incident']:checked").val();
		if (radioValue1 == 'collision') {
		$.tab('change tab', '1-1');
		}
		else if (radioValue1 == 'non') {
			$.tab('change tab', '1-4');
		}
	});

	$("#Next-2").click(function(){
		radioValue2 = $("input[name='blockage']:checked").val();
		if (radioValue2 == 'travel') {
			//change the content within the same tab
			$.tab('change tab', '1-2');
		}
		if (radioValue2 == 'shoulder') {
			$.tab('change tab', '1-2');
		}
	});

	$("#Next-3").click(function() {
		$.tab('change tab', '1-3');
	});	

	$("#Next-4").click(function(){
		 $('.ui.menu').find('.item').tab('change tab', '2');
		
	});	
	//$("#Next-11").click(function(){ //Handles Next button after a Non-Collision Incident
	//});
	
	//iv tab's next button
	$("#Next-5").click(function(){
		if (document.getElementById("dropbox1s").value != ' ' && num_car == 0){
			alert("At least one vehicle should be involved when a situation is specified for a type.");
		}
		else if (document.getElementById("dropbox2s").value != ' ' && num_truck == 0){
			alert("At least one vehicle should be involved when a situation is specified for a type.");
		}
		else if (document.getElementById("dropbox3s").value != ' ' && num_bus == 0){
			alert("At least one vehicle should be involved when a situation is specified for a type.");
		}
		else if (document.getElementById("dropbox7s").value != ' ' && num_pickup == 0){
			alert("At least one vehicle should be involved when a situation is specified for a type.");
		}
		else if (document.getElementById("dropbox8s").value != ' ' && num_van == 0){
			alert("At least one vehicle should be involved when a situation is specified for a type.");
		}
		else if (document.getElementById("dropbox9s").value != ' ' && num_suv == 0){
			alert("At least one vehicle should be involved when a situation is specified for a type.");
		}
		else {
			$('.ui.menu').find('.item').tab('change tab', '3');
		}
	});

	//responder tab's next button
	$("#Next-6").click(function(){
		var responder_type;
		if (model['responder'] == 'First responder: CHART' && (responder_type = "chart") && num_chart > 0) {
			$('.ui.menu').find('.item').tab('change tab', '4');
		}
		else if (model['responder'] == 'First responder: POLICE' && (responder_type = "police") && num_police > 0) {
			$('.ui.menu').find('.item').tab('change tab', '4');
		}
		else if (model['responder'] == 'First responder: TOW' && (responder_type = "tow") && num_tow > 0) {
			$('.ui.menu').find('.item').tab('change tab', '4');
		}
		else if (model['responder'] == 'First responder: FIREBOARD' && (responder_type = "fireboard") && num_fireboard > 0) {
			$('.ui.menu').find('.item').tab('change tab', '4');
		}
		else if (model['responder'] == 'First responder: MEDICAL' && (responder_type = "medical") && num_medical > 0) {
			$('.ui.menu').find('.item').tab('change tab', '4');
		}
		else if (model['responder'] == 'First responder: Others' && (responder_type = "other") && num_others > 0) {
			$('.ui.menu').find('.item').tab('change tab', '4');
		}
		else if (responder_type == null) {
			alert("Please select a first responder.");
		}
		else {
			alert("Please enter number of " + responder_type + " vehicles.");
		}
	});
	
	//center tab's next button
	$("#Next-7").click(function(){
		$('.ui.menu').find('.item').tab('change tab', '5');
	});
	
	//p&h tab's next button
	$("#Next-8").click(function(){
		$('.ui.menu').find('.item').tab('change tab', '6');
	});	
	
	//time tab's next button
	$("#Next-9").click(function(){
		if(road=="I-495"){
			$('.ui.menu').find('.item').tab('change tab', '8');
		}
		else if(road=="I-695"){
			$('.ui.menu').find('.item').tab('change tab', '9');
		}
		else if(road=="I-270"){
			$('.ui.menu').find('.item').tab('change tab', '10');
		}
		else if(road=="I-70"){
			$('.ui.menu').find('.item').tab('change tab', '11');
		}
		else if(road=="US-29"){
			$('.ui.menu').find('.item').tab('change tab', '12');
		}
		else{
			$('.ui.menu').find('.item').tab('change tab', '7');
		}	
	});

	//back button handler
	$("#Back-2").click(function(){
		$.tab('change tab', '1');
		$("#Save-1").attr("disabled");
	});
	$("#Back-3").click(function(){
		$.tab('change tab', '1-1');	
		$("#Save-2").attr("disabled");
	});
	$("#Back-4").click(function(){
		$.tab('change tab', '1-2');
	});
	$("#Back-11").click(function(){
		$.tab('change tab', '1');
		$("#Save-1").attr("disabled");
	});
	$("#Back-5").click(function(){
		$('.ui.menu').find('.item').tab('change tab', '1');
	});
	$("#Back-6").click(function(){
		$('.ui.menu').find('.item').tab('change tab', '2');
	});
	$("#Back-7").click(function(){
		$('.ui.menu').find('.item').tab('change tab', '3');
	});
	$("#Back-8").click(function(){
		$('.ui.menu').find('.item').tab('change tab', '4');
	});
	$("#Back-9").click(function(){
		$('.ui.menu').find('.item').tab('change tab', '5');
	});
	$("#Back-10").click(function(){
		$('.ui.menu').find('.item').tab('change tab', '6');
	});
	$("#Back-10_495").click(function(){
		$('.ui.menu').find('.item').tab('change tab', '6');
	});
	$("#Back-10_695").click(function(){
		$('.ui.menu').find('.item').tab('change tab', '6');
	});
	$("#Back-10_270").click(function(){
		$('.ui.menu').find('.item').tab('change tab', '6');
	});
	$("#Back-10_70").click(function(){
		$('.ui.menu').find('.item').tab('change tab', '6');
	});
	$("#Back-10_29").click(function(){
		$('.ui.menu').find('.item').tab('change tab', '6');
	});
});

//### function out of use
/*
function showPopup(){
	$( "#dialog-2" ).empty();
	$( "#dialog-2" ).append('The estimated CT is the final output.');
	$( "#dialog-2" ).dialog({
		autoOpen: true, 

		//modal:true,
		draggable: true,
		resizable: true,
		position: ['center', 'center'],

		buttons: {
			"OK": function() {
			$(this).dialog("close");
			}
		}
	});
}

//### function out of use
function showprob(){
	$( "#dialog-2" ).empty();
	$( "#dialog-2" ).append(prob);
	$( "#dialog-2" ).dialog({
		autoOpen: true, 

		modal:true,
		draggable: true,
		resizable: true,
		position: ['center', 'center'],

		buttons: {
			"OK": function() {
			$(this).dialog("close");
			}
		}	
	});
}*/

//### updates the model whenever a radio button is selected
function updateSum(){
	var curr = $(this).parent().find("label").text(); //### current working parameter - all radio buttons direct here
	if(curr == 'Collision incident'){
		model['incident'] = curr;
		$("#Save-1").removeAttr("disabled");
	}
	else if(curr == 'Non-Collision incident'){
		model['incident'] = curr;
		$("#Save-1").removeAttr("disabled");
	}
	else if (curr == 'Travel lane blockage'){
		model['blockage'] = curr;
		$("#Save-2").removeAttr("disabled");
	}
	else if (curr == 'Shoulder only blockage'){
		model['blockage'] = curr;
		$("#Save-2").removeAttr("disabled");
	}
	//type 3
	else if (curr == 'Fatality'){
		model['collision'] = curr;
		$("#Save-3").removeAttr("disabled");
	}
	else if (curr == 'Personal Injury'){
		model['collision'] = curr;
		cpi = 1;
		$("#Save-3").removeAttr("disabled");
	}
	else if (curr == 'Property Damage only'){
		model['collision'] = curr;
		cpd = 1;
		$("#Save-3").removeAttr("disabled");
	}
	//type 4 for non-collision
	else if (curr == 'Debris in Roadway'){
		model['collision'] = curr;
		$("#Save-11").removeAttr("disabled");
				
	}
	else if (curr == 'Disabled Vehicle'){
		model['collision'] = curr;
		$("#Save-11").removeAttr("disabled");
	}
	else if (curr == 'Vehicles on Fire'){
		model['collision'] = curr;
		$("#Save-11").removeAttr("disabled");
	}		
	else if (curr == 'Emergency Roadwork'){
		model['collision'] = curr;
		$("#Save-11").removeAttr("disabled");
	}
	else if (curr == 'Off-road Activity'){
		model['collision'] = curr;
		$("#Save-11").removeAttr("disabled");
	}
	else if (curr == 'Police Activity'){
		model['collision'] = curr;
		$("#Save-11").removeAttr("disabled");
	}
	else if (curr == 'Utility Problem'){
		model['collision'] = curr;
		$("#Save-11").removeAttr("disabled");
				
	}
	else if (curr == 'Weather Closure'){
		model['collision'] = curr;
		$("#Save-11").removeAttr("disabled");
	}
	else if (curr == 'Others'){
		model['collision'] = curr;
		$("#Save-11").removeAttr("disabled");
	}		
		
	//first responder
	else if (curr == 'CHART'){
		first_responder = curr;
		model['responder'] = 'First responder: CHART';
		if(Number(num_chart) > 0){$("#Save-6").removeAttr("disabled");}
	}
	else if (curr == 'POLICE'){
		first_responder = curr;
		model['responder'] = 'First responder: POLICE';
		if(Number(num_police) > 0){$("#Save-6").removeAttr("disabled");}
	}
	else if (curr == 'TOW'){
		first_responder = curr;
		model['responder'] = 'First responder: TOW';
		if(Number(num_tow) > 0){$("#Save-6").removeAttr("disabled");}
	}
	else if (curr == 'FIREBOARD'){
		first_responder = curr;
		model['responder'] = 'First responder: FIREBOARD';
		if(Number(num_fireboard) > 0){$("#Save-6").removeAttr("disabled");}
	}
	else if (curr == 'MEDICAL'){
		first_responder = curr;
		model['responder'] = 'First responder: MEDICAL';
		if(Number(num_medical) > 0){$("#Save-6").removeAttr("disabled");}
	}
	else if (curr == 'OTHERS'){
		first_responder = curr;
		model['responder'] = 'First responder: Others';
		if(Number(num_others) > 0){$("#Save-6").removeAttr("disabled");}
	}

	//center
	else if (curr == 'AOC'){
		center = curr;
		model['center_choice'] = center;
		$("#Save-7").removeAttr("disabled");
	}
	else if (curr == 'SOC'){
		center = curr;
		model['center_choice'] = center;
		$("#Save-7").removeAttr("disabled");
	}
	else if (curr == 'Other'){
		center = curr;
		model['center_choice'] = center;
		$("#Save-7").removeAttr("disabled");
	}
	else if (curr == 'TOC3'){
		center = curr;
		model['center_choice'] = center;
		$("#Save-7").removeAttr("disabled");
	}
	else if (curr == 'TOC4'){
		center = curr;
		model['center_choice'] = center;
		$("#Save-7").removeAttr("disabled");
	}
	else if (curr == 'TOC5'){
		center = curr;
		model['center_choice'] = center;
		$("#Save-7").removeAttr("disabled");
	}
	else if (curr == 'TOC7'){
		center = curr;
		model['center_choice'] = center;
		$("#Save-7").removeAttr("disabled");
	}
		
	//pavement
	else if (curr == 'Dry'){
		pavement = curr;
		dry = 1;
		model['pavement_condition'] = 'Dry pavement condition';
		$("#Save-8").removeAttr("disabled");
	}
	else if (curr == 'Wet'){
		pavement = curr;
		wet = 1;
		model['pavement_condition'] = 'Wet pavement condition';
		$("#Save-8").removeAttr("disabled");
	}
	else if (curr == 'Snow/Ice'){
		pavement = curr;
		snow = 1;
		model['pavement_condition'] = 'Snow/Ice pavement condition';
		$("#Save-8").removeAttr("disabled");
	}
	else if (curr == 'Chemical wet'){
		pavement = curr;
		model['pavement_condition'] = 'Chemical wet pavement condition';
		$("#Save-8").removeAttr("disabled");
	}
	else if(curr == 'Unspecified'){
		pavement = curr;
		unspecified = 1;
		model['pavement_condition'] = 'Unspecified condition';
		$("#Save-8").removeAttr("disabled");
	}

	//location I-95
	else if (curr == "Prince George's"){
		location_choice = curr;
		model['location'] = location_choice;
		$("#Save-10").removeAttr("disabled");
	}
	else if (curr == 'Howard'){
		location_choice = curr;
		model['location'] = location_choice;
		$("#Save-10").removeAttr("disabled");
	}
	else if (curr == 'Baltimore city'){
		location_choice = curr;
		bc = 1;
		model['location'] = location_choice;
		$("#Save-10").removeAttr("disabled");
	}
	else if (curr == 'Baltimore'){
		location_choice = curr;
		model['location'] = location_choice;
		$("#Save-10").removeAttr("disabled");
	}
	else if (curr == 'Harford'){
		location_choice = curr;
		harford = 1
		model['location'] = location_choice;
		$("#Save-10").removeAttr("disabled");
	}
	else if (curr == 'Cecil'){
		location_choice = curr;
		cecil = 1;
		model['location'] = location_choice;
		$("#Save-10").removeAttr("disabled");
	}

	aux_lane = document.getElementById("b1").checked;
	console.log(aux_lane);		
	if (aux_lane == true){
		model['detail_blockage_1'] = 'An Auxiliary lane blocked';
		$("#Save-4").removeAttr("disabled");
	}
	else if(aux_lane == false){
		model['detail_blockage_1'] = null;
	}
	tunnel_lane = document.getElementById("b2").checked;
	console.log(tunnel_lane);		
	if (tunnel_lane == true){
		model['detail_blockage_2'] = 'A lane in TUNNEL blocked';
		$("#Save-4").removeAttr("disabled");
	}
	else if(tunnel_lane == false){
		model['detail_blockage_2'] = null;
	}
	toll_lane = document.getElementById("b3").checked;
	console.log(toll_lane);		
	if (toll_lane == true){
		model['detail_blockage_3'] = 'A lane in TOLL area blocked';
		$("#Save-4").removeAttr("disabled");
	}
	else if(toll_lane == false){
		model['detail_blockage_3'] = null;
	}
	
	//hazmat
	hazmat = document.getElementById("haz").checked;
	console.log(hazmat);
	if (hazmat == true){
		model['hazmat_condition'] = 'Hazmat material related';
	}
	else if(hazmat == false){
		model['hazmat_condition'] = null;
	}
}

//### updates the model whenever a dropdown option is selected
function updateSum2(){
	travel_drop = document.getElementById("t3_1").value;
	console.log(travel_drop);
	if (travel_drop == 0){
		model['number_travel'] = null;
	}
	else if (travel_drop == 1){
		model['number_travel'] = "1 Travel lane blocked";
		$("#Save-4").removeAttr("disabled");
	}		
	else if (travel_drop == 2){
		model['number_travel'] = "2 Travel lanes blocked";
		$("#Save-4").removeAttr("disabled");
	}	
	else if (travel_drop == 3){
		model['number_travel'] = "3 Travel lanes blocked";
		$("#Save-4").removeAttr("disabled");
	}
	else if (travel_drop == 4){
		model['number_travel'] = "4 Travel lanes blocked";
		$("#Save-4").removeAttr("disabled");
	}
	else {
		model['number_travel'] = "5+ Travel lanes blocked";
		$("#Save-4").removeAttr("disabled");
	}

	shoulder_drop = document.getElementById("t3_2").value;
	
	console.log(shoulder_drop);	
	if (shoulder_drop == 0){
		model['number_shoulder'] = null;
	}
	else if (shoulder_drop == 1){
		model['number_shoulder'] = "1 Shoulder lane blocked";
		$("#Save-4").removeAttr("disabled");
	}
	else if (shoulder_drop == 2){
		model['number_shoulder'] = "2 Shoulder lanes blocked";
		$("#Save-4").removeAttr("disabled");
	}
	else if (shoulder_drop == 3){
		model['number_shoulder'] = "3 Shoulder lanes blocked";
		$("#Save-4").removeAttr("disabled");
	}
	else if (shoulder_drop == 4){
		model['number_shoulder'] = "4 Shoulder lanes blocked";
		$("#Save-4").removeAttr("disabled");
	}
	else if (shoulder_drop == '5'){
		model['number_shoulder'] = "5+ Shoulder lanes blocked";
		$("#Save-4").removeAttr("disabled");
	}
		
	total_lane = Number(travel_drop) + Number(shoulder_drop);
	console.log(total_lane);
	//IV page
	
	
	if (involved_car != ' '){
			model['involved_veh'] += involved_car;
			if (involved_car_s != ' '){model['involved_veh'] += '(:' + involved_car_s + ') ';}
		}
		else{involved_car_s = ' '}
	
	involved_car = document.getElementById("dropbox1").value;
	console.log(involved_car);	
	involved_truck = document.getElementById("dropbox2").value;
	console.log(involved_truck);
	involved_bus = document.getElementById("dropbox3").value;
	console.log(involved_bus);
	involved_pickup = document.getElementById("dropbox7").value;
	console.log(involved_pickup);
	involved_van = document.getElementById("dropbox8").value;
	console.log(involved_van);
	involved_suv = document.getElementById("dropbox9").value;
	console.log(involved_suv);
	involved_pedestrian = document.getElementById("dropbox4").value;
	console.log(involved_pedestrian);
	involved_cyclist = document.getElementById("dropbox5").value;
	console.log(involved_cyclist);
	involved_motor = document.getElementById("dropbox6").value;
	console.log(involved_motor);
	
	if (involved_car != ' '){involved_car_s = document.getElementById("dropbox1s").value;}
	else{involved_car_s = ' ';}
	console.log(involved_car_s);
	if (involved_truck != ' '){involved_truck_s = document.getElementById("dropbox2s").value;}
	else{involved_truck_s = ' ';}
	console.log(involved_truck_s);
	if (involved_bus != ' '){involved_bus_s = document.getElementById("dropbox3s").value;}
	else{involved_bus_s = ' ';}
	console.log(involved_bus_s);
	if (involved_pickup != ' '){involved_pickup_s = document.getElementById("dropbox7s").value;}
	else{involved_pickup_s = ' ';}
	console.log(involved_pickup_s);
	if (involved_van != ' '){involved_van_s = document.getElementById("dropbox8s").value;}
	else{involved_van_s = ' ';}
	console.log(involved_van_s);
	if (involved_suv != ' '){involved_suv_s = document.getElementById("dropbox9s").value;}
	else{involved_suv_s = ' ';}
	console.log(involved_suv_s);

	num_car = Number($("#dropbox1 option:selected").text());
	console.log(num_car);
	num_truck = Number($("#dropbox2 option:selected").text());
	console.log(num_truck);
	num_bus = Number($("#dropbox3 option:selected").text());
	console.log(num_bus);
	num_pickup = Number($("#dropbox7 option:selected").text());
	console.log(num_pickup);
	num_van = Number($("#dropbox8 option:selected").text());
	console.log(num_van);
	num_suv = Number($("#dropbox9 option:selected").text());
	console.log(num_suv);
	num_pedestrian = Number($("#dropbox4 option:selected").text());
	console.log(num_pedestrian);
	num_cyclist = Number($("#dropbox5 option:selected").text());
	console.log(num_cyclist);
	num_motor = Number($("#dropbox6 option:selected").text());
	console.log(num_motor);
	num_total = num_car + num_truck + num_bus + num_pickup + num_van + num_suv + num_pedestrian + num_cyclist + num_motor;
	console.log(num_total);
	
	if ((involved_car == ' ') && (involved_truck == ' ') && (involved_bus == ' ') && (involved_pickup == ' ') && (involved_van == ' ') && (involved_suv == ' ') && (involved_pedestrian == ' ') && (involved_cyclist == ' ') && (involved_motor == ' ')){
		model['involved_veh'] = null;
	}
	else{
		$("#Save-5").removeAttr("disabled");
		model['involved_veh'] = "";

		if (involved_car != ' '){
			model['involved_veh'] += involved_car;
			if (involved_car_s != ' '){model['involved_veh'] += '(:' + involved_car_s + ') ';}
		}
		if (involved_truck != ' '){
			model['involved_veh'] += involved_truck;
			if (involved_truck_s != ' '){model['involved_veh'] += '(:' + involved_truck_s + ') ';}
		}
		if (involved_bus != ' '){
			model['involved_veh'] += involved_bus;
			if (involved_bus_s != ' '){model['involved_veh'] += '(:' + involved_bus_s + ') ';}
		}
		if (involved_pickup != ' '){
			model['involved_veh'] += involved_pickup;
			if (involved_pickup_s != ' '){model['involved_veh'] += '(:' + involved_pickup_s + ') ';}
		}
		if (involved_van != ' '){
			model['involved_veh'] += involved_van;
			if (involved_van_s != ' '){model['involved_veh'] += '(:' + involved_van_s + ') ';}
		}
		if (involved_suv != ' '){
			model['involved_veh'] += involved_suv;
			if (involved_suv_s != ' '){model['involved_veh'] += '(:' + involved_suv_s + ') ';}
		}

		if (involved_pedestrian != ' '){model['involved_veh'] += involved_pedestrian;}
		if (involved_cyclist != ' '){model['involved_veh'] += involved_cyclist;}
		if (involved_motor != ' '){model['involved_veh'] += involved_motor;}
		model['involved_veh'] += 'involved';
	}
	
	//Responder page
	chart_value = document.getElementById("dropdown_responder_1").value;
	console.log(chart_value);	
	police_value = document.getElementById("dropdown_responder_2").value;
	console.log(police_value);
	tow_value = document.getElementById("dropdown_responder_3").value;
	console.log(tow_value);
	fireboard_value = document.getElementById("dropdown_fireboard").value;
	console.log(fireboard_value);	
	medical_value = document.getElementById("dropdown_responder_5").value;
	console.log(medical_value);	
	others_value = document.getElementById("dropdown_responder_6").value;
	console.log(others_value);	
	
	num_chart = $("#dropdown_responder_1 option:selected").text();
	console.log(num_chart);
	num_police = $("#dropdown_responder_2 option:selected").text();
	console.log(num_police);
	num_tow = $("#dropdown_responder_3 option:selected").text();
	console.log(num_tow);
	num_fireboard = $("#dropdown_fireboard option:selected").text();
	console.log(num_fireboard);
	num_medical = $("#dropdown_responder_5 option:selected").text();
	console.log(num_medical);
	num_others = $("#dropdown_responder_6 option:selected").text();
	console.log(num_others);	
	
	num_responder = Number(num_chart) + Number(num_police) + Number(num_tow) + Number(num_fireboard) + Number(num_medical) + Number(num_others);
	console.log(num_responder);

	if(model['responder'] == 'First responder: CHART'){
		if(chart_value != ' '){$("#Save-6").removeAttr("disabled");}
	}
	else if(model['responder'] == 'First responder: POLICE'){
		if(police_value != ' '){$("#Save-6").removeAttr("disabled");}
	}
	else if(model['responder'] == 'First responder: TOW'){
		if(tow_value != ' '){$("#Save-6").removeAttr("disabled");}
	}
	else if(model['responder'] == 'First responder: FIREBOARD'){
		if(fireboard_value != ' '){$("#Save-6").removeAttr("disabled");}
	}
	else if(model['responder'] == 'First responder: MEDICAL'){
		if(medical_value != ' '){$("#Save-6").removeAttr("disabled");}
	}
	else if(model['responder'] == 'First responder: Others'){
		if(others_value != ' '){$("#Save-6").removeAttr("disabled");}
	}

	if (num_responder == 1){
		model['responder_number'] = chart_value + police_value + tow_value + fireboard_value + medical_value + others_value +'is responding.';
	}
	else if (num_responder > 1){
		model['responder_number'] = chart_value + police_value + tow_value + fireboard_value + medical_value + others_value +'are responding.';
	}
	else {
		model['responder_number'] = null;
	}
	
	//location page: location, direction and exit (road specific)
	if (road == "I-495") {
		location_choice = $("#dropdown_location_495 option:selected").text();
		console.log(location_choice);

		direction = $("#dropdown_direction_495 option:selected").text();
		console.log(direction);
	
		exit = $("#dropdown_exit_495 option:selected").text();
		console.log(exit);
		
		if (location_choice != "Location"){
			model['location'] = location_choice;
			$("#Save-10_495").removeAttr("disabled");
		}
		else{
			model['location'] = null;
		}
		if (direction != "Direction"){
			model['direction'] = direction;
			$("#Save-10_495").removeAttr("disabled");
		}
		else{
			model['direction'] = null;
		}	
		if (exit != "Exit"){
			model['exit'] = exit;
			$("#Save-10_495").removeAttr("disabled");
		}
		else{
			model['exit'] = null;
		}
	}
	else if (road == "I-695") {
		location_choice = $("#dropdown_location_695 option:selected").text();
		console.log(location_choice);

		direction = $("#dropdown_direction_695 option:selected").text();
		console.log(direction);
	
		exit = $("#dropdown_exit_695 option:selected").text();
		console.log(exit);
		
		if (location_choice != "Location"){
			model['location'] = location_choice;
			$("#Save-10_695").removeAttr("disabled");
		}
		else{
			model['location'] = null;
		}
		if (direction != "Direction"){
			model['direction'] = direction;
			$("#Save-10_695").removeAttr("disabled");
		}
		else{
			model['direction'] = null;
		}
		if (exit != "Exit"){
			model['exit'] = exit;
			$("#Save-10_695").removeAttr("disabled");
		}
		else{
			model['exit'] = null;
		}
	}
	else if (road == "I-270") {
		location_choice = $("#dropdown_location_270 option:selected").text();
		console.log(location_choice);

		direction = $("#dropdown_direction_270 option:selected").text();
		console.log(direction);
	
		exit = $("#dropdown_exit_270 option:selected").text();
		console.log(exit);
		
		if (location_choice != "Location"){
			model['location'] = location_choice;
			$("#Save-10_270").removeAttr("disabled");
		}
		else{
			model['location'] = null;
		}
		if (direction != "Direction"){
			model['direction'] = direction;
			$("#Save-10_270").removeAttr("disabled");
		}
		else{
			model['direction'] = null;
		}
		if (exit != "Exit"){
			model['exit'] = exit;
			$("#Save-10_270").removeAttr("disabled");
		}
		else{
			model['exit'] = null;
		}
	}
	else if (road == "I-70") {
		location_choice = $("#dropdown_location_70 option:selected").text();
		console.log(location_choice);

		direction = $("#dropdown_direction_70 option:selected").text();
		console.log(direction);
	
		exit = $("#dropdown_exit_70 option:selected").text();
		console.log(exit);
		
		if (location_choice != "Location"){
			model['location'] = location_choice;
			$("#Save-10_70").removeAttr("disabled");
		}
		else{
			model['location'] = null;
		}
		if (direction != "Direction"){
			model['direction'] = direction;
			$("#Save-10_70").removeAttr("disabled");
		}
		else{
			model['direction'] = null;
		}
		if (exit != "Exit"){
			model['exit'] = exit;
			$("#Save-10_70").removeAttr("disabled");
		}
		else{
			model['exit'] = null;
		}
	}
	else if (road == "US-29") {
		location_choice = $("#dropdown_location_29 option:selected").text();
		console.log(location_choice);

		direction = $("#dropdown_direction_29 option:selected").text();
		console.log(direction);
	
		exit = $("#dropdown_exit_29 option:selected").text();
		console.log(exit);
		
		if (location_choice != "Location"){
			model['location'] = location_choice;
			$("#Save-10_29").removeAttr("disabled");
		}
		else{
			model['location'] = null;
		}
		if (direction != "Direction"){
			model['direction'] = direction;
			$("#Save-10_29").removeAttr("disabled");
		}
		else{
			model['direction'] = null;
		}
		if (exit != "Exit"){
			model['exit'] = exit;
			$("#Save-10_29").removeAttr("disabled");
		}
		else{
			model['exit'] = null;
		}
	}
	else {
		direction = $("#dropdown_direction option:selected").text();
		console.log(direction);
	
		exit = $("#dropdown_exit option:selected").text();
		console.log(exit);
		if (direction != "Direction"){
			model['direction'] = direction;
			$("#Save-10").removeAttr("disabled");
		}
		else{
			model['direction'] = null;
		}
		if (exit != "Exit"){
			model['exit'] = exit;
			$("#Save-10").removeAttr("disabled");
		}
		else{
			model['exit'] = null;
		}
	}
	console.log(model);
}

function getDate(){
	//selecting the button and adding a click event
	$("#Save-9").click(function() {
		//alerting the value inside the textbox
		var raw_date = $("#datepicker").datepicker("getDate");
		date = ($.datepicker.formatDate("mm/dd/yy", raw_date));
		console.log(date);
		month = ($.datepicker.formatDate("mm", raw_date));
		day = ($.datepicker.formatDate("dd", raw_date));
		year = ($.datepicker.formatDate("yy", raw_date));
		dayOfWeek = ($.datepicker.formatDate("DD", raw_date));
		console.log(month);
		console.log(day);
		console.log(year);
		console.log(dayOfWeek);

		if ((month == '03') || (month == '04') || (month == '05')){
			season = 'Spring';
			spring = 1;
			model['season_time'] = season;
		}
		else if ((month == '06') || (month == '07') || (month == '08')){
			season = 'Summer';
			summer = 1;
			model['season_time'] = season;
		}
		else if ((month == '09') || (month == '10') || (month == '11')){
			season = 'Fall';
			fall = 1;
			model['season_time'] = season;
		}
		else if ((month == '12') || (month == '01') || (month == '02')){
			season = 'Winter';
			winter = 1;
			model['season_time'] = season;
		}
		console.log(season);
		console.log(model);
	
		if((dayOfWeek == 'Monday')||(dayOfWeek == 'Tuesday')||(dayOfWeek == 'Wednesday')||(dayOfWeek == 'Thursday')||(dayOfWeek == 'Friday')){
			weekend = 'Weekday';
			model['weekend_time'] = weekend;
			console.log(weekend);
			console.log(model['weekend_time']);
		}
		else if((dayOfWeek == 'Sunday')||(dayOfWeek == 'Saturday')){
			weekend = 'Weekend';
			week = 1;
			model['weekend_time'] = weekend;		
		}

		// Consult for federal holidays https://www.opm.gov/policy-data-oversight/pay-leave/federal-holidays/
		// Careful to consider that some holidays have floating days, and others have observed days when they fall on weekends
		if(((month == '01')&&(day == '01')) || ((month == '01')&&(day == '02')) || ((month == '07')&&(day == '04')) || ((month == '11')&&(day == '11')) || ((month == '12')&&(day == '25'))){
			nonholiday = 1;
			nonholiday_sh = 0;
			console.log(nonholiday);
			model['holiday_time'] = 'Holiday';
		}
		//### holidays below are floating days and are observed on different days each year
		else if((year == '2020') && (((month == '01')&&(day == '20')) || ((month == '02')&&(day == '17')) || ((month == '05')&&(day == '25')) || ((month == '07')&&(day == '03')) || ((month == '09')&&(day == '07')) || ((month == '10')&&(day == '12')) || ((month == '11')&&(day == '11')) || ((month == '11')&&(day == '26')))){
			nonholiday = 1;
			nonholiday_sh = 0;
			console.log(nonholiday);
			model['holiday_time'] = 'Holiday';
		}
		else if((year == '2021') && (((month == '01')&&(day == '18')) || ((month == '02')&&(day == '15')) || ((month == '05')&&(day == '31')) || ((month == '07')&&(day == '05')) || ((month == '09')&&(day == '06')) || ((month == '10')&&(day == '11')) || ((month == '11')&&(day == '11')) || ((month == '11')&&(day == '25')) || ((month == '12')&&(day == '24')) || ((month == '12')&&(day == '31')))){
			nonholiday = 1;
			nonholiday_sh = 0;
			console.log(nonholiday);
			model['holiday_time'] = 'Holiday';
		}
		else if((year == '2022') && (((month == '01')&&(day == '17')) || ((month == '02')&&(day == '21')) || ((month == '05')&&(day == '30')) || ((month == '09')&&(day == '05')) || ((month == '10')&&(day == '10')) || ((month == '11')&&(day == '11')) || ((month == '11')&&(day == '24')) || ((month == '12')&&(day == '26')))){
			nonholiday = 1;
			nonholiday_sh = 0;
			console.log(nonholiday);
			model['holiday_time'] = 'Holiday';
		}
		else if((year == '2023') && (((month == '01')&&(day == '16')) || ((month == '02')&&(day == '20')) || ((month == '05')&&(day == '29')) || ((month == '09')&&(day == '04')) || ((month == '10')&&(day == '09')) || ((month == '11')&&(day == '10')) || ((month == '11')&&(day == '23')))){
			nonholiday = 1;
			nonholiday_sh = 0;
			console.log(nonholiday);
			model['holiday_time'] = 'Holiday';
		}
		else{
			nonholiday = 0;
			nonholiday_sh = 1;
			console.log(nonholiday);
			model['holiday_time'] = null;
		}
	});
}
	
function my_getTime(){
	$("#Save-9").click(function() {
	var time = timepickers.wickedpicker('time');	
	time = time.replace(" ", "");
	time = date +' ' + time;
	var curr_hour = new Date(time).getHours();
	console.log(curr_hour);
	num_hour = curr_hour
	
	var curr_min = new Date(time).getMinutes();
	console.log(curr_min);
	
	console.log(weekend);
	if(weekend == 'Weekday'){
		if ((curr_hour >= 7 ) && (curr_hour < 10)){
			hour = 'AM-peak';
			nighttime = 0;
			model['hour_time'] = hour;
			if((curr_hour >= 9) && (curr_hour < 10)){
				ninetenam = 1;
			}			
		}
		else if ((curr_hour >= 10 ) && (curr_hour < 16)){
			hour = 'Day time';
			daytime = 1;
			nighttime = 0;
			model['hour_time'] = hour;
		}
		else if ((curr_hour >= 16 ) && (curr_hour < 19)){
			hour = 'PM-peak';
			model['hour_time'] = hour;
		}
		else {
			hour = 'Night time';
			daytime = 0;
			nighttime = 1;
			model['hour_time'] = hour;
		}	
		console.log(time);
	}
	else if(weekend == 'Weekend'){
		if((curr_hour >= 7 ) && (curr_hour < 19)){
			hour = 'Day time';
			daytime = 1;
			nighttime = 0;
			model['hour_time'] = hour;
			if((curr_hour >= 9) && (curr_hour < 10)){
				ninetenam = 1;
			}			
		}
		else{
			hour = 'Night time';
			daytime = 0;
			nighttime = 1;
			model['hour_time'] = hour;
		}
	}	
	
	console.log(ninetenam);
	});
}	

function printSum(){
//print summary updates
	$("#summary").empty();
	for (var key in model){
		if(model[key] != null){
		$("#summary").append('<div>'+model[key]+'</div>');
		}
	}
}
	
function printTime(){		
	//print timeline updates
	//print first label
	txtElem_1.appendChild(inside_txt_1);
	txtElem2_1.appendChild(percent_txt_1);
	$("#map").append(newLine_1);
	$("#map").append(txtElem_1);
	$("#map").append(txtElem2_1);
	//print second label
	txtElem_2.appendChild(inside_txt_2);
	txtElem2_2.appendChild(percent_txt_2);
	$("#map").append(newLine_2);
	$("#map").append(txtElem_2);
	$("#map").append(txtElem2_2);
	//print third label
	txtElem_3.appendChild(inside_txt_3);
	txtElem2_3.appendChild(percent_txt_3);
	$("#map").append(newLine_3);
	$("#map").append(txtElem_3);
	$("#map").append(txtElem2_3);
	//print average time line
	txtElem3.appendChild(last_line);
	$("#map").append(txtElem3);
}

//### updates the time whenever factors entered into the model
// activated whenever a radio button is selected, dropdown selected, or checkbox clicked
function updateTime(){
	//first label
	newLine_1.setAttribute('id','line1');
	newLine_1.setAttribute('stroke','red');
	newLine_1.setAttribute('stroke-width','15');
	newLine_1.setAttribute('y1','60');
	newLine_1.setAttribute('y2','60');
							
	txtElem_1.setAttributeNS(null,"id","text1");
	txtElem_1.setAttributeNS(null,"font-size","13px");
	txtElem_1.setAttributeNS(null,"fill",'black');
	txtElem_1.setAttributeNS(null,"y",65);
				
	txtElem2_1.setAttributeNS(null,"id","text2");
	txtElem2_1.setAttributeNS(null,"font-size","10px");
	txtElem2_1.setAttributeNS(null,"fill",'red');
	txtElem2_1.setAttributeNS(null,"y",65);
	//second label
	console.log(newLine_2);
	newLine_2.setAttribute('id','line2');
	newLine_2.setAttribute('stroke','red');
	newLine_2.setAttribute('stroke-width','15');
	newLine_2.setAttribute('y1','85');
	newLine_2.setAttribute('y2','85');

	txtElem_2.setAttributeNS(null,"id","text1_2");
	txtElem_2.setAttributeNS(null,"font-size","13px");
	txtElem_2.setAttributeNS(null,"fill",'black');
	txtElem_2.setAttributeNS(null,"y",90);

	txtElem2_2.setAttributeNS(null,"id","text2_2");
	txtElem2_2.setAttributeNS(null,"font-size","10px");
	txtElem2_2.setAttributeNS(null,"fill",'red');
	txtElem2_2.setAttributeNS(null,"y",90);	
	//third label
	console.log(newLine_3);
	newLine_3.setAttribute('id','line3');
	newLine_3.setAttribute('stroke','red');
	newLine_3.setAttribute('stroke-width','15');
	newLine_3.setAttribute('y1','110');
	newLine_3.setAttribute('y2','110');

	txtElem_3.setAttributeNS(null,"id","text1_3");
	txtElem_3.setAttributeNS(null,"font-size","13px");
	txtElem_3.setAttributeNS(null,"fill",'black');
	txtElem_3.setAttributeNS(null,"y",115);
				
	txtElem2_3.setAttributeNS(null,"id","text2_3");
	txtElem2_3.setAttributeNS(null,"font-size","10px");
	txtElem2_3.setAttributeNS(null,"fill",'red');
	txtElem2_3.setAttributeNS(null,"y",115);
	//average time line
	txtElem3.setAttributeNS(null,"id","text3");
	txtElem3.setAttributeNS(null,"font-size","15px");
	txtElem3.setAttributeNS(null,"font-weight","bold");
	txtElem3.setAttributeNS(null,"fill",'red');
	txtElem3.setAttributeNS(null,"x",180);
	txtElem3.setAttributeNS(null,"y",140);

	//###
	/* the core model starts here
	*  the conditions below are checked when users select the incident type, 
	*  no. of impacted lanes, and after all factors have been entered
	*/
	if(road=='I-495'){
		if(model['incident']=='Collision incident'){
			drawSVG1(10, 80, 27, 90, "5~40", "60%");
			drawSVG2(10, 100, 37, 110, "5~50", "70%");
			drawSVG3(10, 170, 72, 180, "5~85", "80%");
			drawSVG4("Average CT = 29 mins");
				
			if(model['blockage']=='Travel lane blockage'){
				drawSVG1(10, 80, 27, 90, "5~40", "60%");
				drawSVG2(10, 100, 37, 110, "5~50", "70%");
				drawSVG3(10, 130, 52, 140, "5~65", "80%");
				drawSVG4("Average CT = 30 mins");
					
				if(model['collision']=='Fatality'){
					$("#first_stop").text("100min");
					$("#second_stop").text("200min");
					$("#fourth_stop").text("400min");

					drawSVG1(126, 237, 160, 247, "210~395", "60%");
					drawSVG2(120, 252, 160, 262, "200~420", "70%");
					drawSVG3(120, 264, 160, 274, "200~440", "80%");
					drawSVG4("Average CT = 300 mins");
				}
				else if(model['collision']=='Personal Injury'){
					drawSVG1(20, 90, 37, 110, "10~45", "60%");
					drawSVG2(20, 110, 47, 120, "10~55", "70%");
					drawSVG3(10, 140, 57, 150, "5~70", "80%");
					drawSVG4("Average CT = 33 mins");

					if(model['number_travel']=='1 Travel lane blocked'){
						drawSVG1(20, 80, 32, 90, "10~40", "60%");
						drawSVG2(20, 100, 42, 110, "10~50", "70%");
						drawSVG3(10, 120, 47, 130, "5~60", "80%");
						drawSVG4("Average CT = 29 mins");
					}
					else if(model['number_travel']=='2 Travel lanes blocked'){
						drawSVG1(20, 80, 32, 90, "10~40", "60%");
						drawSVG2(20, 90, 37, 100, "10~45", "70%");
						drawSVG3(10, 110, 42, 120, "5~55", "80%");
						drawSVG4("Average CT = 32 mins");
					}
					else if((model['number_travel']=='3 Travel lanes blocked') || (model['number_travel']=='4 Travel lanes blocked') 
					|| (model['number_travel']=='5+ Travel lanes blocked')){
						drawSVG1(30, 130, 62, 140, "15~65", "60%");
						drawSVG2(20, 150, 67, 160, "10~75", "70%");
						drawSVG3(10, 190, 82, 200, "5~95", "80%");
						drawSVG4("Average CT = 44 mins");
					}
				}
				else if(model['collision']=='Property Damage only'){
					drawSVG1(10, 80, 27, 90, "5~40", "60%");
					drawSVG2(10, 90, 32, 100, "5~45", "70%");
					drawSVG3(10, 110, 42, 120, "5~55", "80%");
					drawSVG4("Average CT = 26 mins");	

					if(model['number_travel']=='1 Travel lane blocked'){
						drawSVG1(10, 70, 22, 80, "5~35", "60%");
						drawSVG2(10, 80, 27, 90, "5~40", "70%");
						drawSVG3(10, 100, 37, 110, "5~50", "80%");
						drawSVG4("Average CT = 24 mins");
					}
					else if(model['number_travel']=='2 Travel lanes blocked'){
						drawSVG1(10, 80, 27, 90, "5~40", "60%");
						drawSVG2(10, 100, 37, 110, "5~50", "70%");
						drawSVG3(10, 140, 57, 150, "5~70", "80%");
						drawSVG4("Average CT = 30 mins");
					}
					else if((model['number_travel']=='3 Travel lanes blocked') || (model['number_travel']=='4 Travel lanes blocked') 
					|| (model['number_travel']=='5+ Travel lanes blocked')){
						drawSVG1(10, 90, 32, 100, "5~45", "60%");
						drawSVG2(10, 110, 42, 120, "5~55", "70%");
						drawSVG3(10, 150, 62, 160, "5~75", "80%");
						drawSVG4("Average CT = 34 mins");
					}
				}
			}
			else if(model['blockage']=='Shoulder only blockage'){
				drawSVG1(0, 70, 17, 80, "0~35", "60%");
				drawSVG2(0, 80, 22, 90, "0~40", "70%");
				drawSVG3(0, 100, 32, 110, "0~50", "80%");
				drawSVG4("Average CT = 22 mins");
			}
		}
		else if(model['incident']=='Non-Collision incident'){
			drawSVG1(10, 30, 40, 110, "5~15", "65%");
			drawSVG2(10, 40, 50, 120, "5~20", "75%");
			drawSVG3(10, 60, 70, 140, "5~30", "80%");
			drawSVG4("Average CT = 20 mins");

			if(model['collision'] == 'Debris in Roadway'){
				drawSVG1(0, 20, 0, 30, "<10", "85%");
				drawSVG2(0, 40, 10, 50, "<20", "90%");
				drawSVG3(0, 60, 20, 70, "<30", "95%");
				drawSVG4("Average CT = 5 mins");
			}
			else if(model['collision'] == 'Disabled Vehicle'){
				drawSVG1(0, 30, 5, 40, "<15", "65%");
				drawSVG2(0, 40, 10, 50, "<20", "75%");
				drawSVG3(0, 60, 15, 70, "<30", "85%");
				drawSVG4("Average CT = 20 mins");
			}
			else if(model['collision'] == 'Police Activity'){
				drawSVG1(0, 60, 20, 70, "<30", "65%");
				drawSVG2(0, 90, 30, 100, "<45", "80%");
				drawSVG3(0, 120, 40, 130, "<60", "90%");
				drawSVG4("Average CT = 30 mins");
			}
			else if(model['collision'] == 'Utility Problem'){
				drawSVG1(120, 300, 180, 300, "60~240", "100%");
				drawSVG2(0, 0, 0, 0, "", "");
				drawSVG3(0, 0, 0, 0, "", "");
				drawSVG4("Average CT = 160 mins");
			}
			else if(model['collision'] == 'Weather Closure'){
				drawSVG1(10, 140, 30, 150, "5~70", "60%");
				drawSVG2(10, 180, 30, 190, "5~90", "70%");
				drawSVG3(10, 240, 30, 250, "5~120", "80%");
				drawSVG4("Average CT = 190 mins");
			}
			else if(model['collision'] == 'Others'){
				drawSVG1(0, 40, 10, 50, "<20", "65%");
				drawSVG2(0, 60, 20, 70, "<30", "75%");
				drawSVG3(0, 120, 40, 130, "<60", "90%");
				drawSVG4("Average CT = 25 mins");
			}

			else if(model['collision'] == 'Vehicles on Fire'){
				drawSVG1(10, 90, 30, 100, "5~45", "60%");
				drawSVG2(10, 120, 30, 130, "5~60", "70%");
				drawSVG3(10, 180, 30, 190, "5~90", "80%");
				drawSVG4("Average CT = 45 mins");
			}
			else if(model['collision'] == 'Emergency Roadwork'){
				$("#first_stop").text("100min");
				$("#second_stop").text("200min");
				$("#fourth_stop").text("400min");

				drawSVG1(10, 95, 40 , 105, "5~160", "60%");
				drawSVG2(10, 145, 60, 155, "5~240", "70%");
				drawSVG3(10, 195, 80, 205, "5~330", "80%");
				drawSVG4("Average CT = 170 mins");
			}
			else if(model['collision'] == 'Off-road Activity'){
				drawSVG1(0, 60, 20, 70, "<30", "60%");
				drawSVG2(0, 90, 20, 100, "<45", "70%");
				drawSVG3(0, 120, 20, 130, "<60", "80%");
				drawSVG4("Average CT = 40 mins");
			}
		}

		if(model['incident']!= null && model["involved_veh"]!= null && model["responder"]!= null && model["center_choice"]!= null &&
		model["pavement_condition"]!=null && model["hour_time"]!= null && model["location"]!=null){	
			if (model['incident'] == 'Collision incident') {
				if(model['blockage']=='Travel lane blockage'){
					if(model['collision']=='Fatality'){
						if((model['number_travel']=='4 Travel lanes blocked' || model['number_travel']=='5+ Travel lanes blocked') || (num_total > 2) || (num_truck > 1) || (num_tow > 1)){
							if(num_truck>0){CF_case4();}
							else{CF_case3();}
						}
						else{
							if(num_total>1){CF_case2();}
							else{CF_case1();}
						}
					}
					else if(model['collision']=='Personal Injury'){
						if(model['number_travel']=='1 Travel lane blocked'){
							checkresult = 'CPI1-0';
							if(checkresult == 'CPI1-0'){
								if(num_tow > 0 && num_responder > 4){checkresult = 'CPI1-2';}
								else if(shoulder_drop > 0 && num_responder > 4){checkresult = 'CPI1-2';}
								else if((involved_car_s=='over ') && ((weekend == 'Weekend') || (num_tow > 0))){checkresult = 'CPI1-2';}
								else if((num_total > 5) && ((hour == 'AM-peak') || (hour == 'PM-peak'))){checkresult = 'CPI1-2';}
								else if(((hour == 'AM-peak') || (first_responder=='FIREBOARD')) && (num_police > 1)){checkresult = 'CPI1-2';}
								else if((fall==1) && (first_responder=='FIREBOARD')){checkresult = 'CPI1-2';}
								else if((num_truck>0) && (num_van>0)){checkresult = 'CPI1-2';}
								else{checkresult = 'CPI1-1';}
							}
							if(checkresult == 'CPI1-2'){
								if((aux_lane == true) && ((num_responder>4) || (num_chart>1))){checkresult = 'CPI1-3';}
								else if((hazmat == true) || (num_tow>1) || (num_bus>0)){checkresult = 'CPI1-3';}
								else if(((num_police>2) || (weekend=='Weekend') || (pavement=='Wet')) && (num_pickup>0)){checkresult = 'CPI1-3';}
								else if((num_truck>0) && (num_tow>0)){checkresult = 'CPI1-3';}
								else{checkresult = 'CPI1-2';}	
							}
							if(checkresult == 'CPI1-3'){
								if((num_total>1) && (num_responder>6)){checkresult = 'CPI1-4';}
								else{checkresult = 'CPI1-3';}		
							}

							if(checkresult == 'CPI1-1'){CPI1_case1();}
							else if(checkresult == 'CPI1-2'){CPI1_case2();}
							else if(checkresult == 'CPI1-3'){CPI1_case3();}
							else if(checkresult == 'CPI1-4'){CPI1_case4();}
						}
						else if(model['number_travel']=='2 Travel lanes blocked'){
							checkresult = 'CPI2-0';
							if(checkresult == 'CPI2-0'){
								if(num_tow > 0){checkresult = 'CPI2-2';}
								else if(((num_responder>3) || (first_responder=='POLICE') || (num_truck>0)) && (num_total>3)){checkresult = 'CPI2-2';}
								else if(((daytime==1) || (num_total>2)) && (involved_car_s == 'over ' || involved_truck_s == 'over ' || involved_bus_s == 'over ' || involved_pickup_s == 'over ' || involved_van_s == 'over ')){checkresult = 'CPI2-2';}
								else if((num_total>1) && (num_motor>0)){checkresult = 'CPI2-2';}
								else if(((aux_lane==true) && (num_pickup>0)) || (num_responder>6)){checkresult = 'CPI2-2';}
								else{checkresult = 'CPI2-1';}
							}
							if(checkresult == 'CPI2-2'){
								if((num_tow>1) && (num_total>3)){checkresult = 'CPI2-3';}
								else if(num_responder>6){checkresult = 'CPI2-3';}
								else if(((aux_lane==true) || (pavement=='Wet')) && (num_responder>5)){checkresult = 'CPI2-3';}
								else if(((aux_lane==true) || (hour == 'Night time')) && (involved_car_s == 'over ' || involved_truck_s == 'over ' || involved_bus_s == 'over ' || involved_pickup_s == 'over ' || involved_van_s == 'over ')){checkresult = 'CPI2-3';}
								else if((num_fireboard>1) || (pavement=='Snow/Ice')){checkresult = 'CPI2-3';}
								else{checkresult = 'CPI2-2';}		
							}
							if(checkresult == 'CPI2-3'){
								if((num_responder>7) || (num_total>5)){checkresult = 'CPI2-4';}
								else{checkresult = 'CPI2-3';}
							}

							if(checkresult == 'CPI2-1'){CPI2_case1();}
							else if(checkresult == 'CPI2-2'){CPI2_case2();}
							else if(checkresult == 'CPI2-3'){CPI2_case3();}
							else if(checkresult == 'CPI2-4'){CPI2_case4();}
						}
						else if((model['number_travel']=='3 Travel lanes blocked') || (model['number_travel']=='4 Travel lanes blocked') 
						|| (model['number_travel']=='5+ Travel lanes blocked')){
							checkresult = 'CPI3-0';
							if(checkresult == 'CPI3-0'){
								if((num_tow>0) || (involved_car_s=='jack ' || involved_truck_s=='jack ' || involved_bus_s=='jack ' || involved_pickup_s=='jack ' || involved_van_s=='jack ' || involved_car_s == 'over ' || involved_truck_s == 'over ' || involved_bus_s == 'over ' || involved_pickup_s=='over ' || involved_van_s == 'over ' || involved_car_s == 'lost ' || involved_truck_s == 'lost ' || involved_bus_s == 'lost ' || involved_pickup_s=='lost ' || involved_van_s == 'lost ')){checkresult = 'CPI3-2';}
								else if((num_police>1) || (num_responder>5)){checkresult = 'CPI3-2';}
								else if((num_responder>3) && (aux_lane==true)){checkresult = 'CPI3-2';}
								else if((num_bus>0) || (pavement=='Chemical wet') || (num_truck>1)){checkresult = 'CPI3-2';}
								else if(((num_pickup>0) || (num_truck>0)) && (pavement=='Wet')){checkresult = 'CPI3-2';}
								else{checkresult = 'CPI3-1';}
							}
							if(checkresult == 'CPI3-2'){
								if(num_responder>8){checkresult = 'CPI3-3';}
								else if(((num_responder>5) || (season=='Winter') || (num_tow>1)) && (num_total>2)){checkresult = 'CPI3-3';}
								else if((weekend=='Weekend') && (first_responder=='FIREBOARD')){checkresult = 'CPI3-3';}
								else if((nonholiday==1) && (num_truck>0)){checkresult = 'CPI3-3';}
								else{checkresult = 'CPI3-2';}		
							}
							if(checkresult == 'CPI3-3'){
								if(num_responder>9){checkresult = 'CPI3-4';}
								else if((num_chart>1) && (weekend=='Weekend')){checkresult = 'CPI3-4';}
								else if(nonholiday==1){checkresult = 'CPI3-4';}
								else{checkresult = 'CPI3-3';}
							}

							if(checkresult == 'CPI3-1'){CPI3_case1();}
							else if(checkresult == 'CPI3-2'){CPI3_case2();}
							else if(checkresult == 'CPI3-3'){CPI3_case3();}
							else if(checkresult == 'CPI3-4'){CPI3_case4();}
						}
					}
					else if(model['collision']=='Property Damage only'){
						if(model['number_travel']=='1 Travel lane blocked'){
							checkresult = 'CPD1-0';
							if(checkresult == 'CPD1-0'){
								if((num_tow>0) && (num_fireboard>0)){checkresult = 'CPD1-2';}
								else if((num_tow>0) && (first_responder=='POLICE')){checkresult = 'CPD1-2';}
								else if((num_chart>2) && (first_responder=='CHART')){checkresult = 'CPD1-2';}
								else if(((weekend=='Weekend') || (hour=='AM-peak' || hour=='PM-peak') || (num_police>2) || (num_truck>0) || (num_pickup>0)) && (num_responder>4)){checkresult = 'CPD1-2';}
								else if((aux_lane==true) && ((involved_car_s=='over ' || involved_truck_s=='over ' || involved_bus_s=='over ' || involved_pickup_s=='over ' || involved_van_s=='over ') || (nonholiday==1))){checkresult = 'CPD1-2';}
								else if(((num_total>2) || (num_tow>0)) && (num_pickup>0)){checkresult = 'CPD1-2';}
								else{checkresult = 'CPD1-1';}
							}
							if(checkresult == 'CPD1-2'){
								if(((num_responder>4) || (weekend=='Weekend') || (num_pickup>0)) && (num_truck>0)){checkresult = 'CPD1-3';}
								else if((num_pickup>0) && (num_total>2)){checkresult = 'CPD1-3';}
								else if((daytime==1) && (first_responder=='FIREBOARD')){checkresult = 'CPD1-3';}
								else if(involved_car_s=='jack ' || involved_truck_s=='jack ' || involved_bus_s=='jack ' || involved_pickup_s=='jack ' || involved_van_s=='jack '){checkresult = 'CPD1-3';}
								else{checkresult = 'CPD1-2';}
							}
							if(checkresult == 'CPD1-3'){
								if((num_truck>0) && ((num_responder>5) || (aux_lane==true))){checkresult = 'CPD1-4';}
								else{checkresult = 'CPD1-3';}
							}

							if(checkresult == 'CPD1-1'){CPD1_case1();}
							else if(checkresult == 'CPD1-2'){CPD1_case2();}
							else if(checkresult == 'CPD1-3'){CPD1_case3();}
							else if(checkresult == 'CPD1-4'){CPD1_case4();}
						}
						else if(model['number_travel']=='2 Travel lanes blocked'){
							checkresult = 'CPD2-0';
							if(checkresult == 'CPD2-0'){
								if((num_tow>0) && (num_fireboard>0)){checkresult = 'CPD2-2';}
								else if(((hour=='AM-peak' || hour=='PM-peak') || (num_chart>2)) && (num_truck>0)){checkresult = 'CPD2-2';}
								else if(((nighttime==1) || (num_responder>4)) && (num_police>1)){checkresult = 'CPD2-2';}
								else if(((weekend=='Weekend') || (num_total>1)) && (num_tow>0)){checkresult = 'CPD2-2';}
								else if((num_total>5) || (num_pickup>0)){checkresult = 'CPD2-2';}
								else{checkresult = 'CPD2-1';}
							}
							if(checkresult == 'CPD2-2'){
								if(num_tow>1){checkresult = 'CPD2-3';}
								else if(((num_truck>0) || (num_total>2)) && (nighttime==1)){checkresult = 'CPD2-3';}
								else if((num_total>2) && (first_responder=='POLICE')){checkresult = 'CPD2-3';}
								else{checkresult = 'CPD2-2';}
							}
							if(checkresult == 'CPD2-3'){
								if(num_responder>7){checkresult = 'CPD2-4';}
								else if(num_tow>1){checkresult = 'CPD2-4';}
								else{checkresult = 'CPD2-3';}
							}
	
							if(checkresult == 'CPD2-1'){CPD2_case1();}
							else if(checkresult == 'CPD2-2'){CPD2_case2();}
							else if(checkresult == 'CPD2-3'){CPD2_case3();}
							else if(checkresult == 'CPD2-4'){CPD2_case4();}
						}
						else if((model['number_travel']=='3 Travel lanes blocked') || (model['number_travel']=='4 Travel lanes blocked') 
						|| (model['number_travel']=='5+ Travel lanes blocked')){
							checkresult = 'CPD3-0';
							if(checkresult == 'CPD3-0'){
								if(num_tow > 0){checkresult = 'CPD3-2';}
								else if((num_responder>4) && ((first_responder=='FIREBOARD') || (num_pickup>0) || (pavement=='Wet'))){checkresult = 'CPD3-2';}
								else if(involved_car_s=='jack ' || involved_truck_s=='jack ' || involved_bus_s=='jack ' || involved_pickup_s=='jack ' || involved_van_s=='jack '){checkresult = 'CPD3-2';}
								else{checkresult = 'CPD3-1';}
							}
							if(checkresult == 'CPD3-2'){
								if((num_tow>1) || (hazmat == true)){checkresult = 'CPD3-3';}
								else if(((hour=='AM-peak' || hour=='PM-peak') || (num_responder>5)) && (num_total>1)){checkresult = 'CPD3-3';}
								else{checkresult = 'CPD3-2';}
							}
							if(checkresult == 'CPD3-3'){
								if(num_responder>6){checkresult = 'CPD3-4';}
								else if((nighttime==1) && (num_truck>0)){checkresult = 'CPD3-4';}
								else{checkresult = 'CPD3-3';}
							}
	
							if(checkresult == 'CPD3-1'){CPD3_case1();}
							else if(checkresult == 'CPD3-2'){CPD3_case2();}
							else if(checkresult == 'CPD3-3'){CPD3_case3();}
							else if(checkresult == 'CPD3-4'){CPD3_case4();}
						}
					}
				}
				else if(model['blockage']=='Shoulder only blockage'){
					prob = 1/(1+Math.exp(-(-2.27-0.47*bc+0.07*cecil-0.28*harford+0.41*dry+0.98*snow+0.33*unspecified+0.84*wet-0.38*week+0.3*nonholiday_sh
						-0.23*num_total+0.52*num_car+1.04*num_truck+0.26*num_responder+0.34*num_fireboard+0.43*num_medical-0.23*cpi
						+0.48*spring+0.37*summer+0.54*winter+0.08*daytime+0.23*nighttime)));
					console.log(prob);

					if(num_tow > 0){shoulder_case2();}
					else if(center != 'AOC'){shoulder_case1();}
					else if(num_responder == 1 && pavement == 'Dry'){shoulder_case1();}
					else if(shoulder_drop == 2){shoulder_case2();}
					else if((cpi == 1 && hour == 'AM-peak') || (cpi == 1 && hour =='Night time')){shoulder_case2();}
					else if(hour == 'PM-peak'){shoulder_case1();}
					else if(prob <= 0.4 && num_truck == 0){shoulder_case1();}
					else if(prob > 0.5 && num_fireboard > 0){shoulder_case2();}
					else{shoulder_case3();}
				}
			}
			else if (model['incident'] == 'Non-Collision incident') {
				if(model['collision'] == 'Vehicles on Fire'){
					 drawSVG1(10, 90, 30, 100, "5~45", "60%");
					 drawSVG2(10, 120, 30, 130, "5~60", "70%");
					 drawSVG3(10, 180, 30, 190, "5~90", "80%");
					 drawSVG4("Average CT = 45 mins");
				}
				else if(model['collision'] == 'Emergency Roadwork'){
					$("#first_stop").text("100min");
					$("#second_stop").text("200min");
					$("#fourth_stop").text("400min");

					drawSVG1(10, 95, 40 , 105, "5~160", "60%");
					drawSVG2(10, 145, 60, 155, "5~240", "70%");
					drawSVG3(10, 195, 80, 205, "5~330", "80%");
					drawSVG4("Average CT = 170 mins");
				}
				else if(model['collision'] == 'Off-road Activity'){
					 drawSVG1(0, 60, 20, 70, "<30", "60%");
					 drawSVG2(0, 90, 20, 100, "<45", "70%");
					 drawSVG3(0, 120, 20, 130, "<60", "80%");
					 drawSVG4("Average CT = 40 mins");
				}
			}
		}
	}
	else if(road=='I-695'){
		if(model['incident']=='Collision incident'){
			drawSVG1(20, 90, 40, 100, "10~55", "60%");
			drawSVG2(10, 120, 40, 130, "5~60", "70%");
			drawSVG3(10, 150, 40, 160, "5~75", "80%");
			drawSVG4("Average CT = 36 mins");

			if(model['blockage']=='Travel lane blockage'){
				drawSVG1(20, 100, 40, 110, "10~50", "60%");
				drawSVG2(20, 120, 40, 130, "10~60", "70%");
				drawSVG3(20, 170, 40, 180, "10~85", "80%");
				drawSVG4("Average CT = 37 mins");

				if(model['collision']=='Fatality'){
					$("#first_stop").text("100min");
					$("#second_stop").text("200min");
					$("#fourth_stop").text("400min");

					drawSVG1(102, 177, 120, 187, "170~295", "60%");
					drawSVG2(102, 186, 120, 196, "170~310", "70%");
					drawSVG3(99, 198, 120, 208, "165~330", "80%");
					drawSVG4("Average CT = 227 mins");
				}

				else if(model['collision']=='Personal Injury'){
					drawSVG1(30, 120, 50, 130, "15~60", "60%");
					drawSVG2(20, 140, 50, 150, "10~70", "70%");
					drawSVG3(20, 160, 50, 170, "10~80", "80%");
					drawSVG4("Average CT = 43 mins");
									
					if(model['number_travel']=='1 Travel lane blocked'){
						drawSVG1(30, 120, 50, 130, "15~60", "60%");
						drawSVG2(20, 140, 50, 150, "10~70", "70%");
						drawSVG3(10, 140, 50, 150, "5~70", "80%");
						drawSVG4("Average CT = 39 mins");
					}
					else if(model['number_travel']=='2 Travel lanes blocked'){
						drawSVG1(30, 120, 57, 130, "15~60", "60%");
						drawSVG2(30, 130, 62, 140, "15~65", "70%");
						drawSVG3(30, 180, 87, 190, "15~90", "80%");
						drawSVG4("Average CT = 43 mins");
					}
					else if((model['number_travel']=='3 Travel lanes blocked') || (model['number_travel']=='4 Travel lanes blocked') 
					|| (model['number_travel']=='5+ Travel lanes blocked')){
						drawSVG1(40, 160, 80, 170, "20~80", "60%");
						drawSVG2(40, 210, 100, 220, "20~105", "70%");
						drawSVG3(30, 210, 100, 220, "15~105", "80%");
						drawSVG4("Average CT = 57 mins");
					}
				}
				else if(model['collision']=='Property Damage only'){
					drawSVG1(20, 100, 42, 110, "10~50", "60%");
					drawSVG2(10, 110, 45, 120, "5~55", "70%");
					drawSVG3(10, 120, 50, 130, "5~60", "80%");
					drawSVG4("Average CT = 33 mins");	
					if(model['number_travel']=='1 Travel lane blocked'){
						drawSVG1(20, 100, 42, 110, "10~50", "60%");
						drawSVG2(10, 100, 39, 110, "5~50", "70%");
						drawSVG3(10, 130, 54, 140, "5~65", "80%");
						drawSVG4("Average CT = 32 mins");
					}
					else if(model['number_travel']=='2 Travel lanes blocked'){
						drawSVG1(30, 100, 50, 110, "15~50", "60%");
						drawSVG2(20, 110, 50, 120, "10~55", "70%");
						drawSVG3(20, 130, 50, 140, "10~65", "80%");
						drawSVG4("Average CT = 35 mins");
					}
					else if((model['number_travel']=='3 Travel lanes blocked') || (model['number_travel']=='4 Travel lanes blocked') 
					|| (model['number_travel']=='5+ Travel lanes blocked')){
						drawSVG1(30, 120, 45, 130, "15~60", "60%");
						drawSVG2(30, 160, 45, 170, "15~80", "70%");
						drawSVG3(20, 190, 45, 200, "10~95", "80%");
						drawSVG4("Average CT = 47 mins");
					}
				}
			}
			else if(model['blockage']=='Shoulder only blockage'){
				drawSVG1(10, 90, 25, 100, "5~45", "60%");
				drawSVG2(10, 110, 25, 120, "5~55", "70%");
				drawSVG3(0, 130, 25, 140, "0~65", "80%");
				drawSVG4("Average CT = 28 mins");
			}
		}
		else if(model['incident']=='Non-Collision incident'){
			drawSVG1(10, 30, 40, 110, "5~15", "65%");
			drawSVG2(10, 40, 50, 120, "5~20", "75%");
			drawSVG3(10, 60, 70, 140, "5~30", "80%");
			drawSVG4("Average CT = 20 mins");

			if(model['collision'] == 'Debris in Roadway'){
				drawSVG1(0, 20, 0, 30, "<10", "85%");
				drawSVG2(0, 40, 10, 50, "<20", "90%");
				drawSVG3(0, 60, 20, 70, "<30", "95%");
				drawSVG4("Average CT = 5 mins");
			}
			else if(model['collision'] == 'Disabled Vehicle'){
				drawSVG1(0, 30, 5, 40, "<15", "65%");
				drawSVG2(0, 40, 10, 50, "<20", "75%");
				drawSVG3(0, 60, 15, 70, "<30", "85%");
				drawSVG4("Average CT = 20 mins");
			}
			else if(model['collision'] == 'Police Activity'){
				drawSVG1(0, 60, 20, 70, "<30", "65%");
				drawSVG2(0, 90, 30, 100, "<45", "80%");
				drawSVG3(0, 120, 40, 130, "<60", "90%");
				drawSVG4("Average CT = 30 mins");
			}
			else if(model['collision'] == 'Utility Problem'){
				drawSVG1(120, 300, 180, 300, "60~240", "100%");
				drawSVG2(0, 0, 0, 0, "", "");
				drawSVG3(0, 0, 0, 0, "", "");
				drawSVG4("Average CT = 160 mins");
			}
			else if(model['collision'] == 'Weather Closure'){
				drawSVG1(10, 140, 30, 150, "5~70", "60%");
				drawSVG2(10, 180, 30, 190, "5~90", "70%");
				drawSVG3(10, 240, 30, 250, "5~120", "80%");
				drawSVG4("Average CT = 190 mins");
			}
			else if(model['collision'] == 'Others'){
				drawSVG1(0, 40, 10, 50, "<20", "65%");
				drawSVG2(0, 60, 20, 70, "<30", "75%");
				drawSVG3(0, 120, 40, 130, "<60", "90%");
				drawSVG4("Average CT = 25 mins");
			}
			else if(model['collision'] == 'Vehicles on Fire'){
				drawSVG1(10, 90, 30, 100, "5~45", "60%");
				drawSVG2(10, 120, 30, 130, "5~60", "70%");
				drawSVG3(10, 180, 30, 190, "5~90", "80%");
				drawSVG4("Average CT = 45 mins");
			}
			else if(model['collision'] == 'Emergency Roadwork'){
				$("#first_stop").text("100min");
				$("#second_stop").text("200min");
				$("#fourth_stop").text("400min");

				drawSVG1(10, 95, 40 , 105, "5~160", "60%");
				drawSVG2(10, 145, 60, 155, "5~240", "70%");
				drawSVG3(10, 195, 80, 205, "5~330", "80%");
				drawSVG4("Average CT = 170 mins");
			}
			else if(model['collision'] == 'Off-road Activity'){
				drawSVG1(0, 60, 20, 70, "<30", "60%");
				drawSVG2(0, 90, 20, 100, "<45", "70%");
				drawSVG3(0, 120, 20, 130, "<60", "80%");
				drawSVG4("Average CT = 40 mins");
			}
		}

		if(model['incident']!= null && model["involved_veh"]!= null && model["responder"]!= null && model["center_choice"]!= null &&
		model["pavement_condition"]!=null && model["hour_time"]!= null && model["location"]!=null){
			if (model['incident'] == 'Collision incident') {
				if(model['blockage']=='Travel lane blockage'){ //For CF Cases, only 1 and 2 exist for I-695
					if(model['collision']=='Fatality'){
						if((weekend == 'Weekend') && (num_total > 2)){CF_case2();}
						else{CF_case1();}
					}
					else if(model['collision']=='Personal Injury'){
						if(model['number_travel']=='1 Travel lane blocked'){
							checkresult = 'CPI1-0';
							if(checkresult == 'CPI1-0'){
								if(num_tow > 0){checkresult = 'CPI1-2';}
								else if(first_responder == 'FIREBOARD'){checkresult = 'CPI1-1';}
								else if((center=='TOC4') && num_truck==0){checkresult = 'CPI1-1';}
								else if(num_chart > 1 && first_responder=='POLICE'){checkresult = 'CPI1-2';}
								else if(num_truck > 1 && num_responder > 3){checkresult = 'CPI1-2';}
								else if((num_pickup > 0) && (num_responder > 2 || num_police > 0)){checkresult = 'CPI1-2';}
								else{checkresult = 'CPI1-1';}
							}
							if(checkresult == 'CPI1-2'){
								if((hour == 'Night time' && num_responder > 6) || (num_total > 4)){checkresult = 'CPI1-3';}
								else if((pavement == 'Snow/Ice') || (num_truck > 1) || (num_responder > 7) || (center == 'AOC')){checkresult = 'CPI1-3';}
								else if((num_pickup > 0) && ((aux_lane == true) || (season == 'Winter'))){checkresult = 'CPI1-3';}
								else if((weekend == 'Weekend') && (involved_car_s == 'over ')){checkresult = 'CPI1-3';}
								else if((num_police > 1) && (num_fireboard > 1)){checkresult = 'CPI1-3';}
								else{checkresult = 'CPI1-2';}
							}
							if(checkresult == 'CPI1-3'){
								if((num_truck > 0) && (num_responder > 5)){checkresult = 'CPI1-4';}
								else if((toll_lane == true) || (shoulder_drop > 1)){checkresult = 'CPI1-4';}
								else{checkresult = 'CPI1-3';}
							}

							if(checkresult == 'CPI1-1'){CPI1_case1();}
							else if(checkresult == 'CPI1-2'){CPI1_case2();}
							else if(checkresult == 'CPI1-3'){CPI1_case3();}
							else if(checkresult == 'CPI1-4'){CPI1_case4();}
						}
						else if(model['number_travel']=='2 Travel lanes blocked'){
							checkresult = 'CPI2-0';
							if(checkresult == 'CPI2-0'){
								if(num_tow > 0){checkresult = 'CPI2-2';}
								else if(((hour == 'AM-peak') || (hour == 'PM-peak')) && (num_responder > 4)){checkresult = 'CPI2-2';}
								else if((weekend == 'Weekend') && (center == 'SOC')){checkresult = 'CPI2-2';}
								else if(num_responder > 5){checkresult = 'CPI2-2';}
								else{checkresult = 'CPI2-1';}
							}
							if(checkresult == 'CPI2-2'){
								if((hour == 'Night time') && ((num_police > 1) || (num_responder > 5))){checkresult = 'CPI2-3';}
								else if((pavement == 'Snow/Ice') || ((num_responder > 7) && (aux_lane==true))){checkresult = 'CPI2-3';}
								else{checkresult = 'CPI2-2';}
							}
							if(checkresult == 'CPI2-3'){
								if((pavement == 'Wet') || (num_total>4)){checkresult = 'CPI2-4';}
								else{checkresult = 'CPI2-3';}
							}

							if(checkresult == 'CPI2-1'){CPI2_case1();}
							else if(checkresult == 'CPI2-2'){CPI2_case2();}
							else if(checkresult == 'CPI2-3'){CPI2_case3();}
							else if(checkresult == 'CPI2-4'){CPI2_case4();}
						}
						else if((model['number_travel']=='3 Travel lanes blocked') || (model['number_travel']=='4 Travel lanes blocked') 
						|| (model['number_travel']=='5+ Travel lanes blocked')){
							checkresult = 'CPI3-0';
							if(checkresult == 'CPI3-0'){
								if((center=='SOC') || (num_truck > 0) || (num_total > 2)){checkresult = 'CPI3-2';}
								else if(first_responder == 'FIREBOARD'){checkresult = 'CPI3-2';}
								else if((num_responder > 5) || ((involved_car_s == 'over ') || (involved_truck_s == 'over ') || (involved_bus_s == 'over ')) || (shoulder_drop > 1)){checkresult = 'CPI3-2';}			
								else{checkresult = 'CPI3-1';}
							}
							if(checkresult == 'CPI3-2'){
								if(num_medical > 0){checkresult = 'CPI3-3';}
								else if(num_responder > 8){checkresult = 'CPI3-3';}
								else if(num_tow == 0){checkresult = 'CPI3-2';}
								else if((num_tow > 1) && ((num_responder > 5) || (num_chart > 1))){checkresult = 'CPI3-3';}
								else{checkresult = 'CPI3-2';}
							}
							if(checkresult == 'CPI3-3'){
								if((travel_drop > 4) && (num_chart > 2)){checkresult = 'CPI3-4';}
								else if((pavement == 'Wet') & (num_tow > 2)){checkresult = 'CPI3-4';}
								else{checkresult = 'CPI3-3';}
							}

							if(checkresult == 'CPI3-1'){CPI3_case1();}
							else if(checkresult == 'CPI3-2'){CPI3_case2();}
							else if(checkresult == 'CPI3-3'){CPI3_case3();}
							else if(checkresult == 'CPI3-4'){CPI3_case4();}
						}
					}
					else if(model['collision']=='Property Damage only'){
						if(model['number_travel']=='1 Travel lane blocked'){
							checkresult = 'CPD1-0';
							if(checkresult == 'CPD1-0'){
								if((num_tow > 0) || (hazmat == true)){checkresult = 'CPD1-2';}
								else if((num_police == 0) || ((num_fireboard == 0) && ((hour == 'AM-peak') || (hour == 'PM-peak')))){checkresult = 'CPD1-1';}
								else if(((hour == 'Day time') && (num_responder > 4)) || ((num_truck > 0) && (num_police > 1))){checkresult = 'CPD1-2';}
								else if(((pavement == 'Snow/Ice') && ((num_truck > 0) || (num_responder > 3))) || ((num_total > 3) && (first_responder=='FIREBOARD'))){checkresult = 'CPD1-2';}
								else if((center=='TOC4') && (aux_lane==false)){checkresult = 'CPD1-1';}
								else if((season == 'Winter') && (num_pickup > 0)){checkresult = 'CPD1-2';}
								else if((num_truck > 0) && ((center=='TOC4') || (num_chart > 1))){checkresult = 'CPD1-2';}
								else if((num_chart > 2) || ((num_responder > 4) && (pavement == 'Wet'))){checkresult = 'CPD1-2';}
								else if((num_chart > 1) && (num_pickup > 0)){checkresult = 'CPD1-2';}
								else{checkresult = 'CPD1-1';}
							}
							if(checkresult == 'CPD1-2'){
								if((hour == 'Night time') && (num_responder > 5)){checkresult = 'CPD1-3';}
								else if((num_responder > 6) || (involved_truck_s == 'over ') || (num_bus > 0) || ((involved_car_s == 'lost ') || (involved_truck_s == 'lost ') || (involved_bus_s == 'lost ') || (involved_pickup_s == 'lost '))){checkresult = 'CPD1-3';}
								else if(((pavement == 'Snow/Ice') && (weekend == 'Weekend')) || (num_truck > 1)){checkresult = 'CPD1-3';}
								else if((num_responder > 4) && ((nonholiday == 1) || (num_pickup > 0) || (num_total > 3))){checkresult = 'CPD1-3';}
								else{checkresult = 'CPD1-2';}
							}
							if(checkresult == 'CPD1-3'){
								if((num_truck > 0) && (((involved_car_s == 'over ') || (involved_truck_s == 'over ') || (involved_bus_s == 'over ')) || (pavement == 'Wet') || (pavement == 'Snow/Ice'))){checkresult = 'CPD1-4';}
								else if((num_total > 2) && (first_responder=='FIREBOARD')){checkresult = 'CPD1-4';}
								else{checkresult = 'CPD1-3';}
							}

							if(checkresult == 'CPD1-1'){CPD1_case1();}
							else if(checkresult == 'CPD1-2'){CPD1_case2();}
							else if(checkresult == 'CPD1-3'){CPD1_case3();}
							else if(checkresult == 'CPD1-4'){CPD1_case4();}
						}
						else if(model['number_travel']=='2 Travel lanes blocked'){
							checkresult = 'CPD2-0';
							if(checkresult == 'CPD2-0'){
								if((num_tow > 0) && (num_fireboard > 0)){checkresult = 'CPD2-2';}
								else if((num_tow > 0) && ((num_total > 2) || (aux_lane==true))){checkresult = 'CPD2-2';}
								else if((involved_car_s=='over ') || (shoulder_drop > 1) || (num_truck > 0) || (num_pickup > 0)){checkresult = 'CPD2-2';}
								else if((pavement=='Snow/Ice') || (pavement == 'Chemical wet') || (involved_truck_s=='jack ') || (num_responder > 6)){checkresult = 'CPD2-2';}
								else{checkresult = 'CPD2-1';}
							}
							if(checkresult == 'CPD2-2'){
								if((weekend == 'Weekend') && (hour == 'Night time') && (num_total > 2) && (num_tow > 0)){checkresult = 'CPD2-3';}
								else if((num_truck > 0) && (num_responder > 5)){checkresult = 'CPD2-3';}
								else if((num_responder > 4) && (pavement == 'Wet')){checkresult = 'CPD2-3';}
								else if((weekend == 'Weekend') && ((involved_car_s == 'over ') || (involved_truck_s == 'over ') || (involved_bus_s == 'over ') || (involved_pickup_s == 'over '))){checkresult = 'CPD2-3';}
								else{checkresult = 'CPD2-2';}
							}
							if(checkresult == 'CPD2-3'){
								if(num_responder > 9){checkresult = 'CPD2-4';}
								else if((num_responder > 5) && (num_pickup > 0)){checkresult = 'CPD2-4';}
								else{checkresult = 'CPD2-3';}
							}
	
							if(checkresult == 'CPD2-1'){CPD2_case1();}
							else if(checkresult == 'CPD2-2'){CPD2_case2();}
							else if(checkresult == 'CPD2-3'){CPD2_case3();}
							else if(checkresult == 'CPD2-4'){CPD2_case4();}
						}
						else if((model['number_travel']=='3 Travel lanes blocked') || (model['number_travel']=='4 Travel lanes blocked') 
						|| (model['number_travel']=='5+ Travel lanes blocked')){
							checkresult = 'CPD3-0';
							if(checkresult == 'CPD3-0'){
								if(num_tow > 0){checkresult = 'CPD3-2';}
								else if((hour == 'Night time') && ((num_chart > 1) || (num_truck > 0))){checkresult = 'CPD3-2';}
								else{checkresult = 'CPD3-1';}
							}
							if(checkresult == 'CPD3-2'){
								if((shoulder_drop > 1) && (num_responder > 3)){checkresult = 'CPD3-3';}
								else if((num_total > 4) || (nonholiday == 1)){checkresult = 'CPD3-3';}
								else{checkresult = 'CPD3-2';}
							}
							if(checkresult == 'CPD3-3'){
								if((num_chart > 3) || (num_responder > 8)){checkresult = 'CPD3-4';}
								else{checkresult = 'CPD3-3';}
							}
	
							if(checkresult == 'CPD3-1'){CPD3_case1();}
							else if(checkresult == 'CPD3-2'){CPD3_case2();}
							else if(checkresult == 'CPD3-3'){CPD3_case3();}
							else if(checkresult == 'CPD3-4'){CPD3_case4();}
						}
					}
				}
				else if(model['blockage']=='Shoulder only blockage'){
					prob = 1/(1+Math.exp(-(-2.27-0.47*bc+0.07*cecil-0.28*harford+0.41*dry+0.98*snow+0.33*unspecified+0.84*wet-0.38*week+0.3*nonholiday_sh
						-0.23*num_total+0.52*num_car+1.04*num_truck+0.26*num_responder+0.34*num_fireboard+0.43*num_medical-0.23*cpi
						+0.48*spring+0.37*summer+0.54*winter+0.08*daytime+0.23*nighttime)));
					console.log(prob);
	
					if(num_tow > 0){shoulder_case2();}
					else if(center != 'AOC'){shoulder_case1();}
					else if(num_responder == 1 && pavement == 'Dry'){shoulder_case1();}
					else if(shoulder_drop == 2){shoulder_case2();}
					else if((cpi == 1 && hour == 'AM-peak') || (cpi == 1 && hour =='Night time')){shoulder_case2();}
					else if(hour == 'PM-peak'){shoulder_case1();}
					else if(prob <= 0.4 && num_truck == 0){shoulder_case1();}
					else if(prob > 0.5 && num_fireboard > 0){shoulder_case2();}
					else{shoulder_case3();}
				}
			}
			else if (model['incident'] == 'Non-Collision incident') {
				if(model['collision'] == 'Vehicles on Fire'){
					 drawSVG1(10, 90, 30, 100, "5~45", "60%");
					 drawSVG2(10, 120, 30, 130, "5~60", "70%");
					 drawSVG3(10, 180, 30, 190, "5~90", "80%");
					 drawSVG4("Average CT = 45 mins");
				}
				else if(model['collision'] == 'Emergency Roadwork'){
					$("#first_stop").text("100min");
					$("#second_stop").text("200min");
					$("#fourth_stop").text("400min");

					drawSVG1(10, 95, 40, 105, "5~160", "60%");
					drawSVG2(10, 145, 60, 155, "5~240", "70%");
					drawSVG3(10, 195, 80, 205, "5~330", "80%");
					drawSVG4("Average CT = 170 mins");
				}
				else if(model['collision'] == 'Off-road Activity'){
					 drawSVG1(0, 60, 20, 70, "<30", "60%");
					 drawSVG2(0, 90, 20, 100, "<45", "70%");
					 drawSVG3(0, 120, 20, 130, "<60", "80%");
					 drawSVG4("Average CT = 40 mins");
				}
			}
		}
	}
	else if(road=='I-70'){
		if(model['incident']=='Collision incident'){
			drawSVG1(20, 140, 62, 150, "10~70", "60%");
			drawSVG2(10, 160, 67, 170, "5~80", "70%");
			drawSVG3(10, 210, 92, 220, "5~105", "80%");
			drawSVG4("Average CT = 51 mins");
			if(model['blockage']=='Travel lane blockage'){
				drawSVG1(30, 160, 77, 170, "15~80", "60%");
				drawSVG2(20, 200, 92, 210, "10~100", "70%");
				drawSVG3(10, 240, 107, 250, "5~120", "80%");
				drawSVG4("Average CT = 60 mins");
				if(model['collision']=='Fatality'){
					$("#first_stop").text("100min");
					$("#second_stop").text("200min");
					$("#fourth_stop").text("400min");

					drawSVG1(123, 300, 186, 300, "205~580", "60%");
					drawSVG2(111, 300, 180, 300, "185~595", "70%");
					drawSVG3(99, 300, 174, 300, "165~615", "80%");
					drawSVG4("Average CT = 389 mins");
				}
				else if(model['collision']=='Personal Injury'){
					drawSVG1(30, 160, 77, 170, "15~80", "60%");
					drawSVG2(30, 200, 97, 210, "15~100", "70%");
					drawSVG3(20, 240, 112, 250, "10~120", "80%");
					drawSVG4("Average CT = 61 mins");
					if(model['number_travel']=='1 Travel lane blocked'){
						drawSVG1(30, 150, 72, 160, "15~75", "60%");
						drawSVG2(20, 160, 72, 170, "10~80", "70%");
						drawSVG3(20, 200, 92, 210, "10~100", "80%");
						drawSVG4("Average CT = 51 mins");
							
					}
					else if((model['number_travel']=='2 Travel lanes blocked') || (model['number_travel']=='3 Travel lanes blocked') 
					|| (model['number_travel']=='4 Travel lanes blocked') || (model['number_travel']=='5+ Travel lanes blocked')){
						drawSVG1(30, 190, 92, 200, "15~95", "60%");
						drawSVG2(30, 210, 99, 220, "15~105", "70%");
						drawSVG3(20, 300, 139, 300, "10~175", "80%");
						drawSVG4("Average CT = 67 mins");
					}
				}
				else if(model['collision']=='Property Damage only'){
					drawSVG1(20, 130, 57, 140, "10~65", "60%");
					drawSVG2(20, 160, 72, 170, "10~80", "70%");
					drawSVG3(10, 200, 87, 210, "5~100", "80%");
					drawSVG4("Average CT = 45 mins");	
					if(model['number_travel']=='1 Travel lane blocked'){
						drawSVG1(20, 110, 47, 120, "10~55", "60%");
						drawSVG2(10, 130, 52, 140, "5~65", "70%");
						drawSVG3(10, 190, 82, 200, "5~85", "80%");
						drawSVG4("Average CT = 40 mins");
					}
					else if((model['number_travel']=='2 Travel lanes blocked') || (model['number_travel']=='3 Travel lanes blocked') 
					|| (model['number_travel']=='4 Travel lanes blocked') || (model['number_travel']=='5+ Travel lanes blocked')){
						drawSVG1(30, 210, 99, 220, "15~105", "60%");
						drawSVG2(20, 240, 109, 250, "10~120", "70%");
						drawSVG3(20, 280, 129, 290, "10~140", "80%");
						drawSVG4("Average CT = 58 mins");
					}
				}
			}
			else if(model['blockage']=='Shoulder only blockage'){
				drawSVG1(20, 140, 62, 150, "10~70", "60%");
				drawSVG2(10, 160, 67, 170, "5~80", "70%");
				drawSVG3(10, 210, 92, 220, "5~105", "80%");
				drawSVG4("Average CT = 51 mins");
			}
		}
		else if(model['incident']=='Non-Collision incident'){ //build awaiting instructions
			drawSVG1(10, 30, 40, 110, "5~15", "65%");
			drawSVG2(10, 40, 50, 120, "5~20", "75%");
			drawSVG3(10, 60, 70, 140, "5~30", "80%");
			drawSVG4("Average CT = 20 mins");		

			if(model['collision'] == 'Debris in Roadway'){
				drawSVG1(0, 20, 0, 30, "<10", "85%");
				drawSVG2(0, 40, 10, 50, "<20", "90%");
				drawSVG3(0, 60, 20, 70, "<30", "95%");
				drawSVG4("Average CT = 5 mins");
			}
			else if(model['collision'] == 'Disabled Vehicle'){
				drawSVG1(0, 30, 5, 40, "<15", "65%");
				drawSVG2(0, 40, 10, 50, "<20", "75%");
				drawSVG3(0, 60, 15, 70, "<30", "85%");
				drawSVG4("Average CT = 20 mins");
			}
			else if(model['collision'] == 'Police Activity'){
				drawSVG1(0, 60, 20, 70, "<30", "65%");
				drawSVG2(0, 90, 30, 100, "<45", "80%");
				drawSVG3(0, 120, 40, 130, "<60", "90%");
				drawSVG4("Average CT = 30 mins");
			}
			else if(model['collision'] == 'Utility Problem'){
				drawSVG1(120, 300, 180, 300, "60~240", "100%");
				drawSVG2(0, 0, 0, 0, "", "");
				drawSVG3(0, 0, 0, 0, "", "");
				drawSVG4("Average CT = 160 mins");
			}
			else if(model['collision'] == 'Weather Closure'){
				drawSVG1(10, 140, 30, 150, "5~70", "60%");
				drawSVG2(10, 180, 30, 190, "5~90", "70%");
				drawSVG3(10, 240, 30, 250, "5~120", "80%");
				drawSVG4("Average CT = 190 mins");
			}
			else if(model['collision'] == 'Others'){
				drawSVG1(0, 40, 10, 50, "<20", "65%");
				drawSVG2(0, 60, 20, 70, "<30", "75%");
				drawSVG3(0, 120, 40, 130, "<60", "90%");
				drawSVG4("Average CT = 25 mins");
			}
	
			else if(model['collision'] == 'Vehicles on Fire'){
				drawSVG1(10, 90, 30, 100, "5~45", "60%");
				drawSVG2(10, 120, 30, 130, "5~60", "70%");
				drawSVG3(10, 180, 30, 190, "5~90", "80%");
				drawSVG4("Average CT = 45 mins");
			}
			else if(model['collision'] == 'Emergency Roadwork'){
				$("#first_stop").text("100min");
				$("#second_stop").text("200min");
				$("#fourth_stop").text("400min");

				drawSVG1(10, 95, 40 , 105, "5~160", "60%");
				drawSVG2(10, 145, 60, 155, "5~240", "70%");
				drawSVG3(10, 195, 80, 205, "5~330", "80%");
				drawSVG4("Average CT = 170 mins");
			}
			else if(model['collision'] == 'Off-road Activity'){
				drawSVG1(0, 60, 20, 70, "<30", "60%");
				drawSVG2(0, 90, 20, 100, "<45", "70%");
				drawSVG3(0, 120, 20, 130, "<60", "80%");
				drawSVG4("Average CT = 40 mins");
			}	
		}

		if(model['incident']!= null && model["involved_veh"]!= null && model["responder"]!= null && model["center_choice"]!= null &&
		model["pavement_condition"]!=null && model["hour_time"]!= null && model["location"]!=null){
			if (model['incident'] == 'Collision incident') {
				if(model['blockage']=='Travel lane blockage'){
					if(model['collision']=='Fatality'){
						if((num_truck > 1) && (hazmat == true)){CF_case2();}
						else{CF_case1();}
					}
					else if(model['collision']=='Personal Injury'){
						if(model['number_travel']=='1 Travel lane blocked'){
							checkresult = 'CPI1-0';
							if(checkresult == 'CPI1-0'){
								if(num_tow > 0){checkresult = 'CPI1-2';}
								else if(num_total > 3){checkresult = 'CPI1-2';}
								else if(((hour == 'AM-peak') || (hour == 'PM-peak')) && num_total > 2){checkresult = 'CPI1-2';}
								else if(((hour != 'AM-peak') && (hour != 'PM-peak')) && first_responder=='POLICE'){checkresult = 'CPI1-2';}
								else if(first_responder == 'FIREBOARD'){checkresult = 'CPI1-1';}
								else{checkresult = 'CPI1-1';}
							}
							if(checkresult == 'CPI1-2'){
								if((weekend == 'Weekend') && (involved_car_s == 'over ')){checkresult = 'CPI1-3';}
								else if(hazmat == true || num_tow>1 || num_bus>0){checkresult = 'CPI1-3';}
								else if((pavement == 'Snow/Ice') || (num_truck > 1) || (num_responder > 7) || (center == 'AOC')){checkresult = 'CPI1-3';}
								else if(num_tow == 0 || num_truck == 0){checkresult = 'CPI1-2';}
								else if(num_total<3 || center=='TOC3'){checkresult = 'CPI1-2';}
								else{checkresult = 'CPI1-2';}	
							}
							if(checkresult == 'CPI1-3'){
								if(num_responder<4 || num_truck==0){checkresult = 'CPI1-3';}
								else if(num_responder>8){checkresult = 'CPI1-4';}
								else{checkresult = 'CPI1-3';}		
							}

							if(checkresult == 'CPI1-1'){CPI1_case1();}
							else if(checkresult == 'CPI1-2'){CPI1_case2();}
							else if(checkresult == 'CPI1-3'){CPI1_case3();}
							else if(checkresult == 'CPI1-4'){CPI1_case4();}
						}
						else if((model['number_travel']=='2 Travel lanes blocked') || (model['number_travel']=='3 Travel lanes blocked')
						|| (model['number_travel']=='4 Travel lanes blocked') || (model['number_travel']=='5+ Travel lanes blocked')){
							checkresult = 'CPI2-0';
							if(checkresult == 'CPI2-0'){
								if(num_tow > 0){checkresult = 'CPI2-2';}
								else if(num_responder > 4){checkresult = 'CPI2-2';}
								else if(pavement == 'Dry'){checkresult = 'CPI2-1';}
								else if(pavement == 'Snow/Ice' && num_responder > 2){checkresult = 'CPI2-2';}
								else{checkresult = 'CPI2-1';}
							}
							if(checkresult == 'CPI2-2'){
								if(num_responder > 6){checkresult = 'CPI2-3';}
								else if(num_fireboard>1 || pavement == 'Snow/Ice'){checkresult = 'CPI2-3';}
								else if(num_tow==0 || num_truck==0){checkresult = 'CPI2-2';}
								else if(num_responder>5 || num_truck>1){checkresult = 'CPI2-3';}
								else{checkresult = 'CPI2-2';}
							}
							if(checkresult == 'CPI2-3'){
								if(num_truck>1 || num_total>3 || hazmat==true || num_responder>7){checkresult = 'CPI2-4';}
								else if(num_total>4 || pavement == 'Wet'){checkresult = 'CPI2-4';}
								else if(num_truck>0){checkresult = 'CPI2-4';}
								else{checkresult = 'CPI2-3';}
							}

							if(checkresult == 'CPI2-1'){CPI2_case1();}
							else if(checkresult == 'CPI2-2'){CPI2_case2();}
							else if(checkresult == 'CPI2-3'){CPI2_case3();}
							else if(checkresult == 'CPI2-4'){CPI2_case4();}
						}
					}
					else if(model['collision']=='Property Damage only'){
						if(model['number_travel']=='1 Travel lane blocked'){
							checkresult = 'CPD1-0';
							if(checkresult == 'CPD1-0'){
								if(num_tow>0 && num_fireboard>0){checkresult = 'CPD1-2';}
								else if(num_chart>1 && num_pickup>0){checkresult = 'CPD1-2';}
								else if(num_tow>0 && first_responder == 'POLICE'){checkresult = 'CPD1-2';}
								else if(num_chart>2 && first_responder=='CHART'){checkresult = 'CPD1-2';}
								else if(num_chart>2 || (num_responder>4 && pavement == 'Wet')){checkresult = 'CPD1-2';}
								else if(pavement == 'Dry'){checkresult = 'CPD1-1';}
								else if(num_police==0 || (num_fireboard==0 && ((hour == 'AM-peak') || (hour == 'PM-peak')))){checkresult = 'CPD1-1';}
								else if(num_fireboard>0 && pavement == 'Wet'){checkresult = 'CPD1-2';}
								else if((num_total>2 && num_tow>0) || (aux_lane==true && num_suv > 0)){checkresult = 'CPD1-2';}
								else{checkresult = 'CPD1-1';}
							}
							if(checkresult == 'CPD1-2'){
								if(num_truck==0){checkresult = 'CPD1-2';}
								else if(num_responder > 7){checkresult = 'CPD1-3';}
								else{checkresult = 'CPD1-2';}
							}
							if(checkresult == 'CPD1-3'){
								if(num_tow>1 || pavement == 'Chemical wet'){checkresult = 'CPD1-4';}
								else{checkresult = 'CPD1-3';}		
							}

							if(checkresult == 'CPD1-1'){CPD1_case1();}
							else if(checkresult == 'CPD1-2'){CPD1_case2();}
							else if(checkresult == 'CPD1-3'){CPD1_case3();}
							else if(checkresult == 'CPD1-4'){CPD1_case4();}
						}
						else if((model['number_travel']=='2 Travel lanes blocked') || (model['number_travel']=='3 Travel lanes blocked') || (model['number_travel']=='4 Travel lanes blocked') 
						|| (model['number_travel']=='5+ Travel lanes blocked')){
							checkresult = 'CPD2-0';
							if(checkresult == 'CPD2-0'){
								if(num_tow > 0 && num_fireboard>0){checkresult = 'CPD2-2';}
								else if (pavement == 'Snow/Ice' || pavement == 'Chemical wet' || involved_truck_s=='jack ' || num_responder>6){checkresult = 'CPD2-2';}
								else if(involved_car_s == 'over ' || shoulder_drop > 1 || (num_truck>0 && num_pickup>0)){checkresult = 'CPD2-2';}
								else if((center=='SOC' && num_responder>3) || (travel_drop>3)){checkresult = 'CPD2-2';}
								else{checkresult = 'CPD2-1';}
							}
							if(checkresult == 'CPD2-2'){
								if(num_tow > 1){checkresult = 'CPD2-3';}
								else if(num_truck>0 && num_responder>5){checkresult = 'CPD2-3';}
								else if((num_truck>0 || num_total>2) && hour == 'Night time'){checkresult = 'CPD2-3';}
								else if(pavement == 'Snow/Ice' || pavement == 'Chemical wet'){checkresult = 'CPD2-3';}
								else if(num_total>2 && shoulder_drop>1){checkresult = 'CPD2-3';}
								else{checkresult = 'CPD2-2';}
							}
							if(checkresult == 'CPD2-3'){
								if(num_tow > 1){checkresult = 'CPD2-4';}
								else if(num_truck==0){checkresult = 'CPD2-3';}
								else if(hazmat==true || pavement == 'Chemical wet' || aux_lane==true){checkresult = 'CPD2-4';}
								else{checkresult = 'CPD2-3';}
							}
	
							if(checkresult == 'CPD2-1'){CPD2_case1();}
							else if(checkresult == 'CPD2-2'){CPD2_case2();}
							else if(checkresult == 'CPD2-3'){CPD2_case3();}
							else if(checkresult == 'CPD2-4'){CPD2_case4();}
						}
					}
				}
				else if(model['blockage']=='Shoulder only blockage'){
					prob = 1/(1+Math.exp(-(-2.27-0.47*bc+0.07*cecil-0.28*harford+0.41*dry+0.98*snow+0.33*unspecified+0.84*wet-0.38*week+0.3*nonholiday_sh
						-0.23*num_total+0.52*num_car+1.04*num_truck+0.26*num_responder+0.34*num_fireboard+0.43*num_medical-0.23*cpi
						+0.48*spring+0.37*summer+0.54*winter+0.08*daytime+0.23*nighttime)));
					console.log(prob);

					if(num_tow > 0){shoulder_case2();}
					else if(center != 'AOC'){shoulder_case1();}
					else if(num_responder == 1 && pavement == 'Dry'){shoulder_case1();}
					else if(shoulder_drop == 2){shoulder_case2();}
					else if((cpi == 1 && hour == 'AM-peak') || (cpi == 1 && hour =='Night time')){shoulder_case2();}
					else if(hour == 'PM-peak'){shoulder_case1();}
					else if(prob <= 0.4 && num_truck == 0){shoulder_case1();}
					else if(prob > 0.5 && num_fireboard > 0){shoulder_case2();}
					else{shoulder_case3();}
				}
			}
			else if (model['incident'] == 'Non-Collision incident') {
				if(model['collision'] == 'Vehicles on Fire'){
					 drawSVG1(10, 90, 30, 100, "5~45", "60%");
					 drawSVG2(10, 120, 30, 130, "5~60", "70%");
					 drawSVG3(10, 180, 30, 190, "5~90", "80%");
					 drawSVG4("Average CT = 45 mins");
				}
				else if(model['collision'] == 'Emergency Roadwork'){
					$("#first_stop").text("100min");
					$("#second_stop").text("200min");
					$("#fourth_stop").text("400min");

					drawSVG1(10, 95, 40 , 105, "5~160", "60%");
					drawSVG2(10, 145, 60, 155, "5~240", "70%");
					drawSVG3(10, 195, 80, 205, "5~330", "80%");
					drawSVG4("Average CT = 170 mins");
				}
				else if(model['collision'] == 'Off-road Activity'){
					 drawSVG1(0, 60, 20, 70, "<30", "60%");
					 drawSVG2(0, 90, 20, 100, "<45", "70%");
					 drawSVG3(0, 120, 20, 130, "<60", "80%");
					 drawSVG4("Average CT = 40 mins");
				}
			}
		}
	}
	else if(road=='US-29'){
		if(model['incident']=='Collision incident'){
			drawSVG1(20, 110, 47, 120, "10~55", "60%");
			drawSVG2(10, 140, 57, 150, "5~70", "70%");
			drawSVG3(10, 170, 72, 180, "5~85", "80%");
			drawSVG4("Average CT = 40 mins");

			if(model['blockage']=='Travel lane blockage'){
				drawSVG1(20, 140, 62, 150, "10~70", "60%");
				drawSVG2(10, 150, 62, 160, "5~75", "70%");
				drawSVG3(10, 170, 72, 180, "5~85", "80%");
				drawSVG4("Average CT = 46 mins");

				if(model['collision']=='Fatality'){
					$("#first_stop").text("100min");
					$("#second_stop").text("200min");
					$("#fourth_stop").text("400min");

					drawSVG1(111, 207, 134, 217, "185~345", "60%");
					drawSVG2(102, 213, 132, 223, "170~355", "70%");
					drawSVG3(93, 219, 130, 229, "155~365", "80%");
					drawSVG4("Average CT = 263 mins");
				}

				else if(model['collision']=='Personal Injury'){
					drawSVG1(20, 140, 62, 150, "10~70", "60%");
					drawSVG2(10, 170, 72, 180, "5~85", "70%");
					drawSVG3(10, 180, 77, 190, "5~90", "80%");
					drawSVG4("Average CT = 46 mins");

					if(model['number_travel']=='1 Travel lane blocked'){
						drawSVG1(10, 80, 27, 90, "5~40", "60%");
						drawSVG2(10, 100, 37, 110, "5~50", "70%");
						drawSVG3(10, 120, 47, 130, "5~60", "80%");
						drawSVG4("Average CT = 26 mins");

					}
					else if((model['number_travel']=='2 Travel lanes blocked') || (model['number_travel']=='3 Travel lanes blocked')
					 || (model['number_travel']=='4 Travel lanes blocked') || (model['number_travel']=='5+ Travel lanes blocked')){
						drawSVG1(50, 180, 97, 190, "25~90", "60%");
						drawSVG2(40, 200, 102, 210, "20~100", "70%");
						drawSVG3(40, 220, 112, 230, "20~110", "80%");
						drawSVG4("Average CT = 62 mins");
					}
				}

				else if(model['collision']=='Property Damage only'){
					drawSVG1(20, 110, 47, 120, "10~55", "60%");
					drawSVG2(20, 120, 52, 130, "10~60", "70%");
					drawSVG3(10, 140, 57, 150, "5~70", "80%");
					drawSVG4("Average CT = 34 mins");

					if(model['number_travel']=='1 Travel lane blocked'){
						drawSVG1(20, 100, 42, 110, "10~50", "60%");
						drawSVG2(10, 110, 42, 120, "5~55", "70%");
						drawSVG3(10, 130, 52, 140, "5~65", "80%");
						drawSVG4("Average CT = 35 mins");
					}
					else if((model['number_travel']=='2 Travel lanes blocked') || (model['number_travel']=='3 Travel lanes blocked')
					 || (model['number_travel']=='4 Travel lanes blocked') || (model['number_travel']=='5+ Travel lanes blocked')){
						drawSVG1(30, 110, 52, 120, "15~55", "60%");
						drawSVG2(20, 120, 52, 130, "10~60", "70%");
						drawSVG3(20, 140, 62, 150, "10~70", "80%");
						drawSVG4("Average CT = 33 mins");
					}
				}
			}
			else if(model['blockage']=='Shoulder only blockage'){
				drawSVG1(20, 120, 52, 130, "10~60", "60%");
				drawSVG2(10, 140, 57, 150, "5~70", "70%");
				drawSVG3(10, 170, 72, 180, "5~85", "80%");
				drawSVG4("Average CT = 40 mins");
			}
		}
		else if(model['incident']=='Non-Collision incident'){ //build awaiting instructions
			drawSVG1(10, 30, 40, 110, "5~15", "65%");
			drawSVG2(10, 40, 50, 120, "5~20", "75%");
			drawSVG3(10, 60, 70, 140, "5~30", "80%");
			drawSVG4("Average CT = 20 mins");

			if(model['collision'] == 'Debris in Roadway'){
				drawSVG1(0, 20, 0, 30, "<10", "85%");
				drawSVG2(0, 40, 10, 50, "<20", "90%");
				drawSVG3(0, 60, 20, 70, "<30", "95%");
				drawSVG4("Average CT = 5 mins");
			}
			else if(model['collision'] == 'Disabled Vehicle'){
				drawSVG1(0, 30, 5, 40, "<15", "65%");
				drawSVG2(0, 40, 10, 50, "<20", "75%");
				drawSVG3(0, 60, 15, 70, "<30", "85%");
				drawSVG4("Average CT = 20 mins");
			}
			else if(model['collision'] == 'Police Activity'){
				drawSVG1(0, 60, 20, 70, "<30", "65%");
				drawSVG2(0, 90, 30, 100, "<45", "80%");
				drawSVG3(0, 120, 40, 130, "<60", "90%");
				drawSVG4("Average CT = 30 mins");
			}
			else if(model['collision'] == 'Utility Problem'){
				drawSVG1(120, 300, 180, 300, "60~240", "100%");
				drawSVG2(0, 0, 0, 0, "", "");
				drawSVG3(0, 0, 0, 0, "", "");
				drawSVG4("Average CT = 160 mins");
			}
			else if(model['collision'] == 'Weather Closure'){
				drawSVG1(10, 140, 30, 150, "5~70", "60%");
				drawSVG2(10, 180, 30, 190, "5~90", "70%");
				drawSVG3(10, 240, 30, 250, "5~120", "80%");
				drawSVG4("Average CT = 190 mins");
			}
			else if(model['collision'] == 'Others'){
				drawSVG1(0, 40, 10, 50, "<20", "65%");
				drawSVG2(0, 60, 20, 70, "<30", "75%");
				drawSVG3(0, 120, 40, 130, "<60", "90%");
				drawSVG4("Average CT = 25 mins");
			}

			else if(model['collision'] == 'Vehicles on Fire'){
				drawSVG1(10, 90, 30, 100, "5~45", "60%");
				drawSVG2(10, 120, 30, 130, "5~60", "70%");
				drawSVG3(10, 180, 30, 190, "5~90", "80%");
				drawSVG4("Average CT = 45 mins");
			}
			else if(model['collision'] == 'Emergency Roadwork'){
				$("#first_stop").text("100min");
				$("#second_stop").text("200min");
				$("#fourth_stop").text("400min");

				drawSVG1(10, 95, 40 , 105, "5~160", "60%");
				drawSVG2(10, 145, 60, 155, "5~240", "70%");
				drawSVG3(10, 195, 80, 205, "5~330", "80%");
				drawSVG4("Average CT = 170 mins");
			}
			else if(model['collision'] == 'Off-road Activity'){
				drawSVG1(0, 60, 20, 70, "<30", "60%");
				drawSVG2(0, 90, 20, 100, "<45", "70%");
				drawSVG3(0, 120, 20, 130, "<60", "80%");
				drawSVG4("Average CT = 40 mins");
			}	
		}

		if(model['incident']!= null && model["involved_veh"]!= null && model["responder"]!= null && model["center_choice"]!= null &&
		model["pavement_condition"]!=null && model["hour_time"]!= null && model["location"]!=null){
			if (model['incident'] == 'Collision incident') {
				if(model['blockage']=='Travel lane blockage'){
					if(model['collision']=='Fatality'){
						if((num_total > 1) && (num_medical > 0)){CF_case2();}
						else{CF_case1();}
					}
					else if(model['collision']=='Personal Injury'){
						if(model['number_travel']=='1 Travel lane blocked'){
							checkresult = 'CPI1-0';
							if(checkresult == 'CPI1-0'){
								if(((hour != 'AM-peak') && (hour != 'PM-peak')) && first_responder == 'POLICE'){checkresult = 'CPI1-2';}
								else if(first_responder == 'FIREBOARD'){checkresult = 'CPI1-1';}
								else if((center=='SOC' && num_responder>2) || num_truck>0){checkresult = 'CPI1-2';}
								else if(aux_lane == true){checkresult = 'CPI1-2';}
								else{checkresult = 'CPI1-1';}
							}
							if(checkresult == 'CPI1-2'){
								if(pavement=='Snow/Ice' || num_truck>1 || num_responder>7 || center == 'AOC'){checkresult = 'CPI1-3';}
								else if((num_police>2 || weekend == 'Weekend' || pavement == 'Wet') && num_pickup>0){checkresult = 'CPI1-3';}
								else if(num_tow==0 || num_truck==0){checkresult = 'CPI1-2';}
								else{checkresult = 'CPI1-2';}
							}
							if(checkresult == 'CPI1-3'){
								if(num_responder<4 || num_truck==0){checkresult = 'CPI1-3';}
								else{checkresult = 'CPI1-3';}
							}

							if(checkresult == 'CPI1-1'){CPI1_case1();}
							else if(checkresult == 'CPI1-2'){CPI1_case2();}
							else if(checkresult == 'CPI1-3'){CPI1_case3();}
							else if(checkresult == 'CPI1-4'){CPI1_case4();}
						}
						else if((model['number_travel']=='2 Travel lanes blocked') || (model['number_travel']=='3 Travel lanes blocked')
						 || (model['number_travel']=='4 Travel lanes blocked') || (model['number_travel']=='5+ Travel lanes blocked')){
							checkresult = 'CPI2-0';
							if(checkresult == 'CPI2-0'){
								if(num_tow > 0){checkresult = 'CPI2-2';}
								else if((num_responder>3 || first_responder=='POLICE' || num_truck>0) && num_total>3){checkresult = 'CPI2-2';}
								else if((hour == 'Day time' || num_total>2) && ((involved_car_s == 'over ') || (involved_truck_s == 'over ') || (involved_bus_s == 'over ') || (involved_pickup_s == 'over '))){checkresult = 'CPI2-2';}
								else if(season == 'Winter' || hour == 'Night time'){checkresult = 'CPI2-2';}
								else if(num_truck>0 || num_responder>2){checkresult = 'CPI2-2';}
								else{checkresult = 'CPI2-1';}
							}
							if(checkresult == 'CPI2-2'){
								if(((hour != 'AM-peak') && (hour != 'PM-peak')) && travel_drop>4){checkresult = 'CPI2-3';}
								else if(num_pickup>0 || (num_responder>4 && ((involved_car_s == 'over ') || (involved_truck_s == 'over ') || (involved_bus_s == 'over ') || (involved_pickup_s == 'over ')))){checkresult = 'CPI2-3';}
								else{checkresult = 'CPI2-2';}
							}
							if(checkresult == 'CPI2-3'){
								if(num_truck>0){checkresult = 'CPI2-4';}
								else if(aux_lane==true){checkresult = 'CPI2-4';}
								else{checkresult = 'CPI2-3';}
							}

							if(checkresult == 'CPI2-1'){CPI2_case1();}
							else if(checkresult == 'CPI2-2'){CPI2_case2();}
							else if(checkresult == 'CPI2-3'){CPI2_case3();}
							else if(checkresult == 'CPI2-4'){CPI2_case4();}
						}
					}
					else if(model['collision']=='Property Damage only'){
						if(model['number_travel']=='1 Travel lane blocked'){
							checkresult = 'CPD1-0';
							if(checkresult == 'CPD1-0'){
								if((hour == 'Day time' && num_responder>4) || (num_truck>0 && num_police>1)){checkresult = 'CPD1-2';}
								else if(pavement == 'Dry'){checkresult = 'CPD1-1';}
								else if(pavement == 'Chemical wet' && num_police>0){checkresult = 'CPD1-2';}
								else if(weekend == 'Weekday'){checkresult = 'CPD1-1';}
								else if(num_tow>0){checkresult = 'CPD1-2';}
								else{checkresult = 'CPD1-1';}
							}
							if(checkresult == 'CPD1-2'){
								if(num_responder>7 || pavement == 'Chemical wet'){checkresult = 'CPD1-3';}
								else if(num_total>2 && num_tow>1){checkresult = 'CPD1-3';}
								else{checkresult = 'CPD1-2';}
							}
							if(checkresult == 'CPD1-3'){
								if(num_truck>0 || num_responder>5 || aux_lane==true || pavement == 'Chemical wet'){checkresult = 'CPD1-4';}
								else{checkresult = 'CPD1-3';}
							}

							if(checkresult == 'CPD1-1'){CPD1_case1();}
							else if(checkresult == 'CPD1-2'){CPD1_case2();}
							else if(checkresult == 'CPD1-3'){CPD1_case3();}
							else if(checkresult == 'CPD1-4'){CPD1_case4();}
						}
						else if((model['number_travel']=='2 Travel lanes blocked') || (model['number_travel']=='3 Travel lanes blocked')
						 || (model['number_travel']=='4 Travel lanes blocked') || (model['number_travel']=='5+ Travel lanes blocked')){
							checkresult = 'CPD2-0';
							if(checkresult == 'CPD2-0'){
								if(pavement == 'Snow/Ice' || pavement == 'Chemical wet' || involved_truck_s=='jack ' || num_responder>6){checkresult = 'CPD2-2';}
								else if(num_responder>4){checkresult = 'CPD2-2';}
								else if(season=='Winter' && first_responder=='POLICE'){checkresult = 'CPD2-2';}
								else{checkresult = 'CPD2-1';}
							}
							if(checkresult == 'CPD2-2'){
								if(num_tow>1){checkresult = 'CPD2-3';}
								else{checkresult = 'CPD2-2';}
							}
							if(checkresult == 'CPD2-3'){
								if(num_truck==0){checkresult = 'CPD2-3';}
								else{checkresult = 'CPD2-3';}
							}

							if(checkresult == 'CPD2-1'){CPD2_case1();}
							else if(checkresult == 'CPD2-2'){CPD2_case2();}
							else if(checkresult == 'CPD2-3'){CPD2_case3();}
							else if(checkresult == 'CPD2-4'){CPD2_case4();}
						}
					}
				}
				else if(model['blockage']=='Shoulder only blockage'){
					prob = 1/(1+Math.exp(-(-2.27-0.47*bc+0.07*cecil-0.28*harford+0.41*dry+0.98*snow+0.33*unspecified+0.84*wet-0.38*week+0.3*nonholiday_sh
						-0.23*num_total+0.52*num_car+1.04*num_truck+0.26*num_responder+0.34*num_fireboard+0.43*num_medical-0.23*cpi
						+0.48*spring+0.37*summer+0.54*winter+0.08*daytime+0.23*nighttime)));
					console.log(prob);

					if(num_tow > 0){shoulder_case2();}
					else if(center != 'AOC'){shoulder_case1();}
					else if(num_responder == 1 && pavement == 'Dry'){shoulder_case1();}
					else if(shoulder_drop == 2){shoulder_case2();}
					else if((cpi == 1 && hour == 'AM-peak') || (cpi == 1 && hour =='Night time')){shoulder_case2();}
					else if(hour == 'PM-peak'){shoulder_case1();}
					else if(prob <= 0.4 && num_truck == 0){shoulder_case1();}
					else if(prob > 0.5 && num_fireboard > 0){shoulder_case2();}
					else{shoulder_case3();}
				}
			}
			else if (model['incident'] == 'Non-Collision incident') {
				if(model['collision'] == 'Vehicles on Fire'){
					 drawSVG1(10, 90, 30, 100, "5~45", "60%");
					 drawSVG2(10, 120, 30, 130, "5~60", "70%");
					 drawSVG3(10, 180, 30, 190, "5~90", "80%");
					 drawSVG4("Average CT = 45 mins");
				}
				else if(model['collision'] == 'Emergency Roadwork'){
					$("#first_stop").text("100min");
					$("#second_stop").text("200min");
					$("#fourth_stop").text("400min");

					drawSVG1(10, 95, 40 , 105, "5~160", "60%");
					drawSVG2(10, 145, 60, 155, "5~240", "70%");
					drawSVG3(10, 195, 80, 205, "5~330", "80%");
					drawSVG4("Average CT = 170 mins");
				}
				else if(model['collision'] == 'Off-road Activity'){
					 drawSVG1(0, 60, 20, 70, "<30", "60%");
					 drawSVG2(0, 90, 20, 100, "<45", "70%");
					 drawSVG3(0, 120, 20, 130, "<60", "80%");
					 drawSVG4("Average CT = 40 mins");
				}
			}
		}
	}
	else{
		if(model['incident']=='Collision incident'){
			drawSVG1(20, 90, 37, 100, "10~45", "60%");
			drawSVG2(20, 110, 47, 120, "10~55", "70%");
			drawSVG3(20, 180, 82, 190, "10~90", "80%");
			drawSVG4("Average CT = 40 mins");

			if(model['blockage']=='Travel lane blockage'){
				drawSVG1(20, 100, 42, 110, "10~50", "60%");
				drawSVG2(20, 120, 52, 130, "10~60", "70%");
				drawSVG3(20, 170, 67, 180, "10~85", "80%");
				drawSVG4("Average CT = 45 mins");
				if(model['collision']=='Fatality'){
					drawSVG1(290, 300, 230, 300, "150~270", "60%");
					drawSVG2(240, 300, 180, 300, "120~300", "70%");
					drawSVG3(120, 300, 130, 300, "60~360", "80%");
					drawSVG4("Average CT = 235 mins");
				}
				else if(model['collision']=='Personal Injury'){
					drawSVG1(30, 120, 57, 130, "15~60", "60%");
					drawSVG2(30, 140, 67, 150, "15~70", "70%");
					drawSVG3(30, 190, 92, 200, "15~95", "80%");
					drawSVG4("Average CT = 50 mins");
									
					if(model['number_travel']=='1 Travel lane blocked'){
						drawSVG1(30, 110, 52, 120, "15~55", "60%");
						drawSVG2(30, 130, 62, 140, "15~65", "70%");
						drawSVG3(20, 140, 62, 150, "10~70", "80%");
						drawSVG4("Average CT = 45 mins");
					}
					else if(model['number_travel']=='2 Travel lanes blocked'){
						drawSVG1(40, 140, 72, 150, "20~70", "60%");
						drawSVG2(40, 170, 87, 180, "20~85", "70%");
						drawSVG3(30, 180, 87, 190, "15~90", "80%");
						drawSVG4("Average CT = 55 mins");
					}
					else if((model['number_travel']=='3 Travel lanes blocked') || (model['number_travel']=='4 Travel lanes blocked') 
					|| (model['number_travel']=='5+ Travel lanes blocked')){
						drawSVG1(60, 220, 80, 230, "30~110", "60%");
						drawSVG2(60, 300, 80, 300, "30~155", "70%");
						drawSVG3(50, 300, 70, 300, "25~210", "80%");
						drawSVG4("Average CT = 80 mins");	
					}
				}
				else if(model['collision']=='Property Damage only'){
					drawSVG1(20, 90, 40, 100, "10~45", "60%");
					drawSVG2(20, 110, 40, 120, "10~55", "70%");
					drawSVG3(20, 190, 40, 200, "10~85", "80%");
					drawSVG4("Average CT = 35 mins");	
					if(model['number_travel']=='1 Travel lane blocked'){
						drawSVG1(20, 80, 32, 90, "10~40", "60%");
						drawSVG2(20, 100, 42, 110, "10~50", "70%");
						drawSVG3(20, 160, 72, 170, "10~80", "80%");
						drawSVG4("Average CT = 35 mins");
					}
					else if(model['number_travel']=='2 Travel lanes blocked'){
						drawSVG1(30, 140, 67, 150, "15~70", "60%");
						drawSVG2(30, 200, 94, 210, "15~100", "70%");
						drawSVG3(20, 220, 99, 230, "10~110", "80%");
						drawSVG4("Average CT = 45 mins");
					}
					else if((model['number_travel']=='3 Travel lanes blocked') || (model['number_travel']=='4 Travel lanes blocked') 
					|| (model['number_travel']=='5+ Travel lanes blocked')){
						drawSVG1(40, 180, 60, 190, "20~90", "60%");
						drawSVG2(40, 280, 60, 290, "20~140", "70%");
						drawSVG3(30, 280, 50, 290, "15~140", "80%");
						drawSVG4("Average CT = 60 mins");
					}
				}
			}
			else if(model['blockage']=='Shoulder only blockage'){
				drawSVG1(10, 80, 20, 90, "5~40", "60%");
				drawSVG2(10, 90, 20, 100, "5~45", "70%");
				drawSVG3(10, 120, 20, 130, "5~60", "80%");
				drawSVG4("Average CT = 35 mins");
			}
		}
		else if(model['incident']=='Non-Collision incident'){
			drawSVG1(10, 30, 40, 110, "5~15", "65%");
			drawSVG2(10, 40, 50, 120, "5~20", "75%");
			drawSVG3(10, 60, 70, 140, "5~30", "80%");
			drawSVG4("Average CT = 20 mins");

			if(model['collision'] == 'Debris in Roadway'){
				drawSVG1(0, 20, 0, 30, "<10", "85%");
				drawSVG2(0, 40, 10, 50, "<20", "90%");
				drawSVG3(0, 60, 20, 70, "<30", "95%");
				drawSVG4("Average CT = 5 mins");
			}
			else if(model['collision'] == 'Disabled Vehicle'){
				drawSVG1(0, 30, 5, 40, "<15", "65%");
				drawSVG2(0, 40, 10, 50, "<20", "75%");
				drawSVG3(0, 60, 15, 70, "<30", "85%");
				drawSVG4("Average CT = 20 mins");
			}
			else if(model['collision'] == 'Police Activity'){
				drawSVG1(0, 60, 20, 70, "<30", "65%");
				drawSVG2(0, 90, 30, 100, "<45", "80%");
				drawSVG3(0, 120, 40, 130, "<60", "90%");
				drawSVG4("Average CT = 30 mins");
			}
			else if(model['collision'] == 'Utility Problem'){
				drawSVG1(120, 300, 180, 300, "60~240", "100%");
				drawSVG2(0, 0, 0, 0, "", "");
				drawSVG3(0, 0, 0, 0, "", "");
				drawSVG4("Average CT = 160 mins");
			}
			else if(model['collision'] == 'Weather Closure'){
				drawSVG1(10, 140, 30, 150, "5~70", "60%");
				drawSVG2(10, 180, 30, 190, "5~90", "70%");
				drawSVG3(10, 240, 30, 250, "5~120", "80%");
				drawSVG4("Average CT = 190 mins");
			}
			else if(model['collision'] == 'Others'){
				drawSVG1(0, 40, 10, 50, "<20", "65%");
				drawSVG2(0, 60, 20, 70, "<30", "75%");
				drawSVG3(0, 120, 40, 130, "<60", "90%");
				drawSVG4("Average CT = 25 mins");
			}

			else if(model['collision'] == 'Vehicles on Fire'){
				drawSVG1(10, 90, 30, 100, "5~45", "60%");
				drawSVG2(10, 120, 30, 130, "5~60", "70%");
				drawSVG3(10, 180, 30, 190, "5~90", "80%");
				drawSVG4("Average CT = 45 mins");
			}
			else if(model['collision'] == 'Emergency Roadwork'){
				$("#first_stop").text("100min");
				$("#second_stop").text("200min");
				$("#fourth_stop").text("400min");

				drawSVG1(10, 95, 40 , 105, "5~160", "60%");
				drawSVG2(10, 145, 60, 155, "5~240", "70%");
				drawSVG3(10, 195, 80, 205, "5~330", "80%");
				drawSVG4("Average CT = 170 mins");
			}
			else if(model['collision'] == 'Off-road Activity'){
				drawSVG1(0, 60, 20, 70, "<30", "60%");
				drawSVG2(0, 90, 20, 100, "<45", "70%");
				drawSVG3(0, 120, 20, 130, "<60", "80%");
				drawSVG4("Average CT = 40 mins");
			}
		}

		if(model['incident']!= null && model["involved_veh"]!= null && model["responder"]!= null && model["center_choice"]!= null &&
		model["pavement_condition"]!=null && model["hour_time"]!= null && model["location"]!=null){	
			if((model['blockage']=='Travel lane blockage') && ((hazmat == true) && ((involved_truck_s == 'over ') || (num_responder >= 10) || (num_chart >= 3))) ){
				drawSVG1(240, 300, 260, 300, ">=120", "90%");
				drawSVG2(0, 0, 0, 0, "", "");
				drawSVG3(0, 0, 0, 0, "", "");
				drawSVG4("Average CT = 160 mins");
			}
			else if((model['blockage']=='Travel lane blockage') && (season == 'Winter') && (weekend == 'Weekend') && (hour == 'Night time') && (cpi == 1) && (num_truck > 0) && (num_tow > 0) && (num_responder >= 5)) {
				drawSVG1(180, 260, 190, 270, "150~180", "90%");				
				drawSVG2(160, 280, 170, 290, "140~190", "100%");
				drawSVG3(0, 0, 0, 0, "", "");
				drawSVG4("Average CT = 165 mins");
			}
			else if((model['blockage']=='Travel lane blockage') && ((cpi == 1) || (cpd == 1)) && ((hazmat == true)) ){
				drawSVG1(110, 240, 154, 250, "55~120", "90%");
				drawSVG2(0, 0, 0, 0, "", "");
				drawSVG3(0, 0, 0, 0, "", "");
				drawSVG4("Average CT = 80 mins");
			}
			else if((model['blockage']=='Travel lane blockage') && ((involved_truck_s == 'over ') && ((total_lane >= 4) || (location_choice == 'Harford') || ((cpi == 1) && (num_responder >= 7)))) ){
				drawSVG1(240, 300, 260, 300, ">=120", "90%");
				drawSVG2(0, 0, 0, 0, "", "");
				drawSVG3(0, 0, 0, 0, "", "");
				drawSVG4("Average CT = 200 mins");
			}
			else if((model['blockage']=='Travel lane blockage') && ((involved_truck_s == 'jack ') && (num_tow >= 2) && (hour != 'Day time')) ){
				drawSVG1(240, 300, 260, 300, ">=120", "90%");
				drawSVG2(0, 0, 0, 0, "", "");
				drawSVG3(0, 0, 0, 0, "", "");
				drawSVG4("Average CT = 150 mins");
			}
			else if((model['blockage']=='Travel lane blockage') && (((involved_car_s == 'over ') || (involved_truck_s == 'over ') || (involved_bus_s == 'over ')) && (((weekend == 'Weekend') && (num_responder >= 8)) || ((num_medical >= 1) && (num_tow >= 2)) || ((location_choice == 'Cecil') && (num_responder >= 6)))) ){
				drawSVG1(240, 300, 260, 300, ">=120", "90%");
				drawSVG2(0, 0, 0, 0, "", "");
				drawSVG3(0, 0, 0, 0, "", "");
				drawSVG4("Average CT = 165 mins");
			}
			else if((model['blockage']=='Travel lane blockage') && (cpd == 1) && (travel_drop == 2) && (num_total == 3) && (num_truck > 0) && (num_tow > 0) && !(((involved_car_s=='jack ') || (involved_car_s=='over ') || (involved_car_s=='lost ') || (involved_truck_s=='jack ') || (involved_truck_s=='over ') || (involved_truck_s=='lost ') || (involved_bus_s=='jack ') || (involved_bus_s=='over ') || (involved_bus_s=='lost ')))) {
				drawSVG1(180, 260, 190, 270, "40~80", "90%");
				drawSVG2(160, 280, 170, 290, "30~90", "100%");
				drawSVG3(0, 0, 0, 0, "", "");
				drawSVG4("Average CT = 60 mins");
			}
			else if((model['blockage']=='Travel lane blockage') && (weekend == 'Weekend') && (hour == 'Night time') && (cpd == 1) && (travel_drop >= 3) && (num_truck > 0) && (num_tow > 0) && !((involved_car_s=='jack ') || (involved_car_s=='over ') || (involved_car_s=='lost ') || (involved_truck_s=='jack ') || (involved_truck_s=='over ') || (involved_truck_s=='lost ') || (involved_bus_s=='jack ') || (involved_bus_s=='over ') || (involved_bus_s=='lost '))) {
				drawSVG1(180, 260, 190, 270, "130~150", "90%");
				drawSVG2(160, 280, 170, 290, "120~160", "100%");
				drawSVG3(0, 0, 0, 0, "", "");
				drawSVG4("Average CT = 140 mins");
			}
			else if((model['blockage']=='Travel lane blockage') && (location_choice == 'Harford') && (hour == 'Night time') && (cpd == 1) && (travel_drop == 1) && (num_truck < 1) && (num_tow > 0) && (num_fireboard > 0)) {
				drawSVG1(180, 260, 190, 270, "35~85", "90%");
				drawSVG2(160, 280, 170, 290, "30~90", "100%");
				drawSVG3(0, 0, 0, 0, "", "");
				drawSVG4("Average CT = 60 mins");
			}
			else if((model['blockage']=='Travel lane blockage') && (nonholiday == 1) && (num_total >= 4) && (shoulder_drop >= 1) && (num_tow < 1)) {
				drawSVG1(180, 260, 190, 270, "40~70", "90%");
				drawSVG2(160, 280, 170, 290, "30~80", "100%");
				drawSVG3(0, 0, 0, 0, "", "");
				drawSVG4("Average CT = 55 mins");
			}
			else if((model['blockage']=='Travel lane blockage') && (pavement == 'Wet') && (hour == 'AM-peak') && (cpd == 1) && (travel_drop == 1) && (center=='SOC') && (num_tow > 0)) {
				drawSVG1(180, 260, 190, 270, "90~100", "90%");
				drawSVG2(160, 280, 170, 290, "80~110", "100%");
				drawSVG3(0, 0, 0, 0, "", "");
				drawSVG4("Average CT = 95 mins");
			}
			else if((model['blockage']=='Travel lane blockage') && (cpd == 1) && (travel_drop == 1) && (num_truck < 1) && (hour == 'Night time') && (center == 'AOC') && (num_responder >= 7)) {
				drawSVG1(180, 260, 190, 270, "45~95", "90%");
				drawSVG2(160, 280, 170, 290, "40~100", "100%");
				drawSVG3(0, 0, 0, 0, "", "");
				drawSVG4("Average CT = 70 mins");
			}
			else if((model['blockage']=='Travel lane blockage') && (weekend == 'Weekend') && (hour == 'Night time') && (travel_drop >= 4) && (num_total >= 3) && (num_responder >= 6) && (num_tow > 0) && !((involved_car_s=='jack ') || (involved_car_s=='over ') || (involved_car_s=='lost ') || (involved_truck_s=='jack ') || (involved_truck_s=='over ') || (involved_truck_s=='lost ') || (involved_bus_s=='jack ') || (involved_bus_s=='over ') || (involved_bus_s=='lost '))) {
				drawSVG1(180, 260, 190, 270, "150~170", "90%");
				drawSVG2(160, 280, 170, 290, "140~180", "100%");
				drawSVG3(0, 0, 0, 0, "", "");
				drawSVG4("Average CT = 160 mins");
			}
			else if((model['blockage']=='Travel lane blockage') && (location_choice == 'Baltimore') && (hour == 'Night time') && (pavement == 'Wet') && (cpd == 1) && (travel_drop == 2) && (num_total >= 2) && (num_truck < 1) && (center == 'AOC') && (num_tow > 0)) {
				drawSVG1(180, 260, 190, 270, "100~120", "90%");
				drawSVG2(160, 280, 170, 290, "90~130", "100%");
				drawSVG3(0, 0, 0, 0, "", "");
				drawSVG4("Average CT = 110 mins");
			}
			else if((model['blockage']=='Travel lane blockage') && (location_choice == 'Baltimore') && (hour == 'Night time') && (cpi == 1) && (num_total >= 4) && (num_truck < 1) && (num_tow > 0) && (num_responder >= 4)) {
				drawSVG1(180, 260, 190, 270, "100~120", "90%");
				drawSVG2(160, 280, 170, 290, "90~130", "100%");
				drawSVG3(0, 0, 0, 0, "", "");
				drawSVG4("Average CT = 110 mins");
			}
			else if((model['blockage']=='Travel lane blockage') && ((location_choice == 'Cecil') || (location_choice == 'Harford')) && (involved_truck_s=='jack ') && (num_tow > 0) && (num_responder >= 4)) {
				drawSVG1(180, 260, 190, 270, "150~170", "90%");
				drawSVG2(160, 280, 170, 290, "140~180", "100%");
				drawSVG3(0, 0, 0, 0, "", "");
				drawSVG4("Average CT = 160 mins");
			}
			else if((model['blockage']=='Travel lane blockage') && (cpd == 1) && (num_total >= 3) && (aux_lane == true) && (num_tow > 0) && (num_fireboard > 0) && (weekend == 'Weekend') && (hour == 'Night time')) {
				drawSVG1(180, 260, 190, 270, "130~150", "90%");
				drawSVG2(160, 280, 170, 290, "120~160", "100%");
				drawSVG3(0, 0, 0, 0, "", "");
				drawSVG4("Average CT = 140 mins");
			}
			else if((model['blockage']=='Travel lane blockage') && (hour == 'Night time') && (weekend == 'Weekend') && (num_truck > 0) && (aux_lane == true) && (num_responder >= 10)) {
				drawSVG1(180, 260, 190, 270, "180~210", "90%");
				drawSVG2(160, 280, 170, 290, "170~220", "100%");
				drawSVG3(0, 0, 0, 0, "", "");
				drawSVG4("Average CT = 195 mins");
			}
			else if((model['blockage']=='Travel lane blockage') && (involved_truck_s=='jack ') && (location_choice == 'Cecil') && (exit == 'Exit 100') && (hour == 'Night time')) {
				drawSVG1(180, 260, 190, 270, "200~230", "90%");
				drawSVG2(160, 280, 170, 290, "190~240", "100%");
				drawSVG3(0, 0, 0, 0, "", "");
				drawSVG4("Average CT = 215 mins");
			}
			else if((model['blockage']=='Travel lane blockage') && (cpi == 1) && (travel_drop >= 4) && (num_truck > 0) && (num_tow < 1) && (num_hour < 3)) {
				drawSVG1(180, 260, 190, 270, "170~190", "90%");
				drawSVG2(160, 280, 170, 290, "160~200", "100%");
				drawSVG3(0, 0, 0, 0, "", "");
				drawSVG4("Average CT = 180 mins");
			}
			else if((model['blockage']=='Travel lane blockage') && (toll_lane == true) && (num_truck > 0) && (num_responder >= 4) && (num_hour < 7)) {
				drawSVG1(180, 260, 190, 270, "170~200", "90%");
				drawSVG2(160, 280, 170, 290, "160~210", "100%");
				drawSVG3(0, 0, 0, 0, "", "");
				drawSVG4("Average CT = 185 mins");
			}
			else if((model['blockage']=='Travel lane blockage') && (location_choice == 'Cecil') && (direction == 'South') && (exit == 'Exit 100') && (weekend == 'Weekend') && (num_responder > 3) && (hour == 'Night time' || num_total > 2)) {
				drawSVG1(180, 260, 190, 270, "90~110", "90%");
				drawSVG2(160, 280, 170, 290, "80~120", "100%");
				drawSVG3(0, 0, 0, 0, "", "");
				drawSVG4("Average CT = 100 mins");
			}
			else if((model['blockage']=='Travel lane blockage')&&(nonholiday == 1) && (toll_lane == true) && (num_truck == 1) && (num_tow < 1)){
				drawSVG1(120, 180, 130, 200, "100~120", "90%");
				drawSVG2(100, 200, 110, 220, "90~130", "100%");
				drawSVG3(0, 0, 0, 0, "", "");
				drawSVG4("Average CT = 110 mins");
			}
			else {
				if (model['incident'] == 'Collision incident') {
					if(model['blockage']=='Travel lane blockage'){
						if(model['collision']=='Fatality'){
							if((travel_drop > 3) || (num_total > 2) || (num_truck > 1) || (num_tow > 1)){
								if(num_truck > 0){CF_case4();}
								else{CF_case2();}
							}
							else{
								if(num_total > 1){CF_case3();}
								else{CF_case1();}
							}
						}
						else if(model['collision']=='Personal Injury'){
							if(model['number_travel']=='1 Travel lane blocked'){
								checkresult = 'CPI1-0';

								if(checkresult == 'CPI1-0'){
									if(num_tow > 0){checkresult = 'CPI1-2';}
									else if(num_total >= 4){checkresult = 'CPI1-2';}
									else if((center=='TOC3') || (center=='TOC4') || (center=='SOC')){checkresult = 'CPI1-1';}
									else if((num_truck > 0) || (num_motor > 0)){checkresult = 'CPI1-2';}
									else if(tunnel_lane == true){checkresult = 'CPI1-2';}
									else if(first_responder == 'FIREBOARD'){checkresult = 'CPI1-1';}
									else if(((hour == 'Day time') || (hour == 'Night time')) && (first_responder=='POLICE')){checkresult = 'CPI1-2';}
									else if(((hour == 'AM-peak') || (hour == 'PM-peak')) && (num_total >= 3)){checkresult = 'CPI1-2';}
									else if(num_chart > 0){checkresult = 'CPI1-2';}
									else{checkresult = 'CPI1-1';}
								}

								if(checkresult == 'CPI1-2'){
									if((hour == 'Night time' && num_responder >= 7) || (num_total >= 5)){checkresult = 'CPI1-3';}
									else if((num_tow == 0) || (num_truck == 0)){checkresult = 'CPI1-2';}
									else if(first_responder=='POLICE'){checkresult = 'CPI1-3';}
									else if((num_tow>1) || (aux_lane == true) || (num_truck >1) || (hazmat == true)){checkresult = 'CPI1-3';}
									else if((num_total<3) || (center=='TOC3')){checkresult = 'CPI1-2';}
									else{checkresult = 'CPI1-3';}
								}

								if(checkresult == 'CPI1-3'){
									if(season == 'Winter'){checkresult = 'CPI1-4';}
									else if((num_chart > 2) || (num_responder > 6)){checkresult = 'CPI1-4';}
									else{checkresult = 'CPI1-3';}
								}

								if(checkresult == 'CPI1-1'){CPI1_case1();}
								else if(checkresult == 'CPI1-2'){CPI1_case2();}
								else if(checkresult == 'CPI1-3'){CPI1_case3();}
								else if(checkresult == 'CPI1-4'){CPI1_case4();}
							}
							else if(model['number_travel']=='2 Travel lanes blocked'){
								checkresult = 'CPI2-0';

								if(checkresult == 'CPI2-0'){
									if(num_tow > 0){checkresult = 'CPI2-2';}
									else if(center == 'AOC'){checkresult = 'CPI2-2';}
									else if(num_responder > 4){checkresult = 'CPI2-2';}
									else if(pavement == 'Dry'){checkresult = 'CPI2-1';}
									else if((season == 'Winter') || (hour == 'Night time')){checkresult = 'CPI2-2';}
									else{checkresult = 'CPI2-1';}
								}
								if(checkresult == 'CPI2-2'){
									if(num_total >= 6){checkresult = 'CPI2-3';}
									else if((num_tow >= 2) && (num_total >= 4)){checkresult = 'CPI2-3';}
									else if(num_responder >= 7){checkresult = 'CPI2-3';}
									else if((num_tow==0) || (num_truck==0)){checkresult = 'CPI2-2';}
									else if((num_medical > 0) || (hazmat == true) || (hour == 'Night time') || (pavement == 'Wet') || (tunnel_lane == true) || (num_responder > 6)){checkresult = 'CPI2-3';}
									else{checkresult = 'CPI2-2';}
								}
								if(checkresult == 'CPI2-3'){
									if((num_truck>1) || (num_total>3) || (hazmat == true) || (num_responder > 7)){checkresult = 'CPI2-4';}
									else{checkresult = 'CPI2-3';}
								}

								if(checkresult == 'CPI2-1'){CPI2_case1();}
								else if(checkresult == 'CPI2-2'){CPI2_case2();}
								else if(checkresult == 'CPI2-3'){CPI2_case3();}
								else if(checkresult == 'CPI2-4'){CPI2_case4();}
							}
							else if((model['number_travel']=='3 Travel lanes blocked') || (model['number_travel']=='4 Travel lanes blocked') 
							|| (model['number_travel']=='5+ Travel lanes blocked')){
								checkresult = 'CPI3-0';

								if(checkresult == 'CPI3-0'){
									if((num_tow > 0) || ((involved_car_s=='jack ') || (involved_car_s=='over ') || (involved_car_s=='lost ') || (involved_truck_s=='jack ') || (involved_truck_s=='over ') || (involved_truck_s=='lost ') || (involved_bus_s=='jack ') || (involved_bus_s=='over ') || (involved_bus_s=='lost ')) ){checkresult = 'CPI3-2';}
									else if(center == 'TOC4'){checkresult = 'CPI3-1';}
									else if((center == 'SOC') || (num_truck > 0) || (num_total > 2)){checkresult = 'CPI3-2';}
									else if(center == 'TOC3'){checkresult = 'CPI3-1';}				
									else if(first_responder == 'FIREBOARD'){checkresult = 'CPI3-2';}
									else{checkresult = 'CPI3-1';}
								}
								if(checkresult == 'CPI3-2'){
									if(num_medical > 0){checkresult = 'CPI3-3';}
									else if(num_responder > 8){checkresult = 'CPI3-3';}
									else if(num_tow == 0){checkresult = 'CPI3-2';}
									else if(travel_drop > 3){checkresult = 'CPI3-3';}
									else if((hour == 'Night time') || (weekend == 'Weekend')){checkresult = 'CPI3-3';}
									else if(pavement == 'Dry'){checkresult = 'CPI3-2';}
									else{checkresult = 'CPI3-3';}
								}
								if(checkresult == 'CPI3-3'){
									if(num_responder > 9){checkresult = 'CPI3-4';}
									else if(num_truck == 0){checkresult = 'CPI3-3';}
									else if(num_truck > 1){checkresult = 'CPI3-4';}
									else if((num_medical > 0) || (tunnel_lane == true)){checkresult = 'CPI3-4';}
									else{checkresult = 'CPI3-3';}
								}

								if(checkresult == 'CPI3-1'){CPI3_case1();}
								else if(checkresult == 'CPI3-2'){CPI3_case2();}
								else if(checkresult == 'CPI3-3'){CPI3_case3();}
								else if(checkresult == 'CPI3-4'){CPI3_case4();}
							}
						}
					
						else if(model['collision']=='Property Damage only'){
							if(model['number_travel']=='1 Travel lane blocked'){
								checkresult = 'CPD1-0';

								if(checkresult == 'CPD1-0'){
									if((num_tow > 0) || (hazmat == true)){checkresult = 'CPD1-2';}
									else if((center == 'AOC') && (num_chart > 1)){checkresult = 'CPD1-2';}
									else if((center == 'AOC') && (num_total > 4)){checkresult = 'CPD1-2';}
									else if((pavement == 'Wet') && (num_police >= 2) && (aux_lane == true) && (shoulder_drop >= 1)){checkresult = 'CPD1-2';}
									else if(pavement == 'Dry'){checkresult = 'CPD1-1';}
									else if(weekend == 'Weekday'){checkresult = 'CPD1-1';}
									else if((hour == 'Day time') && (num_total < 4)){checkresult = 'CPD1-1';}
									else if((num_total > 2) || (num_fireboard > 0) || (pavement == 'Wet') || (location_choice == 'Harford')){checkresult = 'CPD1-2';}
									else{checkresult = 'CPD1-1';}
								}
								if(checkresult == 'CPD1-2'){
									if((num_bus > 0) || ((involved_car_s=='jack ') || (involved_car_s=='over ') || (involved_car_s=='lost ') || (involved_truck_s=='jack ') || (involved_truck_s=='over ') || (involved_truck_s=='lost ') || (involved_bus_s=='jack ') || (involved_bus_s=='over ') || (involved_bus_s=='lost '))){checkresult = 'CPD1-3';}
									else if(num_truck == 0){checkresult = 'CPD1-2';}
									else if((num_fireboard == 0) && (aux_lane == false)){checkresult = 'CPD1-2';}
									else if((num_tow > 1) || (hazmat == true) || (pavement == 'Chemical wet') || (pavement == 'Snow/Ice') || (hour == 'Night time') || (center == 'AOC') || (num_chart > 2)){checkresult = 'CPD1-3';}
									else{checkresult = 'CPD1-2';}
								}	
								if(checkresult == 'CPD1-3'){
									if((num_tow > 1) || (pavement == 'Chemical wet')){checkresult = 'CPD1-4';}
									else{checkresult = 'CPD1-3';}		
								}

								if(checkresult == 'CPD1-1'){CPD1_case1();}
								else if(checkresult == 'CPD1-2'){CPD1_case2();}
								else if(checkresult == 'CPD1-3'){CPD1_case3();}
								else if(checkresult == 'CPD1-4'){CPD1_case4();}	
							}
							else if(model['number_travel']=='2 Travel lanes blocked'){
								checkresult = 'CPD2-0';

								if(checkresult == 'CPD2-0'){
									if(center == 'AOC'){checkresult = 'CPD2-2';}
									else if(num_tow > 0 && num_fireboard > 0){checkresult = 'CPD2-2';}
									else if(weekend == 'Weekend' && hour == 'Night time' && (num_tow > 0 || num_responder > 3)){checkresult = 'CPD2-2';}
									else if(num_truck > 0 && num_responder > 4){checkresult = 'CPD2-2';}
									else if(num_total >= 6){checkresult = 'CPD2-2';}
									else{checkresult = 'CPD2-1';}
								}
								if(checkresult == 'CPD2-2'){
									if(num_tow > 1){checkresult = 'CPD2-3';}
									else if(pavement == 'Wet' && num_fireboard > 0 && ( season == 'Spring' || season == 'Summer' )){checkresult = 'CPD2-3';}
									else if((num_total > 3) && (num_responder > 4)){checkresult = 'CPD2-3';}		
									else{checkresult = 'CPD2-2';}
								}
								if(checkresult == 'CPD2-3'){
									if(num_truck == 0){checkresult = 'CPD2-3';}
									else if(num_responder > 7){checkresult = 'CPD2-4';}
									else{checkresult = 'CPD2-3';}
								}

								if(checkresult == 'CPD2-1'){CPD2_case1();}
								else if(checkresult == 'CPD2-2'){CPD2_case2();}
								else if(checkresult == 'CPD2-3'){CPD2_case3();}
								else if(checkresult == 'CPD2-4'){CPD2_case4();}
							}
							else if((model['number_travel']=='3 Travel lanes blocked') || (model['number_travel']=='4 Travel lanes blocked') 
							|| (model['number_travel']=='5+ Travel lanes blocked')){
								checkresult = 'CPD3-0';
								if(checkresult == 'CPD3-0'){
									if(num_tow > 0){checkresult = 'CPD3-2';}
									else if(center == 'AOC'){checkresult = 'CPD3-2';}
									else if((num_total > 2) && (num_police > 1)){checkresult = 'CPD3-2';}
									else{checkresult = 'CPD3-1';}
								}
								if(checkresult == 'CPD3-2'){
									if((num_tow == 0) || (num_fireboard == 0)){checkresult = 'CPD3-2';}
									else if((num_total > 3) || (num_truck > 0)){checkresult = 'CPD3-3';}
									else{checkresult = 'CPD3-2';}
								}
								if(checkresult == 'CPD3-3'){
									if((num_chart > 3) || (num_responder > 8)){checkresult = 'CPD3-4';}
									else if(hour == 'Day time'){checkresult = 'CPD3-3';}
									else if(hazmat == true){checkresult = 'CPD3-4';}
									else{checkresult = 'CPD3-3';}
								}

								if(checkresult == 'CPD3-1'){CPD3_case1();}
								else if(checkresult == 'CPD3-2'){CPD3_case2();}
								else if(checkresult == 'CPD3-3'){CPD3_case3();}
								else if(checkresult == 'CPD3-4'){CPD3_case4();}
							}
						}
					}
					else if(model['blockage']=='Shoulder only blockage'){
						prob = 1/(1+Math.exp(-(-2.27-0.47*bc+0.07*cecil-0.28*harford+0.41*dry+0.98*snow+0.33*unspecified+0.84*wet-0.38*week+0.3*nonholiday_sh
							-0.23*num_total+0.52*num_car+1.04*num_truck+0.26*num_responder+0.34*num_fireboard+0.43*num_medical-0.23*cpi
							+0.48*spring+0.37*summer+0.54*winter+0.08*daytime+0.23*nighttime)));
						console.log(prob);

						if(num_tow > 0){shoulder_case2();}
						else if(center != 'AOC'){shoulder_case1();}
						else if(num_responder == 1 && pavement == 'Dry'){shoulder_case1();}
						else if(shoulder_drop == 2){shoulder_case2();}
						else if((cpi == 1 && hour == 'AM-peak') || (cpi == 1 && hour =='Night time')){shoulder_case2();}
						else if(hour == 'PM-peak'){shoulder_case1();}
						else if(prob <= 0.4 && num_truck == 0){shoulder_case1();}
						else if(prob > 0.5 && num_fireboard > 0){shoulder_case2();}
						else{shoulder_case3();}
					}
				}
				else if (model['incident'] == 'Non-Collision incident') {
					// need more input situation
					if(model['collision'] == 'Vehicles on Fire'){
						 drawSVG1(10, 90, 30, 100, "5~45", "60%");
						 drawSVG2(10, 120, 30, 130, "5~60", "70%");
						 drawSVG3(10, 180, 30, 190, "5~90", "80%");
						 drawSVG4("Average CT = 45 mins");
					}
					else if(model['collision'] == 'Emergency Roadwork'){
						$("#first_stop").text("100min");
						$("#second_stop").text("200min");
						$("#fourth_stop").text("400min");

						drawSVG1(10, 95, 40 , 105, "5~160", "60%");
						drawSVG2(10, 145, 60, 155, "5~240", "70%");
						drawSVG3(10, 195, 80, 205, "5~330", "80%");
						drawSVG4("Average CT = 170 mins");
					}
					else if(model['collision'] == 'Off-road Activity'){
						 drawSVG1(0, 60, 20, 70, "<30", "60%");
						 drawSVG2(0, 90, 20, 100, "<45", "70%");
						 drawSVG3(0, 120, 20, 130, "<60", "80%");
						 drawSVG4("Average CT = 40 mins");
					}
				}
			}
		}
	}
}

//Used to draw the labels in the bottom right corner
function drawSVG1(x1, x2, txt1_x, txt2_x, txt1, txt2){
	$("#line1").remove();
	newLine_1.setAttribute('x1',x1);
	newLine_1.setAttribute('x2',x2);
	txtElem_1.setAttributeNS(null,"x",txt1_x);
	txtElem2_1.setAttributeNS(null,"x",txt2_x);
	$("#text1").empty();
	$("#text2").empty();
	inside_txt_1 = document.createTextNode(txt1);
	percent_txt_1 = document.createTextNode(txt2);
}
function drawSVG2(x1, x2, txt1_x, txt2_x, txt1, txt2){
	$("#line2").remove();
	newLine_2.setAttribute('x1',x1);
	newLine_2.setAttribute('x2', x2);
	txtElem_2.setAttributeNS(null,"x",txt1_x);
	txtElem2_2.setAttributeNS(null,"x",txt2_x);
	$("#text1_2").empty();
	$("#text2_2").empty();
	inside_txt_2 = document.createTextNode(txt1);
	percent_txt_2 = document.createTextNode(txt2);
}
function drawSVG3(x1, x2, txt1_x, txt2_x, txt1, txt2){
	$("#line3").remove();
	newLine_3.setAttribute('x1', x1);
	newLine_3.setAttribute('x2', x2);
	txtElem_3.setAttributeNS(null,"x",txt1_x);
	txtElem2_3.setAttributeNS(null,"x",txt2_x);
	$("#text1_3").empty();
	$("#text2_3").empty();
	inside_txt_3 = document.createTextNode(txt1);
	percent_txt_3 = document.createTextNode(txt2);
}
function drawSVG4(average_time){
	//update average time line
	$("#text3").empty();
	last_line = document.createTextNode(average_time);
}

function activeNext(){
	var more_info = (road == "I-695" || road == "I-70" || road == "US-29"); // Boolean whether or not "More info needed" message is displayed
	var all_info = false; // Indicates if all information has been collected in the model
	if(model['incident']!= null && model["involved_veh"]!= null && model["responder"]!= null && model["center_choice"]!= null &&
		model["pavement_condition"]!=null && model["hour_time"]!= null && (model["location"] != null || model['exit'] != null)){
		more_info = false;
		all_info = true;
	}
	
	if(this.id == 'Save-1'){
		$("#Next-1").removeAttr("disabled");
	}
	else if(this.id == 'Save-2'){	
		$("#Next-2").removeAttr("disabled");
	}
	else if(this.id == 'Save-3'){
		$("#Next-3").removeAttr("disabled");
	}
	else if(this.id == 'Save-4'){
		$("#Next-4").removeAttr("disabled");
	}
	else if(this.id == 'Save-5'){
		$("#boxheader").text("Estimated Clearance Time");
		if(more_info){moreInfoNeeded_updateTime();} // Indicates more info is needed.
		if(all_info){$("#boxheader").text("All information has been recorded.");}

		if (document.getElementById("dropbox1s").value != ' ' && num_car == 0){
			alert("At least one vehicle should be involved when a situation is specified for a type.");
		}
		else if (document.getElementById("dropbox2s").value != ' ' && num_truck == 0){
			alert("At least one vehicle should be involved when a situation is specified for a type.");
		}
		else if (document.getElementById("dropbox3s").value != ' ' && num_bus == 0){
			alert("At least one vehicle should be involved when a situation is specified for a type.");
		}
		else if (document.getElementById("dropbox7s").value != ' ' && num_pickup == 0){
			alert("At least one vehicle should be involved when a situation is specified for a type.");
		}
		else if (document.getElementById("dropbox8s").value != ' ' && num_van == 0){
			alert("At least one vehicle should be involved when a situation is specified for a type.");
		}
		else {
			$("#Next-5").removeAttr("disabled");
		}
	}
	else if(this.id == 'Save-6'){
		$("#boxheader").text("Estimated Clearance Time");
		if(more_info){moreInfoNeeded_updateTime();}
		if(all_info){$("#boxheader").text("All information has been recorded.");}

		var responder_type;
		if (model['responder'] == 'First responder: CHART' && (responder_type = "chart") && num_chart > 0) {
			$("#Next-6").removeAttr("disabled");
		}
		else if (model['responder'] == 'First responder: POLICE' && (responder_type = "police") && num_police > 0) {
			$("#Next-6").removeAttr("disabled");
		}
		else if (model['responder'] == 'First responder: TOW' && (responder_type = "tow") && num_tow > 0) {
			$("#Next-6").removeAttr("disabled");
		}
		else if (model['responder'] == 'First responder: FIREBOARD' && (responder_type = "fireboard") && num_fireboard > 0) {
			$("#Next-6").removeAttr("disabled");
		}
		else if (model['responder'] == 'First responder: MEDICAL' && (responder_type = "medical") && num_medical > 0) {
			$("#Next-6").removeAttr("disabled");
		}
		else if (model['responder'] == 'First responder: Others' && (responder_type = "other") && num_others > 0) {
			$("#Next-6").removeAttr("disabled");
		}
		else if (responder_type == null) {
			alert("Please select a first responder.");
		}
		else {
			alert("Please enter number of " + responder_type + " vehicles.");
		}
	}
	else if(this.id == 'Save-7'){
		$("#boxheader").text("Estimated Clearance Time");
		if(more_info){moreInfoNeeded_updateTime();}
		if(all_info){$("#boxheader").text("All information has been recorded.");}
		$("#Next-7").removeAttr("disabled");
	}
	else if(this.id == 'Save-8'){
		$("#boxheader").text("Estimated Clearance Time");
		if(more_info){moreInfoNeeded_updateTime();}
		if(all_info){$("#boxheader").text("All information has been recorded.");}
		$("#Next-8").removeAttr("disabled");
	}
	else if(this.id == 'Save-9'){
		$("#boxheader").text("Estimated Clearance Time");
		if(more_info){moreInfoNeeded_updateTime();}
		if(all_info){$("#boxheader").text("All information has been recorded.");}
		$("#Next-9").removeAttr("disabled");
	}
	else if(this.id == 'Save-10' || this.id == 'Save-10_495' || this.id == 'Save-10_695' 
		|| this.id == 'Save-10_270' || this.id == 'Save-10_70' || this.id == 'Save-10_29'){
		$("#boxheader").text("Estimated Clearance Time");
		if(more_info){moreInfoNeeded_updateTime();}
		if(all_info){$("#boxheader").text("All information has been recorded.");}
	}
	else if(this.id == 'Save-11'){
		//$("#Next-11").removeAttr("disabled");
		radioValue4 = $("input[name='type']:checked").val();
		console.log(radioValue4);
	}
}

// Below are most of the display cases for CPI, CPD and Fatalities
function CPI1_case1() {
	if (road == "I-495") {
		drawSVG1(20, 60, 22, 70, "10~30", "60%");
		drawSVG2(10, 60, 19, 70, "5~30", "70%");
		drawSVG3(10, 70, 24, 80, "5~35", "80%");
		drawSVG4("Average CT = 22 mins");
	}
	else if (road == "I-695") {
		drawSVG1(20, 60, 22, 80, "10~30", "60%");
		drawSVG2(10, 60, 19, 90, "5~30", "70%");
		drawSVG3(10, 80, 28, 100, "5~40", "80%");
		drawSVG4("Average CT = 21 mins");
	}
	else if (road == "I-70") {
		drawSVG1(10, 50, 14, 60, "5~25", "60%");
		drawSVG2(10, 60, 19, 70, "5~30", "70%");
		drawSVG3(10, 80, 29, 90, "5~40", "80%");
		drawSVG4("Average CT = 21 mins");
	}
	else if (road == "US-29") {
		drawSVG1(0, 50, 9, 60, "0~25", "70%");
		drawSVG2(0, 60, 14, 70, "0~30", "80%");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 13 mins");
	}
	else {
		drawSVG1(20, 60, 35, 70, "10~30", "60%");
		drawSVG2(20, 70, 40, 80, "10~35", "70%");
		drawSVG3(20, 90, 50, 100, "10~45", "80%");
		drawSVG4("Average CT = 25 mins");
	}
}
function CPI1_case2() {
	if (road == "I-495") {
		drawSVG1(50, 100, 57, 110, "25~50", "60%");
		drawSVG2(40, 110, 57, 120, "20~55", "70%");
		drawSVG3(40, 120, 62, 130, "20~60", "80%");
		drawSVG4("Average CT = 38 mins");
	}
	else if (road == "I-695") {
		drawSVG1(50, 120, 68, 130, "25~60", "60%");
		drawSVG2(40, 120, 60, 130, "20~60", "70%");
		drawSVG3(30, 130, 60, 140, "15~65", "80%");
		drawSVG4("Average CT = 41 mins");
	}
	else if (road == "I-70") {
		drawSVG1(70, 150, 92, 160, "35~75", "70%");
		drawSVG2(60, 160, 92, 170, "30~80", "80%");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 52 mins");
	}
	else if (road == "US-29") {
		drawSVG1(60, 110, 67, 120, "30~55", "70%");
		drawSVG2(60, 120, 72, 130, "30~60", "80%");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 52 mins");
	}
	else {
		drawSVG1(50, 120, 70, 130, "25~60", "60%");
		drawSVG2(30, 120, 50, 130, "15~60", "70%");
		drawSVG3(20, 130, 40, 140, "10~65", "80%");
		drawSVG4("Average CT = 50 mins");
	}
}
function CPI1_case3() {
	if (road == "I-495") {
		drawSVG1(120, 170, 127, 180, "60~85", "60%");
		drawSVG2(120, 180, 132, 190, "60~90", "70%");
		drawSVG3(100, 200, 128, 210, "50~100", "80%");
		drawSVG4("Average CT = 68 mins");
	}
	else if (road == "I-695") {
		drawSVG1(120, 180, 130, 240, "60~90", "60%");
		drawSVG2(80, 210, 120, 240, "40~105", "70%");
		drawSVG3(50, 210, 110, 240, "25~105", "80%");
		drawSVG4("Average CT = 70 mins");
	}
	else if (road == "I-70") {
		drawSVG1(100, 240, 149, 250, "50~120", "70%");
		drawSVG2(90, 240, 144, 250, "45~120", "80%");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 79 mins");
	}
	else if (road == "US-29") {
		drawSVG1(120, 170, 127, 180, "60~85", "70%");
		drawSVG2(120, 180, 132, 190, "60~90", "80%");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 74 mins");
	}
	else {
		drawSVG1(120, 240, 150, 250, "60~120", "60%");
		drawSVG2(50, 240, 70, 250, "25~120", "70%");
		drawSVG3(30, 240, 50, 250, "15~120", "75%");
		drawSVG4("Average CT = 100 mins");
	}
}
function CPI1_case4() {
	if (road == "I-495") {
		drawSVG1(240, 300, 252, 300, ">=120", "100%");
		drawSVG2(0, 0, 0, 0, "", "");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 183 mins");
	}
	else if (road == "I-695") {
		drawSVG1(240, 300, 240, 300, ">=120", "85%");
		drawSVG2(180, 300, 180, 300, ">=90", "100%");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 182 mins");
	}
	else if (road == "I-70") {
		drawSVG1(240, 300, 255, 300, ">=120", "85%");
		drawSVG2(0, 0, 0, 0, "", "");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 134 mins");
	}
	else if (road == "US-29") {
		drawSVG1(240, 300, 252, 300, ">=120", "85%");
		drawSVG2(0, 0, 0, 0, "", "");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = >=120 mins"); //mean not given
	}
	else {
		drawSVG1(240, 300, 180, 300, ">=120", "75%");
		drawSVG2(160, 300, 180, 300, ">=80", "100%");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 150 mins");
	}
}

function CPI2_case1() {
	if (road == "I-495") {
		drawSVG1(20, 60, 22, 70, "10~30", "60%");
		drawSVG2(10, 60, 17, 70, "5~30", "70%");
		drawSVG3(10, 70, 22, 80, "5~35", "80%");
		drawSVG4("Average CT = 20 mins");
	}
	else if (road == "I-695") {
		drawSVG1(20, 60, 22, 70, "10~30", "60%");
		drawSVG2(10, 60, 20, 70, "5~30", "70%");
		drawSVG3(10, 70, 25, 80, "5~35", "80%");
		drawSVG4("Average CT = 20 mins");
	}
	else if (road == "I-70") {
		drawSVG1(30, 60, 65, 110, "15~30", "60%");
		drawSVG2(20, 60, 65, 110, "10~30", "70%");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 20 mins");
	}
	else if (road == "US-29") {
		drawSVG1(50, 90, 52, 100, "25~45", "60%");
		drawSVG2(0, 90, 27, 100, "0~45", "100%");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 37 mins");
	}
	else {
		drawSVG1(20, 50, 60, 120, "10~25", "60%");
		drawSVG2(20, 60, 70, 120, "10~30", "70%");
		drawSVG3(20, 80, 40, 120, "10~40", "80%");
		drawSVG4("Average CT = 30 mins");
	}
}
function CPI2_case2() {
	if (road == "I-495") {
		drawSVG1(40, 100, 52, 110, "20~50", "60%");
		drawSVG2(30, 110, 52, 120, "15~55", "70%");
		drawSVG3(30, 120, 57, 130, "15~60", "80%");
		drawSVG4("Average CT = 36 mins");
	}
	else if (road == "I-695") {
		drawSVG1(50, 120, 70, 130, "25~60", "60%");
		drawSVG2(40, 120, 60, 130, "20~60", "70%");
		drawSVG3(40, 140, 60, 150, "20~70", "80%");
		drawSVG4("Average CT = 46 mins");
	}
	else if (road == "I-70") {
		drawSVG1(40, 110, 57, 130, "20~55", "60%");
		drawSVG2(30, 120, 57, 130, "15~60", "70%");
		drawSVG3(30, 130, 62, 150, "15~65", "80%");
		drawSVG4("Average CT = 39 mins");
	}
	else if (road == "US-29") {
		drawSVG1(30, 110, 52, 120, "15~55", "60%");
		drawSVG2(30, 120, 57, 130, "15~60", "70%");
		drawSVG3(20, 140, 62, 150, "10~70", "80%");
		drawSVG4("Average CT = 38 mins");
	}
	else {
		drawSVG1(50, 120, 70, 130, "25~60", "60%");
		drawSVG2(20, 120, 40, 130, "10~60", "70%");
		drawSVG3(20, 140, 40, 150, "10~70", "80%");
		drawSVG4("Average CT = 50 mins");	
	}
}
function CPI2_case3() {
	if (road == "I-495") {
		drawSVG1(70, 210, 122, 220, "35~105", "60%");
		drawSVG2(60, 230, 127, 240, "30~115", "70%");
		drawSVG3(60, 250, 137, 260, "30~125", "80%");
		drawSVG4("Average CT = 71 mins");
	}
	else if (road == "I-695") {
		drawSVG1(110, 180, 127, 190, "55~90", "60%");
		drawSVG2(110, 210, 139, 220, "55~105", "70%");
		drawSVG3(100, 220, 139, 230, "50~110", "80%");
		drawSVG4("Average CT = 71 mins");
	}
	else if (road == "I-70") {
		drawSVG1(90, 190, 122, 200, "45~95", "60%");
		drawSVG2(80, 200, 119, 210, "40~100", "70%");
		drawSVG3(70, 200, 114, 210, "35~100", "80%");
		drawSVG4("Average CT = 67 mins");
	}
	else if (road == "US-29") {
		drawSVG1(140, 230, 164, 200, "70~115", "60%");
		drawSVG2(130, 240, 164, 210, "65~120", "70%");
		drawSVG3(130, 260, 174, 210, "65~130", "80%");
		drawSVG4("Average CT = 94 mins");
	}
	else {
		drawSVG1(140, 240, 160, 250, "70~120", "70%");
		drawSVG2(120, 240, 150, 250, "60~120", "75%");
		drawSVG3(100, 240, 140, 250, "50~120", "85%");
		drawSVG4("Average CT = 80 mins");	
	}
}
function CPI2_case4() {
	if (road == "I-495") {
		drawSVG1(240, 300, 252, 300, ">=120", "100%");
		drawSVG2(0, 0, 0, 0, "", "");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 209 mins");
	}
	else if (road == "I-695") {
		drawSVG1(240, 300, 252, 300, ">=120", "100%");
		drawSVG2(0, 0, 0, 0, "", "");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 292 mins");
	}
	else if (road == "I-70") {
		drawSVG1(240, 300, 254, 300, ">=120", "60%");
		drawSVG2(220, 300, 244, 300, ">=110", "70%");
		drawSVG3(190, 300, 230, 300, ">=95", "80%");
		drawSVG4("Average CT = 198 mins");	
	}
	else if (road == "US-29") {
		drawSVG1(240, 300, 252, 300, ">=120", "100%");
		drawSVG2(0, 0, 0, 0, "", "");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 258 mins");
	}
	else {
		drawSVG1(280, 300, 240, 300, ">=240", "60%");
		drawSVG2(240, 300, 250, 300, ">=120", "85%");
		drawSVG3(120, 300, 130, 300, ">=60", "100%");
		drawSVG4("Average CT = 210 mins");	
	}
}

function CPI3_case1() {
	if (road == "I-495") {
		drawSVG1(10, 50, 12, 60, "5~25", "60%");
		drawSVG2(10, 60, 17, 70, "5~30", "70%");
		drawSVG3(10, 70, 22, 80, "5~35", "80%");
		drawSVG4("Average CT = 18 mins");
	}
	else if (road == "I-695") {
		drawSVG1(10, 50, 20, 60, "5~25", "60%");
		drawSVG2(10, 60, 25, 70, "5~30", "70%");
		drawSVG3(10, 70, 30, 80, "5~35", "80%");
		drawSVG4("Average CT = 19 mins");
	}
	else {
		drawSVG1(20, 80, 30, 90, "10~40", "65%");
		drawSVG2(10, 60, 20, 80, "5~30", "70%");
		drawSVG3(10, 80, 25, 90, "5~40", "85%");
		drawSVG4("Average CT = 25 mins");
	}
}
function CPI3_case2() {
	if (road == "I-495") {
		drawSVG1(40, 100, 52, 110, "20~50", "60%");
		drawSVG2(40, 110, 57, 120, "20~55", "70%");
		drawSVG3(30, 120, 57, 130, "15~60", "80%");
		drawSVG4("Average CT = 37 mins");
	}
	else if (road == "I-695") {
		drawSVG1(50, 120, 70, 130, "25~60", "60%");
		drawSVG2(40, 150, 75, 160, "20~75", "70%");
		drawSVG3(30, 150, 70, 160, "15~75", "80%");
		drawSVG4("Average CT = 45 mins");
	}
	else {
		drawSVG1(60, 120, 72, 130, "30~60", "60%");
		drawSVG2(30, 120, 57, 130, "15~60", "70%");
		drawSVG3(20, 150, 67, 160, "10~75", "90%");
		drawSVG4("Average CT = 60 mins");
	}
}
function CPI3_case3() {
	if (road == "I-495") {
		drawSVG1(80, 210, 127, 220, "40~105", "60%");
		drawSVG2(80, 230, 137, 240, "40~115", "70%");
		drawSVG3(70, 230, 132, 240, "30~115", "80%");
		drawSVG4("Average CT = 69 mins");
	}
	else if (road == "I-695") {
		drawSVG1(120, 200, 135, 210, "60~100", "60%");
		drawSVG2(120, 210, 140, 220, "60~105", "70%");
		drawSVG3(110, 220, 140, 230, "55~110", "80%");
		drawSVG4("Average CT = 78 mins");
	}
	else {
		drawSVG1(120, 240, 180, 250, "60~120", "60%");
		drawSVG2(90, 240, 140, 250, "45~120", "70%");
		drawSVG3(50, 240, 110, 250, "25~120", "80%");
		drawSVG4("Average CT = 95 mins");
	}
}
function CPI3_case4() {
	if (road == "I-495") {
		drawSVG1(240, 300, 252, 300, ">=120", "70%");
		drawSVG2(160, 300, 212, 300, ">=80", "100%");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 148 mins");
	}
	else if (road == "I-695") {
		drawSVG1(240, 300, 190, 300, ">=120", "100%");
		drawSVG2(0, 0, 0, 0, "", "");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 263 mins");
	}
	else {
		drawSVG1(265, 300, 230, 300, ">=170", "60%");
		drawSVG2(250, 300, 200, 300, ">=140", "85%");
		drawSVG3(240, 300, 190, 300, ">=120", "100%");
		drawSVG4("Average CT = 225 mins");
	}
}

function CPD1_case1() {
	if (road == "I-495") {
		drawSVG1(10, 50, 12, 60, "5~25", "60%");
		drawSVG2(10, 60, 17, 70, "5~30", "70%");
		drawSVG3(10, 70, 22, 80, "5~35", "80%");
		drawSVG4("Average CT = 19 mins");
	}
	else if (road == "I-695") {
		drawSVG1(10, 60, 30, 70, "5~30", "60%");
		drawSVG2(10, 70, 35, 80, "5~35", "70%");
		drawSVG3(10, 80, 40, 90, "5~40", "80%");
		drawSVG4("Average CT = 21 mins");
	}
	else if (road == "I-70") {
		drawSVG1(10, 70, 24, 80, "5~35", "60%");
		drawSVG2(10, 80, 29, 90, "5~40", "70%");
		drawSVG3(10, 90, 34, 100, "5~45", "80%");
		drawSVG4("Average CT = 23 mins");
	}
	else if (road == "US-29") {
		drawSVG1(10, 110, 44, 120, "5~55", "60%");
		drawSVG2(10, 120, 49, 130, "5~60", "70%");
		drawSVG3(10, 150, 64, 160, "5~75", "80%");
		drawSVG4("Average CT = 27 mins");
	}
	else {
		drawSVG1(10, 50, 20, 60, "5~25", "60%");
		drawSVG2(10, 60, 30, 70, "5~30", "70%");
		drawSVG3(10, 70, 30, 80, "5~35", "80%");
		drawSVG4("Average CT = 25 mins");
	}
}
function CPD1_case2() {
	if (road == "I-495") {
		drawSVG1(40, 120, 62, 130, "20~60", "60%");
		drawSVG2(30, 130, 62, 140, "15~65", "70%");
		drawSVG3(20, 140, 62, 150, "10~70", "80%");
		drawSVG4("Average CT = 41 mins");
	}
	else if (road == "I-695") {
		drawSVG1(40, 120, 62, 130, "20~60", "60%");
		drawSVG2(30, 130, 62, 140, "15~65", "70%");
		drawSVG3(20, 140, 62, 150, "10~70", "80%");
		drawSVG4("Average CT = 41 mins");
	}
	else if (road == "I-70") {
		drawSVG1(60, 150, 87, 160, "30~75", "60%");
		drawSVG2(50, 180, 97, 190, "25~90", "70%");
		drawSVG3(30, 180, 87, 190, "15~90", "80%");
		drawSVG4("Average CT = 53 mins");
	}
	else if (road == "US-29") {
		drawSVG1(50, 110, 62, 120, "25~55", "70%");
		drawSVG2(40, 110, 57, 120, "20~55", "80%");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 39 mins");
	}
	else {
		drawSVG1(50, 120, 67, 130, "25~60", "60%");
		drawSVG2(30, 120, 57, 130, "15~60", "70%");
		drawSVG3(20, 120, 52, 130, "10~60", "80%");
		drawSVG4("Average CT = 50 mins");
	}
}
function CPD1_case3(){
	if (road == "I-495") {
		drawSVG1(120, 210, 147, 220, "60~105", "60%");
		drawSVG2(120, 220, 152, 230, "60~110", "70%");
		drawSVG3(110, 230, 152, 240, "55~115", "80%");
		drawSVG4("Average CT = 71 mins");
	}
	else if (road == "I-695") {
		drawSVG1(110, 180, 127, 190, "55~90", "60%");
		drawSVG2(110, 200, 134, 210, "55~100", "70%");
		drawSVG3(100, 230, 144, 240, "50~115", "80%");
		drawSVG4("Average CT = 68 mins");
	}
	else if (road == "I-70") {
		drawSVG1(120, 240, 159, 250, "60~120", "100%");
		drawSVG2(0, 0, 0, 0, "", "");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 100 mins"); //mean not given
	}
	else if (road == "US-29") {
		drawSVG1(120, 240, 159, 250, "60~120", "100%");
		drawSVG2(0, 0, 0, 0, "", "");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 75 mins");
	}
	else {
		drawSVG1(110, 240, 154, 250, "55~120", "60%");
		drawSVG2(90, 240, 144, 250, "45~120", "70%");
		drawSVG3(60, 240, 129, 250, "30~120", "80%");
		drawSVG4("Average CT = 95 mins");
	}
}
function CPD1_case4() {
	if (road == "I-495") {
		drawSVG1(240, 300, 252, 300, ">=120", "100%");
		drawSVG2(0, 0, 0, 0, "", "");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 149 mins");
	}
	else if (road == "I-695") {
		drawSVG1(240, 300, 252, 300, ">=120", "100%");
		drawSVG2(0, 0, 0, 0, "", "");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 156 mins");
	}
	else if (road == "I-70") {
		drawSVG1(240, 300, 252, 300, ">=120", "100%");
		drawSVG2(0, 0, 0, 0, "", "");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 337 mins");
	}
	else if (road == "US-29") {
		drawSVG1(240, 300, 252, 300, ">=120", "100%");
		drawSVG2(0, 0, 0, 0, "", "");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = >=120 mins"); //mean not given
	}
	else {
		drawSVG1(240, 300, 250, 300, ">=120", "60%");
		drawSVG2(200, 300, 220, 300, ">=100", "100%");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 135 mins");
	}		
}

function CPD2_case1() {
	if (road == "I-495") {
		drawSVG1(10, 50, 12, 60, "5~25", "60%");
		drawSVG2(10, 60, 17, 70, "5~30", "70%");
		drawSVG3(10, 70, 22, 80, "5~35", "80%");
		drawSVG4("Average CT = 18 mins");
	}
	else if (road == "I-695") {
		drawSVG1(10, 60, 20, 70, "5~30", "60%");
		drawSVG2(10, 70, 30, 80, "5~35", "70%");
		drawSVG3(10, 80, 40, 90, "5~40", "80%");
		drawSVG4("Average CT = 22 mins");
	}
	else if (road == "I-70") {
		drawSVG1(20, 50, 17, 60, "10~25", "60%");
		drawSVG2(20, 60, 22, 70, "10~30", "70%");
		drawSVG3(10, 60, 17, 70, "5~30", "80%");
		drawSVG4("Average CT = 19 mins");
	}
	else if (road == "US-29") {
		drawSVG1(10, 70, 22, 80, "5~35", "60%");
		drawSVG2(10, 100, 37, 110, "5~50", "70%");
		drawSVG3(10, 140, 57, 150, "5~70", "80%");
		drawSVG4("Average CT = 26 mins");
	}
	else {
		drawSVG1(10, 40, 50, 80, "5~20", "65%");
		drawSVG2(10, 60, 20, 90, "5~30", "75%");
		drawSVG3(10, 70, 20, 100, "5~35", "80%");
		drawSVG4("Average CT = 30 mins");
	}	
}
function CPD2_case2() {
	if (road == "I-495") {
		drawSVG1(40, 110, 57, 120, "20~55", "60%");
		drawSVG2(40, 120, 62, 130, "20~60", "70%");
		drawSVG3(30, 150, 72, 160, "15~75", "80%");
		drawSVG4("Average CT = 39 mins");
	}
	else if (road == "I-695") {
		drawSVG1(50, 100, 57, 110, "25~50", "60%");
		drawSVG2(40, 110, 57, 120, "20~55", "70%");
		drawSVG3(40, 140, 72, 150, "20~70", "80%");
		drawSVG4("Average CT = 42 mins");
	}
	else if (road == "I-70") {
		drawSVG1(60, 120, 72, 130, "30~60", "60%");
		drawSVG2(60, 130, 77, 140, "30~65", "70%");
		drawSVG3(60, 140, 82, 150, "30~70", "80%");
		drawSVG4("Average CT = 47 mins");
	}
	else if (road == "US-29") {
		drawSVG1(60, 110, 67, 120, "30~55", "60%");
		drawSVG2(50, 110, 62, 120, "25~55", "70%");
		drawSVG3(50, 120, 67, 130, "25~60", "80%");
		drawSVG4("Average CT = 40 mins");
	}
	else {
		drawSVG1(40, 120, 60, 130, "20~60", "65%");
		drawSVG2(20, 120, 40, 130, "10~60", "70%");
		drawSVG3(20, 140, 40, 150, "10~70", "75%");
		drawSVG4("Average CT = 50 mins");
	}		
}
function CPD2_case3() {
	if (road == "I-495") {
		drawSVG1(120, 170, 127, 180, "60~85", "60%");
		drawSVG2(90, 180, 117, 190, "45~90", "70%");
		drawSVG3(90, 200, 127, 210, "45~100", "80%");
		drawSVG4("Average CT = 66 mins");
	}
	else if (road == "I-695") {
		drawSVG1(120, 190, 140, 200, "60~95", "60%");
		drawSVG2(120, 220, 150, 230, "60~110", "70%");
		drawSVG3(120, 240, 160, 250, "60~120", "80%");
		drawSVG4("Average CT = 75 mins");
	}
	else if (road == "I-70") {
		drawSVG1(100, 220, 138, 230, "50~110", "70%");
		drawSVG2(90, 230, 138, 240, "45~115", "80%");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 84 mins");
	}
	else if (road == "US-29") {
		drawSVG1(120, 240, 159, 250, "60~120", "100%");
		drawSVG2(0, 0, 0, 0, "", "");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 84 mins");
	}
	else {
		drawSVG1(150, 240, 170, 250, "75~120", "60%");
		drawSVG2(140, 240, 160, 250, "70~120", "80%");
		drawSVG3(130, 240, 150, 250, "65~120", "100%");
		drawSVG4("Average CT = 85 mins");
	}
}
function CPD2_case4() {
	if (road == "I-495") {
		drawSVG1(240, 300, 252, 300, ">=120", "80%");
		drawSVG2(200, 300, 232, 300, ">=100", "100%");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 178 mins");
	}
	else if (road == "I-695") {
		drawSVG1(240, 300, 250, 300, ">=120", "100%");
		drawSVG2(0, 0, 0, 0, "", "");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 182 mins");
	}
	else if (road == "I-70") {
		drawSVG1(240, 300, 252, 300, ">=120", "100%");
		drawSVG2(0, 0, 0, 0, "", "");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 164 mins");
	}
	else if (road == "US-29") {
		drawSVG1(240, 300, 252, 300, ">=120", "100%");
		drawSVG2(0, 0, 0, 0, "", "");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = >=120 mins"); //mean not given
	}
	else {
		drawSVG1(240, 300, 250, 300, ">=120", "100%");
		drawSVG2(0, 0, 0, 0, "", "");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 200 mins");
	}
}

function CPD3_case1() {
	if (road == "I-495") {
		drawSVG1(10, 50, 12, 60, "5~25", "60%");
		drawSVG2(10, 60, 17, 70, "5~30", "70%");
		drawSVG3(10, 60, 17, 70, "5~30", "80%");
		drawSVG4("Average CT = 17 mins");
	}
	else if (road == "I-695") {
		drawSVG1(10, 60, 20, 70, "10~30", "60%");
		drawSVG2(10, 60, 20, 70, "10~30", "70%");
		drawSVG3(10, 60, 20, 70, "10~30", "80%");
		drawSVG4("Average CT = 20 mins");
	}
	else {
		drawSVG1(10, 50, 20, 60, "5~25", "60%");
		drawSVG2(10, 60, 30, 70, "5~30", "75%");
		drawSVG3(10, 70, 30, 80, "5~35", "80%");
		drawSVG4("Average CT = 20 mins");
	}
}
function CPD3_case2() {
	if (road == "I-495") {
		drawSVG1(40, 100, 52, 110, "20~50", "60%");
		drawSVG2(40, 110, 57, 120, "20~55", "70%");
		drawSVG3(40, 120, 62, 130, "20~60", "80%");
		drawSVG4("Average CT = 39 mins");
	}
	else if (road == "I-695") {
		drawSVG1(40, 100, 60, 110, "20~50", "60%");
		drawSVG2(40, 110, 60, 120, "20~55", "70%");
		drawSVG3(40, 120, 60, 130, "20~60", "80%");
		drawSVG4("Average CT = 38 mins");
	}
	else {
		drawSVG1(40, 120, 60, 130, "20~60", "60%");
		drawSVG2(30, 130, 50, 140, "15~65", "70%");
		drawSVG3(20, 140, 40, 150, "10~70", "80%");
		drawSVG4("Average CT = 60 mins");
	}
}
function CPD3_case3() {
	if (road == "I-495") {
		drawSVG1(120, 190, 137, 200, "60~95", "60%");
		drawSVG2(110, 210, 142, 220, "55~105", "70%");
		drawSVG3(110, 240, 157, 250, "55~120", "80%");
		drawSVG4("Average CT = 78 mins");
	}
	else if (road == "I-695") {
		drawSVG1(120, 180, 132, 190, "60~90", "60%");
		drawSVG2(120, 190, 137, 200, "60~95", "70%");
		drawSVG3(110, 200, 137, 210, "55~100", "80%");
		drawSVG4("Average CT = 76 mins");
	}
	else {
		drawSVG1(120, 240, 160, 250, "60~120", "70%");
		drawSVG2(110, 240, 155, 250, "55~120", "85%");
		drawSVG3(40, 240, 120, 250, "20~120", "100%");
		drawSVG4("Average CT = 65 mins");
	}
}
function CPD3_case4() {
	if (road == "I-495") {
		drawSVG1(240, 300, 252, 300, ">=120", "90%");
		drawSVG2(220, 300, 242, 300, ">=110", "100%");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 153 mins");
	}
	else if (road == "I-695") {
		drawSVG1(240, 300, 180, 300, ">=120", "100%");
		drawSVG2(0, 0, 0, 0, "", "");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 221 mins");
	}
	else {
		drawSVG1(240, 300, 260, 300, ">=120", "100%");
		drawSVG2(0, 0, 0, 0, "", "");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 260 mins");
	}
}

function shoulder_case1(){
	drawSVG1(0, 60, 20, 70, "<30", "75%");
	drawSVG2(0, 0, 0, 0, "", "");
	drawSVG3(0, 0, 0, 0, "", "");
	drawSVG4("");
}
function shoulder_case2(){
	drawSVG1(60, 300, 80, 300, ">=30", "75%");
	drawSVG2(0, 0, 0, 0, "", "");
	drawSVG3(0, 0, 0, 0, "", "");
	drawSVG4("");
}
function shoulder_case3(){
	drawSVG1(20, 100, 40, 110, "10~50", "75%");
	drawSVG2(0, 0, 0, 0, "", "");
	drawSVG3(0, 0, 0, 0, "", "");
	drawSVG4("");
}

function CF_case1(){
	$("#first_stop").text("100min");
	$("#second_stop").text("200min");
	$("#fourth_stop").text("400min");

	if (road == "I-495"){
		drawSVG1(60, 126, 75, 136, "100~210", "50%");
		drawSVG2(0, 0, 0, 0, "", "");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 100 mins");
	}
	else if (road == "I-695"){
		drawSVG1(96, 114, 124, 250, "160~190", "70%");
		drawSVG2(93, 120, 130, 250, "155~200", "80%");
		drawSVG3(90, 141, 151, 250, "150~235", "100%");
		drawSVG4("Average CT = 183 mins");
	}
	else if (road == "I-70"){
		drawSVG1(126, 195, 135, 205, "210~325", "70%");
		drawSVG2(123, 207, 140, 217, "205~345", "80%");
		drawSVG3(120, 216, 143, 226, "200~360", "100%");
		drawSVG4("Average CT = 272 mins");
	}
	else if (road == "US-29"){
		drawSVG1(0, 120, 42, 130, "0~200", "100%");
		drawSVG2(0, 0, 0, 0, "", "");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 124 mins");
	}
	else{
		drawSVG1(90, 126, 136, 250, "150~210", "70%");
		drawSVG2(90, 162, 100, 250, "150~270", "80%");
		drawSVG3(36, 162, 56, 250, "60~270", "100%");
		drawSVG4("Average CT = 170 mins");
	}
}
function CF_case2(){
	$("#first_stop").text("100min");
	$("#second_stop").text("200min");
	$("#fourth_stop").text("400min");

	if (road == "I-495"){
		drawSVG1(90, 126, 136, 192, "150~210", "100%");
		drawSVG2(0, 0, 0, 0, "", "");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 180 mins");
	}
	else if (road == "I-695"){
		drawSVG1(120, 300, 180, 300, ">=200", "100%");
		drawSVG2(0, 0, 0, 0, "", "");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 330 mins");
	}
	else if (road == "I-70"){
		drawSVG1(240, 300, 254, 300, ">=400", "100%");
		drawSVG2(0, 0, 0, 0, "", "");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 543 mins");
	}
	else if (road == "US-29"){
		drawSVG1(120, 300, 180, 300, ">=200", "100%");
		drawSVG2(0, 0, 0, 0, "", "");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 333 mins");
	}
	else{
		drawSVG1(126, 162, 172, 250, "210~270", "70%");
		drawSVG2(126, 180, 190, 250, "210~300", "80%");
		drawSVG3(18, 180, 38, 250, "30~300", "100%");
		drawSVG4("Average CT = 210 mins");
	}
}
function CF_case3(){
	$("#first_stop").text("100min");
	$("#second_stop").text("200min");
	$("#fourth_stop").text("400min");

	if (road == "I-495"){
		drawSVG1(90, 156, 97, 166, "150~260", "70%");
		drawSVG2(90, 195, 117, 205, "150~325", "80%");
		drawSVG3(90, 252, 145, 262, "150~420", "100%");
		drawSVG4("Average CT = 240 mins");
	}
	else{
		drawSVG1(126, 162, 176, 250, "210~270", "75%");
		drawSVG2(108, 162, 176, 250, "180~270", "100%");
		drawSVG3(0, 0, 0, 130, "", "");
		drawSVG4("Average CT = 230 mins");
	}
}
function CF_case4(){
	$("#first_stop").text("100min");
	$("#second_stop").text("200min");
	$("#fourth_stop").text("400min");

	if (road == "I-495"){
		drawSVG1(108, 162, 117, 172, "180~270", "100%");
		drawSVG2(0, 0, 0, 0, "", "");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 200 mins");
	}
	else{ 
		drawSVG1(198, 270, 210, 280, "330~450", "60%");
		drawSVG2(198, 288, 218, 298, "330~480", "80%");
		drawSVG3(72, 288, 92, 298, "120~480", "100%");
		drawSVG4("Average CT = 350 mins");
	}
}

function moreInfoNeeded_updateTime(){
	$("#first_stop").text("30min");
	$("#second_stop").text("60min");
	$("#fourth_stop").text("120min");

	$("#boxheader").text("More inputs are needed for accurate estimation.");
}