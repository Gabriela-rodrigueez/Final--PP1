<?php
// Iniciar la sesión
session_start();

// Eliminar todas las variables de sesión
session_unset();

// Destruir la sesión
session_destroy();

if (isset($_COOKIE['remember_me'])) {
    setcookie('remember_me', '', time() - 3600, "/"); // Eliminamos la cookie
}

// Redirigir al usuario a la página de inicio de sesión (o a la página principal)
header("Location: Login.php");
exit();
?>
