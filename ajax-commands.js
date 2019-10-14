$(function () {
    console.log("jquery ready");

    $('#input_count').keydown(function (e) {

        if (e.ctrlKey && e.keyCode == 13) {

            let message = $('#input_count').val();
            if (message == '') {
                e.preventDefault();
            }
            else {
                check_new_message();
                message = message.replace(/\r?\n/g, '<br />');
                $.ajax({
                    url: "ajax-post.php",
                    type: "POST",
                    data: {
                        action: 'sent_info',
                        message: message
                    }
                })
            }

            /*
            Очистка поля вводу повідомлення
             */
            $('#input_count').val(null);
            $('#input_count').focus();

        }
    });

    $('#click_me').on('click', function (e) {

        let message = $('#input_count').val();

        if (message == '') {
            e.preventDefault();
        }
        else {
            check_new_message();
            message = message.replace(/\r?\n/g, '<br />');
            $.ajax({
                url: "ajax-post.php",
                type: "POST",
                data: {
                    action: 'sent_info',
                    message: message
                }
            })
        }

        /*
        Очистка поля вводу повідомлення
         */
        $('#input_count').val(null);
        $('#input_count').focus();
    })


    function check_new_message() {
        let id = $('#last_chat_message').val();
        $.ajax({
            url: "ajax-post.php",
            type: "POST",
            data: {
                action: 'mess_out',
                id: id
            },
            success: function (respond) {

                /***
                 * перевірка чи відповідь не пуста
                 * */
                if (respond == 'null') {
                }

                else {
                    let objs = $.parseJSON(respond);
                    if (typeof objs === 'object') {
                        // console.log(objs);
                        objs.map(function (obj) {
                            $('.main-content').prepend('<div class="message-wrap"><p>' + obj['message'] + '</p><span>' + obj['time'] + '</span></div>');
                            $('#last_chat_message').val(obj['last_chat_id']);
                        })
                    }

                    else {
                        $('.main-content').prepend('<p>' + objs + '</p>');
                    }

                }
            }

        })
    }

    setInterval(function () {
        check_new_message();
    }, 3000)
});