// register.php
include "db.php";

$data = json_decode(file_get_contents("php://input"));

$email = $data->email;
$password = password_hash($data->password, PASSWORD_DEFAULT);

$sql = "INSERT INTO users (email, password, role) 
        VALUES ('$email', '$password', 'citizen')";

$conn->query($sql);

echo json_encode(["status" => "ok"]);