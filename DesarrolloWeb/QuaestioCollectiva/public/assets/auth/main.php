<?php
// Verificación de sesión al inicio
// Iniciar sesión si no está activa
/*
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Redirigir si no está logueado
if (!isset($_SESSION['logged_in'])) {
    $_SESSION['error'] = "Debes iniciar sesión primero";
    header("Location: login.html");
    exit;
}

// Verificación adicional de seguridad
if (empty($_SESSION['user_id']) || empty($_SESSION['user_email'])) {
    session_unset();
    session_destroy();
    $_SESSION['error'] = "Sesión inválida";
    header("Location: login.html");
    exit;
}
*/
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portal de Preguntas</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css">
    <link rel="stylesheet" href="/assets/styles/style.css">
</head>
<body>

    <!-- Navbar Superior -->
    <nav class="container navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container-fluid">
            <form class="d-flex w-100" id="searchForm">
                <input class="form-control me-2" type="search" placeholder="Buscar por palabras clave..." aria-label="Search" name="keyword">
                <button class="btn btn-light" type="submit"><i class="bi bi-search"></i></button>
            </form>
        </div>
    </nav>


    <div class="container-fluid top-space">
        <div class="row">
            <!-- Sidebar (3/12) -->
            <div class="col-1"></div>
            <div class="col-md-3 bg-light p-3 border-end">
                <div class="d-flex flex-column">
                    <h5 class="mb-3">Historial de Sesiones</h5>
                    <div class="input-group mb-3">
                        <input type="date" class="form-control" id="datePicker">
                        <button class="btn btn-outline-secondary" type="button" id="todayBtn">Hoy</button>
                    </div>
                    <div id="sessionList" class="list-group overflow-auto" style="max-height: 10dvh; height: 10dvh;">
                        <!-- Las fechas se cargarán dinámicamente via AJAX -->
                    </div>
                </div>
            </div>

            <!-- Contenido Principal (7/12) -->
            <div class="col-md-7">
                <div class="container py-3">
                    <h4 id="currentDateDisplay" class="mb-4"> 20 2020</h4>
                    
                    <div id="questionsContainer" class="accordion">
                        <!-- Las tarjetas se generarán dinámicamente aquí -->

                        <div class="accordion" id="accordionExample" style="margin: 0;">
                        <?php
                            require '/var/www/config/database.php';
                            $stmt = $pdo->query("SELECT 1");
                            if (!$stmt) {
                                throw new Exception("Error al verificar la conexión con la base de datos");
                                }
                                
                                try {
                                    if (!isset($pdo)) {
                                        throw new Exception("Error: No se pudo establecer la conexión a la base de datos");
                                        }                       
                                        // if (isset($_GET['search'])) {
                                            // else {
                                                $stmt = $pdo->query("SELECT * FROM preguntas ORDER BY fecha_creacion DESC");
                                                // Verificar resultados correctamente


                                    $results = $stmt->fetchAll();

                                    if (count($results) > 0) {
                                        $accordionId = 0;
                                        
                                        foreach ($results as $row) {
                                            $accordionId++;
                                            echo '<div class="accordion-item">';
                                            echo '  <h2 class="accordion-header">';
                                            echo '    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" ';
                                            echo '            data-bs-target="#collapse'.$accordionId.'" aria-expanded="false" ';
                                            echo '            aria-controls="collapse'.$accordionId.'">';
                                            echo '      '.htmlspecialchars($row["fecha_creacion"]);
                                            echo '    </button>';
                                            echo '  </h2>';
                                            
                                            echo '  <div id="collapse'.$accordionId.'" class="accordion-collapse collapse" ';
                                            echo '       data-bs-parent="#accordionExample">';
                                            echo '    <div class="accordion-body">';
                                            echo '      <p>'.htmlspecialchars($row["texto"]).'</p>';
                                            
                                            // Mostrar respuestas existentes
                                            $respuestas = $pdo->prepare("SELECT * FROM respuestas WHERE pregunta_id = ? ORDER BY fecha_respuesta");
                                            $respuestas->execute([$row['id']]);
                                            
                                            if ($respuestas->rowCount() > 0) {
                                                echo '<div class="mt-3">';
                                                echo '<h6>Respuestas:</h6>';
                                                foreach ($respuestas as $respuesta) {
                                                    echo '<div class="card mb-2">';
                                                    echo '  <div class="card-body">';
                                                    echo '    <p>'.htmlspecialchars($respuesta['texto_respuesta']).'</p>';
                                                    echo '    <small class="text-muted">'.htmlspecialchars($respuesta['fecha_respuesta']).'</small>';
                                                    echo '  </div>';
                                                    echo '</div>';
                                                }
                                                echo '</div>';
                                            }
                                            
                                            // Formulario para nueva respuesta
                                            echo '<form class="mt-3" method="POST" action="guardar_respuestas.php">';
                                            echo '  <input type="hidden" name="pregunta_id" value="'.$row['id'].'">';
                                            echo '  <div class="mb-3">';
                                            echo '    <textarea class="form-control" name="respuesta" rows="2" required></textarea>';
                                            echo '  </div>';
                                            echo '  <button type="submit" class="btn btn-sm btn-primary">Responder</button>';
                                            echo '</form>';
                                            
                                            echo '    </div>';
                                            echo '  </div>';
                                            echo '</div>';
                                        }
                                    }else {
                                    echo '<div class="alert alert-info">No se encontraron preguntas.</div>';
                                }
                            } catch (PDOException $e) {
                                http_response_code(500);
                                echo json_encode(['error' => $e->getMessage()]);
                            }

                            ?>
                            
                        </div>

                    </div>

                    <!-- Panel para nueva pregunta (anclado) -->
                    <div class="fixed-bottom bg-white p-3 border-top shadow-lg" style="max-width: 100%;">
                        <!-- <form class="container" id="newQuestionForm">
                            <div class="input-group">
                                <input type="text" class="form-control" placeholder="Escribe tu pregunta..." required>
                                <div class="input-group-append ms-2">
                                    <button class="btn btn-primary" type="submit">Enviar</button>
                                </div>
                            </div>
                        </form> -->
                        <form class="container" id="newQuestionForm" method="POST" action="ask.php">
                            <div class="input-group">
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    name="texto" 
                                    id="preguntaTexto" 
                                    placeholder="Escribe tu pregunta..." 
                                    required
                                >
                                <div class="input-group-append ms-2 d-flex align-items-center">
                                    <div class="form-check form-switch me-3">
                                        <input 
                                            class="form-check-input" 
                                            type="checkbox" 
                                            id="anonimaCheck" 
                                            name="anonima"
                                            checked
                                        >
                                        <label class="form-check-label" for="anonimaCheck">Anónima</label>
                                    </div>
                                    <button class="btn btn-primary" type="submit">
                                        <i class="bi bi-send-fill"></i> Enviar
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>


                </div>
            </div>
            <div class="col-1"></div>
        </div>
    </div>

    <!-- Bootstrap JS Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <!-- <script src="../JS/main.js"></script> -->
</body>
</html>