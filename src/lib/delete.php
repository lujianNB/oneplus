<?php
    include('./conn.php');

    $id = $_REQUEST['id'];

    // 删除商品数据
    $sql = "DELETE FROM `product` WHERE id='$id'";


    $res = $mysqli->query($sql);

    echo $res;
    
    $mysqli->close();
?>