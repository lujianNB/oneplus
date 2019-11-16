<?php
    include('conn.php');
    
    $phone=$_REQUEST['phone'];
    $password=$_REQUEST['password'];

    // 查找手机号是否存在
    $sql="select*from user where phone='$phone'";

    $result=$mysqli->query($sql);
    if($result->num_rows >0){
        echo '{"msg":"账户已存在","has":true,"status":200}';
        $mysqli->close();
        die;
    };

    // 插入新用户数据
    $insSql="insert into user(phone,password,product) values('$phone','$password','[]')";
    
    $res=$mysqli->query($insSql);
    
    if($res){
        echo '{"msg":"账户可用","has":false,"status":200}';
    }
    $mysqli->close();
?>