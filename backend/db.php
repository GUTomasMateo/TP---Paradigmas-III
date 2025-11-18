<?php
$host = "localhost";
$user = "root";
$pass = "";
$db = "aikor_store";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Error DB: " . $conn->connect_error);
}
?>
