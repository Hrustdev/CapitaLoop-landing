<?php

$token = "###";
$chat_id = "###";

$email = $_POST['email'] ?? '';
$method = $_POST['contact_method'] ?? '';

$value = '';

if ($method === 'phone') {
    $value = $_POST['phone'] ?? '';
} else {
    $value = $_POST['contact_value'] ?? '';
}

$message =
"📩 New Contact Form Submission\n\n" .
"📧 Email: $email\n" .
"📱 Method: $method\n" .
"💬 Contact: $value";

$url = "https://api.telegram.org/bot$token/sendMessage";

$data = [
    'chat_id' => $chat_id,
    'text' => $message
];

$options = [
    'http' => [
        'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
        'method'  => 'POST',
        'content' => http_build_query($data),
    ],
];

$context = stream_context_create($options);

$result = file_get_contents($url, false, $context);

echo "success";
?>