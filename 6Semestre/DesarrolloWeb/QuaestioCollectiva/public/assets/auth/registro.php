<?php
session_start();
// Verificar si ya está logueado
if (isset($_SESSION['usuario_id'])) {
    header("Location: main.php");
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">
    <link rel="stylesheet" href="../styles/style.css">
</head>

<body style="background-color: #181a1b; color:white" >


    <header style="height: 100dvh;">
        <div class="row row-cols-4"  style="height: 100vh; margin: 0;">

            <div class="col-6 registro-header"></div>
            <div class="col-1"></div>
            <div class="col-4" style="margin-top: 15dvh;">
<!-- ----------------------------------------------------------------------------------- -->
                <?php
                // registro.php
                require '/var/www/config/database.php';
                // Verificación de conexión a la base de datos
                try {
                    $stmt = $pdo->query("SELECT 1");
                } catch (PDOException $e) {
                    die('<div class="alert alert-danger">Error de conexión a la base de datos</div>');
                }

                // Procesamiento del formulario
                if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['registrar'])) {
                    try {
                        $usuario = trim($_POST['usuario'] ?? '');
                        $email = filter_var($_POST['email'] ?? '', FILTER_VALIDATE_EMAIL);
                        $password = $_POST['password'] ?? '';
                        $carrera = $_POST['carrera'] ?? '';

                        // Validaciones básicas
                        if (empty($usuario)) {
                            throw new Exception("El usuario es requerido");
                        }
                        
                        if (!$email) {
                            throw new Exception("Email no válido");
                        }
                        
                        if (empty($password)) {
                            throw new Exception("La contraseña es requerida");
                        }

                        // Verificar si el usuario/email ya existen
                        $stmt = $pdo->prepare("SELECT id FROM usuarios WHERE nombre_usuario = ? OR email = ?");
                        $stmt->execute([$usuario, $email]);
                        
                        if ($stmt->fetch()) {
                            throw new Exception("El usuario o email ya están registrados");
                        }

                        // Insertar nuevo usuario (ejemplo básico)
                        $hash = password_hash($password, PASSWORD_DEFAULT);
                            $stmt = $pdo->prepare("INSERT INTO usuarios (nombre_usuario, email, password_hash, carrera) VALUES (?, ?, ?, ?)");
                        if (!$stmt->execute([$usuario, $email, $hash, $carrera])) {
                            throw new Exception("Error al guardar registro");
                        }
                        
                        // $_SESSION['success'] = "¡Registro exitoso!";
                        // header("Location: login.html");
                        // exit;
                        echo '<div class="alert alert-success">Registro exitoso!. <a href="login.php" target="_blank" rel="noopener noreferrer"> <button
                    class="btn btn-outline-success" type="submit">Ir a Login</button> </a></div>';
                        // echo '';
                    } catch (PDOException $e) {
                        echo '<div class="alert alert-danger">Error de base de datos: ' . htmlspecialchars($e->getMessage()) . '</div>';
                    } catch (Exception $e) {
                        echo '<div class="alert alert-warning">' . htmlspecialchars($e->getMessage()) . '</div>';
                    }
                }
                ?>
                <form class="container row g-3" method="POST" action="registro.php" id="signinForm">
                    <div class="mb-3" style="margin: 5% 0;">
                        <label class="form-label">Usuario</label>
                        <input type="text" name="usuario" class="form-control" id="userid" placeholder="Ingrese su usuario" >
                        <!-- <input style="width:100%; text-transform: none;" type="text" class="form-control" placeholder="Ingrese su usuario" name="usuario"> -->
                    </div>
                    <div class="col-md-6">
                        <label for="inputEmail4" class="form-label">Email</label>
                        <input type="email" name="email" class="form-control" id="inputEmail4" placeholder="De preferencia institucional">
                    </div>
                    <div class="col-md-6">
                        <label for="inputPassword4" class="form-label">Password</label>
                        <input type="password" name="password" class="form-control" id="inputPassword4">
                    </div>
                    <div class="col-12">
                        <label for="inputAddress" class="form-label">Carrera</label>
                        <input type="text" name="carrera" class="form-control" id="inputAddress" placeholder="Ingrese su carrera (si aplica/Opcional)">
                    </div>
                    
                    <div class="col-12">
                        <button type="submit" name="registrar" class="btn btn-primary">Registrar </button>
                    </div>




                    <p class="section">Al registrar sus datos mandaremos un correo con los datos de su registro para que los guarde :D </p>
                </form>
                
            </div>
            <div class="col-1"></div>
            
            
        </div>
    </header>
    

    <?php include '../templates/footer.php'; ?>
</body>

<script src="../JS/validation.js"></script>


</html>