<?php

include 'bd/BD.php';

header('Access-Control-Allow-Origin: *');


if($_SERVER['REQUEST_METHOD'] == 'GET'){
    if(isset($_GET['id'])){
        $query = "SELECT * FROM series_info WHERE id =" . $_GET['id'];
        $result = getMethod($query);
        echo json_encode($result -> fetch(PDO::FETCH_ASSOC));
    } else {
        $query = "SELECT * FROM series_info";
        $result = getMethod($query);
        echo json_encode($result -> fetchAll());
    }
    header("HTTP/1.1 200 OK");
    exit();

}

// POST 

if($_POST['METHOD']=='POST'){
    unset($_POST['METHOD']);
    $nombre = $_POST['nombre'];
    $fecha_lanzamiento = $_POST['fecha_lanzamiento'];
    $temporadas = $_POST['temporadas'];
    $episodios = $_POST['episodios'];
    $plataforma_actual = $_POST['plataforma_actual'];
    $query = "INSERT INTO series_info(nombre, fecha_lanzamiento, temporadas, episodios, plataforma_actual) VALUES ('$nombre', '$fecha_lanzamiento', '$temporadas', '$episodios', '$plataforma_actual')";
    $queryAutoIncrement = 'SELECT MAX(id) AS id FROM series_info';
    $result = postMethod($query, $queryAutoIncrement);
    echo json_encode($result);
    header("HTTP/1.1 200 OK");
    exit();
}

// PUT

if($_POST['METHOD']=='PUT'){
    $id = $_GET['id'];
    $nombre = $_POST['nombre'];
    $fecha_lanzamiento = $_POST['fecha_lanzamiento'];
    $temporadas = $_POST['temporadas'];
    $episodios = $_POST['episodios'];
    $plataforma_actual = $_POST['plataforma_actual'];
    $query = "UPDATE series_info SET nombre = '$nombre', fecha_lanzamiento = '$fecha_lanzamiento', temporadas = '$temporadas', episodios = '$episodios', plataforma_actual = '$plataforma_actual' WHERE id = '$id' ";
    $result = putMethod($query);
    echo json_encode($result);
    header("HTTP/1.1 200 OK");
    exit();
}

// DELETE

if($_POST['METHOD']=='DEL'){
    unset($_POST['METHOD']);
    $id = $_GET['id'];
    $query = "DELETE FROM series_info WHERE id = '$id' ";
    $result = deleteMethod($query);
    echo json_encode($result);
    header("HTTP/1.1 200 OK");
    exit();
}

header("HTTP/1.1 400 Bad Request");

?>;