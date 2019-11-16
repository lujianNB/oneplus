<?php
    include('./conn.php');

    $phone = $_REQUEST['phone'];
    $product=$_REQUEST['product'];

    // 载入用户购物车数据
    $sql = "UPDATE `user` SET product='$product' WHERE phone='$phone'";


    $res = $mysqli->query($sql);

    echo $res;
    
    $mysqli->close();
?>