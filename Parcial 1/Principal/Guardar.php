<?php
session_start();
include '../Formulario/Conexion.php';

if (isset($_POST['usuario_id']) && isset($_POST['producto_id'])) {
    $usuario_id = $_POST['usuario_id'];
    $producto_id = $_POST['producto_id'];

    // Verificar si el producto ya está en favoritos
    $sql = "SELECT * FROM Favoritos WHERE usuario_id = ? AND producto_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ii", $usuario_id, $producto_id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // Si el producto ya está en favoritos, se eliminamos
        $sql = "DELETE FROM Favoritos WHERE usuario_id = ? AND producto_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ii", $usuario_id, $producto_id);
        $stmt->execute();
        echo "Producto eliminado de favoritos";
    } else {
        // Si no está en favoritos, se agregamos
        $sql = "INSERT INTO Favoritos (usuario_id, producto_id) VALUES (?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ii", $usuario_id, $producto_id);
        $stmt->execute();
        echo "Producto agregado a favoritos";
    }
}
?>
