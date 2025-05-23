<?php
session_start();
// Verificar si ya está logueado
if (!isset($_SESSION['usuario_id'])) {
    header("Location: login.php");
    exit;
}
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
<body style="background-color: #181a1b; color:white">

    <!-- Navbar Superior -->
    <nav class="container navbar navbar-expand-lg navbar-dark">
        <div class="container-fluid">
            <!-- <form class="d-flex w-100" id="searchForm">
                <input class="form-control me-2" type="search" placeholder="Buscar por palabras clave..." aria-label="Search" name="keyword">
                <button class="btn btn-light" type="submit"><i class="bi bi-search"></i></button>
            </form> -->
                    <div class="ms-3">
            <a href="logout.php" class="btn btn-danger">
                <i class="bi bi-box-arrow-right"></i> Salir
            </a>
        </div>
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
                    
                    <!-- <div id="questionsContainer" class="accordion"> -->
                        <!-- Las tarjetas se generarán dinámicamente aquí -->

                        <div class="accordion" id="questionsContainer" style="margin: 0;">
                        <?php
                        ?>
                            
                        </div>

                    <!-- </div> -->

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
                                        <input class="form-check-input" type="checkbox" id="anonimaCheck" name="anonima" checked>
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


    <script>

function formatearFecha(fechaISO) {
    // Ajustar a zona horaria local del navegador
    const fecha = new Date(fechaISO + 'T00:00:00'); // Agregar tiempo para evitar desplazamiento
    
    const opciones = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        timeZone: 'America/Mexico_City' // Misma zona que PHP
    };
    
    return fecha.toLocaleDateString('es-ES', opciones);
}

// Función para obtener fecha en formato YYYY-MM-DD consistente
function getFechaActual() {
    const ahora = new Date();
    const offset = ahora.getTimezoneOffset() * 60000; // Compensar zona horaria
    const fechaAjustada = new Date(ahora - offset);
    return fechaAjustada.toISOString().split('T')[0];
}

// Función principal para actualizar fecha y preguntas
function actualizarFechaYPreguntas(fechaISO) {
    // 1. Actualizar el título h4
    const tituloFecha = document.getElementById('currentDateDisplay');
    tituloFecha.textContent = formatearFecha(fechaISO);
    
    // 2. Cargar preguntas para la nueva fecha
    fetch(`get_questions.php?fecha=${fechaISO}`)
        .then(response => response.text())
        .then(html => {
            document.getElementById('questionsContainer').innerHTML = html;
        });
}

// Eventos al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    const datePicker = document.getElementById('datePicker');
    const todayBtn = document.getElementById('todayBtn');
    
    // Configurar fecha inicial (hoy)
    const hoy = new Date().toISOString().split('T')[0];
    datePicker.value = hoy;
    
    // Cargar datos iniciales
    actualizarFechaYPreguntas(hoy);
    
    // Evento al cambiar fecha
    datePicker.addEventListener('change', function() {
        actualizarFechaYPreguntas(this.value);
    });
    
    // Botón "Hoy"
    todayBtn.addEventListener('click', function() {
        datePicker.value = hoy;
        actualizarFechaYPreguntas(hoy);
    });
});
</script>
</body>
</html>