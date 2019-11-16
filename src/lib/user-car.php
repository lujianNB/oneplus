<?php
    include('./conn.php');

    $phone = $_REQUEST['phone'];

    // 通过用户手机号获得其购物车数据
    $sql = "SELECT `product` FROM `user` WHERE phone='$phone'";

    $res = $mysqli->query($sql);

    $row = $res->fetch_assoc();

    $json = json_encode($row);

    echo $json;
    
    $mysqli->close();
?>