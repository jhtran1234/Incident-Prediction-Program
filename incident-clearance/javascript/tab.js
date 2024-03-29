"use strict";

var model = {"incident": null,"blockage": null,"collision": null, "detail_blockage_1": null,"detail_blockage_2": null,"detail_blockage_3": null,
 "number_travel": null,"number_shoulder": null, "involved_veh": null, "responder": null, "responder_number": null, "center_choice": null,
 "pavement_condition": null, "hazmat_condition": null, "season_time": null, "hour_time": null, "weekend_time": null, "holiday_time": null, "location": null, "direction": null,
 "exit": null};
// first label initialization
var newLine_1 = document.createElementNS('http://www.w3.org/2000/svg','line');
var txtElem_1 = document.createElementNS('http://www.w3.org/2000/svg','text');
var txtElem2_1 = document.createElementNS('http://www.w3.org/2000/svg','text');
var inside_txt_1;
var percent_txt_1;
// second label initialization
var newLine_2 = document.createElementNS('http://www.w3.org/2000/svg','line');
var txtElem_2 = document.createElementNS('http://www.w3.org/2000/svg','text');
var txtElem2_2 = document.createElementNS('http://www.w3.org/2000/svg','text');
var inside_txt_2;
var percent_txt_2;
// third label initialization
var newLine_3 = document.createElementNS('http://www.w3.org/2000/svg','line');
var txtElem_3 = document.createElementNS('http://www.w3.org/2000/svg','text');
var txtElem2_3 = document.createElementNS('http://www.w3.org/2000/svg','text');
var inside_txt_3;
var percent_txt_3;
// average time line initialization
var txtElem3 = document.createElementNS('http://www.w3.org/2000/svg','text');
var last_line;

// global variables will be used in other functions
var travel_drop;
var shoulder_drop;
var total_lane;

// boolean vars to show blockage
var aux_lane;
var tunnel_lane;
var toll_lane;

// vars to indicate state of vehicles
var involved_car;
var involved_truck;
var involved_bus;
var involved_pickup;
var involved_van;
var involved_suv;
var involved_pedestrian;
var involved_cyclist;
var involved_motorcycle;
var involved_total;
let car_hazards = [];
let truck_hazards = [];
let bus_hazards = [];
let pickup_hazards = [];
let van_hazards = [];
let suv_hazards = [];
var num_car;
var num_truck;
var num_bus;
var num_pickup;
var num_van;
var num_suv;
var num_pedestrian;
var num_cyclist;
var num_motorcycle;
var num_total;	
var val;

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
var holiday;
var nonholiday = 0;
var nonholiday_sh = 1;
var timepickers;

var location_choice;

// Used for i95 locations
var baltimoreCity = 0;
var cecil = 0;
var harford = 0;

var daytime = 0;
var nighttime = 0;
var prob;
var popup = 0;
var checkresult;
var ninetenam = 0;

// Represents the road being worked on
// in this program, null road defaults to I-95
var road = location.search.substring(1); 

// Lists to dictate which road belongs to which cluster.
// Usage will look like cluster1.includes(road_name)
const cluster1 = ['md122', 'md168', 'md702', 'md85', 'us1'];
const cluster2 = ['md200', 'md295', 'md648', 'i895', 'i83', 'i395'];
const cluster3 = ['i81', 'us15', 'us301', 'us40', 'us50'];
const cluster4 = ['i270', 'i795', 'i97'];
const cluster5 = ['i195', 'i295', 'md10', 'md100', 'md3'];
const cluster6 = ['others'];

$(document).ready(function() {
	// timepicker initialization
	timepickers = $('.timepicker').wickedpicker();
	// datepicker with day of week
	$("#datepicker").datepicker({
		defaultDate: new Date(),
		onSelect: function(dateText, inst) {
			var date = $.datepicker.parseDate(inst.settings.dateFormat || $.datepicker._defaults.dateFormat, dateText, inst.settings);
			var dateText = $.datepicker.formatDate("DD", date, inst.settings);
			$("p.name").text(dateText); // Just the day of week
		}
	});
	$( "#datepicker" ).val($.datepicker.formatDate("mm-dd-yy", new Date()));
	// tab could be mouseover
	$('.incident-info .menu .item').tab();
	 
	getDate();
	my_getTime();
	
	// click radiocheck and update the summary
	$("#checkbox-size input").click(updateSum);
	$("#checkbox-size1 input").click(updateSum);
	$("#checkbox-size input").click(updateSum2);
	$("#checkbox-size select#t3_1").click(updateSum2);
	$("#checkbox-size1 select#t3_1").click(updateSum2);
	$("#checkbox-size select#t3_2").click(updateSum2);
	$("#checkbox-size1 select#t3_2").click(updateSum2);
	
	// IV page dropdown
	$("#checkbox-size1 select").click(updateSum2);
	$("#checkbox-size select").click(updateSum2);
	// displays different vehicles and location pages for different roads
	if (road == "i495") {
		$("#involved_vehicles_5").removeAttr("style"); // Displays VAN vehicle for picking
		$("#iv8").removeAttr("style"); // Displays VAN vehicle for picking

		// Location page dropdowns
		$("#dropdown_location_495 select").click(updateSum2);
		$("#dropdown_direction_495 select").click(updateSum2);
		$("#dropdown_exit_495 select").click(updateSum2);
	}
	else if (road == "i695") {
		// Location page dropdowns
		$("#dropdown_location_695 select").click(updateSum2);
		$("#dropdown_direction_695 select").click(updateSum2);
		$("#dropdown_exit_695 select").click(updateSum2);
	}
	else if (road == "i70") {
		$("#involved_vehicles_6").removeAttr("style"); // Displays SUV vehicle for picking
		$("#iv9").removeAttr("style"); // Displays SUV vehicle for picking
		
		// Location page dropdowns
		$("#dropdown_location_70 select").click(updateSum2);
		$("#dropdown_direction_70 select").click(updateSum2);
		$("#dropdown_exit_70 select").click(updateSum2);
	}
	else if (road == "us29") {
		// Location page dropdowns
		$("#dropdown_location_29 select").click(updateSum2);
		$("#dropdown_direction_29 select").click(updateSum2);
		$("#dropdown_exit_29 select").click(updateSum2);
	}
	else if (cluster1.concat(cluster2, cluster3, cluster4, cluster5, cluster6).includes(road)) {
		$("#involved_vehicles_5").removeAttr("style"); // Displays VAN vehicle
		$("#iv8").removeAttr("style");

		$("#involved_vehicles_6").removeAttr("style"); // Displays SUV vehicle
		$("#iv9").removeAttr("style");

		document.querySelectorAll('.thumbnail_responder img').forEach((img) => {
			img.style.width = "48.8px";
			img.style.height = "28px";
			img.style.marginLeft = "9px";
		});
	}

	// IV page dropdown
	$("#checkbox-size select").click(updateTime);
	$("#checkbox-size1 select").click(updateTime);
	// click radiocheck and update the estimated time
	$("#checkbox-size input").click(updateTime);
	$("#checkbox-size1 input").click(updateTime);
	$("#checkbox-size select#t3_1").click(updateTime);
	$("#checkbox-size1 select#t3_1").click(updateTime);
	$("#checkbox-size select#t3_2").click(updateTime);
	$("#checkbox-size1 select#t3_2").click(updateTime);

	$("button[name='save']").click(activeNext);

	var radioValue1;
	
	// tabs handler	for summary box
	$("#data_tab_1").click(function() {
		document.getElementById("showModel").setAttribute("style", "display: flex");
	});
	$("#data_tab_2").click(function() {
		document.getElementById("showModel").setAttribute("style", "display: none");
	});
	$("#data_tab_3").click(function() {
		document.getElementById("showModel").setAttribute("style", "display: none");
	});
	$("#location_95").click(function() {
		document.getElementById("showModel").setAttribute("style", "display: none");
	});
	$("#location_495").click(function() {
		document.getElementById("showModel").setAttribute("style", "display: none");
	});
	$("#location_695").click(function() {
		document.getElementById("showModel").setAttribute("style", "display: none");
	});
	$("#location_70").click(function() {
		document.getElementById("showModel").setAttribute("style", "display: none");
	});
	$("#location_29").click(function() {
		document.getElementById("showModel").setAttribute("style", "display: none");
	});
	$("#location_cluster").click(function() {
		document.getElementById("showModel").setAttribute("style", "display: none");
	});
	$("#results_tab").click(function() {
		document.getElementById("showModel").setAttribute("style", "display: flex");
	});
	
	// next button handler	
	$("#Next-1").click(function() {
		radioValue1 = $("input[name='incident']:checked").val();
		if (radioValue1 == 'collision') {
			$.tab('change tab', '1-1');
		}
		else if (radioValue1 == 'non') {
			$.tab('change tab', '1-4');
		}
	});

	$("#Next-2").click(function() {
		$.tab('change tab', '1-2');
	});

	$("#Next-3").click(function() {
		$.tab('change tab', '1-3');
	});	

	$("#Next-4").click(function() {
		document.getElementById("showModel").setAttribute("style", "display: none");
		$('.ui.menu').find('.item').tab('change tab', '2');
	});

	/* 
	 * Responder tab's next button
	 * Ensures that if a first responder is selected, the number of vehicles is > 0
	 */
	$("#Next-5").click(function() {
		$('.ui.menu').find('.item').tab('change tab', '3');
	});

	$("#Next-6").click(function() {
		if (road=="i495") {
			$('.ui.menu').find('.item').tab('change tab', '5');
		}
		else if (road=="i695") {
			$('.ui.menu').find('.item').tab('change tab', '6');
		}
		else if (road=="i70") {
			$('.ui.menu').find('.item').tab('change tab', '8');
		}
		else if (road=="us29") {
			$('.ui.menu').find('.item').tab('change tab', '9');
		}
		else if (cluster1.includes(road) || cluster2.includes(road) || cluster3.includes(road) || cluster4.includes(road) || cluster5.includes(road) || cluster6.includes(road)) {
			$('.ui.menu').find('.item').tab('change tab', '10');
		}
		else {
			$('.ui.menu').find('.item').tab('change tab', '4');
		}
	});
	
	$("#Next-7").click(function() {
		$('.ui.menu').find('.item').tab('change tab', '11');
		showModel();
	});
	$("#Next-7_495").click(function() {
		$('.ui.menu').find('.item').tab('change tab', '11');
		showModel();
	});
	$("#Next-7_695").click(function() {
		$('.ui.menu').find('.item').tab('change tab', '11');
		showModel();
	});
	$("#Next-7_70").click(function() {
		$('.ui.menu').find('.item').tab('change tab', '11');
		showModel();
	});
	$("#Next-7_29").click(function() {
		$('.ui.menu').find('.item').tab('change tab', '11');
		showModel();
	});
	$("#Next-7_cluster").click(function() {
		$('.ui.menu').find('.item').tab('change tab', '11');
		showModel();
	});
	
	// back button handler
	$("#Back-2").click(function() {
		$.tab('change tab', '1');
	});
	$("#Back-3").click(function() {
		$.tab('change tab', '1-1');	
	});
	$("#Back-4").click(function() {
		$.tab('change tab', '1-2');
	});
	$("#Back-1-4").click(function() {
		$.tab('change tab', '1');
	});
	$("#Back-5").click(function() {
		$("#showModel").removeAttr("style");
		$('.ui.menu').find('.item').tab('change tab', '1');
	});
	$("#Back-6").click(function() {
		$('.ui.menu').find('.item').tab('change tab', '2');
	});
	$("#Back-7").click(function() {
		$('.ui.menu').find('.item').tab('change tab', '3');
	});
	$("#Back-7_495").click(function() {
		$('.ui.menu').find('.item').tab('change tab', '3');
	});
	$("#Back-7_695").click(function() {
		$('.ui.menu').find('.item').tab('change tab', '3');
	});
	
	$("#Back-7_70").click(function() {
		$('.ui.menu').find('.item').tab('change tab', '3');
	});
	$("#Back-7_29").click(function() {
		$('.ui.menu').find('.item').tab('change tab', '3');
	});
	$("#Back-7_cluster").click(function() {
		$('.ui.menu').find('.item').tab('change tab', '3');
	});
	
	/**
	 * Back button handler for results page.
	 * Need to make logic to redirect the back button to the correct location page.
	 */
	$("#Back-11").click(function() {
		$('.ui.menu').find('.item').tab('change tab', '3');
		document.getElementById("showModel").setAttribute("style", "display: none");
	});
});

function showModel() {
	document.getElementById("showModel").setAttribute("style", "display: flex");
}

// updates the model whenever a radio button is selected
function updateSum() {
	// Lists to match valid responses against
	const incident = ['Collision incident', 'Non-Collision incident'];
	const blockage = ['Travel lane blockage', 'Shoulder only blockage'];
	const collision = ['Fatality', 'Personal Injury', 'Property Damage only']
	const non_collision = ['Debris in Roadway', 'Disabled Vehicle', 'Vehicles on Fire', 'Emergency Roadwork', 
		'Off-road Activity', 'Police Activity', 'Utility Problem', 'Weather Closure', 'Others'];
	const responder = {'CHART':num_chart, 'POLICE':num_police, 'TOW':num_tow, 'FIREBOARD':num_fireboard, 'MEDICAL':num_medical, 'OTHERS':num_others};
	const center_choice = ['AOC', 'SOC', 'Other', 'TOC3', 'TOC4', 'TOC5', 'TOC7'];
	const pavement_choice = ['Dry', 'Wet', 'Snow/Ice', 'Chemical wet', 'Unspecified'];
	
	var curr = $(this).parent().find("label").text(); // current working parameter - all radio buttons direct here
	if (incident.includes(curr)) {
		model['incident'] = curr;
		$("#Save-1").removeAttr("disabled");
	}
	else if (blockage.includes(curr)) {
		model['blockage'] = curr;
		$("#Save-2").removeAttr("disabled");
	}
	// type 3 for collision
	else if (collision.includes(curr)) {
		model['collision'] = curr;
		$("#Save-3").removeAttr("disabled");
	}
	// type 4 for non-collision
	else if (non_collision.includes(curr)) {
		model['collision'] = curr;
		$("#Save-1-4").removeAttr("disabled");
	}
	else if (Object.keys(responder).includes(curr)) {
		first_responder = curr;
		if (curr == 'OTHERS') {model['responder'] = 'First responder: Others';}
		else {model['responder'] = 'First responder: ' + curr;}
		if (Number(responder[curr]) > 0) {$("#Save-6").removeAttr("disabled");}
	}
	// center
	else if (center_choice.includes(curr)) {
		center = curr;
		model['center_choice'] = center;
	}
	// pavement
	else if (pavement_choice.includes(curr)) {
		pavement = curr;
		model['pavement_condition'] = curr + ' pavement condition';
	}

	// location i95
	else if (curr == "Prince George's") {
		location_choice = curr;
		model['location'] = location_choice;
		$("#Save-7").removeAttr("disabled");
	}
	else if (curr == 'Howard') {
		location_choice = curr;
		model['location'] = location_choice;
		$("#Save-7").removeAttr("disabled");
	}
	else if (curr == 'Baltimore city') {
		location_choice = curr;
		baltimoreCity = 1;
		model['location'] = location_choice;
		$("#Save-7").removeAttr("disabled");
	}
	else if (curr == 'Baltimore') {
		location_choice = curr;
		model['location'] = location_choice;
		$("#Save-7").removeAttr("disabled");
	}
	else if (curr == 'Harford') {
		location_choice = curr;
		harford = 1
		model['location'] = location_choice;
		$("#Save-7").removeAttr("disabled");
	}
	else if (curr == 'Cecil') {
		location_choice = curr;
		cecil = 1;
		model['location'] = location_choice;
		$("#Save-7").removeAttr("disabled");
	}

	aux_lane = document.getElementById("b1").checked;
	console.log(aux_lane);		
	if (aux_lane == true) {
		model['detail_blockage_1'] = 'An Auxiliary lane blocked';
		$("#Save-4").removeAttr("disabled");
	}
	else if (aux_lane == false) {
		model['detail_blockage_1'] = null;
	}
	tunnel_lane = document.getElementById("b2").checked;
	console.log(tunnel_lane);		
	if (tunnel_lane == true) {
		model['detail_blockage_2'] = 'A lane in TUNNEL blocked';
		$("#Save-4").removeAttr("disabled");
	}
	else if (tunnel_lane == false) {
		model['detail_blockage_2'] = null;
	}
	toll_lane = document.getElementById("b3").checked;
	console.log(toll_lane);		
	if (toll_lane == true) {
		model['detail_blockage_3'] = 'A lane in TOLL area blocked';
		$("#Save-4").removeAttr("disabled");
	}
	else if (toll_lane == false) {
		model['detail_blockage_3'] = null;
	}

	if (model['center_choice'] == center && model['pavement_condition'] == pavement + ' pavement condition') {
		$("#Save-6").removeAttr("disabled");
	}

	// hazmat
	hazmat = document.getElementById("haz").checked;
	console.log(hazmat);
	if (hazmat == true) {
		model['hazmat_condition'] = 'Hazmat material related';
	}
	else if (hazmat == false) {
		model['hazmat_condition'] = null;
	}
}

// updates the model whenever a dropdown option is selected
function updateSum2() {
	travel_drop = document.getElementById("t3_1").value;
	console.log(travel_drop);
	if (travel_drop == 0) {
		model['number_travel'] = null;
	}
	else if (travel_drop == 1) {
		model['number_travel'] = "1 Travel lane blocked";
		$("#Save-4").removeAttr("disabled");
	}
	else if (travel_drop >= 2 && travel_drop <= 4) {
		model['number_travel'] = travel_drop + " Travel lanes blocked";
		$("#Save-4").removeAttr("disabled");
	}
	else {
		model['number_travel'] = "5+ Travel lanes blocked";
		$("#Save-4").removeAttr("disabled");
	}

	shoulder_drop = document.getElementById("t3_2").value;
	console.log(shoulder_drop);	
	if (shoulder_drop == 0) {
		model['number_shoulder'] = null;
	}
	else if (shoulder_drop == 1) {
		model['number_shoulder'] = "1 Shoulder lane blocked";
		$("#Save-4").removeAttr("disabled");
	}
	else if (shoulder_drop >= 2 && shoulder_drop <= 4) {
		model['number_shoulder'] = shoulder_drop + " Shoulder lanes blocked";
		$("#Save-4").removeAttr("disabled");
	}
	else if (shoulder_drop == '5') {
		model['number_shoulder'] = "5+ Shoulder lanes blocked";
		$("#Save-4").removeAttr("disabled");
	}
	
	total_lane = Number(travel_drop) + Number(shoulder_drop);
	console.log(total_lane);

	// Involved Vehicles page
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
	involved_motorcycle = document.getElementById("dropbox6").value;
	console.log(involved_motorcycle);

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
	num_motorcycle = Number($("#dropbox6 option:selected").text());
	console.log(num_motorcycle);
	num_total = num_car + num_truck + num_bus + num_pickup + num_van + num_suv + num_pedestrian + num_cyclist + num_motorcycle;
	console.log(num_total);

	var involved_car_s;
	var involved_truck_s;
	var involved_bus_s;
	var involved_pickup_s;
	var involved_van_s; // Van only shows for 495, clusters; this var is only in use for those roads
	var involved_suv_s; // SUV only shows for 70, clusters; this var is only in use for those roads
          
	if (num_car > 0) {
		involved_car_s = '';
		car_hazards = [];
		document.querySelectorAll('input[name="dropbox1s"]:checked').forEach((checkbox) => {
			involved_car_s += ":" + checkbox.value;
			car_hazards.push(checkbox.value);
		});
	}
	else {
		involved_car_s = '';
	}
	
	if (num_truck > 0) {
		involved_truck_s = '';
		truck_hazards = [];
		document.querySelectorAll('input[name="dropbox2s"]:checked').forEach((checkbox) => {
			involved_truck_s += ":" + checkbox.value;
			truck_hazards.push(checkbox.value);
		});
	}
	else {
		involved_truck_s = '';
	}

	if (num_bus > 0) {
		involved_bus_s = '';
		bus_hazards = [];
		document.querySelectorAll('input[name="dropbox3s"]:checked').forEach((checkbox) => {
			involved_bus_s += ":" + checkbox.value;
			bus_hazards.push(checkbox.value);
		});
	}
	else {
		involved_bus_s = '';
	}

	if (num_pickup > 0) {
		involved_pickup_s = '';
		pickup_hazards = [];
		document.querySelectorAll('input[name="dropbox7s"]:checked').forEach((checkbox) => {
			involved_pickup_s += ":" + checkbox.value;
			pickup_hazards.push(checkbox.value);
		});
	}
	else {
		involved_pickup_s = '';
	}
	
	if (num_van > 0) {
		involved_van_s = '';
		van_hazards = [];
		document.querySelectorAll('input[name="dropbox8s"]:checked').forEach((checkbox) => {
			involved_van_s += ":" + checkbox.value;
			van_hazards.push(checkbox.value);
		});
	}
	else {
		involved_van_s = '';
	}
	
	if (num_suv > 0) {
		involved_suv_s = '';
		suv_hazards = [];
		document.querySelectorAll('input[name="dropbox9s"]:checked').forEach((checkbox) => {
			involved_suv_s += ":" + checkbox.value;
			suv_hazards.push(checkbox.value);
		});
	}
	else {
		involved_suv_s = '';
	}
	
	if (num_total <= 0) {
		model['involved_veh'] = null;
	}
	else {
		model['involved_veh'] = "";

		if (num_car > 0) {
			model['involved_veh'] += involved_car;
			if (car_hazards.length > 0) {model['involved_veh'] += '(' + involved_car_s + ') ';}
		}
		if (num_truck > 0) {
			model['involved_veh'] += involved_truck;
			if (truck_hazards.length > 0) {model['involved_veh'] += '(' + involved_truck_s + ') ';}
		}
		if (num_bus > 0) {
			model['involved_veh'] += involved_bus;
			if (bus_hazards.length > 0) {model['involved_veh'] += '(' + involved_bus_s + ') ';}
		}
		if (num_pickup > 0) {
			model['involved_veh'] += involved_pickup;
			if (pickup_hazards.length > 0) {model['involved_veh'] += '(' + involved_pickup_s + ') ';}
		}
		if (num_van > 0) {
			model['involved_veh'] += involved_van;
			if (van_hazards.length > 0) {model['involved_veh'] += '(' + involved_van_s + ') ';}
		}
		if (num_suv > 0) {
			model['involved_veh'] += involved_suv;
			if (suv_hazards.length > 0) {model['involved_veh'] += '(' + involved_suv_s + ') ';}
		}
		if (num_pedestrian > 0) {model['involved_veh'] += involved_pedestrian;}
		if (num_cyclist > 0) {model['involved_veh'] += involved_cyclist;}
		if (num_motorcycle > 0) {model['involved_veh'] += involved_motorcycle;}
		model['involved_veh'] += 'involved';
	}
	
	// Responder page
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

	if (model['responder'] == 'First responder: CHART') {
		val = chart_value;
	}
	else if (model['responder'] == 'First responder: POLICE') {
		val = police_value ;
	}
	else if (model['responder'] == 'First responder: TOW') {
		val = tow_value;
	}
	else if (model['responder'] == 'First responder: FIREBOARD') {
		val = fireboard_value;	
	}
	else if (model['responder'] == 'First responder: MEDICAL') {
		val = medical_value;
	}
	else if (model['responder'] == 'First responder: Others') {
		val = others_value;
	}
	else {
		val = ' ';
	}

	if (num_responder == 1) {
		model['responder_number'] = chart_value + police_value + tow_value + fireboard_value + medical_value + others_value +'is responding.';
	}
	else if (num_responder > 1) {
		model['responder_number'] = chart_value + police_value + tow_value + fireboard_value + medical_value + others_value +'are responding.';
	}
	else {
		model['responder_number'] = null;
	}

	if (model['involved_veh'] != null && model['responder'] != null && model['responder_number'] != null) {
		if (model['responder'] == 'First responder: CHART' && num_chart > 0
			|| model['responder'] == 'First responder: POLICE' && num_police > 0
			|| model['responder'] == 'First responder: TOW' && num_tow > 0
			|| model['responder'] == 'First responder: FIREBOARD' && num_fireboard > 0
			|| model['responder'] == 'First responder: MEDICAL' && num_medical > 0
			|| model['responder'] == 'First responder: Others' && num_others > 0) {
			$("#Save-5").removeAttr("disabled");
		}
		else {
			document.getElementById("Save-5").disabled = true;
			document.getElementById("Next-5").disabled = true;
		}
	}
	else {
		document.getElementById("Save-5").disabled = true;
		document.getElementById("Next-5").disabled = true;
	}
	
	// location page: location, direction and exit (road specific)
	if (road == "i495") {
		location_choice = $("#dropdown_location_495 option:selected").text();
		console.log(location_choice);

		direction = $("#dropdown_direction_495 option:selected").text();
		console.log(direction);
	
		exit = $("#dropdown_exit_495 option:selected").text();
		console.log(exit);
		
		if (location_choice != "Location") {
			model['location'] = location_choice;
			$("#Save-7_495").removeAttr("disabled");
		}
		else {
			model['location'] = null;
		}
		if (direction != "Direction") {
			model['direction'] = direction;
			$("#Save-7_495").removeAttr("disabled");
		}
		else {
			model['direction'] = null;
		}	
		if (exit != "Exit") {
			model['exit'] = exit;
			$("#Save-7_495").removeAttr("disabled");
		}
		else {
			model['exit'] = null;
		}
	}
	else if (road == "i695") {
		location_choice = $("#dropdown_location_695 option:selected").text();
		console.log(location_choice);

		direction = $("#dropdown_direction_695 option:selected").text();
		console.log(direction);
	
		exit = $("#dropdown_exit_695 option:selected").text();
		console.log(exit);
		
		if (location_choice != "Location") {
			model['location'] = location_choice;
			$("#Save-7_695").removeAttr("disabled");
		}
		else {
			model['location'] = null;
		}
		if (direction != "Direction") {
			model['direction'] = direction;
			$("#Save-7_695").removeAttr("disabled");
		}
		else {
			model['direction'] = null;
		}
		if (exit != "Exit") {
			model['exit'] = exit;
			$("#Save-7_695").removeAttr("disabled");
		}
		else {
			model['exit'] = null;
		}
	}
	else if (road == "i70") {
		location_choice = $("#dropdown_location_70 option:selected").text();
		console.log(location_choice);

		direction = $("#dropdown_direction_70 option:selected").text();
		console.log(direction);
	
		exit = $("#dropdown_exit_70 option:selected").text();
		console.log(exit);
		
		if (location_choice != "Location") {
			model['location'] = location_choice;
			$("#Save-7_70").removeAttr("disabled");
		}
		else {
			model['location'] = null;
		}
		if (direction != "Direction") {
			model['direction'] = direction;
			$("#Save-7_70").removeAttr("disabled");
		}
		else {
			model['direction'] = null;
		}
		if (exit != "Exit") {
			model['exit'] = exit;
			$("#Save-7_70").removeAttr("disabled");
		}
		else {
			model['exit'] = null;
		}
	}
	else if (road == "us29") {
		location_choice = $("#dropdown_location_29 option:selected").text();
		console.log(location_choice);

		direction = $("#dropdown_direction_29 option:selected").text();
		console.log(direction);
	
		exit = $("#dropdown_exit_29 option:selected").text();
		console.log(exit);
		
		if (location_choice != "Location") {
			model['location'] = location_choice;
			$("#Save-7_29").removeAttr("disabled");
		}
		else {
			model['location'] = null;
		}
		if (direction != "Direction") {
			model['direction'] = direction;
			$("#Save-7_29").removeAttr("disabled");
		}
		else {
			model['direction'] = null;
		}
		if (exit != "Exit") {
			model['exit'] = exit;
			$("#Save-7_29").removeAttr("disabled");
		}
		else {
			model['exit'] = null;
		}
	}
	else if (cluster1.includes(road) || cluster2.includes(road) || cluster3.includes(road) || cluster4.includes(road) || cluster5.includes(road) || cluster6.includes(road)) {
		location_choice = $("#dropdown_location_cluster option:selected").text();
		console.log(location_choice);

		if (location_choice != "Location") {
			model['location'] = location_choice;
			$("#Save-7_cluster").removeAttr("disabled");

			if (location_choice == "Washington DC Area") {document.getElementById("clusterimg").src = "images/DC.jpg";}
			else if (location_choice == "Baltimore Area") {document.getElementById("clusterimg").src = "images/Baltimore.jpg";}
			else if (location_choice == "Others") {document.getElementById("clusterimg").src = "images/dcbal.png";}

		}
		else {
			document.getElementById("clusterimg").src = "images/dcbal.png"
			model['location'] = null;
		}
		model['direction'] = null;
		model['exit'] = null;
	}
	else {
		direction = $("#dropdown_direction option:selected").text();
		console.log(direction);
	
		exit = $("#dropdown_exit option:selected").text();
		console.log(exit);
		if (direction != "Direction") {
			model['direction'] = direction;
			$("#Save-7").removeAttr("disabled");
		}
		else {
			model['direction'] = null;
		}
		if (exit != "Exit") {
			model['exit'] = exit;
			$("#Save-7").removeAttr("disabled");
		}
		else {
			model['exit'] = null;
		}
	}
	console.log(model);
}

function getDate() {
	// selecting the button and adding a click event
	$("#Save-6").click(function() {
		// alerting the value inside the textbox
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

		var winter_months = ['12', '01', '02'];
		var spring_months = ['03', '04', '05'];
		var summer_months = ['06', '07', '08'];
		var fall_months = ['09', '10', '11'];
		if (winter_months.includes(month)) {
			model['season_time'] = 'Winter';
		}
		else if (spring_months.includes(month)) {
			model['season_time'] = 'Spring';
		}
		else if (summer_months.includes(month)) {
			model['season_time'] = 'Summer';
		}
		else if (fall_months.includes(month)) {
			model['season_time'] = 'Fall';
		}
		
		console.log(model['season_time']);
		console.log(model);
	
		if (['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].includes(dayOfWeek)) {
			model['weekend_time'] = 'Weekday';
		}
		else if (['Saturday', 'Sunday'].includes(dayOfWeek)) {
			model['weekend_time'] = 'Weekend';		
		}
		console.log(model['weekend_time']);
		console.log(model);

		// Consult for federal holidays https:// www.opm.gov/policy-data-oversight/pay-leave/federal-holidays/
		// Careful to consider that some holidays have floating days, and others have observed days when they fall on weekends
		if (((month == '01')&&(day == '01')) || ((month == '01')&&(day == '02')) || ((month == '07')&&(day == '04')) || ((month == '11')&&(day == '11')) || ((month == '12')&&(day == '25'))) {
			nonholiday = 1;
			nonholiday_sh = 0;
			console.log(nonholiday);
			model['holiday_time'] = 'Holiday';
		}
		// holidays below are floating days and are observed on different days each year
		else if ((year == '2020') && (((month == '01')&&(day == '20')) || ((month == '02')&&(day == '17')) || ((month == '05')&&(day == '25')) || ((month == '07')&&(day == '03')) || ((month == '09')&&(day == '07')) || ((month == '10')&&(day == '12')) || ((month == '11')&&(day == '11')) || ((month == '11')&&(day == '26')))) {
			nonholiday = 1;
			nonholiday_sh = 0;
			console.log(nonholiday);
			model['holiday_time'] = 'Holiday';
		}
		else if ((year == '2021') && (((month == '01')&&(day == '18')) || ((month == '02')&&(day == '15')) || ((month == '05')&&(day == '31')) || ((month == '07')&&(day == '05')) || ((month == '09')&&(day == '06')) || ((month == '10')&&(day == '11')) || ((month == '11')&&(day == '11')) || ((month == '11')&&(day == '25')) || ((month == '12')&&(day == '24')) || ((month == '12')&&(day == '31')))) {
			nonholiday = 1;
			nonholiday_sh = 0;
			console.log(nonholiday);
			model['holiday_time'] = 'Holiday';
		}
		else if ((year == '2022') && (((month == '01')&&(day == '17')) || ((month == '02')&&(day == '21')) || ((month == '05')&&(day == '30')) || ((month == '09')&&(day == '05')) || ((month == '10')&&(day == '10')) || ((month == '11')&&(day == '11')) || ((month == '11')&&(day == '24')) || ((month == '12')&&(day == '26')))) {
			nonholiday = 1;
			nonholiday_sh = 0;
			console.log(nonholiday);
			model['holiday_time'] = 'Holiday';
		}
		else if ((year == '2023') && (((month == '01')&&(day == '16')) || ((month == '02')&&(day == '20')) || ((month == '05')&&(day == '29')) || ((month == '09')&&(day == '04')) || ((month == '10')&&(day == '09')) || ((month == '11')&&(day == '10')) || ((month == '11')&&(day == '23')))) {
			nonholiday = 1;
			nonholiday_sh = 0;
			console.log(nonholiday);
			model['holiday_time'] = 'Holiday';
		}
		else {
			nonholiday = 0;
			nonholiday_sh = 1;
			console.log(nonholiday);
			model['holiday_time'] = null;
		}
	});
}
	
function my_getTime() {
	$("#Save-6").click(function() {
	var time = timepickers.wickedpicker('time');	
	time = time.replace(" ", "");
	time = date +' ' + time;
	var curr_hour = new Date(time).getHours();
	console.log(curr_hour);
	num_hour = curr_hour
	
	var curr_min = new Date(time).getMinutes();
	console.log(curr_min);
	
	console.log(model['weekend_time']);
	if (model['weekend_time'] == 'Weekday') {
		if ((curr_hour >= 7 ) && (curr_hour < 10)) {
			hour = 'AM-peak';
			nighttime = 0;
			model['hour_time'] = hour;
			if ((curr_hour >= 9) && (curr_hour < 10)) {
				ninetenam = 1;
			}			
		}
		else if ((curr_hour >= 10 ) && (curr_hour < 16)) {
			hour = 'Day time';
			daytime = 1;
			nighttime = 0;
			model['hour_time'] = hour;
		}
		else if ((curr_hour >= 16 ) && (curr_hour < 19)) {
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
	else if (model['weekend_time'] == 'Weekend') {
		if ((curr_hour >= 7 ) && (curr_hour < 19)) {
			hour = 'Day time';
			daytime = 1;
			nighttime = 0;
			model['hour_time'] = hour;
			if ((curr_hour >= 9) && (curr_hour < 10)) {
				ninetenam = 1;
			}			
		}
		else {
			hour = 'Night time';
			daytime = 0;
			nighttime = 1;
			model['hour_time'] = hour;
		}
	}	
	
	console.log(ninetenam);
	});
}	

function printSum() {
// print summary updates
	$("#summary").empty();
	for (var key in model) {
		if (model[key] != null) {
			$("#summary").append('<div style="font-size: 15px""><b>'+model[key]+'<b></div>');
		}
	}
}
	
// prints timeline updates
function printTime() {
	// print first label
	txtElem_1.appendChild(inside_txt_1);
	txtElem2_1.appendChild(percent_txt_1);
	$("#map").append(newLine_1);
	$("#map").append(txtElem_1);
	$("#map").append(txtElem2_1);
	// print second label
	txtElem_2.appendChild(inside_txt_2);
	txtElem2_2.appendChild(percent_txt_2);
	$("#map").append(newLine_2);
	$("#map").append(txtElem_2);
	$("#map").append(txtElem2_2);
	// print third label
	txtElem_3.appendChild(inside_txt_3);
	txtElem2_3.appendChild(percent_txt_3);
	$("#map").append(newLine_3);
	$("#map").append(txtElem_3);
	$("#map").append(txtElem2_3);
	// print average time line
	txtElem3.appendChild(last_line);
	$("#map").append(txtElem3);
}

// updates the time whenever factors entered into the model
// activated whenever a radio button is selected, dropdown selected, or checkbox clicked
function updateTime() {
	// first label
	newLine_1.setAttribute('id','line1');
	newLine_1.setAttribute('stroke','red');
	newLine_1.setAttribute('stroke-width','15');
	newLine_1.setAttribute('y1','60');
	newLine_1.setAttribute('y2','60');
							
	txtElem_1.setAttributeNS(null,"id","text1");
	txtElem_1.setAttributeNS(null,"font-size","15px");
	txtElem_1.setAttributeNS(null,"font-weight","bold");
	txtElem_1.setAttributeNS(null,"fill",'black');
	txtElem_1.setAttributeNS(null,"y",65);
				
	txtElem2_1.setAttributeNS(null,"id","text2");
	txtElem2_1.setAttributeNS(null,"font-size","15px");
	txtElem2_1.setAttributeNS(null,"font-weight","bold");
	txtElem2_1.setAttributeNS(null,"fill",'red');
	txtElem2_1.setAttributeNS(null,"y",65);
	// second label
	console.log(newLine_2);
	newLine_2.setAttribute('id','line2');
	newLine_2.setAttribute('stroke','red');
	newLine_2.setAttribute('stroke-width','15');
	newLine_2.setAttribute('y1','85');
	newLine_2.setAttribute('y2','85');

	txtElem_2.setAttributeNS(null,"id","text1_2");
	txtElem_2.setAttributeNS(null,"font-size","15px");
	txtElem_2.setAttributeNS(null,"font-weight","bold");
	txtElem_2.setAttributeNS(null,"fill",'black');
	txtElem_2.setAttributeNS(null,"y",90);

	txtElem2_2.setAttributeNS(null,"id","text2_2");
	txtElem2_2.setAttributeNS(null,"font-size","15px");
	txtElem2_2.setAttributeNS(null,"font-weight","bold");
	txtElem2_2.setAttributeNS(null,"fill",'red');
	txtElem2_2.setAttributeNS(null,"y",90);	
	// third label
	console.log(newLine_3);
	newLine_3.setAttribute('id','line3');
	newLine_3.setAttribute('stroke','red');
	newLine_3.setAttribute('stroke-width','15');
	newLine_3.setAttribute('y1','110');
	newLine_3.setAttribute('y2','110');

	txtElem_3.setAttributeNS(null,"id","text1_3");
	txtElem_3.setAttributeNS(null,"font-size","15px");
	txtElem_3.setAttributeNS(null,"font-weight","bold");
	txtElem_3.setAttributeNS(null,"fill",'black');
	txtElem_3.setAttributeNS(null,"y",115);
				
	txtElem2_3.setAttributeNS(null,"id","text2_3");
	txtElem2_3.setAttributeNS(null,"font-size","15px");
	txtElem2_3.setAttributeNS(null,"font-weight","bold");
	txtElem2_3.setAttributeNS(null,"fill",'red');
	txtElem2_3.setAttributeNS(null,"y",115);
	// average time line
	txtElem3.setAttributeNS(null,"id","text3");
	txtElem3.setAttributeNS(null,"font-size","15px");
	txtElem3.setAttributeNS(null,"font-weight","bold");
	txtElem3.setAttributeNS(null,"fill",'red');
	txtElem3.setAttributeNS(null,"x",180);
	txtElem3.setAttributeNS(null,"y",140);

	/* 
	* the core model starts here
	* the conditions below are checked when users select the incident type, 
	* no. of impacted lanes, and after all factors have been entered
	* 
	*/

	// Populating values for probability calculation
	var cpi = (model['collision'] == 'Personal Injury') ? 1 : 0;
	var spring = (model['season_time'] == 'Spring') ? 1 : 0;
	var summer = (model['season_time'] == 'Summer') ? 1 : 0;
	var winter = (model['season_time'] == 'Winter') ? 1 : 0;
	var week = (model['weekend_time'] == 'Weekend') ? 1 : 0;
	var dry = (model['pavement_condition'] == 'Dry pavement condition') ? 1 : 0;
	var wet = (model['pavement_condition'] == 'Wet pavement condition') ? 1 : 0;
	var snow = (model['pavement_condition'] == 'Snow/Ice pavement condition') ? 1 : 0;
	var unspecified = (model['pavement_condition'] == 'Unspecified pavement condition') ? 1 : 0;
	var all_hazards = car_hazards + truck_hazards + bus_hazards + pickup_hazards + van_hazards + suv_hazards;

	$("#first_stop").text("30min");
	$("#second_stop").text("60min");
	$("#fourth_stop").text("120min");

	if (road=='i495') {
		if (model['incident']=='Collision incident') {
			drawSVG1(10, 80, 27, 90, "5~40", "60%");
			drawSVG2(10, 100, 37, 110, "5~50", "70%");
			drawSVG3(10, 170, 72, 180, "5~85", "80%");
			drawSVG4("Average CT = 29 mins");
				
			if (model['blockage']=='Travel lane blockage') {
				drawSVG1(10, 80, 27, 90, "5~40", "60%");
				drawSVG2(10, 100, 37, 110, "5~50", "70%");
				drawSVG3(10, 130, 52, 140, "5~65", "80%");
				drawSVG4("Average CT = 30 mins");
					
				if (model['collision']=='Fatality') {
					$("#first_stop").text("100min");
					$("#second_stop").text("200min");
					$("#fourth_stop").text("400min");

					drawSVG1(126, 237, 160, 247, "210~395", "60%");
					drawSVG2(120, 252, 160, 262, "200~420", "70%");
					drawSVG3(120, 264, 160, 274, "200~440", "80%");
					drawSVG4("Average CT = 300 mins");
				}
				else if (model['collision']=='Personal Injury') {
					drawSVG1(20, 90, 37, 110, "10~45", "60%");
					drawSVG2(20, 110, 47, 120, "10~55", "70%");
					drawSVG3(10, 140, 57, 150, "5~70", "80%");
					drawSVG4("Average CT = 33 mins");

					if (model['number_travel']=='1 Travel lane blocked') {
						drawSVG1(20, 80, 28, 90, "10~40", "60%");
						drawSVG2(20, 100, 38, 110, "10~50", "70%");
						drawSVG3(10, 120, 47, 130, "5~60", "80%");
						drawSVG4("Average CT = 29 mins");
					}
					else if (model['number_travel']=='2 Travel lanes blocked') {
						drawSVG1(20, 80, 28, 90, "10~40", "60%");
						drawSVG2(20, 90, 33, 100, "10~45", "70%");
						drawSVG3(10, 110, 42, 120, "5~55", "80%");
						drawSVG4("Average CT = 32 mins");
					}
					else if (['3 Travel lanes blocked', '4 Travel lanes blocked', '5+ Travel lanes blocked'].includes(model['number_travel'])) {
						drawSVG1(30, 130, 62, 140, "15~65", "60%");
						drawSVG2(20, 150, 67, 160, "10~75", "70%");
						drawSVG3(10, 190, 82, 200, "5~95", "80%");
						drawSVG4("Average CT = 44 mins");
					}
				}
				else if (model['collision']=='Property Damage only') {
					drawSVG1(10, 80, 27, 90, "5~40", "60%");
					drawSVG2(10, 90, 32, 100, "5~45", "70%");
					drawSVG3(10, 110, 42, 120, "5~55", "80%");
					drawSVG4("Average CT = 26 mins");	

					if (model['number_travel']=='1 Travel lane blocked') {
						drawSVG1(10, 70, 22, 80, "5~35", "60%");
						drawSVG2(10, 80, 27, 90, "5~40", "70%");
						drawSVG3(10, 100, 37, 110, "5~50", "80%");
						drawSVG4("Average CT = 24 mins");
					}
					else if (model['number_travel']=='2 Travel lanes blocked') {
						drawSVG1(10, 80, 27, 90, "5~40", "60%");
						drawSVG2(10, 100, 37, 110, "5~50", "70%");
						drawSVG3(10, 140, 57, 150, "5~70", "80%");
						drawSVG4("Average CT = 30 mins");
					}
					else if (['3 Travel lanes blocked', '4 Travel lanes blocked', '5+ Travel lanes blocked'].includes(model['number_travel'])) {
						drawSVG1(10, 90, 32, 100, "5~45", "60%");
						drawSVG2(10, 110, 42, 120, "5~55", "70%");
						drawSVG3(10, 150, 62, 160, "5~75", "80%");
						drawSVG4("Average CT = 34 mins");
					}
				}
			}
			else if (model['blockage']=='Shoulder only blockage') {
				drawSVG1(0, 70, 17, 80, "0~35", "60%");
				drawSVG2(0, 80, 22, 90, "0~40", "70%");
				drawSVG3(0, 100, 32, 110, "0~50", "80%");
				drawSVG4("Average CT = 22 mins");
			}
		}
		else if (model['incident']=='Non-Collision incident') {
			drawSVG1(10, 30, 40, 110, "5~15", "65%");
			drawSVG2(10, 40, 50, 120, "5~20", "75%");
			drawSVG3(10, 60, 70, 140, "5~30", "80%");
			drawSVG4("Average CT = 20 mins");

			if (model['collision'] == 'Debris in Roadway') {
				drawSVG1(0, 20, 0, 30, "<10", "85%");
				drawSVG2(0, 40, 10, 50, "<20", "90%");
				drawSVG3(0, 60, 20, 70, "<30", "95%");
				drawSVG4("Average CT = 5 mins");
			}
			else if (model['collision'] == 'Disabled Vehicle') {
				drawSVG1(0, 30, 5, 40, "<15", "65%");
				drawSVG2(0, 40, 10, 50, "<20", "75%");
				drawSVG3(0, 60, 15, 70, "<30", "85%");
				drawSVG4("Average CT = 20 mins");
			}
			else if (model['collision'] == 'Police Activity') {
				drawSVG1(0, 60, 20, 70, "<30", "65%");
				drawSVG2(0, 90, 30, 100, "<45", "80%");
				drawSVG3(0, 120, 40, 130, "<60", "90%");
				drawSVG4("Average CT = 30 mins");
			}
			else if (model['collision'] == 'Utility Problem') {
				drawSVG1(120, 300, 180, 310, "60~240", "100%");
				drawSVG2(0, 0, 0, 0, "", "");
				drawSVG3(0, 0, 0, 0, "", "");
				drawSVG4("Average CT = 160 mins");
			}
			else if (model['collision'] == 'Weather Closure') {
				drawSVG1(10, 140, 59, 150, "5~70", "60%");
				drawSVG2(10, 180, 79, 190, "5~90", "70%");
				drawSVG3(10, 240, 106, 250, "5~120", "80%");
				drawSVG4("Average CT = 100 mins");
			}
			else if (model['collision'] == 'Others') {
				drawSVG1(0, 40, 10, 50, "<20", "65%");
				drawSVG2(0, 60, 20, 70, "<30", "75%");
				drawSVG3(0, 120, 40, 130, "<60", "90%");
				drawSVG4("Average CT = 25 mins");
			}

			else if (model['collision'] == 'Vehicles on Fire') {
				drawSVG1(10, 90, 30, 100, "5~45", "60%");
				drawSVG2(10, 120, 30, 130, "5~60", "70%");
				drawSVG3(10, 180, 30, 190, "5~90", "80%");
				drawSVG4("Average CT = 45 mins");
			}
			else if (model['collision'] == 'Emergency Roadwork') {
				$("#first_stop").text("100min");
				$("#second_stop").text("200min");
				$("#fourth_stop").text("400min");

				drawSVG1(10, 95, 40 , 105, "5~160", "60%");
				drawSVG2(10, 145, 60, 155, "5~240", "70%");
				drawSVG3(10, 195, 80, 205, "5~330", "80%");
				drawSVG4("Average CT = 170 mins");
			}
			else if (model['collision'] == 'Off-road Activity') {
				drawSVG1(0, 60, 20, 70, "<30", "60%");
				drawSVG2(0, 90, 20, 100, "<45", "70%");
				drawSVG3(0, 120, 20, 130, "<60", "80%");
				drawSVG4("Average CT = 40 mins");
			}
		}

		if (model['incident'] != null && model["involved_veh"] != null && model["responder"] != null && model["center_choice"] != null &&
		model["pavement_condition"] != null && model["hour_time"] != null && (model["location"] != null || model["exit"] != null)) {
			if (model['incident'] == 'Collision incident') {
				if (model['blockage']=='Travel lane blockage') {
					if (model['collision']=='Fatality') {
						if (['4 Travel lanes blocked', '5+ Travel lanes blocked'].includes(model['number_travel']) || (num_total > 2) || (num_truck > 1) || (num_tow > 1)) {
							if (num_truck>0) {CF_case4();}
							else {CF_case3();}
						}
						else {
							if (num_total>1) {CF_case2();}
							else {CF_case1();}
						}
					}
					else if (model['collision']=='Personal Injury') {
						if (model['number_travel']=='1 Travel lane blocked') {
							checkresult = 'CPI1-0';
							if (checkresult == 'CPI1-0') {
								if (num_tow > 0 && num_responder > 4) {checkresult = 'CPI1-2';}
								else if (shoulder_drop > 0 && num_responder > 4) {checkresult = 'CPI1-2';}
								else if ((car_hazards.includes('over ')) && ((model['weekend_time'] == 'Weekend') || (num_tow > 0))) {checkresult = 'CPI1-2';}
								else if ((num_total > 5) && ((hour == 'AM-peak') || (hour == 'PM-peak'))) {checkresult = 'CPI1-2';}
								else if (((hour == 'AM-peak') || (first_responder=='FIREBOARD')) && (num_police > 1)) {checkresult = 'CPI1-2';}
								else if ((model['season_time'] == 'Fall') && (first_responder=='FIREBOARD')) {checkresult = 'CPI1-2';}
								else if ((num_truck>0) && (num_van>0)) {checkresult = 'CPI1-2';}
								else {checkresult = 'CPI1-1';}
							}
							if (checkresult == 'CPI1-2') {
								if ((aux_lane == true) && ((num_responder>4) || (num_chart>1))) {checkresult = 'CPI1-3';}
								else if ((hazmat == true) || (num_tow>1) || (num_bus>0)) {checkresult = 'CPI1-3';}
								else if (((num_police>2) || (model['weekend_time'] == 'Weekend') || (pavement=='Wet')) && (num_pickup>0)) {checkresult = 'CPI1-3';}
								else if ((num_truck>0) && (num_tow>0)) {checkresult = 'CPI1-3';}
								else {checkresult = 'CPI1-2';}	
							}
							if (checkresult == 'CPI1-3') {
								if ((num_total>1) && (num_responder>6)) {checkresult = 'CPI1-4';}
								else {checkresult = 'CPI1-3';}		
							}

							if (checkresult == 'CPI1-1') {CPI1_case1();}
							else if (checkresult == 'CPI1-2') {CPI1_case2();}
							else if (checkresult == 'CPI1-3') {CPI1_case3();}
							else if (checkresult == 'CPI1-4') {CPI1_case4();}
						}
						else if (model['number_travel']=='2 Travel lanes blocked') {
							checkresult = 'CPI2-0';
							if (checkresult == 'CPI2-0') {
								if (num_tow > 0) {checkresult = 'CPI2-2';}
								else if (((num_responder>3) || (first_responder=='POLICE') || (num_truck>0)) && (num_total>3)) {checkresult = 'CPI2-2';}
								else if (((daytime==1) || (num_total>2)) && (all_hazards.includes('over '))) {checkresult = 'CPI2-2';}
								else if ((num_total>1) && (num_motorcycle>0)) {checkresult = 'CPI2-2';}
								else if (((aux_lane==true) && (num_pickup>0)) || (num_responder>6)) {checkresult = 'CPI2-2';}
								else {checkresult = 'CPI2-1';}
							}
							if (checkresult == 'CPI2-2') {
								if ((num_tow>1) && (num_total>3)) {checkresult = 'CPI2-3';}
								else if (num_responder>6) {checkresult = 'CPI2-3';}
								else if (((aux_lane==true) || (pavement=='Wet')) && (num_responder>5)) {checkresult = 'CPI2-3';}
								else if (((aux_lane==true) || (hour == 'Night time')) && (all_hazards.includes('over '))) {checkresult = 'CPI2-3';}
								else if ((num_fireboard>1) || (pavement=='Snow/Ice')) {checkresult = 'CPI2-3';}
								else {checkresult = 'CPI2-2';}		
							}
							if (checkresult == 'CPI2-3') {
								if ((num_responder>7) || (num_total>5)) {checkresult = 'CPI2-4';}
								else {checkresult = 'CPI2-3';}
							}

							if (checkresult == 'CPI2-1') {CPI2_case1();}
							else if (checkresult == 'CPI2-2') {CPI2_case2();}
							else if (checkresult == 'CPI2-3') {CPI2_case3();}
							else if (checkresult == 'CPI2-4') {CPI2_case4();}
						}
						else if (['3 Travel lanes blocked', '4 Travel lanes blocked', '5+ Travel lanes blocked'].includes(model['number_travel'])) {
							checkresult = 'CPI3-0';
							if (checkresult == 'CPI3-0') {
								if ((num_tow>0) || (all_hazards.includes('over ') || all_hazards.includes('jack ') || all_hazards.includes('lost '))) {checkresult = 'CPI3-2';}
								else if ((num_police>1) || (num_responder>5)) {checkresult = 'CPI3-2';}
								else if ((num_responder>3) && (aux_lane==true)) {checkresult = 'CPI3-2';}
								else if ((num_bus>0) || (pavement=='Chemical wet') || (num_truck>1)) {checkresult = 'CPI3-2';}
								else if (((num_pickup>0) || (num_truck>0)) && (pavement=='Wet')) {checkresult = 'CPI3-2';}
								else {checkresult = 'CPI3-1';}
							}
							if (checkresult == 'CPI3-2') {
								if (num_responder>8) {checkresult = 'CPI3-3';}
								else if (((num_responder>5) || (model['season_time'] == 'Winter') || (num_tow>1)) && (num_total>2)) {checkresult = 'CPI3-3';}
								else if ((model['weekend_time'] == 'Weekend') && (first_responder=='FIREBOARD')) {checkresult = 'CPI3-3';}
								else if ((nonholiday==1) && (num_truck>0)) {checkresult = 'CPI3-3';}
								else {checkresult = 'CPI3-2';}		
							}
							if (checkresult == 'CPI3-3') {
								if (num_responder>9) {checkresult = 'CPI3-4';}
								else if ((num_chart>1) && (model['weekend_time'] == 'Weekend')) {checkresult = 'CPI3-4';}
								else if (nonholiday==1) {checkresult = 'CPI3-4';}
								else {checkresult = 'CPI3-3';}
							}

							if (checkresult == 'CPI3-1') {CPI3_case1();}
							else if (checkresult == 'CPI3-2') {CPI3_case2();}
							else if (checkresult == 'CPI3-3') {CPI3_case3();}
							else if (checkresult == 'CPI3-4') {CPI3_case4();}
						}
					}
					else if (model['collision']=='Property Damage only') {
						if (model['number_travel']=='1 Travel lane blocked') {
							checkresult = 'CPD1-0';
							if (checkresult == 'CPD1-0') {
								if ((num_tow>0) && (num_fireboard>0)) {checkresult = 'CPD1-2';}
								else if ((num_tow>0) && (first_responder=='POLICE')) {checkresult = 'CPD1-2';}
								else if ((num_chart>2) && (first_responder=='CHART')) {checkresult = 'CPD1-2';}
								else if (((model['weekend_time'] == 'Weekend') || (hour=='AM-peak' || hour=='PM-peak') || (num_police>2) || (num_truck>0) || (num_pickup>0)) && (num_responder>4)) {checkresult = 'CPD1-2';}
								else if ((aux_lane==true) && (all_hazards.includes('over ') || (nonholiday==1))) {checkresult = 'CPD1-2';}
								else if (((num_total>2) || (num_tow>0)) && (num_pickup>0)) {checkresult = 'CPD1-2';}
								else {checkresult = 'CPD1-1';}
							}
							if (checkresult == 'CPD1-2') {
								if (((num_responder>4) || (model['weekend_time'] == 'Weekend') || (num_pickup>0)) && (num_truck>0)) {checkresult = 'CPD1-3';}
								else if ((num_pickup>0) && (num_total>2)) {checkresult = 'CPD1-3';}
								else if ((daytime==1) && (first_responder=='FIREBOARD')) {checkresult = 'CPD1-3';}
								else if (all_hazards.includes('jack ')) {checkresult = 'CPD1-3';}
								else {checkresult = 'CPD1-2';}
							}
							if (checkresult == 'CPD1-3') {
								if ((num_truck>0) && ((num_responder>5) || (aux_lane==true))) {checkresult = 'CPD1-4';}
								else {checkresult = 'CPD1-3';}
							}

							if (checkresult == 'CPD1-1') {CPD1_case1();}
							else if (checkresult == 'CPD1-2') {CPD1_case2();}
							else if (checkresult == 'CPD1-3') {CPD1_case3();}
							else if (checkresult == 'CPD1-4') {CPD1_case4();}
						}
						else if (model['number_travel']=='2 Travel lanes blocked') {
							checkresult = 'CPD2-0';
							if (checkresult == 'CPD2-0') {
								if ((num_tow>0) && (num_fireboard>0)) {checkresult = 'CPD2-2';}
								else if (((hour=='AM-peak' || hour=='PM-peak') || (num_chart>2)) && (num_truck>0)) {checkresult = 'CPD2-2';}
								else if (((nighttime==1) || (num_responder>4)) && (num_police>1)) {checkresult = 'CPD2-2';}
								else if (((model['weekend_time'] == 'Weekend') || (num_total>1)) && (num_tow>0)) {checkresult = 'CPD2-2';}
								else if ((num_total>5) || (num_pickup>0)) {checkresult = 'CPD2-2';}
								else {checkresult = 'CPD2-1';}
							}
							if (checkresult == 'CPD2-2') {
								if (num_tow>1) {checkresult = 'CPD2-3';}
								else if (((num_truck>0) || (num_total>2)) && (nighttime==1)) {checkresult = 'CPD2-3';}
								else if ((num_total>2) && (first_responder=='POLICE')) {checkresult = 'CPD2-3';}
								else {checkresult = 'CPD2-2';}
							}
							if (checkresult == 'CPD2-3') {
								if (num_responder>7) {checkresult = 'CPD2-4';}
								else if (num_tow>1) {checkresult = 'CPD2-4';}
								else {checkresult = 'CPD2-3';}
							}
	
							if (checkresult == 'CPD2-1') {CPD2_case1();}
							else if (checkresult == 'CPD2-2') {CPD2_case2();}
							else if (checkresult == 'CPD2-3') {CPD2_case3();}
							else if (checkresult == 'CPD2-4') {CPD2_case4();}
						}
						else if (['3 Travel lanes blocked', '4 Travel lanes blocked', '5+ Travel lanes blocked'].includes(model['number_travel'])) {
							checkresult = 'CPD3-0';
							if (checkresult == 'CPD3-0') {
								if (num_tow > 0) {checkresult = 'CPD3-2';}
								else if ((num_responder>4) && ((first_responder=='FIREBOARD') || (num_pickup>0) || (pavement=='Wet'))) {checkresult = 'CPD3-2';}
								else if (all_hazards.includes('jack ')) {checkresult = 'CPD3-2';}
								else {checkresult = 'CPD3-1';}
							}
							if (checkresult == 'CPD3-2') {
								if ((num_tow>1) || (hazmat == true)) {checkresult = 'CPD3-3';}
								else if (((hour=='AM-peak' || hour=='PM-peak') || (num_responder>5)) && (num_total>1)) {checkresult = 'CPD3-3';}
								else {checkresult = 'CPD3-2';}
							}
							if (checkresult == 'CPD3-3') {
								if (num_responder>6) {checkresult = 'CPD3-4';}
								else if ((nighttime==1) && (num_truck>0)) {checkresult = 'CPD3-4';}
								else {checkresult = 'CPD3-3';}
							}
	
							if (checkresult == 'CPD3-1') {CPD3_case1();}
							else if (checkresult == 'CPD3-2') {CPD3_case2();}
							else if (checkresult == 'CPD3-3') {CPD3_case3();}
							else if (checkresult == 'CPD3-4') {CPD3_case4();}
						}
					}
				}
				else if (model['blockage']=='Shoulder only blockage') {
					prob = 1/(1+Math.exp(-(-2.27-0.47*baltimoreCity+0.07*cecil-0.28*harford+0.41*dry+0.98*snow+0.33*unspecified+0.84*wet-0.38*week+0.3*nonholiday_sh
						-0.23*num_total+0.52*num_car+1.04*num_truck+0.26*num_responder+0.34*num_fireboard+0.43*num_medical-0.23*cpi
						+0.48*spring+0.37*summer+0.54*winter+0.08*daytime+0.23*nighttime)));
					console.log(prob);

					if (num_tow > 0) {shoulder_case2();}
					else if (center != 'AOC') {shoulder_case1();}
					else if (num_responder == 1 && pavement == 'Dry') {shoulder_case1();}
					else if (shoulder_drop == 2) {shoulder_case2();}
					else if ((model['collision'] == 'Personal Injury' && hour == 'AM-peak') || (model['collision'] == 'Personal Injury' && hour == 'Night time')) {shoulder_case2();}
					else if (hour == 'PM-peak') {shoulder_case1();}
					else if (prob <= 0.4 && num_truck == 0) {shoulder_case1();}
					else if (prob > 0.5 && num_fireboard > 0) {shoulder_case2();}
					else {shoulder_case3();}
				}
			}
			else if (model['incident'] == 'Non-Collision incident') {
				if (model['collision'] == 'Vehicles on Fire') {
					 drawSVG1(10, 90, 30, 100, "5~45", "60%");
					 drawSVG2(10, 120, 30, 130, "5~60", "70%");
					 drawSVG3(10, 180, 30, 190, "5~90", "80%");
					 drawSVG4("Average CT = 45 mins");
				}
				else if (model['collision'] == 'Emergency Roadwork') {
					$("#first_stop").text("100min");
					$("#second_stop").text("200min");
					$("#fourth_stop").text("400min");

					drawSVG1(10, 95, 40 , 105, "5~160", "60%");
					drawSVG2(10, 145, 60, 155, "5~240", "70%");
					drawSVG3(10, 195, 80, 205, "5~330", "80%");
					drawSVG4("Average CT = 170 mins");
				}
				else if (model['collision'] == 'Off-road Activity') {
					 drawSVG1(0, 60, 20, 70, "<30", "60%");
					 drawSVG2(0, 90, 20, 100, "<45", "70%");
					 drawSVG3(0, 120, 20, 130, "<60", "80%");
					 drawSVG4("Average CT = 40 mins");
				}
			}
		}
	}
	else if (road=='i695') {
		if (model['incident']=='Collision incident') {
			drawSVG1(20, 90, 35, 100, "10~55", "60%");
			drawSVG2(10, 120, 47, 130, "5~60", "70%");
			drawSVG3(10, 150, 62, 160, "5~75", "80%");
			drawSVG4("Average CT = 36 mins");

			if (model['blockage']=='Travel lane blockage') {
				drawSVG1(20, 100, 38, 110, "10~50", "60%");
				drawSVG2(20, 120, 48, 130, "10~60", "70%");
				drawSVG3(20, 170, 73, 180, "10~85", "80%");
				drawSVG4("Average CT = 37 mins");

				if (model['collision']=='Fatality') {
					$("#first_stop").text("100min");
					$("#second_stop").text("200min");
					$("#fourth_stop").text("400min");

					drawSVG1(102, 177, 110, 187, "170~295", "60%");
					drawSVG2(102, 186, 112, 196, "170~310", "70%");
					drawSVG3(99, 198, 118, 208, "165~330", "80%");
					drawSVG4("Average CT = 227 mins");
				}

				else if (model['collision']=='Personal Injury') {
					drawSVG1(30, 120, 53, 130, "15~60", "60%");
					drawSVG2(20, 140, 58, 150, "10~70", "70%");
					drawSVG3(20, 160, 68, 170, "10~80", "80%");
					drawSVG4("Average CT = 43 mins");
									
					if (model['number_travel']=='1 Travel lane blocked') {
						drawSVG1(30, 120, 50, 130, "15~60", "60%");
						drawSVG2(20, 140, 50, 150, "10~70", "70%");
						drawSVG3(10, 140, 50, 150, "5~70", "80%");
						drawSVG4("Average CT = 39 mins");
					}
					else if (model['number_travel']=='2 Travel lanes blocked') {
						drawSVG1(30, 120, 57, 130, "15~60", "60%");
						drawSVG2(30, 130, 62, 140, "15~65", "70%");
						drawSVG3(30, 180, 87, 190, "15~90", "80%");
						drawSVG4("Average CT = 43 mins");
					}
					else if (['3 Travel lanes blocked', '4 Travel lanes blocked', '5+ Travel lanes blocked'].includes(model['number_travel'])) {
						drawSVG1(40, 160, 80, 170, "20~80", "60%");
						drawSVG2(40, 210, 100, 220, "20~105", "70%");
						drawSVG3(30, 210, 100, 220, "15~105", "80%");
						drawSVG4("Average CT = 57 mins");
					}
				}
				else if (model['collision']=='Property Damage only') {
					drawSVG1(20, 100, 40, 110, "10~50", "60%");
					drawSVG2(10, 110, 42, 120, "5~55", "70%");
					drawSVG3(10, 120, 47, 130, "5~60", "80%");
					drawSVG4("Average CT = 33 mins");

					if (model['number_travel']=='1 Travel lane blocked') {
						drawSVG1(20, 100, 42, 110, "10~50", "60%");
						drawSVG2(10, 100, 39, 110, "5~50", "70%");
						drawSVG3(10, 130, 54, 140, "5~65", "80%");
						drawSVG4("Average CT = 32 mins");
					}
					else if (model['number_travel']=='2 Travel lanes blocked') {
						drawSVG1(30, 100, 50, 110, "15~50", "60%");
						drawSVG2(20, 110, 50, 120, "10~55", "70%");
						drawSVG3(20, 130, 50, 140, "10~65", "80%");
						drawSVG4("Average CT = 35 mins");
					}
					else if (['3 Travel lanes blocked', '4 Travel lanes blocked', '5+ Travel lanes blocked'].includes(model['number_travel'])) {
						drawSVG1(30, 120, 45, 130, "15~60", "60%");
						drawSVG2(30, 160, 45, 170, "15~80", "70%");
						drawSVG3(20, 190, 45, 200, "10~95", "80%");
						drawSVG4("Average CT = 47 mins");
					}
				}
			}
			else if (model['blockage']=='Shoulder only blockage') {
				drawSVG1(10, 90, 32, 100, "5~45", "60%");
				drawSVG2(10, 110, 42, 120, "5~55", "70%");
				drawSVG3(0, 130, 52, 140, "0~65", "80%");
				drawSVG4("Average CT = 28 mins");
			}
		}
		else if (model['incident']=='Non-Collision incident') {
			drawSVG1(10, 30, 40, 110, "5~15", "65%");
			drawSVG2(10, 40, 50, 120, "5~20", "75%");
			drawSVG3(10, 60, 70, 140, "5~30", "80%");
			drawSVG4("Average CT = 20 mins");

			if (model['collision'] == 'Debris in Roadway') {
				drawSVG1(0, 20, 0, 30, "<10", "85%");
				drawSVG2(0, 40, 10, 50, "<20", "90%");
				drawSVG3(0, 60, 20, 70, "<30", "95%");
				drawSVG4("Average CT = 5 mins");
			}
			else if (model['collision'] == 'Disabled Vehicle') {
				drawSVG1(0, 30, 5, 40, "<15", "65%");
				drawSVG2(0, 40, 10, 50, "<20", "75%");
				drawSVG3(0, 60, 15, 70, "<30", "85%");
				drawSVG4("Average CT = 20 mins");
			}
			else if (model['collision'] == 'Police Activity') {
				drawSVG1(0, 60, 20, 70, "<30", "65%");
				drawSVG2(0, 90, 30, 100, "<45", "80%");
				drawSVG3(0, 120, 40, 130, "<60", "90%");
				drawSVG4("Average CT = 30 mins");
			}
			else if (model['collision'] == 'Utility Problem') {
				drawSVG1(120, 300, 180, 310, "60~240", "100%");
				drawSVG2(0, 0, 0, 0, "", "");
				drawSVG3(0, 0, 0, 0, "", "");
				drawSVG4("Average CT = 160 mins");
			}
			else if (model['collision'] == 'Weather Closure') {
				drawSVG1(10, 140, 30, 150, "5~70", "60%");
				drawSVG2(10, 180, 30, 190, "5~90", "70%");
				drawSVG3(10, 240, 30, 250, "5~120", "80%");
				drawSVG4("Average CT = 190 mins");
			}
			else if (model['collision'] == 'Others') {
				drawSVG1(0, 40, 10, 50, "<20", "65%");
				drawSVG2(0, 60, 20, 70, "<30", "75%");
				drawSVG3(0, 120, 40, 130, "<60", "90%");
				drawSVG4("Average CT = 25 mins");
			}
			else if (model['collision'] == 'Vehicles on Fire') {
				drawSVG1(10, 90, 30, 100, "5~45", "60%");
				drawSVG2(10, 120, 30, 130, "5~60", "70%");
				drawSVG3(10, 180, 30, 190, "5~90", "80%");
				drawSVG4("Average CT = 45 mins");
			}
			else if (model['collision'] == 'Emergency Roadwork') {
				$("#first_stop").text("100min");
				$("#second_stop").text("200min");
				$("#fourth_stop").text("400min");

				drawSVG1(10, 95, 40 , 105, "5~160", "60%");
				drawSVG2(10, 145, 60, 155, "5~240", "70%");
				drawSVG3(10, 195, 80, 205, "5~330", "80%");
				drawSVG4("Average CT = 170 mins");
			}
			else if (model['collision'] == 'Off-road Activity') {
				drawSVG1(0, 60, 20, 70, "<30", "60%");
				drawSVG2(0, 90, 20, 100, "<45", "70%");
				drawSVG3(0, 120, 20, 130, "<60", "80%");
				drawSVG4("Average CT = 40 mins");
			}
		}

		if (model['incident'] != null && model["involved_veh"] != null && model["responder"] != null && model["center_choice"] != null &&
		model["pavement_condition"] != null && model["hour_time"] != null && (model["location"] != null || model["exit"] != null)) {
			if (model['incident'] == 'Collision incident') {
				if (model['blockage']=='Travel lane blockage') { // For CF Cases, only 1 and 2 exist for i695
					if (model['collision']=='Fatality') {
						if ((model['weekend_time'] == 'Weekend') && (num_total > 2)) {CF_case2();}
						else {CF_case1();}
					}
					else if (model['collision']=='Personal Injury') {
						if (model['number_travel']=='1 Travel lane blocked') {
							checkresult = 'CPI1-0';
							if (checkresult == 'CPI1-0') {
								if (num_tow > 0) {checkresult = 'CPI1-2';}
								else if (first_responder == 'FIREBOARD') {checkresult = 'CPI1-1';}
								else if ((center=='TOC4') && num_truck==0) {checkresult = 'CPI1-1';}
								else if (num_chart > 1 && first_responder=='POLICE') {checkresult = 'CPI1-2';}
								else if (num_truck > 1 && num_responder > 3) {checkresult = 'CPI1-2';}
								else if ((num_pickup > 0) && (num_responder > 2 || num_police > 0)) {checkresult = 'CPI1-2';}
								else {checkresult = 'CPI1-1';}
							}
							if (checkresult == 'CPI1-2') {
								if ((hour == 'Night time' && num_responder > 6) || (num_total > 4)) {checkresult = 'CPI1-3';}
								else if ((pavement == 'Snow/Ice') || (num_truck > 1) || (num_responder > 7) || (center == 'AOC')) {checkresult = 'CPI1-3';}
								else if ((num_pickup > 0) && ((aux_lane == true) || (model['season_time'] == 'Winter'))) {checkresult = 'CPI1-3';}
								else if ((model['weekend_time'] == 'Weekend') && (car_hazards.includes('over '))) {checkresult = 'CPI1-3';}
								else if ((num_police > 1) && (num_fireboard > 1)) {checkresult = 'CPI1-3';}
								else {checkresult = 'CPI1-2';}
							}
							if (checkresult == 'CPI1-3') {
								if ((num_truck > 0) && (num_responder > 5)) {checkresult = 'CPI1-4';}
								else if ((toll_lane == true) || (shoulder_drop > 1)) {checkresult = 'CPI1-4';}
								else {checkresult = 'CPI1-3';}
							}

							if (checkresult == 'CPI1-1') {CPI1_case1();}
							else if (checkresult == 'CPI1-2') {CPI1_case2();}
							else if (checkresult == 'CPI1-3') {CPI1_case3();}
							else if (checkresult == 'CPI1-4') {CPI1_case4();}
						}
						else if (model['number_travel']=='2 Travel lanes blocked') {
							checkresult = 'CPI2-0';
							if (checkresult == 'CPI2-0') {
								if (num_tow > 0) {checkresult = 'CPI2-2';}
								else if (((hour == 'AM-peak') || (hour == 'PM-peak')) && (num_responder > 4)) {checkresult = 'CPI2-2';}
								else if ((model['weekend_time'] == 'Weekend') && (center == 'SOC')) {checkresult = 'CPI2-2';}
								else if (num_responder > 5) {checkresult = 'CPI2-2';}
								else {checkresult = 'CPI2-1';}
							}
							if (checkresult == 'CPI2-2') {
								if ((hour == 'Night time') && ((num_police > 1) || (num_responder > 5))) {checkresult = 'CPI2-3';}
								else if ((pavement == 'Snow/Ice') || ((num_responder > 7) && (aux_lane==true))) {checkresult = 'CPI2-3';}
								else {checkresult = 'CPI2-2';}
							}
							if (checkresult == 'CPI2-3') {
								if ((pavement == 'Wet') || (num_total>4)) {checkresult = 'CPI2-4';}
								else {checkresult = 'CPI2-3';}
							}

							if (checkresult == 'CPI2-1') {CPI2_case1();}
							else if (checkresult == 'CPI2-2') {CPI2_case2();}
							else if (checkresult == 'CPI2-3') {CPI2_case3();}
							else if (checkresult == 'CPI2-4') {CPI2_case4();}
						}
						else if (['3 Travel lanes blocked', '4 Travel lanes blocked', '5+ Travel lanes blocked'].includes(model['number_travel'])) {
							checkresult = 'CPI3-0';
							if (checkresult == 'CPI3-0') {
								if ((center=='SOC') || (num_truck > 0) || (num_total > 2)) {checkresult = 'CPI3-2';}
								else if (first_responder == 'FIREBOARD') {checkresult = 'CPI3-2';}
								else if ((num_responder > 5) || ((car_hazards.includes('over ')) || (truck_hazards.includes('over ')) || (bus_hazards.includes('over '))) || (shoulder_drop > 1)) {checkresult = 'CPI3-2';}			
								else {checkresult = 'CPI3-1';}
							}
							if (checkresult == 'CPI3-2') {
								if (num_medical > 0) {checkresult = 'CPI3-3';}
								else if (num_responder > 8) {checkresult = 'CPI3-3';}
								else if (num_tow == 0) {checkresult = 'CPI3-2';}
								else if ((num_tow > 1) && ((num_responder > 5) || (num_chart > 1))) {checkresult = 'CPI3-3';}
								else {checkresult = 'CPI3-2';}
							}
							if (checkresult == 'CPI3-3') {
								if ((travel_drop > 4) && (num_chart > 2)) {checkresult = 'CPI3-4';}
								else if ((pavement == 'Wet') & (num_tow > 2)) {checkresult = 'CPI3-4';}
								else {checkresult = 'CPI3-3';}
							}

							if (checkresult == 'CPI3-1') {CPI3_case1();}
							else if (checkresult == 'CPI3-2') {CPI3_case2();}
							else if (checkresult == 'CPI3-3') {CPI3_case3();}
							else if (checkresult == 'CPI3-4') {CPI3_case4();}
						}
					}
					else if (model['collision']=='Property Damage only') {
						if (model['number_travel']=='1 Travel lane blocked') {
							checkresult = 'CPD1-0';
							if (checkresult == 'CPD1-0') {
								if ((num_tow > 0) || (hazmat == true)) {checkresult = 'CPD1-2';}
								else if ((num_police == 0) || ((num_fireboard == 0) && ((hour == 'AM-peak') || (hour == 'PM-peak')))) {checkresult = 'CPD1-1';}
								else if (((hour == 'Day time') && (num_responder > 4)) || ((num_truck > 0) && (num_police > 1))) {checkresult = 'CPD1-2';}
								else if (((pavement == 'Snow/Ice') && ((num_truck > 0) || (num_responder > 3))) || ((num_total > 3) && (first_responder=='FIREBOARD'))) {checkresult = 'CPD1-2';}
								else if ((center=='TOC4') && (aux_lane==false)) {checkresult = 'CPD1-1';}
								else if ((model['season_time'] == 'Winter') && (num_pickup > 0)) {checkresult = 'CPD1-2';}
								else if ((num_truck > 0) && ((center=='TOC4') || (num_chart > 1))) {checkresult = 'CPD1-2';}
								else if ((num_chart > 2) || ((num_responder > 4) && (pavement == 'Wet'))) {checkresult = 'CPD1-2';}
								else if ((num_chart > 1) && (num_pickup > 0)) {checkresult = 'CPD1-2';}
								else {checkresult = 'CPD1-1';}
							}
							if (checkresult == 'CPD1-2') {
								if ((hour == 'Night time') && (num_responder > 5)) {checkresult = 'CPD1-3';}
								else if ((num_responder > 6) || (truck_hazards.includes('over ')) || (num_bus > 0) || (all_hazards.includes('lost '))) {checkresult = 'CPD1-3';}
								else if (((pavement == 'Snow/Ice') && (model['weekend_time'] == 'Weekend')) || (num_truck > 1)) {checkresult = 'CPD1-3';}
								else if ((num_responder > 4) && ((nonholiday == 1) || (num_pickup > 0) || (num_total > 3))) {checkresult = 'CPD1-3';}
								else {checkresult = 'CPD1-2';}
							}
							if (checkresult == 'CPD1-3') {
								if ((num_truck > 0) && (((car_hazards.includes('over ')) || (truck_hazards.includes('over ')) || (bus_hazards.includes('over '))) || (pavement == 'Wet') || (pavement == 'Snow/Ice'))) {checkresult = 'CPD1-4';}
								else if ((num_total > 2) && (first_responder=='FIREBOARD')) {checkresult = 'CPD1-4';}
								else {checkresult = 'CPD1-3';}
							}

							if (checkresult == 'CPD1-1') {CPD1_case1();}
							else if (checkresult == 'CPD1-2') {CPD1_case2();}
							else if (checkresult == 'CPD1-3') {CPD1_case3();}
							else if (checkresult == 'CPD1-4') {CPD1_case4();}
						}
						else if (model['number_travel']=='2 Travel lanes blocked') {
							checkresult = 'CPD2-0';
							if (checkresult == 'CPD2-0') {
								if ((num_tow > 0) && (num_fireboard > 0)) {checkresult = 'CPD2-2';}
								else if ((num_tow > 0) && ((num_total > 2) || (aux_lane==true))) {checkresult = 'CPD2-2';}
								else if ((car_hazards.includes('over ')) || (shoulder_drop > 1) || (num_truck > 0) || (num_pickup > 0)) {checkresult = 'CPD2-2';}
								else if ((pavement=='Snow/Ice') || (pavement == 'Chemical wet') || (truck_hazards.includes('jack ')) || (num_responder > 6)) {checkresult = 'CPD2-2';}
								else {checkresult = 'CPD2-1';}
							}
							if (checkresult == 'CPD2-2') {
								if ((model['weekend_time'] == 'Weekend') && (hour == 'Night time') && (num_total > 2) && (num_tow > 0)) {checkresult = 'CPD2-3';}
								else if ((num_truck > 0) && (num_responder > 5)) {checkresult = 'CPD2-3';}
								else if ((num_responder > 4) && (pavement == 'Wet')) {checkresult = 'CPD2-3';}
								else if ((model['weekend_time'] == 'Weekend') && (all_hazards.includes('over '))) {checkresult = 'CPD2-3';}
								else {checkresult = 'CPD2-2';}
							}
							if (checkresult == 'CPD2-3') {
								if (num_responder > 9) {checkresult = 'CPD2-4';}
								else if ((num_responder > 5) && (num_pickup > 0)) {checkresult = 'CPD2-4';}
								else {checkresult = 'CPD2-3';}
							}
	
							if (checkresult == 'CPD2-1') {CPD2_case1();}
							else if (checkresult == 'CPD2-2') {CPD2_case2();}
							else if (checkresult == 'CPD2-3') {CPD2_case3();}
							else if (checkresult == 'CPD2-4') {CPD2_case4();}
						}
						else if (['3 Travel lanes blocked', '4 Travel lanes blocked', '5+ Travel lanes blocked'].includes(model['number_travel'])) {
							checkresult = 'CPD3-0';
							if (checkresult == 'CPD3-0') {
								if (num_tow > 0) {checkresult = 'CPD3-2';}
								else if ((hour == 'Night time') && ((num_chart > 1) || (num_truck > 0))) {checkresult = 'CPD3-2';}
								else {checkresult = 'CPD3-1';}
							}
							if (checkresult == 'CPD3-2') {
								if ((shoulder_drop > 1) && (num_responder > 3)) {checkresult = 'CPD3-3';}
								else if ((num_total > 4) || (nonholiday == 1)) {checkresult = 'CPD3-3';}
								else {checkresult = 'CPD3-2';}
							}
							if (checkresult == 'CPD3-3') {
								if ((num_chart > 3) || (num_responder > 8)) {checkresult = 'CPD3-4';}
								else {checkresult = 'CPD3-3';}
							}
	
							if (checkresult == 'CPD3-1') {CPD3_case1();}
							else if (checkresult == 'CPD3-2') {CPD3_case2();}
							else if (checkresult == 'CPD3-3') {CPD3_case3();}
							else if (checkresult == 'CPD3-4') {CPD3_case4();}
						}
					}
				}
				else if (model['blockage']=='Shoulder only blockage') {
					prob = 1/(1+Math.exp(-(-2.27-0.47*baltimoreCity+0.07*cecil-0.28*harford+0.41*dry+0.98*snow+0.33*unspecified+0.84*wet-0.38*week+0.3*nonholiday_sh
						-0.23*num_total+0.52*num_car+1.04*num_truck+0.26*num_responder+0.34*num_fireboard+0.43*num_medical-0.23*cpi
						+0.48*spring+0.37*summer+0.54*winter+0.08*daytime+0.23*nighttime)));
					console.log(prob);
	
					if (num_tow > 0) {shoulder_case2();}
					else if (center != 'AOC') {shoulder_case1();}
					else if (num_responder == 1 && pavement == 'Dry') {shoulder_case1();}
					else if (shoulder_drop == 2) {shoulder_case2();}
					else if ((model['collision'] == 'Personal Injury' && hour == 'AM-peak') || (model['collision'] == 'Personal Injury' && hour == 'Night time')) {shoulder_case2();}
					else if (hour == 'PM-peak') {shoulder_case1();}
					else if (prob <= 0.4 && num_truck == 0) {shoulder_case1();}
					else if (prob > 0.5 && num_fireboard > 0) {shoulder_case2();}
					else {shoulder_case3();}
				}
			}
			else if (model['incident'] == 'Non-Collision incident') {
				if (model['collision'] == 'Vehicles on Fire') {
					 drawSVG1(10, 90, 30, 100, "5~45", "60%");
					 drawSVG2(10, 120, 30, 130, "5~60", "70%");
					 drawSVG3(10, 180, 30, 190, "5~90", "80%");
					 drawSVG4("Average CT = 45 mins");
				}
				else if (model['collision'] == 'Emergency Roadwork') {
					$("#first_stop").text("100min");
					$("#second_stop").text("200min");
					$("#fourth_stop").text("400min");

					drawSVG1(10, 95, 40, 105, "5~160", "60%");
					drawSVG2(10, 145, 60, 155, "5~240", "70%");
					drawSVG3(10, 195, 80, 205, "5~330", "80%");
					drawSVG4("Average CT = 170 mins");
				}
				else if (model['collision'] == 'Off-road Activity') {
					 drawSVG1(0, 60, 20, 70, "<30", "60%");
					 drawSVG2(0, 90, 20, 100, "<45", "70%");
					 drawSVG3(0, 120, 20, 130, "<60", "80%");
					 drawSVG4("Average CT = 40 mins");
				}
			}
		}
	}
	else if (road=='i70') {
		if (model['incident']=='Collision incident') {
			drawSVG1(20, 130, 57, 140, "10~65", "60%");
			drawSVG2(10, 150, 62, 160, "5~75", "70%");
			drawSVG3(10, 190, 82, 200, "5~95", "80%");
			drawSVG4("Average CT = 48 mins");
			if (model['blockage']=='Travel lane blockage') {
				drawSVG1(30, 150, 72, 160, "15~75", "60%");
				drawSVG2(20, 180, 82, 190, "10~90", "70%");
				drawSVG3(10, 260, 117, 270, "5~130", "80%");
				drawSVG4("Average CT = 63 mins");

				if (model['collision']=='Fatality') {
					$("#first_stop").text("100min");
					$("#second_stop").text("200min");
					$("#fourth_stop").text("400min");

					drawSVG1(123, 300, 186, 310, "205~580", "60%");
					drawSVG2(111, 300, 180, 310, "185~595", "70%");
					drawSVG3(99, 300, 174, 310, "165~615", "80%");
					drawSVG4("Average CT = 389 mins");
				}
				else if (model['collision']=='Personal Injury') {
					drawSVG1(40, 150, 77, 160, "20~75", "60%");
					drawSVG2(30, 170, 82, 180, "15~85", "70%");
					drawSVG3(30, 240, 117, 250, "15~120", "80%");
					drawSVG4("Average CT = 60 mins");

					if (model['number_travel']=='1 Travel lane blocked') {
						drawSVG1(30, 110, 52, 120, "15~55", "60%");
						drawSVG2(30, 150, 72, 160, "15~75", "70%");
						drawSVG3(20, 150, 67, 160, "10~75", "80%");
						drawSVG4("Average CT = 39 mins");
							
					}
					else if (['2 Travel lanes blocked', '3 Travel lanes blocked', '4 Travel lanes blocked', '5+ Travel lanes blocked'].includes(model['number_travel'])) {
						$("#first_stop").text("100min");
						$("#second_stop").text("200min");
						$("#fourth_stop").text("400min");

						drawSVG1(9, 93, 29, 103, "15~155", "60%");
						drawSVG2(9, 99, 32, 109, "15~165", "70%");
						drawSVG3(6, 129, 45, 139, "10~215", "80%");
						drawSVG4("Average CT = 90 mins");
					}
				}
				else if (model['collision']=='Property Damage only') {
					drawSVG1(10, 120, 47, 130, "5~60", "60%");
					drawSVG2(10, 130, 52, 140, "5~65", "70%");
					drawSVG3(10, 160, 67, 170, "5~80", "80%");
					drawSVG4("Average CT = 39 mins");

					if (model['number_travel']=='1 Travel lane blocked') {
						drawSVG1(20, 120, 48, 130, "10~60", "60%");
						drawSVG2(10, 140, 57, 150, "5~70", "70%");
						drawSVG3(10, 190, 82, 200, "5~85", "80%");
						drawSVG4("Average CT = 41 mins");
					}
					else if (['2 Travel lanes blocked', '3 Travel lanes blocked', '4 Travel lanes blocked', '5+ Travel lanes blocked'].includes(model['number_travel'])) {
						drawSVG1(40, 210, 104, 220, "20~105", "60%");
						drawSVG2(30, 240, 114, 250, "15~120", "70%");
						drawSVG3(30, 280, 134, 290, "15~140", "80%");
						drawSVG4("Average CT = 60 mins");
					}
				}
			}
			else if (model['blockage']=='Shoulder only blockage') {
				drawSVG1(10, 110, 44, 120, "5~55", "60%");
				drawSVG2(10, 130, 54, 140, "5~65", "70%");
				drawSVG3(10, 150, 64, 160, "5~75", "80%");
				drawSVG4("Average CT = 32 mins");
			}
		}
		else if (model['incident']=='Non-Collision incident') { // build awaiting instructions
			drawSVG1(10, 30, 40, 110, "5~15", "65%");
			drawSVG2(10, 40, 50, 120, "5~20", "75%");
			drawSVG3(10, 60, 70, 140, "5~30", "80%");
			drawSVG4("Average CT = 20 mins");		

			if (model['collision'] == 'Debris in Roadway') {
				drawSVG1(0, 20, 0, 30, "<10", "85%");
				drawSVG2(0, 40, 10, 50, "<20", "90%");
				drawSVG3(0, 60, 20, 70, "<30", "95%");
				drawSVG4("Average CT = 5 mins");
			}
			else if (model['collision'] == 'Disabled Vehicle') {
				drawSVG1(0, 30, 5, 40, "<15", "65%");
				drawSVG2(0, 40, 10, 50, "<20", "75%");
				drawSVG3(0, 60, 15, 70, "<30", "85%");
				drawSVG4("Average CT = 20 mins");
			}
			else if (model['collision'] == 'Police Activity') {
				drawSVG1(0, 60, 20, 70, "<30", "65%");
				drawSVG2(0, 90, 30, 100, "<45", "80%");
				drawSVG3(0, 120, 40, 130, "<60", "90%");
				drawSVG4("Average CT = 30 mins");
			}
			else if (model['collision'] == 'Utility Problem') {
				drawSVG1(120, 300, 180, 310, "60~240", "100%");
				drawSVG2(0, 0, 0, 0, "", "");
				drawSVG3(0, 0, 0, 0, "", "");
				drawSVG4("Average CT = 160 mins");
			}
			else if (model['collision'] == 'Weather Closure') {
				drawSVG1(10, 140, 30, 150, "5~70", "60%");
				drawSVG2(10, 180, 30, 190, "5~90", "70%");
				drawSVG3(10, 240, 30, 250, "5~120", "80%");
				drawSVG4("Average CT = 190 mins");
			}
			else if (model['collision'] == 'Others') {
				drawSVG1(0, 40, 10, 50, "<20", "65%");
				drawSVG2(0, 60, 20, 70, "<30", "75%");
				drawSVG3(0, 120, 40, 130, "<60", "90%");
				drawSVG4("Average CT = 25 mins");
			}
			else if (model['collision'] == 'Vehicles on Fire') {
				drawSVG1(10, 90, 30, 100, "5~45", "60%");
				drawSVG2(10, 120, 30, 130, "5~60", "70%");
				drawSVG3(10, 180, 30, 190, "5~90", "80%");
				drawSVG4("Average CT = 45 mins");
			}
			else if (model['collision'] == 'Emergency Roadwork') {
				$("#first_stop").text("100min");
				$("#second_stop").text("200min");
				$("#fourth_stop").text("400min");

				drawSVG1(10, 95, 40 , 105, "5~160", "60%");
				drawSVG2(10, 145, 60, 155, "5~240", "70%");
				drawSVG3(10, 195, 80, 205, "5~330", "80%");
				drawSVG4("Average CT = 170 mins");
			}
			else if (model['collision'] == 'Off-road Activity') {
				drawSVG1(0, 60, 20, 70, "<30", "60%");
				drawSVG2(0, 90, 20, 100, "<45", "70%");
				drawSVG3(0, 120, 20, 130, "<60", "80%");
				drawSVG4("Average CT = 40 mins");
			}	
		}

		if (model['incident'] != null && model["involved_veh"] != null && model["responder"] != null && model["center_choice"] != null &&
		model["pavement_condition"] != null && model["hour_time"] != null && (model["location"] != null || model["exit"] != null)) {
			if (model['incident'] == 'Collision incident') {
				if (model['blockage']=='Travel lane blockage') {
					if (model['collision']=='Fatality') {
						if ((num_truck > 1) && (hazmat == true)) {CF_case2();}
						else {CF_case1();}
					}
					else if (model['collision']=='Personal Injury') {
						if (model['number_travel']=='1 Travel lane blocked') {
							checkresult = 'CPI1-0';
							if (checkresult == 'CPI1-0') {
								if (num_tow > 0) {checkresult = 'CPI1-2';}
								else if (num_total > 3) {checkresult = 'CPI1-2';}
								else if (num_chart > 1 && first_responder=='POLICE') {checkresult = 'CPI1-2';}
								else if (((hour == 'AM-peak') || (hour == 'PM-peak')) && num_total > 2) {checkresult = 'CPI1-2';}
								else if (car_hazards.includes('over ') && (model['weekend_time'] == 'Weekend' || first_responder=='TOW')) {checkresult = 'CPI1-2';}
								else if (first_responder == 'FIREBOARD') {checkresult = 'CPI1-1';}
								else {checkresult = 'CPI1-1';}
							}
							if (checkresult == 'CPI1-2') {
								if (num_total > 4) {checkresult = 'CPI1-3';}
								else if (num_police>1 && first_responder=='CHART') {checkresult = 'CPI1-3';}
								else if ((pavement == 'Snow/Ice') || (num_truck > 1) || (num_responder > 7) || (center == 'AOC')) {checkresult = 'CPI1-3';}
								else if (num_tow>0 && (all_hazards.includes('over ')) && pavement=='Wet') {checkresult = 'CPI1-3';}
								else if (num_tow == 0 || num_truck == 0) {checkresult = 'CPI1-2';}
								else {checkresult = 'CPI1-2';}
							}
							if (checkresult == 'CPI1-3') {
								if (num_responder<4 || num_truck==0) {checkresult = 'CPI1-3';}
								else if (num_responder>8) {checkresult = 'CPI1-4';}
								else {checkresult = 'CPI1-3';}
							}

							if (checkresult == 'CPI1-1') {CPI1_case1();}
							else if (checkresult == 'CPI1-2') {CPI1_case2();}
							else if (checkresult == 'CPI1-3') {CPI1_case3();}
							else if (checkresult == 'CPI1-4') {CPI1_case4();}
						}
						else if (['2 Travel lanes blocked', '3 Travel lanes blocked', '4 Travel lanes blocked', '5+ Travel lanes blocked'].includes(model['number_travel'])) {
							checkresult = 'CPI2-0';
							if (checkresult == 'CPI2-0') {
								if (num_tow > 0) {checkresult = 'CPI2-2';}
								else if (num_responder > 4) {checkresult = 'CPI2-2';}
								else if (pavement == 'Dry') {checkresult = 'CPI2-1';}
								else if (pavement == 'Snow/Ice') {checkresult = 'CPI2-2';}
								else {checkresult = 'CPI2-1';}
							}
							if (checkresult == 'CPI2-2') {
								if (num_responder > 6) {checkresult = 'CPI2-3';}
								else if (num_fireboard>1 || pavement == 'Snow/Ice') {checkresult = 'CPI2-3';}
								else if (num_tow==0 || num_truck==0) {checkresult = 'CPI2-2';}
								else if (num_truck>1) {checkresult = 'CPI2-3';}
								else {checkresult = 'CPI2-2';}
							}
							if (checkresult == 'CPI2-3') {
								if (num_responder>7 || num_total>5) {checkresult = 'CPI2-4';}
								else if (num_truck>1 || num_total>3 || hazmat==true || num_responder>7) {checkresult = 'CPI2-4';}
								else if (num_total>4 || pavement == 'Wet') {checkresult = 'CPI2-4';}
								else if (num_truck>0) {checkresult = 'CPI2-4';}
								else {checkresult = 'CPI2-3';}
							}

							if (checkresult == 'CPI2-1') {CPI2_case1();}
							else if (checkresult == 'CPI2-2') {CPI2_case2();}
							else if (checkresult == 'CPI2-3') {CPI2_case3();}
							else if (checkresult == 'CPI2-4') {CPI2_case4();}
						}
					}
					else if (model['collision']=='Property Damage only') {
						if (model['number_travel']=='1 Travel lane blocked') {
							checkresult = 'CPD1-0';
							if (checkresult == 'CPD1-0') {
								if (num_tow>0 && num_fireboard>0) {checkresult = 'CPD1-2';}
								else if (num_chart>2 && first_responder=='CHART') {checkresult = 'CPD1-2';}
								else if (pavement=='Wet' && num_police>1 && aux_lane==true && shoulder_drop > 0) {checkresult = 'CPD1-2';}
								else if (num_chart>2 || (num_responder>4 && pavement == 'Wet')) {checkresult = 'CPD1-2';}
								else if ((daytime==1 && num_responder>4) || (num_truck>0 && num_police>1)) {checkresult = 'CPD1-2';}
								else if (nighttime==1 && aux_lane==true) {checkresult = 'CPD1-2';}
								else if (num_tow>0 && num_total>2) {checkresult = 'CPD1-2';}
								else if (num_tow>0 && num_chart>1) {checkresult = 'CPD1-2';}
								else if ((num_police>1 && pavement=='Wet') || pavement == 'Snow/Ice' || pavement == 'Chemical wet') {checkresult = 'CPD1-2';}
								else if (pavement == 'Dry') {checkresult = 'CPD1-1';}
								else {checkresult = 'CPD1-1';}
							}
							if (checkresult == 'CPD1-2') {
								if (num_responder>6 || truck_hazards.includes('over ') || num_bus>0 || (all_hazards.includes('lost '))) {checkresult = 'CPD1-3';}
								else if (num_responder>5 || (num_responder>4 && num_total>2)) {checkresult = 'CPD1-3';}
								else if (aux_lane==true && num_suv>0) {checkresult = 'CPD1-3';}
								else if (num_truck>0 || (num_chart>2 && pavement == 'Chemical wet')) {checkresult = 'CPD1-3';}
								else {checkresult = 'CPD1-2';}
							}
							if (checkresult == 'CPD1-3') {
								if (num_truck>0 && (num_responder>5 || aux_lane==true)) {checkresult = 'CPD1-4';}
								else if (pavement == 'Snow/Ice' || (aux_lane=true && pavement == 'Chemical wet')) {checkresult = 'CPD1-4';}
								else {checkresult = 'CPD1-3';}		
							}

							if (checkresult == 'CPD1-1') {CPD1_case1();}
							else if (checkresult == 'CPD1-2') {CPD1_case2();}
							else if (checkresult == 'CPD1-3') {CPD1_case3();}
							else if (checkresult == 'CPD1-4') {CPD1_case4();}
						}
						else if (['2 Travel lanes blocked', '3 Travel lanes blocked', '4 Travel lanes blocked', '5+ Travel lanes blocked'].includes(model['number_travel'])) {
							checkresult = 'CPD2-0';
							if (checkresult == 'CPD2-0') {
								if (num_tow > 0 && num_fireboard>0) {checkresult = 'CPD2-2';}
								else if (pavement == 'Snow/Ice' || pavement == 'Chemical wet' || truck_hazards.includes('jack ') || num_responder>6) {checkresult = 'CPD2-2';}
								else if ((nighttime==1 || num_responder>4) && num_police>1) {checkresult = 'CPD2-2';}
								else if (car_hazards.includes('over ') || shoulder_drop > 1 || (num_truck>0 && num_pickup>0)) {checkresult = 'CPD2-2';}
								else if (center=='SOC' && num_chart>1) {checkresult = 'CPD2-2';}
								else {checkresult = 'CPD2-1';}
							}
							if (checkresult == 'CPD2-2') {
								if (num_tow > 1) {checkresult = 'CPD2-3';}
								else if (num_truck>0 && num_responder>5) {checkresult = 'CPD2-3';}
								else if ((num_truck>0 || num_total>2) && hour == 'Night time') {checkresult = 'CPD2-3';}
								else if (pavement == 'Snow/Ice' || pavement == 'Chemical wet') {checkresult = 'CPD2-3';}
								else if (num_total>2 && shoulder_drop>1) {checkresult = 'CPD2-3';}
								else {checkresult = 'CPD2-2';}
							}
							if (checkresult == 'CPD2-3') {
								if (num_responder > 7) {checkresult = 'CPD2-4';}
								else if (num_truck==0) {checkresult = 'CPD2-3';}
								else if (hazmat==true || pavement == 'Chemical wet' || aux_lane==true) {checkresult = 'CPD2-4';}
								else {checkresult = 'CPD2-3';}
							}
	
							if (checkresult == 'CPD2-1') {CPD2_case1();}
							else if (checkresult == 'CPD2-2') {CPD2_case2();}
							else if (checkresult == 'CPD2-3') {CPD2_case3();}
							else if (checkresult == 'CPD2-4') {CPD2_case4();}
						}
					}
				}
				else if (model['blockage']=='Shoulder only blockage') {
					prob = 1/(1+Math.exp(-(-2.27-0.47*baltimoreCity+0.07*cecil-0.28*harford+0.41*dry+0.98*snow+0.33*unspecified+0.84*wet-0.38*week+0.3*nonholiday_sh
						-0.23*num_total+0.52*num_car+1.04*num_truck+0.26*num_responder+0.34*num_fireboard+0.43*num_medical-0.23*cpi
						+0.48*spring+0.37*summer+0.54*winter+0.08*daytime+0.23*nighttime)));
					console.log(prob);

					if (num_tow > 0) {shoulder_case2();}
					else if (center != 'AOC') {shoulder_case1();}
					else if (num_responder == 1 && pavement == 'Dry') {shoulder_case1();}
					else if (shoulder_drop == 2) {shoulder_case2();}
					else if ((model['collision'] == 'Personal Injury' && hour == 'AM-peak') || (model['collision'] == 'Personal Injury' && hour == 'Night time')) {shoulder_case2();}
					else if (hour == 'PM-peak') {shoulder_case1();}
					else if (prob <= 0.4 && num_truck == 0) {shoulder_case1();}
					else if (prob > 0.5 && num_fireboard > 0) {shoulder_case2();}
					else {shoulder_case3();}
				}
			}
			else if (model['incident'] == 'Non-Collision incident') {
				if (model['collision'] == 'Vehicles on Fire') {
					 drawSVG1(10, 90, 30, 100, "5~45", "60%");
					 drawSVG2(10, 120, 30, 130, "5~60", "70%");
					 drawSVG3(10, 180, 30, 190, "5~90", "80%");
					 drawSVG4("Average CT = 45 mins");
				}
				else if (model['collision'] == 'Emergency Roadwork') {
					$("#first_stop").text("100min");
					$("#second_stop").text("200min");
					$("#fourth_stop").text("400min");

					drawSVG1(10, 95, 40 , 105, "5~160", "60%");
					drawSVG2(10, 145, 60, 155, "5~240", "70%");
					drawSVG3(10, 195, 80, 205, "5~330", "80%");
					drawSVG4("Average CT = 170 mins");
				}
				else if (model['collision'] == 'Off-road Activity') {
					 drawSVG1(0, 60, 20, 70, "<30", "60%");
					 drawSVG2(0, 90, 20, 100, "<45", "70%");
					 drawSVG3(0, 120, 20, 130, "<60", "80%");
					 drawSVG4("Average CT = 40 mins");
				}
			}
		}
	}
	else if (road=='us29') {
		if (model['incident']=='Collision incident') {
			drawSVG1(20, 120, 48, 130, "10~60", "60%");
			drawSVG2(10, 140, 57, 150, "5~70", "70%");
			drawSVG3(10, 160, 67, 170, "5~80", "80%");
			drawSVG4("Average CT = 40 mins");

			if (model['blockage']=='Travel lane blockage') {
				drawSVG1(20, 140, 62, 150, "10~70", "60%");
				drawSVG2(10, 150, 62, 160, "5~75", "70%");
				drawSVG3(10, 170, 72, 180, "5~85", "80%");
				drawSVG4("Average CT = 45 mins");

				if (model['collision']=='Fatality') {
					$("#first_stop").text("100min");
					$("#second_stop").text("200min");
					$("#fourth_stop").text("400min");

					drawSVG1(123, 288, 182, 298, "205~480", "60%");
					drawSVG2(120, 300, 186, 310, "200~535", "70%");
					drawSVG3(108, 300, 180, 310, "180~580", "80%");
					drawSVG4("Average CT = 346 mins");
				}

				else if (model['collision']=='Personal Injury') {
					drawSVG1(30, 120, 57, 130, "15~60", "60%");
					drawSVG2(20, 140, 62, 150, "10~70", "70%");
					drawSVG3(10, 170, 74, 180, "5~85", "80%");
					drawSVG4("Average CT = 45 mins");

					if (model['number_travel']=='1 Travel lane blocked') {
						drawSVG1(10, 80, 27, 90, "5~40", "70%");
						drawSVG2(10, 100, 37, 110, "5~50", "80%");
						drawSVG3(0, 0, 0, 0, "", "");
						drawSVG4("Average CT = 21 mins");

					}
					else if (['2 Travel lanes blocked', '3 Travel lanes blocked', '4 Travel lanes blocked', '5+ Travel lanes blocked'].includes(model['number_travel'])) {
						drawSVG1(40, 160, 82, 170, "20~80", "60%");
						drawSVG2(40, 170, 87, 180, "20~85", "70%");
						drawSVG3(40, 180, 92, 190, "20~90", "80%");
						drawSVG4("Average CT = 60 mins");
					}
				}

				else if (model['collision']=='Property Damage only') {
					drawSVG1(10, 120, 49, 130, "5~60", "60%");
					drawSVG2(10, 140, 59, 150, "5~70", "70%");
					drawSVG3(10, 150, 64, 160, "5~75", "80%");
					drawSVG4("Average CT = 37 mins");

					if (model['number_travel']=='1 Travel lane blocked') {
						drawSVG1(20, 120, 48, 130, "10~60", "60%");
						drawSVG2(10, 150, 62, 160, "5~75", "70%");
						drawSVG3(10, 170, 72, 180, "5~85", "80%");
						drawSVG4("Average CT = 43 mins");
					}
					else if (['2 Travel lanes blocked', '3 Travel lanes blocked', '4 Travel lanes blocked', '5+ Travel lanes blocked'].includes(model['number_travel'])) {
						drawSVG1(20, 140, 162, 150, "10~70", "60%");
						drawSVG2(20, 150, 167, 160, "10~75", "70%");
						drawSVG3(20, 160, 172, 170, "10~80", "80%");
						drawSVG4("Average CT = 43 mins");
					}
				}
			}
			else if (model['blockage']=='Shoulder only blockage') {
				drawSVG1(20, 140, 62, 150, "10~70", "60%");
				drawSVG2(10, 150, 62, 160, "5~75", "70%");
				drawSVG3(10, 160, 67, 170, "5~80", "80%");
				drawSVG4("Average CT = 42 mins");
			}
		}
		else if (model['incident']=='Non-Collision incident') { // build awaiting instructions
			drawSVG1(10, 30, 40, 110, "5~15", "65%");
			drawSVG2(10, 40, 50, 120, "5~20", "75%");
			drawSVG3(10, 60, 70, 140, "5~30", "80%");
			drawSVG4("Average CT = 20 mins");

			if (model['collision'] == 'Debris in Roadway') {
				drawSVG1(0, 20, 0, 30, "<10", "85%");
				drawSVG2(0, 40, 10, 50, "<20", "90%");
				drawSVG3(0, 60, 20, 70, "<30", "95%");
				drawSVG4("Average CT = 5 mins");
			}
			else if (model['collision'] == 'Disabled Vehicle') {
				drawSVG1(0, 30, 5, 40, "<15", "65%");
				drawSVG2(0, 40, 10, 50, "<20", "75%");
				drawSVG3(0, 60, 15, 70, "<30", "85%");
				drawSVG4("Average CT = 20 mins");
			}
			else if (model['collision'] == 'Police Activity') {
				drawSVG1(0, 60, 20, 70, "<30", "65%");
				drawSVG2(0, 90, 30, 100, "<45", "80%");
				drawSVG3(0, 120, 40, 130, "<60", "90%");
				drawSVG4("Average CT = 30 mins");
			}
			else if (model['collision'] == 'Utility Problem') {
				drawSVG1(120, 300, 180, 310, "60~240", "100%");
				drawSVG2(0, 0, 0, 0, "", "");
				drawSVG3(0, 0, 0, 0, "", "");
				drawSVG4("Average CT = 160 mins");
			}
			else if (model['collision'] == 'Weather Closure') {
				drawSVG1(10, 140, 30, 150, "5~70", "60%");
				drawSVG2(10, 180, 30, 190, "5~90", "70%");
				drawSVG3(10, 240, 30, 250, "5~120", "80%");
				drawSVG4("Average CT = 190 mins");
			}
			else if (model['collision'] == 'Others') {
				drawSVG1(0, 40, 10, 50, "<20", "65%");
				drawSVG2(0, 60, 20, 70, "<30", "75%");
				drawSVG3(0, 120, 40, 130, "<60", "90%");
				drawSVG4("Average CT = 25 mins");
			}

			else if (model['collision'] == 'Vehicles on Fire') {
				drawSVG1(10, 90, 30, 100, "5~45", "60%");
				drawSVG2(10, 120, 30, 130, "5~60", "70%");
				drawSVG3(10, 180, 30, 190, "5~90", "80%");
				drawSVG4("Average CT = 45 mins");
			}
			else if (model['collision'] == 'Emergency Roadwork') {
				$("#first_stop").text("100min");
				$("#second_stop").text("200min");
				$("#fourth_stop").text("400min");

				drawSVG1(10, 95, 40 , 105, "5~160", "60%");
				drawSVG2(10, 145, 60, 155, "5~240", "70%");
				drawSVG3(10, 195, 80, 205, "5~330", "80%");
				drawSVG4("Average CT = 170 mins");
			}
			else if (model['collision'] == 'Off-road Activity') {
				drawSVG1(0, 60, 20, 70, "<30", "60%");
				drawSVG2(0, 90, 20, 100, "<45", "70%");
				drawSVG3(0, 120, 20, 130, "<60", "80%");
				drawSVG4("Average CT = 40 mins");
			}	
		}

		if (model['incident'] != null && model["involved_veh"] != null && model["responder"] != null && model["center_choice"] != null &&
		model["pavement_condition"] != null && model["hour_time"] != null && (model["location"] != null || model["exit"] != null)) {
			if (model['incident'] == 'Collision incident') {
				if (model['blockage']=='Travel lane blockage') {
					if (model['collision']=='Fatality') {
						if ((num_total > 1) && (num_medical > 0)) {CF_case2();}
						else {CF_case1();}
					}
					else if (model['collision']=='Personal Injury') {
						if (model['number_travel']=='1 Travel lane blocked') {
							checkresult = 'CPI1-0';
							if (checkresult == 'CPI1-0') {
								if (num_tow > 0) {checkresult = 'CPI1-2';}
								else if (((hour != 'AM-peak') && (hour != 'PM-peak')) && first_responder == 'POLICE') {checkresult = 'CPI1-2';}
								else if (first_responder == 'FIREBOARD') {checkresult = 'CPI1-1';}
								else if ((center=='SOC' && num_responder>2) || aux_lane == true) {checkresult = 'CPI1-2';}
								else {checkresult = 'CPI1-1';}
							}
							if (checkresult == 'CPI1-2') {
								if (pavement=='Snow/Ice' || num_truck>1 || num_responder>7 || center == 'AOC') {checkresult = 'CPI1-3';}
								else if (num_tow==0 || num_truck==0) {checkresult = 'CPI1-2';}
								else if ((num_police>2 || model['weekend_time'] == 'Weekend' || pavement == 'Wet') && num_pickup>0) {checkresult = 'CPI1-3';}
								else {checkresult = 'CPI1-2';}
							}
							if (checkresult == 'CPI1-3') {
								if (num_truck > 1 || pavement == 'Chemical wet') {checkresult = 'CPI1-4';}
								else {checkresult = 'CPI1-3';}
							}

							if (checkresult == 'CPI1-1') {CPI1_case1();}
							else if (checkresult == 'CPI1-2') {CPI1_case2();}
							else if (checkresult == 'CPI1-3') {CPI1_case3();}
							else if (checkresult == 'CPI1-4') {CPI1_case4();}
						}
						else if (['2 Travel lanes blocked', '3 Travel lanes blocked', '4 Travel lanes blocked', '5+ Travel lanes blocked'].includes(model['number_travel'])) {
							checkresult = 'CPI2-0';
							if (checkresult == 'CPI2-0') {
								if (num_responder>4) {checkresult = 'CPI2-2';}
								else if (model['number_travel']=='5+ Travel lanes blocked' && shoulder_drop > 1) {checkresult = 'CPI2-2';}
								else if (num_responder > 3 && car_hazards.includes('over ')) {checkresult = 'CPI2-2';}
								else if (num_truck>0) {checkresult = 'CPI2-2';}
								else if (model['season_time'] == 'Spring' || num_tow>0) {checkresult = 'CPI2-2';}
								else {checkresult = 'CPI2-1';}
							}
							if (checkresult == 'CPI2-2') {
								if (num_responder>6) {checkresult = 'CPI2-3';}
								else if (model['number_travel']=='5+ Travel lanes blocked' && shoulder_drop > 1) {checkresult = 'CPI2-3';}
								else if (num_total>2 || (num_responder>2 && center=="TOC#3")) {checkresult = 'CPI2-3';}
								else if (num_pickup>0 || (num_responder>4 && (all_hazards.includes('over ')))) {checkresult = 'CPI2-3';}
								else {checkresult = 'CPI2-2';}
							}
							if (checkresult == 'CPI2-3') {
								if (num_truck>0) {checkresult = 'CPI2-4';}
								else if (aux_lane==true) {checkresult = 'CPI2-4';}
								else {checkresult = 'CPI2-3';}
							}

							if (checkresult == 'CPI2-1') {CPI2_case1();}
							else if (checkresult == 'CPI2-2') {CPI2_case2();}
							else if (checkresult == 'CPI2-3') {CPI2_case3();}
							else if (checkresult == 'CPI2-4') {CPI2_case4();}
						}
					}
					else if (model['collision']=='Property Damage only') {
						if (model['number_travel']=='1 Travel lane blocked') {
							checkresult = 'CPD1-0';
							if (checkresult == 'CPD1-0') {
								if (num_total>2 && num_responder>3) {checkresult = 'CPD1-2';}
								else if (num_truck>0 && num_police>1) {checkresult = 'CPD1-2';}
								else if (pavement == 'Chemical wet' && num_police>0) {checkresult = 'CPD1-2';}
								else if ((model['season_time'] =='Winter' && num_tow>0) || (center=='TOC3' && aux_lane==true)) {checkresult = 'CPD1-2';}
								else {checkresult = 'CPD1-1';}
							}
							if (checkresult == 'CPD1-2') {
								if (num_responder>7 || pavement == 'Chemical wet') {checkresult = 'CPD1-3';}
								else if ((num_total>2 && num_tow>1) || center=='TOC3') {checkresult = 'CPD1-3';}
								else {checkresult = 'CPD1-2';}
							}
							if (checkresult == 'CPD1-3') {
								if (num_truck>0 || num_responder>5 || pavement == 'Chemical wet') {checkresult = 'CPD1-4';}
								else {checkresult = 'CPD1-3';}
							}

							if (checkresult == 'CPD1-1') {CPD1_case1();}
							else if (checkresult == 'CPD1-2') {CPD1_case2();}
							else if (checkresult == 'CPD1-3') {CPD1_case3();}
							else if (checkresult == 'CPD1-4') {CPD1_case4();}
						}
						else if (['2 Travel lanes blocked', '3 Travel lanes blocked', '4 Travel lanes blocked', '5+ Travel lanes blocked'].includes(model['number_travel'])) {
							checkresult = 'CPD2-0';
							if (checkresult == 'CPD2-0') {
								if (num_tow>0 && num_fireboard>0) {checkresult = 'CPD2-2';}
								else if (pavement == 'Snow/Ice' || pavement == 'Chemical wet' || truck_hazards.includes('jack ') || num_responder>6) {checkresult = 'CPD2-2';}
								else if ((num_fireboard>0 || ['4 Travel lanes blocked', '5+ Travel lanes blocked'].includes(model['number_travel'])) && first_responder=='POLICE') {checkresult = 'CPD2-2';}
								else {checkresult = 'CPD2-1';}
							}
							if (checkresult == 'CPD2-2') {
								if (num_tow>1) {checkresult = 'CPD2-3';}
								else if (num_truck>0 && num_responder>5) {checkresult = 'CPD2-3';}
								else if (model['number_travel']=='5+ Travel lanes blocked' || pavement == 'Snow/Ice' || pavement == 'Wet') {checkresult = 'CPD2-3';}
								else {checkresult = 'CPD2-2';}
							}
							if (checkresult == 'CPD2-3') {
								if ((model['number_travel']=='5+ Travel lanes blocked' && pavement == 'Snow/Ice') || pavement == 'Chemical wet') {checkresult = 'CPD2-4';}
								else {checkresult = 'CPD2-3';}
							}

							if (checkresult == 'CPD2-1') {CPD2_case1();}
							else if (checkresult == 'CPD2-2') {CPD2_case2();}
							else if (checkresult == 'CPD2-3') {CPD2_case3();}
							else if (checkresult == 'CPD2-4') {CPD2_case4();}
						}
					}
				}
				else if (model['blockage']=='Shoulder only blockage') {
					prob = 1/(1+Math.exp(-(-2.27-0.47*baltimoreCity+0.07*cecil-0.28*harford+0.41*dry+0.98*snow+0.33*unspecified+0.84*wet-0.38*week+0.3*nonholiday_sh
						-0.23*num_total+0.52*num_car+1.04*num_truck+0.26*num_responder+0.34*num_fireboard+0.43*num_medical-0.23*cpi
						+0.48*spring+0.37*summer+0.54*winter+0.08*daytime+0.23*nighttime)));
					console.log(prob);

					if (num_tow > 0) {shoulder_case2();}
					else if (center != 'AOC') {shoulder_case1();}
					else if (num_responder == 1 && pavement == 'Dry') {shoulder_case1();}
					else if (shoulder_drop == 2) {shoulder_case2();}
					else if ((model['collision'] == 'Personal Injury' && hour == 'AM-peak') || (model['collision'] == 'Personal Injury' && hour == 'Night time')) {shoulder_case2();}
					else if (hour == 'PM-peak') {shoulder_case1();}
					else if (prob <= 0.4 && num_truck == 0) {shoulder_case1();}
					else if (prob > 0.5 && num_fireboard > 0) {shoulder_case2();}
					else {shoulder_case3();}
				}
			}
			else if (model['incident'] == 'Non-Collision incident') {
				if (model['collision'] == 'Vehicles on Fire') {
					 drawSVG1(10, 90, 30, 100, "5~45", "60%");
					 drawSVG2(10, 120, 30, 130, "5~60", "70%");
					 drawSVG3(10, 180, 30, 190, "5~90", "80%");
					 drawSVG4("Average CT = 45 mins");
				}
				else if (model['collision'] == 'Emergency Roadwork') {
					$("#first_stop").text("100min");
					$("#second_stop").text("200min");
					$("#fourth_stop").text("400min");

					drawSVG1(10, 95, 40 , 105, "5~160", "60%");
					drawSVG2(10, 145, 60, 155, "5~240", "70%");
					drawSVG3(10, 195, 80, 205, "5~330", "80%");
					drawSVG4("Average CT = 170 mins");
				}
				else if (model['collision'] == 'Off-road Activity') {
					 drawSVG1(0, 60, 20, 70, "<30", "60%");
					 drawSVG2(0, 90, 20, 100, "<45", "70%");
					 drawSVG3(0, 120, 20, 130, "<60", "80%");
					 drawSVG4("Average CT = 40 mins");
				}
			}
		}
	}
	else if (cluster1.includes(road)) {
		if (model['incident']=='Collision incident') {
			drawSVG1(20, 150, 67, 160, "10~75", "60%");
			drawSVG2(20, 190, 87, 200, "10~95", "70%");
			drawSVG3(10, 260, 102, 270, "5~130", "80%");
			drawSVG4("Average CT = 54 mins");

			if (model['blockage']=='Travel lane blockage') {
				drawSVG1(30, 200, 93, 210, "15~100", "60%");
				drawSVG2(20, 270, 123, 280, "10~135", "70%");
				drawSVG3(10, 300, 133, 310, "5~165", "80%");
				drawSVG4("Average CT = 67 mins");

				if (model['collision']=='Fatality') {
					$("#first_stop").text("100min");
					$("#second_stop").text("200min");
					$("#fourth_stop").text("400min");

					drawSVG1(54, 114, 59, 124, "90~190", "60%");
					drawSVG2(45, 117, 56, 127, "75~195", "70%");
					drawSVG3(24, 123, 49, 133, "40~205", "80%");
					drawSVG4("Average CT = 136 mins");
				}

				else if (model['collision']=='Personal Injury') {
					drawSVG1(30, 250, 118, 260, "15~125", "60%");
					drawSVG2(30, 280, 133, 290, "15~140", "70%");
					drawSVG3(20, 300, 138, 310, "10~185", "80%");
					drawSVG4("Average CT = 77 mins");

					if (model['number_travel']=='1 Travel lane blocked') {
						drawSVG1(30, 100, 43, 110, "15~50", "60%");
						drawSVG2(30, 160, 73, 170, "15~80", "70%");
						drawSVG3(20, 220, 97, 230, "10~110", "80%");
						drawSVG4("Average CT = 47 mins");

					}
					else if (['2 Travel lanes blocked', '3 Travel lanes blocked', '4 Travel lanes blocked', '5+ Travel lanes blocked'].includes(model['number_travel'])) {
						drawSVG1(30, 280, 130, 290, "15~140", "60%");
						drawSVG2(30, 300, 140, 310, "15~150", "70%");
						drawSVG3(10, 300, 130, 310, "10~200", "80%");
						drawSVG4("Average CT = 85 mins");
					}
				}

				else if (model['collision']=='Property Damage only') {
					drawSVG1(20, 110, 45, 120, "10~55", "60%");
					drawSVG2(10, 160, 68, 170, "5~80", "70%");
					drawSVG3(10, 190, 83, 200, "5~85", "80%");
					drawSVG4("Average CT = 48 mins");

					if (model['number_travel']=='1 Travel lane blocked') {
						drawSVG1(10, 80, 27, 90, "5~40", "60%");
						drawSVG2(10, 100, 37, 110, "5~50", "70%");
						drawSVG3(10, 150, 62, 160, "5~75", "80%");
						drawSVG4("Average CT = 29 mins");
					}
					else if (['2 Travel lanes blocked', '3 Travel lanes blocked', '4 Travel lanes blocked', '5+ Travel lanes blocked'].includes(model['number_travel'])) {
						drawSVG1(30, 160, 77, 170, "15~80", "60%");
						drawSVG2(30, 240, 112, 250, "15~120", "70%");
						drawSVG3(20, 300, 137, 310, "10~220", "80%");
						drawSVG4("Average CT = 83 mins");
					}
				}
			}
			else if (model['blockage']=='Shoulder only blockage') {
				drawSVG1(20, 110, 45, 120, "10~55", "60%");
				drawSVG2(20, 130, 55, 140, "10~65", "70%");
				drawSVG3(10, 190, 82, 200, "5~95", "80%");
				drawSVG4("Average CT = 39 mins");
			}
		}
		else if (model['incident']=='Non-Collision incident') { // build awaiting instructions
			drawSVG1(10, 30, 40, 110, "5~15", "65%");
			drawSVG2(10, 40, 50, 120, "5~20", "75%");
			drawSVG3(10, 60, 70, 140, "5~30", "80%");
			drawSVG4("Average CT = 20 mins");

			if (model['collision'] == 'Debris in Roadway') {
				drawSVG1(0, 20, 0, 30, "<10", "85%");
				drawSVG2(0, 40, 10, 50, "<20", "90%");
				drawSVG3(0, 60, 20, 70, "<30", "95%");
				drawSVG4("Average CT = 5 mins");
			}
			else if (model['collision'] == 'Disabled Vehicle') {
				drawSVG1(0, 30, 5, 40, "<15", "65%");
				drawSVG2(0, 40, 10, 50, "<20", "75%");
				drawSVG3(0, 60, 15, 70, "<30", "85%");
				drawSVG4("Average CT = 20 mins");
			}
			else if (model['collision'] == 'Police Activity') {
				drawSVG1(0, 60, 20, 70, "<30", "65%");
				drawSVG2(0, 90, 30, 100, "<45", "80%");
				drawSVG3(0, 120, 40, 130, "<60", "90%");
				drawSVG4("Average CT = 30 mins");
			}
			else if (model['collision'] == 'Utility Problem') {
				drawSVG1(120, 300, 180, 310, "60~240", "100%");
				drawSVG2(0, 0, 0, 0, "", "");
				drawSVG3(0, 0, 0, 0, "", "");
				drawSVG4("Average CT = 160 mins");
			}
			else if (model['collision'] == 'Weather Closure') {
				drawSVG1(10, 140, 30, 150, "5~70", "60%");
				drawSVG2(10, 180, 30, 190, "5~90", "70%");
				drawSVG3(10, 240, 30, 250, "5~120", "80%");
				drawSVG4("Average CT = 190 mins");
			}
			else if (model['collision'] == 'Others') {
				drawSVG1(0, 40, 10, 50, "<20", "65%");
				drawSVG2(0, 60, 20, 70, "<30", "75%");
				drawSVG3(0, 120, 40, 130, "<60", "90%");
				drawSVG4("Average CT = 25 mins");
			}

			else if (model['collision'] == 'Vehicles on Fire') {
				drawSVG1(10, 90, 30, 100, "5~45", "60%");
				drawSVG2(10, 120, 30, 130, "5~60", "70%");
				drawSVG3(10, 180, 30, 190, "5~90", "80%");
				drawSVG4("Average CT = 45 mins");
			}
			else if (model['collision'] == 'Emergency Roadwork') {
				$("#first_stop").text("100min");
				$("#second_stop").text("200min");
				$("#fourth_stop").text("400min");

				drawSVG1(10, 95, 40 , 105, "5~160", "60%");
				drawSVG2(10, 145, 60, 155, "5~240", "70%");
				drawSVG3(10, 195, 80, 205, "5~330", "80%");
				drawSVG4("Average CT = 170 mins");
			}
			else if (model['collision'] == 'Off-road Activity') {
				drawSVG1(0, 60, 20, 70, "<30", "60%");
				drawSVG2(0, 90, 20, 100, "<45", "70%");
				drawSVG3(0, 120, 20, 130, "<60", "80%");
				drawSVG4("Average CT = 40 mins");
			}	
		}

		if (![model['incident'], model["involved_veh"], model["responder"], model["center_choice"], model["pavement_condition"], model["hour_time"]].includes(null) && (model["location"] != null || model["exit"] != null)) {
			if (model['incident'] == 'Collision incident') {
				if (model['blockage']=='Travel lane blockage') {
					if (model['collision']=='Fatality') {
						if (model['weekend_time'] == 'Weekend' && center=='SOC') {CF_case2();}
						else if (model['weekend_time'] == 'Weekday' && num_responder > 7) {CF_case2();}
						else {CF_case1();}
					}
					else if (model['collision']=='Personal Injury') {
						if (model['number_travel']=='1 Travel lane blocked') {
							checkresult = 'CPI1-0';
							if (checkresult == 'CPI1-0') {
								if (num_tow > 0) {checkresult = 'CPI1-2';}
								else if (shoulder_drop > 0 && num_responder > 4) {checkresult = 'CPI1-2';}
								else if (!['AM-peak', 'PM-peak'].includes(hour) && first_responder == "POLICE") {checkresult = 'CPI1-2';}
								else if (num_truck > 0 || num_motorcycle > 0) {checkresult = 'CPI1-2';}
								else if ((num_responder > 3 && model['weekend_time'] == 'Weekend') || num_van > 0) {checkresult = 'CPI1-2';}
								else {checkresult = 'CPI1-1';}
							}
							if (checkresult == 'CPI1-2') {
								if ((center == "SOC" && shoulder_drop > 0) || num_pedestrian > 0) {checkresult = 'CPI1-3';}
								else if (num_tow == 0 || num_truck == 0) {checkresult = 'CPI1-2';}
								else {checkresult = 'CPI1-2';}
							}
							if (checkresult == 'CPI1-3') {
								if (num_truck > 0) {checkresult = 'CPI1-4';}
								else {checkresult = 'CPI1-3';}
							}

							if (checkresult == 'CPI1-1') {CPI1_case1();}
							else if (checkresult == 'CPI1-2') {CPI1_case2();}
							else if (checkresult == 'CPI1-3') {CPI1_case3();}
							else if (checkresult == 'CPI1-4') {CPI1_case4();}
						}
						else if (['2 Travel lanes blocked', '3 Travel lanes blocked', '4 Travel lanes blocked', '5+ Travel lanes blocked'].includes(model['number_travel'])) {
							checkresult = 'CPI2-0';
							if (checkresult == 'CPI2-0') {
								if (num_tow > 0) {checkresult = 'CPI2-2';}
								else if (num_responder > 4) {checkresult = 'CPI2-2';}
								else if (model['season_time'] =='Winter' || hour == 'Night time') {checkresult = 'CPI2-2';}
								else if (num_responder > 3 && road == 'us1') {checkresult = 'CPI2-2';}
								else if ((model['number_travel']=='5+ Travel lanes blocked' && num_pickup > 0) || (num_truck > 0)) {checkresult = 'CPI2-2';}
								else if (shoulder_drop > 2 && road == 'us1') {checkresult = 'CPI2-2';}
								else if (!['AM-peak', 'PM-peak'].includes(hour) && num_chart == 0) {checkresult = 'CPI2-2';}
								else {checkresult = 'CPI2-1';}
							}
							if (checkresult == 'CPI2-2') {
								if (num_responder > 6) {checkresult = 'CPI2-3';}
								else if (hour == 'Night time' && (num_police > 1 || num_responder > 5)) {checkresult = 'CPI2-3';}
								else if (num_responder > 3 && first_responder == 'FIREBOARD') {checkresult = 'CPI2-3';}
								else if (shoulder_drop > 2 && num_responder > 4) {checkresult = 'CPI2-3';}
								else if ((num_truck > 0 && first_responder == "POLICE") || num_medical > 0 || num_bus > 0) {checkresult = 'CPI2-3';}
								else if (model['weekend_time'] == 'Weekend' && model['number_travel']=='5+ Travel lanes blocked') {checkresult = 'CPI2-3';}
								else {checkresult = 'CPI2-2';}
							}
							if (checkresult == 'CPI2-3') {
								if (num_truck > 0) {checkresult = 'CPI2-4';}
								else if (shoulder_drop > 0 && num_chart > 1) {checkresult = 'CPI2-4';}
								else if (center == "SOC" && ['4 Travel lanes blocked', '5+ Travel lanes blocked'].includes(model['number_travel'])) {checkresult = 'CPI2-4';}
								else {checkresult = 'CPI2-3';}
							}

							if (checkresult == 'CPI2-1') {CPI2_case1();}
							else if (checkresult == 'CPI2-2') {CPI2_case2();}
							else if (checkresult == 'CPI2-3') {CPI2_case3();}
							else if (checkresult == 'CPI2-4') {CPI2_case4();}
						}
					}
					else if (model['collision']=='Property Damage only') {
						if (model['number_travel']=='1 Travel lane blocked') {
							checkresult = 'CPD1-0';
							if (checkresult == 'CPD1-0') {
								if (num_tow > 0 && num_fireboard > 0) {checkresult = 'CPD1-2';}
								else if (num_chart > 2 && first_responder == "CHART") {checkresult = 'CPD1-2';}
								else if (num_chart > 2 || (num_responder > 4 && pavement == 'Wet')) {checkresult = 'CPD1-2';}
								else if (num_responder > 3 && num_tow > 0) {checkresult = 'CPD1-2';}
								else if (pavement == 'Chemical wet' || all_hazards.includes('over ')) {checkresult = 'CPD1-2';}
								else if (center == "TOC4" && model['season_time'] == 'Winter') {checkresult = 'CPD1-2';}
								else if (pavement == 'Dry') {checkresult = 'CPD1-1';}
								else {checkresult = 'CPD1-1';}
							}
							if (checkresult == 'CPD1-2') {
								if (num_responder > 7) {checkresult = 'CPD1-3';}
								else if (aux_lane==true && num_responder > 4) {checkresult = 'CPD1-3';}
								else if (num_truck == 0) {checkresult = 'CPD1-2';}
								else {checkresult = 'CPD1-2';}
							}
							if (checkresult == 'CPD1-3') {
								if (num_tow > 1 || pavement == 'Chemical wet') {checkresult = 'CPD1-4';}
								else {checkresult = 'CPD1-3';}
							}

							if (checkresult == 'CPD1-1') {CPD1_case1();}
							else if (checkresult == 'CPD1-2') {CPD1_case2();}
							else if (checkresult == 'CPD1-3') {CPD1_case3();}
							else if (checkresult == 'CPD1-4') {CPD1_case4();}
						}
						else if (['2 Travel lanes blocked', '3 Travel lanes blocked', '4 Travel lanes blocked', '5+ Travel lanes blocked'].includes(model['number_travel'])) {
							checkresult = 'CPD2-0';
							if (checkresult == 'CPD2-0') {
								if (num_tow > 0 && num_fireboard > 0) {checkresult = 'CPD2-2';}
								else if (num_truck > 0 && num_responder > 4) {checkresult = 'CPD2-2';}
								else if ((hour == 'Night time' || num_responder > 4) && num_police > 1) {checkresult = 'CPD2-2';}
								else if ((['AM-peak', 'PM-peak'].includes(hour) || num_chart > 2) && num_truck > 0) {checkresult = 'CPD2-2';}
								else if ((center == "SOC" && num_responder > 3) || ['4 Travel lanes blocked', '5+ Travel lanes blocked'].includes(model['number_travel'])) {checkresult = 'CPD2-2';}
								else if (shoulder_drop > 1 && num_fireboard > 0) {checkresult = 'CPD2-2';}
								else if (num_truck > 0 || (pavement == 'Wet' && num_suv > 0)) {checkresult = 'CPD2-2';}
								else {checkresult = 'CPD2-1';}
							}
							if (checkresult == 'CPD2-2') {
								if (num_tow > 1) {checkresult = 'CPD2-3';}
								else if (num_truck > 1) {checkresult = 'CPD2-3';}
								else if (num_total > 3 || num_responder > 4 || all_hazards.includes('over ')) {checkresult = 'CPD2-3';}
								else if (num_chart == 0) {checkresult = 'CPD2-3';}
								else {checkresult = 'CPD2-2';}
							}
							if (checkresult == 'CPD2-3') {
								if (num_tow > 1) {checkresult = 'CPD2-4';}
								else if (num_truck > 0) {checkresult = 'CPD2-4';}
								else if (model['number_travel']=='5+ Travel lanes blocked' || (model['weekend_time'] == 'Weekend' && road=='md85')) {checkresult = 'CPD2-4';}
								else {checkresult = 'CPD2-3';}
							}

							if (checkresult == 'CPD2-1') {CPD2_case1();}
							else if (checkresult == 'CPD2-2') {CPD2_case2();}
							else if (checkresult == 'CPD2-3') {CPD2_case3();}
							else if (checkresult == 'CPD2-4') {CPD2_case4();}
						}
					}
				}
				else if (model['blockage']=='Shoulder only blockage') {
					prob = 1/(1+Math.exp(-(-2.27-0.47*baltimoreCity+0.07*cecil-0.28*harford+0.41*dry+0.98*snow+0.33*unspecified+0.84*wet-0.38*week+0.3*nonholiday_sh
						-0.23*num_total+0.52*num_car+1.04*num_truck+0.26*num_responder+0.34*num_fireboard+0.43*num_medical-0.23*cpi
						+0.48*spring+0.37*summer+0.54*winter+0.08*daytime+0.23*nighttime)));
					console.log(prob);

					if (num_tow > 0) {shoulder_case2();}
					else if (center != 'AOC') {shoulder_case1();}
					else if (num_responder == 1 && pavement == 'Dry') {shoulder_case1();}
					else if (shoulder_drop == 2) {shoulder_case2();}
					else if ((model['collision'] == 'Personal Injury' && hour == 'AM-peak') || (model['collision'] == 'Personal Injury' && hour == 'Night time')) {shoulder_case2();}
					else if (hour == 'PM-peak') {shoulder_case1();}
					else if (prob <= 0.4 && num_truck == 0) {shoulder_case1();}
					else if (prob > 0.5 && num_fireboard > 0) {shoulder_case2();}
					else {shoulder_case3();}
				}
			}
			else if (model['incident'] == 'Non-Collision incident') {
				if (model['collision'] == 'Vehicles on Fire') {
					 drawSVG1(10, 90, 30, 100, "5~45", "60%");
					 drawSVG2(10, 120, 30, 130, "5~60", "70%");
					 drawSVG3(10, 180, 30, 190, "5~90", "80%");
					 drawSVG4("Average CT = 45 mins");
				}
				else if (model['collision'] == 'Emergency Roadwork') {
					$("#first_stop").text("100min");
					$("#second_stop").text("200min");
					$("#fourth_stop").text("400min");

					drawSVG1(10, 95, 40 , 105, "5~160", "60%");
					drawSVG2(10, 145, 60, 155, "5~240", "70%");
					drawSVG3(10, 195, 80, 205, "5~330", "80%");
					drawSVG4("Average CT = 170 mins");
				}
				else if (model['collision'] == 'Off-road Activity') {
					 drawSVG1(0, 60, 20, 70, "<30", "60%");
					 drawSVG2(0, 90, 20, 100, "<45", "70%");
					 drawSVG3(0, 120, 20, 130, "<60", "80%");
					 drawSVG4("Average CT = 40 mins");
				}
			}
		}
	}
	else if (cluster2.includes(road)) {
		if (model['incident']=='Collision incident') {
			drawSVG1(20, 120, 48, 130, "10~60", "60%");
			drawSVG2(10, 140, 57, 150, "5~70", "70%");
			drawSVG3(10, 160, 67, 170, "5~80", "80%");
			drawSVG4("Average CT = 41 mins");

			if (model['blockage']=='Travel lane blockage') {
				drawSVG1(20, 120, 48, 130, "10~60", "60%");
				drawSVG2(20, 140, 58, 150, "10~70", "70%");
				drawSVG3(10, 160, 67, 170, "5~80", "80%");
				drawSVG4("Average CT = 43 mins");

				if (model['collision']=='Fatality') {
					$("#first_stop").text("100min");
					$("#second_stop").text("200min");
					$("#fourth_stop").text("400min");

					drawSVG1(93, 183, 108, 193, "155~305", "60%");
					drawSVG2(84, 186, 103, 196, "140~310", "70%");
					drawSVG3(78, 204, 110, 214, "130~340", "80%");
					drawSVG4("Average CT = 230 mins");
				}

				else if (model['collision']=='Personal Injury') {
					drawSVG1(40, 140, 68, 150, "20~70", "60%");
					drawSVG2(30, 170, 78, 180, "15~85", "70%");
					drawSVG3(20, 200, 88, 210, "10~100", "80%");
					drawSVG4("Average CT = 53 mins");

					if (model['number_travel']=='1 Travel lane blocked') {
						drawSVG1(30, 120, 53, 130, "15~60", "60%");
						drawSVG2(30, 140, 63, 150, "15~70", "70%");
						drawSVG3(20, 160, 68, 170, "10~80", "80%");
						drawSVG4("Average CT = 43 mins");

					}
					else if (model['number_travel']=='2 Travel lanes blocked') {
						drawSVG1(50, 170, 88, 180, "25~85", "60%");
						drawSVG2(30, 190, 88, 200, "15~95", "70%");
						drawSVG3(30, 240, 113, 250, "15~120", "80%");
						drawSVG4("Average CT = 62 mins");
					}
					else if (['3 Travel lanes blocked', '4 Travel lanes blocked', '5+ Travel lanes blocked'].includes(model['number_travel'])) {
						drawSVG1(50, 280, 141, 290, "25~140", "60%");
						drawSVG2(40, 290, 141, 300, "20~145", "70%");
						drawSVG3(40, 300, 146, 310, "20~190", "80%");
						drawSVG4("Average CT = 88 mins");
					}
				}

				else if (model['collision']=='Property Damage only') {
					drawSVG1(20, 110, 45, 120, "10~55", "60%");
					drawSVG2(10, 120, 47, 130, "5~60", "70%");
					drawSVG3(10, 140, 57, 150, "5~70", "80%");
					drawSVG4("Average CT = 34 mins");

					if (model['number_travel']=='1 Travel lane blocked') {
						drawSVG1(20, 100, 40, 110, "10~50", "60%");
						drawSVG2(10, 110, 42, 120, "5~55", "70%");
						drawSVG3(10, 130, 52, 140, "5~65", "80%");
						drawSVG4("Average CT = 32 mins");
					}
					else if (model['number_travel']=='2 Travel lanes blocked') {
						drawSVG1(20, 140, 60, 150, "10~70", "60%");
						drawSVG2(20, 150, 65, 160, "10~75", "70%");
						drawSVG3(10, 160, 67, 170, "5~80", "80%");
						drawSVG4("Average CT = 42 mins");
					}
					else if (['3 Travel lanes blocked', '4 Travel lanes blocked', '5+ Travel lanes blocked'].includes(model['number_travel'])) {
						drawSVG1(20, 140, 60, 150, "10~70", "60%");
						drawSVG2(20, 150, 65, 160, "10~75", "70%");
						drawSVG3(10, 160, 67, 170, "5~80", "80%");
						drawSVG4("Average CT = 41 mins");
					}
				}
			}
			else if (model['blockage']=='Shoulder only blockage') {
				drawSVG1(10, 110, 42, 120, "5~55", "60%");
				drawSVG2(10, 120, 47, 130, "5~60", "70%");
				drawSVG3(10, 150, 62, 160, "5~75", "80%");
				drawSVG4("Average CT = 33 mins");
			}
		}
		else if (model['incident']=='Non-Collision incident') { // build awaiting instructions
			drawSVG1(10, 30, 40, 110, "5~15", "65%");
			drawSVG2(10, 40, 50, 120, "5~20", "75%");
			drawSVG3(10, 60, 70, 140, "5~30", "80%");
			drawSVG4("Average CT = 20 mins");

			if (model['collision'] == 'Debris in Roadway') {
				drawSVG1(0, 20, 0, 30, "<10", "85%");
				drawSVG2(0, 40, 10, 50, "<20", "90%");
				drawSVG3(0, 60, 20, 70, "<30", "95%");
				drawSVG4("Average CT = 5 mins");
			}
			else if (model['collision'] == 'Disabled Vehicle') {
				drawSVG1(0, 30, 5, 40, "<15", "65%");
				drawSVG2(0, 40, 10, 50, "<20", "75%");
				drawSVG3(0, 60, 15, 70, "<30", "85%");
				drawSVG4("Average CT = 20 mins");
			}
			else if (model['collision'] == 'Police Activity') {
				drawSVG1(0, 60, 20, 70, "<30", "65%");
				drawSVG2(0, 90, 30, 100, "<45", "80%");
				drawSVG3(0, 120, 40, 130, "<60", "90%");
				drawSVG4("Average CT = 30 mins");
			}
			else if (model['collision'] == 'Utility Problem') {
				drawSVG1(120, 300, 180, 310, "60~240", "100%");
				drawSVG2(0, 0, 0, 0, "", "");
				drawSVG3(0, 0, 0, 0, "", "");
				drawSVG4("Average CT = 160 mins");
			}
			else if (model['collision'] == 'Weather Closure') {
				drawSVG1(10, 140, 30, 150, "5~70", "60%");
				drawSVG2(10, 180, 30, 190, "5~90", "70%");
				drawSVG3(10, 240, 30, 250, "5~120", "80%");
				drawSVG4("Average CT = 190 mins");
			}
			else if (model['collision'] == 'Others') {
				drawSVG1(0, 40, 10, 50, "<20", "65%");
				drawSVG2(0, 60, 20, 70, "<30", "75%");
				drawSVG3(0, 120, 40, 130, "<60", "90%");
				drawSVG4("Average CT = 25 mins");
			}

			else if (model['collision'] == 'Vehicles on Fire') {
				drawSVG1(10, 90, 30, 100, "5~45", "60%");
				drawSVG2(10, 120, 30, 130, "5~60", "70%");
				drawSVG3(10, 180, 30, 190, "5~90", "80%");
				drawSVG4("Average CT = 45 mins");
			}
			else if (model['collision'] == 'Emergency Roadwork') {
				$("#first_stop").text("100min");
				$("#second_stop").text("200min");
				$("#fourth_stop").text("400min");

				drawSVG1(10, 95, 40 , 105, "5~160", "60%");
				drawSVG2(10, 145, 60, 155, "5~240", "70%");
				drawSVG3(10, 195, 80, 205, "5~330", "80%");
				drawSVG4("Average CT = 170 mins");
			}
			else if (model['collision'] == 'Off-road Activity') {
				drawSVG1(0, 60, 20, 70, "<30", "60%");
				drawSVG2(0, 90, 20, 100, "<45", "70%");
				drawSVG3(0, 120, 20, 130, "<60", "80%");
				drawSVG4("Average CT = 40 mins");
			}	
		}

		if (![model['incident'], model["involved_veh"], model["responder"], model["center_choice"], model["pavement_condition"], model["hour_time"]].includes(null) && (model["location"] != null || model["exit"] != null)) {
			if (model['incident'] == 'Collision incident') {
				if (model['blockage']=='Travel lane blockage') {
					if (model['collision']=='Fatality') {
						if (num_responder > 6) {CF_case2();}
						else if (num_truck > 0 || pavement == 'Snow/Ice' || num_pedestrian > 0) {CF_case2();}
						else {CF_case1();}
					}
					else if (model['collision']=='Personal Injury') {
						if (model['number_travel']=='1 Travel lane blocked') {
							checkresult = 'CPI1-0';
							if (checkresult == 'CPI1-0') {
								if (num_tow > 0) {checkresult = 'CPI1-2';}
								else if (tunnel_lane == true) {checkresult = 'CPI1-2';}
								else if (num_chart > 1 && first_responder == 'POLICE') {checkresult = 'CPI1-2';}
								else if (num_responder > 1 && road == 'i895') {checkresult = 'CPI1-2';}
								else if (['AM-peak', 'PM-peak'].includes(hour) && num_responder > 3) {checkresult = 'CPI1-2';}
								else if (num_total > 1 && num_responder > 4) {checkresult = 'CPI1-2';}
								else if (model['season_time'] =='Winter' && num_chart > 1) {checkresult = 'CPI1-2';}
								else if (center == "AOC" && aux_lane == true) {checkresult = 'CPI1-2';}
								else {checkresult = 'CPI1-1';}
							}
							if (checkresult == 'CPI1-2') {
								if (num_police > 1 && num_fireboard > 1) {checkresult = 'CPI1-3';}
								else if (num_truck > 0 && num_chart > 2) {checkresult = 'CPI1-3';}
								else if (num_total > 3 && num_responder > 5) {checkresult = 'CPI1-3';}
								else if ((num_chart > 2 && num_pickup > 0) || num_total > 5) {checkresult = 'CPI1-3';}
								else if (first_responder == "CHART" && all_hazards.includes('over ')) {checkresult = 'CPI1-3';}
								else if ((num_responder > 4 && num_van > 0) || (road == "md295" && first_responder == "FIREBOARD")) {checkresult = 'CPI1-3';}
								else {checkresult = 'CPI1-2';}
							}
							if (checkresult == 'CPI1-3') {
								if (num_responder > 8) {checkresult = 'CPI1-4';}
								else if (num_responder < 4 || num_truck == 0) {checkresult = 'CPI1-3';}
								else if ((aux_lane == true && num_responder > 4) || num_responder > 5) {checkresult = 'CPI1-4';}
								else {checkresult = 'CPI1-3';}
							}

							if (checkresult == 'CPI1-1') {CPI1_case1();}
							else if (checkresult == 'CPI1-2') {CPI1_case2();}
							else if (checkresult == 'CPI1-3') {CPI1_case3();}
							else if (checkresult == 'CPI1-4') {CPI1_case4();}
						}
						else if (model['number_travel']=='2 Travel lanes blocked') {
							checkresult = 'CPI2-0';
							if (checkresult == 'CPI2-0') {
								if (num_tow > 0) {checkresult = 'CPI2-2';}
								else if (num_responder > 4) {checkresult = 'CPI2-2';}
								else if (num_responder > 2 && first_responder == "POLICE") {checkresult = 'CPI2-2';}
								else if ((center == "AOC" && total_lane > 2) || pavement == 'Snow/Ice') {checkresult = 'CPI2-2';}
								else if (shoulder_drop > 0 && first_responder == "POLICE") {checkresult = 'CPI2-2';}
								else {checkresult = 'CPI2-1';}
							}
							if (checkresult == 'CPI2-2') {
								if (num_responder > 6) {checkresult = 'CPI2-3';}
								else if ((num_responder > 7 && aux_lane == true) || pavement == 'Snow/Ice') {checkresult = 'CPI2-3';}
								else if (num_truck > 0) {checkresult = 'CPI2-3';}
								else if (shoulder_drop > 1 && (num_responder > 5 || first_responder == "FIREBOARD")) {checkresult = 'CPI2-3';}
								else if ((center == "AOC" && num_pickup > 0) || aux_lane == true) {checkresult = 'CPI2-3';}
								else if (center == "SOC" && num_responder > 5) {checkresult = 'CPI2-3';}
								else {checkresult = 'CPI2-2';}
							}
							if (checkresult == 'CPI2-3') {
								if (num_responder > 7) {checkresult = 'CPI2-4';}
								else if ((num_fireboard > 0 && pavement == 'Snow/Ice') || (num_van > 0 && hour == 'Night time')) {checkresult = 'CPI2-4';}
								else {checkresult = 'CPI2-3';}
							}

							if (checkresult == 'CPI2-1') {CPI2_case1();}
							else if (checkresult == 'CPI2-2') {CPI2_case2();}
							else if (checkresult == 'CPI2-3') {CPI2_case3();}
							else if (checkresult == 'CPI2-4') {CPI2_case4();}
						}
						else if (['3 Travel lanes blocked', '4 Travel lanes blocked', '5+ Travel lanes blocked'].includes(model['number_travel'])) {
							checkresult = 'CPI3-0';
							if (checkresult == 'CPI3-0') {
								if (num_responder > 3 && aux_lane == true) {checkresult = 'CPI3-2';}
								else if (first_responder == "FIREBOARD") {checkresult = 'CPI3-2';}
								else if (num_bus > 0 || pavement == 'Chemical wet' || num_truck > 1) {checkresult = 'CPI3-2';}
								else if (num_responder > 4) {checkresult = 'CPI3-2';}
								else if (['4 Travel lanes blocked', '5+ Travel lanes blocked'].includes(model['number_travel'])) {checkresult = 'CPI3-2';}
								else {checkresult = 'CPI3-1';}
							}
							if (checkresult == 'CPI3-2') {
								if (model['holiday_time'] == 'Holiday' && num_truck > 0) {checkresult = 'CPI3-3';}
								else if (model['weekend_time'] == 'Weekend' && first_responder == "FIREBOARD") {checkresult = 'CPI3-3';}
								else if ((num_responder > 5 || num_chart > 1) && num_tow > 1) {checkresult = 'CPI3-3';}
								else if (['5+ Travel lanes blocked'].includes(model['number_travel'])) {checkresult = 'CPI3-3';}
								else if (model['weekend_time'] == 'Weekend' && num_responder > 4) {checkresult = 'CPI3-3';}
								else {checkresult = 'CPI3-2';}
							}
							if (checkresult == 'CPI3-3') {
								if (num_truck > 1) {checkresult = 'CPI3-4';}
								else if (['5+ Travel lanes blocked'].includes(model['number_travel']) && num_chart > 2) {checkresult = 'CPI3-4';}
								else if (pavement == 'Wet' && ['5+ Travel lanes blocked'].includes(model['number_travel'])) {checkresult = 'CPI3-4';}
								else if (num_responder > 6) {checkresult = 'CPI3-4';}
								else if (shoulder_drop > 1) {checkresult = 'CPI3-4';}
								else {checkresult = 'CPI3-3';}
							}

							if (checkresult == 'CPI3-1') {CPI3_case1();}
							else if (checkresult == 'CPI3-2') {CPI3_case2();}
							else if (checkresult == 'CPI3-3') {CPI3_case3();}
							else if (checkresult == 'CPI3-4') {CPI3_case4();}
						}
					}
					else if (model['collision']=='Property Damage only') {
						if (model['number_travel']=='1 Travel lane blocked') {
							checkresult = 'CPD1-0';
							if (checkresult == 'CPD1-0') {
								if (num_tow > 0 && num_fireboard > 0) {checkresult = 'CPD1-2';}
								else if (num_responder > 3 && num_tow > 0) {checkresult = 'CPD1-2';}
								else if (model['season_time'] == 'Winter' && num_pickup > 0) {checkresult = 'CPD1-2';}
								else if (num_responder > 2 && all_hazards.includes('over ')) {checkresult = 'CPD1-2';}
								else if (center == "AOC" && num_fireboard > 0) {checkresult = 'CPD1-2';}
								else if ((road == "i83" && num_tow > 0) || (road == "i395" && num_chart > 2)) {checkresult = 'CPD1-2';}
								else if (num_truck > 0 && num_police > 1) {checkresult = 'CPD1-2';}
								else if (num_tow > 0 && num_pickup > 0) {checkresult = 'CPD1-2';}
								else if (num_truck > 1 || all_hazards.includes('jack ') || all_hazards.includes('lost ')) {checkresult = 'CPD1-2';}
								else if (toll_lane == true && num_responder > 3) {checkresult = 'CPD1-2';}
								else if (num_total > 2 && num_responder > 6) {checkresult = 'CPD1-2';}
								else {checkresult = 'CPD1-1';}
							}
							if (checkresult == 'CPD1-2') {
								if (num_responder > 7) {checkresult = 'CPD1-3';}
								else if (shoulder_drop > 0 && num_responder > 6) {checkresult = 'CPD1-3';}
								else if (aux_lane == true && num_tow > 1) {checkresult = 'CPD1-3';}
								else if (num_total > 3 && num_responder > 4) {checkresult = 'CPD1-3';}
								else if (num_total > 2 && num_truck > 0) {checkresult = 'CPD1-3';}
								else if ((num_chart > 1 && all_hazards.includes('over ')) || truck_hazards.includes('lost ')) {checkresult = 'CPD1-3';}
								else if (num_truck == 0) {checkresult = 'CPD1-2';}
								else {checkresult = 'CPD1-2';}
							}
							if (checkresult == 'CPD1-3') {
								if (num_chart > 2 && truck_hazards.includes('over ')) {checkresult = 'CPD1-4';}
								else if (aux_lane == true && all_hazards.includes('over ')) {checkresult = 'CPD1-4';}
								else {checkresult = 'CPD1-3';}
							}

							if (checkresult == 'CPD1-1') {CPD1_case1();}
							else if (checkresult == 'CPD1-2') {CPD1_case2();}
							else if (checkresult == 'CPD1-3') {CPD1_case3();}
							else if (checkresult == 'CPD1-4') {CPD1_case4();}
						}
						else if (model['number_travel']=='2 Travel lanes blocked') {
							checkresult = 'CPD2-0';
							if (checkresult == 'CPD2-0') {
								if (num_tow > 0 && num_fireboard > 0) {checkresult = 'CPD2-2';}
								else if ((model['weekend_time'] == 'Weekend' || num_total > 1) && num_tow > 0) {checkresult = 'CPD2-2';}
								else if (!['AM-peak', 'PM-peak'].includes(hour) && num_truck > 0) {checkresult = 'CPD2-2';}
								else if ((num_tow > 0 && first_responder == "POLICE") || (pavement == 'Snow/Ice' && all_hazards.includes('over '))) {checkresult = 'CPD2-2';}
								else {checkresult = 'CPD2-1';}
							}
							if (checkresult == 'CPD2-2') {
								if (num_truck > 1) {checkresult = 'CPD2-3';}
								else if (num_total > 3 && num_responder > 4) {checkresult = 'CPD2-3';}
								else if (num_truck > 0 && num_responder > 5) {checkresult = 'CPD2-3';}
								else if (model['weekend_time'] == 'Weekend' && hour == 'Night time' && num_total > 2 && num_tow > 0) {checkresult = 'CPD2-3';}
								else if (shoulder_drop > 0 && num_truck > 0) {checkresult = 'CPD2-3';}
								else if ((center == "AOC" && num_pickup > 0) || pavement == 'Chemical wet') {checkresult = 'CPD2-3';}
								else if (road == "md200" && num_tow > 0) {checkresult = 'CPD2-3';}
								else {checkresult = 'CPD2-2';}
							}
							if (checkresult == 'CPD2-3') {
								if (num_truck > 1 || all_hazards.includes('jack ')) {checkresult = 'CPD2-4';}
								else if (num_truck == 0) {checkresult = 'CPD2-3';}
								else {checkresult = 'CPD2-3';}
							}

							if (checkresult == 'CPD2-1') {CPD2_case1();}
							else if (checkresult == 'CPD2-2') {CPD2_case2();}
							else if (checkresult == 'CPD2-3') {CPD2_case3();}
							else if (checkresult == 'CPD2-4') {CPD2_case4();}
						}
						else if (['3 Travel lanes blocked', '4 Travel lanes blocked', '5+ Travel lanes blocked'].includes(model['number_travel'])) {
							checkresult = 'CPD3-0';
							if (checkresult == 'CPD3-0') {
								if (num_tow > 0) {checkresult = 'CPD3-2';}
								else if (num_total > 2 && num_police > 1) {checkresult = 'CPD3-2';}
								else if (shoulder_drop > 1 && num_fireboard > 0) {checkresult = 'CPD3-2';}
								else {checkresult = 'CPD3-1';}
							}
							if (checkresult == 'CPD3-2') {
								if (num_tow > 1 || hazmat == true) {checkresult = 'CPD3-3';}
								else if (pavement == 'Snow/Ice' || model['holiday_time'] == 'Holiday') {checkresult = 'CPD3-3';}
								else if (num_tow == 0 || num_fireboard == 0) {checkresult = 'CPD3-2';}
								else if (all_hazards.includes('over ') || num_suv > 0) {checkresult = 'CPD3-3';}
								else {checkresult = 'CPD3-2';}
							}
							if (checkresult == 'CPD3-3') {
								if (num_responder > 6) {checkresult = 'CPD3-4';}
								else {checkresult = 'CPD3-3';}
							}

							if (checkresult == 'CPD3-1') {CPD3_case1();}
							else if (checkresult == 'CPD3-2') {CPD3_case2();}
							else if (checkresult == 'CPD3-3') {CPD3_case3();}
							else if (checkresult == 'CPD3-4') {CPD3_case4();}
						}
					}
				}
				else if (model['blockage']=='Shoulder only blockage') {
					prob = 1/(1+Math.exp(-(-2.27-0.47*baltimoreCity+0.07*cecil-0.28*harford+0.41*dry+0.98*snow+0.33*unspecified+0.84*wet-0.38*week+0.3*nonholiday_sh
						-0.23*num_total+0.52*num_car+1.04*num_truck+0.26*num_responder+0.34*num_fireboard+0.43*num_medical-0.23*cpi
						+0.48*spring+0.37*summer+0.54*winter+0.08*daytime+0.23*nighttime)));
					console.log(prob);

					if (num_tow > 0) {shoulder_case2();}
					else if (center != 'AOC') {shoulder_case1();}
					else if (num_responder == 1 && pavement == 'Dry') {shoulder_case1();}
					else if (shoulder_drop == 2) {shoulder_case2();}
					else if ((model['collision'] == 'Personal Injury' && hour == 'AM-peak') || (model['collision'] == 'Personal Injury' && hour == 'Night time')) {shoulder_case2();}
					else if (hour == 'PM-peak') {shoulder_case1();}
					else if (prob <= 0.4 && num_truck == 0) {shoulder_case1();}
					else if (prob > 0.5 && num_fireboard > 0) {shoulder_case2();}
					else {shoulder_case3();}
				}
			}
			else if (model['incident'] == 'Non-Collision incident') {
				if (model['collision'] == 'Vehicles on Fire') {
					 drawSVG1(10, 90, 30, 100, "5~45", "60%");
					 drawSVG2(10, 120, 30, 130, "5~60", "70%");
					 drawSVG3(10, 180, 30, 190, "5~90", "80%");
					 drawSVG4("Average CT = 45 mins");
				}
				else if (model['collision'] == 'Emergency Roadwork') {
					$("#first_stop").text("100min");
					$("#second_stop").text("200min");
					$("#fourth_stop").text("400min");

					drawSVG1(10, 95, 40 , 105, "5~160", "60%");
					drawSVG2(10, 145, 60, 155, "5~240", "70%");
					drawSVG3(10, 195, 80, 205, "5~330", "80%");
					drawSVG4("Average CT = 170 mins");
				}
				else if (model['collision'] == 'Off-road Activity') {
					 drawSVG1(0, 60, 20, 70, "<30", "60%");
					 drawSVG2(0, 90, 20, 100, "<45", "70%");
					 drawSVG3(0, 120, 20, 130, "<60", "80%");
					 drawSVG4("Average CT = 40 mins");
				}
			}
		}
	}
	else if (cluster3.includes(road)) {
		if (model['incident']=='Collision incident') {
			drawSVG1(20, 120, 48, 130, "10~60", "60%");
			drawSVG2(10, 140, 57, 150, "5~70", "70%");
			drawSVG3(10, 190, 77, 200, "5~95", "80%");
			drawSVG4("Average CT = 44 mins");

			if (model['blockage']=='Travel lane blockage') {
				drawSVG1(20, 150, 65, 160, "10~75", "60%");
				drawSVG2(20, 200, 87, 210, "10~100", "70%");
				drawSVG3(10, 280, 125, 290, "5~140", "80%");
				drawSVG4("Average CT = 57 mins");

				if (model['collision']=='Fatality') {
					$("#first_stop").text("100min");
					$("#second_stop").text("200min");
					$("#fourth_stop").text("400min");

					drawSVG1(87, 171, 97, 181, "145~285", "60%");
					drawSVG2(81, 180, 99, 190, "135~300", "70%");
					drawSVG3(78, 198, 106, 208, "130~330", "80%");
					drawSVG4("Average CT = 221 mins");
				}

				else if (model['collision']=='Personal Injury') {
					drawSVG1(40, 170, 83, 180, "20~85", "60%");
					drawSVG2(30, 220, 102, 230, "15~110", "70%");
					drawSVG3(20, 270, 122, 280, "10~135", "80%");
					drawSVG4("Average CT = 64 mins");

					if (model['number_travel']=='1 Travel lane blocked') {
						drawSVG1(30, 120, 55, 130, "15~60", "60%");
						drawSVG2(20, 130, 55, 140, "10~65", "70%");
						drawSVG3(20, 150, 65, 160, "10~75", "80%");
						drawSVG4("Average CT = 44 mins");
					}
					else if (model['number_travel']=='2 Travel lanes blocked') {
						drawSVG1(50, 210, 106, 220, "25~105", "60%");
						drawSVG2(40, 250, 121, 260, "20~125", "70%");
						drawSVG3(30, 300, 141, 310, "15~150", "80%");
						drawSVG4("Average CT = 73 mins");
					}
					else if (['3 Travel lanes blocked', '4 Travel lanes blocked', '5+ Travel lanes blocked'].includes(model['number_travel'])) {
						drawSVG1(50, 270, 136, 280, "25~135", "60%");
						drawSVG2(40, 300, 146, 310, "20~155", "70%");
						drawSVG3(30, 300, 141, 310, "15~175", "80%");
						drawSVG4("Average CT = 88 mins");
					}
				}

				else if (model['collision']=='Property Damage only') {
					drawSVG1(20, 110, 45, 120, "10~55", "60%");
					drawSVG2(10, 140, 57, 150, "5~70", "70%");
					drawSVG3(10, 180, 77, 190, "5~90", "80%");
					drawSVG4("Average CT = 43 mins");

					if (model['number_travel']=='1 Travel lane blocked') {
						drawSVG1(20, 100, 40, 110, "10~50", "60%");
						drawSVG2(20, 110, 47, 120, "10~55", "70%");
						drawSVG3(10, 140, 57, 150, "5~70", "80%");
						drawSVG4("Average CT = 34 mins");
					}
					else if (model['number_travel']=='2 Travel lanes blocked') {
						drawSVG1(20, 150, 65, 160, "10~75", "60%");
						drawSVG2(20, 200, 86, 210, "10~100", "70%");
						drawSVG3(10, 260, 125, 270, "5~130", "80%");
						drawSVG4("Average CT = 52 mins");
					}
					else if (['3 Travel lanes blocked', '4 Travel lanes blocked', '5+ Travel lanes blocked'].includes(model['number_travel'])) {
						drawSVG1(30, 240, 111, 250, "15~120", "60%");
						drawSVG2(20, 300, 136, 310, "10~165", "70%");
						drawSVG3(20, 300, 136, 310, "10~200", "80%");
						drawSVG4("Average CT = 94 mins");
					}
				}
			}
			else if (model['blockage']=='Shoulder only blockage') {
				drawSVG1(10, 90, 32, 100, "5~45", "60%");
				drawSVG2(10, 100, 37, 110, "5~50", "70%");
				drawSVG3(10, 120, 47, 130, "5~60", "80%");
				drawSVG4("Average CT = 28 mins");
			}
		}
		else if (model['incident']=='Non-Collision incident') { // build awaiting instructions
			drawSVG1(10, 30, 40, 110, "5~15", "65%");
			drawSVG2(10, 40, 50, 120, "5~20", "75%");
			drawSVG3(10, 60, 70, 140, "5~30", "80%");
			drawSVG4("Average CT = 20 mins");

			if (model['collision'] == 'Debris in Roadway') {
				drawSVG1(0, 20, 0, 30, "<10", "85%");
				drawSVG2(0, 40, 10, 50, "<20", "90%");
				drawSVG3(0, 60, 20, 70, "<30", "95%");
				drawSVG4("Average CT = 5 mins");
			}
			else if (model['collision'] == 'Disabled Vehicle') {
				drawSVG1(0, 30, 5, 40, "<15", "65%");
				drawSVG2(0, 40, 10, 50, "<20", "75%");
				drawSVG3(0, 60, 15, 70, "<30", "85%");
				drawSVG4("Average CT = 20 mins");
			}
			else if (model['collision'] == 'Police Activity') {
				drawSVG1(0, 60, 20, 70, "<30", "65%");
				drawSVG2(0, 90, 30, 100, "<45", "80%");
				drawSVG3(0, 120, 40, 130, "<60", "90%");
				drawSVG4("Average CT = 30 mins");
			}
			else if (model['collision'] == 'Utility Problem') {
				drawSVG1(120, 300, 180, 310, "60~240", "100%");
				drawSVG2(0, 0, 0, 0, "", "");
				drawSVG3(0, 0, 0, 0, "", "");
				drawSVG4("Average CT = 160 mins");
			}
			else if (model['collision'] == 'Weather Closure') {
				drawSVG1(10, 140, 30, 150, "5~70", "60%");
				drawSVG2(10, 180, 30, 190, "5~90", "70%");
				drawSVG3(10, 240, 30, 250, "5~120", "80%");
				drawSVG4("Average CT = 190 mins");
			}
			else if (model['collision'] == 'Others') {
				drawSVG1(0, 40, 10, 50, "<20", "65%");
				drawSVG2(0, 60, 20, 70, "<30", "75%");
				drawSVG3(0, 120, 40, 130, "<60", "90%");
				drawSVG4("Average CT = 25 mins");
			}

			else if (model['collision'] == 'Vehicles on Fire') {
				drawSVG1(10, 90, 30, 100, "5~45", "60%");
				drawSVG2(10, 120, 30, 130, "5~60", "70%");
				drawSVG3(10, 180, 30, 190, "5~90", "80%");
				drawSVG4("Average CT = 45 mins");
			}
			else if (model['collision'] == 'Emergency Roadwork') {
				$("#first_stop").text("100min");
				$("#second_stop").text("200min");
				$("#fourth_stop").text("400min");

				drawSVG1(10, 95, 40 , 105, "5~160", "60%");
				drawSVG2(10, 145, 60, 155, "5~240", "70%");
				drawSVG3(10, 195, 80, 205, "5~330", "80%");
				drawSVG4("Average CT = 170 mins");
			}
			else if (model['collision'] == 'Off-road Activity') {
				drawSVG1(0, 60, 20, 70, "<30", "60%");
				drawSVG2(0, 90, 20, 100, "<45", "70%");
				drawSVG3(0, 120, 20, 130, "<60", "80%");
				drawSVG4("Average CT = 40 mins");
			}	
		}

		if (![model['incident'], model["involved_veh"], model["responder"], model["center_choice"], model["pavement_condition"], model["hour_time"]].includes(null) && (model["location"] != null || model["exit"] != null)) {
			if (model['incident'] == 'Collision incident') {
				if (model['blockage']=='Travel lane blockage') {
					if (model['collision']=='Fatality') {
						if (road == 'us50' && hour == 'Night time') {CF_case2();}
						else if (road == 'us301' && num_responder > 5) {CF_case2();}
						else if (num_truck > 0 && shoulder_drop > 1) {CF_case2();}
						else if (num_total > 2 && num_medical > 1) {CF_case2();}
						else if (pavement == 'Chemical wet' && num_responder > 6) {CF_case2();}
						else {CF_case1();}
					}
					else if (model['collision']=='Personal Injury') {
						if (model['number_travel']=='1 Travel lane blocked') {
							checkresult = 'CPI1-0';
							if (checkresult == 'CPI1-0') {
								if (num_tow > 0) {checkresult = 'CPI1-2';}
								else if (car_hazards.includes('over ') && (model['weekend_time'] == 'Weekend' || num_tow > 0)) {checkresult = 'CPI1-2';}
								else if (num_chart > 2 && first_responder == "CHART") {checkresult = 'CPI1-2';}
								else if (num_responder > 3 && model['weekend_time'] == 'Weekend') {checkresult = 'CPI1-2';}
								else if (num_responder > 4 && shoulder_drop > 0) {checkresult = 'CPI1-2';}
								else if (num_total > 3 && first_responder == "POLICE") {checkresult = 'CPI1-2';}
								else if (aux_lane == true && num_suv > 0) {checkresult = 'CPI1-2';}
								else if (num_bus > 0 || truck_hazards.includes('lost ')) {checkresult = 'CPI1-2';}
								else if ((model['season_time'] == 'Winter' && num_van > 0) || num_police > 2) {checkresult = 'CPI1-2';}
								else {checkresult = 'CPI1-1';}
							}
							if (checkresult == 'CPI1-2') {
								if (num_truck > 0 && first_responder == "POLICE") {checkresult = 'CPI1-3';}
								else if (num_medical > 0 || truck_hazards.includes('lost ')) {checkresult = 'CPI1-3';}
								else if ((center == 'TOC3' && num_tow > 1) || (['PM-peak', 'Night time'].includes(hour) && car_hazards.includes('over '))) {checkresult = 'CPI1-3';}
								else if ((model['holiday_time'] == 'Holiday' && num_chart > 2) || (pavement == 'Wet' && num_total > 3)) {checkresult = 'CPI1-3';}
								else {checkresult = 'CPI1-2';}
							}
							if (checkresult == 'CPI1-3') {
								if (num_truck > 0 && num_responder > 5) {checkresult = 'CPI1-4';}
								else if (truck_hazards.includes('lost ') || truck_hazards.includes('over ')) {checkresult = 'CPI1-4';}
								else if (num_responder > 4 && num_truck > 0) {checkresult = 'CPI1-4';}
								else {checkresult = 'CPI1-3';}
							}

							if (checkresult == 'CPI1-1') {CPI1_case1();}
							else if (checkresult == 'CPI1-2') {CPI1_case2();}
							else if (checkresult == 'CPI1-3') {CPI1_case3();}
							else if (checkresult == 'CPI1-4') {CPI1_case4();}
						}
						else if (model['number_travel']=='2 Travel lanes blocked') {
							checkresult = 'CPI2-0';
							if (checkresult == 'CPI2-0') {
								if (num_tow > 0) {checkresult = 'CPI2-2';}
								else if (num_responder > 4) {checkresult = 'CPI2-2';}
								else if (shoulder_drop > 0 && first_responder == "POLICE") {checkresult = 'CPI2-2';}
								else if ((hour == 'Day time' || num_total > 2) && all_hazards.includes('over ')) {checkresult = 'CPI2-2';}
								else if (shoulder_drop > 1 && center == "SOC") {checkresult = 'CPI2-2';}
								else if (road == "us301" && !['AM-peak', 'PM-peak'].includes(hour)) {checkresult = 'CPI2-2';}
								else if ((num_chart > 1 && first_responder == "POLICE") || all_hazards.includes('over ')) {checkresult = 'CPI2-2';}
								else {checkresult = 'CPI2-1';}
							}
							if (checkresult == 'CPI2-2') {
								if (num_responder > 6) {checkresult = 'CPI2-3';}
								else if (num_truck > 0) {checkresult = 'CPI2-3';}
								else if ((center == "AOC" && num_pickup > 0) || aux_lane == true) {checkresult = 'CPI2-3';}
								else if (hour == 'Night time' && num_medical > 0) {checkresult = 'CPI2-3';}
								else if (num_responder > 5 && num_police > 1) {checkresult = 'CPI2-3';}
								else if (shoulder_drop > 1 && hour == 'Night time') {checkresult = 'CPI2-3';}
								else if (num_responder > 3 && all_hazards.includes('over ')) {checkresult = 'CPI2-3';}
								else if ((num_tow > 0 && center == "TOC3") || (shoulder_drop > 1 && num_total > 4)) {checkresult = 'CPI2-3';}
								else {checkresult = 'CPI2-2';}
							}
							if (checkresult == 'CPI2-3') {
								if (num_truck > 0 && num_responder > 5) {checkresult = 'CPI2-4';}
								else if ((num_chart > 2 && center == "SOC") || num_responder > 8) {checkresult = 'CPI2-4';}
								else if ((['AM-peak', 'Day time'].includes(hour) && shoulder_drop > 1) || (model['holiday_time'] == 'Holiday' && num_total > 1)) {checkresult = 'CPI2-4';}
								else if (road == 'us301' && num_truck > 1) {checkresult = 'CPI2-4';}
								else {checkresult = 'CPI2-3';}
							}

							if (checkresult == 'CPI2-1') {CPI2_case1();}
							else if (checkresult == 'CPI2-2') {CPI2_case2();}
							else if (checkresult == 'CPI2-3') {CPI2_case3();}
							else if (checkresult == 'CPI2-4') {CPI2_case4();}
						}
						else if (['3 Travel lanes blocked', '4 Travel lanes blocked', '5+ Travel lanes blocked'].includes(model['number_travel'])) {
							checkresult = 'CPI3-0';
							if (checkresult == 'CPI3-0') {
								if (num_responder > 4) {checkresult = 'CPI3-2';}
								else if ((['3 Travel lanes blocked'].includes(model['number_travel'] && (aux_lane || shoulder_drop > 0)) || ['4 Travel lanes blocked', '5+ Travel lanes blocked'].includes(model['number_travel']))) {checkresult = 'CPI3-2';}
								else if (num_responder > 3 || aux_lane == true) {checkresult = 'CPI3-2';}
								else if (num_tow > 0 || all_hazards.includes('jack ') || all_hazards.includes('over ') || all_hazards.includes('lost ')) {checkresult = 'CPI3-2';}
								else if (num_police > 1 || num_responder > 5) {checkresult = 'CPI3-2';}
								else if (road == 'us301' || num_total > 4) {checkresult = 'CPI3-2';}
								else {checkresult = 'CPI3-1';}
							}
							if (checkresult == 'CPI3-2') {
								if (num_responder > 8) {checkresult = 'CPI3-3';}
								else if (shoulder_drop > 0 && num_responder > 6) {checkresult = 'CPI3-3';}
								else if (num_medical > 0) {checkresult = 'CPI3-3';}
								else if (road == 'us301' && ((['3 Travel lanes blocked'].includes(model['number_travel'] && (aux_lane || shoulder_drop > 0)) || ['4 Travel lanes blocked', '5+ Travel lanes blocked'].includes(model['number_travel'])))) {checkresult = 'CPI3-3';}
								else if (num_chart > 0 && (all_hazards.includes('over ') || pavement == 'Wet')) {checkresult = 'CPI3-3';}
								else if ((aux_lane == true && num_pickup > 0) || num_total > 5) {checkresult = 'CPI3-3';}
								else {checkresult = 'CPI3-2';}
							}
							if (checkresult == 'CPI3-3') {
								if (num_responder > 9) {checkresult = 'CPI3-4';}
								else if (num_medical > 0 || tunnel_lane == true) {checkresult = 'CPI3-4';}
								else if (((['3 Travel lanes blocked'].includes(model['number_travel'] && (aux_lane || shoulder_drop > 0)) || ['4 Travel lanes blocked', '5+ Travel lanes blocked'].includes(model['number_travel']))) && aux_lane == true) {checkresult = 'CPI3-4';}
								else if (aux_lane == true && all_hazards.includes('over ')) {checkresult = 'CPI3-4';}
								else if ((((['3 Travel lanes blocked'].includes(model['number_travel'] && (aux_lane || shoulder_drop > 0)) || ['4 Travel lanes blocked', '5+ Travel lanes blocked'].includes(model['number_travel']))) && shoulder_drop > 2) || num_tow > 2) {checkresult = 'CPI3-4';}
								else {checkresult = 'CPI3-3';}
							}

							if (checkresult == 'CPI3-1') {CPI3_case1();}
							else if (checkresult == 'CPI3-2') {CPI3_case2();}
							else if (checkresult == 'CPI3-3') {CPI3_case3();}
							else if (checkresult == 'CPI3-4') {CPI3_case4();}
						}
					}
					else if (model['collision']=='Property Damage only') {
						if (model['number_travel']=='1 Travel lane blocked') {
							checkresult = 'CPD1-0';
							if (checkresult == 'CPD1-0') {
								if (num_responder > 2 && all_hazards.includes('over ')) {checkresult = 'CPD1-2';}
								else if (num_tow > 0 && num_police > 1) {checkresult = 'CPD1-2';}
								else if (num_truck > 0 && num_responder > 3) {checkresult = 'CPD1-2';}
								else if (pavement == 'Snow/Ice' && num_chart > 1) {checkresult = 'CPD1-2';}
								else if ((hour == 'Night time' && num_responder > 4) || all_hazards.includes('over ')) {checkresult = 'CPD1-2';}
								else if ((model['holiday_time'] == 'Holiday' && aux_lane == true) || shoulder_drop > 0 || all_hazards.includes('jack ')) {checkresult = 'CPD1-2';}
								else if (pavement == 'Chemical wet' || num_fireboard > 1) {checkresult = 'CPD1-2';}
								else if (pavement == 'Wet' && num_tow > 1) {checkresult = 'CPD1-2';}
								else if (road == "us301" && shoulder_drop > 0) {checkresult = 'CPD1-2';}
								else if (center == "SOC" && (num_total > 3 || num_truck > 0)) {checkresult = 'CPD1-2';}
								else if (num_truck > 1 || (num_van > 0 && pavement == 'Wet')) {checkresult = 'CPD1-2';}
								else {checkresult = 'CPD1-1';}
							}
							if (checkresult == 'CPD1-2') {
								if (num_responder > 7) {checkresult = 'CPD1-3';}
								else if (shoulder_drop > 0 & num_responder > 6) {checkresult = 'CPD1-3';}
								else if (aux_lane == true && num_tow > 1) {checkresult = 'CPD1-3';}
								else if (truck_hazards.includes('over ')) {checkresult = 'CPD1-3';}
								else if (num_truck > 0 && hour == 'Night time') {checkresult = 'CPD1-3';}
								else if (road == 'us301' && first_responder == "POLICE") {checkresult = 'CPD1-3';}
								else if ((aux_lane == true && num_responder > 5) || num_fireboard > 1 || num_tow > 1) {checkresult = 'CPD1-3';}
								else if ((pavement == 'Chemical wet' && num_tow > 0) || num_truck > 0 && toll_lane == true) {checkresult = 'CPD1-3';}
								else {checkresult = 'CPD1-2';}
							}
							if (checkresult == 'CPD1-3') {
								if (num_chart > 2 && truck_hazards.includes('over ')) {checkresult = 'CPD1-4';}
								else if (aux_lane == true && all_hazards.includes('over ')) {checkresult = 'CPD1-4';}
								else if (num_truck > 0 && (all_hazards.includes('over ') || pavement == 'Wet' || pavement == 'Snow/Ice' || shoulder_drop > 0)) {checkresult = 'CPD1-4';}
								else {checkresult = 'CPD1-3';}
							}

							if (checkresult == 'CPD1-1') {CPD1_case1();}
							else if (checkresult == 'CPD1-2') {CPD1_case2();}
							else if (checkresult == 'CPD1-3') {CPD1_case3();}
							else if (checkresult == 'CPD1-4') {CPD1_case4();}
						}
						else if (model['number_travel']=='2 Travel lanes blocked') {
							checkresult = 'CPD2-0';
							if (checkresult == 'CPD2-0') {
								if (num_tow > 0 && num_fireboard > 0) {checkresult = 'CPD2-2';}
								else if (shoulder_drop > 1 && num_fireboard > 0) {checkresult = 'CPD2-2';}
								else if (!['AM-peak', 'PM-peak'].includes(hour) && num_truck > 0) {checkresult = 'CPD2-2';}
								else if (all_hazards.includes('over ') || shoulder_drop > 1 || (num_truck > 0 && num_pickup > 0)) {checkresult = 'CPD2-2';}
								else if (num_tow > 1 || pavement == 'Chemical wet' || num_responder > 5) {checkresult = 'CPD2-2';}
								else if (road == 'us301' & num_police > 0) {checkresult = 'CPD2-2';}
								else {checkresult = 'CPD2-1';}
							}
							if (checkresult == 'CPD2-2') {
								if (num_truck > 1) {checkresult = 'CPD2-3';}
								else if (num_truck > 0 && num_responder > 5) {checkresult = 'CPD2-3';}
								else if (shoulder_drop > 0 && num_truck > 0) {checkresult = 'CPD2-3';}
								else if (num_total > 2 && first_responder == 'POLICE') {checkresult = 'CPD2-3';}
								else if ((num_truck > 0 || num_total > 2) && hour == 'Night time') {checkresult = 'CPD2-3';}
								else if (num_truck > 0 && num_responder > 2) {checkresult = 'CPD2-3';}
								else if (num_chart > 1 && aux_lane == true) {checkresult = 'CPD2-3';}
								else {checkresult = 'CPD2-2';}
							}
							if (checkresult == 'CPD2-3') {
								if (truck_hazards.includes('over ')) {checkresult = 'CPD2-4';}
								else if (num_responder > 3 && shoulder_drop > 1) {checkresult = 'CPD2-4';}
								else if (hazmat == true || truck_hazards.includes('lost ')) {checkresult = 'CPD2-4';}
								else {checkresult = 'CPD2-3';}
							}

							if (checkresult == 'CPD2-1') {CPD2_case1();}
							else if (checkresult == 'CPD2-2') {CPD2_case2();}
							else if (checkresult == 'CPD2-3') {CPD2_case3();}
							else if (checkresult == 'CPD2-4') {CPD2_case4();}
						}
						else if (['3 Travel lanes blocked', '4 Travel lanes blocked', '5+ Travel lanes blocked'].includes(model['number_travel'])) {
							checkresult = 'CPD3-0';
							if (checkresult == 'CPD3-0') {
								if (num_tow > 0) {checkresult = 'CPD3-2';}
								else if (all_hazards.includes('jack ')) {checkresult = 'CPD3-2';}
								else if (num_responder > 4 && (first_responder == 'FIREBOARD' || num_pickup > 0 || pavement == 'Wet')) {checkresult = 'CPD3-2';}
								else if (shoulder_drop > 1 & num_responder > 1) {checkresult = 'CPD3-2';}
								else if (num_truck > 0 || num_responder > 4) {checkresult = 'CPD3-2';}
								else {checkresult = 'CPD3-1';}
							}
							if (checkresult == 'CPD3-2') {
								if (num_total > 3 || num_truck > 0) {checkresult = 'CPD3-3';}
								else if (shoulder_drop > 1 && aux_lane == true) {checkresult = 'CPD3-3';}
								else if (['4 Travel lanes blocked', '5+ Travel lanes blocked'].includes(model['number_travel']) && shoulder_drop > 2) {checkresult = 'CPD3-3';}
								else {checkresult = 'CPD3-2';}
							}
							if (checkresult == 'CPD3-3') {
								if (num_responder > 6) {checkresult = 'CPD3-4';}
								else if ((hour == 'Night time' || num_responder > 4) && num_truck > 0) {checkresult = 'CPD3-4';}
								else if ((pavement == 'Snow/Ice' && ['5+ Travel lanes blocked'].includes(model['number_travel'])) || all_hazards.includes('jack ') || num_medical > 1) {checkresult = 'CPD3-4';}
								else {checkresult = 'CPD3-3';}
							}

							if (checkresult == 'CPD3-1') {CPD3_case1();}
							else if (checkresult == 'CPD3-2') {CPD3_case2();}
							else if (checkresult == 'CPD3-3') {CPD3_case3();}
							else if (checkresult == 'CPD3-4') {CPD3_case4();}
						}
					}
				}
				else if (model['blockage']=='Shoulder only blockage') {
					prob = 1/(1+Math.exp(-(-2.27-0.47*baltimoreCity+0.07*cecil-0.28*harford+0.41*dry+0.98*snow+0.33*unspecified+0.84*wet-0.38*week+0.3*nonholiday_sh
						-0.23*num_total+0.52*num_car+1.04*num_truck+0.26*num_responder+0.34*num_fireboard+0.43*num_medical-0.23*cpi
						+0.48*spring+0.37*summer+0.54*winter+0.08*daytime+0.23*nighttime)));
					console.log(prob);

					if (num_tow > 0) {shoulder_case2();}
					else if (center != 'AOC') {shoulder_case1();}
					else if (num_responder == 1 && pavement == 'Dry') {shoulder_case1();}
					else if (shoulder_drop == 2) {shoulder_case2();}
					else if ((model['collision'] == 'Personal Injury' && hour == 'AM-peak') || (model['collision'] == 'Personal Injury' && hour == 'Night time')) {shoulder_case2();}
					else if (hour == 'PM-peak') {shoulder_case1();}
					else if (prob <= 0.4 && num_truck == 0) {shoulder_case1();}
					else if (prob > 0.5 && num_fireboard > 0) {shoulder_case2();}
					else {shoulder_case3();}
				}
			}
			else if (model['incident'] == 'Non-Collision incident') {
				if (model['collision'] == 'Vehicles on Fire') {
					 drawSVG1(10, 90, 30, 100, "5~45", "60%");
					 drawSVG2(10, 120, 30, 130, "5~60", "70%");
					 drawSVG3(10, 180, 30, 190, "5~90", "80%");
					 drawSVG4("Average CT = 45 mins");
				}
				else if (model['collision'] == 'Emergency Roadwork') {
					$("#first_stop").text("100min");
					$("#second_stop").text("200min");
					$("#fourth_stop").text("400min");

					drawSVG1(10, 95, 40 , 105, "5~160", "60%");
					drawSVG2(10, 145, 60, 155, "5~240", "70%");
					drawSVG3(10, 195, 80, 205, "5~330", "80%");
					drawSVG4("Average CT = 170 mins");
				}
				else if (model['collision'] == 'Off-road Activity') {
					 drawSVG1(0, 60, 20, 70, "<30", "60%");
					 drawSVG2(0, 90, 20, 100, "<45", "70%");
					 drawSVG3(0, 120, 20, 130, "<60", "80%");
					 drawSVG4("Average CT = 40 mins");
				}
			}
		}
	}
	else if (cluster4.includes(road)) {
		if (model['incident']=='Collision incident') {
			drawSVG1(10, 100, 39, 110, "5~50", "60%");
			drawSVG2(10, 110, 43, 120, "5~55", "70%");
			drawSVG3(10, 140, 58, 150, "5~70", "80%");
			drawSVG4("Average CT = 32 mins");

			if (model['blockage']=='Travel lane blockage') {
				drawSVG1(20, 100, 38, 110, "10~50", "60%");
				drawSVG2(10, 110, 43, 120, "5~55", "70%");
				drawSVG3(10, 130, 53, 140, "5~65", "80%");
				drawSVG4("Average CT = 33 mins");

				if (model['collision']=='Fatality') {
					$("#first_stop").text("100min");
					$("#second_stop").text("200min");
					$("#fourth_stop").text("400min");

					drawSVG1(90, 144, 86, 154, "150~240", "60%");
					drawSVG2(90, 153, 91, 163, "150~255", "70%");
					drawSVG3(84, 159, 91, 169, "140~265", "80%");
					drawSVG4("Average CT = 190 mins");
				}

				else if (model['collision']=='Personal Injury') {
					drawSVG1(20, 110, 43, 120, "10~55", "60%");
					drawSVG2(30, 120, 53, 130, "15~60", "70%");
					drawSVG3(20, 140, 58, 150, "10~70", "80%");
					drawSVG4("Average CT = 38 mins");

					if (model['number_travel']=='1 Travel lane blocked') {
						drawSVG1(20, 90, 33, 100, "10~45", "60%");
						drawSVG2(20, 100, 40, 110, "10~50", "70%");
						drawSVG3(10, 110, 43, 120, "5~55", "80%");
						drawSVG4("Average CT = 31 mins");
					}
					else if (model['number_travel']=='2 Travel lanes blocked') {
						drawSVG1(30, 110, 49, 120, "15~55", "60%");
						drawSVG2(20, 120, 48, 130, "10~60", "70%");
						drawSVG3(20, 150, 68, 160, "10~75", "80%");
						drawSVG4("Average CT = 39 mins");
					}
					else if (['3 Travel lanes blocked', '4 Travel lanes blocked', '5+ Travel lanes blocked'].includes(model['number_travel'])) {
						drawSVG1(30, 150, 70, 160, "15~75", "60%");
						drawSVG2(30, 170, 78, 180, "15~85", "70%");
						drawSVG3(20, 250, 112, 260, "10~125", "80%");
						drawSVG4("Average CT = 61 mins");
					}
				}

				else if (model['collision']=='Property Damage only') {
					drawSVG1(10, 90, 33, 100, "5~45", "60%");
					drawSVG2(10, 100, 39, 110, "5~50", "70%");
					drawSVG3(10, 120, 47, 130, "5~60", "80%");
					drawSVG4("Average CT = 27 mins");

					if (model['number_travel']=='1 Travel lane blocked') {
						drawSVG1(10, 80, 28, 90, "5~40", "60%");
						drawSVG2(10, 100, 37, 110, "5~50", "70%");
						drawSVG3(10, 110, 42, 120, "5~55", "80%");
						drawSVG4("Average CT = 26 mins");
					}
					else if (model['number_travel']=='2 Travel lanes blocked') {
						drawSVG1(20, 100, 38, 110, "10~50", "60%");
						drawSVG2(10, 110, 42, 120, "5~55", "70%");
						drawSVG3(10, 120, 47, 130, "5~60", "80%");
						drawSVG4("Average CT = 29 mins");
					}
					else if (['3 Travel lanes blocked', '4 Travel lanes blocked', '5+ Travel lanes blocked'].includes(model['number_travel'])) {
						drawSVG1(10, 120, 47, 130, "5~60", "60%");
						drawSVG2(10, 140, 57, 150, "5~70", "70%");
						drawSVG3(10, 160, 67, 170, "5~80", "80%");
						drawSVG4("Average CT = 40 mins");
					}
				}
			}
			else if (model['blockage']=='Shoulder only blockage') {
				drawSVG1(10, 80, 27, 90, "5~40", "60%");
				drawSVG2(10, 90, 32, 100, "5~45", "70%");
				drawSVG3(10, 110, 43, 120, "5~55", "80%");
				drawSVG4("Average CT = 24 mins");
			}
		}
		else if (model['incident']=='Non-Collision incident') { // build awaiting instructions
			drawSVG1(10, 30, 40, 110, "5~15", "65%");
			drawSVG2(10, 40, 50, 120, "5~20", "75%");
			drawSVG3(10, 60, 70, 140, "5~30", "80%");
			drawSVG4("Average CT = 20 mins");

			if (model['collision'] == 'Debris in Roadway') {
				drawSVG1(0, 20, 0, 30, "<10", "85%");
				drawSVG2(0, 40, 10, 50, "<20", "90%");
				drawSVG3(0, 60, 20, 70, "<30", "95%");
				drawSVG4("Average CT = 5 mins");
			}
			else if (model['collision'] == 'Disabled Vehicle') {
				drawSVG1(0, 30, 5, 40, "<15", "65%");
				drawSVG2(0, 40, 10, 50, "<20", "75%");
				drawSVG3(0, 60, 15, 70, "<30", "85%");
				drawSVG4("Average CT = 20 mins");
			}
			else if (model['collision'] == 'Police Activity') {
				drawSVG1(0, 60, 20, 70, "<30", "65%");
				drawSVG2(0, 90, 30, 100, "<45", "80%");
				drawSVG3(0, 120, 40, 130, "<60", "90%");
				drawSVG4("Average CT = 30 mins");
			}
			else if (model['collision'] == 'Utility Problem') {
				drawSVG1(120, 300, 180, 310, "60~240", "100%");
				drawSVG2(0, 0, 0, 0, "", "");
				drawSVG3(0, 0, 0, 0, "", "");
				drawSVG4("Average CT = 160 mins");
			}
			else if (model['collision'] == 'Weather Closure') {
				drawSVG1(10, 140, 30, 150, "5~70", "60%");
				drawSVG2(10, 180, 30, 190, "5~90", "70%");
				drawSVG3(10, 240, 30, 250, "5~120", "80%");
				drawSVG4("Average CT = 190 mins");
			}
			else if (model['collision'] == 'Others') {
				drawSVG1(0, 40, 10, 50, "<20", "65%");
				drawSVG2(0, 60, 20, 70, "<30", "75%");
				drawSVG3(0, 120, 40, 130, "<60", "90%");
				drawSVG4("Average CT = 25 mins");
			}

			else if (model['collision'] == 'Vehicles on Fire') {
				drawSVG1(10, 90, 30, 100, "5~45", "60%");
				drawSVG2(10, 120, 30, 130, "5~60", "70%");
				drawSVG3(10, 180, 30, 190, "5~90", "80%");
				drawSVG4("Average CT = 45 mins");
			}
			else if (model['collision'] == 'Emergency Roadwork') {
				$("#first_stop").text("100min");
				$("#second_stop").text("200min");
				$("#fourth_stop").text("400min");

				drawSVG1(10, 95, 40 , 105, "5~160", "60%");
				drawSVG2(10, 145, 60, 155, "5~240", "70%");
				drawSVG3(10, 195, 80, 205, "5~330", "80%");
				drawSVG4("Average CT = 170 mins");
			}
			else if (model['collision'] == 'Off-road Activity') {
				drawSVG1(0, 60, 20, 70, "<30", "60%");
				drawSVG2(0, 90, 20, 100, "<45", "70%");
				drawSVG3(0, 120, 20, 130, "<60", "80%");
				drawSVG4("Average CT = 40 mins");
			}	
		}

		if (![model['incident'], model["involved_veh"], model["responder"], model["center_choice"], model["pavement_condition"], model["hour_time"]].includes(null) && (model["location"] != null || model["exit"] != null)) {
			if (model['incident'] == 'Collision incident') {
				if (model['blockage']=='Travel lane blockage') {
					if (model['collision']=='Fatality') {
						if (num_chart > 1 && hour == 'Night time') {CF_case2();}
						else {CF_case1();}
					}
					else if (model['collision']=='Personal Injury') {
						if (model['number_travel']=='1 Travel lane blocked') {
							checkresult = 'CPI1-0';
							if (checkresult == 'CPI1-0') {
								if (num_tow > 0 && num_responder > 4) {checkresult = 'CPI1-2';}
								else if (num_tow > 0 && (['AM-peak', 'PM-peak'].includes(hour) || model['weekend_time'] == 'Weekend' || aux_lane == true)) {checkresult = 'CPI1-2';}
								else if (num_total > 2 && num_van > 0) {checkresult = 'CPI1-2';}
								else if ((num_responder > 3 && center == 'TOC7') || num_chart > 2) {checkresult = 'CPI1-2';}
								else if ((num_chart > 1 && first_responder == "FIREBOARD") || (aux_lane == true && model['holiday_time'] == 'Holiday')) {checkresult = 'CPI1-2';}
								else {checkresult = 'CPI1-1';}
							}
							if (checkresult == 'CPI1-2') {
								if (num_medical > 0 || truck_hazards.includes('lost ')) {checkresult = 'CPI1-3';}
								else if ((hour == 'Night time' && num_responder > 6) || num_total > 4) {checkresult = 'CPI1-3';}
								else if (num_chart > 2 && ['PM-peak', 'Night time'].includes(hour)) {checkresult = 'CPI1-3';}
								else if ((shoulder_drop > 1 && pavement == 'Wet') || (num_truck > 0 && first_responder == "FIREBOARD")) {checkresult = 'CPI1-3';}
								else if ((num_responder > 5 && num_motorcycle > 0) || (num_tow > 1 && center == "TOC4")) {checkresult = 'CPI1-3';}
								else {checkresult = 'CPI1-2';}
							}
							if (checkresult == 'CPI1-3') {
								if (truck_hazards.includes('lost ') || truck_hazards.includes('over ')) {checkresult = 'CPI1-4';}
								else if (num_responder > 5 && center == 'TOC4') {checkresult = 'CPI1-4';}
								else {checkresult = 'CPI1-3';}
							}

							if (checkresult == 'CPI1-1') {CPI1_case1();}
							else if (checkresult == 'CPI1-2') {CPI1_case2();}
							else if (checkresult == 'CPI1-3') {CPI1_case3();}
							else if (checkresult == 'CPI1-4') {CPI1_case4();}
						}
						else if (model['number_travel']=='2 Travel lanes blocked') {
							checkresult = 'CPI2-0';
							if (checkresult == 'CPI2-0') {
								if (num_tow > 0) {checkresult = 'CPI2-2';}
								else if ((aux_lane == true && num_pickup > 0) || num_responder > 6) {checkresult = 'CPI2-2';}
								else if (num_chart > 1 && hour == 'Night time') {checkresult = 'CPI2-2';}
								else if ((shoulder_drop > 1 && hour == 'Night time') || (num_total > 2 && num_van > 0)) {checkresult = 'CPI2-2';}
								else {checkresult = 'CPI2-1';}
							}
							if (checkresult == 'CPI2-2') {
								if (num_tow > 1 && model['weekend_time'] == 'Weekend') {checkresult = 'CPI2-3';}
								else if (num_responder > 6 && shoulder_drop > 1) {checkresult = 'CPI2-3';}
								else if (num_truck > 0 && ['PM-peak', 'Night time'].includes(hour)) {checkresult = 'CPI2-3';}
								else if (num_tow > 1 && aux_lane == true) {checkresult = 'CPI2-3';}
								else {checkresult = 'CPI2-2';}
							}
							if (checkresult == 'CPI2-3') {
								if (num_responder > 7) {checkresult = 'CPI2-4';}
								else {checkresult = 'CPI2-3';}
							}

							if (checkresult == 'CPI2-1') {CPI2_case1();}
							else if (checkresult == 'CPI2-2') {CPI2_case2();}
							else if (checkresult == 'CPI2-3') {CPI2_case3();}
							else if (checkresult == 'CPI2-4') {CPI2_case4();}
						}
						else if (['3 Travel lanes blocked', '4 Travel lanes blocked', '5+ Travel lanes blocked'].includes(model['number_travel'])) {
							checkresult = 'CPI3-0';
							if (checkresult == 'CPI3-0') {
								if (num_responder > 4) {checkresult = 'CPI3-2';}
								else if ((num_tow > 0 && center == 'SOC') || all_hazards.includes('over ')) {checkresult = 'CPI3-2';}
								else {checkresult = 'CPI3-1';}
							}
							if (checkresult == 'CPI3-2') {
								if (num_responder > 8) {checkresult = 'CPI3-3';}
								else if (shoulder_drop > 0 && num_responder > 6) {checkresult = 'CPI3-3';}
								else if (model['weekend_time'] == 'Weekend' && first_responder == "FIREBOARD") {checkresult = 'CPI3-3';}
								else if (num_total > 2 && num_suv > 0) {checkresult = 'CPI3-3';}
								else if (aux_lane == true && all_hazards.includes('over ')) {checkresult = 'CPI3-3';}
								else {checkresult = 'CPI3-2';}
							}
							if (checkresult == 'CPI3-3') {
								if (['5+ Travel lanes blocked'].includes(model['number_travel']) && num_truck > 0) {checkresult = 'CPI3-4';}
								else if (num_pedestrian > 0 || shoulder_drop > 2) {checkresult = 'CPI3-4';}
								else if (num_truck > 1) {checkresult = 'CPI3-4';}
								else {checkresult = 'CPI3-3';}
							}

							if (checkresult == 'CPI3-1') {CPI3_case1();}
							else if (checkresult == 'CPI3-2') {CPI3_case2();}
							else if (checkresult == 'CPI3-3') {CPI3_case3();}
							else if (checkresult == 'CPI3-4') {CPI3_case4();}
						}
					}
					else if (model['collision']=='Property Damage only') {
						if (model['number_travel']=='1 Travel lane blocked') {
							checkresult = 'CPD1-0';
							if (checkresult == 'CPD1-0') {
								if ((model['weekend_time'] == 'Weekend' || ['AM-peak', 'PM-peak'].includes(hour) || num_police > 2 || num_truck > 0 || num_pickup > 0) && num_responder > 4) {checkresult = 'CPD1-2';}
								else if (num_tow > 0 && num_responder > 4) {checkresult = 'CPD1-2';}
								else if (num_tow > 1 && num_responder > 3) {checkresult = 'CPD1-2';}
								else if (num_tow > 0 && num_total > 3) {checkresult = 'CPD1-2';}
								else if (num_tow > 0 && model['season_time'] == 'Fall') {checkresult = 'CPD1-2';}
								else if ((num_fireboard > 0 && all_hazards.includes('over ')) || hazmat == true) {checkresult = 'CPD1-2';}
								else {checkresult = 'CPD1-1';}
							}
							if (checkresult == 'CPD1-2') {
								if (num_responder > 7) {checkresult = 'CPD1-3';}
								else if (shoulder_drop > 0 && num_responder > 6) {checkresult = 'CPD1-3';}
								else if ((pavement == 'Snow/Ice' && model['weekend_time'] == 'Weekend') || num_truck > 1) {checkresult = 'CPD1-3';}
								else if (num_tow > 1 && center == 'SOC') {checkresult = 'CPD1-3';}
								else {checkresult = 'CPD1-2';}
							}
							if (checkresult == 'CPD1-3') {
								if (num_total > 5 || pavement == 'Snow/Ice' || num_tow > 2) {checkresult = 'CPD1-4';}
								else {checkresult = 'CPD1-3';}
							}

							if (checkresult == 'CPD1-1') {CPD1_case1();}
							else if (checkresult == 'CPD1-2') {CPD1_case2();}
							else if (checkresult == 'CPD1-3') {CPD1_case3();}
							else if (checkresult == 'CPD1-4') {CPD1_case4();}
						}
						else if (model['number_travel']=='2 Travel lanes blocked') {
							checkresult = 'CPD2-0';
							if (checkresult == 'CPD2-0') {
								if (num_tow > 0 && num_fireboard > 0) {checkresult = 'CPD2-2';}
								else if ((num_tow > 0 && first_responder == "POLICE") || (pavement == 'Snow/Ice' && all_hazards.includes('over '))) {checkresult = 'CPD2-2';}
								else if (num_tow > 0 && num_chart > 0) {checkresult = 'CPD2-2';}
								else if (num_truck > 0 && hour == 'Night time') {checkresult = 'CPD2-2';}
								else if ((model['season_time'] == 'Winter' && num_responder > 4) || model['holiday_time'] == 'Holiday' || num_responder > 6) {checkresult = 'CPD2-2';}
								else {checkresult = 'CPD2-1';}
							}
							if (checkresult == 'CPD2-2') {
								if (num_truck > 0 && num_responder > 5) {checkresult = 'CPD2-3';}
								else if (pavement == 'Snow/Ice' || pavement == 'Chemical wet') {checkresult = 'CPD2-3';}
								else if (num_bus > 0 || hazmat == true || (num_responder > 4 && model['weekend_time'] == 'Weekend')) {checkresult = 'CPD2-3';}
								else {checkresult = 'CPD2-2';}
							}
							if (checkresult == 'CPD2-3') {
								if (num_responder > 6) {checkresult = 'CPD2-4';}
								else {checkresult = 'CPD2-3';}
							}

							if (checkresult == 'CPD2-1') {CPD2_case1();}
							else if (checkresult == 'CPD2-2') {CPD2_case2();}
							else if (checkresult == 'CPD2-3') {CPD2_case3();}
							else if (checkresult == 'CPD2-4') {CPD2_case4();}
						}
						else if (['3 Travel lanes blocked', '4 Travel lanes blocked', '5+ Travel lanes blocked'].includes(model['number_travel'])) {
							checkresult = 'CPD3-0';
							if (checkresult == 'CPD3-0') {
								if (num_tow > 0) {checkresult = 'CPD3-2';}
								else if (num_chart > 1 && num_fireboard > 0) {checkresult = 'CPD3-2';}
								else {checkresult = 'CPD3-1';}
							}
							if (checkresult == 'CPD3-2') {
								if (shoulder_drop > 1 && aux_lane == true) {checkresult = 'CPD3-3';}
								else if (['4 Travel lanes blocked', '5+ Travel lanes blocked'].includes(model['number_travel']) && shoulder_drop > 2) {checkresult = 'CPD3-3';}
								else if (num_truck > 0 || num_responder > 5) {checkresult = 'CPD3-3';}
								else if (num_total > 2 && num_responder > 4) {checkresult = 'CPD3-3';}
								else {checkresult = 'CPD3-2';}
							}
							if (checkresult == 'CPD3-3') {
								if (num_responder > 6) {checkresult = 'CPD3-4';}
								else {checkresult = 'CPD3-3';}
							}

							if (checkresult == 'CPD3-1') {CPD3_case1();}
							else if (checkresult == 'CPD3-2') {CPD3_case2();}
							else if (checkresult == 'CPD3-3') {CPD3_case3();}
							else if (checkresult == 'CPD3-4') {CPD3_case4();}
						}
					}
				}
				else if (model['blockage']=='Shoulder only blockage') {
					prob = 1/(1+Math.exp(-(-2.27-0.47*baltimoreCity+0.07*cecil-0.28*harford+0.41*dry+0.98*snow+0.33*unspecified+0.84*wet-0.38*week+0.3*nonholiday_sh
						-0.23*num_total+0.52*num_car+1.04*num_truck+0.26*num_responder+0.34*num_fireboard+0.43*num_medical-0.23*cpi
						+0.48*spring+0.37*summer+0.54*winter+0.08*daytime+0.23*nighttime)));
					console.log(prob);

					if (num_tow > 0) {shoulder_case2();}
					else if (center != 'AOC') {shoulder_case1();}
					else if (num_responder == 1 && pavement == 'Dry') {shoulder_case1();}
					else if (shoulder_drop == 2) {shoulder_case2();}
					else if ((model['collision'] == 'Personal Injury' && hour == 'AM-peak') || (model['collision'] == 'Personal Injury' && hour == 'Night time')) {shoulder_case2();}
					else if (hour == 'PM-peak') {shoulder_case1();}
					else if (prob <= 0.4 && num_truck == 0) {shoulder_case1();}
					else if (prob > 0.5 && num_fireboard > 0) {shoulder_case2();}
					else {shoulder_case3();}
				}
			}
			else if (model['incident'] == 'Non-Collision incident') {
				if (model['collision'] == 'Vehicles on Fire') {
					 drawSVG1(10, 90, 30, 100, "5~45", "60%");
					 drawSVG2(10, 120, 30, 130, "5~60", "70%");
					 drawSVG3(10, 180, 30, 190, "5~90", "80%");
					 drawSVG4("Average CT = 45 mins");
				}
				else if (model['collision'] == 'Emergency Roadwork') {
					$("#first_stop").text("100min");
					$("#second_stop").text("200min");
					$("#fourth_stop").text("400min");

					drawSVG1(10, 95, 40 , 105, "5~160", "60%");
					drawSVG2(10, 145, 60, 155, "5~240", "70%");
					drawSVG3(10, 195, 80, 205, "5~330", "80%");
					drawSVG4("Average CT = 170 mins");
				}
				else if (model['collision'] == 'Off-road Activity') {
					 drawSVG1(0, 60, 20, 70, "<30", "60%");
					 drawSVG2(0, 90, 20, 100, "<45", "70%");
					 drawSVG3(0, 120, 20, 130, "<60", "80%");
					 drawSVG4("Average CT = 40 mins");
				}
			}
		}
	}
	else if (cluster5.includes(road)) {
		if (model['incident']=='Collision incident') {
			drawSVG1(20, 140, 58, 150, "10~70", "60%");
			drawSVG2(10, 190, 84, 200, "5~95", "70%");
			drawSVG3(10, 230, 102, 240, "5~115", "80%");
			drawSVG4("Average CT = 52 mins");

			if (model['blockage']=='Travel lane blockage') {
				drawSVG1(30, 210, 96, 220, "15~105", "60%");
				drawSVG2(20, 260, 116, 270, "10~130", "70%");
				drawSVG3(10, 300, 133, 310, "5~160", "80%");
				drawSVG4("Average CT = 69 mins");

				if (model['collision']=='Fatality') {
					$("#first_stop").text("100min");
					$("#second_stop").text("200min");
					$("#fourth_stop").text("400min");

					drawSVG1(69, 144, 77, 154, "115~240", "60%");
					drawSVG2(63, 180, 92, 190, "105~300", "70%");
					drawSVG3(63, 219, 111, 229, "105~365", "80%");
					drawSVG4("Average CT = 203 mins");
				}

				else if (model['collision']=='Personal Injury') {
					drawSVG1(30, 180, 83, 190, "15~90", "60%");
					drawSVG2(30, 210, 95, 220, "15~105", "70%");
					drawSVG3(20, 230, 100, 240, "10~115", "80%");
					drawSVG4("Average CT = 61 mins");

					if (model['number_travel']=='1 Travel lane blocked') {
						drawSVG1(30, 140, 63, 150, "15~70", "60%");
						drawSVG2(20, 150, 68, 160, "10~75", "70%");
						drawSVG3(20, 220, 97, 230, "10~110", "80%");
						drawSVG4("Average CT = 51 mins");

					}
					else if (['2 Travel lanes blocked', '3 Travel lanes blocked', '4 Travel lanes blocked', '5+ Travel lanes blocked'].includes(model['number_travel'])) {
						drawSVG1(50, 200, 100, 210, "25~100", "60%");
						drawSVG2(40, 220, 105, 230, "20~110", "70%");
						drawSVG3(30, 240, 110, 250, "15~120", "80%");
						drawSVG4("Average CT = 68 mins");
					}
				}

				else if (model['collision']=='Property Damage only') {
					drawSVG1(20, 130, 53, 140, "10~65", "60%");
					drawSVG2(10, 180, 77, 190, "5~90", "70%");
					drawSVG3(10, 230, 102, 240, "5~115", "80%");
					drawSVG4("Average CT = 53 mins");

					if (model['number_travel']=='1 Travel lane blocked') {
						drawSVG1(20, 90, 33, 100, "10~45", "60%");
						drawSVG2(10, 130, 52, 140, "5~65", "70%");
						drawSVG3(10, 180, 77, 190, "5~90", "80%");
						drawSVG4("Average CT = 42 mins");
					}
					else if (['2 Travel lanes blocked', '3 Travel lanes blocked', '4 Travel lanes blocked', '5+ Travel lanes blocked'].includes(model['number_travel'])) {
						drawSVG1(20, 260, 115, 270, "10~130", "60%");
						drawSVG2(20, 290, 130, 300, "10~145", "70%");
						drawSVG3(10, 300, 130, 310, "5~155", "80%");
						drawSVG4("Average CT = 78 mins");
					}
				}
			}
			else if (model['blockage']=='Shoulder only blockage') {
				drawSVG1(10, 70, 23, 80, "5~35", "60%");
				drawSVG2(10, 80, 28, 90, "5~40", "70%");
				drawSVG3(0, 0, 0, 0, "", "");
				drawSVG4("Average CT = 22 mins");
			}
		}
		else if (model['incident']=='Non-Collision incident') { // build awaiting instructions
			drawSVG1(10, 30, 40, 110, "5~15", "65%");
			drawSVG2(10, 40, 50, 120, "5~20", "75%");
			drawSVG3(10, 60, 70, 140, "5~30", "80%");
			drawSVG4("Average CT = 20 mins");

			if (model['collision'] == 'Debris in Roadway') {
				drawSVG1(0, 20, 0, 30, "<10", "85%");
				drawSVG2(0, 40, 10, 50, "<20", "90%");
				drawSVG3(0, 60, 20, 70, "<30", "95%");
				drawSVG4("Average CT = 5 mins");
			}
			else if (model['collision'] == 'Disabled Vehicle') {
				drawSVG1(0, 30, 5, 40, "<15", "65%");
				drawSVG2(0, 40, 10, 50, "<20", "75%");
				drawSVG3(0, 60, 15, 70, "<30", "85%");
				drawSVG4("Average CT = 20 mins");
			}
			else if (model['collision'] == 'Police Activity') {
				drawSVG1(0, 60, 20, 70, "<30", "65%");
				drawSVG2(0, 90, 30, 100, "<45", "80%");
				drawSVG3(0, 120, 40, 130, "<60", "90%");
				drawSVG4("Average CT = 30 mins");
			}
			else if (model['collision'] == 'Utility Problem') {
				drawSVG1(120, 300, 180, 310, "60~240", "100%");
				drawSVG2(0, 0, 0, 0, "", "");
				drawSVG3(0, 0, 0, 0, "", "");
				drawSVG4("Average CT = 160 mins");
			}
			else if (model['collision'] == 'Weather Closure') {
				drawSVG1(10, 140, 30, 150, "5~70", "60%");
				drawSVG2(10, 180, 30, 190, "5~90", "70%");
				drawSVG3(10, 240, 30, 250, "5~120", "80%");
				drawSVG4("Average CT = 190 mins");
			}
			else if (model['collision'] == 'Others') {
				drawSVG1(0, 40, 10, 50, "<20", "65%");
				drawSVG2(0, 60, 20, 70, "<30", "75%");
				drawSVG3(0, 120, 40, 130, "<60", "90%");
				drawSVG4("Average CT = 25 mins");
			}

			else if (model['collision'] == 'Vehicles on Fire') {
				drawSVG1(10, 90, 30, 100, "5~45", "60%");
				drawSVG2(10, 120, 30, 130, "5~60", "70%");
				drawSVG3(10, 180, 30, 190, "5~90", "80%");
				drawSVG4("Average CT = 45 mins");
			}
			else if (model['collision'] == 'Emergency Roadwork') {
				$("#first_stop").text("100min");
				$("#second_stop").text("200min");
				$("#fourth_stop").text("400min");

				drawSVG1(10, 95, 40 , 105, "5~160", "60%");
				drawSVG2(10, 145, 60, 155, "5~240", "70%");
				drawSVG3(10, 195, 80, 205, "5~330", "80%");
				drawSVG4("Average CT = 170 mins");
			}
			else if (model['collision'] == 'Off-road Activity') {
				drawSVG1(0, 60, 20, 70, "<30", "60%");
				drawSVG2(0, 90, 20, 100, "<45", "70%");
				drawSVG3(0, 120, 20, 130, "<60", "80%");
				drawSVG4("Average CT = 40 mins");
			}	
		}

		if (![model['incident'], model["involved_veh"], model["responder"], model["center_choice"], model["pavement_condition"], model["hour_time"]].includes(null) && (model["location"] != null || model["exit"] != null)) {
			if (model['incident'] == 'Collision incident') {
				if (model['blockage']=='Travel lane blockage') {
					if (model['collision']=='Fatality') {
						if (total_lane > 4 || aux_lane == true || num_responder > 8) {CF_case2();}
						else {CF_case1();}
					}
					else if (model['collision']=='Personal Injury') {
						if (model['number_travel']=='1 Travel lane blocked') {
							checkresult = 'CPI1-0';
							if (checkresult == 'CPI1-0') {
								if (num_tow > 0) {checkresult = 'CPI1-2';}
								else if (num_chart > 1 && first_responder == "POLICE") {checkresult = 'CPI1-2';}
								else if (aux_lane == true && num_suv > 0) {checkresult = 'CPI1-2';}
								else if (num_responder > 3) {checkresult = 'CPI1-2';}
								else {checkresult = 'CPI1-1';}
							}
							if (checkresult == 'CPI1-2') {
								if (num_tow > 0 && num_truck > 0) {checkresult = 'CPI1-3';}
								else if (first_responder == "POLICE") {checkresult = 'CPI1-3';}
								else if (model['weekend_time'] == 'Weekend' && car_hazards.includes('over ')) {checkresult = 'CPI1-3';}
								else if (num_responder > 4 && num_police > 1) {checkresult = 'CPI1-3';}
								else {checkresult = 'CPI1-2';}
							}
							if (checkresult == 'CPI1-3') {
								if (num_truck > 0) {checkresult = 'CPI1-4';}
								else if (num_responder > 6 && center == 'SOC') {checkresult = 'CPI1-4';}
								else {checkresult = 'CPI1-3';}
							}

							if (checkresult == 'CPI1-1') {CPI1_case1();}
							else if (checkresult == 'CPI1-2') {CPI1_case2();}
							else if (checkresult == 'CPI1-3') {CPI1_case3();}
							else if (checkresult == 'CPI1-4') {CPI1_case4();}
						}
						else if (['2 Travel lanes blocked', '3 Travel lanes blocked', '4 Travel lanes blocked', '5+ Travel lanes blocked'].includes(model['number_travel'])) {
							checkresult = 'CPI2-0';
							if (checkresult == 'CPI2-0') {
								if (num_tow > 0) {checkresult = 'CPI2-2';}
								else if (num_responder > 4) {checkresult = 'CPI2-2';}
								else if (num_responder > 2 && first_responder == 'FIREBOARD') {checkresult = 'CPI2-2';}
								else if (shoulder_drop > 0 && first_responder == "POLICE") {checkresult = 'CPI2-2';}
								else if (shoulder_drop > 1 && center == 'SOC') {checkresult = 'CPI2-2';}
								else {checkresult = 'CPI2-1';}
							}
							if (checkresult == 'CPI2-2') {
								if (num_responder > 6) {checkresult = 'CPI2-3';}
								else if (shoulder_drop > 2 && num_responder > 4) {checkresult = 'CPI2-3';}
								else if (shoulder_drop > 1 && hour == 'Night time') {checkresult = 'CPI2-3';}
								else if ((num_truck > 0 && first_responder == 'POLICE') || num_medical > 0 || num_bus > 0) {checkresult = 'CPI2-3';}
								else if (num_motorcycle > 0 && num_responder > 3) {checkresult = 'CPI2-3';}
								else {checkresult = 'CPI2-2';}
							}
							if (checkresult == 'CPI2-3') {
								if ((hour == 'Day time' && shoulder_drop > 1) || (model['holiday_time'] == 'Holiday' && num_total>1)) {checkresult = 'CPI2-4';}
								else if (num_truck > 1 || aux_lane == true || hazmat == true) {checkresult = 'CPI2-4';}
								else {checkresult = 'CPI2-3';}
							}

							if (checkresult == 'CPI2-1') {CPI2_case1();}
							else if (checkresult == 'CPI2-2') {CPI2_case2();}
							else if (checkresult == 'CPI2-3') {CPI2_case3();}
							else if (checkresult == 'CPI2-4') {CPI2_case4();}
						}
					}
					else if (model['collision']=='Property Damage only') {
						if (model['number_travel']=='1 Travel lane blocked') {
							checkresult = 'CPD1-0';
							if (checkresult == 'CPD1-0') {
								if (num_tow > 0 && num_fireboard > 0) {checkresult = 'CPD1-2';}
								else if (num_responder > 3 && num_tow > 0) {checkresult = 'CPD1-2';}
								else if (aux_lane == true && num_total > 1) {checkresult = 'CPD1-2';}
								else if (num_police > 0 && first_responder == 'FIREBOARD') {checkresult = 'CPD1-2';}
								else {checkresult = 'CPD1-1';}
							}
							if (checkresult == 'CPD1-2') {
								if (truck_hazards.includes('over ')) {checkresult = 'CPD1-3';}
								else if (aux_lane == true && num_tow > 1) {checkresult = 'CPD1-3';}
								else if ((pavement == 'Snow/Ice' && model['weekend_time'] == 'Weekend') || num_truck > 1) {checkresult = 'CPD1-3';}
								else if (num_chart > 1 && num_pickup > 0) {checkresult = 'CPD1-3';}
								else {checkresult = 'CPD1-2';}
							}
							if (checkresult == 'CPD1-3') {
								if (truck_hazards.includes('over ') && num_responder > 4) {checkresult = 'CPD1-4';}
								else {checkresult = 'CPD1-3';}
							}
							if (checkresult == 'CPD1-1') {CPD1_case1();}
							else if (checkresult == 'CPD1-2') {CPD1_case2();}
							else if (checkresult == 'CPD1-3') {CPD1_case3();}
							else if (checkresult == 'CPD1-4') {CPD1_case4();}
						}
						else if (['2 Travel lanes blocked', '3 Travel lanes blocked', '4 Travel lanes blocked', '5+ Travel lanes blocked'].includes(model['number_travel'])) {
							checkresult = 'CPD2-0';
							if (checkresult == 'CPD2-0') {
								if (num_tow > 0 && num_fireboard > 0) {checkresult = 'CPD2-2';}
								else if (num_truck > 0 && num_responder > 4) {checkresult = 'CPD2-2';}
								else if (shoulder_drop > 1 && num_fireboard > 0) {checkresult = 'CPD2-2';}
								else if ((!['AM-peak', 'PM-peak'].includes(hour) && num_truck > 0 ) || pavement == 'Snow/Ice') {checkresult = 'CPD2-2';}
								else {checkresult = 'CPD2-1';}
							}
							if (checkresult == 'CPD2-2') {
								if (num_truck > 1) {checkresult = 'CPD2-3';}
								else if (num_truck > 0 && num_responder > 5) {checkresult = 'CPD2-3';}
								else if (num_total > 2 && first_responder == "POLICE") {checkresult = 'CPD2-3';}
								else if (pavement == 'Snow/Ice' || pavement == 'Chemical wet') {checkresult = 'CPD2-3';}
								else if ((num_truck > 0 || num_total > 2) && hour == 'Night time') {checkresult = 'CPD2-3';}
								else if (total_lane > 4 && shoulder_drop > 1) {checkresult = 'CPD2-3';}
							}
							if (checkresult == 'CPD2-3') {
								if (num_tow > 1) {checkresult = 'CPD2-4';}
								else if (num_truck > 0) {checkresult = 'CPD2-4';}
								else if ((shoulder_drop > 1 && model['weekend_time'] == 'Weekend') || pavement == 'Snow/Ice') {checkresult = 'CPD2-4';}
								else if (total_lane > 5 && pavement == 'Wet') {checkresult = 'CPD2-4';}
								else {checkresult = 'CPD2-3';}
							}

							if (checkresult == 'CPD2-1') {CPD2_case1();}
							else if (checkresult == 'CPD2-2') {CPD2_case2();}
							else if (checkresult == 'CPD2-3') {CPD2_case3();}
							else if (checkresult == 'CPD2-4') {CPD2_case4();}
						}
					}
				}
				else if (model['blockage']=='Shoulder only blockage') {
					prob = 1/(1+Math.exp(-(-2.27-0.47*baltimoreCity+0.07*cecil-0.28*harford+0.41*dry+0.98*snow+0.33*unspecified+0.84*wet-0.38*week+0.3*nonholiday_sh
						-0.23*num_total+0.52*num_car+1.04*num_truck+0.26*num_responder+0.34*num_fireboard+0.43*num_medical-0.23*cpi
						+0.48*spring+0.37*summer+0.54*winter+0.08*daytime+0.23*nighttime)));
					console.log(prob);

					if (num_tow > 0) {shoulder_case2();}
					else if (center != 'AOC') {shoulder_case1();}
					else if (num_responder == 1 && pavement == 'Dry') {shoulder_case1();}
					else if (shoulder_drop == 2) {shoulder_case2();}
					else if ((model['collision'] == 'Personal Injury' && hour == 'AM-peak') || (model['collision'] == 'Personal Injury' && hour == 'Night time')) {shoulder_case2();}
					else if (hour == 'PM-peak') {shoulder_case1();}
					else if (prob <= 0.4 && num_truck == 0) {shoulder_case1();}
					else if (prob > 0.5 && num_fireboard > 0) {shoulder_case2();}
					else {shoulder_case3();}
				}
			}
			else if (model['incident'] == 'Non-Collision incident') {
				if (model['collision'] == 'Vehicles on Fire') {
					 drawSVG1(10, 90, 30, 100, "5~45", "60%");
					 drawSVG2(10, 120, 30, 130, "5~60", "70%");
					 drawSVG3(10, 180, 30, 190, "5~90", "80%");
					 drawSVG4("Average CT = 45 mins");
				}
				else if (model['collision'] == 'Emergency Roadwork') {
					$("#first_stop").text("100min");
					$("#second_stop").text("200min");
					$("#fourth_stop").text("400min");

					drawSVG1(10, 95, 40 , 105, "5~160", "60%");
					drawSVG2(10, 145, 60, 155, "5~240", "70%");
					drawSVG3(10, 195, 80, 205, "5~330", "80%");
					drawSVG4("Average CT = 170 mins");
				}
				else if (model['collision'] == 'Off-road Activity') {
					 drawSVG1(0, 60, 20, 70, "<30", "60%");
					 drawSVG2(0, 90, 20, 100, "<45", "70%");
					 drawSVG3(0, 120, 20, 130, "<60", "80%");
					 drawSVG4("Average CT = 40 mins");
				}
			}
		}
	}
	else if (cluster6.includes(road)) {
		if (model['incident']=='Collision incident') {
			drawSVG1(30, 270, 124, 280, "15~135", "60%");
			drawSVG2(20, 300, 134, 310, "10~170", "70%");
			drawSVG3(10, 300, 129, 310, "5~170", "80%");
			drawSVG4("Average CT = 88 mins");

			if (model['blockage']=='Travel lane blockage') {
				$("#first_stop").text("100min");
				$("#second_stop").text("200min");
				$("#fourth_stop").text("400min");

				drawSVG1(15, 111, 37, 121, "25~185", "60%");
				drawSVG2(9, 132, 45, 142, "15~220", "70%");
				drawSVG3(9, 168, 63, 178, "15~280", "80%");
				drawSVG4("Average CT = 115 mins");

				if (model['collision']=='Fatality') {
					$("#first_stop").text("100min");
					$("#second_stop").text("200min");
					$("#fourth_stop").text("400min");
	
					drawSVG1(78, 177, 98, 187, "130~295", "60%");
					drawSVG2(72, 186, 99, 196, "120~310", "70%");
					drawSVG3(63, 201, 102, 221, "105~335", "80%");
					drawSVG4("Average CT = 211 mins");
				}

				else if (model['collision']=='Personal Injury') {
					$("#first_stop").text("100min");
					$("#second_stop").text("200min");
					$("#fourth_stop").text("400min");
	
					drawSVG1(15, 90, 27, 100, "25~150", "60%");
					drawSVG2(12, 114, 37, 124, "20~190", "70%");
					drawSVG3(9, 141, 49, 151, "15~235", "80%");
					drawSVG4("Average CT = 105 mins");

					if (model['number_travel']=='1 Travel lane blocked') {
						$("#first_stop").text("30min");
						$("#second_stop").text("60min");
						$("#fourth_stop").text("120min");
						
						drawSVG1(30, 160, 73, 170, "15~80", "60%");
						drawSVG2(30, 200, 93, 210, "15~100", "70%");
						drawSVG3(20, 270, 123, 280, "10~135", "80%");
						drawSVG4("Average CT = 67 mins");
					}
					else if (model['number_travel']=='2 Travel lanes blocked') {
						drawSVG1(18, 105, 36, 115, "30~175", "60%");
						drawSVG2(15, 126, 42, 136, "25~210", "70%");
						drawSVG3(12, 162, 61, 172, "20~270", "80%");
						drawSVG4("Average CT = 120 mins");
					}
					else if (['3 Travel lanes blocked', '4 Travel lanes blocked', '5+ Travel lanes blocked'].includes(model['number_travel'])) {
						drawSVG1(21, 90, 30, 100, "35~150", "60%");
						drawSVG2(18, 111, 39, 121, "30~185", "70%");
						drawSVG3(12, 138, 49, 148, "20~230", "80%");
						drawSVG4("Average CT = 110 mins");
					}
				}

				else if (model['collision']=='Property Damage only') {
					$("#first_stop").text("100min");
					$("#second_stop").text("200min");
					$("#fourth_stop").text("400min");
	
					drawSVG1(9, 87, 22, 97, "15~145", "60%");
					drawSVG2(9, 120, 39, 130, "15~200", "70%");
					drawSVG3(6, 165, 60, 175, "10~275", "80%");
					drawSVG4("Average CT = 101 mins");

					if (model['number_travel']=='1 Travel lane blocked') {
						$("#first_stop").text("30min");
						$("#second_stop").text("60min");
						$("#fourth_stop").text("120min");

						drawSVG1(20, 170, 73, 180, "10~85", "60%");
						drawSVG2(20, 250, 109, 260, "10~125", "70%");
						drawSVG3(10, 300, 133, 310, "5~150", "80%");
						drawSVG4("Average CT = 65 mins");
					}
					else if (model['number_travel']=='2 Travel lanes blocked') {
						drawSVG1(15, 135, 49, 145, "25~225", "60%");
						drawSVG2(12, 174, 67, 184, "20~290", "70%");
						drawSVG3(9, 207, 82, 217, "15~345", "80%");
						drawSVG4("Average CT = 139 mins");
					}
					else if (['3 Travel lanes blocked', '4 Travel lanes blocked', '5+ Travel lanes blocked'].includes(model['number_travel'])) {
						drawSVG1(15, 120, 42, 130, "25~200", "60%");
						drawSVG2(9, 135, 46, 145, "15~225", "70%");
						drawSVG3(9, 171, 64, 181, "15~285", "80%");
						drawSVG4("Average CT = 115 mins");
					}
				}
			}
			else if (model['blockage']=='Shoulder only blockage') {
				drawSVG1(10, 120, 47, 130, "5~60", "60%");
				drawSVG2(10, 150, 62, 160, "5~75", "70%");
				drawSVG3(10, 200, 83, 210, "5~100", "80%");
				drawSVG4("Average CT = 41 mins");
			}
		}
		else if (model['incident']=='Non-Collision incident') { // build awaiting instructions
			drawSVG1(10, 30, 40, 110, "5~15", "65%");
			drawSVG2(10, 40, 50, 120, "5~20", "75%");
			drawSVG3(10, 60, 70, 140, "5~30", "80%");
			drawSVG4("Average CT = 20 mins");

			if (model['collision'] == 'Debris in Roadway') {
				drawSVG1(0, 20, 0, 30, "<10", "85%");
				drawSVG2(0, 40, 10, 50, "<20", "90%");
				drawSVG3(0, 60, 20, 70, "<30", "95%");
				drawSVG4("Average CT = 5 mins");
			}
			else if (model['collision'] == 'Disabled Vehicle') {
				drawSVG1(0, 30, 5, 40, "<15", "65%");
				drawSVG2(0, 40, 10, 50, "<20", "75%");
				drawSVG3(0, 60, 15, 70, "<30", "85%");
				drawSVG4("Average CT = 20 mins");
			}
			else if (model['collision'] == 'Police Activity') {
				drawSVG1(0, 60, 20, 70, "<30", "65%");
				drawSVG2(0, 90, 30, 100, "<45", "80%");
				drawSVG3(0, 120, 40, 130, "<60", "90%");
				drawSVG4("Average CT = 30 mins");
			}
			else if (model['collision'] == 'Utility Problem') {
				drawSVG1(120, 300, 180, 310, "60~240", "100%");
				drawSVG2(0, 0, 0, 0, "", "");
				drawSVG3(0, 0, 0, 0, "", "");
				drawSVG4("Average CT = 160 mins");
			}
			else if (model['collision'] == 'Weather Closure') {
				drawSVG1(10, 140, 30, 150, "5~70", "60%");
				drawSVG2(10, 180, 30, 190, "5~90", "70%");
				drawSVG3(10, 240, 30, 250, "5~120", "80%");
				drawSVG4("Average CT = 190 mins");
			}
			else if (model['collision'] == 'Others') {
				drawSVG1(0, 40, 10, 50, "<20", "65%");
				drawSVG2(0, 60, 20, 70, "<30", "75%");
				drawSVG3(0, 120, 40, 130, "<60", "90%");
				drawSVG4("Average CT = 25 mins");
			}

			else if (model['collision'] == 'Vehicles on Fire') {
				drawSVG1(10, 90, 30, 100, "5~45", "60%");
				drawSVG2(10, 120, 30, 130, "5~60", "70%");
				drawSVG3(10, 180, 30, 190, "5~90", "80%");
				drawSVG4("Average CT = 45 mins");
			}
			else if (model['collision'] == 'Emergency Roadwork') {
				$("#first_stop").text("100min");
				$("#second_stop").text("200min");
				$("#fourth_stop").text("400min");

				drawSVG1(10, 95, 40 , 105, "5~160", "60%");
				drawSVG2(10, 145, 60, 155, "5~240", "70%");
				drawSVG3(10, 195, 80, 205, "5~330", "80%");
				drawSVG4("Average CT = 170 mins");
			}
			else if (model['collision'] == 'Off-road Activity') {
				drawSVG1(0, 60, 20, 70, "<30", "60%");
				drawSVG2(0, 90, 20, 100, "<45", "70%");
				drawSVG3(0, 120, 20, 130, "<60", "80%");
				drawSVG4("Average CT = 40 mins");
			}	
		}

		if (![model['incident'], model["involved_veh"], model["responder"], model["center_choice"], model["pavement_condition"], model["hour_time"]].includes(null) && (model["location"] != null || model["exit"] != null)) {
			if (model['incident'] == 'Collision incident') {
				if (model['blockage']=='Travel lane blockage') {
					if (model['collision']=='Fatality') {
						if (num_tow > 0 && shoulder_drop > 0) {CF_case2();}
						else if (total_lane > 5 && hour == 'Night time') {CF_case2();}
						else if (num_suv > 0 && num_responder > 3) {CF_case2();}
						else if (model['number_travel']=='5+ Travel lanes blocked' && num_responder > 5) {CF_case2();}
						else if ((num_responder > 4 && all_hazards.includes('over ')) || hazmat == true) {CF_case2();}
						else {CF_case1();}
					}
					else if (model['collision']=='Personal Injury') {
						if (model['number_travel']=='1 Travel lane blocked') {
							checkresult = 'CPI1-0';
							if (checkresult == 'CPI1-0') {
								if (num_tow > 0) {checkresult = 'CPI1-2';}
								else if (num_total > 3) {checkresult = 'CPI1-2';}
								else if (shoulder_drop > 0 && num_responder > 4) {checkresult = 'CPI1-2';}
								else if (num_total > 1 && num_responder > 4) {checkresult = 'CPI1-2';}
								else if (!['AM-peak', 'PM-peak'].includes(hour) && first_responder == "POLICE") {checkresult = 'CPI1-2';}
								else if ((['AM-peak','Day time'].includes(hour) || first_responder == "FIREBOARD") && num_police > 1) {checkresult = 'CPI1-2';}
								else if (center == 'SOC' && ['AM-peak', 'PM-peak'].includes(hour)) {checkresult = 'CPI1-2';}
								else if (hour == 'Night time' && first_responder == 'FIREBOARD') {checkresult = 'CPI1-2';}
								else if (aux_lane == true && pavement == 'Wet') {checkresult = 'CPI1-2';}
								else {checkresult = 'CPI1-1';}
							}
							if (checkresult == 'CPI1-2') {
								if (num_truck > 0 && first_responder == 'POLICE') {checkresult = 'CPI1-3';}
								else if (num_medical > 0 || truck_hazards.includes('lost ')) {checkresult = 'CPI1-3';}
								else if (num_responder > 6 || truck_hazards.includes('lost ')) {checkresult = 'CPI1-3';}
								else if ((num_pickup > 0 || num_motorcycle > 0) && center == 'SOC') {checkresult = 'CPI1-3';}
								else {checkresult = 'CPI1-2';}
							}
							if (checkresult == 'CPI1-3') {
								if (num_truck > 0) {checkresult = 'CPI1-4';}
								else if (!['AM-peak', 'PM-peak'].includes(hour) && num_chart == 0) {checkresult = 'CPI1-4';}
								else {checkresult = 'CPI1-3';}
							}

							if (checkresult == 'CPI1-1') {CPI1_case1();}
							else if (checkresult == 'CPI1-2') {CPI1_case2();}
							else if (checkresult == 'CPI1-3') {CPI1_case3();}
							else if (checkresult == 'CPI1-4') {CPI1_case4();}
						}
						else if (model['number_travel']=='2 Travel lanes blocked') {
							checkresult = 'CPI2-0';
							if (checkresult == 'CPI2-0') {
								if (num_tow > 0) {checkresult = 'CPI2-2';}
								else if (num_responder > 4) {checkresult = 'CPI2-2';}
								else if (num_responder > 2 && first_responder == 'POLICE') {checkresult = 'CPI2-2';}
								else if (shoulder_drop > 0 && first_responder == "POLICE") {checkresult = 'CPI2-2';}
								else if (shoulder_drop > 1 && center == 'SOC') {checkresult = 'CPI2-2';}
								else if ((num_chart > 1 && first_responder == 'POLICE') || all_hazards.includes('over ')) {checkresult = 'CPI2-2';}
								else if ((num_responder > 3 || first_responder == 'POLICE' || num_truck > 0) && num_total > 3) {checkresult = 'CPI2-2';}
								else if (num_fireboard > 0 && ['PM-peak', 'Night time'].includes(hour)) {checkresult = 'CPI2-2';}
								else if (num_responder > 3 && !['AM-peak', 'PM-peak'].includes(hour)) {checkresult = 'CPI2-2';}
								else {checkresult = 'CPI2-1';}
							}
							if (checkresult == 'CPI2-2') {
								if (num_responder > 6) {checkresult = 'CPI2-3';}
								else if (num_truck > 0) {checkresult = 'CPI2-3';}
								else if (hour == 'Night time' && num_medical > 0) {checkresult = 'CPI2-3';}
								else if (center == 'SOC' && num_responder > 5) {checkresult = 'CPI2-3';}
								else if (num_fireboard > 1 || pavement == 'Snow/Ice') {checkresult = 'CPI2-3';}
								else if (num_responder > 2 && hour == 'Night time') {checkresult = 'CPI2-3';}
								else if (num_pickup > 0 && first_responder == 'POLICE') {checkresult = 'CPI2-3';}
								else if (num_responder > 3 && num_medical > 0) {checkresult = 'CPI2-3';}
								else if (center == 'SOC' && first_responder == 'POLICE') {checkresult = 'CPI2-3';}
								else if (shoulder_drop > 2 || (model['holiday_time'] == 'Holiday' && num_responder > 2)) {checkresult = 'CPI2-3';}
								else {checkresult = 'CPI2-2';}
							}
							if (checkresult == 'CPI2-3') {
								if (num_responder > 7) {checkresult = 'CPI2-4';}
								else if (num_total > 5) {checkresult = 'CPI2-4';}
								else if (num_responder > 4 && first_responder == 'POLICE') {checkresult = 'CPI2-4';}
								else if (num_responder > 6 || (num_truck > 0 && hazmat == true)) {checkresult = 'CPI2-4';}
								else if ((num_police > 1 && first_responder == 'POLICE') || (num_medical > 0 && model['holiday_time'] == 'Holiday')) {checkresult = 'CPI2-4';}
								else if (hour == 'Night time' && pavement == 'Wet') {checkresult = 'CPI2-4';}
								else if (shoulder_drop > 2 && num_responder > 3) {checkresult = 'CPI2-4';}
								else {checkresult = 'CPI2-3';}
							}

							if (checkresult == 'CPI2-1') {CPI2_case1();}
							else if (checkresult == 'CPI2-2') {CPI2_case2();}
							else if (checkresult == 'CPI2-3') {CPI2_case3();}
							else if (checkresult == 'CPI2-4') {CPI2_case4();}
						}
						else if (['3 Travel lanes blocked', '4 Travel lanes blocked', '5+ Travel lanes blocked'].includes(model['number_travel'])) {
							checkresult = 'CPI3-0';
							if (checkresult == 'CPI3-0') {
								if (num_responder > 4) {checkresult = 'CPI3-2';}
								else if (['4 Travel lanes blocked', '5+ Travel lanes blocked'].includes(model['number_travel'])) {checkresult = 'CPI3-2';}
								else if (num_responder > 3 && aux_lane == true) {checkresult = 'CPI3-2';}
								else if (first_responder == 'FIREBOARD') {checkresult = 'CPI3-2';}
								else if (center == 'SOC' || num_truck > 0 || num_total > 2) {checkresult = 'CPI3-2';}
								else if (hour == 'Night time' && first_responder == 'POLICE') {checkresult = 'CPI3-2';}
								else if (num_responder > 3) {checkresult = 'CPI3-2';}
								else {checkresult = 'CPI3-1';}
							}
							if (checkresult == 'CPI3-2') {
								if (num_responder > 8) {checkresult = 'CPI3-3';}
								else if (num_medical > 0) {checkresult = 'CPI3-3';}
								else if (shoulder_drop > 0 && num_responder > 6) {checkresult = 'CPI3-3';}
								else if (model['weekend_time'] == 'Weekend' && num_responder > 4) {checkresult = 'CPI3-3';}
								else if (num_responder > 2 && first_responder == 'POLICE') {checkresult = 'CPI3-3';}
								else if (num_truck > 0 || (['5+ Travel lanes blocked'].includes(model['number_travel']) && num_chart == 0)) {checkresult = 'CPI3-3';}
								else if (pavement == 'Snow/Ice' || (shoulder_drop > 2 && aux_lane == true)) {checkresult = 'CPI3-3';}
								else if ((num_responder > 3 && num_pedestrian > 0) || (pavement == 'Wet' && first_responder == 'FIREBOARD')) {checkresult = 'CPI3-3';}
								else {checkresult = 'CPI3-2';}
							}
							if (checkresult == 'CPI3-3') {
								if (num_responder > 9) {checkresult = 'CPI3-4';}
								else if (num_truck > 1) {checkresult = 'CPI3-4';}
								else if (num_chart > 1 && model['weekend_time'] == 'Weekend') {checkresult = 'CPI3-4';}
								else if (center == 'SOC' && pavement == 'Wet') {checkresult = 'CPI3-4';}
								else if (shoulder_drop > 2 && hour == 'Night time') {checkresult = 'CPI3-4';}
								else if (num_responder > 5 && center == 'SOC') {checkresult = 'CPI3-4';}
								else {checkresult = 'CPI3-3';}
							}

							if (checkresult == 'CPI3-1') {CPI3_case1();}
							else if (checkresult == 'CPI3-2') {CPI3_case2();}
							else if (checkresult == 'CPI3-3') {CPI3_case3();}
							else if (checkresult == 'CPI3-4') {CPI3_case4();}
						}
					}
					else if (model['collision']=='Property Damage only') {
						if (model['number_travel']=='1 Travel lane blocked') {
							checkresult = 'CPD1-0';
							if (checkresult == 'CPD1-0') {
								if (num_tow > 0 && num_fireboard > 0) {checkresult = 'CPD1-2';}
								else if (num_responder > 3 && num_tow > 0) {checkresult = 'CPD1-2';}
								else if (num_truck > 0 && num_responder > 3) {checkresult = 'CPD1-2';}
								else if (num_responder > 2 && all_hazards.includes('over ')) {checkresult = 'CPD1-2';}
								else if ((model['holiday_time'] == 'Holiday' && aux_lane == true) || shoulder_drop > 1 || all_hazards.includes('jack ')) {checkresult = 'CPD1-2';}
								else if ((hour == 'Night time' && num_responder > 4) || all_hazards.includes('over ')) {checkresult = 'CPD1-2';}
								else if (num_truck > 1 || (num_van > 0 && pavement == 'Wet')) {checkresult = 'CPD1-2';}
								else if (center == 'SOC' && (num_total > 3 || num_truck > 0)) {checkresult = 'CPD1-2';}
								else if (center == 'SOC' && num_chart == 0) {checkresult = 'CPD1-2';}
								else if ((num_chart > 1 && model['weekend_time'] == 'Weekday') || num_bus > 0) {checkresult = 'CPD1-2';}
								else if (num_truck > 0 && num_responder > 2) {checkresult = 'CPD1-2';}
								else {checkresult = 'CPD1-1';}
							}
							if (checkresult == 'CPD1-2') {
								if (num_responder > 7) {checkresult = 'CPD1-3';}
								else if (truck_hazards.includes('over ')) {checkresult = 'CPD1-3';}
								else if (num_chart > 1 && truck_hazards.includes('lost ')) {checkresult = 'CPD1-3';}
								else if (num_truck > 0 && first_responder == 'POLICE') {checkresult = 'CPD1-3';}
								else if ((hour == 'Night time' && first_responder == 'FIREBOARD') || (shoulder_drop > 0 && pavement == 'Snow/Ice')) {checkresult = 'CPD1-3';}
								else {checkresult = 'CPD1-2';}
							}
							if (checkresult == 'CPD1-3') {
								if (num_chart > 2 && truck_hazards.includes('over ')) {checkresult = 'CPD1-4';}
								else if (aux_lane == true && all_hazards.includes('over ')) {checkresult = 'CPD1-4';}
								else if (num_tow > 1 || pavement == 'Chemical wet') {checkresult = 'CPD1-4';}
								else if (num_truck > 0 && (all_hazards.includes('over ') || pavement == 'Wet' || pavement == 'Snow/Ice')) {checkresult = 'CPD1-4';}
								else if (shoulder_drop > 0 && num_responder > 4) {checkresult = 'CPD1-4';}
								else {checkresult = 'CPD1-3';}
							}

							if (checkresult == 'CPD1-1') {CPD1_case1();}
							else if (checkresult == 'CPD1-2') {CPD1_case2();}
							else if (checkresult == 'CPD1-3') {CPD1_case3();}
							else if (checkresult == 'CPD1-4') {CPD1_case4();}
						}
						else if (model['number_travel']=='2 Travel lanes blocked') {
							checkresult = 'CPD2-0';
							if (checkresult == 'CPD2-0') {
								if (num_tow > 0 && num_fireboard > 0) {checkresult = 'CPD2-2';}
								else if (shoulder_drop > 1 && num_fireboard > 0) {checkresult = 'CPD2-2';}
								else if (num_truck > 0 && num_responder > 4) {checkresult = 'CPD2-2';}
								else if (pavement == 'Snow/Ice' || pavement == 'Chemical wet' || truck_hazards.includes('jack ') || num_responder > 6) {checkresult = 'CPD2-2';}
								else if ((hour == 'Night time' || num_responder > 4) && num_police > 1) {checkresult = 'CPD2-2';}
								else if (num_truck > 0 || (pavement == 'Wet' && num_suv > 0)) {checkresult = 'CPD2-2';}
								else if ((num_total > 2 || aux_lane == true) && num_tow > 0) {checkresult = 'CPD2-2';}
								else if ((num_tow > 0 && first_responder == 'POLICE') || (pavement == 'Snow/Ice' && all_hazards.includes('over '))) {checkresult = 'CPD2-2';}
								else if (num_chart == 0) {checkresult = 'CPD2-2';}
								else if ((aux_lane == true || shoulder_drop > 1) && num_responder > 2) {checkresult = 'CPD2-2';}
								else if (center == 'SOC' && num_responder > 3) {checkresult = 'CPD2-2';}
								else {checkresult = 'CPD2-1';}
							}
							if (checkresult == 'CPD2-2') {
								if (num_tow > 1) {checkresult = 'CPD2-3';}
								else if (num_truck > 0 && num_responder > 5) {checkresult = 'CPD2-3';}
								else if (num_truck > 0 && num_responder > 2) {checkresult = 'CPD2-3';}
								else if (shoulder_drop > 1 && num_responder > 3) {checkresult = 'CPD2-3';}
								else if (num_truck > 0 || all_hazards.includes('over ')) {checkresult = 'CPD2-3';}
								else if ((shoulder_drop > 1 || pavement == 'Wet') && hour == 'Night time') {checkresult = 'CPD2-3';}
								else if (pavement == 'Snow/Ice' || (model['season_time'] == 'Winter' && num_total > 2)) {checkresult = 'CPD2-3';}
								else {checkresult = 'CPD2-2';}
							}
							if (checkresult == 'CPD2-3') {
								if (num_responder > 7) {checkresult = 'CPD2-4';}
								else if (truck_hazards.includes('over ')) {checkresult = 'CPD2-4';}
								else if (num_responder > 3 && hour == 'Night time') {checkresult = 'CPD2-4';}
								else if (num_responder > 4 && num_truck > 0) {checkresult = 'CPD2-4';}
								else if (num_responder > 2 && hour == 'Night time') {checkresult = 'CPD2-4';}
								else {checkresult = 'CPD2-3';}
							}

							if (checkresult == 'CPD2-1') {CPD2_case1();}
							else if (checkresult == 'CPD2-2') {CPD2_case2();}
							else if (checkresult == 'CPD2-3') {CPD2_case3();}
							else if (checkresult == 'CPD2-4') {CPD2_case4();}
						}
						else if (['3 Travel lanes blocked', '4 Travel lanes blocked', '5+ Travel lanes blocked'].includes(model['number_travel'])) {
							checkresult = 'CPD3-0';
							if (checkresult == 'CPD3-0') {
								if (shoulder_drop > 1 && num_fireboard > 0) {checkresult = 'CPD3-2';}
								else if (shoulder_drop > 1 && num_responder > 1) {checkresult = 'CPD3-2';}
								else if (num_truck > 0 || num_responder > 4) {checkresult = 'CPD3-2';}
								else if (!['AM-peak', 'PM-peak'].includes(hour) && first_responder == 'POLICE') {checkresult = 'CPD3-2';}
								else if (['AM-peak', 'PM-peak'].includes(hour) && aux_lane == true) {checkresult = 'CPD3-2';}
								else if ((num_fireboard > 0 && model['weekend_time'] == 'Weekend') || num_total > 5 || all_hazards.includes('jack ')) {checkresult = 'CPD3-2';}
								else {checkresult = 'CPD3-1';}
							}
							if (checkresult == 'CPD3-2') {
								if (shoulder_drop > 1 && num_responder > 3) {checkresult = 'CPD3-3';}
								else if (total_lane > 4 && model['weekend_time'] == 'Weekend') {checkresult = 'CPD3-3';}
								else if ((num_responder > 3 && !['AM-peak', 'PM-peak'].includes(hour)) || num_responder > 4) {checkresult = 'CPD3-3';}
								else {checkresult = 'CPD3-2';}
							}
							if (checkresult == 'CPD3-3') {
								if (hour == 'Night time' && num_truck > 0) {checkresult = 'CPD3-4';}
								else if ((pavement == 'Snow/Ice' && total_lane > 4) || all_hazards.includes('jack ') || num_medical > 0) {checkresult = 'CPD3-4';}
								else if (num_responder > 2 && first_responder == 'POLICE') {checkresult = 'CPD3-4';}
								else if (num_truck > 0) {checkresult = 'CPD3-4';}
								else {checkresult = 'CPD3-3';}
							}

							if (checkresult == 'CPD3-1') {CPD3_case1();}
							else if (checkresult == 'CPD3-2') {CPD3_case2();}
							else if (checkresult == 'CPD3-3') {CPD3_case3();}
							else if (checkresult == 'CPD3-4') {CPD3_case4();}
						}
					}
				}
				else if (model['blockage']=='Shoulder only blockage') {
					prob = 1/(1+Math.exp(-(-2.27-0.47*baltimoreCity+0.07*cecil-0.28*harford+0.41*dry+0.98*snow+0.33*unspecified+0.84*wet-0.38*week+0.3*nonholiday_sh
						-0.23*num_total+0.52*num_car+1.04*num_truck+0.26*num_responder+0.34*num_fireboard+0.43*num_medical-0.23*cpi
						+0.48*spring+0.37*summer+0.54*winter+0.08*daytime+0.23*nighttime)));
					console.log(prob);

					if (num_tow > 0) {shoulder_case2();}
					else if (center != 'AOC') {shoulder_case1();}
					else if (num_responder == 1 && pavement == 'Dry') {shoulder_case1();}
					else if (shoulder_drop == 2) {shoulder_case2();}
					else if ((model['collision'] == 'Personal Injury' && hour == 'AM-peak') || (model['collision'] == 'Personal Injury' && hour == 'Night time')) {shoulder_case2();}
					else if (hour == 'PM-peak') {shoulder_case1();}
					else if (prob <= 0.4 && num_truck == 0) {shoulder_case1();}
					else if (prob > 0.5 && num_fireboard > 0) {shoulder_case2();}
					else {shoulder_case3();}
				}
			}
			else if (model['incident'] == 'Non-Collision incident') {
				if (model['collision'] == 'Vehicles on Fire') {
					 drawSVG1(10, 90, 30, 100, "5~45", "60%");
					 drawSVG2(10, 120, 30, 130, "5~60", "70%");
					 drawSVG3(10, 180, 30, 190, "5~90", "80%");
					 drawSVG4("Average CT = 45 mins");
				}
				else if (model['collision'] == 'Emergency Roadwork') {
					$("#first_stop").text("100min");
					$("#second_stop").text("200min");
					$("#fourth_stop").text("400min");

					drawSVG1(10, 95, 40 , 105, "5~160", "60%");
					drawSVG2(10, 145, 60, 155, "5~240", "70%");
					drawSVG3(10, 195, 80, 205, "5~330", "80%");
					drawSVG4("Average CT = 170 mins");
				}
				else if (model['collision'] == 'Off-road Activity') {
					 drawSVG1(0, 60, 20, 70, "<30", "60%");
					 drawSVG2(0, 90, 20, 100, "<45", "70%");
					 drawSVG3(0, 120, 20, 130, "<60", "80%");
					 drawSVG4("Average CT = 40 mins");
				}
			}
		}
	}
	else {
		if (model['incident']=='Collision incident') {
			drawSVG1(20, 90, 35, 100, "10~45", "60%");
			drawSVG2(20, 110, 45, 120, "10~55", "70%");
			drawSVG3(20, 180, 82, 190, "10~90", "80%");
			drawSVG4("Average CT = 40 mins");

			if (model['blockage']=='Travel lane blockage') {
				drawSVG1(20, 100, 43, 110, "10~50", "60%");
				drawSVG2(20, 120, 48, 130, "10~60", "70%");
				drawSVG3(20, 170, 67, 180, "10~85", "80%");
				drawSVG4("Average CT = 45 mins");
				if (model['collision']=='Fatality') {
					drawSVG1(290, 300, 220, 310, "150~270", "60%");
					drawSVG2(240, 300, 170, 310, "120~300", "70%");
					drawSVG3(120, 300, 130, 310, "60~360", "80%");
					drawSVG4("Average CT = 235 mins");
				}
				else if (model['collision']=='Personal Injury') {
					drawSVG1(30, 120, 57, 130, "15~60", "60%");
					drawSVG2(30, 140, 67, 150, "15~70", "70%");
					drawSVG3(30, 190, 92, 200, "15~95", "80%");
					drawSVG4("Average CT = 50 mins");
									
					if (model['number_travel']=='1 Travel lane blocked') {
						drawSVG1(30, 110, 52, 120, "15~55", "60%");
						drawSVG2(30, 130, 62, 140, "15~65", "70%");
						drawSVG3(20, 140, 62, 150, "10~70", "80%");
						drawSVG4("Average CT = 45 mins");
					}
					else if (model['number_travel']=='2 Travel lanes blocked') {
						drawSVG1(40, 140, 72, 150, "20~70", "60%");
						drawSVG2(40, 170, 87, 180, "20~85", "70%");
						drawSVG3(30, 180, 87, 190, "15~90", "80%");
						drawSVG4("Average CT = 55 mins");
					}
					else if (['3 Travel lanes blocked', '4 Travel lanes blocked', '5+ Travel lanes blocked'].includes(model['number_travel'])) {
						drawSVG1(60, 220, 80, 230, "30~110", "60%");
						drawSVG2(60, 300, 80, 310, "30~155", "70%");
						drawSVG3(50, 300, 70, 310, "25~210", "80%");
						drawSVG4("Average CT = 80 mins");	
					}
				}
				else if (model['collision']=='Property Damage only') {
					drawSVG1(20, 90, 40, 100, "10~45", "60%");
					drawSVG2(20, 110, 40, 120, "10~55", "70%");
					drawSVG3(20, 190, 40, 200, "10~85", "80%");
					drawSVG4("Average CT = 35 mins");	
					if (model['number_travel']=='1 Travel lane blocked') {
						drawSVG1(20, 80, 28, 90, "10~40", "60%");
						drawSVG2(20, 100, 42, 110, "10~50", "70%");
						drawSVG3(20, 160, 72, 170, "10~80", "80%");
						drawSVG4("Average CT = 35 mins");
					}
					else if (model['number_travel']=='2 Travel lanes blocked') {
						drawSVG1(30, 140, 67, 150, "15~70", "60%");
						drawSVG2(30, 200, 94, 210, "15~100", "70%");
						drawSVG3(20, 220, 99, 230, "10~110", "80%");
						drawSVG4("Average CT = 45 mins");
					}
					else if (['3 Travel lanes blocked', '4 Travel lanes blocked', '5+ Travel lanes blocked'].includes(model['number_travel'])) {
						drawSVG1(40, 180, 60, 190, "20~90", "60%");
						drawSVG2(40, 280, 60, 290, "20~140", "70%");
						drawSVG3(30, 280, 50, 290, "15~140", "80%");
						drawSVG4("Average CT = 60 mins");
					}
				}
			}
			else if (model['blockage']=='Shoulder only blockage') {
				drawSVG1(10, 80, 20, 90, "5~40", "60%");
				drawSVG2(10, 90, 20, 100, "5~45", "70%");
				drawSVG3(10, 120, 20, 130, "5~60", "80%");
				drawSVG4("Average CT = 35 mins");
			}
		}
		else if (model['incident']=='Non-Collision incident') {
			drawSVG1(10, 30, 40, 110, "5~15", "65%");
			drawSVG2(10, 40, 50, 120, "5~20", "75%");
			drawSVG3(10, 60, 70, 140, "5~30", "80%");
			drawSVG4("Average CT = 20 mins");

			if (model['collision'] == 'Debris in Roadway') {
				drawSVG1(0, 20, 0, 30, "<10", "85%");
				drawSVG2(0, 40, 10, 50, "<20", "90%");
				drawSVG3(0, 60, 20, 70, "<30", "95%");
				drawSVG4("Average CT = 5 mins");
			}
			else if (model['collision'] == 'Disabled Vehicle') {
				drawSVG1(0, 30, 5, 40, "<15", "65%");
				drawSVG2(0, 40, 10, 50, "<20", "75%");
				drawSVG3(0, 60, 15, 70, "<30", "85%");
				drawSVG4("Average CT = 20 mins");
			}
			else if (model['collision'] == 'Police Activity') {
				drawSVG1(0, 60, 20, 70, "<30", "65%");
				drawSVG2(0, 90, 30, 100, "<45", "80%");
				drawSVG3(0, 120, 40, 130, "<60", "90%");
				drawSVG4("Average CT = 30 mins");
			}
			else if (model['collision'] == 'Utility Problem') {
				drawSVG1(120, 300, 180, 310, "60~240", "100%");
				drawSVG2(0, 0, 0, 0, "", "");
				drawSVG3(0, 0, 0, 0, "", "");
				drawSVG4("Average CT = 160 mins");
			}
			else if (model['collision'] == 'Weather Closure') {
				drawSVG1(10, 140, 30, 150, "5~70", "60%");
				drawSVG2(10, 180, 30, 190, "5~90", "70%");
				drawSVG3(10, 240, 30, 250, "5~120", "80%");
				drawSVG4("Average CT = 190 mins");
			}
			else if (model['collision'] == 'Others') {
				drawSVG1(0, 40, 10, 50, "<20", "65%");
				drawSVG2(0, 60, 20, 70, "<30", "75%");
				drawSVG3(0, 120, 40, 130, "<60", "90%");
				drawSVG4("Average CT = 25 mins");
			}

			else if (model['collision'] == 'Vehicles on Fire') {
				drawSVG1(10, 90, 30, 100, "5~45", "60%");
				drawSVG2(10, 120, 30, 130, "5~60", "70%");
				drawSVG3(10, 180, 30, 190, "5~90", "80%");
				drawSVG4("Average CT = 45 mins");
			}
			else if (model['collision'] == 'Emergency Roadwork') {
				$("#first_stop").text("100min");
				$("#second_stop").text("200min");
				$("#fourth_stop").text("400min");

				drawSVG1(10, 95, 40 , 105, "5~160", "60%");
				drawSVG2(10, 145, 60, 155, "5~240", "70%");
				drawSVG3(10, 195, 80, 205, "5~330", "80%");
				drawSVG4("Average CT = 170 mins");
			}
			else if (model['collision'] == 'Off-road Activity') {
				drawSVG1(0, 60, 20, 70, "<30", "60%");
				drawSVG2(0, 90, 20, 100, "<45", "70%");
				drawSVG3(0, 120, 20, 130, "<60", "80%");
				drawSVG4("Average CT = 40 mins");
			}
		}

		if (model['incident'] != null && model["involved_veh"] != null && model["responder"] != null && model["center_choice"] != null &&
		model["pavement_condition"] != null && model["hour_time"] != null && (model["location"] != null || model["exit"] != null)) {	
			if ((model['blockage']=='Travel lane blockage') && ((hazmat == true) && ((truck_hazards.includes('over ')) || (num_responder >= 10) || (num_chart >= 3))) ) {
				drawSVG1(240, 300, 250, 310, ">=120", "90%");
				drawSVG2(0, 0, 0, 0, "", "");
				drawSVG3(0, 0, 0, 0, "", "");
				drawSVG4("Average CT = 160 mins");
			}
			else if ((model['blockage']=='Travel lane blockage') && (model['season_time'] == 'Winter') && (model['weekend_time'] == 'Weekend') && (hour == 'Night time') && (model['collision'] == 'Personal Injury') && (num_truck > 0) && (num_tow > 0) && (num_responder >= 5)) {
				drawSVG1(180, 260, 190, 270, "150~180", "90%");				
				drawSVG2(160, 280, 170, 290, "140~190", "100%");
				drawSVG3(0, 0, 0, 0, "", "");
				drawSVG4("Average CT = 165 mins");
			}
			else if ((model['blockage']=='Travel lane blockage') && ((model['collision'] == 'Personal Injury') || (model['collision'] == 'Property Damage only')) && ((hazmat == true)) ) {
				drawSVG1(110, 240, 154, 250, "55~120", "90%");
				drawSVG2(0, 0, 0, 0, "", "");
				drawSVG3(0, 0, 0, 0, "", "");
				drawSVG4("Average CT = 80 mins");
			}
			else if ((model['blockage']=='Travel lane blockage') && ((truck_hazards.includes('over ')) && ((total_lane >= 4) || (location_choice == 'Harford') || ((model['collision'] == 'Personal Injury') && (num_responder >= 7)))) ) {
				drawSVG1(240, 300, 250, 310, ">=120", "90%");
				drawSVG2(0, 0, 0, 0, "", "");
				drawSVG3(0, 0, 0, 0, "", "");
				drawSVG4("Average CT = 200 mins");
			}
			else if ((model['blockage']=='Travel lane blockage') && ((truck_hazards.includes('jack ')) && (num_tow >= 2) && (hour != 'Day time')) ) {
				drawSVG1(240, 300, 250, 310, ">=120", "90%");
				drawSVG2(0, 0, 0, 0, "", "");
				drawSVG3(0, 0, 0, 0, "", "");
				drawSVG4("Average CT = 150 mins");
			}
			else if ((model['blockage']=='Travel lane blockage') && (((car_hazards.includes('over ')) || (truck_hazards.includes('over ')) || (bus_hazards.includes('over '))) && (((model['weekend_time'] == 'Weekend') && (num_responder >= 8)) || ((num_medical >= 1) && (num_tow >= 2)) || ((location_choice == 'Cecil') && (num_responder >= 6)))) ) {
				drawSVG1(240, 300, 250, 310, ">=120", "90%");
				drawSVG2(0, 0, 0, 0, "", "");
				drawSVG3(0, 0, 0, 0, "", "");
				drawSVG4("Average CT = 165 mins");
			}
			else if ((model['blockage']=='Travel lane blockage') && (model['collision'] == 'Property Damage only') && (travel_drop == 2) && (num_total == 3) && (num_truck > 0) && (num_tow > 0) && !(((car_hazards.includes('jack ')) || (car_hazards.includes('over ')) || (car_hazards.includes('lost ')) || (truck_hazards.includes('jack ')) || (truck_hazards.includes('over ')) || (truck_hazards.includes('lost ')) || (bus_hazards.includes('jack ')) || (bus_hazards.includes('over ')) || (bus_hazards.includes('lost '))))) {
				drawSVG1(180, 260, 190, 270, "40~80", "90%");
				drawSVG2(160, 280, 170, 290, "30~90", "100%");
				drawSVG3(0, 0, 0, 0, "", "");
				drawSVG4("Average CT = 60 mins");
			}
			else if ((model['blockage']=='Travel lane blockage') && (model['weekend_time'] == 'Weekend') && (hour == 'Night time') && (model['collision'] == 'Property Damage only') && (travel_drop >= 3) && (num_truck > 0) && (num_tow > 0) && !((car_hazards.includes('jack ')) || (car_hazards.includes('over ')) || (car_hazards.includes('lost ')) || (truck_hazards.includes('jack ')) || (truck_hazards.includes('over ')) || (truck_hazards.includes('lost ')) || (bus_hazards.includes('jack ')) || (bus_hazards.includes('over ')) || (bus_hazards.includes('lost ')))) {
				drawSVG1(180, 260, 190, 270, "130~150", "90%");
				drawSVG2(160, 280, 170, 290, "120~160", "100%");
				drawSVG3(0, 0, 0, 0, "", "");
				drawSVG4("Average CT = 140 mins");
			}
			else if ((model['blockage']=='Travel lane blockage') && (location_choice == 'Harford') && (hour == 'Night time') && (model['collision'] == 'Property Damage only') && (travel_drop == 1) && (num_truck < 1) && (num_tow > 0) && (num_fireboard > 0)) {
				drawSVG1(180, 260, 190, 270, "35~85", "90%");
				drawSVG2(160, 280, 170, 290, "30~90", "100%");
				drawSVG3(0, 0, 0, 0, "", "");
				drawSVG4("Average CT = 60 mins");
			}
			else if ((model['blockage']=='Travel lane blockage') && (nonholiday == 1) && (num_total >= 4) && (shoulder_drop >= 1) && (num_tow < 1)) {
				drawSVG1(180, 260, 190, 270, "40~70", "90%");
				drawSVG2(160, 280, 170, 290, "30~80", "100%");
				drawSVG3(0, 0, 0, 0, "", "");
				drawSVG4("Average CT = 55 mins");
			}
			else if ((model['blockage']=='Travel lane blockage') && (pavement == 'Wet') && (hour == 'AM-peak') && (model['collision'] == 'Property Damage only') && (travel_drop == 1) && (center=='SOC') && (num_tow > 0)) {
				drawSVG1(180, 260, 190, 270, "90~100", "90%");
				drawSVG2(160, 280, 170, 290, "80~110", "100%");
				drawSVG3(0, 0, 0, 0, "", "");
				drawSVG4("Average CT = 95 mins");
			}
			else if ((model['blockage']=='Travel lane blockage') && (model['collision'] == 'Property Damage only') && (travel_drop == 1) && (num_truck < 1) && (hour == 'Night time') && (center == 'AOC') && (num_responder >= 7)) {
				drawSVG1(180, 260, 190, 270, "45~95", "90%");
				drawSVG2(160, 280, 170, 290, "40~100", "100%");
				drawSVG3(0, 0, 0, 0, "", "");
				drawSVG4("Average CT = 70 mins");
			}
			else if ((model['blockage']=='Travel lane blockage') && (model['weekend_time'] == 'Weekend') && (hour == 'Night time') && (travel_drop >= 4) && (num_total >= 3) && (num_responder >= 6) && (num_tow > 0) && !((car_hazards.includes('jack ')) || (car_hazards.includes('over ')) || (car_hazards.includes('lost ')) || (truck_hazards.includes('jack ')) || (truck_hazards.includes('over ')) || (truck_hazards.includes('lost ')) || (bus_hazards.includes('jack ')) || (bus_hazards.includes('over ')) || (bus_hazards.includes('lost ')))) {
				drawSVG1(180, 260, 190, 270, "150~170", "90%");
				drawSVG2(160, 280, 170, 290, "140~180", "100%");
				drawSVG3(0, 0, 0, 0, "", "");
				drawSVG4("Average CT = 160 mins");
			}
			else if ((model['blockage']=='Travel lane blockage') && (location_choice == 'Baltimore') && (hour == 'Night time') && (pavement == 'Wet') && (model['collision'] == 'Property Damage only') && (travel_drop == 2) && (num_total >= 2) && (num_truck < 1) && (center == 'AOC') && (num_tow > 0)) {
				drawSVG1(180, 260, 190, 270, "100~120", "90%");
				drawSVG2(160, 280, 170, 290, "90~130", "100%");
				drawSVG3(0, 0, 0, 0, "", "");
				drawSVG4("Average CT = 110 mins");
			}
			else if ((model['blockage']=='Travel lane blockage') && (location_choice == 'Baltimore') && (hour == 'Night time') && (model['collision'] == 'Personal Injury') && (num_total >= 4) && (num_truck < 1) && (num_tow > 0) && (num_responder >= 4)) {
				drawSVG1(180, 260, 190, 270, "100~120", "90%");
				drawSVG2(160, 280, 170, 290, "90~130", "100%");
				drawSVG3(0, 0, 0, 0, "", "");
				drawSVG4("Average CT = 110 mins");
			}
			else if ((model['blockage']=='Travel lane blockage') && ((location_choice == 'Cecil') || (location_choice == 'Harford')) && (truck_hazards.includes('jack ')) && (num_tow > 0) && (num_responder >= 4)) {
				drawSVG1(180, 260, 190, 270, "150~170", "90%");
				drawSVG2(160, 280, 170, 290, "140~180", "100%");
				drawSVG3(0, 0, 0, 0, "", "");
				drawSVG4("Average CT = 160 mins");
			}
			else if ((model['blockage']=='Travel lane blockage') && (model['collision'] == 'Property Damage only') && (num_total >= 3) && (aux_lane == true) && (num_tow > 0) && (num_fireboard > 0) && (model['weekend_time'] == 'Weekend') && (hour == 'Night time')) {
				drawSVG1(180, 260, 190, 270, "130~150", "90%");
				drawSVG2(160, 280, 170, 290, "120~160", "100%");
				drawSVG3(0, 0, 0, 0, "", "");
				drawSVG4("Average CT = 140 mins");
			}
			else if ((model['blockage']=='Travel lane blockage') && (hour == 'Night time') && (model['weekend_time'] == 'Weekend') && (num_truck > 0) && (aux_lane == true) && (num_responder >= 10)) {
				drawSVG1(180, 260, 190, 270, "180~210", "90%");
				drawSVG2(160, 280, 170, 290, "170~220", "100%");
				drawSVG3(0, 0, 0, 0, "", "");
				drawSVG4("Average CT = 195 mins");
			}
			else if ((model['blockage']=='Travel lane blockage') && (truck_hazards.includes('jack ')) && (location_choice == 'Cecil') && (exit == 'Exit 100') && (hour == 'Night time')) {
				drawSVG1(180, 260, 190, 270, "200~230", "90%");
				drawSVG2(160, 280, 170, 290, "190~240", "100%");
				drawSVG3(0, 0, 0, 0, "", "");
				drawSVG4("Average CT = 215 mins");
			}
			else if ((model['blockage']=='Travel lane blockage') && (model['collision'] == 'Personal Injury') && (travel_drop >= 4) && (num_truck > 0) && (num_tow < 1) && (num_hour < 3)) {
				drawSVG1(180, 260, 190, 270, "170~190", "90%");
				drawSVG2(160, 280, 170, 290, "160~200", "100%");
				drawSVG3(0, 0, 0, 0, "", "");
				drawSVG4("Average CT = 180 mins");
			}
			else if ((model['blockage']=='Travel lane blockage') && (toll_lane == true) && (num_truck > 0) && (num_responder >= 4) && (num_hour < 7)) {
				drawSVG1(180, 260, 190, 270, "170~200", "90%");
				drawSVG2(160, 280, 170, 290, "160~210", "100%");
				drawSVG3(0, 0, 0, 0, "", "");
				drawSVG4("Average CT = 185 mins");
			}
			else if ((model['blockage']=='Travel lane blockage') && (location_choice == 'Cecil') && (direction == 'South') && (exit == 'Exit 100') && (model['weekend_time'] == 'Weekend') && (num_responder > 3) && (hour == 'Night time' || num_total > 2)) {
				drawSVG1(180, 260, 190, 270, "90~110", "90%");
				drawSVG2(160, 280, 170, 290, "80~120", "100%");
				drawSVG3(0, 0, 0, 0, "", "");
				drawSVG4("Average CT = 100 mins");
			}
			else if ((model['blockage']=='Travel lane blockage')&&(nonholiday == 1) && (toll_lane == true) && (num_truck == 1) && (num_tow < 1)) {
				drawSVG1(120, 180, 130, 200, "100~120", "90%");
				drawSVG2(100, 200, 110, 220, "90~130", "100%");
				drawSVG3(0, 0, 0, 0, "", "");
				drawSVG4("Average CT = 110 mins");
			}
			else {
				if (model['incident'] == 'Collision incident') {
					if (model['blockage']=='Travel lane blockage') {
						if (model['collision']=='Fatality') {
							if ((travel_drop > 3) || (num_total > 2) || (num_truck > 1) || (num_tow > 1)) {
								if (num_truck > 0) {CF_case4();}
								else {CF_case2();}
							}
							else {
								if (num_total > 1) {CF_case3();}
								else {CF_case1();}
							}
						}
						else if (model['collision']=='Personal Injury') {
							if (model['number_travel']=='1 Travel lane blocked') {
								checkresult = 'CPI1-0';

								if (checkresult == 'CPI1-0') {
									if (num_tow > 0) {checkresult = 'CPI1-2';}
									else if (num_total >= 4) {checkresult = 'CPI1-2';}
									else if ((center=='TOC3') || (center=='TOC4') || (center=='SOC')) {checkresult = 'CPI1-1';}
									else if ((num_truck > 0) || (num_motorcycle > 0)) {checkresult = 'CPI1-2';}
									else if (tunnel_lane == true) {checkresult = 'CPI1-2';}
									else if (first_responder == 'FIREBOARD') {checkresult = 'CPI1-1';}
									else if (((hour == 'Day time') || (hour == 'Night time')) && (first_responder=='POLICE')) {checkresult = 'CPI1-2';}
									else if (((hour == 'AM-peak') || (hour == 'PM-peak')) && (num_total >= 3)) {checkresult = 'CPI1-2';}
									else if (num_chart > 0) {checkresult = 'CPI1-2';}
									else {checkresult = 'CPI1-1';}
								}

								if (checkresult == 'CPI1-2') {
									if ((hour == 'Night time' && num_responder >= 7) || (num_total >= 5)) {checkresult = 'CPI1-3';}
									else if ((num_tow == 0) || (num_truck == 0)) {checkresult = 'CPI1-2';}
									else if (first_responder=='POLICE') {checkresult = 'CPI1-3';}
									else if ((num_tow>1) || (aux_lane == true) || (num_truck >1) || (hazmat == true)) {checkresult = 'CPI1-3';}
									else if ((num_total<3) || (center=='TOC3')) {checkresult = 'CPI1-2';}
									else {checkresult = 'CPI1-3';}
								}

								if (checkresult == 'CPI1-3') {
									if (model['season_time'] == 'Winter') {checkresult = 'CPI1-4';}
									else if ((num_chart > 2) || (num_responder > 6)) {checkresult = 'CPI1-4';}
									else {checkresult = 'CPI1-3';}
								}

								if (checkresult == 'CPI1-1') {CPI1_case1();}
								else if (checkresult == 'CPI1-2') {CPI1_case2();}
								else if (checkresult == 'CPI1-3') {CPI1_case3();}
								else if (checkresult == 'CPI1-4') {CPI1_case4();}
							}
							else if (model['number_travel']=='2 Travel lanes blocked') {
								checkresult = 'CPI2-0';

								if (checkresult == 'CPI2-0') {
									if (num_tow > 0) {checkresult = 'CPI2-2';}
									else if (center == 'AOC') {checkresult = 'CPI2-2';}
									else if (num_responder > 4) {checkresult = 'CPI2-2';}
									else if (pavement == 'Dry') {checkresult = 'CPI2-1';}
									else if ((model['season_time'] == 'Winter') || (hour == 'Night time')) {checkresult = 'CPI2-2';}
									else {checkresult = 'CPI2-1';}
								}
								if (checkresult == 'CPI2-2') {
									if (num_total >= 6) {checkresult = 'CPI2-3';}
									else if ((num_tow >= 2) && (num_total >= 4)) {checkresult = 'CPI2-3';}
									else if (num_responder >= 7) {checkresult = 'CPI2-3';}
									else if ((num_tow==0) || (num_truck==0)) {checkresult = 'CPI2-2';}
									else if ((num_medical > 0) || (hazmat == true) || (hour == 'Night time') || (pavement == 'Wet') || (tunnel_lane == true) || (num_responder > 6)) {checkresult = 'CPI2-3';}
									else {checkresult = 'CPI2-2';}
								}
								if (checkresult == 'CPI2-3') {
									if ((num_truck>1) || (num_total>3) || (hazmat == true) || (num_responder > 7)) {checkresult = 'CPI2-4';}
									else {checkresult = 'CPI2-3';}
								}

								if (checkresult == 'CPI2-1') {CPI2_case1();}
								else if (checkresult == 'CPI2-2') {CPI2_case2();}
								else if (checkresult == 'CPI2-3') {CPI2_case3();}
								else if (checkresult == 'CPI2-4') {CPI2_case4();}
							}
							else if (['3 Travel lanes blocked', '4 Travel lanes blocked', '5+ Travel lanes blocked'].includes(model['number_travel'])) {
								checkresult = 'CPI3-0';

								if (checkresult == 'CPI3-0') {
									if ((num_tow > 0) || ((car_hazards.includes('jack ')) || (car_hazards.includes('over ')) || (car_hazards.includes('lost ')) || (truck_hazards.includes('jack ')) || (truck_hazards.includes('over ')) || (truck_hazards.includes('lost ')) || (bus_hazards.includes('jack ')) || (bus_hazards.includes('over ')) || (bus_hazards.includes('lost '))) ) {checkresult = 'CPI3-2';}
									else if (center == 'TOC4') {checkresult = 'CPI3-1';}
									else if ((center == 'SOC') || (num_truck > 0) || (num_total > 2)) {checkresult = 'CPI3-2';}
									else if (center == 'TOC3') {checkresult = 'CPI3-1';}				
									else if (first_responder == 'FIREBOARD') {checkresult = 'CPI3-2';}
									else {checkresult = 'CPI3-1';}
								}
								if (checkresult == 'CPI3-2') {
									if (num_medical > 0) {checkresult = 'CPI3-3';}
									else if (num_responder > 8) {checkresult = 'CPI3-3';}
									else if (num_tow == 0) {checkresult = 'CPI3-2';}
									else if (travel_drop > 3) {checkresult = 'CPI3-3';}
									else if ((hour == 'Night time') || (model['weekend_time'] == 'Weekend')) {checkresult = 'CPI3-3';}
									else if (pavement == 'Dry') {checkresult = 'CPI3-2';}
									else {checkresult = 'CPI3-3';}
								}
								if (checkresult == 'CPI3-3') {
									if (num_responder > 9) {checkresult = 'CPI3-4';}
									else if (num_truck == 0) {checkresult = 'CPI3-3';}
									else if (num_truck > 1) {checkresult = 'CPI3-4';}
									else if ((num_medical > 0) || (tunnel_lane == true)) {checkresult = 'CPI3-4';}
									else {checkresult = 'CPI3-3';}
								}

								if (checkresult == 'CPI3-1') {CPI3_case1();}
								else if (checkresult == 'CPI3-2') {CPI3_case2();}
								else if (checkresult == 'CPI3-3') {CPI3_case3();}
								else if (checkresult == 'CPI3-4') {CPI3_case4();}
							}
						}
					
						else if (model['collision']=='Property Damage only') {
							if (model['number_travel']=='1 Travel lane blocked') {
								checkresult = 'CPD1-0';

								if (checkresult == 'CPD1-0') {
									if ((num_tow > 0) || (hazmat == true)) {checkresult = 'CPD1-2';}
									else if ((center == 'AOC') && (num_chart > 1)) {checkresult = 'CPD1-2';}
									else if ((center == 'AOC') && (num_total > 4)) {checkresult = 'CPD1-2';}
									else if ((pavement == 'Wet') && (num_police >= 2) && (aux_lane == true) && (shoulder_drop >= 1)) {checkresult = 'CPD1-2';}
									else if (pavement == 'Dry') {checkresult = 'CPD1-1';}
									else if (model['weekend_time'] == 'Weekday') {checkresult = 'CPD1-1';}
									else if ((hour == 'Day time') && (num_total < 4)) {checkresult = 'CPD1-1';}
									else if ((num_total > 2) || (num_fireboard > 0) || (pavement == 'Wet') || (location_choice == 'Harford')) {checkresult = 'CPD1-2';}
									else {checkresult = 'CPD1-1';}
								}
								if (checkresult == 'CPD1-2') {
									if ((num_bus > 0) || ((car_hazards.includes('jack ')) || (car_hazards.includes('over ')) || (car_hazards.includes('lost ')) || (truck_hazards.includes('jack ')) || (truck_hazards.includes('over ')) || (truck_hazards.includes('lost ')) || (bus_hazards.includes('jack ')) || (bus_hazards.includes('over ')) || (bus_hazards.includes('lost ')))) {checkresult = 'CPD1-3';}
									else if (num_truck == 0) {checkresult = 'CPD1-2';}
									else if ((num_fireboard == 0) && (aux_lane == false)) {checkresult = 'CPD1-2';}
									else if ((num_tow > 1) || (hazmat == true) || (pavement == 'Chemical wet') || (pavement == 'Snow/Ice') || (hour == 'Night time') || (center == 'AOC') || (num_chart > 2)) {checkresult = 'CPD1-3';}
									else {checkresult = 'CPD1-2';}
								}	
								if (checkresult == 'CPD1-3') {
									if ((num_tow > 1) || (pavement == 'Chemical wet')) {checkresult = 'CPD1-4';}
									else {checkresult = 'CPD1-3';}		
								}

								if (checkresult == 'CPD1-1') {CPD1_case1();}
								else if (checkresult == 'CPD1-2') {CPD1_case2();}
								else if (checkresult == 'CPD1-3') {CPD1_case3();}
								else if (checkresult == 'CPD1-4') {CPD1_case4();}	
							}
							else if (model['number_travel']=='2 Travel lanes blocked') {
								checkresult = 'CPD2-0';

								if (checkresult == 'CPD2-0') {
									if (center == 'AOC') {checkresult = 'CPD2-2';}
									else if (num_tow > 0 && num_fireboard > 0) {checkresult = 'CPD2-2';}
									else if (model['weekend_time'] == 'Weekend' && hour == 'Night time' && (num_tow > 0 || num_responder > 3)) {checkresult = 'CPD2-2';}
									else if (num_truck > 0 && num_responder > 4) {checkresult = 'CPD2-2';}
									else if (num_total >= 6) {checkresult = 'CPD2-2';}
									else {checkresult = 'CPD2-1';}
								}
								if (checkresult == 'CPD2-2') {
									if (num_tow > 1) {checkresult = 'CPD2-3';}
									else if (pavement == 'Wet' && num_fireboard > 0 && (model['season_time'] == 'Spring' || model['season_time'] == 'Summer')) {checkresult = 'CPD2-3';}
									else if ((num_total > 3) && (num_responder > 4)) {checkresult = 'CPD2-3';}		
									else {checkresult = 'CPD2-2';}
								}
								if (checkresult == 'CPD2-3') {
									if (num_truck == 0) {checkresult = 'CPD2-3';}
									else if (num_responder > 7) {checkresult = 'CPD2-4';}
									else {checkresult = 'CPD2-3';}
								}

								if (checkresult == 'CPD2-1') {CPD2_case1();}
								else if (checkresult == 'CPD2-2') {CPD2_case2();}
								else if (checkresult == 'CPD2-3') {CPD2_case3();}
								else if (checkresult == 'CPD2-4') {CPD2_case4();}
							}
							else if (['3 Travel lanes blocked', '4 Travel lanes blocked', '5+ Travel lanes blocked'].includes(model['number_travel'])) {
								checkresult = 'CPD3-0';
								if (checkresult == 'CPD3-0') {
									if (num_tow > 0) {checkresult = 'CPD3-2';}
									else if (center == 'AOC') {checkresult = 'CPD3-2';}
									else if ((num_total > 2) && (num_police > 1)) {checkresult = 'CPD3-2';}
									else {checkresult = 'CPD3-1';}
								}
								if (checkresult == 'CPD3-2') {
									if ((num_tow == 0) || (num_fireboard == 0)) {checkresult = 'CPD3-2';}
									else if ((num_total > 3) || (num_truck > 0)) {checkresult = 'CPD3-3';}
									else {checkresult = 'CPD3-2';}
								}
								if (checkresult == 'CPD3-3') {
									if ((num_chart > 3) || (num_responder > 8)) {checkresult = 'CPD3-4';}
									else if (hour == 'Day time') {checkresult = 'CPD3-3';}
									else if (hazmat == true) {checkresult = 'CPD3-4';}
									else {checkresult = 'CPD3-3';}
								}

								if (checkresult == 'CPD3-1') {CPD3_case1();}
								else if (checkresult == 'CPD3-2') {CPD3_case2();}
								else if (checkresult == 'CPD3-3') {CPD3_case3();}
								else if (checkresult == 'CPD3-4') {CPD3_case4();}
							}
						}
					}
					else if (model['blockage']=='Shoulder only blockage') {
						prob = 1/(1+Math.exp(-(-2.27-0.47*baltimoreCity+0.07*cecil-0.28*harford+0.41*dry+0.98*snow+0.33*unspecified+0.84*wet-0.38*week+0.3*nonholiday_sh
							-0.23*num_total+0.52*num_car+1.04*num_truck+0.26*num_responder+0.34*num_fireboard+0.43*num_medical-0.23*cpi
							+0.48*spring+0.37*summer+0.54*winter+0.08*daytime+0.23*nighttime)));
						console.log(prob);

						if (num_tow > 0) {shoulder_case2();}
						else if (center != 'AOC') {shoulder_case1();}
						else if (num_responder == 1 && pavement == 'Dry') {shoulder_case1();}
						else if (shoulder_drop == 2) {shoulder_case2();}
						else if ((model['collision'] == 'Personal Injury' && hour == 'AM-peak') || (model['collision'] == 'Personal Injury' && hour == 'Night time')) {shoulder_case2();}
						else if (hour == 'PM-peak') {shoulder_case1();}
						else if (prob <= 0.4 && num_truck == 0) {shoulder_case1();}
						else if (prob > 0.5 && num_fireboard > 0) {shoulder_case2();}
						else {shoulder_case3();}
					}
				}
				else if (model['incident'] == 'Non-Collision incident') {
					// need more input situation
					if (model['collision'] == 'Vehicles on Fire') {
						 drawSVG1(10, 90, 30, 100, "5~45", "60%");
						 drawSVG2(10, 120, 30, 130, "5~60", "70%");
						 drawSVG3(10, 180, 30, 190, "5~90", "80%");
						 drawSVG4("Average CT = 45 mins");
					}
					else if (model['collision'] == 'Emergency Roadwork') {
						$("#first_stop").text("100min");
						$("#second_stop").text("200min");
						$("#fourth_stop").text("400min");

						drawSVG1(10, 95, 40 , 105, "5~160", "60%");
						drawSVG2(10, 145, 60, 155, "5~240", "70%");
						drawSVG3(10, 195, 80, 205, "5~330", "80%");
						drawSVG4("Average CT = 170 mins");
					}
					else if (model['collision'] == 'Off-road Activity') {
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

// Used to draw the labels in the bottom right corner
function drawSVG1(x1, x2, txt1_x, txt2_x, txt1, txt2) {
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
function drawSVG2(x1, x2, txt1_x, txt2_x, txt1, txt2) {
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
function drawSVG3(x1, x2, txt1_x, txt2_x, txt1, txt2) {
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
function drawSVG4(average_time) {
	// update average time line
	$("#text3").empty();
	last_line = document.createTextNode(average_time);
}

/* 
 * Performs checks to ensure all input conditions are met
 * Activates the next buttons after the save buttons are clicked
 */
function activeNext() {
	var more_info = true; // Boolean whether or not "More info needed" message is displayed
	var all_info = false; // Indicates if all information has been collected in the model
	if (model['incident'] != null && model["involved_veh"] != null && model["responder"] != null && model["center_choice"] != null &&
		model["pavement_condition"] != null && model["hour_time"] != null && (model["location"] != null || model['exit'] != null)) {
		more_info = false;
		all_info = true;
	}
	
	if (this.id == 'Save-1') {
		$("#Next-1").removeAttr("disabled");
		$("#showModel").removeAttr("style");
	}

	else if (this.id == 'Save-2') {	
		$("#Next-2").removeAttr("disabled");
		$("#showModel").removeAttr("style");
	}
	else if (this.id == 'Save-3') {
		$("#Next-3").removeAttr("disabled");
		$("#showModel").removeAttr("style");
	}
	else if (this.id == 'Save-4') {
		$("#Next-4").removeAttr("disabled");
		$("#showModel").removeAttr("style");

		// enables the tabs after the Next-4 button is selected to ensure that all
		// qualities are entered from the first tab
		document.getElementById("data_tab_2").style = "font-size: 14px;";
		document.getElementById("data_tab_3").style = "font-size: 14px;";
		document.getElementById("results_tab").style = "font-size: 14px;";
		
		// displays different vehicles and location pages for different roads
		if (road == "i495") {
			document.getElementById("location_495").style = "font-size: 14px;";
		}
		else if (road == "i695") {
			document.getElementById("location_695").style = "font-size: 14px;";
		}
		else if (road == "i70") {
			document.getElementById("location_70").style = "font-size: 14px;";
		}
		else if (road == "us29") {
			document.getElementById("location_29").style = "font-size: 14px;";
		}
		else if (cluster1.concat(cluster2, cluster3, cluster4, cluster5, cluster6).includes(road)) {
			document.getElementById("location_cluster").style = "font-size: 14px;";
		}
		else {
			document.getElementById("location_95").style = "font-size: 14px;";
		}
	}
	else if (this.id == 'Save-1-4') {
		var radioValue4 = $("input[name='type']:checked").val();
		console.log(radioValue4);
	}
	else if (this.id == 'Save-5') {
		$("#boxheader").text("Estimated Clearance Time");
		if (all_info) {$("#boxheader").text("All information has been recorded.");}
		$("#Next-5").removeAttr("disabled");
	}
	else if (this.id == 'Save-6') {
		$("#boxheader").text("Estimated Clearance Time");
		if (all_info) {$("#boxheader").text("All information has been recorded.");}

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
	else if (this.id == 'Save-7') {
		$("#results_tab").removeAttr("style");
 		$("#Next-7").removeAttr("disabled");
	}
	else if (this.id == 'Save-7_495') {
		$("#results_tab").removeAttr("style");
 		$("#Next-7_495").removeAttr("disabled");
	}
	else if (this.id == 'Save-7_695') {
		$("#results_tab").removeAttr("style");
 		$("#Next-7_695").removeAttr("disabled");
	}
	else if (this.id == 'Save-7_70') {
		$("#results_tab").removeAttr("style");
 		$("#Next-7_70").removeAttr("disabled");
	}
	else if (this.id == 'Save-7_29') {
		$("#results_tab").removeAttr("style");
 		$("#Next-7_29").removeAttr("disabled");
	}
	else if (this.id == 'Save-7_cluster') {
		$("#results_tab").removeAttr("style");
 		$("#Next-7_cluster").removeAttr("disabled");
	}
	printSum();
	printTime();
}

/* 
 * Below are the display cases for CPI, CPD and Fatalities
 * Cases are determined in the "updateTime()" function and then routed here for display to the screen
 */
function CPI1_case1() {
	if (road == "i495") {
		drawSVG1(20, 60, 22, 70, "10~30", "60%");
		drawSVG2(10, 60, 19, 70, "5~30", "70%");
		drawSVG3(10, 70, 24, 80, "5~35", "80%");
		drawSVG4("Average CT = 22 mins");
	}
	else if (road == "i695") {
		drawSVG1(20, 60, 22, 80, "10~30", "60%");
		drawSVG2(10, 60, 19, 90, "5~30", "70%");
		drawSVG3(10, 80, 28, 100, "5~40", "80%");
		drawSVG4("Average CT = 21 mins");
	}
	else if (road == "i70") {
		drawSVG1(10, 70, 14, 80, "5~35", "70%");
		drawSVG2(10, 90, 24, 100, "5~45", "80%");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 23 mins");
	}
	else if (road == "us29") {
		drawSVG1(10, 80, 29, 90, "5~40", "100%");
		drawSVG2(0, 0, 0, 0, "", "");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 8 mins");
	}
	else if (cluster1.includes(road)) {
		drawSVG1(20, 70, 25, 80, "10~35", "60%");
		drawSVG2(10, 80, 29, 90, "5~40", "70%");
		drawSVG3(10, 100, 39, 110, "5~50", "80%");
		drawSVG4("Average CT = 30 mins");
	}
	else if (cluster2.includes(road)) {
		drawSVG1(10, 60, 18, 70, "5~30", "60%");
		drawSVG2(10, 70, 23, 80, "5~35", "70%");
		drawSVG3(10, 90, 33, 100, "5~45", "80%");
		drawSVG4("Average CT = 19 mins");
	}
	else if (cluster3.includes(road)) {
		drawSVG1(20, 80, 28, 90, "10~40", "60%");
		drawSVG2(20, 90, 33, 100, "10~45", "70%");
		drawSVG3(10, 110, 43, 120, "5~55", "80%");
		drawSVG4("Average CT = 30 mins");
	}
	else if (cluster4.includes(road)) {
		drawSVG1(20, 60, 20, 80, "10~30", "60%");
		drawSVG2(10, 70, 23, 80, "5~35", "70%");
		drawSVG3(10, 100, 39, 110, "5~50", "80%");
		drawSVG4("Average CT = 21 mins");
	}
	else if (cluster5.includes(road)) {
		drawSVG1(20, 70, 25, 80, "10~35", "60%");
		drawSVG2(20, 90, 33, 100, "10~45", "70%");
		drawSVG3(10, 110, 43, 120, "5~55", "80%");
		drawSVG4("Average CT = 27 mins");
	}
	else if (cluster6.includes(road)) {
		drawSVG1(20, 70, 25, 80, "10~35", "60%");
		drawSVG2(10, 90, 33, 100, "5~45", "70%");
		drawSVG3(10, 120, 47, 130, "5~60", "80%");
		drawSVG4("Average CT = 33 mins");
	}
	else {
		drawSVG1(20, 60, 20, 70, "10~30", "60%");
		drawSVG2(20, 70, 25, 80, "10~35", "70%");
		drawSVG3(20, 90, 35, 100, "10~45", "80%");
		drawSVG4("Average CT = 25 mins");
	}
}
function CPI1_case2() {
	if (road == "i495") {
		drawSVG1(50, 100, 57, 110, "25~50", "60%");
		drawSVG2(40, 110, 57, 120, "20~55", "70%");
		drawSVG3(40, 120, 62, 130, "20~60", "80%");
		drawSVG4("Average CT = 38 mins");
	}
	else if (road == "i695") {
		drawSVG1(50, 120, 68, 130, "25~60", "60%");
		drawSVG2(40, 120, 60, 130, "20~60", "70%");
		drawSVG3(30, 130, 60, 140, "15~65", "80%");
		drawSVG4("Average CT = 41 mins");
	}
	else if (road == "i70") {
		drawSVG1(50, 110, 62, 120, "25~55", "60%");
		drawSVG2(50, 120, 67, 130, "25~60", "70%");
		drawSVG3(40, 160, 82, 170, "20~80", "80%");
		drawSVG4("Average CT = 43 mins");
	}
	else if (road == "us29") {
		drawSVG1(50, 100, 57, 110, "25~50", "60%");
		drawSVG2(40, 110, 57, 120, "20~55", "70%");
		drawSVG3(40, 120, 62, 130, "20~60", "80%");
		drawSVG4("Average CT = 37 mins");
	}
	else if (cluster1.includes(road)) {
		drawSVG1(40, 90, 43, 100, "20~45", "60%");
		drawSVG2(30, 100, 43, 110, "15~50", "70%");
		drawSVG3(20, 120, 48, 130, "10~60", "80%");
		drawSVG4("Average CT = 34 mins");
	}
	else if (cluster2.includes(road)) {
		drawSVG1(50, 110, 58, 120, "25~55", "60%");
		drawSVG2(40, 120, 58, 130, "20~60", "70%");
		drawSVG3(30, 180, 83, 190, "15~90", "80%");
		drawSVG4("Average CT = 44 mins");
	}
	else if (cluster3.includes(road)) {
		drawSVG1(50, 120, 63, 130, "25~60", "60%");
		drawSVG2(30, 120, 53, 130, "15~60", "70%");
		drawSVG3(30, 140, 63, 150, "15~70", "80%");
		drawSVG4("Average CT = 44 mins");
	}
	else if (cluster4.includes(road)) {
		drawSVG1(50, 110, 58, 120, "25~55", "60%");
		drawSVG2(40, 110, 53, 120, "20~55", "70%");
		drawSVG3(30, 150, 68, 160, "15~75", "80%");
		drawSVG4("Average CT = 40 mins");
	}
	else if (cluster5.includes(road)) {
		drawSVG1(50, 100, 53, 110, "25~50", "60%");
		drawSVG2(30, 120, 53, 130, "15~60", "70%");
		drawSVG3(30, 140, 63, 150, "15~70", "80%");
		drawSVG4("Average CT = 38 mins");
	}
	else if (cluster6.includes(road)) {
		drawSVG1(40, 130, 63, 140, "20~65", "60%");
		drawSVG2(40, 170, 83, 180, "20~85", "70%");
		drawSVG3(30, 200, 89, 210, "15~100", "80%");
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
	if (road == "i495") {
		drawSVG1(120, 170, 127, 180, "60~85", "60%");
		drawSVG2(120, 180, 132, 190, "60~90", "70%");
		drawSVG3(100, 200, 128, 210, "50~100", "80%");
		drawSVG4("Average CT = 68 mins");
	}
	else if (road == "i695") {
		drawSVG1(120, 180, 130, 240, "60~90", "60%");
		drawSVG2(80, 210, 120, 240, "40~105", "70%");
		drawSVG3(50, 210, 110, 240, "25~105", "80%");
		drawSVG4("Average CT = 70 mins");
	}
	else if (road == "i70") {
		drawSVG1(130, 220, 151, 230, "65~110", "60%");
		drawSVG2(130, 230, 156, 240, "65~115", "70%");
		drawSVG3(130, 240, 161, 250, "65~120", "80%");
		drawSVG4("Average CT = 83 mins");
	}
	else if (road == "us29") {
		drawSVG1(120, 150, 117, 160, "60~75", "60%");
		drawSVG2(120, 240, 159, 250, "60~120", "100%");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 66 mins");
	}
	else if (cluster1.includes(road)) {
		drawSVG1(110, 220, 140, 230, "55~110", "60%");
		drawSVG2(100, 230, 140, 240, "50~115", "70%");
		drawSVG3(80, 240, 135, 250, "40~120", "80%");
		drawSVG4("Average CT = 82 mins");
	}
	else if (cluster2.includes(road)) {
		drawSVG1(90, 180, 113, 190, "45~90", "60%");
		drawSVG2(90, 190, 118, 200, "45~95", "70%");
		drawSVG3(60, 230, 123, 240, "30~115", "80%");
		drawSVG4("Average CT = 69 mins");
	}
	else if (cluster3.includes(road)) {
		drawSVG1(110, 200, 130, 210, "55~100", "60%");
		drawSVG2(90, 200, 123, 210, "45~100", "70%");
		drawSVG3(60, 230, 123, 240, "30~115", "80%");
		drawSVG4("Average CT = 71 mins");
	}
	else if (cluster4.includes(road)) {
		drawSVG1(120, 160, 118, 170, "60~80", "60%");
		drawSVG2(120, 170, 125, 180, "60~85", "70%");
		drawSVG3(100, 240, 140, 250, "50~120", "80%");
		drawSVG4("Average CT = 72 mins");
	}
	else if (cluster5.includes(road)) {
		drawSVG1(70, 150, 88, 160, "35~75", "60%");
		drawSVG2(60, 170, 93, 180, "30~85", "70%");
		drawSVG3(60, 260, 133, 270, "30~130", "80%");
		drawSVG4("Average CT = 70 mins");
	}
	else if (cluster6.includes(road)) {
		drawSVG1(110, 200, 130, 210, "55~100", "60%");
		drawSVG2(110, 240, 150, 250, "55~120", "70%");
		drawSVG3(100, 280, 160, 290, "50~140", "80%");
		drawSVG4("Average CT = 128 mins");
	}
	else {
		drawSVG1(120, 240, 150, 250, "60~120", "60%");
		drawSVG2(50, 240, 70, 250, "25~120", "70%");
		drawSVG3(30, 240, 50, 250, "15~120", "75%");
		drawSVG4("Average CT = 100 mins");
	}
}
function CPI1_case4() {
	if (road == "i495") {
		drawSVG1(240, 300, 250, 310, ">=120", "100%");
		drawSVG2(0, 0, 0, 0, "", "");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 183 mins");
	}
	else if (road == "i695") {
		drawSVG1(240, 300, 250, 310, ">=120", "85%");
		drawSVG2(180, 300, 222, 310, ">=90", "100%");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 182 mins");
	}
	else if (road == "i70") {
		drawSVG1(240, 300, 250, 310, ">=120", "100%");
		drawSVG2(0, 0, 0, 0, "", "");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = >=120 mins"); // mean not given
	}
	else if (road == "us29") {
		drawSVG1(240, 300, 250, 310, ">=120", "85%");
		drawSVG2(0, 0, 0, 0, "", "");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = >=120 mins"); // mean not given
	}
	else if (cluster1.includes(road)) {
		drawSVG1(240, 300, 250, 310, ">=120", "70%");
		drawSVG2(140, 300, 205, 310, ">=70", "100%");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 186 mins");
	}
	else if (cluster2.includes(road)) {
		drawSVG1(240, 300, 250, 310, ">=120", "70%");
		drawSVG2(140, 300, 205, 310, ">=70", "100%");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 151 mins");
	}
	else if (cluster3.includes(road)) {
		drawSVG1(240, 300, 250, 310, ">=120", "70%");
		drawSVG2(140, 300, 205, 310, ">=70", "100%");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 295 mins");
	}
	else if (cluster4.includes(road)) {
		drawSVG1(240, 300, 250, 310, ">=120", "70%");
		drawSVG2(140, 300, 205, 310, ">=70", "100%");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 142 mins");
	}
	else if (cluster5.includes(road)) {
		drawSVG1(240, 300, 250, 310, ">=120", "70%");
		drawSVG2(140, 300, 205, 310, ">=70", "100%");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 248 mins");
	}
	else if (cluster6.includes(road)) {
		drawSVG1(240, 300, 250, 310, ">=120", "70%");
		drawSVG2(120, 300, 192, 310, ">=60", "100%");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 282 mins");
	}
	else {
		drawSVG1(240, 300, 250, 310, ">=120", "75%");
		drawSVG2(160, 300, 213, 310, ">=80", "100%");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 150 mins");
	}
}

function CPI2_case1() {
	if (road == "i495") {
		drawSVG1(20, 60, 22, 70, "10~30", "60%");
		drawSVG2(10, 60, 17, 70, "5~30", "70%");
		drawSVG3(10, 70, 22, 80, "5~35", "80%");
		drawSVG4("Average CT = 20 mins");
	}
	else if (road == "i695") {
		drawSVG1(20, 60, 22, 70, "10~30", "60%");
		drawSVG2(10, 60, 20, 70, "5~30", "70%");
		drawSVG3(10, 70, 25, 80, "5~35", "80%");
		drawSVG4("Average CT = 20 mins");
	}
	else if (road == "i70") {
		drawSVG1(10, 60, 17, 70, "5~30", "70%");
		drawSVG2(10, 70, 22, 80, "5~35", "80%");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 19 mins");
	}
	else if (road == "us29") {
		drawSVG1(20, 80, 28, 90, "10~40", "60%");
		drawSVG2(10, 80, 27, 90, "5~40", "70%");
		drawSVG3(10, 90, 32, 100, "5~45", "80%");
		drawSVG4("Average CT = 20 mins");
	}
	else if (cluster1.includes(road)) {
		drawSVG1(20, 70, 25, 80, "10~35", "60%");
		drawSVG2(10, 80, 27, 90, "5~40", "70%");
		drawSVG3(10, 120, 47, 130, "5~60", "80%");
		drawSVG4("Average CT = 37 mins");
	}
	else if (cluster2.includes(road)) {
		drawSVG1(20, 60, 20, 70, "10~30", "60%");
		drawSVG2(20, 70, 25, 80, "10~35", "70%");
		drawSVG3(10, 100, 38, 110, "5~50", "80%");
		drawSVG4("Average CT = 45 mins");
	}
	else if (cluster3.includes(road)) {
		drawSVG1(20, 70, 23, 80, "10~35", "60%");
		drawSVG2(20, 80, 28, 90, "10~40", "70%");
		drawSVG3(10, 100, 37, 110, "5~50", "80%");
		drawSVG4("Average CT = 25 mins");
	}
	else if (cluster4.includes(road)) {
		drawSVG1(20, 60, 20, 70, "10~30", "60%");
		drawSVG2(10, 60, 18, 70, "5~30", "70%");
		drawSVG3(10, 100, 37, 110, "5~50", "80%");
		drawSVG4("Average CT = 21 mins");
	}
	else if (cluster5.includes(road)) {
		drawSVG1(20, 60, 20, 70, "10~30", "60%");
		drawSVG2(10, 70, 23, 80, "5~35", "70%");
		drawSVG3(10, 80, 27, 90, "5~40", "80%");
		drawSVG4("Average CT = 9 mins");
	}
	else if (cluster6.includes(road)) {
		drawSVG1(10, 60, 18, 70, "5~30", "60%");
		drawSVG2(10, 100, 39, 110, "5~50", "70%");
		drawSVG3(10, 160, 68, 170, "5~80", "80%");
		drawSVG4("Average CT = 35 mins");
	}
	else {
		drawSVG1(20, 50, 60, 120, "10~25", "60%");
		drawSVG2(20, 60, 70, 120, "10~30", "70%");
		drawSVG3(20, 80, 40, 120, "10~40", "80%");
		drawSVG4("Average CT = 30 mins");
	}
}
function CPI2_case2() {
	if (road == "i495") {
		drawSVG1(40, 100, 52, 110, "20~50", "60%");
		drawSVG2(30, 110, 52, 120, "15~55", "70%");
		drawSVG3(30, 120, 57, 130, "15~60", "80%");
		drawSVG4("Average CT = 36 mins");
	}
	else if (road == "i695") {
		drawSVG1(50, 120, 70, 130, "25~60", "60%");
		drawSVG2(40, 120, 60, 130, "20~60", "70%");
		drawSVG3(40, 140, 60, 150, "20~70", "80%");
		drawSVG4("Average CT = 46 mins");
	}
	else if (road == "i70") {
		drawSVG1(40, 120, 62, 130, "20~60", "60%");
		drawSVG2(40, 130, 67, 140, "20~65", "70%");
		drawSVG3(30, 130, 62, 140, "15~65", "80%");
		drawSVG4("Average CT = 42 mins");
	}
	else if (road == "us29") {
		drawSVG1(60, 110, 67, 120, "30~55", "70%");
		drawSVG2(60, 120, 72, 130, "30~60", "80%");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 43 mins");
	}
	else if (cluster1.includes(road)) {
		drawSVG1(20, 120, 48, 130, "10~60", "60%");
		drawSVG2(20, 180, 80, 190, "10~90", "70%");
		drawSVG3(10, 210, 88, 220, "5~105", "80%");
		drawSVG4("Average CT = 45 mins");
	}
	else if (cluster2.includes(road)) {
		drawSVG1(50, 130, 68, 140, "25~65", "60%");
		drawSVG2(40, 140, 68, 150, "20~70", "70%");
		drawSVG3(20, 160, 68, 170, "10~80", "80%");
		drawSVG4("Average CT = 45 mins");
	}
	else if (cluster3.includes(road)) {
		drawSVG1(50, 120, 63, 130, "25~60", "60%");
		drawSVG2(40, 130, 63, 140, "20~65", "70%");
		drawSVG3(30, 170, 78, 180, "15~85", "80%");
		drawSVG4("Average CT = 46 mins");
	}
	else if (cluster4.includes(road)) {
		drawSVG1(50, 110, 58, 120, "25~55", "60%");
		drawSVG2(50, 120, 63, 130, "25~60", "70%");
		drawSVG3(30, 160, 73, 170, "15~80", "80%");
		drawSVG4("Average CT = 45 mins");
	}
	else if (cluster5.includes(road)) {
		drawSVG1(50, 110, 58, 120, "25~55", "60%");
		drawSVG2(40, 120, 58, 130, "20~60", "70%");
		drawSVG3(30, 150, 68, 160, "15~75", "80%");
		drawSVG4("Average CT = 47 mins");
	}
	else if (cluster6.includes(road)) {
		drawSVG1(60, 120, 68, 130, "30~60", "60%");
		drawSVG2(50, 140, 73, 150, "25~75", "70%");
		drawSVG3(30, 200, 89, 210, "15~100", "80%");
		drawSVG4("Average CT = 81 mins");
	}
	else {
		drawSVG1(50, 120, 70, 130, "25~60", "60%");
		drawSVG2(20, 120, 48, 130, "10~60", "70%");
		drawSVG3(20, 140, 40, 150, "10~70", "80%");
		drawSVG4("Average CT = 50 mins");	
	}
}
function CPI2_case3() {
	if (road == "i495") {
		drawSVG1(70, 210, 122, 220, "35~105", "60%");
		drawSVG2(60, 230, 127, 240, "30~115", "70%");
		drawSVG3(60, 250, 137, 260, "30~125", "80%");
		drawSVG4("Average CT = 71 mins");
	}
	else if (road == "i695") {
		drawSVG1(110, 180, 127, 190, "55~90", "60%");
		drawSVG2(110, 210, 139, 220, "55~105", "70%");
		drawSVG3(100, 220, 139, 230, "50~110", "80%");
		drawSVG4("Average CT = 71 mins");
	}
	else if (road == "i70") {
		drawSVG1(100, 210, 131, 220, "50~105", "70%");
		drawSVG2(90, 220, 131, 230, "45~110", "80%");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 75 mins");
	}
	else if (road == "us29") {
		drawSVG1(120, 180, 132, 190, "60~90", "70%");
		drawSVG2(120, 240, 159, 250, "60~120", "80%");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 72 mins");
	}
	else if (cluster1.includes(road)) {
		drawSVG1(110, 190, 128, 200, "55~95", "60%");
		drawSVG2(100, 200, 125, 210, "50~100", "70%");
		drawSVG3(90, 280, 160, 290, "45~140", "80%");
		drawSVG4("Average CT = 76 mins");
	}
	else if (cluster2.includes(road)) {
		drawSVG1(120, 190, 133, 200, "60~95", "60%");
		drawSVG2(120, 200, 133, 210, "60~100", "70%");
		drawSVG3(70, 260, 139, 270, "35~130", "80%");
		drawSVG4("Average CT = 77 mins");
	}
	else if (cluster3.includes(road)) {
		drawSVG1(80, 220, 123, 230, "40~110", "60%");
		drawSVG2(60, 240, 123, 250, "30~120", "70%");
		drawSVG3(60, 300, 153, 310, "30~150", "80%");
		drawSVG4("Average CT = 81 mins");
	}
	else if (cluster4.includes(road)) {
		drawSVG1(130, 180, 133, 190, "65~90", "60%");
		drawSVG2(120, 180, 123, 190, "60~100", "70%");
		drawSVG3(100, 240, 147, 250, "50~120", "80%");
		drawSVG4("Average CT = 77 mins");
	}
	else if (cluster5.includes(road)) {
		drawSVG1(110, 210, 136, 220, "55~105", "60%");
		drawSVG2(80, 220, 123, 230, "40~110", "70%");
		drawSVG3(80, 260, 144, 270, "40~130", "80%");
		drawSVG4("Average CT = 74 mins");
	}
	else if (cluster6.includes(road)) {
		drawSVG1(120, 240, 156, 250, "60~120", "60%");
		drawSVG2(80, 280, 154, 290, "40~140", "70%");
		drawSVG3(70, 300, 159, 310, "35~155", "80%");
		drawSVG4("Average CT = 117 mins");
	}
	else {
		drawSVG1(140, 240, 160, 250, "70~120", "70%");
		drawSVG2(120, 240, 150, 250, "60~120", "75%");
		drawSVG3(100, 240, 140, 250, "50~120", "85%");
		drawSVG4("Average CT = 80 mins");	
	}
}
function CPI2_case4() {
	if (road == "i495") {
		drawSVG1(240, 300, 250, 310, ">=120", "100%");
		drawSVG2(0, 0, 0, 0, "", "");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 209 mins");
	}
	else if (road == "i695") {
		drawSVG1(240, 300, 250, 310, ">=120", "100%");
		drawSVG2(0, 0, 0, 0, "", "");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 292 mins");
	}
	else if (road == "i70") {
		drawSVG1(240, 300, 250, 310, ">=120", "100%");
		drawSVG2(0, 0, 0, 0, "", "");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 247 mins");	
	}
	else if (road == "us29") {
		drawSVG1(240, 300, 250, 310, ">=120", "100%");
		drawSVG2(0, 0, 0, 0, "", "");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 197 mins");
	}
	else if (cluster1.includes(road)) {
		drawSVG1(220, 300, 240, 310, ">=110", "70%");
		drawSVG2(130, 300, 197, 310, ">=65", "80%");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 212 mins");
	}
	else if (cluster2.includes(road)) {
		drawSVG1(240, 300, 250, 310, ">=120", "100%");
		drawSVG2(130, 300, 197, 310, ">=65", "80%");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 184 mins");
	}
	else if (cluster3.includes(road)) {
		drawSVG1(240, 300, 250, 310, ">=120", "70%");
		drawSVG2(120, 300, 192, 310, ">=60", "100%");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 214 mins");
	}
	else if (cluster4.includes(road)) {
		drawSVG1(240, 300, 250, 310, ">=120", "70%");
		drawSVG2(140, 300, 200, 310, ">=70", "100%");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 276 mins");
	}
	else if (cluster5.includes(road)) {
		drawSVG1(240, 300, 250, 310, ">=120", "70%");
		drawSVG2(140, 300, 200, 310, ">=70", "100%");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 186 mins");
	}
	else if (cluster6.includes(road)) {
		drawSVG1(240, 300, 250, 310, ">=120", "70%");
		drawSVG2(120, 300, 192, 310, ">=60", "100%");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 220 mins");
	}
	else {
		drawSVG1(280, 300, 240, 310, ">=240", "60%");
		drawSVG2(240, 300, 250, 310, ">=120", "85%");
		drawSVG3(120, 300, 130, 310, ">=60", "100%");
		drawSVG4("Average CT = 210 mins");	
	}
}

function CPI3_case1() {
	if (road == "i495") {
		drawSVG1(10, 50, 12, 60, "5~25", "60%");
		drawSVG2(10, 60, 17, 70, "5~30", "70%");
		drawSVG3(10, 70, 22, 80, "5~35", "80%");
		drawSVG4("Average CT = 18 mins");
	}
	else if (road == "i695") {
		drawSVG1(10, 50, 20, 60, "5~25", "60%");
		drawSVG2(10, 60, 25, 70, "5~30", "70%");
		drawSVG3(10, 70, 30, 80, "5~35", "80%");
		drawSVG4("Average CT = 19 mins");
	}
	else if (cluster2.includes(road)) {
		drawSVG1(40, 110, 53, 120, "20~55", "60%");
		drawSVG2(30, 110, 49, 120, "15~55", "70%");
		drawSVG3(10, 130, 53, 140, "5~65", "80%");
		drawSVG4("Average CT = 33 mins");
	}
	else if (cluster3.includes(road)) {
		drawSVG1(20, 60, 20, 70, "10~30", "60%");
		drawSVG2(10, 70, 23, 80, "5~35", "70%");
		drawSVG3(10, 80, 27, 90, "5~40", "80%");
		drawSVG4("Average CT = 23 mins");
	}
	else if (cluster4.includes(road)) {
		drawSVG1(20, 50, 60, 110, "10~25", "60%");
		drawSVG2(20, 60, 70, 120, "10~30", "70%");
		drawSVG3(10, 80, 90, 140, "5~40", "80%");
		drawSVG4("Average CT = 19 mins");
	}
	else if (cluster6.includes(road)) {
		drawSVG1(10, 60, 18, 70, "5~30", "60%");
		drawSVG2(10, 100, 39, 110, "5~50", "70%");
		drawSVG3(10, 130, 53, 140, "5~65", "80%");
		drawSVG4("Average CT = 31 mins");
	}
	else {
		drawSVG1(20, 80, 28, 90, "10~40", "65%");
		drawSVG2(10, 60, 20, 80, "5~30", "70%");
		drawSVG3(10, 80, 25, 90, "5~40", "85%");
		drawSVG4("Average CT = 25 mins");
	}
}
function CPI3_case2() {
	if (road == "i495") {
		drawSVG1(40, 100, 52, 110, "20~50", "60%");
		drawSVG2(40, 110, 57, 120, "20~55", "70%");
		drawSVG3(30, 120, 57, 130, "15~60", "80%");
		drawSVG4("Average CT = 37 mins");
	}
	else if (road == "i695") {
		drawSVG1(50, 120, 70, 130, "25~60", "60%");
		drawSVG2(40, 150, 75, 160, "20~75", "70%");
		drawSVG3(30, 150, 70, 160, "15~75", "80%");
		drawSVG4("Average CT = 45 mins");
	}
	else if (cluster2.includes(road)) {
		drawSVG1(30, 110, 49, 120, "15~55", "60%");
		drawSVG2(20, 120, 49, 130, "10~60", "70%");
		drawSVG3(10, 160, 68, 170, "5~80", "80%");
		drawSVG4("Average CT = 49 mins");
	}
	else if (cluster3.includes(road)) {
		drawSVG1(30, 120, 54, 130, "15~60", "60%");
		drawSVG2(30, 130, 59, 140, "15~65", "70%");
		drawSVG3(20, 150, 68, 160, "10~75", "80%");
		drawSVG4("Average CT = 42 mins");
	}
	else if (cluster4.includes(road)) {
		drawSVG1(60, 100, 58, 110, "30~50", "60%");
		drawSVG2(60, 110, 63, 120, "30~55", "70%");
		drawSVG3(40, 170, 83, 180, "20~85", "80%");
		drawSVG4("Average CT = 45 mins");
	}
	else if (cluster6.includes(road)) {
		drawSVG1(60, 120, 68, 130, "30~60", "60%");
		drawSVG2(40, 180, 88, 190, "20~90", "70%");
		drawSVG3(30, 200, 89, 210, "15~100", "80%");
		drawSVG4("Average CT = 65 mins");
	}
	else {
		drawSVG1(60, 120, 72, 130, "30~60", "60%");
		drawSVG2(30, 120, 57, 130, "15~60", "70%");
		drawSVG3(20, 150, 67, 160, "10~75", "90%");
		drawSVG4("Average CT = 60 mins");
	}
}
function CPI3_case3() {
	if (road == "i495") {
		drawSVG1(80, 210, 127, 220, "40~105", "60%");
		drawSVG2(80, 230, 137, 240, "40~115", "70%");
		drawSVG3(70, 230, 132, 240, "30~115", "80%");
		drawSVG4("Average CT = 69 mins");
	}
	else if (road == "i695") {
		drawSVG1(120, 200, 135, 210, "60~100", "60%");
		drawSVG2(120, 210, 140, 220, "60~105", "70%");
		drawSVG3(110, 220, 140, 230, "55~110", "80%");
		drawSVG4("Average CT = 78 mins");
	}
	else if (cluster2.includes(road)) {
		drawSVG1(110, 190, 128, 200, "55~95", "60%");
		drawSVG2(100, 200, 125, 210, "50~100", "70%");
		drawSVG3(80, 240, 132, 250, "40~120", "80%");
		drawSVG4("Average CT = 74 mins");
	}
	else if (cluster3.includes(road)) {
		drawSVG1(90, 200, 121, 210, "45~100", "60%");
		drawSVG2(70, 200, 111, 210, "35~100", "70%");
		drawSVG3(70, 240, 131, 250, "35~120", "80%");
		drawSVG4("Average CT = 76 mins");
	}
	else if (cluster4.includes(road)) {
		drawSVG1(110, 150, 108, 160, "55~75", "60%");
		drawSVG2(100, 160, 108, 170, "50~80", "70%");
		drawSVG3(80, 240, 132, 250, "40~120", "80%");
		drawSVG4("Average CT = 68 mins");
	}
	else if (cluster6.includes(road)) {
		drawSVG1(120, 240, 154, 250, "60~120", "60%");
		drawSVG2(100, 270, 159, 280, "50~135", "70%");
		drawSVG3(80, 300, 164, 310, "40~150", "80%");
		drawSVG4("Average CT = 106 mins");
	}
	else {
		drawSVG1(120, 240, 180, 250, "60~120", "60%");
		drawSVG2(90, 240, 140, 250, "45~120", "70%");
		drawSVG3(50, 240, 110, 250, "25~120", "80%");
		drawSVG4("Average CT = 95 mins");
	}
}
function CPI3_case4() {
	if (road == "i495") {
		drawSVG1(240, 300, 250, 310, ">=120", "70%");
		drawSVG2(160, 300, 212, 310, ">=80", "100%");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 148 mins");
	}
	else if (road == "i695") {
		drawSVG1(240, 300, 250, 310, ">=120", "100%");
		drawSVG2(0, 0, 0, 0, "", "");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 263 mins");
	}
	else if (cluster2.includes(road)) {
		drawSVG1(240, 300, 250, 310, ">=120", "60%");
		drawSVG2(140, 300, 202, 310, ">=70", "70%");
		drawSVG3(120, 300, 192, 310, ">=60", "80%");
		drawSVG4("Average CT = 118 mins");
	}
	else if (cluster3.includes(road)) {
		drawSVG1(240, 300, 250, 310, ">=120", "70%");
		drawSVG2(120, 300, 192, 310, ">=60", "80%");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 179 mins");
	}
	else if (cluster4.includes(road)) {
		drawSVG1(240, 300, 250, 310, ">=120", "70%");
		drawSVG2(140, 300, 202, 310, ">=70", "80%");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 172 mins");
	}
	else if (cluster6.includes(road)) {
		drawSVG1(240, 300, 250, 310, ">=120", "70%");
		drawSVG2(120, 300, 192, 310, ">=60", "80%");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 180 mins");
	}
	else {
		drawSVG1(265, 300, 230, 310, ">=170", "60%");
		drawSVG2(250, 300, 200, 310, ">=140", "85%");
		drawSVG3(240, 300, 190, 310, ">=120", "100%");
		drawSVG4("Average CT = 225 mins");
	}
}

function CPD1_case1() {
	if (road == "i495") {
		drawSVG1(10, 50, 12, 60, "5~25", "60%");
		drawSVG2(10, 60, 17, 70, "5~30", "70%");
		drawSVG3(10, 70, 22, 80, "5~35", "80%");
		drawSVG4("Average CT = 19 mins");
	}
	else if (road == "i695") {
		drawSVG1(10, 60, 30, 70, "5~30", "60%");
		drawSVG2(10, 70, 35, 80, "5~35", "70%");
		drawSVG3(10, 80, 40, 90, "5~40", "80%");
		drawSVG4("Average CT = 21 mins");
	}
	else if (road == "i70") {
		drawSVG1(10, 80, 29, 90, "5~40", "70%");
		drawSVG2(10, 90, 34, 100, "5~45", "80%");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 20 mins");
	}
	else if (road == "us29") {
		drawSVG1(10, 80, 27, 90, "5~40", "60%");
		drawSVG2(10, 90, 32, 110, "5~45", "70%");
		drawSVG3(10, 120, 47, 130, "5~60", "80%");
		drawSVG4("Average CT = 24 mins");
	}
	else if (cluster1.includes(road)) {
		drawSVG1(10, 70, 23, 80, "5~35", "60%");
		drawSVG2(10, 80, 28, 90, "5~40", "70%");
		drawSVG3(10, 90, 33, 100, "5~45", "80%");
		drawSVG4("Average CT = 21 mins");
	}
	else if (cluster2.includes(road)) {
		drawSVG1(10, 70, 23, 80, "5~35", "60%");
		drawSVG2(10, 80, 28, 90, "5~40", "70%");
		drawSVG3(10, 130, 53, 140, "5~65", "80%");
		drawSVG4("Average CT = 23 mins");
	}
	else if (cluster3.includes(road)) {
		drawSVG1(10, 70, 23, 80, "5~35", "60%");
		drawSVG2(10, 80, 28, 90, "5~40", "70%");
		drawSVG3(10, 130, 53, 140, "5~65", "80%");
		drawSVG4("Average CT = 23 mins");
	}
	else if (cluster4.includes(road)) {
		drawSVG1(10, 70, 23, 80, "5~35", "60%");
		drawSVG2(10, 80, 28, 90, "5~40", "70%");
		drawSVG3(10, 130, 53, 140, "5~65", "80%");
		drawSVG4("Average CT = 22 mins");
	}
	else if (cluster5.includes(road)) {
		drawSVG1(10, 60, 18, 70, "5~30", "60%");
		drawSVG2(10, 70, 23, 80, "5~35", "70%");
		drawSVG3(10, 90, 33, 100, "5~45", "80%");
		drawSVG4("Average CT = 23 mins");
	}
	else if (cluster6.includes(road)) {
		drawSVG1(10, 60, 18, 70, "5~30", "60%");
		drawSVG2(10, 90, 32, 100, "5~45", "70%");
		drawSVG3(10, 130, 53, 140, "5~65", "80%");
		drawSVG4("Average CT = 33 mins");
	}
	else {
		drawSVG1(10, 50, 20, 60, "5~25", "60%");
		drawSVG2(10, 60, 30, 70, "5~30", "70%");
		drawSVG3(10, 70, 30, 80, "5~35", "80%");
		drawSVG4("Average CT = 25 mins");
	}
}
function CPD1_case2() {
	if (road == "i495") {
		drawSVG1(40, 120, 62, 130, "20~60", "60%");
		drawSVG2(30, 130, 62, 140, "15~65", "70%");
		drawSVG3(20, 140, 62, 150, "10~70", "80%");
		drawSVG4("Average CT = 41 mins");
	}
	else if (road == "i695") {
		drawSVG1(40, 120, 62, 130, "20~60", "60%");
		drawSVG2(30, 130, 62, 140, "15~65", "70%");
		drawSVG3(20, 140, 62, 150, "10~70", "80%");
		drawSVG4("Average CT = 41 mins");
	}
	else if (road == "i70") {
		drawSVG1(50, 130, 72, 140, "25~65", "60%");
		drawSVG2(40, 130, 67, 140, "20~65", "70%");
		drawSVG3(20, 140, 62, 150, "10~70", "80%");
		drawSVG4("Average CT = 47 mins");
	}
	else if (road == "us29") {
		drawSVG1(50, 120, 67, 130, "25~60", "60%");
		drawSVG2(40, 120, 62, 130, "20~60", "70%");
		drawSVG3(30, 120, 57, 130, "15~60", "80%");
		drawSVG4("Average CT = 39 mins");
	}
	else if (cluster1.includes(road)) {
		drawSVG1(40, 140, 68, 150, "20~70", "60%");
		drawSVG2(40, 170, 83, 180, "20~85", "70%");
		drawSVG3(30, 190, 85, 200, "15~95", "80%");
		drawSVG4("Average CT = 46 mins");
	}
	else if (cluster2.includes(road)) {
		drawSVG1(50, 120, 63, 130, "25~60", "60%");
		drawSVG2(40, 130, 63, 140, "20~65", "70%");
		drawSVG3(30, 190, 85, 200, "15~95", "80%");
		drawSVG4("Average CT = 44 mins");
	}
	else if (cluster3.includes(road)) {
		drawSVG1(50, 130, 68, 140, "25~65", "60%");
		drawSVG2(40, 140, 68, 150, "20~70", "70%");
		drawSVG3(40, 190, 90, 200, "20~95", "80%");
		drawSVG4("Average CT = 49 mins");
	}
	else if (cluster4.includes(road)) {
		drawSVG1(50, 100, 53, 110, "25~50", "60%");
		drawSVG2(40, 110, 53, 120, "20~55", "70%");
		drawSVG3(20, 150, 63, 160, "10~75", "80%");
		drawSVG4("Average CT = 39 mins");
	}
	else if (cluster5.includes(road)) {
		drawSVG1(50, 110, 58, 120, "25~55", "60%");
		drawSVG2(40, 130, 63, 140, "20~65", "70%");
		drawSVG3(30, 160, 73, 170, "15~80", "80%");
		drawSVG4("Average CT = 43 mins");
	}
	else if (cluster6.includes(road)) {
		drawSVG1(60, 120, 68, 130, "30~60", "60%");
		drawSVG2(40, 160, 78, 170, "20~80", "70%");
		drawSVG3(30, 210, 94, 220, "15~105", "80%");
		drawSVG4("Average CT = 65 mins");
	}
	else {
		drawSVG1(50, 120, 67, 130, "25~60", "60%");
		drawSVG2(30, 120, 57, 130, "15~60", "70%");
		drawSVG3(20, 120, 48, 130, "10~60", "80%");
		drawSVG4("Average CT = 50 mins");
	}
}
function CPD1_case3() {
	if (road == "i495") {
		drawSVG1(120, 210, 147, 220, "60~105", "60%");
		drawSVG2(120, 220, 152, 230, "60~110", "70%");
		drawSVG3(110, 230, 152, 240, "55~115", "80%");
		drawSVG4("Average CT = 71 mins");
	}
	else if (road == "i695") {
		drawSVG1(110, 180, 127, 190, "55~90", "60%");
		drawSVG2(110, 200, 134, 210, "55~100", "70%");
		drawSVG3(100, 230, 144, 240, "50~115", "80%");
		drawSVG4("Average CT = 68 mins");
	}
	else if (road == "i70") {
		drawSVG1(120, 190, 137, 200, "60~95", "70%");
		drawSVG2(110, 190, 132, 200, "55~95", "80%");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 76 mins");
	}
	else if (road == "us29") {
		drawSVG1(150, 210, 159, 220, "75~105", "60%");
		drawSVG2(140, 220, 159, 130, "70~110", "70%");
		drawSVG3(120, 240, 159, 150, "60~120", "80%");
		drawSVG4("Average CT = 90 mins");
	}
	else if (cluster1.includes(road)) {
		drawSVG1(60, 180, 98, 190, "30~90", "60%");
		drawSVG2(60, 190, 103, 200, "30~95", "70%");
		drawSVG3(60, 240, 128, 250, "30~120", "80%");
		drawSVG4("Average CT = 64 mins");
	}
	else if (cluster2.includes(road)) {
		drawSVG1(100, 180, 118, 190, "50~90", "60%");
		drawSVG2(90, 180, 113, 190, "45~90", "70%");
		drawSVG3(80, 270, 149, 280, "40~135", "80%");
		drawSVG4("Average CT = 71 mins");
	}
	else if (cluster3.includes(road)) {
		drawSVG1(110, 210, 136, 220, "55~105", "60%");
		drawSVG2(90, 250, 146, 260, "45~125", "70%");
		drawSVG3(60, 270, 141, 280, "30~135", "80%");
		drawSVG4("Average CT = 83 mins");
	}
	else if (cluster4.includes(road)) {
		drawSVG1(100, 190, 123, 200, "50~95", "60%");
		drawSVG2(100, 200, 125, 210, "50~100", "70%");
		drawSVG3(70, 240, 131, 250, "35~120", "80%");
		drawSVG4("Average CT = 72 mins");
	}
	else if (cluster5.includes(road)) {
		drawSVG1(150, 180, 100, 190, "75~90", "60%");
		drawSVG2(150, 190, 100, 200, "75~95", "70%");
		drawSVG3(120, 240, 62, 250, "60~120", "80%");
		drawSVG4("Average CT = 83 mins");
	}
	else if (cluster6.includes(road)) {
		drawSVG1(120, 240, 156, 250, "60~120", "60%");
		drawSVG2(80, 250, 137, 260, "40~125", "80%");
		drawSVG3(80, 300, 164, 310, "40~165", "80%");
		drawSVG4("Average CT = 111 mins");
	}
	else {
		drawSVG1(110, 240, 154, 250, "55~120", "60%");
		drawSVG2(90, 240, 144, 250, "45~120", "70%");
		drawSVG3(60, 240, 129, 250, "30~120", "80%");
		drawSVG4("Average CT = 95 mins");
	}
}
function CPD1_case4() {
	if (road == "i495") {
		drawSVG1(240, 300, 250, 310, ">=120", "100%");
		drawSVG2(0, 0, 0, 0, "", "");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 149 mins");
	}
	else if (road == "i695") {
		drawSVG1(240, 300, 250, 310, ">=120", "100%");
		drawSVG2(0, 0, 0, 0, "", "");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 156 mins");
	}
	else if (road == "i70") {
		drawSVG1(200, 300, 252, 310, ">=100", "60%");
		drawSVG2(190, 300, 247, 310, ">=95", "70%");
		drawSVG3(170, 300, 237, 310, ">=85", "80%");
		drawSVG4("Average CT = 175 mins");
	}
	else if (road == "us29") {
		drawSVG1(240, 300, 250, 310, ">=120", "100%");
		drawSVG2(0, 0, 0, 0, "", "");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 209 mins");
	}
	else if (cluster1.includes(road)) {
		drawSVG1(240, 300, 250, 310, ">=120", "70%");
		drawSVG2(140, 300, 200, 310, ">=70", "100%");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 132 mins");
	}
	else if (cluster2.includes(road)) {
		drawSVG1(240, 300, 250, 310, ">=120", "70%");
		drawSVG2(110, 300, 188, 310, ">=55", "100%");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 170 mins");
	}
	else if (cluster3.includes(road)) {
		drawSVG1(240, 300, 250, 310, ">=120", "70%");
		drawSVG2(120, 300, 192, 310, ">=60", "100%");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 201 mins");
	}
	else if (cluster4.includes(road)) {
		drawSVG1(240, 300, 250, 310, ">=120", "70%");
		drawSVG2(140, 300, 200, 310, ">=70", "100%");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 139 mins");
	}
	else if (cluster5.includes(road)) {
		drawSVG1(240, 300, 250, 310, ">=120", "70%");
		drawSVG2(140, 300, 200, 310, ">=70", "100%");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 140 mins");
	}
	else if (cluster6.includes(road)) {
		drawSVG1(240, 300, 250, 310, ">=120", "70%");
		drawSVG2(120, 300, 192, 310, ">=60", "100%");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 235 mins");
	}
	else {
		drawSVG1(240, 300, 250, 310, ">=120", "60%");
		drawSVG2(200, 300, 220, 310, ">=100", "100%");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 135 mins");
	}		
}

function CPD2_case1() {
	if (road == "i495") {
		drawSVG1(10, 50, 12, 60, "5~25", "60%");
		drawSVG2(10, 60, 17, 70, "5~30", "70%");
		drawSVG3(10, 70, 22, 80, "5~35", "80%");
		drawSVG4("Average CT = 18 mins");
	}
	else if (road == "i695") {
		drawSVG1(10, 60, 18, 70, "5~30", "60%");
		drawSVG2(10, 70, 28, 80, "5~35", "70%");
		drawSVG3(10, 80, 40, 90, "5~40", "80%");
		drawSVG4("Average CT = 22 mins");
	}
	else if (road == "i70") {
		drawSVG1(20, 70, 25, 80, "10~35", "60%");
		drawSVG2(10, 70, 22, 80, "5~35", "70%");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 19 mins");
	}
	else if (road == "us29") {
		drawSVG1(10, 80, 27, 70, "5~40", "70%");
		drawSVG2(10, 90, 32, 100, "5~45", "80%");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 21 mins");
	}
	else if (cluster1.includes(road)) {
		drawSVG1(10, 80, 27, 90, "5~40", "60%");
		drawSVG2(10, 90, 32, 100, "5~45", "70%");
		drawSVG3(10, 140, 67, 150, "5~70", "80%");
		drawSVG4("Average CT = 25 mins");
	}
	else if (cluster2.includes(road)) {
		drawSVG1(10, 60, 18, 70, "5~30", "60%");
		drawSVG2(10, 70, 23, 80, "5~35", "70%");
		drawSVG3(10, 100, 38, 110, "5~50", "80%");
		drawSVG4("Average CT = 25 mins");
	}
	else if (cluster3.includes(road)) {
		drawSVG1(20, 60, 20, 70, "10~30", "60%");
		drawSVG2(10, 80, 28, 90, "5~40", "70%");
		drawSVG3(10, 90, 33, 100, "5~45", "80%");
		drawSVG4("Average CT = 25 mins");
	}
	else if (cluster4.includes(road)) {
		drawSVG1(10, 60, 18, 70, "5~30", "60%");
		drawSVG2(10, 70, 23, 80, "5~35", "70%");
		drawSVG3(10, 100, 37, 110, "5~50", "80%");
		drawSVG4("Average CT = 19 mins");
	}
	else if (cluster5.includes(road)) {
		drawSVG1(20, 60, 20, 80, "10~30", "60%");
		drawSVG2(10, 60, 18, 70, "5~30", "70%");
		drawSVG3(10, 90, 33, 100, "5~45", "80%");
		drawSVG4("Average CT = 18 mins");
	}
	else if (cluster6.includes(road)) {
		drawSVG1(10, 60, 18, 70, "5~30", "60%");
		drawSVG2(10, 90, 32, 100, "5~45", "70%");
		drawSVG3(10, 160, 68, 170, "5~80", "80%");
		drawSVG4("Average CT = 40 mins");
	}
	else {
		drawSVG1(10, 40, 50, 80, "5~20", "65%");
		drawSVG2(10, 60, 20, 90, "5~30", "75%");
		drawSVG3(10, 70, 20, 100, "5~35", "80%");
		drawSVG4("Average CT = 30 mins");
	}	
}
function CPD2_case2() {
	if (road == "i495") {
		drawSVG1(40, 110, 57, 120, "20~55", "60%");
		drawSVG2(40, 120, 62, 130, "20~60", "70%");
		drawSVG3(30, 150, 72, 160, "15~75", "80%");
		drawSVG4("Average CT = 39 mins");
	}
	else if (road == "i695") {
		drawSVG1(50, 100, 57, 110, "25~50", "60%");
		drawSVG2(40, 110, 57, 120, "20~55", "70%");
		drawSVG3(40, 140, 72, 150, "20~70", "80%");
		drawSVG4("Average CT = 42 mins");
	}
	else if (road == "i70") {
		drawSVG1(70, 130, 82, 140, "35~65", "60%");
		drawSVG2(60, 140, 82, 150, "30~70", "70%");
		drawSVG3(50, 140, 77, 150, "25~70", "80%");
		drawSVG4("Average CT = 48 mins");
	}
	else if (road == "us29") {
		drawSVG1(30, 130, 62, 140, "15~65", "60%");
		drawSVG2(30, 140, 67, 150, "15~70", "70%");
		drawSVG3(30, 170, 82, 180, "15~85", "80%");
		drawSVG4("Average CT = 41 mins");
	}
	else if (cluster1.includes(road)) {
		drawSVG1(40, 110, 53, 120, "20~55", "60%");
		drawSVG2(30, 130, 58, 140, "15~65", "70%");
		drawSVG3(20, 160, 68, 170, "10~80", "80%");
		drawSVG4("Average CT = 51 mins");
	}
	else if (cluster2.includes(road)) {
		drawSVG1(50, 120, 64, 130, "25~60", "60%");
		drawSVG2(40, 140, 67, 150, "20~70", "70%");
		drawSVG3(20, 160, 67, 170, "10~80", "80%");
		drawSVG4("Average CT = 45 mins");
	}
	else if (cluster3.includes(road)) {
		drawSVG1(40, 120, 59, 130, "20~60", "60%");
		drawSVG2(30, 140, 62, 150, "15~70", "70%");
		drawSVG3(20, 170, 72, 180, "10~85", "80%");
		drawSVG4("Average CT = 50 mins");
	}
	else if (cluster4.includes(road)) {
		drawSVG1(50, 110, 58, 120, "25~55", "60%");
		drawSVG2(50, 120, 63, 130, "25~60", "70%");
		drawSVG3(30, 140, 63, 150, "15~70", "80%");
		drawSVG4("Average CT = 41 mins");
	}
	else if (cluster5.includes(road)) {
		drawSVG1(30, 120, 53, 130, "15~60", "60%");
		drawSVG2(20, 120, 49, 130, "10~60", "70%");
		drawSVG3(10, 150, 62, 160, "5~75", "80%");
		drawSVG4("Average CT = 41 mins");
	}
	else if (cluster6.includes(road)) {
		drawSVG1(60, 120, 68, 130, "30~60", "60%");
		drawSVG2(50, 160, 83, 170, "25~80", "70%");
		drawSVG3(30, 200, 89, 210, "15~100", "80%");
		drawSVG4("Average CT = 79 mins");
	}
	else {
		drawSVG1(40, 120, 60, 130, "20~60", "65%");
		drawSVG2(20, 120, 48, 130, "10~60", "70%");
		drawSVG3(20, 140, 40, 150, "10~70", "75%");
		drawSVG4("Average CT = 50 mins");
	}		
}
function CPD2_case3() {
	if (road == "i495") {
		drawSVG1(120, 170, 127, 180, "60~85", "60%");
		drawSVG2(90, 180, 117, 190, "45~90", "70%");
		drawSVG3(90, 200, 127, 210, "45~100", "80%");
		drawSVG4("Average CT = 66 mins");
	}
	else if (road == "i695") {
		drawSVG1(120, 190, 140, 200, "60~95", "60%");
		drawSVG2(120, 220, 150, 230, "60~110", "70%");
		drawSVG3(120, 240, 160, 250, "60~120", "80%");
		drawSVG4("Average CT = 75 mins");
	}
	else if (road == "i70") {
		drawSVG1(120, 220, 146, 230, "60~110", "60%");
		drawSVG2(110, 230, 146, 240, "55~115", "70%");
		drawSVG3(100, 230, 141, 240, "50~115", "80%");
		drawSVG4("Average CT = 86 mins");
	}
	else if (road == "us29") {
		drawSVG1(120, 200, 139, 210, "60~100", "60%");
		drawSVG2(120, 210, 144, 220, "60~105", "70%");
		drawSVG3(120, 240, 159, 250, "60~120", "80%");
		drawSVG4("Average CT = 80 mins");
	}
	else if (cluster1.includes(road)) {
		drawSVG1(60, 150, 83, 160, "30~75", "60%");
		drawSVG2(50, 160, 83, 170, "25~80", "70%");
		drawSVG3(40, 240, 118, 250, "20~120", "80%");
		drawSVG4("Average CT = 52 mins");
	}
	else if (cluster2.includes(road)) {
		drawSVG1(120, 210, 139, 220, "60~105", "60%");
		drawSVG2(120, 220, 144, 230, "60~110", "70%");
		drawSVG3(80, 260, 144, 270, "40~130", "80%");
		drawSVG4("Average CT = 84 mins");
	}
	else if (cluster3.includes(road)) {
		drawSVG1(60, 220, 116, 230, "30~110", "60%");
		drawSVG2(60, 250, 131, 260, "30~125", "70%");
		drawSVG3(40, 280, 136, 290, "20~140", "80%");
		drawSVG4("Average CT = 74 mins");
	}
	else if (cluster4.includes(road)) {
		drawSVG1(120, 170, 123, 180, "60~85", "60%");
		drawSVG2(110, 180, 123, 190, "55~90", "70%");
		drawSVG3(90, 240, 139, 250, "45~120", "80%");
		drawSVG4("Average CT = 73 mins");
	}
	else if (cluster5.includes(road)) {
		drawSVG1(70, 190, 108, 200, "35~95", "60%");
		drawSVG2(50, 210, 104, 220, "25~105", "70%");
		drawSVG3(40, 240, 113, 250, "20~120", "80%");
		drawSVG4("Average CT = 64 mins");
	}
	else if (cluster6.includes(road)) {
		drawSVG1(120, 240, 156, 250, "60~120", "60%");
		drawSVG2(80, 280, 154, 290, "40~140", "70%");
		drawSVG3(60, 300, 154, 310, "30~155", "80%");
		drawSVG4("Average CT = 126s mins");
	}
	else {
		drawSVG1(150, 240, 170, 250, "75~120", "60%");
		drawSVG2(140, 240, 160, 250, "70~120", "80%");
		drawSVG3(130, 240, 150, 250, "65~120", "100%");
		drawSVG4("Average CT = 85 mins");
	}
}
function CPD2_case4() {
	if (road == "i495") {
		drawSVG1(240, 300, 250, 310, ">=120", "80%");
		drawSVG2(200, 300, 232, 310, ">=100", "100%");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 178 mins");
	}
	else if (road == "i695") {
		drawSVG1(240, 300, 250, 310, ">=120", "100%");
		drawSVG2(0, 0, 0, 0, "", "");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 182 mins");
	}
	else if (road == "i70") {
		drawSVG1(240, 300, 250, 310, ">=120", "100%");
		drawSVG2(0, 0, 0, 0, "", "");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 154 mins");
	}
	else if (road == "us29") {
		drawSVG1(240, 300, 250, 310, ">=120", "100%");
		drawSVG2(0, 0, 0, 0, "", "");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 190 mins");
	}
	else if (cluster1.includes(road)) {
		drawSVG1(240, 300, 250, 310, ">=120", "70%");
		drawSVG2(140, 300, 200, 310, ">=70", "100%");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 394 mins");
	}
	else if (cluster2.includes(road)) {
		drawSVG1(240, 300, 250, 310, ">=120", "70%");
		drawSVG2(140, 300, 200, 310, ">=70", "100%");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 248 mins");
	}
	else if (cluster3.includes(road)) {
		drawSVG1(240, 300, 250, 310, ">=120", "70%");
		drawSVG2(140, 300, 200, 310, ">=70", "100%");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 223 mins");
	}
	else if (cluster4.includes(road)) {
		drawSVG1(240, 300, 250, 310, ">=120", "70%");
		drawSVG2(140, 300, 200, 310, ">=70", "100%");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 129 mins");
	}
	else if (cluster5.includes(road)) {
		drawSVG1(240, 300, 250, 310, ">=120", "70%");
		drawSVG2(120, 300, 192, 310, ">=60", "100%");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 238 mins");
	}
	else if (cluster6.includes(road)) {
		drawSVG1(240, 300, 250, 310, ">=120", "70%");
		drawSVG2(120, 300, 192, 310, ">=60", "100%");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 252 mins");
	}
	else {
		drawSVG1(240, 300, 250, 310, ">=120", "100%");
		drawSVG2(0, 0, 0, 0, "", "");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 200 mins");
	}
}

function CPD3_case1() {
	if (road == "i495") {
		drawSVG1(10, 50, 12, 60, "5~25", "60%");
		drawSVG2(10, 60, 17, 70, "5~30", "70%");
		drawSVG3(10, 60, 17, 70, "5~30", "80%");
		drawSVG4("Average CT = 17 mins");
	}
	else if (road == "i695") {
		drawSVG1(10, 60, 20, 70, "10~30", "60%");
		drawSVG2(10, 60, 20, 70, "10~30", "70%");
		drawSVG3(10, 60, 20, 70, "10~30", "80%");
		drawSVG4("Average CT = 20 mins");
	}
	else if (cluster2.includes(road)) {
		drawSVG1(10, 30, 40, 80, "5~15", "60%");
		drawSVG2(10, 40, 50, 90, "5~20", "70%");
		drawSVG3(10, 70, 80, 120, "5~35", "80%");
		drawSVG4("Average CT = 10 mins");
	}
	else if (cluster3.includes(road)) {
		drawSVG1(30, 70, 30, 80, "15~35", "60%");
		drawSVG2(30, 120, 55, 130, "15~60", "70%");
		drawSVG3(30, 170, 80, 180, "15~85", "80%");
		drawSVG4("Average CT = 36 mins");
	}
	else if (cluster4.includes(road)) {
		drawSVG1(10, 60, 18, 70, "5~30", "60%");
		drawSVG2(10, 70, 23, 80, "5~35", "70%");
		drawSVG3(10, 90, 33, 100, "5~45", "80%");
		drawSVG4("Average CT = 18 mins");
	}
	else if (cluster6.includes(road)) {
		drawSVG1(20, 60, 20, 80, "10~30", "60%");
		drawSVG2(20, 70, 25, 80, "10~35", "70%");
		drawSVG3(10, 150, 62, 160, "5~75", "80%");
		drawSVG4("Average CT = 45 mins");
	}
	else {
		drawSVG1(10, 50, 20, 60, "5~25", "60%");
		drawSVG2(10, 60, 30, 70, "5~30", "75%");
		drawSVG3(10, 70, 30, 80, "5~35", "80%");
		drawSVG4("Average CT = 20 mins");
	}
}
function CPD3_case2() {
	if (road == "i495") {
		drawSVG1(40, 100, 52, 110, "20~50", "60%");
		drawSVG2(40, 110, 57, 120, "20~55", "70%");
		drawSVG3(40, 120, 62, 130, "20~60", "80%");
		drawSVG4("Average CT = 39 mins");
	}
	else if (road == "i695") {
		drawSVG1(40, 100, 60, 110, "20~50", "60%");
		drawSVG2(40, 110, 60, 120, "20~55", "70%");
		drawSVG3(40, 120, 60, 130, "20~60", "80%");
		drawSVG4("Average CT = 38 mins");
	}
	else if (cluster2.includes(road)) {
		drawSVG1(20, 110, 45, 120, "10~55", "60%");
		drawSVG2(10, 120, 48, 130, "5~60", "70%");
		drawSVG3(10, 140, 58, 150, "5~70", "80%");
		drawSVG4("Average CT = 35 mins");
	}
	else if (cluster3.includes(road)) {
		drawSVG1(10, 100, 37, 110, "5~50", "60%");
		drawSVG2(10, 110, 42, 120, "5~55", "70%");
		drawSVG3(10, 150, 62, 160, "5~75", "80%");
		drawSVG4("Average CT = 33 mins");
	}
	else if (cluster4.includes(road)) {
		drawSVG1(40, 110, 53, 120, "20~55", "60%");
		drawSVG2(30, 110, 49, 120, "15~55", "70%");
		drawSVG3(20, 140, 58, 150, "10~70", "80%");
		drawSVG4("Average CT = 35 mins");
	}
	else if (cluster6.includes(road)) {
		drawSVG1(60, 120, 68, 130, "30~60", "60%");
		drawSVG2(40, 200, 94, 210, "20~100", "70%");
		drawSVG3(40, 260, 124, 270, "20~130", "80%");
		drawSVG4("Average CT = 64 mins");
	}
	else {
		drawSVG1(40, 120, 60, 130, "20~60", "60%");
		drawSVG2(30, 130, 50, 140, "15~65", "70%");
		drawSVG3(20, 140, 40, 150, "10~70", "80%");
		drawSVG4("Average CT = 60 mins");
	}
}
function CPD3_case3() {
	if (road == "i495") {
		drawSVG1(120, 190, 137, 200, "60~95", "60%");
		drawSVG2(110, 210, 142, 220, "55~105", "70%");
		drawSVG3(110, 240, 157, 250, "55~120", "80%");
		drawSVG4("Average CT = 78 mins");
	}
	else if (road == "i695") {
		drawSVG1(120, 180, 132, 190, "60~90", "60%");
		drawSVG2(120, 190, 137, 200, "60~95", "70%");
		drawSVG3(110, 200, 137, 210, "55~100", "80%");
		drawSVG4("Average CT = 76 mins");
	}
	else if (cluster2.includes(road)) {
		drawSVG1(140, 170, 175, 230, "70~85", "60%");
		drawSVG2(120, 190, 195, 250, "60~95", "70%");
		drawSVG3(100, 240, 245, 310, "50~120", "80%");
		drawSVG4("Average CT = 77 mins");
	}
	else if (cluster3.includes(road)) {
		drawSVG1(120, 240, 156, 250, "60~120", "60%");
		drawSVG2(110, 290, 176, 300, "55~145", "70%");
		drawSVG3(90, 300, 171, 310, "45~150", "80%");
		drawSVG4("Average CT = 111 mins");
	}
	else if (cluster4.includes(road)) {
		drawSVG1(110, 150, 108, 160, "55~75", "60%");
		drawSVG2(100, 170, 113, 180, "50~85", "70%");
		drawSVG3(70, 235, 132, 250, "35~120", "80%");
		drawSVG4("Average CT = 69 mins");
	}
	else if (cluster6.includes(road)) {
		drawSVG1(120, 240, 156, 250, "60~120", "60%");
		drawSVG2(50, 260, 129, 270, "25~130", "70%");
		drawSVG3(40, 300, 144, 310, "20~150", "80%");
		drawSVG4("Average CT = 100 mins");
	}
	else {
		drawSVG1(120, 240, 156, 250, "60~120", "70%");
		drawSVG2(110, 240, 155, 250, "55~120", "85%");
		drawSVG3(40, 240, 120, 250, "20~120", "100%");
		drawSVG4("Average CT = 65 mins");
	}
}
function CPD3_case4() {
	if (road == "i495") {
		drawSVG1(240, 300, 250, 310, ">=120", "90%");
		drawSVG2(220, 300, 242, 310, ">=110", "100%");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 153 mins");
	}
	else if (road == "i695") {
		drawSVG1(240, 300, 250, 310, ">=120", "100%");
		drawSVG2(0, 0, 0, 0, "", "");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 221 mins");
	}
	else if (cluster2.includes(road)) {
		drawSVG1(240, 300, 250, 310, ">=120", "70%");
		drawSVG2(140, 300, 200, 310, ">=70", "100%");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 178 mins");
	}
	else if (cluster3.includes(road)) {
		drawSVG1(240, 300, 250, 310, ">=120", "70%");
		drawSVG2(140, 300, 200, 310, ">=70", "100%");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 254 mins");
	}
	else if (cluster4.includes(road)) {
		drawSVG1(240, 300, 250, 310, ">=120", "70%");
		drawSVG2(140, 300, 200, 310, ">=70", "100%");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 155 mins");
	}
	else if (cluster6.includes(road)) {
		drawSVG1(240, 300, 250, 310, ">=120", "70%");
		drawSVG2(120, 300, 192, 310, ">=60", "100%");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 275 mins");
	}
	else {
		drawSVG1(240, 300, 250, 310, ">=120", "100%");
		drawSVG2(0, 0, 0, 0, "", "");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 260 mins");
	}
}

function shoulder_case1() {
	drawSVG1(0, 60, 20, 70, "<30", "75%");
	drawSVG2(0, 0, 0, 0, "", "");
	drawSVG3(0, 0, 0, 0, "", "");
	drawSVG4("");
}
function shoulder_case2() {
	drawSVG1(60, 300, 80, 310, ">=30", "75%");
	drawSVG2(0, 0, 0, 0, "", "");
	drawSVG3(0, 0, 0, 0, "", "");
	drawSVG4("");
}
function shoulder_case3() {
	drawSVG1(20, 100, 40, 110, "10~50", "75%");
	drawSVG2(0, 0, 0, 0, "", "");
	drawSVG3(0, 0, 0, 0, "", "");
	drawSVG4("");
}

function CF_case1() {
	$("#first_stop").text("100min");
	$("#second_stop").text("200min");
	$("#fourth_stop").text("400min");

	if (road == "i495") {
		drawSVG1(60, 126, 75, 136, "100~210", "50%");
		drawSVG2(0, 0, 0, 0, "", "");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 100 mins");
	}
	else if (road == "i695") {
		drawSVG1(96, 114, 124, 250, "160~190", "70%");
		drawSVG2(93, 120, 130, 250, "155~200", "80%");
		drawSVG3(90, 141, 151, 250, "150~235", "100%");
		drawSVG4("Average CT = 183 mins");
	}
	else if (road == "i70") {
		drawSVG1(126, 195, 132, 205, "210~325", "70%");
		drawSVG2(123, 207, 137, 217, "205~345", "80%");
		drawSVG3(120, 216, 140, 226, "200~360", "100%");
		drawSVG4("Average CT = 272 mins");
	}
	else if (road == "us29") {
		$("#first_stop").text("30min");
		$("#second_stop").text("60min");
		$("#fourth_stop").text("120min");

		drawSVG1(0, 120, 42, 130, "0~200", "100%");
		drawSVG2(0, 0, 0, 0, "", "");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 124 mins");
	}
	else if (cluster1.includes(road)) {
		$("#first_stop").text("30min");
		$("#second_stop").text("60min");
		$("#fourth_stop").text("120min");

		drawSVG1(60, 300, 155, 310, "30~150", "60%");
		drawSVG2(60, 300, 155, 310, "30~175", "70%");
		drawSVG3(40, 300, 145, 310, "20~195", "80%");
		drawSVG4("Average CT = 109 mins");
	}
	else if (cluster2.includes(road)) {
		drawSVG1(78, 102, 107, 172, "130~170", "60%");
		drawSVG2(72, 108, 113, 178, "120~180", "70%");
		drawSVG3(60, 120, 125, 190, "100~200", "80%");
		drawSVG4("Average CT = 153 mins");
	}
	else if (cluster3.includes(road)) {
		drawSVG1(78, 132, 137, 202, "130~220", "60%");
		drawSVG2(78, 138, 143, 208, "130~230", "70%");
		drawSVG3(72, 162, 167, 232, "120~270", "80%");
		drawSVG4("Average CT = 187 mins");
	}
	else if (cluster4.includes(road)) {
		$("#first_stop").text("30min");
		$("#second_stop").text("60min");
		$("#fourth_stop").text("120min");

		drawSVG1(260, 300, 190, 310, "130~155", "60%");
		drawSVG2(250, 300, 180, 310, "125~155", "70%");
		drawSVG3(240, 300, 170, 310, "120~155", "80%");
		drawSVG4("Average CT = 141 mins");
	}
	else if (cluster5.includes(road)) {
		$("#first_stop").text("30min");
		$("#second_stop").text("60min");
		$("#fourth_stop").text("120min");

		drawSVG1(180, 240, 183, 250, "90~120", "60%");
		drawSVG2(150, 250, 173, 260, "75~125", "70%");
		drawSVG3(130, 270, 173, 280, "65~135", "80%");
		drawSVG4("Average CT = 102 mins");
	}
	else if (cluster6.includes(road)) {
		drawSVG1(72, 138, 75, 148, "120~230", "60%");
		drawSVG2(60, 150, 75, 160, "100~250", "70%");
		drawSVG3(51, 186, 92, 196, "85~310", "80%");
		drawSVG4("Average CT = 179 mins");
	}
	else {
		drawSVG1(90, 126, 136, 250, "150~210", "70%");
		drawSVG2(90, 162, 100, 250, "150~270", "80%");
		drawSVG3(36, 162, 56, 250, "60~270", "100%");
		drawSVG4("Average CT = 170 mins");
	}
}
function CF_case2() {
	$("#first_stop").text("100min");
	$("#second_stop").text("200min");
	$("#fourth_stop").text("400min");

	if (road == "i495") {
		drawSVG1(90, 126, 136, 192, "150~210", "100%");
		drawSVG2(0, 0, 0, 0, "", "");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 180 mins");
	}
	else if (road == "i695") {
		drawSVG1(120, 300, 180, 310, ">=200", "100%");
		drawSVG2(0, 0, 0, 0, "", "");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 330 mins");
	}
	else if (road == "i70") {
		drawSVG1(240, 300, 254, 310, ">=400", "100%");
		drawSVG2(0, 0, 0, 0, "", "");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 543 mins");
	}
	else if (road == "us29") {
		drawSVG1(120, 300, 180, 310, ">=200", "100%");
		drawSVG2(0, 0, 0, 0, "", "");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 333 mins");
	}
	else if (cluster1.includes(road)) {
		drawSVG1(90, 300, 175, 310, ">=150", "100%");
		drawSVG2(0, 0, 0, 0, "", "");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 170 mins");
	}
	else if (cluster2.includes(road)) {
		drawSVG1(120, 300, 180, 310, ">=200", "70%");
		drawSVG2(72, 300, 166, 310, ">=120", "100%");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 235 mins");
	}
	else if (cluster3.includes(road)) {
		drawSVG1(120, 300, 180, 310, ">=200", "70%");
		drawSVG2(72, 300, 166, 310, ">=120", "100%");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 266 mins");
	}
	else if (cluster4.includes(road)) {
		drawSVG1(96, 300, 178, 310, ">=160", "70%");
		drawSVG2(72, 300, 166, 310, ">=120", "100%");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 226 mins");
	}
	else if (cluster5.includes(road)) {
		drawSVG1(99, 300, 179, 310, ">=165", "70%");
		drawSVG2(66, 300, 163, 310, ">=110", "100%");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 226 mins");
	}
	else if (cluster6.includes(road)) {
		drawSVG1(120, 300, 180, 310, ">=200", "70%");
		drawSVG2(60, 300, 150, 310, ">=100", "100%");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 258 mins");
	}
	else {
		drawSVG1(126, 162, 172, 250, "210~270", "70%");
		drawSVG2(126, 180, 190, 250, "210~300", "80%");
		drawSVG3(18, 180, 38, 250, "30~300", "100%");
		drawSVG4("Average CT = 210 mins");
	}
}
function CF_case3() {
	$("#first_stop").text("100min");
	$("#second_stop").text("200min");
	$("#fourth_stop").text("400min");

	if (road == "i495") {
		drawSVG1(90, 156, 97, 166, "150~260", "70%");
		drawSVG2(90, 195, 117, 205, "150~325", "80%");
		drawSVG3(90, 252, 145, 262, "150~420", "100%");
		drawSVG4("Average CT = 240 mins");
	}
	else {
		drawSVG1(126, 162, 176, 250, "210~270", "75%");
		drawSVG2(108, 162, 176, 250, "180~270", "100%");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 230 mins");
	}
}
function CF_case4() {
	$("#first_stop").text("100min");
	$("#second_stop").text("200min");
	$("#fourth_stop").text("400min");

	if (road == "i495") {
		drawSVG1(108, 162, 105, 180, "180~270", "100%");
		drawSVG2(0, 0, 0, 0, "", "");
		drawSVG3(0, 0, 0, 0, "", "");
		drawSVG4("Average CT = 200 mins");
	}
	else { 
		drawSVG1(198, 270, 210, 280, "330~450", "60%");
		drawSVG2(198, 288, 218, 298, "330~480", "80%");
		drawSVG3(72, 288, 92, 298, "120~480", "100%");
		drawSVG4("Average CT = 350 mins");
	}
}