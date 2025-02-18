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

var_dump($producto_id);  

$sql = "INSERT INTO Favoritos (usuario_id, producto_id) VALUES (?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $usuario_id, $producto_id);

if ($stmt->execute()) {
    echo "Producto agregado a favoritos.";
} else {
    echo "Error al agregar producto.";
}













// // Verificar si se han recibido los parámetros
// if(isset($_POST['usuario_id']) && isset($_POST['producto_id'])) {
//     $usuario_id = $_POST['usuario_id'];
//     $producto_id = $_POST['producto_id'];

//     // Verificar si el favorito ya existe en la base de datos
//     $sql = "SELECT * FROM Favoritos WHERE usuario_id = ? AND producto_id = ?";
//     $stmt = $conn->prepare($sql);
//     $stmt->bind_param("ii", $usuario_id, $producto_id);
//     $stmt->execute();
//     $result = $stmt->get_result();

//     if($result->num_rows > 0) {
//         // El producto ya está marcado como favorito, eliminarlo
//         $sql_delete = "DELETE FROM Favoritos WHERE usuario_id = ? AND producto_id = ?";
//         $stmt_delete = $conn->prepare($sql_delete);
//         $stmt_delete->bind_param("ii", $usuario_id, $producto_id);
//         $stmt_delete->execute();
//         echo "Eliminado de favoritos";
//     } else {
//         // Agregar el producto a los favoritos
//         $sql_insert = "INSERT INTO Favoritos (usuario_id, producto_id) VALUES (?, ?)";
//         $stmt_insert = $conn->prepare($sql_insert);
//         $stmt_insert->bind_param("ii", $usuario_id, $producto_id);
//         $stmt_insert->execute();
//         echo "Agregado a favoritos";
//     }

//     // Cerrar la conexión
//     $stmt->close();
//     $conn->close();
// }
?>
