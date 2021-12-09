<?php


use PHPUnit\Framework\TestCase;

class LoginTest extends TestCase
{
    public function login() {
        $_SESSION[] = "";
        require 'php/process_login.php';

        $email = "test2@test.com";
        $password = "1";
        $connection = mysqli_connect('localhost', 'root', '', 'project');

        $output = checkLogin($email, $password, $connection);

        $this->assertSame($output, true);

    }



}
