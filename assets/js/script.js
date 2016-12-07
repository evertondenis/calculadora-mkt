$(document).ready(function() {
	// $("#conteudo").load('calculator.html', function() {
	// 	console.log('conteúdo carregado');
	// 	$('.insert-email').slideToggle();
	// });

    document.getElementById('email').focus();
	
    $("#btn-send").click(function(event) {
		var email = $("#email").val();

		// if(isValidEmailAddress(email)) {
			$("#conteudo").load('calculator.html', function() {
				console.log('conteúdo carregado!');
                // document.getElementById('B3').focus();

				$('.insert-email').slideToggle();

                $( ".js-col-fadeUp" ).each(function(i) {
                    $(this).clearQueue().delay(80*i).queue(function(){
                        $(this).toggleClass('fadeInUp');
                    });
                });
                
                $( ".js-col2-fadeUp" ).each(function(i) {
                    $(this).clearQueue().delay(80*i).queue(function(){
                        $(this).toggleClass('fadeInUp');
                    });
                });

                $( ".js-tables-fadeUp" ).each(function(i) {
                    $(this).clearQueue().delay(80*i).queue(function(){
                        $(this).toggleClass('fadeInUp');
                    });
                });

                $('#emailAddressSend').val(email);
                $('#emailAddress').val(email);

			});
            // sendEmailRD();
            // function sendEmailRD(){
                console.log('Send email RD');
                var $mail =  $('#email').val();
                var data_array = [
                  { name: 'email', value: $mail }, 
                  { name: 'identificador', value: 'form_email_calculadora' },
                  { name: 'token_rdstation', value: 'b78b302174f6b5a40be1ed933d8b9758' }
                ];

                // RdIntegration.post(data_array, function(){
                //     return false;
                // });
            // }
		// } else {
		// 	$("#email").css({
  //               "border-color": "#fE4940"
  //           });
		// }

       
	});

    
    $('.js-waypoint-fadeIn').waypoint(function(direction) {
      // $('.js-waypoint').addClass('fadeIn');
      $(this.element).toggleClass("fadeIn");
    }, {offset: '90%'});

});
function aviso(){
	alert('O conteúdo será carregado agora!');
}

$("#email").keyup(function() {

    var email = $("#email").val();

    if(email != 0) {
        if(isValidEmailAddress(email)) {
            $("#email").css({
                "border-color": "#ccc"
            });
        } else {
            $("#email").css({
                "border-color": "#fe4940"
            });
        }
    } else {
        $("#email").css({
            "background-color": "#FFFFFF"
        });         
    }
});

function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    return pattern.test(emailAddress);
}