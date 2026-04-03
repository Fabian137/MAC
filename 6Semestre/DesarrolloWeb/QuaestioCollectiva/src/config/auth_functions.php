<?php
function is_logged_in() {
    return isset($_SESSION['user_id']);
}

function logout() {
    session_unset();
    session_destroy();
    header('Location: /assets/auth/login.html');
    exit;
}
function require_login() {
    if (!is_logged_in()) {
        header("Location: /assets/auth/login.html");
        exit;
    }
}
?>