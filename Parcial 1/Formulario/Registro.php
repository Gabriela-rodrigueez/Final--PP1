<?php
// error_reporting(E_ALL);
// ini_set('display_errors', 1);


require 'Conexion.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = trim($_POST['username']);
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);
    $fecha_nacimiento = $_POST['date'];

    if (empty($username) || empty($email) || empty($password) || empty($fecha_nacimiento)) {
        echo "Todos los campos son obligatorios.";
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Correo electrónico inválido.";
        exit;
    }

    if (strlen($password) < 8) {
        echo "La contraseña debe tener al menos 8 caracteres.";
        exit;
    }

    // Verificacón si el nombre de usuario ya esta en uso
    $stmt = $conn->prepare("SELECT username FROM Usuarios WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        echo "El nombre de usuario ya está en uso.";
        exit;
    }
    $stmt->close();


    // Encripta la contraseña
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // prepara la consulta para insertar al usuario
    $stmt = $conn->prepare("INSERT INTO Usuarios (username, email, password, fecha_nacimiento) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $username, $email, $hashed_password, $fecha_nacimiento);

    if ($stmt->execute()) {
        echo "Registro exitoso";
    } else {
        echo "Error en el registro: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
}


?>