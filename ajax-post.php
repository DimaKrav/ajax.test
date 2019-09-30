<?php

include_once 'db-connection.php';
/*
 * Запис повідомлення в бд
 */

function db_connect_insert_message()
{
    $conn = new mysqli(servername, username, password, dbname);

    $stmt = $conn->prepare("INSERT INTO test_table (chat_text) VALUES (?)");
    $stmt->bind_param("s", $_REQUEST['message']);
    $stmt->execute();

    $stmt->close();
    $conn->close();


}

/*
 * Відправка повідомлення зразу на фронт
 */
function sent_info()
{
    db_connect_insert_message();


    $message = array('message' => $_REQUEST['message'], 'time' => date("Y-m-d H:m:s"));

    echo json_encode($message);
}


/*
 * Вивод повідомлень з бд на фронт при першій загрузці
 */


function db_connect_for_message()
{
    $conn = new mysqli(servername, username, password, dbname);

    $sql = "SELECT chat_id, chat_text, chat_time FROM test_table  ORDER BY chat_time DESC LIMIT 10;";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // output data of each row
        while ($row = $result->fetch_assoc()) {

            echo "<div class='message-wrap'><p>" . $row["chat_text"] . "</p><span>" . $row["chat_time"] . "</span></div>";
        }
    } else {
        echo "0 results";
    }

    $conn->close();
}

function chat_id()
{
    $conn = new mysqli(servername, username, password, dbname);

    $sql = "SELECT chat_id FROM test_table  ORDER BY chat_time DESC LIMIT 1;";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // output data of each row
        while ($row = $result->fetch_assoc()) {

            /*
             * Запис останнього добавленного id
             */
            $last_chat_id = $row['chat_id'];

            echo '<input type="hidden" id="last_chat_message" name="last_chat_message" value="' . $last_chat_id . '">';

        }
    }
    $conn->close();
}


function ajax_message_output()
{
    global $last_chat_id, $check_message;
    $last_chat_id = $_REQUEST['id'];

    $conn = new mysqli(servername, username, password, dbname);


    $sql = "SELECT chat_id FROM test_table  ORDER BY chat_id  DESC LIMIT 1;";
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();

    $last_check_chat_id = $row['chat_id'];


    /*
     * Перевірка чи перевірений id повідомлення більший за останній відомий.
     * Якщо більший то вигрузити всі повідомлення починаючи з останнього відомого
     */
//    $check_message = $last_check_chat_id.' '.$last_chat_id;
    if ($last_check_chat_id > $last_chat_id) {
        global $last_chat_id;
        $sql = "SELECT chat_id, chat_text, chat_time FROM test_table  WHERE chat_id > " . $last_chat_id . " ORDER BY chat_time DESC ";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            // output data of each row
            $i = 0;
            while ($row = $result->fetch_assoc()) {

                $check_message[$i] = array(
                    'last_chat_id' => $row['chat_id'],
                    'message' => $row["chat_text"],
                    'time' => $row["chat_time"]
                );

                $i++;
            }
        }
    }
    $conn->close();
    echo json_encode($check_message);
}


/*
 * Перевірка на наявність функції для ajax
 */
if (!empty($_REQUEST)) {
    if (function_exists($_REQUEST['action'])) {
        call_user_func($_REQUEST['action']);
    }
    die();
}