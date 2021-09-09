<?php 

$pdo = null;
$host = "localhost";
$user = "root";
$password = "";
$bd = "series";

// FUNCTIONS CONNECT / DISCONNECT BD

function connect(){
    try{
        $GLOBALS['pdo'] = new PDO("mysql:host=".$GLOBALS['host'].";dbname=series", $GLOBALS['user'], $GLOBALS['password']);
        $GLOBALS['pdo'] -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }catch(PDOException $e){
        print "Error: Could not connect to the database ". $GLOBALS['bd']. "<br />";
        print "Error: " . $e . "<br />";
        die();
    }
}

function disconnect(){
    $GLOBALS['pdo'] = null;
}

// METHODS

// GET 
function getMethod($query){
    
    try {
        connect();
        $sentence = $GLOBALS['pdo'] -> prepare($query);
        $sentence -> setFetchMode(PDO::FETCH_ASSOC);
        $sentence -> execute();
        disconnect();
        return $sentence;

    } catch (Exception $e) {
        die("Error: " . $e);
    }

}

// POST
function postMethod($query, $queryAutoIncrement){
    
    try {
        connect();
        $sentence = $GLOBALS['pdo'] -> prepare($query);
        $sentence -> execute();
        $idAutoIncrement = getMethod($queryAutoIncrement) ->fetch(PDO::FETCH_ASSOC);
        $result = array_merge($idAutoIncrement, $_POST);
        $sentence -> closeCursor();
        disconnect();
        return $result;

    } catch (Exception $e) {
        die("Error: " . $e);
    }

}

// PUT
function putMethod($query){
    try {
        connect();
        $sentence = $GLOBALS['pdo'] -> prepare($query);
        $sentence -> execute();
        $result = array_merge($_GET, $_POST);
        $sentence -> closeCursor();
        disconnect();
        return $result;

    } catch (Exception $e) {
        die("Error: " . $e);
    }

}

// DELETE
function deleteMethod($query){
    try {
        connect();
        $sentence = $GLOBALS['pdo'] -> prepare($query);
        $sentence -> execute();
        $sentence -> closeCursor();
        disconnect();
        return $_GET['id'];

    } catch (Exception $e) {
        die("Error: " . $e);
    }

}

?>