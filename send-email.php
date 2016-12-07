<?php
require 'lib/phpmailer/PHPMailerAutoload.php';

$name = strip_tags(trim($_POST["nome2"]));
	$name = str_replace(array("\r","\n"),array(" "," "),$name);
$site = strip_tags(trim($_POST["url2"]));
	$site = str_replace(array("\r","\n"),array(" "," "),$site);
$email = filter_var(trim($_POST["email2"]), FILTER_SANITIZE_EMAIL);
$emailcc = filter_var(trim($_POST["emailcc"]), FILTER_SANITIZE_EMAIL);
$pdf = $_FILES["pdf2"];
$pdfname = $_POST["nomearquivo2"];

try {		
	$mail = new PHPMailer;

	$mail->isSMTP();
	$mail->Host = 'smtp.gmail.com';
	$mail->SMTPAuth = true;
	$mail->Username = 'evertondevtest@gmail.com';
	$mail->Password = 'ZybdTUGI#j@8';
	$mail->SMTPSecure = 'tls';
	$mail->Port = 587;

	$mail->setFrom('analytics@nextidea.com.br', 'Calculadora Inbound');
	$mail->addAddress($email, $name);
	$mail->addAddress('analytics@nextidea.com.br', 'Calculadora Inbound');
	$mail->addReplyTo('analytics@nextidea.com.br', 'Calculadora Inbound');
	$mail->addCC($emailcc);

	$base = explode('data:application/pdf;base64,', $_POST['pdf2']);
	$base = base64_decode($base[1]);
	$mail->addStringAttachment($base, 'calculadoraResultados'.$pdfname.'.pdf');

	$fname = "calculadoraResultados".$pdfname.".pdf";
	$file = fopen("pdf/" .$fname, 'w');
	fwrite($file, $base);
	fclose($file);
	
	$email_content = "Nome: $name<br>";
	$email_content .= "Email: $email<br>";
	$email_content .= "Site/Blog: $site<br>";

	$mail->isHTML(true);

	$mail->Subject = 'Calculo Resultado';
	$mail->Body    = $email_content;
	$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

	$mail->send();
	echo 'Mensagem enviada!';
} catch (phpmailerException $e) {
	echo $e->errorMessage();
}