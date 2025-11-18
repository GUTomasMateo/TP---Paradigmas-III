<?php
require "db.php";

$nombre = $_POST["nombre"];
$apellido = $_POST["apellido"];
$telefono = $_POST["telefono"];
$items = json_decode($_POST["items"], true);

$conn->query("INSERT INTO pedidos (nombre, apellido, telefono) VALUES ('$nombre', '$apellido', '$telefono')");
$pedido_id = $conn->insert_id;

foreach ($items as $i) {
    $producto_id = $i["id"];
    $cantidad    = $i["quantity"];

    $conn->query("INSERT INTO pedido_items (pedido_id, producto_id, cantidad)
                VALUES ($pedido_id, $producto_id, $cantidad)");
}

echo "ok";
?>
