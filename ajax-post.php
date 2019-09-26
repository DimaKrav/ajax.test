<?php


function db_connect() {
    $servername = "172.17.1.64:3306"; //Лінк на базу даних
    $username = "root";
    $password = "";
    $dbname = "ajax.test";

    $conn = new mysqli($servername, $username, $password, $dbname);
    $sql = "INSERT INTO test_table (chat_text) VALUES ('sdfhssdhs')";

    $conn->query($sql);

    $conn->close();
}


function sent_info(){
    db_connect();

//    $info = 'Some text';
    $message = array('message' => $_REQUEST['message'],'time' => date("D M Y H:m:s"));

    echo json_encode($message);
}

//function sent_info2(){
//    $info = array("key1"=>'Some text2',"key2"=>'some text4');
//    echo json_encode($info);
//}
if(!empty($_REQUEST)){
    if(function_exists($_REQUEST['action'])){
        call_user_func($_REQUEST['action']);
    }
    die();
}