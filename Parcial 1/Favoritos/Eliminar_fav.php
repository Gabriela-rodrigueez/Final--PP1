<?php
session_start();
require_once '../Formulario/Conexion.php'; 


if (!isset($_SESSION['usuario_id'])) {
    echo "No has iniciado sesión.";
    exit;
}

if (!isset($_POST['producto_id'])) {
    echo "Error: No se recibió el ID del producto.";
    exit;
}

$usuario_id = $_SESSION['usuario_id'];
$producto_id = $_POST['producto_id'];

$sql = "DELETE FROM Favoritos WHERE usuario_id = ? AND producto_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $usuario_id, $producto_id);

if ($stmt->execute()) {
    echo "Producto eliminado de favoritos.";
} else {
    echo "Error al eliminar producto.";
}
?>
