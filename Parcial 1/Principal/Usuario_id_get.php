<?php
session_start();  // Iniciar la sesión

// Verificar si el usuario está logueado y tiene un 'usuario_id'
if(isset($_SESSION['usuario_id'])) {
    echo $_SESSION['usuario_id']; // Retorna el usuario_id si está en sesión
} else {
    echo 'null';  // Si no hay sesión, devuelve 'null'
}
?>

