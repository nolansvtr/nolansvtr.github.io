<?php
// Contact form handler
header('Content-Type: application/json');

// Initialize response
$response = ['success' => false, 'message' => ''];

// Check if form was submitted
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    $response['message'] = 'Méthode non autorisée.';
    echo json_encode($response);
    exit;
}

// Get and sanitize form data
$name = isset($_POST['name']) ? htmlspecialchars(trim($_POST['name']), ENT_QUOTES, 'UTF-8') : '';
$email = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL) : '';
$message = isset($_POST['message']) ? htmlspecialchars(trim($_POST['message']), ENT_QUOTES, 'UTF-8') : '';
$honeypot = isset($_POST['website']) ? $_POST['website'] : '';

// Honeypot check (simple spam protection)
if (!empty($honeypot)) {
    $response['message'] = 'Spam détecté.';
    echo json_encode($response);
    exit;
}

// Validate fields
$errors = [];

if (empty($name) || strlen($name) < 2) {
    $errors[] = 'Le nom doit contenir au moins 2 caractères.';
}

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'L\'adresse email n\'est pas valide.';
}

if (empty($message) || strlen($message) < 10) {
    $errors[] = 'Le message doit contenir au moins 10 caractères.';
}

// If validation errors exist
if (!empty($errors)) {
    $response['message'] = implode(' ', $errors);
    echo json_encode($response);
    exit;
}

// Prepare email
$to = 'nolan.savatier@outlook.fr';
$subject = 'Nouveau message depuis le portfolio - ' . $name;
$emailBody = "Nouveau message de contact depuis le portfolio\n\n";
$emailBody .= "Nom: $name\n";
$emailBody .= "Email: $email\n\n";
$emailBody .= "Message:\n$message\n";

// Email headers
$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Send email
if (mail($to, $subject, $emailBody, $headers)) {
    $response['success'] = true;
    $response['message'] = 'Merci pour votre message ! Je vous répondrai dans les plus brefs délais.';
} else {
    $response['message'] = 'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer ou me contacter directement par email.';
}

echo json_encode($response);
?>