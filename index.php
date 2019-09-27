<html>
<?php include_once 'db-connection.php';
include_once 'ajax-post.php';

?>

<head>
    <title>Some small Ajax</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="ajax-commands.js"></script>
</head>
<body>

<textarea type="text"  cols="30"
          rows="10" placeholder="Ctrl+Enter for fast Send" id="input_count"></textarea>
<button id="click_me">Send</button>
<?php chat_id();?>



<div class="main-content"><?php db_connect_for_message();?></div>
</body>


</html>