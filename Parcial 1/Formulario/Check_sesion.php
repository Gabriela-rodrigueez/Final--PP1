<?php
session_start();

// Verifica si el usuario está autenticado
if (isset($_SESSION['usuario_id'])) {
    // Si la sesión está activa, responde con un estado de éxito
    echo json_encode(['status' => 'success']);
} else {
    // Si no hay sesión activa, responde con un estado de error
    echo json_encode(['status' => 'error']);
}
?>
