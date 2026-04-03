<?php
session_start();
require '/var/www/config/database.php';
// Verificar autenticación
if (!isset($_SESSION['usuario_id'])) {
    header("Location: login.php");
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $pregunta_id = $_POST['pregunta_id'];
        $respuesta = trim($_POST['respuesta']);
        // $usuario_id = $_SESSION['usuario_id'];

        if (empty($respuesta)) {
            throw new Exception("El texto de la respuesta no puede estar vacío");
        }

        $stmt = $pdo->prepare("INSERT INTO respuestas 
                              (pregunta_id, texto_respuesta) 
                              VALUES (?, ?)");
        $stmt->execute([$pregunta_id, $respuesta]);

        // Redirigir de vuelta a la página original
        header("Location: ".$_SERVER['HTTP_REFERER']);
        exit;

    } catch (Exception $e) {
        $_SESSION['error'] = $e->getMessage();
        header("Location: ".$_SERVER['HTTP_REFERER']);
        exit;
    }
}