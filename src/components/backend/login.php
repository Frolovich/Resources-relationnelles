// login.php
include "db.php";

$data = json_decode(file_get_contents("php://input"));

$email = $data->email;
$password = $data->password;

$result = $conn->query("SELECT * FROM users WHERE email='$email'");
$user = $result->fetch_assoc();

if ($user && password_verify($password, $user['password'])) {
    echo json_encode(["status" => "success", "role" => $user['role']]);
} else {
    echo json_encode(["status" => "error"]);
}