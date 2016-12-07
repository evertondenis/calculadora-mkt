<?php
require 'lib/phpmailer/PHPMailerAutoload.php';

$name = 'Everton Denis';
$site = 'http://teste.com.br';
$email = 'everton@teste.com.br';

try {		
	$mail = new PHPMailer;

	$mail->SMTPDebug = 1;

	$mail->isSMTP();
	$mail->Host = 'smtp.gmail.com';
	$mail->SMTPAuth = true;
	$mail->Username = 'evertondevtest@gmail.com';
	$mail->Password = 'evertondevtest@';
	// $mail->Username = 'analytics@nextidea.com.br';
	// $mail->Password = 'NXI201510';
	$mail->SMTPSecure = 'tls';
	$mail->Port = 587;

	$mail->setFrom('analytics@nextidea.com.br', 'Calculadora Inbound');
	$mail->addAddress('evertondenis@gmail.com', 'Everton Denis');
	$mail->addReplyTo('analytics@nextidea.com.br', 'Calculadora Inbound');
	
	$email_content = "Nome: $name<br>";
	$email_content .= "Email: $email<br>";
	$email_content .= "Site/Blog: $site<br>";

	$mail->isHTML(true);

	$mail->Subject = 'Calculo Resultado';
	$mail->Body    = $email_content;
	$mail->AltBody = '';

	$mail->send();
	echo 'Mensagem enviada!';
} catch (phpmailerException $e) {
	echo $e->errorMessage();
}