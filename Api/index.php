<?php


spl_autoload_register(function ($class_name) {
    include '../'.$class_name. '.php';
});

use Api\Controllers\Comment;

$config = include '../config.php';

$db = new mysqli($config['host'], $config['user'], $config['password'], $config['db']);

if ($db->connect_errno) {
    throw new Exception($mysqli->connect_error);
}

$route = $_GET['route'];

header('Content-Type: application/json');


if ($route == 'comments') {

    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        Comment::get_all($db);

    } else if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        Comment::create($db);

    }

}