-- 1. Crea la base de datos
-- CREATE DATABASE quaestio_collectiva; : : : SE CREA CON DESDE EL docker-compose.yml
USE quaestio_collectiva;

-- 2. Tabla de usuarios
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_usuario VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    carrera VARCHAR(100),
    privilegio INT NOT NULL DEFAULT 0, -- 0=normal, 1=moderador, 2=admin, 3=superadmin
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- 3. Tabla de preguntas
CREATE TABLE preguntas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    texto TEXT NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    es_anonima BOOLEAN DEFAULT TRUE
    -- Eliminada la relación con usuarios
);

-- 4. Tabla de respuestas
CREATE TABLE respuestas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pregunta_id INT NOT NULL,
    texto_respuesta TEXT NOT NULL,
    usuario_id INT NOT NULL, -- Quien responde (siempre registrado)
    fecha_respuesta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    documento_adjunto VARCHAR(255), -- Ruta al archivo
    FOREIGN KEY (pregunta_id) REFERENCES preguntas(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

