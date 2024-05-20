--------- Tablas
CREATE TABLE Hotel (
    id_hotel INT PRIMARY KEY,
    nombre_hotel VARCHAR(255),
    página_web VARCHAR(255),
    dirección VARCHAR(255),
    teléfono VARCHAR(20),
    ciudad VARCHAR(100),
    país VARCHAR(100)
);

CREATE TABLE Habitación (
    id_hotel INT,
    numero_habitación INT,
    tipo_habitación VARCHAR(50),
    tipo_cama BOOLEAN,
    PRIMARY KEY (id_hotel, numero_habitación),
    FOREIGN KEY (id_hotel) REFERENCES Hotel(id_hotel)
);

CREATE TABLE Cliente (
    id_cliente INT PRIMARY KEY,
    tipo_documento VARCHAR(50),
    pais_documento VARCHAR(100),
    numero_documento VARCHAR(50),
    nombre VARCHAR(100),
    apellido VARCHAR(100),
    sexo CHAR(1),
    edad INT,
    correo VARCHAR(255),
    teléfono VARCHAR(20)
);

CREATE TABLE Comentario (
    id_comentario INT PRIMARY KEY,
    id_cliente INT,
    id_hotel INT,
    fecha DATE,
    comentario TEXT,
    FOREIGN KEY (id_cliente) REFERENCES Cliente(id_cliente),
    FOREIGN KEY (id_hotel) REFERENCES Hotel(id_hotel)
);

CREATE TABLE Empleado (
    id_empleado INT PRIMARY KEY,
    tipo_documento VARCHAR(50),
    pais_documento VARCHAR(100),
    numero_documento VARCHAR(50),
    nombre VARCHAR(100),
    apellido VARCHAR(100),
    teléfono VARCHAR(20),
    id_hotel INT,
    es_administrativo BOOLEAN,
    idiomas VARCHAR(255),
    FOREIGN KEY (id_hotel) REFERENCES Hotel(id_hotel)
);

CREATE TABLE Limpieza (
    fecha DATE,
    id_empleado INT,
    id_hotel INT,
    numero_habitación INT,
    PRIMARY KEY (fecha, id_empleado, id_hotel, numero_habitación),
    FOREIGN KEY (id_empleado) REFERENCES Empleado(id_empleado),
    FOREIGN KEY (id_hotel, numero_habitación) REFERENCES Habitación(id_hotel, numero_habitación)
);

CREATE TABLE Reserva (
    id_reserva INT PRIMARY KEY,
    fecha_reserva DATE,
    id_cliente INT,
    id_hotel INT,
    numero_habitación INT,
    id_empleado INT,
    FOREIGN KEY (id_cliente) REFERENCES Cliente(id_cliente),
    FOREIGN KEY (id_hotel, numero_habitación) REFERENCES Habitación(id_hotel, numero_habitación),
    FOREIGN KEY (id_empleado) REFERENCES Empleado(id_empleado)
);

--------- Inserciones
INSERT INTO Hotel (id_hotel, nombre_hotel, página_web, dirección, teléfono, ciudad, país) 
VALUES 
(1, 'Hotel Barcelona', 'www.hotelbarcelona.com', '123 Main Street', '123456789', 'Barcelona', 'Spain'),
(2, 'Parisian Hotel', 'www.parisianhotel.com', '456 Second Avenue', '987654321', 'Paris', 'France'),
(3, 'New York Inn', 'www.newyorkinn.com', '789 Central Street', '456123789', 'New York', 'USA'),
(4, 'Rome Retreat', 'www.romeretreat.com', '321 North Road', '789456123', 'Rome', 'Italy'),
(5, 'Tokyo Tower Hotel', 'www.tokyotowerhotel.com', '555 East Street', '159357456', 'Tokyo', 'Japan');

INSERT INTO Habitación (id_hotel, numero_habitación, tipo_habitación, tipo_cama) 
VALUES 
(1, 101, 'Simple', false),
(1, 102, 'Doble', true),
(2, 201, 'Simple', false),
(2, 202, 'Doble', true),
(3, 301, 'Simple', false);

INSERT INTO Cliente (id_cliente, tipo_documento, pais_documento, numero_documento, nombre, apellido, sexo, edad, correo, teléfono) 
VALUES 
(1, 'DNI', 'Spain', '12345678A', 'Juan', 'Pérez', 'M', 30, 'juan@example.com', '123456789'),
(2, 'Passport', 'France', 'B1234567', 'Maria', 'González', 'F', 25, 'maria@example.com', '987654321'),
(3, 'DNI', 'USA', 'C98765432', 'Pedro', 'Sánchez', 'M', 40, 'pedro@example.com', '456123789'),
(4, 'Passport', 'Italy', 'D87654321', 'Ana', 'Martínez', 'F', 35, 'ana@example.com', '789456123'),
(5, 'DNI', 'Japan', 'E54321678', 'Laura', 'López', 'F', 28, 'laura@example.com', '159357456');

INSERT INTO Comentario (id_comentario, id_cliente, id_hotel, fecha, comentario) 
VALUES 
(1, 1, 1, '2024-05-01', 'Excelente servicio'),
(2, 2, 2, '2024-05-02', 'Habitaciones limpias y cómodas'),
(3, 3, 3, '2024-05-03', 'Personal amable'),
(4, 4, 4, '2024-05-04', 'Desayuno delicioso'),
(5, 5, 5, '2024-05-05', 'Volvería sin dudarlo');

INSERT INTO Empleado (id_empleado, tipo_documento, pais_documento, numero_documento, nombre, apellido, teléfono, id_hotel, es_administrativo, idiomas) 
VALUES 
(1, 'DNI', 'Spain', '11111111A', 'Carlos', 'García', '111111111', 1, true, 'Español, Inglés'),
(2, 'Passport', 'France', 'B2222222', 'Luisa', 'López', '222222222', 2, false, 'Inglés, Francés'),
(3, 'DNI', 'USA', 'C33333333', 'Marcela', 'Ruiz', '333333333', 3, true, 'Español'),
(4, 'Passport', 'Italy', 'D44444444', 'Javier', 'Fernández', '444444444', 4, false, 'Español, Alemán'),
(5, 'DNI', 'Japan', 'E55555555', 'Elena', 'Gómez', '555555555', 5, true, 'Español, Italiano');

INSERT INTO Limpieza (fecha, id_empleado, id_hotel, numero_habitación) 
VALUES 
('2024-05-01', 1, 1, 101),
('2024-05-02', 2, 2, 202),
('2024-05-03', 3, 3, 301),
('2024-05-04', 4, 4, 401),
('2024-05-05', 5, 5, 501);

INSERT INTO Reserva (id_reserva, fecha_reserva, id_cliente, id_hotel, numero_habitación, id_empleado) 
VALUES 
(1, '2024-05-01', 1, 1, 101, 1),
(2, '2024-05-02', 2, 2, 202, 2),
(3, '2024-05-03', 3, 3, 301, 3),
(4, '2024-05-04', 4, 4, 401, 4),
(5, '2024-05-05', 5, 5, 501, 5);

--------- Consultas
-- 1
SELECT * FROM Hotel;
SELECT * FROM Habitación;
SELECT * FROM Cliente;
SELECT * FROM Comentario;
SELECT * FROM Empleado;
SELECT * FROM Limpieza;
SELECT * FROM Reserva;

-- 2
SELECT * FROM Reserva WHERE fecha_reserva = '2024-05-03';

-- 3
SELECT COUNT(*)
FROM Habitación WHERE tipo_habitación = 'Doble';

-- 4
SELECT Hotel.nombre_hotel, COUNT(Reserva.id_reserva) AS total_reservas FROM Hotel
JOIN Reserva ON Hotel.id_hotel = Reserva.id_hotel GROUP BY Hotel.nombre_hotel;

-- 5 (6 consultas)
SELECT DISTINCT ciudad FROM Hotel;
SELECT ROUND(edad / 10.0) AS edad_redondeada FROM Cliente;
SELECT AVG(edad) AS edad_promedio FROM Cliente;
SELECT * FROM Cliente WHERE nombre LIKE 'J%';
SELECT SUM(numero_habitación) AS total_habitaciones FROM Habitación;
SELECT * FROM Reserva WHERE fecha_reserva = '2024-05-01';
