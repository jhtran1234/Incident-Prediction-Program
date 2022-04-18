"use strict";

var model = {"real-time": null, "historical": null, "flow_rate":null, "duration":null, "lanes":null, "open_lanes":null, "historical_volume":null, "speed_upstream":null, "peak_hour": null};

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
var timepickers;


$(document).ready(function(){
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
	 
	getDate();
	my_getTime();

	$('#data_source_radio1').click(function() {
		$("#secondary_radios").hide();
		$("#Save-1").removeAttr("disabled");
	});
	$('#data_source_radio2').click(function() {
		$("#secondary_radios").show();
		document.getElementById("Save-1").disabled = true;
		if($('#historical_radio1').prop('checked') || $('#historical_radio2').prop('checked')){
			document.getElementById("Save-1").disabled = false;
		}
	});
	$('#secondary_radios').click(function() {
		$("#Save-1").removeAttr("disabled");
	});

	//$("button[name='save']").click(printSum);
	//$("button[name='save']").click(printTime);
	

	$("#Save-1").click(function(){
		$("#Next-1").removeAttr("disabled");
		data_source_radio1
		if($('#data_source_radio1').prop('checked')){
			model['real-time'] = true;
		}
		else if($('#data_source_radio2').prop('checked')){
			if($('#historical_radio1').prop('checked')){
				model['real-time'] = false;
				model['historical'] = true;
			}
			else if($('#historical_radio2').prop('checked')){
				model['real-time'] = false;
				model['historical'] = false;
			}
			else{
				alert("Error, please reselect data source.")
			}
		}
		else{
			alert("Error, please reselect data source.")
		}
	});
	$("#Save-2").click(function(){
		$("#Next-2").removeAttr("disabled");
	});
	$("#Save-3").click(function(){
		$("#Next-3").removeAttr("disabled");
	});

	// next button handler	
	$("#Next-1").click(function(){
		$('.ui.menu').find('.item').tab('change tab', '2');
	});

	$("#Next-2").click(function(){
		$('.ui.menu').find('.item').tab('change tab', '3');
	});

	// back button handler
	$("#Back-2").click(function(){
		$('.ui.menu').find('.item').tab('change tab', '1');
	});
	$("#Back-3").click(function(){
		$('.ui.menu').find('.item').tab('change tab', '2');
	});
});

function getDate(){
	// selecting the button and adding a click event
	$("#Save-9").click(function() {
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
		if (winter_months.includes(month)){
			model['season_time'] = 'Winter';
		}
		else if (spring_months.includes(month)){
			model['season_time'] = 'Spring';
		}
		else if (summer_months.includes(month)){
			model['season_time'] = 'Summer';
		}
		else if (fall_months.includes(month)){
			model['season_time'] = 'Fall';
		}
		
		console.log(model['season_time']);
		console.log(model);
	
		if(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].includes(dayOfWeek)){
			model['weekend_time'] = 'Weekday';
		}
		else if(['Saturday', 'Sunday'].includes(dayOfWeek)){
			model['weekend_time'] = 'Weekend';		
		}
		console.log(model['weekend_time']);
		console.log(model);

		// Consult for federal holidays https:// www.opm.gov/policy-data-oversight/pay-leave/federal-holidays/
		// Careful to consider that some holidays have floating days, and others have observed days when they fall on weekends
		if(((month == '01')&&(day == '01')) || ((month == '01')&&(day == '02')) || ((month == '07')&&(day == '04')) || ((month == '11')&&(day == '11')) || ((month == '12')&&(day == '25'))){
			nonholiday = 1;
			nonholiday_sh = 0;
			console.log(nonholiday);
			model['holiday_time'] = 'Holiday';
		}
		// holidays below are floating days and are observed on different days each year
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
	
	console.log(model['weekend_time']);
	if(model['weekend_time'] == 'Weekday'){
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
	else if(model['weekend_time'] == 'Weekend'){
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

// Used to draw the labels in the bottom right corner
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
	// update average time line
	$("#text3").empty();
	last_line = document.createTextNode(average_time);
}