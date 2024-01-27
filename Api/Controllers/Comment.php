<?php

namespace Api\Controllers;

use mysqli;
use Exception;

class Comment {

    public static function create( mysqli $db){
        $name = $_POST['name'] ?? '';
        $email = $_POST['email'] ?? '';
        $comment = $_POST['comment'] ?? '';

        $errs = [];
        if ($name == '') $errs['name'] = 'Поле name не может быть пустым!';
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errs['email'] = 'Поле email не является почтой!';
        if ($comment == '') $errs['comment'] = 'Поле comment не может быть пустым!';

        if ($errs) {
            header("HTTP/1.1 400 Bad Request");
            die(json_encode($errs, JSON_UNESCAPED_UNICODE));
        }

        try {
            $query = $db-> query("INSERT INTO `comments` (`name`, `email`, `comment`) VALUES ('$name', '$email', '$comment')");
            $insert_data = $db-> query("SELECT * FROM `comments` ORDER BY `id` DESC LIMIT 1");
        } catch (Exception $e){
            die($e);
        }

        $result = $insert_data-> fetch_assoc();

        header("HTTP/1.1 201 Created");
        die(json_encode([
            'status' => 'ok',
            'content'=> $result
        ], JSON_UNESCAPED_UNICODE));
    }
    
    public static function get_all(mysqli $db){
        try {
            $query = $db->query("SELECT * FROM comments");
        } catch (Exception $e){
            die($e);
        }

        $result = [];
        while ($item = $query->fetch_assoc()){
            $result[] = $item;
        }
        header("HTTP/1.1 200 OK");
        die(json_encode([
            'status' => 'ok',
            'content' => $result
        ], JSON_UNESCAPED_UNICODE));
    }

}