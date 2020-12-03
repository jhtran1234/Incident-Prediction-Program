"use strict";

var model = {"incident": null,"blockage": null,"collision":null, "detail_blockage_1":null,"detail_blockage_2":null,"detail_blockage_3":null,
 "number_travel":null,"number_shoulder":null, "involved_veh": null, "responder": null, "responder_number": null, "center_choice": null,
 "pavement_condition":null, "hazmat_condition":null, "season_time": null, "hour_time": null, "weekend_time":null, "location":null, "direction":null,
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
				
var involved_car;
var involved_truck;
var involved_bus;
var involved_pedestrian;
var involved_cyclist;
var involved_motor;
var involved_total;	
var num_car;
var num_truck;
var num_bus;
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
var nonholiday = 0;
var season;
var timepickers;

var location_choice;
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
				
$(document).ready(function(){
	//timepicker initialization
               timepickers = $('.timepicker').wickedpicker();
	//datepicker with day of week			
	            $("#datepicker").datepicker({
				defaultDate: new Date(),
                onSelect: function(dateText, inst) {
                    var date = $.datepicker.parseDate(inst.settings.dateFormat || $.datepicker._defaults.dateFormat, dateText, inst.settings);
                    var dateText = $.datepicker.formatDate("DD", date, inst.settings);
                    $("p.name").text( dateText ); // Just the day of week
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
	$("#checkbox-size select").click(updateTime);

	// click radiocheck and update the estimated time
	$("#checkbox-size input").click(updateTime);
	$("#checkbox-size select#t3_1").click(updateTime);
	$("#checkbox-size select#t3_2").click(updateTime);
	
	$("button[name='save']").click(printSum);
	$("button[name='save']").click(activeNext);
	
	$("#Save-9").click(updateTime);
	$("#Save-9").click(printSum);
	
	$("#Save-1").click(printTime);
	$("#Save-2").click(printTime);
	$("#Save-3").click(printTime);
	$("#Save-4").click(printTime);
	$("#Save-11").click(printTime);
	
	$("#Save-10").click(printTime);
	
	
	
	
var radioValue1;
var radioValue2;
var radioValue3;
var radioValue4;
	
//next button handler	
	$("#Next-1").click(function(){
		radioValue1 = $("input[name='incident']:checked").val();
		if(radioValue1 == 'collision'){
				$.tab('change tab', '1-1');
		}
		else if(radioValue1 == 'non'){
			$.tab('change tab', '1-4');
		}
	});

	$("#Next-2").click(function(){
		radioValue2 = $("input[name='blockage']:checked").val();
		if(radioValue2 == 'travel'){
			//change the content within the same tab
				  $.tab('change tab', '1-2');
			//go to the certain tab and show the content
				 // $('.ui.menu').find('.item').tab('change tab', '2');
		}
		if(radioValue2 == 'shoulder'){
			$.tab('change tab', '1-2');
		}
	});

	$("#Next-3").click(function(){
		$.tab('change tab', '1-3');
	});	

	$("#Next-4").click(function(){
		 $('.ui.menu').find('.item').tab('change tab', '2');
		
	});	
	$("#Next-11").click(function(){
		radioValue4 = $("input[name='type']:checked").val();
		console.log(radioValue4);
		if((radioValue4 == 'Debris in Roadway') || (radioValue4 == 'Disabled Vehicle') || (radioValue4 == 'Police Activity')
			||(radioValue4 == 'Utility Problem') || (radioValue4 == 'Weather Closure') || (radioValue4 == 'Others')){
				//showPopup();
		}
		else{
			$.tab('change tab', '1-3');
		}
	});	
	
	
	//iv next 
	$("#Next-5").click(function(){
		 $('.ui.menu').find('.item').tab('change tab', '3');
	});
    
    
	//responder next
	$("#Next-6").click(function(){
		 $('.ui.menu').find('.item').tab('change tab', '4');
	});
	
	//center next
	$("#Next-7").click(function(){
		 $('.ui.menu').find('.item').tab('change tab', '5');
	});
	
	//p&h next
	$("#Next-8").click(function(){
		$('.ui.menu').find('.item').tab('change tab', '6');
	});	
	
	//time next
	$("#Next-9").click(function(){
		$('.ui.menu').find('.item').tab('change tab', '7');		
		
	});
	
//location next

	
	
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
});	




// function showPopup(){
			// $( "#dialog-2" ).empty();
            // $( "#dialog-2" ).append('The estimated CT is the final output.Do you want to input other information for summary update?');
            // $( "#dialog-2" ).dialog({			   
               // autoOpen: true, 
			   
				// modal:true,
				// draggable: true,
				// resizable: true,
				// position: ['center', 'center'],

			    // buttons: {
      // "Yes": function() {
        // //alert("You have confirmed!");
		// $(this).dialog("close");
      // },
      // "No": function() {
        // $(this).dialog("close");
      // }

// }	

// });
// }
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
        // alert("You have confirmed!");
		$(this).dialog("close");
      },
}	
});
}

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
        // alert("You have confirmed!");
		$(this).dialog("close");
      },
}	
});
}

function updateSum(){

    var curr = $(this).parent().find("label").text();
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
				$("#Save-6").removeAttr("disabled");
		}
		else if (curr == 'POLICE'){
				first_responder = curr;
				model['responder'] = 'First responder: POLICE';
				$("#Save-6").removeAttr("disabled");
		}
		else if (curr == 'TOW'){
				first_responder = curr;
				model['responder'] = 'First responder: TOW';
				$("#Save-6").removeAttr("disabled");
		}
		else if (curr == 'FIREBOARD'){
				first_responder = curr;
				model['responder'] = 'First responder: FIREBOARD';
				$("#Save-6").removeAttr("disabled");
		}
		else if (curr == 'MEDICAL'){
				first_responder = curr;
				model['responder'] = 'First responder: MEDICAL';
				$("#Save-6").removeAttr("disabled");
		}
		else if (curr == 'Others'){
				first_responder = curr;
				model['responder'] = 'First responder: Others';
				$("#Save-6").removeAttr("disabled");
		}
		// center
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
		//location
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
				$("#Save-4").removeAttr("disabled");
		}
	tunnel_lane = document.getElementById("b2").checked;
	console.log(tunnel_lane);		
	   if (tunnel_lane == true){
				model['detail_blockage_2'] = 'A lane in TUNNEL blocked';
				$("#Save-4").removeAttr("disabled");
		}
		else if(tunnel_lane == false){
				model['detail_blockage_2'] = null;
				$("#Save-4").removeAttr("disabled");
		}
	toll_lane = document.getElementById("b3").checked;
	console.log(toll_lane);		
	   if (toll_lane == true){
				model['detail_blockage_3'] = 'A lane in TOLL area blocked';
				$("#Save-4").removeAttr("disabled");
		}
		else if(toll_lane == false){
				model['detail_blockage_3'] = null;
				$("#Save-4").removeAttr("disabled");
		}
	
	// hazmat
	hazmat = document.getElementById("haz").checked;
	console.log(hazmat);		
	   if (hazmat == true){
				model['hazmat_condition'] = 'Hazmat material related';
				$("#Save-8").removeAttr("disabled");
		}
		else if(hazmat == false){
				model['hazmat_condition'] = null;
				//$("#Save-8").removeAttr("disabled");
		}

		
}


function updateSum2(){
	
	travel_drop = document.getElementById("t3_1").value;
    // var curr_drop = dropdown.options[dropdown.selectedIndex].value;
	console.log(travel_drop);
	if (travel_drop == 0){
				model['number_travel'] = null;
		}

	else if (travel_drop == 1){
				model['number_travel'] = "1 Travel lane blocked";
				
		}		
	else if (travel_drop == 2){
				model['number_travel'] = "2 Travel lanes blocked";
		}	
	else if (travel_drop == 3){
				model['number_travel'] = "3 Travel lanes blocked";
		}
	else if (travel_drop == 4){
				model['number_travel'] = "4 Travel lanes blocked";
		}
	else {
				model['number_travel'] = "5+ Travel lanes blocked";
		}


	shoulder_drop = document.getElementById("t3_2").value;
	
	console.log(shoulder_drop);	
    if (shoulder_drop == 0){
				model['number_shoulder'] = null;
		}	
    else if (shoulder_drop == 1){
				model['number_shoulder'] = "1 Shoulder lane blocked";
		}		
	else if (shoulder_drop == 2){
				model['number_shoulder'] = "2 Shoulder lanes blocked";
		}	
	else if (shoulder_drop == 3){
				model['number_shoulder'] = "3 Shoulder lanes blocked";
		}
	else if (shoulder_drop == 4){
				model['number_shoulder'] = "4 Shoulder lanes blocked";
		}
	else if (shoulder_drop == '5'){
				model['number_shoulder'] = "5+ Shoulder lanes blocked";
		}
		
	total_lane = Number(travel_drop) + Number(shoulder_drop);
	console.log(total_lane);
	//IV page
	involved_car = document.getElementById("dropbox1").value;
	console.log(involved_car);	

	involved_truck = document.getElementById("dropbox2").value;
	console.log(involved_truck);
	
	involved_bus = document.getElementById("dropbox3").value;
	console.log(involved_bus);

	involved_pedestrian = document.getElementById("dropbox4").value;
	console.log(involved_pedestrian);
	
	involved_cyclist = document.getElementById("dropbox5").value;
	console.log(involved_cyclist);

	involved_motor = document.getElementById("dropbox6").value;
	console.log(involved_motor);
		
	num_car = Number($("#dropbox1 option:selected").text());
	console.log(num_car);
	num_truck = Number($("#dropbox2 option:selected").text());
	console.log(num_truck);
	num_bus = Number($("#dropbox3 option:selected").text());
	console.log(num_bus);
	num_pedestrian = Number($("#dropbox4 option:selected").text());
	console.log(num_pedestrian);
	num_cyclist = Number($("#dropbox5 option:selected").text());
	console.log(num_cyclist);
	num_motor = Number($("#dropbox6 option:selected").text());
	console.log(num_motor);
	num_total = num_car + num_truck + num_bus + num_pedestrian + num_cyclist + num_motor;
	console.log(num_total);
	

	
	//only one is get checked
	if ((involved_car == ' ') && (involved_truck == ' ') &&(involved_bus == ' ') && (involved_pedestrian == ' ') && (involved_cyclist == ' ') && (involved_motor == ' ')){
				model['involved_veh'] = null ;
			
		}
	else if ((involved_car == '1 Car ') && (involved_truck == ' ') &&(involved_bus == ' ') && (involved_pedestrian == ' ') && (involved_cyclist == ' ') && (involved_motor == ' ')){
				model['involved_veh'] = involved_car + 'involved.' ;
					$("#Save-5").removeAttr("disabled");
		}
    else if ((involved_car == ' ') && (involved_truck == '1 Truck ') &&(involved_bus == ' ') && (involved_pedestrian == ' ') && (involved_cyclist == ' ') && (involved_motor == ' ')){
				model['involved_veh'] = involved_truck + 'involved.' ;
					$("#Save-5").removeAttr("disabled");
		} 
    else if ((involved_car == ' ') && (involved_truck == ' ') &&(involved_bus == '1 Bus ') && (involved_pedestrian == ' ') && (involved_cyclist == ' ') && (involved_motor == ' ')){
				model['involved_veh'] = involved_bus + 'involved.' ;
					$("#Save-5").removeAttr("disabled");
		}
	else if ((involved_car == ' ') && (involved_truck == ' ') &&(involved_bus == ' ') && (involved_pedestrian == '1 Pedestrian ') && (involved_cyclist == ' ') && (involved_motor == ' ')){
				model['involved_veh'] = involved_pedestrian + 'involved.' ;
					$("#Save-5").removeAttr("disabled");
		}
	else if ((involved_car == ' ') && (involved_truck == ' ') &&(involved_bus == ' ') && (involved_pedestrian == ' ') && (involved_cyclist == '1 Cyclist ') && (involved_motor == ' ')){
				model['involved_veh'] = involved_cyclist + 'involved.' ;
					$("#Save-5").removeAttr("disabled");
		}
	else if ((involved_car == ' ') && (involved_truck == ' ') &&(involved_bus == ' ') && (involved_pedestrian == ' ') && (involved_cyclist == ' ') && (involved_motor == '1 Motorcyclist ')){
				model['involved_veh'] = involved_motor + 'involved.' ;
					$("#Save-5").removeAttr("disabled");
		}
	else if ((involved_car != ' ') || (involved_truck != ' ') || (involved_bus != ' ') || (involved_pedestrian != ' ') || (involved_cyclist != ' ') || (involved_motor != ' ')){
		model['involved_veh'] = involved_car + involved_truck + involved_bus  + involved_pedestrian + involved_cyclist + involved_motor + 'involved.' ;
			$("#Save-5").removeAttr("disabled");
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



	
	
	
	//only one is get checked
	if ((chart_value == '1 CHART unit ') && (police_value == ' ') &&(tow_value == ' ') && (fireboard_value == ' ') && (medical_value == ' ')){
				model['responder_number'] = chart_value + 'is responding.' ;
				$("#Save-6").removeAttr("disabled");
		}
    else if ((chart_value == ' ') && (police_value == '1 POLICE unit ') &&(tow_value == ' ') && (fireboard_value == ' ') && (medical_value == ' ')){
				model['responder_number'] = police_value + 'is responding.' ;
				$("#Save-6").removeAttr("disabled");
		} 
    else if ((chart_value == ' ') && (police_value == ' ') &&(tow_value == '1 TOW unit ') && (fireboard_value == ' ') && (medical_value == ' ')){
				model['responder_number'] = tow_value + 'is responding.' ;
				$("#Save-6").removeAttr("disabled");
		}
	else if ((chart_value == ' ') && (police_value == ' ') &&(tow_value == ' ') && (fireboard_value == '1 FIREBOARD unit ') && (medical_value == ' ')){
				model['responder_number'] = fireboard_value + 'is responding.' ;
				$("#Save-6").removeAttr("disabled");
		}
	else if ((chart_value == ' ') && (police_value == ' ') &&(tow_value == ' ') && (fireboard_value == ' ') && (medical_value == '1 MEDICAL unit ')){
				model['responder_number'] = medical_value + 'is responding.' ;
				$("#Save-6").removeAttr("disabled");
		}
	else if ((chart_value != ' ') || (police_value != ' ') || (tow_value != ' ') || (fireboard_value != ' ') || (medical_value != ' ')){
		model['responder_number'] = chart_value + police_value + tow_value  + fireboard_value + medical_value + 'are responding.' ;
		$("#Save-6").removeAttr("disabled");
	}

	
//location page: direction and exit
	direction = $("#dropdown_direction option:selected").text();
	console.log(direction);
	
	exit = $("#dropdown_exit option:selected").text();
	console.log(exit);	
	
	if (direction == 'North'){
				model['direction'] = direction;
				$("#Save-10").removeAttr("disabled");
				
		}

	else if (direction == 'South'){
				model['direction'] = direction;
				$("#Save-10").removeAttr("disabled");
				
	}
	else if (direction == 'No Information'){
				model['direction'] = direction;
				$("#Save-10").removeAttr("disabled");
				
	}	
	
	if (exit == 'Exit 49'){
				model['exit'] = exit;
				$("#Save-10").removeAttr("disabled");
				
		}

	else if (exit == 'Exit 64'){
				model['exit'] = exit;
				$("#Save-10").removeAttr("disabled");
				
	}	
	else if (exit == 'Exit 100'){
				model['exit'] = exit;
				$("#Save-10").removeAttr("disabled");
				
	}
	else if (exit == 'Other Exits'){
				model['exit'] = exit;
				$("#Save-10").removeAttr("disabled");
				
	}	
	
	console.log(model);
		
}

//working
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
	
	if(((month == '01')&&(day == '01')) ||   ((month == '01') && (day == '02')) || ((month == '01') && (day == '16')) || ((month == '02') && (day == '20'))
		|| ((month == '05') && (day == '29')) || ((month == '07') && (day == '04')) || ((month == '09') && (day == '04')) 
		|| ((month == '10') && (day == '09')) || ((month == '11') && (day == '10')) || ((month == '11') && (day == '23')) 
		|| ((month == '12') && (day == '25'))){
		nonholiday = 1;
	}
	  
    });	
	

}
	

function my_getTime(){
	$("#Save-9").click(function() {
	var time = timepickers.wickedpicker('time');	
	//console.log(temp);
	time = time.replace(" ", "");
	time = date +' ' + time;
	// console.log(temp);
	var curr_hour = new Date(time).getHours();
	console.log(curr_hour);
	var curr_min = new Date(time).getMinutes();
	console.log(curr_min);
	
	console.log(weekend);
	if(weekend == 'Weekday'){
		if ((curr_hour >= 7 ) && (curr_hour < 10)){
			hour = 'AM-peak';
			model['hour_time'] = hour;		
		}
		else if ((curr_hour >= 10 ) && (curr_hour < 16)){
			hour = 'Day time';
			daytime = 1;
			model['hour_time'] = hour;		
		}
		else if ((curr_hour >= 16 ) && (curr_hour < 19)){
			hour = 'PM-peak';
			model['hour_time'] = hour;		
		}
		else {
			hour = 'Night time';
			nighttime = 1;
			model['hour_time'] = hour;		
		}	
		console.log(time);
	}
    else if(weekend == 'Weekend'){
		if((curr_hour >= 7 ) && (curr_hour < 19)){
			hour = 'Day time';
			daytime = 1;
			model['hour_time'] = hour;
		}
		else{
			hour = 'Night time';
			nighttime = 1;
			model['hour_time'] = hour;
			
		}
	}	
	

	
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

		
			if(model['incident']=='Collision incident'){
				drawSVG1(20, 90, 40, 110, "10~45", "60%");
				drawSVG2(20, 110, 40, 130, "10~55", "70%");
				drawSVG3(20, 180, 40, 190, "10~90", "80%");
				drawSVG4("Average CT = 40 mins");
				
				if(model['blockage']=='Travel lane blockage'){
					drawSVG1(20, 100, 40, 110, "10~50", "60%");
					drawSVG2(20, 120, 40, 130, "10~60", "70%");
					drawSVG3(20, 170, 40, 180, "10~85", "80%");
					drawSVG4("Average CT = 45 mins");
					
					if(model['collision']=='Fatality'){
						drawSVG1(290, 300, 230, 300, "150~270", "60%");
						drawSVG2(240, 300, 180, 300, "120~300", "70%");
						drawSVG3(120, 300, 130, 300, "60~360", "80%");
						drawSVG4("Average CT = 235 mins");
						
					}

					else if(model['collision']=='Personal Injury'){
						drawSVG1(30, 120, 50, 130, "15~60", "60%");
						drawSVG2(30, 140, 50, 150, "15~70", "70%");
						drawSVG3(30, 190, 50, 200, "15~95", "80%");
						drawSVG4("Average CT = 50 mins");
									
						if(model['number_travel']=='1 Travel lane blocked'){
							drawSVG1(30, 110, 50, 120, "15~55", "60%");
							drawSVG2(30, 130, 50, 140, "15~65", "70%");
							drawSVG3(20, 140, 40, 150, "10~70", "80%");
							drawSVG4("Average CT = 45 mins");
							
						}
						else if(model['number_travel']=='2 Travel lanes blocked'){
							drawSVG1(40, 140, 60, 150, "20~70", "60%");
							drawSVG2(40, 170, 60, 180, "20~85", "70%");
							drawSVG3(30, 180, 50, 190, "15~90", "80%");
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
							drawSVG1(20, 80, 40, 90, "10~40", "60%");
							drawSVG2(20, 100, 40, 110, "10~50", "70%");
							drawSVG3(20, 160, 40, 170, "10~80", "80%");
							drawSVG4("Average CT = 35 mins");
							
						}
						else if(model['number_travel']=='2 Travel lanes blocked'){
							drawSVG1(30, 140, 50, 150, "15~70", "60%");
							drawSVG2(30, 200, 50, 210, "15~100", "70%");
							drawSVG3(20, 220, 40, 230, "10~110", "80%");
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
				//NC_updateTime();
			}


				
				
if(model['incident']!= null && 
model["involved_veh"]!= null && model["responder"]!= null && model["center_choice"]!= null &&
model["pavement_condition"]!=null && model["hour_time"]!= null && model["location"]!=null){	
	if((location_choice == 'Baltimore city') && (exit == 'Exit 49') && (direction == 'North') && (cpi == 1) && (num_truck >0)){
				drawSVG1(120, 180, 130, 200, "60~90", "90%");
				drawSVG2(100, 200, 110, 220, "50~100", "100%");
				drawSVG3(0, 0, 0, 0, "", "");
				drawSVG4("Average CT = 75 mins");
	}
	else if((location_choice == 'Baltimore city') && (direction == 'South')&&(toll_lane == true) && (season == 'Winter') && (weekend == 'Weekend') && (hour== 'Night time' || num_truck > 0)){
				drawSVG1(140, 220, 150, 230, "70~110", "90%");
				drawSVG2(120, 240, 130, 250, "60~120", "100%");
				drawSVG3(0, 0, 0, 0, "", "");
				drawSVG4("Average CT = 90 mins");	
	}
	
	else if((weekend == 'Weekend') && (nonholiday == 1) && (pavement == 'Dry') && (direction == 'South') && (num_truck == 0) && (num_tow > 0)){
				drawSVG1(100, 160, 120, 180, "50~80", "90%");		
				drawSVG2(60, 180, 70, 200, "30~90", "100%");
				drawSVG3(0, 0, 0, 0, "", "");
				drawSVG4("Average CT = 65 mins");		
	}
	else if((cpd == 1) && (num_truck == 1) && (num_tow > 1) && (num_fireboard > 0) && (hazmat != true) && (pavement != 'Chemical wet') && (pavement != 'Snow/Ice')){
				drawSVG1(100, 160, 120, 180, "50~80", "90%");
				drawSVG2(80, 180, 100, 200, "40~90", "100%");
				drawSVG3(0, 0, 0, 0, "", "");
				drawSVG4("Average CT = 65 mins");		
	}
	else if((location_choice == 'Cecil') && (direction == 'South') && (exit == 'Exit 100') && (hour == 'Night time') && (num_truck > 0)){
				drawSVG1(160, 220, 180, 230, "80~110", "90%");
				drawSVG2(120, 240, 130, 250, "60~120", "100%");
				drawSVG3(0, 0, 0, 0, "", "");
				drawSVG4("Average CT = 90 mins");		
		
	}
	else if((location_choice == 'Harford') && (weekend == 'Weekend') && (hour == 'Night time') && (cpi == 1) && (aux_lane == true)){
				drawSVG1(80, 160, 100, 180, "40~80", "90%");
				drawSVG2(60, 180, 80, 200, "30~90", "100%");
				drawSVG3(0, 0, 0, 0, "", "");
				drawSVG4("Average CT = 60 mins");		
	}
	else if((location_choice == 'Baltimore') && (weekend == 'Weekend') && (hour == 'Night time') && (cpd == 1) && (num_tow > 0) && (num_police>1)){
				drawSVG1(80, 140, 100, 150, "40~70", "90%");
				drawSVG2(60, 160, 80,180, "30~80", "100%");
				drawSVG3(0, 0, 0, 0, "", "");
				drawSVG4("Average CT = 55 mins");
	}
	else if((location_choice == 'Baltimore') && (exit == 'Exit 64') && (direction == 'North') && (hour == 'PM-peak') 
			&& (cpd == 1) && (num_total>2) && (num_fireboard > 0)){
				drawSVG1(80, 140, 100, 150, "40~70", "90%");
				drawSVG2(60, 160, 80,180, "30~80", "100%");
				drawSVG3(0, 0, 0, 0, "", "");
				drawSVG4("Average CT = 55 mins");				
	}
	else if((hour == 'Night time' || hour == 'AM-peak') && (pavement == 'Snow/Ice') && (cpd == 1) && (num_truck == 0) && (num_chart >1)) {
				drawSVG1(40, 100, 60, 120, "20~50", "90%");
				drawSVG2(30, 120, 50, 140, "15~60", "100%");
				drawSVG3(0, 0, 0, 0, "", "");
				drawSVG4("Average CT = 35 mins");
		
	}
	else{

		
			if(model['incident']=='Collision incident'){
				// drawSVG1(20, 90, 40, 110, "10~45", "60%");
				// drawSVG2(20, 110, 40, 130, "10~55", "70%");
				// drawSVG3(20, 180, 40, 190, "10~90", "80%");
				// drawSVG4("Average CT = 40 mins");


				
				if(model['blockage']=='Travel lane blockage'){
					// drawSVG1(20, 100, 40, 110, "10~50", "60%");
					// drawSVG2(20, 120, 40, 130, "10~60", "70%");
					// drawSVG3(20, 170, 40, 180, "10~85", "80%");
					// drawSVG4("Average CT = 45 mins");
					
					if(model['collision']=='Fatality'){

						// drawSVG1(290, 300, 230, 300, "150~270", "60%");
						// drawSVG2(240, 300, 180, 300, "120~300", "70%");
						// drawSVG3(120, 300, 130, 300, "60~360", "80%");
						// drawSVG4("Average CT = 235 mins");
						CF_updateTime();
					}

					else if(model['collision']=='Personal Injury'){
						// drawSVG1(30, 120, 50, 130, "15~60", "60%");
						// drawSVG2(30, 140, 50, 150, "15~70", "70%");
						// drawSVG3(30, 190, 50, 200, "15~95", "80%");
						// drawSVG4("Average CT = 50 mins");
									
						if(model['number_travel']=='1 Travel lane blocked'){
							// drawSVG1(30, 110, 50, 120, "15~55", "60%");
							// drawSVG2(30, 130, 50, 140, "15~65", "70%");
							// drawSVG3(20, 140, 40, 150, "10~70", "80%");
							// drawSVG4("Average CT = 45 mins");
							CPI1_updateTime();
						}
						else if(model['number_travel']=='2 Travel lanes blocked'){
							// drawSVG1(40, 140, 60, 150, "20~70", "60%");
							// drawSVG2(40, 170, 60, 180, "20~85", "70%");
							// drawSVG3(30, 180, 50, 190, "15~90", "80%");
							// drawSVG4("Average CT = 55 mins");
							CPI2_updateTime();
							
						}
						else if((model['number_travel']=='3 Travel lanes blocked') || (model['number_travel']=='4 Travel lanes blocked') 
						|| (model['number_travel']=='5+ Travel lanes blocked')){
							// drawSVG1(60, 220, 80, 230, "30~110", "60%");
							// drawSVG2(60, 300, 80, 300, "30~155", "70%");
							// drawSVG3(50, 300, 70, 300, "25~210", "80%");
							// drawSVG4("Average CT = 80 mins");	
							CPI3_updateTime();
						}				
					}
					
					else if(model['collision']=='Property Damage only'){
						// drawSVG1(20, 90, 40, 100, "10~45", "60%");
						// drawSVG2(20, 110, 40, 120, "10~55", "70%");
						// drawSVG3(20, 190, 40, 200, "10~85", "80%");
						// drawSVG4("Average CT = 35 mins");	
						
						if(model['number_travel']=='1 Travel lane blocked'){
							// drawSVG1(20, 80, 40, 90, "10~40", "60%");
							// drawSVG2(20, 100, 40, 110, "10~50", "70%");
							// drawSVG3(20, 160, 40, 170, "10~80", "80%");
							// drawSVG4("Average CT = 35 mins");
							CPD1_updateTime();
						}
						else if(model['number_travel']=='2 Travel lanes blocked'){
							// drawSVG1(30, 140, 50, 150, "15~70", "60%");
							// drawSVG2(30, 200, 50, 210, "15~100", "70%");
							// drawSVG3(20, 220, 40, 230, "10~110", "80%");
							// drawSVG4("Average CT = 45 mins");
							CPD2_updateTime();
							
						}
						else if((model['number_travel']=='3 Travel lanes blocked') || (model['number_travel']=='4 Travel lanes blocked') 
						|| (model['number_travel']=='5+ Travel lanes blocked')){
							// drawSVG1(40, 180, 60, 190, "20~90", "60%");
							// drawSVG2(40, 280, 60, 290, "20~140", "70%");
							// drawSVG3(30, 280, 50, 290, "15~140", "80%");
							// drawSVG4("Average CT = 60 mins");
							CPD3_updateTime();
						}				
					}
				
					
				}
				else if(model['blockage']=='Shoulder only blockage'){
					// drawSVG1(10, 80, 20, 90, "5~40", "60%");
					// drawSVG2(10, 90, 20, 100, "5~45", "70%");
					// drawSVG3(10, 120, 20, 130, "5~60", "80%");
					// drawSVG4("Average CT = 35 mins");
					shoulder_updateTime();
				}
			
			}
			
			
			else if(model['incident']=='Non-Collision incident'){
				// drawSVG1(10, 30, 40, 110, "5~15", "65%");
				// drawSVG2(10, 40, 50, 120, "5~20", "75%");
				// drawSVG3(10, 60, 70, 140, "5~30", "80%");
				// drawSVG4("Average CT = 20 mins");		
				NC_updateTime();
			}
		}
		
}
}

//draw labels 
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
	if(this.id == 'Save-1'){
		    // if(popup == 1){
				// showPopup();
				// popup = 0;
			// }
            $("#Next-1").removeAttr("disabled");
	}
	else if(this.id == 'Save-2'){
		    // if(popup == 1){
				// showPopup();
				// popup = 0;
				
			// }		
            $("#Next-2").removeAttr("disabled");
	}
	else if(this.id == 'Save-3'){
				    // if(popup == 1){
				// showPopup();
				// popup = 0;
			// }
            $("#Next-3").removeAttr("disabled");
	}
	else if(this.id == 'Save-4'){
				    // if(popup == 1){
				// showPopup();
				// popup = 0;
			// }
            $("#Next-4").removeAttr("disabled");
	}
	else if(this.id == 'Save-5'){
				    // if(popup == 1){
				// showPopup();
				// popup = 0;
			// }
            $("#Next-5").removeAttr("disabled");
	}
	else if(this.id == 'Save-6'){
				    // if(popup == 1){
				// showPopup();
				// popup = 0;
			// }
            $("#Next-6").removeAttr("disabled");
	}
	else if(this.id == 'Save-7'){
				    // if(popup == 1){
				// showPopup();
				// popup = 0;
			// }
            $("#Next-7").removeAttr("disabled");
	}
	else if(this.id == 'Save-8'){
				    // if(popup == 1){
				// showPopup();
				// popup = 0;
			// }
            $("#Next-8").removeAttr("disabled");
	}
	else if(this.id == 'Save-9'){
				    // if(popup == 1){
				// showPopup();
				// popup = 0;
			// }
            $("#Next-9").removeAttr("disabled");
	}
	else if(this.id == 'Save-10'){
				    // if(popup == 1){
				// showPopup();
				// popup = 0;
			// }
            $("#Next-10").removeAttr("disabled");
	}
	else if(this.id == 'Save-11'){
				    // if(popup == 1){
				// showPopup();
				// popup = 0;
			// }
            $("#Next-11").removeAttr("disabled");
	}	
}

//cpi 2 lanes
function CPI2_case1(){
	drawSVG1(20, 50, 60, 0, "10~25", "60%");
	drawSVG2(20, 60, 70, 0, "10~30", "70%");
	drawSVG3(20, 80, 40, 0, "10~40", "80%");
	drawSVG4("Average CT = 30 mins");	
}
function CPI2_case2(){
	drawSVG1(50, 120, 70, 130, "25~60", "60%");
	drawSVG2(20, 120, 40, 130, "10~60", "70%");
	drawSVG3(20, 140, 40, 150, "10~70", "80%");
	drawSVG4("Average CT = 50 mins");	
}
function CPI2_case3(){
	drawSVG1(140, 280, 160, 290, "70~120", "70%");
	drawSVG2(120, 240, 140, 250, "60~120", "75%");
	drawSVG3(100, 240, 130, 250, "50~120", "85%");
	drawSVG4("Average CT = 80 mins");	
}
function CPI2_case4(){
	drawSVG1(280, 300, 240, 300, ">=240", "60%");
	drawSVG2(240, 300, 250, 300, ">=120", "85%");
	drawSVG3(120, 300, 130, 300, ">=60", "100%");
	drawSVG4("Average CT = 210 mins");	
}

function CPI2_updateTime(){
	if(model['responder']!=null){
		if(num_tow>0){
			if(model['involved_veh']!=null){
				if((num_tow==0) || (num_truck==0)){
					CPI2_case2();
					//popup = 1;
				}
				else{ 

							if((tunnel_lane == true)||(num_medical>0)){
								if(model['pavement_condition']!=null){
											if((num_truck>1) || (num_total>3) || (hazmat == true)){
												CPI2_case4();
												//popup = 1;
											}
											else{
												CPI2_case3();
												//popup = 1;
											}							
								}
							}
							else if(model['pavement_condition']!=null){
								if((hazmat == true)||(pavement == 'Wet')){
											if((num_truck>1) || (num_total>3) || (hazmat == true)){
												CPI2_case4();
												//popup = 1;
											}
											else{
												CPI2_case3();
												//popup = 1;
											}						
								}
								else if((model['season_time']!=null)||(model['hour_time']!=null)){
									if(hour == 'Night time'){
											if((num_truck>1) || (num_total>3) || (hazmat == true)){
												CPI2_case4();
												//popup = 1;
											}
											else{
												CPI2_case3();
												//popup = 1;
											}
								
									}
									else{
										CPI2_case2();
										//popup = 1;
							        }
									
								}
							}

					
					}
				
				
							
			}
			
		}
		else if(model['center_choice']!=null){
			if(center == 'AOC'){
				CPI2_case2();
				//popup = 1;
			}
			else if(center != 'AOC'){
				if(model['pavement_condition']!=null){
					if(pavement == 'Dry'){
						CPI2_case1();	
						//popup = 1;
					}
					else if((model['hour_time']!=null) || (model['season_time']!=null)){
						if((season == 'Winter')|| (hour == 'Night time')){
							CPI2_case2();	
							//popup = 1;
						}
						else{
							CPI2_case1();
							//popup = 1;
						}
					}
				}

			} 
		}
	}
}

//cpi 1 lane
function CPI1_case1(){
	drawSVG1(20, 60, 70, 0, "10~30", "60%");
	drawSVG2(20, 70, 80, 0, "10~35", "70%");
	drawSVG3(20, 90, 40, 0, "10~45", "80%");
	drawSVG4("Average CT = 25 mins");
}
function CPI1_case2(){
	drawSVG1(50, 120, 70, 130, "25~60", "60%");
	drawSVG2(30, 120, 50, 130, "15~60", "70%");
	drawSVG3(20, 130, 40, 140, "10~65", "80%");
	drawSVG4("Average CT = 50 mins");	
}
function CPI1_case3(){
	drawSVG1(120, 240, 150, 250, "60~120", "60%");
	drawSVG2(50, 240, 70, 250, "25~120", "70%");
	drawSVG3(30, 240, 50, 250, "15~120", "75%");
	drawSVG4("Average CT = 100 mins");	
}
function CPI1_case4(){
	drawSVG1(240, 300, 180, 300, ">=120", "75%");
	drawSVG2(160, 300, 180, 300, ">=80", "100%");
	drawSVG3(0, 0, 0, 0,"" ,"" );
	drawSVG4("Average CT = 150 mins");	
}


function CPI1_updateTime(){
	if(model['responder']!=null){
		if((num_tow == 0)){
			if(model['involved_veh']!=null){
				if((num_total < 4)){
					if(model['center_choice']!=null){
						if((center=='TOC3') || (center=='TOC4') || (center=='SOC')){
							CPI1_case1();
							//popup = 1;
						}
						else{
							if((num_truck>0) || (num_motor>0)){
								CPI1_case2();
								//popup = 1;
							}
							else{
								if(tunnel_lane == true){
									CPI1_case2();
									//popup = 1;
								}
								else{
									if(first_responder == 'FIREBOARD'){
										CPI1_case1();
										//popup = 1;
									}
									else if((model['season_time']!=null) || (model['hour_time']!=null)){
										if(((hour == 'Day time') || (hour == 'Night time'))&&(first_responder=='POLICE')){
											CPI1_case2();
											//popup = 1;
										}
										else{
											if(((hour == 'AM-peak') || (hour == 'PM-peak'))&&(num_total>=3)){
												CPI1_case2();
												//popup = 1;
											}
											else{
												if(num_chart>0){
													CPI1_case2();
													//popup = 1;
												}
												else{
													CPI1_case1();
													//popup = 1;
												}
											}
										}
									}
								}
							}
						}
					}	
				}
				else if((num_total >= 4)){
						CPI1_case2();
						//popup = 1;
				}
			}	
		}
		else if((num_tow > 0)){
			if(model['involved_veh']!=null){
				if(num_truck == 0){
					CPI1_case2();
					//popup = 1;
				}
				else if(first_responder == 'POLICE'){
					if((model['season_time']!=null) || (model['hour_time']!=null)){
						if((season == 'Winter') || (num_chart > 2) || (num_responder > 6)){
							CPI1_case4();
							//popup = 1;
						}
						else{
							CPI1_case3();
							//popup = 1;
						}
						
					}
				}
				else if(num_truck > 0){
					if(first_responder!=null && first_responder != 'POLICE'){
						if(model['pavement_condition']!=null){
							if((num_tow>1) || (aux_lane == true) || (num_truck >1) || (hazmat == true)){
								if((model['season_time']!=null) || (model['hour_time']!=null)){
									if((season == 'Winter') || (num_chart > 2) || (num_responder > 6)){
										CPI1_case4();
										//popup = 1;
									}
									else{
									CPI1_case3();
									//popup = 1;								
									}
									
								}						
							}
							else{
								if(model['center_choice']!=null){
									if((num_total<3)||(center=='TOC3')){
										CPI1_case2();
										//popup = 1;
									}
									else{
										if((model['season_time']!=null) || (model['hour_time']!=null)){
											if((season == 'Winter') || (num_chart > 2) || (num_responder > 6)){
												CPI1_case4();
												//popup = 1;
											}
											else{
												CPI1_case3();
												//popup = 1;
											}
											
										}								
									}
								}
							}
						}
					}
					//changed
					else if(first_responder == 'POLICE'){
								if((model['season_time']!=null) || (model['hour_time']!=null)){
									if((season == 'Winter') || (num_chart > 2) || (num_responder > 6)){
										CPI1_case4();
										//popup = 1;
									}
									else{
									CPI1_case3();
									//popup = 1;								
									}
									
								}						
					}
				}	
			}	
		}

	}

}

//cpi 3 lanes
function CPI3_case1(){
	drawSVG1(20, 80, 30, 90, "10~40", "60%");
	drawSVG2(10, 60, 20, 80, "5~30", "70%");
	drawSVG3(10, 80, 20, 90, "5~40", "80%");
	drawSVG4("Average CT = 25 mins");
}
function CPI3_case2(){
	drawSVG1(60, 120, 80, 130, "30~60", "60%");
	drawSVG2(30, 120, 40, 130, "15~60", "70%");
	drawSVG3(20, 150, 40, 160, "10~75", "90%");
	drawSVG4("Average CT = 60 mins");	
}
function CPI3_case3(){
	drawSVG1(120, 240, 140, 250, "60~120", "60%");
	drawSVG2(90, 240, 110, 250, "45~120", "70%");
	drawSVG3(50, 240, 70, 250, "25~120", "80%");
	drawSVG4("Average CT = 95 mins");
}
function CPI3_case4(){
	drawSVG1(265, 300, 230, 300, ">=170", "60%");
	drawSVG2(250, 300, 200, 300, ">=140", "85%");
	drawSVG3(240, 300, 190, 300, ">=120", "100%");
	drawSVG4("Average CT = 225 mins");	
}

function CPI3_updateTime(){
	if ((model['responder']!=null) && (model['responder_number'] != null)){
		if(num_tow > 0){
						if(num_medical > 0){
							if(num_truck == 0){
								CPI3_case3();
								//popup = 1;
							}
							else if(num_truck > 1){
								CPI3_case4();
								//popup = 1;								
							}
							else if(num_truck == 1){
								if((num_medical > 0) || (tunnel_lane == true)){
									CPI3_case4();
									//popup = 1;
								}
								else {
									CPI3_case3();
									//popup = 1;
								}
							}
						}
						else if(num_medical == 0){
							if(num_tow == 0){
								CPI3_case2();
								//popup = 1;								
							}
							else if(num_tow > 0){
								if(travel_drop > 3){
									if(num_truck == 0){
										CPI3_case3();
										//popup = 1;
									}
									else if(num_truck > 1){
										CPI3_case4();
										//popup = 1;
									}
									else if(num_truck == 1){
										if((num_medical > 0) || (tunnel_lane == true)){
											CPI3_case4();
											//popup = 1;
										}
										else {
											CPI3_case3();
											//popup = 1;
										}
									}							
								}
								else{
									if((model['season_time']!=null) || (model['hour_time']!=null)){
										//working
										if((hour == 'Night time') || (weekend == 'Weekend')){
											console.log(hour + weekend);
											if(num_truck == 0){
												CPI3_case3();
												//popup = 1;
											}
											else if(num_truck > 1){
												CPI3_case4();
												//popup = 1;
											}
											else if(num_truck == 1){
												if((num_medical > 0) || (tunnel_lane == true)){
													CPI3_case4();
												   // popup = 1;
													
												}
												else {
													CPI3_case3();
													//popup = 1;
												}
											}								
										}
										else{
											if(model['pavement_condition']!=null){
												if(pavement == 'Dry'){
													CPI3_case2();
													//popup = 1;
												}
												else{
													if(num_truck == 0){
														CPI3_case3();
														//popup = 1;														
													}
													else if(num_truck > 1){
														CPI3_case4();			
														//popup = 1;
														
													}
													else if(num_truck == 1){
														if((num_medical > 0) || (tunnel_lane == true)){
															CPI3_case4();
															//popup = 1;
														}
														else {
															CPI3_case3();
															//popup = 1;
														}
													}									
												}
											}
										}	
									}
								}	
							}
						}
		}
		else{
				if(model['involved_veh']!=null){
					if((num_truck > 0) || (num_total > 2)){
						if(num_medical > 0){
							if(num_truck == 0){
								CPI3_case3();
								//popup = 1;
							}
							else if(num_truck > 1){
								CPI3_case4();
								//popup = 1;
							}
							else if(num_truck == 1){
								if((num_medical > 0) || (tunnel_lane == true)){
									CPI3_case4();
									//popup = 1;
								}
								else {
									CPI3_case3();
									//popup = 1;
								}
							}
						}
						else if(num_medical == 0){
							if(num_tow == 0){
								CPI3_case2();
								//popup = 1;
							}
							else if(num_tow > 0){
								if(travel_drop > 3){
									if(num_truck == 0){
										CPI3_case3();
										//popup = 1;
									}
									else if(num_truck > 1){
										CPI3_case4();
										//popup = 1;
										
									}
									else if(num_truck == 1){
										if((num_medical > 0) || (tunnel_lane == true)){
											CPI3_case4();
											//popup = 1;
										}
										else {
											CPI3_case3();
											//popup = 1;
											
										}
									}							
								}
								else{
									if((model['season_time']!=null) || (model['hour_time']!=null)){
										//working
										if((hour == 'Night time') || (weekend == 'Weekend')){
											if(num_truck == 0){
												CPI3_case3();
												//popup = 1;
												
											}
											else if(num_truck > 1){
												CPI3_case4();
												//popup = 1;
											}
											else if(num_truck == 1){
												if((num_medical > 0) || (tunnel_lane == true)){
													CPI3_case4();
													//popup = 1;
												}
												else {
													CPI3_case3();
													//popup = 1;
													
												}
											}								
										}
										else{
											if(model['pavement_condition']!=null){
												if(pavement == 'Dry'){
													CPI3_case2();
													//popup = 1;
												}
												else{
													if(num_truck == 0){
														CPI3_case3();
														//popup = 1;
													}
													else if(num_truck > 1){
														CPI3_case4();
														//popup = 1;
													}
													else if(num_truck == 1){
														if((num_medical > 0) || (tunnel_lane == true)){
															CPI3_case4();	
															//popup = 1;
														}
														else {
															CPI3_case3();
															//popup = 1;
														}
													}									
												}
											}
										}	
									}
								}	
							}
						}
					}
					else{
						if(model['center_choice']!=null){
							if((center == 'TOC3') || (center == 'TOC4')){
								CPI3_case1();
								//popup = 1;
							}
							else if(center != 'SOC'){
								if(first_responder != 'FIREBOARD'){
									CPI3_case1();
									//popup = 1;
								}
								else if(first_responder == 'FIREBOARD'){
									if(num_medical > 0){
										CPI3_case3();
										//popup = 1;
									}
									else{
										CPI3_case2();
										//popup = 1;
									}
								}
							}
							else if(center == 'SOC'){
									if(num_medical > 0){
										CPI3_case3();
										//popup = 1;
										
									}
									else{
										CPI3_case2();
										//popup = 1;
									}						
							}
						}
					}
				}
		}		
	}
}

//cpd 2 lanes
function CPD2_case1(){
					drawSVG1(10, 40, 50, 80, "5~20", "65%");
					drawSVG2(10, 60, 20, 90, "5~30", "75%");
					drawSVG3(10, 70, 20, 100, "5~35", "80%");
					drawSVG4("Average CT = 30 mins");	
}
function CPD2_case2(){
					drawSVG1(40, 120, 60, 140, "20~60", "65%");
					drawSVG2(20, 120, 40, 140, "10~60", "70%");
					drawSVG3(20, 140, 40, 160, "10~70", "75%");
					drawSVG4("Average CT = 50 mins");		
}
function CPD2_case3(){
					drawSVG1(150, 240, 170, 250, "75~120", "60%");
					drawSVG2(140, 240, 160, 250, "70~120", "80%");
					drawSVG3(130, 240, 150, 250, "65~120", "100%");
					drawSVG4("Average CT = 85 mins");
}
function CPD2_case4(){
					drawSVG1(290, 300, 250, 300, ">=170", "100%");
					drawSVG2(0, 0, 0, 0, "", "");
					drawSVG3(0, 0, 0, 0, "", "");
					drawSVG4("Average CT = 200 mins");	
}

function CPD2_updateTime(){
	if(model['center_choice']!=null){
		if(center == 'AOC'){
			if(model['responder']!=null){
				if(num_tow <= 1){
					CPD2_case2();
					//popup = 1;
				}
				else if(num_tow > 1){
					if(model['involved_veh']!=null){
						if(num_truck == 0){
							CPD2_case3();
							//popup = 1;
						}
						else{ 
							if(num_fireboard > 0){
								CPD2_case4();
								//popup = 1;
							}
							else if(num_fireboard == 0){
								CPD2_case3();
								//popup = 1;
							}
						}
					}
				}
			}
		}
		else{
			if(model['responder'] != null){
				if(num_tow == 0){
					CPD2_case1();
					//popup = 1;
				}
				 
				else if(num_truck == 0){
					CPD2_case1();
					//popup = 1;
				}
				
				else if(num_truck > 0){
						if(num_tow > 1){						
							if(num_fireboard > 0){
								CPD2_case4();
								//popup = 1;								
							}
							else{
								CPD2_case3();
								//popup = 1;
								}
							
						}
						else{
							CPD2_case2();
							//popup = 1;
						}
				}
			}
		}
	}	
}

//cpd 3 lanes
function CPD3_case1(){
					drawSVG1(10, 50, 20, 60, "5~25", "60%");
					drawSVG2(10, 60, 30, 70, "5~30", "75%");
					drawSVG3(10, 70, 30, 80, "5~35", "80%");
					drawSVG4("Average CT = 20 mins")	
}
function CPD3_case2(){
					drawSVG1(40, 120, 60, 130, "20~60", "60%");
					drawSVG2(30, 130, 50, 140, "15~65", "70%");
					drawSVG3(20, 140, 40, 150, "10~70", "80%");
					drawSVG4("Average CT = 60 mins");	
}
function CPD3_case3(){
					drawSVG1(120, 240, 150, 250, "60~120", "60%");
					drawSVG2(110, 240, 130, 250, "55~120", "85%");
					drawSVG3(40, 240, 60, 250, "20~120", "100%");
					drawSVG4("Average CT = 65 mins");	
}
function CPD3_case4(){
					drawSVG1(240, 300, 260, 300, ">=120", "100%");
					drawSVG2(0,0, 0, 0, "", "");
					drawSVG3(0,0, 0, 0, "", "");
					drawSVG4("Average CT = 260 mins");	
}

function CPD3_updateTime(){
	if(model['responder']!=null){
		if((num_tow > 0) || (center == 'AOC') || ((num_total > 2) && (num_police > 1))){
			if((num_fireboard == 0) || (num_tow == 0)){
				CPD3_case2();
				//popup = 1;
			}
			else if((num_fireboard > 0) && (num_tow > 0)){
				if(model['involved_veh'] != null){
					if((num_total > 3) || (num_truck > 0)){
						if((num_chart > 3) || (num_responder > 8)){
							CPD3_case4();
							}
							
							
							
							
						else if(hour == 'Day time'){
								CPD3_case3();
								//popup = 1;
						}
						else if((hazmat == true) && (hour != 'Day time')){
								CPD3_case4();
						}
						
						else{
							CPD3_case3();
						}
							
							
							
							
						
					}
					else{
						CPD3_case2();
						//popup = 1;
					}
				}
			}
		}
		else if(num_tow == 0){
			
				if(center == 'AOC'){
					CPD3_case2();
					//popup = 1;
				}
				else if((center != 'AOC') && (center != null)){
					CPD3_case1();
					//popup = 1;
				}
			
		}	
	}
}

//cpd 1 lane
function CPD1_case1(){
	drawSVG1(10, 50, 20, 60, "5~25", "60%");
	drawSVG2(10, 60, 30, 70, "5~30", "70%");
	drawSVG3(10, 70, 30, 80, "5~35", "80%");
	drawSVG4("Average CT = 25 mins");
}
function CPD1_case2(){
	drawSVG1(50, 120, 70, 130, "25~60", "60%");
	drawSVG2(30, 120, 50, 130, "15~60", "70%");
	drawSVG3(20, 120, 40, 130, "10~60", "80%");
	drawSVG4("Average CT = 50 mins");
}
function CPD1_case3(){	
	drawSVG1(90, 240, 110, 250, "45~120", "70%");
	drawSVG2(60, 240, 80, 250, "30~120", "80%");
	drawSVG3(0, 0, 0, 0, "", "");
	drawSVG4("Average CT = 95 mins");
	
}
function CPD1_case4(){
	drawSVG1(240, 300, 250, 300, ">=120", "60%");
	drawSVG2(200, 300, 220, 300, ">=100", "100%");
	drawSVG3(0, 0, 0, 0, "", "");
	drawSVG4("Average CT = 135 mins");		
}


function CPD1_updateTime(){
	if(model['responder']!=null){
		if((num_tow == 0) || (center != 'AOC') || (num_chart <= 1)){
			if(model['pavement_condition'] != null){
				if (hazmat != true){
					if(pavement == 'Dry'){
						CPD1_case1();
						//popup = 1;
					}
					else if(model['weekend_time']!=null){
						if(weekend == 'Weekday'){
							CPD1_case1();
							//popup = 1;							
						}
						else if(model['involved_veh'] != null){
							if((hour == 'Day time') && (num_total < 4)){
								CPD1_case1();
								//popup = 1;
							}
							else if(model['location'] != null){
								if((num_total > 2) || (num_fireboard > 0) || (pavement == 'Wet') || (location_choice == 'Harford')){
									//continue num_truck
									if(num_truck == 0){
										CPD1_case2();
										//popup = 1;
									}
									else if(num_truck > 0){
										if(num_fireboard == 0){
											CPD1_case2();
											//popup = 1;
										}
										else if(num_fireboard > 0){
										//revised num_truck part
											if((model['pavement_condition'] != null)){
												if((num_tow > 1) || (hazmat == true) || (pavement == 'Chemical wet') || (pavement == 'Snow/Ice') || (center == 'AOC') || (num_chart > 2)){
													if((num_tow > 1) || (pavement == 'Chemical wet')){
														CPD1_case4();
														//popup = 1;
													}
													else{
														CPD1_case3();
														//popup = 1;
													}
												}
												else {
													if(model['hour_time'] != null){
														if(hour == 'Night time'){
															if((num_tow > 1) || (pavement == 'Chemical wet')){
																CPD1_case4();
																//popup = 1;
															}
															else{
																CPD1_case3();
																//popup = 1;
															}										
														}
														else{
															CPD1_case2();
															//popup = 1;
														}
													}
												}
												
											}
										// end 


										
										}

									}									
									
									
								}
								else {
									CPD1_case1();
									//popup = 1;
								}
							}
						}
					}
				} 
			}
		}
		else if((num_tow > 0) || (hazmat == true) || ((center == 'AOC') && (num_chart > 1)) ){
			if(model['involved_veh'] != null){
				if(num_truck == 0){
					CPD1_case2();
					//popup = 1;
				}
				else if(num_truck > 0){
					if(num_fireboard == 0){
						CPD1_case2();
						//popup = 1;
					}
					else if(num_fireboard > 0){
						if((model['pavement_condition'] != null)){
							if((num_tow > 1) || (hazmat == true) || (pavement == 'Chemical wet') || (pavement == 'Snow/Ice') || (center == 'AOC') || (num_chart > 2)){
								if((num_tow > 1) || (pavement == 'Chemical wet')){
									CPD1_case4();
									//popup = 1;
								}
								else{
									CPD1_case3();
									//popup = 1;
								}
							}
							else {
								if(model['hour_time'] != null){
									if(hour == 'Night time'){
										if((num_tow > 1) || (pavement == 'Chemical wet')){
											CPD1_case4();
											//popup = 1;
										}
										else{
											CPD1_case3();
											//popup = 1;
										}										
									}
									else{
										CPD1_case2();
										//popup = 1;
									}
								}
							}
							
						}				
					}

				}
			}	
		}
	}
		
}


//shoulder only model
function shoulder_case1(){
	drawSVG1(0, 60, 20, 80, "<30", "75%");
	drawSVG2(0, 0, 0, 0, "", "");
	drawSVG3(0, 0, 0, 0, "", "");
	//drawSVG4("");
	drawSVG4("P = " + (Math.round(prob * 100) / 100));  //for testing
}
function shoulder_case2(){
	drawSVG1(60, 300, 80, 300, ">=30", "75%");
	drawSVG2(0, 0, 0, 0, "", "");
	drawSVG3(0, 0, 0, 0, "", "");
	//drawSVG4("");
	drawSVG4("P = " + (Math.round(prob * 100) / 100));  //for testing
	
	
}
function shoulder_case3(){
	drawSVG1(20, 100, 40, 110, "10~50", "75%");
	drawSVG2(0, 0, 0, 0, "", "");
	drawSVG3(0, 0, 0, 0, "", "");
	//drawSVG4("");
	drawSVG4("P = " + (Math.round(prob * 100) / 100));  //for testing
	 
}

function shoulder_updateTime(){
	prob = 1/(1+Math.exp(-(-2.27-0.47*bc+0.07*cecil-0.28*harford+0.41*dry+0.98*snow+0.33*unspecified+0.84*wet-0.38*week+0.3*nonholiday
			-0.23*num_total+0.52*num_car+1.04*num_truck+0.26*num_responder+0.34*num_fireboard+0.43*num_medical-0.23*cpi
			+0.48*spring+0.37*summer+0.54*winter+0.08*daytime+0.23*nighttime)));
	console.log(prob);
	
if(model['responder'] != null){
		if(num_tow > 0){
			shoulder_case2();
			//popup = 1;
		}
		else{
			if((model['center_choice']!=null)){
				if(center != 'AOC'){
					shoulder_case1();
					//popup = 1;
				}
				else if(model['pavement_condition'] != null){
					if((num_responder == 1) && (pavement == 'Dry')){
						shoulder_case1();
						//popup = 1;
					}
					else{
						if(shoulder_drop == 2){
							shoulder_case2();
							//popup = 1;
						} 
						else{
							if (model['hour_time'] != null){
								if((cpi == 1) && ((hour == 'AM-peak') || (hour == 'Night time'))){
									shoulder_case2();
									//popup = 1;
								}
								else{
									if(hour == 'PM-peak'){
										shoulder_case1();
										//popup = 1;
									}
									else{
										if((model['location'] != null) && (model['involved_veh'] != null)){
											if((prob < 0.4) && (num_truck == 0)){
												shoulder_case1();
												//popup = 1;
											}
											else{
												if((prob < 0.5) && (num_fireboard > 0)){
													shoulder_case2();
													//popup = 1;
												}
												else{
													shoulder_case3();
													//popup = 1;
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}	
}

function NC_updateTime(){
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
        drawSVG1(120, 300, 140, 300, "60~240", "100%");
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
// need more input situation
    else if(model['collision'] == 'Vehicles on Fire'){
        drawSVG1(10, 90, 30, 100, "5~45", "60%");
        drawSVG2(10, 120, 30, 130, "5~60", "70%");
        drawSVG3(10, 180, 30, 190, "5~90", "80%");
        drawSVG4("Average CT = 45 mins");  
		NC_VF_updateTime();
    }
    else if(model['collision'] == 'Emergency Roadwork'){
                        $("#first_stop").text("100min");
                        $("#second_stop").text("200min");
                        $("#fourth_stop").text("400min");
                             
                        drawSVG1(10, 95, 40 , 105, "5~160", "60%");
                        drawSVG2(10, 145, 60, 155, "5~240", "70%");
                        drawSVG3(10, 195, 80, 205, "5~330", "80%");
                        drawSVG4("Average CT = 170 mins"); 
						NC_ER_updateTime();
    }
    else if(model['collision'] == 'Off-road Activity'){
        drawSVG1(0, 60, 20, 70, "<30", "60%");
        drawSVG2(0, 90, 20, 100, "<45", "70%");
        drawSVG3(0, 120, 20, 130, "<60", "80%");
        drawSVG4("Average CT = 40 mins");
		NC_ORA_updateTime();
    }
     
}

function NC_VF_updateTime(){
	if((num_tow > 0) || (num_medical > 0) || (total_lane > 3) || (tunnel_lane == true) || (pavement == 'Snow/Ice')){
		drawSVG1(60, 300, 80, 300, ">=30", "85%");
        drawSVG2(0, 0, 0, 0, "", "");
        drawSVG3(0, 0, 0, 0, "", "");
        drawSVG4("Average CT = 80 mins");
	}
	else{
		drawSVG1(0, 60, 20, 70, "<30", "70%");
        drawSVG2(0, 0, 0, 0, "", "");
        drawSVG3(0, 0, 0, 0, "", "");
        drawSVG4("Average CT = 25 mins");
	}
}

function NC_ER_updateTime(){
	if((location_choice == 'Cecil') || (location_choice == 'Harford') || (hour == 'AM-peak' && total_lane > 1) || (hour == 'Night time' && aux_lane==true)
		|| (season == 'Winter' && hour == 'AM-peak') || (nonholiday == 1 && hour == 'Night time') || (hour == 'Night time' && pavement == 'Wet')){
                        $("#first_stop").text("30min");
                        $("#second_stop").text("60min");
                        $("#fourth_stop").text("120min");			
		drawSVG1(240, 300, 250, 300, ">=120", "75%");
        drawSVG2(0, 0, 0, 0, "", "");
        drawSVG3(0, 0, 0, 0, "", "");
        drawSVG4("Average CT = 300 mins");			
		}
	else{
		                $("#first_stop").text("300min");
                        $("#second_stop").text("60min");
                        $("#fourth_stop").text("120min");
		drawSVG1(0, 240, 10, 250, "<120", "75%");
        drawSVG2(0, 0, 0, 0, "", "");
        drawSVG3(0, 0, 0, 0, "", "");
        drawSVG4("Average CT = 120 mins");		
	}	
}

function NC_ORA_updateTime(){
	if((location_choice == 'AOC') || (weekend == 'Weekend')){
		drawSVG1(60, 300, 80, 300, ">=30", "65%");
        drawSVG2(0, 0, 0, 0, "", "");
        drawSVG3(0, 0, 0, 0, "", "");
        drawSVG4("Average CT = 55 mins");		
	}
	else{
		drawSVG1(0, 60, 10, 80, "<30", "85%");
        drawSVG2(0, 0, 0, 0, "", "");
        drawSVG3(0, 0, 0, 0, "", "");
        drawSVG4("Average CT = 20 mins");
	}
}

function CF_case1(){
                        $("#first_stop").text("100min");
                        $("#second_stop").text("200min");
                        $("#fourth_stop").text("400min");
                             
                        drawSVG1(90, 126, 136, 250, "150~210", "70%");
                        drawSVG2(90, 162, 100, 250, "150~270", "80%");
                        drawSVG3(36, 162, 56, 250, "60~270", "100%");
                        drawSVG4("Average CT = 170 mins");  
}
function CF_case2(){
                        $("#first_stop").text("100min");
                        $("#second_stop").text("200min");
                        $("#fourth_stop").text("400min");
                         
                        drawSVG1(126, 162, 172, 250, "210~270", "70%");
                        drawSVG2(126, 180, 190, 250, "210~300", "80%");
                        drawSVG3(18, 180, 38, 250, "30~300", "100%");
                        drawSVG4("Average CT = 210 mins");
}
function CF_case3(){
                        $("#first_stop").text("100min");
                        $("#second_stop").text("200min");
                        $("#fourth_stop").text("400min");
                         
                        drawSVG1(126, 162, 176, 250, "210~270", "75%");
                        drawSVG2(108, 162, 176, 250, "180~270", "100%");
                        drawSVG3(0, 0, 0, 130, "", "");
                        drawSVG4("Average CT = 230 mins");
}
function CF_case4(){
                        $("#first_stop").text("100min");
                        $("#second_stop").text("200min");
                        $("#fourth_stop").text("400min");
                         
                        drawSVG1(198, 270, 210, 280, "330~450", "60%");
                        drawSVG2(198, 288, 218, 298, "330~480", "80%");
                        drawSVG3(72, 288, 92, 298, "120~480", "100%");
                        drawSVG4("Average CT = 350 mins");  
}

function CF_updateTime(){
	if((travel_drop > 3) || (num_total > 2) || (num_truck > 1) || (num_tow > 1)){
		if(num_truck > 0){
			CF_case4();
		}
		else{
			CF_case2();
		}
	}
	else{
		if(num_total > 1){
			CF_case3();
		}
		else{
			CF_case1();
		}
	}
	
	
}
