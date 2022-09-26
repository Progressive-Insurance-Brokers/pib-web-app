
$(window).load(function(){
	
	
	var ContactUs = function () {

    return {
        //main function to initiate the module
        init: function () {
			var map;
			$(document).ready(function(){
			  map = new GMaps({
				div: '#map',
	            lat: -13.004333,
				lng: -38.494333,
			  });
			   var marker = map.addMarker({
		            lat: -13.004333,
					lng: -38.494333,
		            title: 'Loop, Inc.',
		            infoWindow: {
		                content: "<b>Loop, Inc.</b> 795 Park Ave, Suite 120<br>San Francisco, CA 94107"
		            }
		        });

			   marker.infoWindow.open(map, marker);
			});
        }
    };

}();

//Contac Form
	
	$('#send').click(function(){ // when the button is clicked the code executes
		$('.error').fadeOut('slow'); // reset the error messages (hides them)
		$('label').fadeOut('slow');

		var error = false; // we will set this true if the form isn't valid

		var name = $('input#name').val(); // get the value of the input field
		if(name === "" || name === " " || name === "Name") {
			$('label[for=name]').fadeIn('slow'); // show the error message
			error = true; // change the error state to true
		}
		else{
			$('label[for=name]').fadeOut('slow');
			}
		
		var subject = $('input#subject').val(); // get the value of the input field
		if(subject === "" || subject === " " || subject === "Subject") {
			$('label[for=subject]').fadeIn('slow'); // show the error message
			error = true; // change the error state to true
		}
		else{
			$('label[for=subject]').fadeOut('slow');
			}
			
		var phone = $('input#phone').val(); // get the value of the input field
		if(phone === "" || phone === " " || phone === "Phone") {
			$('label[for=phone]').fadeIn('slow'); // show the error message
			error = true; // change the error state to true
		}
		else{
			$('label[for=phone]').fadeOut('slow');
			}
		
				
		var email_compare = /^([a-z0-9_.-]+)@([da-z.-]+).([a-z.]{2,6})$/; // Syntax to compare against input
		var email = $('input#email').val(); // get the value of the input field
		if (email === "" || email === " " || email === "E-mail") { // check if the field is empty
			$('label[for=email]').text("*Please enter email").fadeIn('slow'); // error - empty
			error = true;
		}else if (!email_compare.test(email)) { // if it's not empty check the format against our email_compare variable
			$('label[for=email]').text("*Invalid mail").fadeIn('slow'); // error - not right format
			error = true;
		}
		else{
			$('label[for=email]').fadeOut('slow');
		}
    
		var message = $('textarea#message').val(); // get the value of the input field
		if(message === "" || message === " " || message === "Message") {
			$('label[for=message]').fadeIn('slow'); // show the error message
			error = true; // change the error state to true
		} 
		else{
			$('label[for=message]').fadeOut('slow');
		}

		var data_string = $('#ajax-form').serialize(); // Collect data from form
		//alert(data_string);

		$.ajax({
			type: 'POST',
			url: 'php/mailto.php',
			data: data_string,
			timeout: 6000,
			error: function(request,error) {
				if (error === "timeout") {
					$('#err-timedout').slideDown('slow');
				}
				else {
					$('#err-state').slideDown('slow');
					$("#err-state").html('<strong>*An error occurred: ' + error + '</strong>');
				}
			},
			success: function() {
				//$('#ajax-form').slideUp('slow');
				$('#ajaxsuccess').slideDown('slow');
        $('#ajaxsuccess').delay(4000);
        $('#ajaxsuccess').fadeOut(1000);

        $("#name").val('');
        $("#email").val('');
        $("#message").val('');
		$("#phone").val('');
        $("#subject").val('');
			}
		});
	  
	return false; // stops user browser being directed to the php file
	}); // end click function
	
	
});
//Cancel Button
	$('#cancel').click(function(){
		$("#name").val('');
        $("#email").val('');
        $("#message").val('');
		$("#phone").val('');
        $("#subject").val('');
		});