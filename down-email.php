<?php
require 'lib/phpmailer/PHPMailerAutoload.php';

$name = strip_tags(trim($_POST["nome"]));
	$name = str_replace(array("\r","\n"),array(" "," "),$name);
$site = strip_tags(trim($_POST["url"]));
	$site = str_replace(array("\r","\n"),array(" "," "),$site);
$email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
$pdf = $_FILES["pdf"];
$pdfname = $_POST["nomearquivo"];

try {		
	$mail = new PHPMailer;

	$mail->isSMTP();
	$mail->Host = 'smtp.gmail.com';
	$mail->SMTPAuth = true;
	$mail->Username = 'email@gmail.com';
	$mail->Password = 'senha';
	$mail->SMTPSecure = 'tls';
	$mail->Port = 587;

	$mail->setFrom('analytics@nextidea.com.br', 'Calculadora Inbound');
	$mail->addAddress('analytics@nextidea.com.br', 'Calculadora Inbound');
	$mail->addReplyTo('analytics@nextidea.com.br', 'Calculadora Inbound');

	$base = explode('data:application/pdf;base64,', $_POST['pdf']);
	$base = base64_decode($base[1]);
	$mail->addStringAttachment($base, 'calculadoraResultados'.$pdfname.'.pdf');

	$fname = "calculadoraResultados".$pdfname.".pdf";
	$file = fopen("pdf/" .$fname, 'w');
	fwrite($file, $base);
	fclose($file);
	
	$email_content = "O usuário abaixo fez uso da calculadora:<br>Nome: $name<br>";
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