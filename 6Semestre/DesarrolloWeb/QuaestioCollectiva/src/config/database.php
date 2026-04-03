<?php
$host = 'db'; // Nombre del servicio en docker-compose.yml
$dbname = 'quaestio_collectiva';
$user = 'usuario';
$pass = 'netusercfphynxb';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);
} catch (PDOException $e) {
    die("Error de conexión: " . $e->getMessage());
}
?>