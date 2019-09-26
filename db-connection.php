<?php

$servername = "172.17.1.64:3306"; //Лінк на базу даних
$username = "root";
$password = "";
$dbname = "ajax.test";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
die("Connection failed: " . $conn->connect_error);
}
echo "<p>Connected successfully</p>";