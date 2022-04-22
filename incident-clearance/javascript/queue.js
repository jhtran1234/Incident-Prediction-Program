"use strict";

var model = {"real-time":null, "historical":false, "flow_rate":null, "duration":null, "lanes":null, "open_lanes":null, "historical_volume":null, "speed_upstream":null, "peak_hour": null};

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
var header_line;
const meters_to_miles = 0.000621371192;

$(document).ready(function(){
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
		if($('#historical_radio1').prop('checked') || $('#historical_radio2').prop('checked')){
			$("#Save-1").removeAttr("disabled");
		}
	});
	
	$("input").change(function() {
		if(document.getElementById("duration").value > 0 &&
		document.getElementById("lanes").value > 0 &&
		document.getElementById("open").value > 0 &&
		(!model['real-time'] || document.getElementById("flow").value > 0) &&
		(!(!model['real-time'] && model['historical']) || document.getElementById("volume").value > 0) &&
		(!(!model['real-time'] && !model['historical']) || (document.getElementById("speed").value > 0 && getRadioValue(document.getElementsByName('peak')) != null))) {
			$("#Save-2").removeAttr("disabled");
		}
		else {
			document.getElementById("Save-2").disabled = true;
		}
	});

	$("#Save-1").click(function(){
		$("#Next-1").removeAttr("disabled");

		document.getElementById('result_type_label_B').style.display = 'none';
		document.getElementById('result_label_B').style.display = 'none';

		if($('#data_source_radio1').prop('checked')){
			model['real-time'] = true;
			$('#real_time_label').show();
			$('#real_time_inputs').show();
			
			$('#historical_label').hide();
			$('#historical_inputs').hide();
			$('#historical_description').hide();
			$('#speed_label').hide();
			$('#speed_inputs').hide();

			document.getElementById('result_type_label').innerText = "Flow rate per lane (veh/hr/ln)";
		}
		else if($('#data_source_radio2').prop('checked')){
			if($('#historical_radio1').prop('checked')){
				model['real-time'] = false;
				model['historical'] = true;
				$('#historical_label').show();
				$('#historical_inputs').show();
				$('#historical_description').show();

				$('#real_time_label').hide();
				$('#real_time_inputs').hide();
				$('#speed_label').hide();
				$('#speed_inputs').hide();

				document.getElementById('result_type_label').innerText = "Historical volume (veh/hr)";
			}
			else if($('#historical_radio2').prop('checked')){
				model['real-time'] = false;
				model['historical'] = false;
				$('#speed_label').show();
				$('#speed_inputs').show();

				$('#real_time_label').hide();
				$('#real_time_inputs').hide();
				$('#historical_label').hide();
				$('#historical_inputs').hide();
				$('#historical_description').hide();
				
				document.getElementById('result_type_label').innerText = "Speed (mph), Peak hour";
			}
			else{
				alert("Error, please reselect data source.");
				document.getElementById("Save-1").disabled = true;
				document.getElementById("Next-1").disabled = true;
			}
		}
		else{
			alert("Error, please reselect data source.");
			document.getElementById("Save-1").disabled = true;
			document.getElementById("Next-1").disabled = true;
		}
	});
	$("#Save-2").click(function(){
		$("#Next-2").removeAttr("disabled");

		calculateResults(document);
	});

	// next button handler	
	$("#Next-1").click(function(){
		$('.ui.menu').find('.item').tab('change tab', '2');
	});
	$("#Next-2").click(function(){
		printResults();
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

function getRadioValue(radios){
	for(var i = 0; i < radios.length; i++) {
		if(radios[i].type="radio") {
			if(radios[i].checked){
				return radios[i].value;
			}
		}
	}
	return null;
}

function calculateResults(document) {
	let I = document.getElementById('duration').value;
	document.getElementById("result_label_duration").innerText = I;

	let OL = document.getElementById('open').value;

	let L = document.getElementById('lanes').value;
	document.getElementById("result_label_lanes").innerText = L;
	document.getElementById("result_label_blocked").innerText = Math.max(L - OL, 0);

	let V = null;
	if(model['real-time']) {
		V = document.getElementById('flow').value;
		document.getElementById("result_label_A").innerText = V;
	}
	else if(model['historical']){
		V = document.getElementById('volume').value / L;
		document.getElementById("result_label_A").innerText = document.getElementById('volume').value;
	}
	else if(!model['historical']) {
		V = document.getElementById('speed').value;
		document.getElementById("result_label_A").innerText = V + ", " + getRadioValue(document.getElementsByName('peak'));

		let V_upper, V_lower;
		let peak = getRadioValue(document.getElementsByName('peak')) == 'Yes' ? true : false;

		if(V < 42) {
			V_upper = 2.6660 * V * Math.log(Math.pow(2*75/V, 1/0.09)-1) - 107.583
			V_lower = 2.1844 * V * Math.log(Math.pow(2*75/V, 1/0.09)-1) - 7.583
		}
		else if(V > 48 && peak) {
			V_upper = Math.min(2000, 800+(70-V)*(1200/(70-58.1)));
			V_lower = Math.max(200, 200+(70-V)*(1800/(70-41.9)));
		}
		else if(V > 48) {
			V_upper = 435;
			V_lower = 435;
		}

		if (V >= 42 && V <= 48 && peak){
			V_upper = 1400;
			V_lower = 1400;
		}
		else if (V >= 42 && V <= 48) {
			V_upper = 400;
			V_lower = 400;
		}

		V = (V_upper + V_lower) / 2;
		
		document.getElementById("result_type_label_B").innerText = 'Estimated flow rate per lane (veh/hr/ln)';
		document.getElementById("result_label_B").innerText = (V*100).toFixed()/100;;
		document.getElementById('result_type_label_B').style.display = 'block';
		document.getElementById('result_label_B').style.display = 'block';
	}

	let q = (3*V*I/40 - 135*OL*I/L)/(1-9*V/200000)
	let T = (q/(2200-V))/4.5;
	let Q = q + 4.5*T*V;
	
	let mean = Math.exp(-19.8674) * Math.pow(Q, 0.2154) * Math.pow(L*V, 0.9320) * Math.pow(I*V, 0.5562) * Math.pow(I/OL, 0.4795) * Math.pow(V/OL, 1.6407);
	mean = mean * meters_to_miles;

	draw_mean(mean);
	drawSVG1(mean);
	drawSVG2(mean);
	drawSVG3(mean);
}

function printResults(){
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
}

function draw_mean(average_mean){
	$("#Header").empty();
	
	average_mean = (average_mean*100).toFixed()/100;
	document.getElementById('Header').textContent = 'Mean Queue Length = ' + average_mean + ' miles';
}

// Used to draw the labels in the bottom right corner
function drawSVG1(mean){
	let min_bound = Math.max(mean - (1.282*430.4808*meters_to_miles), 0);
	min_bound = (min_bound*100).toFixed()/100;
	let max_bound = mean + (1.282*430.4808*meters_to_miles);
	max_bound = (max_bound*100).toFixed()/100;
	let x1 = min_bound * 50;
	let x2 = Math.min(max_bound, 6) * 50;
	
	$("#line1").remove();
	newLine_1.setAttribute('x1',x1);
	newLine_1.setAttribute('x2',x2);
	txtElem_1.setAttributeNS(null,"x", 10);
	txtElem2_1.setAttributeNS(null,"x", 300);
	$("#text1").empty();
	$("#text2").empty();
	inside_txt_1 = document.createTextNode(min_bound + '~' + max_bound);
	percent_txt_1 = document.createTextNode("80%");
}
function drawSVG2(mean){
	let min_bound = Math.max(mean - (1.645*430.4808*meters_to_miles), 0);
	min_bound = (min_bound*100).toFixed()/100;
	let max_bound = mean + (1.645*430.4808*meters_to_miles);
	max_bound = (max_bound*100).toFixed()/100;
	let x1 = min_bound * 50;
	let x2 = Math.min(max_bound, 6) * 50;

	$("#line2").remove();
	newLine_2.setAttribute('x1',x1);
	newLine_2.setAttribute('x2',x2);
	txtElem_2.setAttributeNS(null,"x", 10);
	txtElem2_2.setAttributeNS(null,"x", 300);
	$("#text1_2").empty();
	$("#text2_2").empty();
	inside_txt_2 = document.createTextNode(min_bound + '~' + max_bound);
	percent_txt_2 = document.createTextNode("90%");
}
function drawSVG3(mean){
	let min_bound = Math.max(mean - (1.960*430.4808*meters_to_miles), 0);
	min_bound = (min_bound*100).toFixed()/100;
	let max_bound = mean + (1.960*430.4808*meters_to_miles);
	max_bound = (max_bound*100).toFixed()/100;
	let x1 = min_bound * 50;
	let x2 = Math.min(max_bound, 6) * 50;

	$("#line3").remove();
	newLine_3.setAttribute('x1',x1);
	newLine_3.setAttribute('x2',x2);
	txtElem_3.setAttributeNS(null,"x", 10);
	txtElem2_3.setAttributeNS(null,"x", 300);
	$("#text1_3").empty();
	$("#text2_3").empty();
	inside_txt_3 = document.createTextNode(min_bound + '~' + max_bound);
	percent_txt_3 = document.createTextNode("95%");
}