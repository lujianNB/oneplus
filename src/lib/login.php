<?php
    include('conn.php');

    $phone=$_REQUEST['phone'];
    $password=$_REQUEST['password'];
    
    // 查询用户名密码
    $sql="select*from user where phone='$phone' and password='$password'";

    $result=$mysqli->query($sql);

    
    if($result->num_rows>0){
        echo '{"msg":"登陆成功！","isLogin":true,"status":200}';
    }else{
        echo '{"msg":"登陆失败","isLogin":false,"status":200}';
    }
    $mysqli->close();
?>