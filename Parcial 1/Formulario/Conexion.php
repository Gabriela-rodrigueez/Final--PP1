<?php
$host  = "localhost";
$usuario = "root";
$password = "root";
$base_datos = "ismajo_database";

$conn = new mysqli($host , $usuario, $password, $base_datos);

if ($conn -> connect_error){
    die ("Error en la conexión:" . $conn -> connect_error);
} else {
    echo "Conexión exitosa";
}

?>


// php -S localhost:8000
