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
const confidence_interval = 224;

$(document).ready(function() {
	$('#data_source_radio1').click(function() {
		$("#secondary_radios").hide();
		$("#Save-1").removeAttr("disabled");
	});
	$('#data_source_radio2').click(function() {
		$("#secondary_radios").show();
		document.getElementById("Save-1").disabled = true;
		if($('#historical_radio1').prop('checked') || $('#historical_radio2').prop('checked')) {
			document.getElementById("Save-1").disabled = false;
		}
	});
	$('#secondary_radios').click(function() {
		if($('#historical_radio1').prop('checked') || $('#historical_radio2').prop('checked')) {
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

	$("#Save-1").click(function() {
		$("#Next-1").removeAttr("disabled");

		document.getElementById('result_type_label_B').style.display = 'none';
		document.getElementById('result_label_B').style.display = 'none';

		if($('#data_source_radio1').prop('checked')) {
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
		else if($('#data_source_radio2').prop('checked')) {
			if($('#historical_radio1').prop('checked')) {
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
			else if($('#historical_radio2').prop('checked')) {
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
	$("#Save-2").click(function() {
		$("#Next-2").removeAttr("disabled");

		calculateResults(document);
	});

	// next button handler	
	$("#Next-1").click(function() {
		$('.ui.menu').find('.item').tab('change tab', '2');
	});
	$("#Next-2").click(function() {
		printResults();
		$('.ui.menu').find('.item').tab('change tab', '3');
	});

	// back button handler
	$("#Back-2").click(function() {
		$('.ui.menu').find('.item').tab('change tab', '1');
	});
	$("#Back-3").click(function() {
		$('.ui.menu').find('.item').tab('change tab', '2');
	});
});

function getRadioValue(radios) {
	for(var i = 0; i < radios.length; i++) {
		if(radios[i].type="radio") {
			if(radios[i].checked) {
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
		document.getElementById('result_table').style.marginTop = '15%';
		document.getElementById('result_table').style.marginRight = 'auto';
	}
	else if(model['historical']) {
		V = document.getElementById('volume').value / L;
		document.getElementById("result_label_A").innerText = document.getElementById('volume').value;
		document.getElementById('result_table').style.marginTop = '15%';
		document.getElementById('result_table').style.marginRight = 'auto';
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
		else if(V > 48 && V <= 70 && peak) {
			V_upper = Math.min(2000, 800+(70-V)*(1200/(70-58.1)));
			V_lower = Math.max(200, 200+(70-V)*(1800/(70-41.9)));
		}
		else if(V > 48) {
			V_upper = 435;
			V_lower = 435;
		}

		if (V >= 42 && V <= 48 && peak) {
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
		document.getElementById('result_type_label_B').style.display = 'table-cell';
		document.getElementById('result_label_B').style.display = 'table-cell';
		document.getElementById('result_table').style.marginTop = '3%';
		document.getElementById('result_table').style.marginRight = '0px';
	}

	let q = (3*V*I/40 - 135*OL*I/L)/(1-13*V/200000);
	let Q = q + q*V/(2200-V);
	
	let mean = Q < 0 ? 0 : Math.pow(Q, 0.351659023) * Math.pow(I*V, 0.328558588) * Math.pow(V/OL, 0.311615);
	mean = mean * meters_to_miles;

	draw_mean(mean);
	drawSVG1(mean);
	drawSVG2(mean);
	drawSVG3(mean);
}

function printResults() {
	var font_size = '16px';
	var bar_width = 25;
	var y_1 = 130;
	var gap = 70;

	// first label
	newLine_1.setAttribute('id','line1');
	newLine_1.setAttribute('stroke','red');
	newLine_1.setAttribute('stroke-width',bar_width);
	newLine_1.setAttribute('y1',y_1);
	newLine_1.setAttribute('y2',y_1);
							
	txtElem_1.setAttributeNS(null,"id","text1");
	txtElem_1.setAttributeNS(null,"font-size",font_size);
	txtElem_1.setAttributeNS(null,"font-weight","bold");
	txtElem_1.setAttributeNS(null,"fill",'black');
	txtElem_1.setAttributeNS(null,"x", '50%');
	txtElem_1.setAttributeNS(null,"y",y_1 - 25);
	txtElem_1.setAttribute('dominant-baseline','middle');
	txtElem_1.setAttribute('text-anchor','middle');
				
	txtElem2_1.setAttributeNS(null,"id","text2");
	txtElem2_1.setAttributeNS(null,"font-size",font_size);
	txtElem2_1.setAttributeNS(null,"font-weight","bold");
	txtElem2_1.setAttributeNS(null,"fill",'red');
	txtElem2_1.setAttributeNS(null,"x", 300);
	txtElem2_1.setAttributeNS(null,"y",y_1 - 25);
	txtElem2_1.setAttribute('dominant-baseline','middle');

	// second label
	console.log(newLine_2);
	newLine_2.setAttribute('id','line2');
	newLine_2.setAttribute('stroke','red');
	newLine_2.setAttribute('stroke-width',bar_width);
	newLine_2.setAttribute('y1',y_1 + gap);
	newLine_2.setAttribute('y2',y_1 + gap);

	txtElem_2.setAttributeNS(null,"id","text1_2");
	txtElem_2.setAttributeNS(null,"font-size",font_size);
	txtElem_2.setAttributeNS(null,"font-weight","bold");
	txtElem_2.setAttributeNS(null,"fill",'black');
	txtElem_2.setAttributeNS(null,"x", '50%');
	txtElem_2.setAttributeNS(null,"y",y_1 + gap - 25);
	txtElem_2.setAttribute('dominant-baseline','middle');
	txtElem_2.setAttribute('text-anchor','middle');

	txtElem2_2.setAttributeNS(null,"id","text2_2");
	txtElem2_2.setAttributeNS(null,"font-size",font_size);
	txtElem2_2.setAttributeNS(null,"font-weight","bold");
	txtElem2_2.setAttributeNS(null,"fill",'red');
	txtElem2_2.setAttributeNS(null,"x", 300);
	txtElem2_2.setAttributeNS(null,"y",y_1 + gap - 25);	
	txtElem2_2.setAttribute('dominant-baseline','middle');

	// third label
	console.log(newLine_3);
	newLine_3.setAttribute('id','line3');
	newLine_3.setAttribute('stroke','red');
	newLine_3.setAttribute('stroke-width',bar_width);
	newLine_3.setAttribute('y1',y_1 + 2*gap);
	newLine_3.setAttribute('y2',y_1 + 2*gap);

	txtElem_3.setAttributeNS(null,"id","text1_3");
	txtElem_3.setAttributeNS(null,"font-size",font_size);
	txtElem_3.setAttributeNS(null,"font-weight","bold");
	txtElem_3.setAttributeNS(null,"fill",'black');
	txtElem_3.setAttributeNS(null,"x", '50%');
	txtElem_3.setAttributeNS(null,"y",y_1 + 2*gap - 25);
	txtElem_3.setAttribute('dominant-baseline','middle');
	txtElem_3.setAttribute('text-anchor','middle');
				
	txtElem2_3.setAttributeNS(null,"id","text2_3");
	txtElem2_3.setAttributeNS(null,"font-size",font_size);
	txtElem2_3.setAttributeNS(null,"font-weight","bold");
	txtElem2_3.setAttributeNS(null,"fill",'red');
	txtElem2_3.setAttributeNS(null,"x", 300);
	txtElem2_3.setAttributeNS(null,"y",y_1 + 2*gap - 25);
	txtElem2_3.setAttribute('dominant-baseline','middle');

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

function draw_mean(mean) {
	$("#Header").empty();
	
	mean = (mean*100).toFixed()/100;
	if(mean > 20) {
		document.getElementById('Header').textContent = 'Mean Queue Length = >20 miles';
	}
	else{
		document.getElementById('Header').textContent = 'Mean Queue Length = ' + mean + ' miles';
	}
}
// Used to draw the labels in the bottom right corner
function drawSVG1(mean) {
	let min_bound = Math.max(mean - (1.282*confidence_interval*meters_to_miles), 0);
	min_bound = (min_bound*100).toFixed()/100;
	let max_bound = mean + (1.282*confidence_interval*meters_to_miles);
	max_bound = (max_bound*100).toFixed()/100;
	let x1 = min_bound * 50;
	let x2 = Math.min(max_bound, 6) * 50;
	
	$("#line1").remove();
	newLine_1.setAttribute('x1',x1);
	newLine_1.setAttribute('x2',x2);
	$("#text1").empty();
	$("#text2").empty();

	if(mean > 20) {
		inside_txt_1 = document.createTextNode(">20 mi");
	}
	else{
		inside_txt_1 = document.createTextNode(min_bound + ' ~ ' + max_bound + "mi");
	}
	percent_txt_1 = document.createTextNode("80%");
}

function drawSVG2(mean) {
	let min_bound = Math.max(mean - (1.645*confidence_interval*meters_to_miles), 0);
	min_bound = (min_bound*100).toFixed()/100;
	let max_bound = mean + (1.645*confidence_interval*meters_to_miles);
	max_bound = (max_bound*100).toFixed()/100;
	let x1 = min_bound * 50;
	let x2 = Math.min(max_bound, 6) * 50;

	$("#line2").remove();
	newLine_2.setAttribute('x1',x1);
	newLine_2.setAttribute('x2',x2);
	$("#text1_2").empty();
	$("#text2_2").empty();

	if(mean > 20) {
		inside_txt_2 = document.createTextNode(">20 mi");
	}
	else{
		inside_txt_2 = document.createTextNode(min_bound + ' ~ ' + max_bound + "mi");
	}
	percent_txt_2 = document.createTextNode("90%");
}

function drawSVG3(mean) {
	let min_bound = Math.max(mean - (1.960*confidence_interval*meters_to_miles), 0);
	min_bound = (min_bound*100).toFixed()/100;
	let max_bound = mean + (1.960*confidence_interval*meters_to_miles);
	max_bound = (max_bound*100).toFixed()/100;
	let x1 = min_bound * 50;
	let x2 = Math.min(max_bound, 6) * 50;

	$("#line3").remove();
	newLine_3.setAttribute('x1',x1);
	newLine_3.setAttribute('x2',x2);
	$("#text1_3").empty();
	$("#text2_3").empty();
	
	if(mean > 20) {
		inside_txt_3 = document.createTextNode(">20 mi");
	}
	else{
		inside_txt_3 = document.createTextNode(min_bound + ' ~ ' + max_bound + "mi");
	}
	percent_txt_3 = document.createTextNode("95%");
}