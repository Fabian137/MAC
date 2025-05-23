<?php
// Inicio seguro de sesión
if (session_status() === PHP_SESSION_NONE) {
    session_start();
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
}

// Conexión a DB
require '/var/www/config/database.php';

// Verificar si es una solicitud POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    die("Método no permitido");
}

// Obtener y sanitizar datos del formulario
$texto = trim($_POST['texto'] ?? '');
$es_anonima = isset($_POST['anonima']) ? 1 : 0; // Convertir checkbox a valor booleano (1 o 0)

// Validar que el texto no esté vacío
if (empty($texto)) {
    die("El texto de la pregunta no puede estar vacío");
}

try {
    // Preparar consulta SQL correctamente
    $stmt = $pdo->prepare(
        "INSERT INTO preguntas (texto, es_anonima, fecha_creacion) 
         VALUES (:texto, :es_anonima, NOW())"
    );
    
    // Ejecutar con parámetros nombrados
    $stmt->execute([
        ':texto' => $texto,
        ':es_anonima' => $es_anonima
    ]);
    
    // Redireccionar con mensaje de éxito
    $_SESSION['success'] = "¡Pregunta enviada correctamente!";
    header("Location: main.php"); // Cambia esto a tu página de destino
    exit;

} catch (PDOException $e) {
    // Manejar errores específicos
    $errorMessage = "Error al guardar la pregunta: " . $e->getMessage();
    $_SESSION['error'] = $errorMessage;
    error_log($errorMessage); // Registrar error en el log
    header("Location: main.php"); // Cambia esto a tu formulario
    exit;
}
?>