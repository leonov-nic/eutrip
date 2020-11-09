<?php
$to = "leonov-nic@yandex.ru";
$subject = "Письмо с сайта eutriip";
$message = "\n      Телефон: " . substr(htmlspecialchars(trim($_POST["phone"])), 0) . "
      E-mail: " . substr(htmlspecialchars(trim($_POST["mail"])), 0);

mail($to, $subject, $message);

$back = $_SERVER["HTTP_REFERER"];
// $back = "../thank-you.html";

echo "<html>
	  	<head>
			<meta http-equiv=\"Refresh\" content=\"0; URL=". $back ."\">
		</head>
	</html>";

exit;
