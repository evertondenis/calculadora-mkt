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
	$mail->Username = 'email@gmail.com';
	$mail->Password = 'senha';
	$mail->SMTPSecure = 'tls';
	$mail->Port = 587;

	$mail->setFrom('analytics@nextidea.com.br', 'Calculadora Inbound');
	$mail->addAddress($email, $name);
	// cópia
	$mail->addAddress('analytics@nextidea.com.br', 'Calculadora Inbound');
	$mail->addReplyTo('analytics@nextidea.com.br', 'Calculadora Inbound');
	// cópia carbono
	// $mail->addCC($emailcc);

	$base = explode('data:application/pdf;base64,', $_POST['pdf2']);
	$base = base64_decode($base[1]);
	$mail->addStringAttachment($base, 'calculadoraResultados'.$pdfname.'.pdf');

	$fname = "calculadoraResultados".$pdfname.".pdf";
	$file = fopen("pdf/" .$fname, 'w');
	fwrite($file, $base);
	fclose($file);
	
	// $email_content = "Nome: $name<br>";
	// $email_content .= "Email: $email<br>";
	// $email_content .= "Site/Blog: $site<br>";

	$email_content = '<table cellpadding="0" cellspacing="0" width="100%" border="0" bgcolor="#EFF3F6">
						<tbody>
							<tr>
								<td align="center">
									<table cellpadding="0" cellspacing="0" width="600" border="0">
										<tbody>
											<tr>
												<td><a href="https://nextidea.com.br" title="Conheça sua receita de Inbound Marketing" target="_blank"><img src="https://nextidea.com.br/calculadora-inbound/assets/images/1206_Template_E_mail_calculadora_01.jpg" width="600" height="106" alt="Conheça sua receita de Inbound Marketing" style="display:block" border="0"></a></td>
											</tr>
											<tr>
												<td><a href="https://nextidea.com.br" title="Conheça sua receita de Inbound Marketing" target="_blank"><img src="https://nextidea.com.br/calculadora-inbound/assets/images/1206_Template_E_mail_calculadora_02.jpg" width="600" height="131" alt="Conheça sua receita de Inbound Marketing" style="display:block" border="0"></a></td>
											</tr>
											<tr>
												<td bgcolor="#2E2C37" align="center">
												<p style="font-family: Arial; font-size: 18px; color: #FFF"><strong>Ol&aacute;, ' . $name . '!</strong><br>
												Obrigado pelo interesse em nossa calculadora!<br>
												No <strong>anexo</strong> est&aacute; o resultado com base nas<br>
												informa&ccedil;&otilde;es que voc&ecirc; passou da sua empresa.<br>
												<br>
												Confira uma proje&ccedil;&atilde;o de quanto seu<br>
												neg&oacute;cio pode ganhar!</p></td>
											</tr>
											<tr>
												<td><a href="https://nextidea.com.br" title="Conheça sua receita de Inbound Marketing" target="_blank"><img src="https://nextidea.com.br/calculadora-inbound/assets/images/1206_Template_E_mail_calculadora_04.jpg" width="600" height="176" alt="Conhe&ccedil;a sua receita de Inbound Marketing" style="display:block" border="0"></a></td>
											</tr>
											<tr>
												<td><a href="https://nextidea.com.br/contato/" title="Conheça sua receita de Inbound Marketing" target="_blank"><img src="https://nextidea.com.br/calculadora-inbound/assets/images/1206_Template_E_mail_calculadora_06.jpg" width="600" height="205" alt="Conheça sua receita de Inbound Marketing" style="display:block" border="0"></a></td>
											</tr>
											<tr>
												<td>
													<table cellpadding="0" cellspacing="0" width="600" border="0">
														<tbody>
															<tr>
																<td><a href="https://nextidea.com.br" title="Next Idea - Inbound Marketing" target="_blank"><img src="https://nextidea.com.br/calculadora-inbound/assets/images/1206_Template_E_mail_calculadora_07.jpg" width="394" height="105" alt="Next Idea - Inbound Marketing" style="display:block" border="0"></a></td>
																<td><a href="https://www.facebook.com/nextideadigital" title="Facebook - Next Idea" target="_blank"><img src="https://nextidea.com.br/calculadora-inbound/assets/images/1206_Template_E_mail_calculadora_08.jpg" width="47" height="105" alt="Facebook - Next Idea" style="display:block" border="0"></a></td>
																<td><a href="https://twitter.com/nextideadigital" title="Twitter - Next Idea" target="_blank"><img src="https://nextidea.com.br/calculadora-inbound/assets/images/1206_Template_E_mail_calculadora_09.jpg" width="40" height="105" alt="Twitter - Next Idea" style="display:block" border="0"></a></td>
																<td><a href="https://plus.google.com/u/0/+NextideaBr" title="Google Plus - Next Idea" target="_blank"><img src="https://nextidea.com.br/calculadora-inbound/assets/images/1206_Template_E_mail_calculadora_10.jpg" width="42" height="105" alt="Google Plus - Next Idea" style="display:block" border="0"></a></td>
																<td><a href="https://www.linkedin.com/company/next-idea-estrategia-digital" title="Linkedin - Next Idea" target="_blank"><img src="https://nextidea.com.br/calculadora-inbound/assets/images/1206_Template_E_mail_calculadora_11.jpg" width="40" height="105" alt="Linkedin - Next Idea" style="display:block" border="0"></a></td>
																<td><a href="https://www.instagram.com/nextideadigital/" title="Instagram - Next Idea" target="_blank"><img src="https://nextidea.com.br/calculadora-inbound/assets/images/1206_Template_E_mail_calculadora_12.jpg" width="37" height="105" alt="Instagram - Next Idea" style="display:block" border="0"></a></td>
															</tr>
														</tbody>
													</table>
												</td>
											</tr>
											<tr>
												<td><a href="https://nextidea.com.br" title="São Paulo: +55 11 3280-4320, Joinville: +55 11 3280-4320, Rua São Paulo, 31, Sala 10, Joinville / SC"><img src="https://nextidea.com.br/calculadora-inbound/assets/images/1206_Template_E_mail_calculadora_13.jpg" width="600" height="222" alt="São Paulo: +55 11 3280-4320, Joinville: +55 11 3280-4320, Rua São Paulo, 31, Sala 10, Joinville / SC" style="display:block" border="0"></a></td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>';

	$mail->isHTML(true);

	$mail->Subject = 'Calculo Resultado';
	$mail->Body    = $email_content;
	$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

	$mail->send();

	

	/*
	e-mail CC
	*/
	if ($emailcc != '') {

		$mail = new PHPMailer;

		$mail->isSMTP();
		$mail->Host = 'smtp.gmail.com';
		$mail->SMTPAuth = true;
		$mail->Username = 'email@gmail.com';
		$mail->Password = 'senha';
		$mail->SMTPSecure = 'tls';
		$mail->Port = 587;

		$mail->setFrom('analytics@nextidea.com.br', 'Calculadora Inbound');
		$mail->addAddress($emailcc, $name);
		$mail->addReplyTo('analytics@nextidea.com.br', 'Calculadora Inbound');

		$mail->addStringAttachment($base, 'calculadoraResultados'.$pdfname.'.pdf');
		
		// $email_content = 'Olá! <br>' . $name . ' lembrou de você<br>';
		// $email_content .= 'Email: ' . $email . '<br>';
		// $email_content .= 'Site/Blog: ' . $site . '<br>';

		$email_content = '<table cellpadding="0" cellspacing="0" width="100%" border="0" bgcolor="#EFF3F6">
							<tbody>
								<tr>
									<td align="center">
										<table cellpadding="0" cellspacing="0" width="600" border="0">
											<tbody>
												<tr>
													<td><a href="https://nextidea.com.br" title="Conheça sua receita de Inbound Marketing" target="_blank"><img src="https://nextidea.com.br/calculadora-inbound/assets/images/1206_Template_E_mail_calculadora_01.jpg" width="600" height="106" alt="Conheça sua receita de Inbound Marketing" style="display:block" border="0"></a></td>
												</tr>
												<tr>
													<td><a href="https://nextidea.com.br" title="Conheça sua receita de Inbound Marketing" target="_blank"><img src="https://nextidea.com.br/calculadora-inbound/assets/images/1206_Template_E_mail_calculadora_INDICADO_02.jpg" width="600" height="131" alt="Conheça sua receita de Inbound Marketing" style="display:block" border="0"></a></td>
												</tr>
												<tr>
													<td bgcolor="#2E2C37" align="center">
														<p style="font-family: Arial; font-size: 18px; color: #FFF"><strong>Ol&aacute;!</strong><br>
														' . $name . ' usou a nossa calculadora de receita<br>
														de inbound marketing para a sua empresa e indicou<br>
														voc&ecirc; para receber uma c&oacute;pia do resultado.<br>
														No anexo est&aacute; o resultado com base nas informa&ccedil;&otilde;es<br>
														que recebemos sobre o seu neg&oacute;cio.<br><br>
														Confira uma proje&ccedil;&atilde;o de quanto sua<br>
														empresa pode ganhar!
													</td>
												</tr>
												<tr>
													<td><a href="https://nextidea.com.br" title="Conheça sua receita de Inbound Marketing" target="_blank"><img src="https://nextidea.com.br/calculadora-inbound/assets/images/1206_Template_E_mail_calculadora_04.jpg" width="600" height="176" alt="Conheça sua receita de Inbound Marketing" style="display:block" border="0"></a></td>
												</tr>
												<tr>
													<td><a href="https://nextidea.com.br/contato/" title="Conheça sua receita de Inbound Marketing" target="_blank"><img src="https://nextidea.com.br/calculadora-inbound/assets/images/1206_Template_E_mail_calculadora_06.jpg" width="600" height="205" alt="Conheça sua receita de Inbound Marketing" style="display:block" border="0"></a></td>
												</tr>
												<tr>
													<td>
														<table cellpadding="0" cellspacing="0" width="600" border="0">
															<tbody>
																<tr>
																	<td><a href="https://nextidea.com.br" title="Next Idea - Inbound Marketing" target="_blank"><img src="https://nextidea.com.br/calculadora-inbound/assets/images/1206_Template_E_mail_calculadora_07.jpg" width="394" height="105" alt="Next Idea - Inbound Marketing" style="display:block" border="0"></a></td>
																	<td><a href="https://www.facebook.com/nextideadigital" title="Facebook - Next Idea" target="_blank"><img src="https://nextidea.com.br/calculadora-inbound/assets/images/1206_Template_E_mail_calculadora_08.jpg" width="47" height="105" alt="Facebook - Next Idea" style="display:block" border="0"></a></td>
																	<td><a href="https://twitter.com/nextideadigital" title="Twitter - Next Idea" target="_blank"><img src="https://nextidea.com.br/calculadora-inbound/assets/images/1206_Template_E_mail_calculadora_09.jpg" width="40" height="105" alt="Twitter - Next Idea" style="display:block" border="0"></a></td>
																	<td><a href="https://plus.google.com/u/0/+NextideaBr" title="Google Plus - Next Idea" target="_blank"><img src="https://nextidea.com.br/calculadora-inbound/assets/images/1206_Template_E_mail_calculadora_10.jpg" width="42" height="105" alt="Google Plus - Next Idea" style="display:block" border="0"></a></td>
																	<td><a href="https://www.linkedin.com/company/next-idea-estrategia-digital" title="Linkedin - Next Idea" target="_blank"><img src="https://nextidea.com.br/calculadora-inbound/assets/images/1206_Template_E_mail_calculadora_11.jpg" width="40" height="105" alt="Linkedin - Next Idea" style="display:block" border="0"></a></td>
																	<td><a href="https://www.instagram.com/nextideadigital/" title="Instagram - Next Idea" target="_blank"><img src="https://nextidea.com.br/calculadora-inbound/assets/images/1206_Template_E_mail_calculadora_12.jpg" width="37" height="105" alt="Instagram - Next Idea" style="display:block" border="0"></a></td>
																</tr>
															</tbody>
														</table>
													</td>
												</tr>
												<tr>
													<td><a href="https://nextidea.com.br" title="São Paulo: +55 11 3280-4320, Joinville: +55 11 3280-4320, Rua São Paulo, 31, Sala 10, Joinville / SC"><img src="https://nextidea.com.br/calculadora-inbound/assets/images/1206_Template_E_mail_calculadora_13.jpg" width="600" height="222" alt="São Paulo: +55 11 3280-4320, Joinville: +55 11 3280-4320, Rua São Paulo, 31, Sala 10, Joinville / SC" style="display:block" border="0"></a></td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>
							</tbody>
						</table>';

		$mail->isHTML(true);

		$mail->Subject = 'Calculo Resultado';
		$mail->Body    = $email_content;
		$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

		$mail->send();
	}

	echo 'Mensagem enviada!';
} catch (phpmailerException $e) {
	echo $e->errorMessage();
}