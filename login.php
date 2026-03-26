<?php
session_start();
include 'includes/db.php';

$msg = "";

if(isset($_POST['login'])){
$email=$_POST['email'];
$pass=$_POST['password'];

$res=$conn->query("SELECT * FROM users WHERE email='$email'");
$user=$res->fetch_assoc();

if($user && password_verify($pass,$user['password'])){
$_SESSION['user']=$user;
$msg="Login Successful ✅";
header("refresh:1;url=events.php");
}else{
$msg="Invalid Login ❌";
}
}
?>

<link rel="stylesheet" href="css/style.css">

<div class="auth-bg">
<div class="auth-box">

<h2>🔐 Login</h2>
<p class="auth-msg"><?php echo $msg; ?></p>

<form method="POST">
<input type="email" name="email" placeholder="Email" required>
<input type="password" name="password" placeholder="Password" required>

<button name="login">Login</button>
</form>

<p style="color:white;">
New user? <a href="register.php">Register</a>
</p>

</div>
</div>