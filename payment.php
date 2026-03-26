<?php
session_start();
include 'includes/db.php';
include 'includes/header.php';

// Check login
if(!isset($_SESSION['user'])){
    header("Location: login.php");
    exit();
}

// Check payment session
if(!isset($_SESSION['payment'])){
    echo "<p style='text-align:center;'>No payment data found</p>";
    include 'includes/footer.php';
    exit();
}

$user_id = $_SESSION['user']['id'];
$event_id = $_SESSION['payment']['event_id'];
$amount = $_SESSION['payment']['amount'];

// Handle payment submit
if(isset($_POST['pay'])){
    $method = $_POST['method'];

    // Insert into payments table
    $conn->query("INSERT INTO payments(user_id,event_id,amount,payment_method) 
                  VALUES($user_id,$event_id,$amount,'$method')");

    // Clear session
    unset($_SESSION['payment']);

    // Redirect to success page
    header("Location: success.php");
    exit();
}
?>

<div class="payment-box">
    <h2>💳 Payment Gateway</h2>

    <p><b>Total Amount:</b> ₹<?php echo $amount; ?></p>

    <form method="POST">

        <div class="payment-option">
            <input type="radio" name="method" value="UPI" required> UPI (Google Pay / PhonePe)
        </div>

        <div class="payment-option">
            <input type="radio" name="method" value="Card"> Credit / Debit Card
        </div>

        <div class="payment-option">
            <input type="radio" name="method" value="NetBanking"> Net Banking
        </div>

        <input type="text" placeholder="Enter UPI ID / Card Number" required>

        <button name="pay">Pay Now 💸</button>
    </form>
</div>

<?php include 'includes/footer.php'; ?>