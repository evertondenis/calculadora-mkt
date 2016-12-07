$(document).ready(function(){

	$(function(){
		$('#download-form').submit(function(e){
			e.preventDefault();

			generatePDF(true);

			// var output = generatePDF(false);
			// $('#pdf').val(output);
			// var t = new Date();
			// t = t.getTime();
			// $('#urlrd').val('https://nextidea.com.br/calculadora-inbound/pdf/calculadoraResultados' + t + '.pdf');
			// $('#nomearquivo').val(t);

			// // generatePDF(true);

			// /* SEND EMAIL NEXT IDEA */
			// var form = $('#download-form');
			// var formData = $(form).serialize();

			// $.ajax({
			// 	type: 'POST',
			// 	url: $(form).attr('action'),
			// 	async: true,
			// 	data: formData,
			// 	success: function(data) {
			// 		console.log(data);
			// 		$('#modalDownload').modal("hide");
			// 		generatePDF(true);
			// 	},
			// 	beforeSend: function() {
			// 		$('.loading').fadeIn('fast');
			// 	},
			// 	complete: function(){
			// 		$('.loading').fadeOut('fast');
			// 	}
			// });

			// console.log('Send pdf download RD');
	  //       var $mail =  $('#emailAddressSend').val();
	  //       var $nome =  $('#nome').val();
	  //       var $site =  $('#websiteUrl').val();
	  //       var $pdf =  $('#urlrd').val();
	        
	  //       var data_array = [
	  //         { name: 'nome', value: $nome },
	  //         { name: 'email', value: $mail },
	  //         { name: 'site', value: $site },
	  //         { name: 'pdf', value: $pdf },
	  //         { name: 'identificador', value: 'form_donwload_calculadora' },
	  //         { name: 'token_rdstation', value: 'b78b302174f6b5a40be1ed933d8b9758' }
	  //       ];

	  //       RdIntegration.post(data_array, function(){
	  //           return false;
	  //       });
		});

		$('#email-form').submit(function(e){

			// Stop the browser from submitting the form.
			e.preventDefault();

			/* PDF */
			var output = generatePDF(false);
			$('#pdf2').val(output);
			var t = new Date();
			t = t.getTime();
			$('#urlrd2').val('https://nextidea.com.br/calculadora-inbound/pdf/calculadoraResultados' + t + '.pdf');
			$('#nomearquivo2').val(t);

			/* SEND EMAIL */
			var form = $('#email-form');
			var formData = $(form).serialize();

			$.ajax({
				type: 'POST',
				url: $(form).attr('action'),
				// url: 'http://calculadora-resultados/send-email.php',
				async: true,
				data: formData,
				success: function(data) { /* sucesso */
					// $('#retornoHTML').html(data);
					console.log(data);
					$('#modalDownloadEmail').modal("hide");
					$('#modalSuccess').modal("show");
				},
				beforeSend: function() { /* antes de enviar */
					$('.loading').fadeIn('fast');
				},
				complete: function(){ /* completo */
					$('.loading').fadeOut('fast'); //wow!
				}
			});

			console.log('Send pdf RD');
	        var $mail =  $('#emailAddress').val();
	        var $nome =  $('#nome2').val();
	        var $site =  $('#websiteUrl2').val();
	        var $pdf =  $('#urlrd2').val();
	        
	        var data_array = [
	          { name: 'nome', value: $nome },
	          { name: 'email', value: $mail },
	          { name: 'site', value: $site },
	          { name: 'pdf', value: $pdf },
	          { name: 'identificador', value: 'form_send_calculadora' },
	          { name: 'token_rdstation', value: 'b78b302174f6b5a40be1ed933d8b9758' }
	        ];

	        RdIntegration.post(data_array, function(){
	            return false;
	        });
		});

		
		return false;
	});

	
});


/**************************** CALCULATIONS ****************************/

$(document).ready(function(){

	$('.glyphicon').tooltip();

	$('input').on('change', function(){

		var ratio = Math.round(($('#B4').val()/$('#B3').val())*10000)/100;

		$('#F3').text(isFinite(ratio)? ratio: 0);
		$('#F4').text(Math.round(($('#B4').val()/100 * $('#B5').val())*100)/100);
		$('#F5').text(Math.round(($('#F4').text()*($('#B6').val()/100) )*100)/100);
		$('#F6').text( formatMoney(Math.round(($('#B7').val()*$('#F5').text())*100)/100) );

		var x =Math.round((((( ($('#F3').text()/100+0.01)*$('#B3').val())*$('#B5').val()/100)*$('#B6').val()/100)*$('#B7').val())- unformat($('#F6').text()) );
		$('#A10').text("+ R$"+ formatMoney((isNaN(x)? 0 : x),2) );

		var y = Math.round(( ($('#B3').val()*1.3) * ($('#F3').text()/100) *($('#B5').val()/100) * ($('#B6').val()/100) *$('#B7').val())- unformat($('#F6').text()) );

		$('#D10').text("+ R$"+ formatMoney((isNaN(y)? 0 : y),2));

		var z = Math.round( (((((  $('#F3').text()/100  +0.01)*( $('#B3').val() *1.3))* $('#B5').val()/100 )* $('#B6').val()/100 )* $('#B7').val() )-  unformat($('#F6').text())   );

		$('#B13').text("+ R$"+ formatMoney((isNaN(z)? 0 : z),2));

		$('#B16').text( formatMoney( (((((($('#F3').text()/100 +parseFloat($('#A16').text())/100 )*$('#B3').val() )*$('#B5').val()/100 )*$('#B6').val()/100 )*$('#B7').val() )- unformat($('#F6').text())  ),2 ));
		$('#B17').text( formatMoney( (((((($('#F3').text()/100 +parseFloat($('#A17').text())/100 )*$('#B3').val() )*$('#B5').val()/100 )*$('#B6').val()/100 )*$('#B7').val() )- unformat($('#F6').text())  ),2 ));
		$('#B18').text( formatMoney( (((((($('#F3').text()/100 +parseFloat($('#A18').text())/100 )*$('#B3').val() )*$('#B5').val()/100 )*$('#B6').val()/100 )*$('#B7').val() )- unformat($('#F6').text())  ),2 ));
		$('#B19').text( formatMoney( (((((($('#F3').text()/100 +parseFloat($('#A19').text())/100 )*$('#B3').val() )*$('#B5').val()/100 )*$('#B6').val()/100 )*$('#B7').val() )- unformat($('#F6').text())  ),2 ));
		$('#B20').text( formatMoney( (((((($('#F3').text()/100 +parseFloat($('#A20').text())/100 )*$('#B3').val() )*$('#B5').val()/100 )*$('#B6').val()/100 )*$('#B7').val() )- unformat($('#F6').text())  ),2 ));

		$('#D16').text( formatMoney(( ((($('#B3').val()*(1+ parseFloat($('#C16').text())/100))*$('#F3').text()/100*($('#B5').val()/100)*($('#B6').val()/100)*$('#B7').val())- unformat($('#F6').text()) )),2) );
		$('#D17').text( formatMoney(( ((($('#B3').val()*(1+ parseFloat($('#C17').text())/100))*$('#F3').text()/100*($('#B5').val()/100)*($('#B6').val()/100)*$('#B7').val())- unformat($('#F6').text()) )),2) );
		$('#D18').text( formatMoney(( ((($('#B3').val()*(1+ parseFloat($('#C18').text())/100))*$('#F3').text()/100*($('#B5').val()/100)*($('#B6').val()/100)*$('#B7').val())- unformat($('#F6').text()) )),2) );
		$('#D19').text( formatMoney(( ((($('#B3').val()*(1+ parseFloat($('#C19').text())/100))*$('#F3').text()/100*($('#B5').val()/100)*($('#B6').val()/100)*$('#B7').val())- unformat($('#F6').text()) )),2) );
		$('#D20').text( formatMoney(( ((($('#B3').val()*(1+ parseFloat($('#C20').text())/100))*$('#F3').text()/100*($('#B5').val()/100)*($('#B6').val()/100)*$('#B7').val())- unformat($('#F6').text()) )),2) );

		$('#E16').text(formatMoney((((((((($('#F3').text()/100)+(parseFloat($('#A16').text())/100))*($('#B3').val()*(1+ parseFloat($('#C16').text())/100))*($('#B5').val()/100))*($('#B6').val()/100))*$('#B7').val())- unformat($('#F6').text()) ))),2));
		$('#E17').text(formatMoney((((((((($('#F3').text()/100)+(parseFloat($('#A17').text())/100))*($('#B3').val()*(1+ parseFloat($('#C17').text())/100))*($('#B5').val()/100))*($('#B6').val()/100))*$('#B7').val())- unformat($('#F6').text()) ))),2));
		$('#E18').text(formatMoney((((((((($('#F3').text()/100)+(parseFloat($('#A18').text())/100))*($('#B3').val()*(1+ parseFloat($('#C18').text())/100))*($('#B5').val()/100))*($('#B6').val()/100))*$('#B7').val())- unformat($('#F6').text()) ))),2));
		$('#E19').text(formatMoney((((((((($('#F3').text()/100)+(parseFloat($('#A19').text())/100))*($('#B3').val()*(1+ parseFloat($('#C19').text())/100))*($('#B5').val()/100))*($('#B6').val()/100))*$('#B7').val())- unformat($('#F6').text()) ))),2));
		$('#E20').text(formatMoney((((((((($('#F3').text()/100)+(parseFloat($('#A20').text())/100))*($('#B3').val()*(1+ parseFloat($('#C20').text())/100))*($('#B5').val()/100))*($('#B6').val()/100))*$('#B7').val())- unformat($('#F6').text()) ))),2));

	});

// $('#B3').val(10000);
// $('#B4').val(500);
// $('#B5').val(25);
// $('#B6').val(50);
// $('#B7').val(1000).trigger('change');


// $('#more-stats').click(function(){
// 	$('#details').slideToggle();

// 	$('html, body').animate({
// 		scrollTop: $("#details").offset().top
// 	}, 500);
// });

$('.js-result-fadeIn').waypoint(function(direction) {
	$(this.element).toggleClass("fadeIn");
}, {offset: '90%'});

$('#section-results').waypoint(function(direction) {
	$( ".js-col-fadeUp" ).each(function(i) {
  		$(this).clearQueue().delay(80*i).queue(function(){
  			$(this).addClass('fadeInUp');
  		});
	});

}, {offset: '90%'});

$('#section-projections').waypoint(function(direction) {
	$( ".js-col2-fadeUp" ).each(function(i) {
  		$(this).clearQueue().delay(80*i).queue(function(){
  			$(this).addClass('fadeInUp');
  		});
	});

}, {offset: '90%'});

$('#details').waypoint(function(direction) {
	$( ".js-tables-fadeUp" ).each(function(i) {
  		$(this).clearQueue().delay(80*i).queue(function(){
  			$(this).addClass('fadeInUp');
  		});
	});

}, {offset: '90%'});


function formatMoney(n, c, d, t){
// var n = this, 
c = isNaN(c = Math.abs(c)) ? 2 : c, 
d = d == undefined ? "," : d, 
t = t == undefined ? "." : t, 
s = n < 0 ? "-" : "", 
i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
j = (j = i.length) > 3 ? j % 3 : 0;
return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

function unformat(n){
	return parseFloat(n.replace(/,/g, ''));
}
$('input').on('blur', function(){ $(this).trigger('change'); })


$('#B3').number(true);
$('#B4').number(true);
$('#B5').number(true,2);
$('#B6').number(true,2);
$('#B7').number(true,2);
});//end ready


/***************************** PDF Generation ******************************/

function generatePDF($download_flag){
	var doc = new jsPDF();
	var logo = "data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABkAAD/4QN/aHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NGNlMzkxYTctY2Q0YS1hZjRmLWEyMmUtZDQwYjhjMjUzMGU5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjQ3M0U2REYzQUNCQzExRTY5MDE3QTNFMzFFQkQwQUMxIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjQ3M0U2REYyQUNCQzExRTY5MDE3QTNFMzFFQkQwQUMxIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjNkMmI0YTY3LTA3NzctMDU0Mi1iMjEwLTY3YmU2NGVhODU3MiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0Y2UzOTFhNy1jZDRhLWFmNGYtYTIyZS1kNDBiOGMyNTMwZTkiLz4gPC9yZGY6RGVzY3JpcHRpb24+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";
	var icoTel = "data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABkAAD/4QN3aHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6YzFlNDc1NzgtYzcyOS1iODQ5LWE3MzUtNGMzZDE1NDZhMzVjIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjFDQkRBRjQ5QUZGRTExRTY5RjkzRkRFQUUzM0ZGMTlCIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjFDQkRBRjQ4QUZGRTExRTY5RjkzRkRFQUUzM0ZGMTlCIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjUyNDBCODhDQUZGODExRTY4RThEQ0MwOEZFRDVDQzI1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjUyNDBCODhEQUZGODExRTY4RThEQ0MwOEZFRDVDQzI1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpS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";
	var map = "data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABkAAD/4QN3aHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6YzFlNDc1NzgtYzcyOS1iODQ5LWE3MzUtNGMzZDE1NDZhMzVjIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjE1MEJEM0ZDQUZGRTExRTZBNjBDRUJCNzA2RkM5RUIwIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjE1MEJEM0ZCQUZGRTExRTZBNjBDRUJCNzA2RkM5RUIwIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjUyNDBCODk0QUZGODExRTY4RThEQ0MwOEZFRDVDQzI1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjUyNDBCODk1QUZGODExRTY4RThEQ0MwOEZFRDVDQzI1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpS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";
	var logoFooter = "data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABkAAD/4QN3aHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6YzFlNDc1NzgtYzcyOS1iODQ5LWE3MzUtNGMzZDE1NDZhMzVjIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjA5MThDNTVDQUZGRTExRTY5NEVDRkI3RDQwQzFBMjg4IiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjA5MThDNTVCQUZGRTExRTY5NEVDRkI3RDQwQzFBMjg4IiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjUyMjg0RTg5QUZGODExRTY4RThEQ0MwOEZFRDVDQzI1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjUyMjg0RThBQUZGODExRTY4RThEQ0MwOEZFRDVDQzI1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpS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";

	doc.addImage(logo, 'JPEG', 130, 8);
	doc.setTextColor(72,80,86);
	doc.setFontSize(22);
	doc.text(65,30,"Métricas atuais do site");
	doc.setDrawColor(23, 167, 231);
	doc.setFontSize(13);
	y=35;

	doc.setTextColor(0);
	doc.line(15, y, 195, y); y=y+10;
	doc.text(20, y-3, "Site/Blog");
	if ($('#websiteUrl').val() != '') {doc.text(120, y-3, $('#websiteUrl').val() );} else {doc.text(120, y-3, $('#websiteUrl2').val() );}
	doc.line(15, y, 195, y); y=y+10;
	doc.text(20, y-3, "Média mensal de visitantes");
	doc.text(120, y-3, $.number( $("#B3").val() ) );
	doc.line(15, y, 195, y); y=y+10;
	doc.text(20, y-3, "Média de leads por mês");
	doc.text(120, y-3, $.number( $("#B4").val() ) );
	doc.line(15, y, 195, y); y=y+10;
	doc.text(20, y-3, "Porcentagem de Leads Qualificados");
	doc.text(120, y-3, $.number( $("#B5").val() )+"%" );
	doc.line(15, y, 195, y); y=y+10;
	doc.text(20, y-3, "Porcentagem de Leads que viram clientes");
	doc.text(120, y-3, $.number( $("#B6").val() )+"%" );
	doc.line(15, y, 195, y); y=y+10;
	doc.text(20, y-3, "Lifetime Value");
	doc.text(120, y-3, "R$"+$.number($("#B7").val() ) );
	doc.line(15, y, 195, y); y=y+10;
	doc.line(15, 35, 15, 95); 
	doc.line(195, 35, 195, 95); 
	
	doc.setFontSize(11);

	doc.setDrawColor(200);
	doc.setFillColor(250);
	doc.roundedRect(40, 100, 60, 25, 2, 2, 'FD'); 
	doc.roundedRect(110, 100, 60, 25, 2, 2, 'FD');

	doc.roundedRect(40, 132, 60, 25, 2, 2, 'FD'); 
	doc.roundedRect(110, 132, 60, 25, 2, 2, 'FD');

	doc.text(48,120,"Sua taxa de conversão");
	doc.text(114,120,"Média leads Qualificados/Mês");
	doc.text(45,153,"Média novos Clientes/Mês");
	doc.text(121,153,"Lucro Bruto/Mês");

	doc.setFontSize(20);
	doc.setTextColor(40,151,203);

	doc.text(50,112, $("#F3").text()+"%" );
	doc.text(120,112, $("#F4").text() );

	doc.text(50,145, $("#F5").text() );
	doc.text(120,145,"R$"+$("#F6").text() );
	doc.line(15, 165, 195, 165);

	doc.setTextColor(72,80,86);
	doc.text(65,178,"Potencial de crescimento");

	doc.setDrawColor(23, 167, 231);
	doc.setFillColor(23, 167, 231);
	doc.roundedRect(15, 190, 58, 25, 2, 2, 'FD'); 
	doc.roundedRect(78, 190, 58, 25, 2, 2, 'FD'); 
	doc.roundedRect(140, 190, 58, 25, 2, 2, 'FD'); 

	doc.setTextColor(255);
	doc.text(22,202,$("#A10").text());
	doc.text(82,202,$("#D10").text());
	doc.text(144,202,$("#B13").text());

	doc.setFontSize(9.5);
	doc.text(17,208,"         Com Aumento de 1% na \n           Taxa de Conversão");
	doc.text(79,208,"         Com 30% de Aumento no \n                Tráfego do Site");
	doc.text(141,207,"         Com Aumento de 1% na \n              Taxa de Conversão \n         e 30% no Tráfego do Site");

	doc.setFontSize(9.5);
	doc.setTextColor(0);

	doc.text(15,268,"nextidea.com.br");

	doc.setDrawColor(200);
	doc.setFillColor(250);
	doc.line(15, 270, 195, 270);	

	doc.addImage(icoTel, 'JPEG', 15, 275);
	doc.text(28,280,"São Paulo/SP\n+55 11 3280-4320");
	
	doc.addImage(icoTel, 'JPEG', 65, 275);
	doc.text(78,280,"Joinville/SC\n+55 47 3025-4320");
	
	doc.addImage(map, 'JPEG', 115, 275);
	doc.text(128,280,"Rua São Paulo, 31,\nSala 10, Joinville / SC");

	doc.addImage(logoFooter, 'JPEG', 168, 275);

	if($download_flag){
		console.log('pdf criado e download!');
		doc.save('Calculadora-de-Resultados.pdf');
	}
	else{
		console.log('pdf criado!');
		return doc.output('datauristring');
	}
}