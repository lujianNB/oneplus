<?php
    include('./conn.php');

    $id = $_REQUEST['id'];
    $name=$_REQUEST['name'];
    $discount=$_REQUEST['discount'];
    $price=$_REQUEST['price'];
    $num=$_REQUEST['num'];

    // 载入商品数据
    $sql = "UPDATE `product` SET name='$name',discount='$discount',price='$price',num='$num' WHERE id='$id'";


    $res = $mysqli->query($sql);

    echo $res;
    
    $mysqli->close();
?>