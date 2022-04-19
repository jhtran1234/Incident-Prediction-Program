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
		data_source_radio1
		if($('#data_source_radio1').prop('checked')){
			model['real-time'] = true;
			$('#real_time_label').show();
			$('#real_time_inputs').show();
			
			$('#historical_label').hide();
			$('#historical_inputs').hide();
			$('#historical_description').hide();
			$('#speed_label').hide();
			$('#speed_inputs').hide();
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
	$("#Save-3").click(function(){
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
	let OL = document.getElementById('open').value;
	let L = document.getElementById('lanes').value;
	let V = null;
	if(model['real-time']) {
		V = document.getElementById('flow').value;
	}
	else if(model['historical']){
		V = document.getElementById('volume').value / L;
	}
	else if(!model['historical']) {
		V = document.getElementById('speed').value;
		let V_upper, V_lower;
		let peak = getRadioValue(document.getElementsByName('peak')) == 'Yes' ? true : false;

		if(V < 48) {
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
	}
	let Q = ((4.5*V*I-8100*OL*I/L)/(1-0.000045*V)) * (1+1/(8100-4.5*V)) * 4.5*V;
	let mean = Math.exp(-19.867) * Math.pow(Q, 0.215) * Math.pow(L*V, 0.932) * Math.pow(I*V, 0.556) * Math.pow(I/OL, 0.479) * Math.pow(V/OL, 1.641);
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