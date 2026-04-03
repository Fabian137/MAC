<?php
require '/var/www/config/database.php';
date_default_timezone_set('America/Mexico_City');

try {
    $fecha = $_GET['fecha'] ?? null;
    
    // Consulta filtrada por fecha si existe
    if ($fecha) {
        $stmt = $pdo->prepare("SELECT * FROM preguntas WHERE DATE(fecha_creacion) = ? ORDER BY fecha_creacion DESC");
        $stmt->execute([$fecha]);
    } else {
        $stmt = $pdo->query("SELECT * FROM preguntas ORDER BY fecha_creacion DESC");
    }

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
    } else {
        echo '<div class="alert alert-info">No hay preguntas para esta fecha.</div>';
    }
} catch (PDOException $e) {
    echo '<div class="alert alert-danger">Error al cargar preguntas.</div>';
}

?>