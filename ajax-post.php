<?php

function sent_info1(){
    $info = 'Some text';
    echo json_encode($info);
}

function sent_info2(){
    $info = array("key1"=>'Some text2',"key2"=>'some text4');
    echo json_encode($info);
}
if(!empty($_REQUEST)){
    if(function_exists($_REQUEST['action'])){
        call_user_func($_REQUEST['action']);
    }
    die();
}