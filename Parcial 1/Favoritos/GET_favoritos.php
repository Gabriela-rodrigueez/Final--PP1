<?php
session_start();
var_dump($_SESSION);
include '../Formulario/Conexion.php';

if (!isset($_SESSION['usuario_id'])) {
    echo json_encode(["error" => "No estás autenticado"]);
    exit;
}

$usuario_id = $_SESSION['usuario_id'];

echo "Usuario ID: " . $usuario_id . "<br>";  // verifica si el usuario está bien autenticado

$sql = "SELECT P.producto_id, P.nombre, P.precio, P.imagen 
        FROM Favoritos F
        INNER JOIN Productos P ON F.producto_id = P.producto_id
        WHERE F.usuario_id = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $usuario_id);
$stmt->execute();
$result = $stmt->get_result();

$favoritos = [];
while ($row = $result->fetch_assoc()) {
    $favoritos[] = $row;
}

echo json_encode($favoritos);
?>




<!-- cd "C:\Users\gabri\Desktop\Manuel Belgrano\Práctica Profesionalizante l\Parcial 1"
php -S localhost:8000
 -->