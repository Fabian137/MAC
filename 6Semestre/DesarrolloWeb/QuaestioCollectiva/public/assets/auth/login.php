<?php
session_start();
require '/var/www/config/database.php';

// Verificar si ya está logueado
if (isset($_SESSION['usuario_id'])) {
    header("Location: main.php");
    exit;
}

// Procesar formulario
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $usuario = trim($_POST['usuario'] ?? '');
        $password = $_POST['password'] ?? '';

        // Validaciones básicas
        if (empty($usuario) || empty($password)) {
            throw new Exception("Usuario y contraseña son requeridos");
        }

        // Buscar usuario en la base de datos
        $stmt = $pdo->prepare("SELECT id, nombre_usuario, password_hash FROM usuarios WHERE nombre_usuario = ?");
        $stmt->execute([$usuario]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        // Verificar credenciales
        if (!$user || !password_verify($password, $user['password_hash'])) {
            throw new Exception("Usuario o contraseña incorrectos");
        }

        // Autenticación exitosa
        $_SESSION['usuario_id'] = $user['id'];
        $_SESSION['nombre_usuario'] = $user['nombre_usuario'];
        
        header("Location: main.php");
        exit;

    } catch (Exception $e) {
        $error = $e->getMessage();
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Login</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../styles/style.css">
</head>
<body >

    <nav class="navbar" style="background-color: white important;">
        <div class="container-fluid text-center justify-content-around">
            <!-- <a class="navbar-brand" href="#">
                <img src="/assets/imgs/NUKUlogo.png" alt="Logo" width="10%" class="d-inline-block align-text-top">
            </a> -->
            <h2>QUASTIO COLLECTIVA</h2>
            <!-- <a href="assets/pags/registro.html" target="_blank" rel="noopener noreferrer"></a> -->
            <a href="registro.php" target="_blank" rel="noopener noreferrer"> <button
                    class="btn btn-outline-success" type="submit">Registro</button> </a>
        </div>
    </nav>

    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <form class="login-form" method="POST" autocomplete="off" id="loginForm">
                    <?php if (!empty($error)): ?>
                        <div class="alert alert-danger"><?= htmlspecialchars($error) ?></div>
                    <?php endif; ?>
                    
                    <!-- <div class="mb-3">
                        <label class="form-label">Usuario</label>
                        <input type="text" class="form-control" name="usuario" required>
                    </div>
                    
                    <div class="mb-3" style="display: flex;justify-content: center;">
                        <label class="form-label">Contraseña</label>
                        <input type="password" class="form-control" name="password" required>
                    </div>
                    
                    <button type="submit" class="btn btn-primary w-50">Log In</button> -->

                    <div class="center box-shadow">
                        <div class="mb-3" style="margin: 5% 0;">
                            <label class="form-label">Usuario</label>
                            <input style="width:100%; text-transform: none;" type="text" class="form-control"
                                placeholder="Ingrese su usuario" name="usuario" required>
                        </div>
                        <div class="mb-3" style="margin: 5% 0;">
                            <label class="form-label">Contraseña</label>
                            <input style="width:100%; text-transform: none;" type="password" class="form-control"
                                placeholder="Ingrese su contraseña" name="password" required>
                        </div>
                        <br>
                        <div class="col-12" style="display: flex;justify-content: center;">
                            <button type="submit" class="btn btn-primary" style="width: -moz-available;">Log In</button>
                        </div>
                </form>
            </div>
        </div>
    </div>
</body>
</html>