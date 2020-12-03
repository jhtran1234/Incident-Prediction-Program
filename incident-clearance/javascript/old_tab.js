"use strict";

var model = {};




$(document).ready(function(){
                $('.timepicker').wickedpicker();
				
				
				
				
	            $("#datepicker").datepicker({
				defaultDate: new Date(),
                onSelect: function(dateText, inst) {
                    var date = $.datepicker.parseDate(inst.settings.dateFormat || $.datepicker._defaults.dateFormat, dateText, inst.settings);
                    var dateText = $.datepicker.formatDate("DD", date, inst.settings);
                    $("p.name").html( dateText ); // Just the day of week
                }
            });
			 $( "#datepicker" ).val($.datepicker.formatDate("mm-dd-yy", new Date()));

			
			    
			
	

	
	$('.incident-info .menu .item').tab();
	 document.getElementById("summary").innerHTML = localStorage.getItem("sumBox");
	
	 model['incident'] = localStorage.getItem("sumBox");
	

	$("#checkbox-size input").click(updateSum);
    $("#checkbox-size input").click(updateTime);
	
	
	
	// $("#Next").click(nextButtonHandler);
											$("#Next").click(function(){
												var radioValue = $("input[name='incident']:checked").val();
												if(radioValue == 'collision'){
													parent.location='hidden_types.html';
												}
											});
	
	
});


			function updateSum(){
				var sumBox = document.getElementById("summary").innerHTML;
				console.log(sumBox);
				var incident = $(this).parent().find("label").text();
				model['incident2'] = incident;
				console.log(model);
				$("#summary").empty();
				for (var key in model){
					$("#summary").append('<div>'+model[key]+'</div>');
				}
				//sumBox.value = sumBox.value + $("#summary").append('<div>'+incident+'</div>');
				console.log(sumBox); 
			    localStorage.setItem("sumBox", sumBox);
				console.log(localStorage.setItem("sumBox", sumBox));
			}

			function updateTime() {
				var currPos = $(this).parent().find("label").text();
				console.log(currPos);
				if (currPos == "Travel lane blockage"){
					$("#estimation #time_line").text("Average CT = 45 mins");
				}
            }

			function goBack() {
				window.history.back()
			}
			
// function nextButtonHandler() {
	// let currTab = $(".ui.bottom.attached.tab.segment.active");
	// let dataTabNum = parseInt(currTab.data("tab"));
	// if (currTab === "Type") {
		// let type1 = document.getElementById("type1");
		// let type2 = document.getElementById("type2");
		// let type3 = document.getElementById("type3");
		// let type4 = document.getElementById("type4");
		// if (type1.visibility === "true") {
			// type1.visibility = "false";
			// type2.visibility = "true";
		// }
		// else if (type2.visibility === "true") {
			// type2.visibility = "false";
			// type3.visibility = "true";
		// }
		// else if (type3.visibility === "true") {
			// type3.visibility = "false";
			// type4.visibility = "true";
		// }
		// else {
			// type4.visibility = "false";
			// let tabToShow = $("div.item").filter(function (){
				// return $(this).data("tab") == dataTabNum + 1;
			// });
		// }
	// } else {
	
		// let tabToShow = $("div.item").filter(function (){
			// return $(this).data("tab") == dataTabNum + 1;
		// });
	// }
	// $(tabToShow).trigger("click");
// };