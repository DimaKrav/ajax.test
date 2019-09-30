$(function () {
    console.log("jquery ready");

    $('#input_count').keydown(function (e) {
        check_new_message();

        if (e.ctrlKey && e.keyCode == 13) {

            let message = $('#input_count').val();
            if (message == ''){
                e.preventDefault();
            }
            else {
                message = message.replace(/\r?\n/g, '<br />');
                $.ajax({
                    url: "ajax-post.php",
                    type: "POST",
                    data: {
                        action: 'sent_info',
                        message: message
                    },
                    success: function (respond) {
                        obj = $.parseJSON(respond);
                        console.log(obj);

                        /***
                         * перевірка типу даних чи це object
                         * */
                        // if (typeof obj === 'object') {
                        //     $('.main-content').prepend('<div class="message-wrap"><p>' + obj['message'] + '</p><span>' + obj['time'] + '</span></div>');
                        //     // }
                        // }
                        // else {
                        //     $('.main-content').prepend('<p>' + obj + '</p>');
                        // }

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
        check_new_message();
        let message = $('#input_count').val();

        if (message == ''){
           e.preventDefault();
        }
        else {
            message = message.replace(/\r?\n/g, '<br />');
            $.ajax({
                url: "ajax-post.php",
                type: "POST",
                data: {
                    action: 'sent_info',
                    message: message
                },
                success: function (respond) {
                    obj = $.parseJSON(respond);
                    console.log(obj);

                    /***
                     * перевірка типу даних чи це object
                     * */
                    // if (typeof obj === 'object') {
                    //     $('.main-content').prepend('<div class="message-wrap"><p>' + obj['message'] + '</p><span>' + obj['time'] + '</span></div>');
                    //     // }
                    // }
                    // else {
                    //     $('.main-content').prepend('<p>' + obj + '</p>');
                    // }

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
                action: 'ajax_message_output',
                id: id
            },
            success: function (respond) {
                objs = $.parseJSON(respond);
                /***
                 * перевірка типу даних чи це object
                 * */
                if (objs == null)
                {}else {


                    if (typeof objs === 'object') {
                        console.log(objs);
                        objs.map(function(obj) {
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

    setInterval(function() {
        check_new_message();
    },3000)
});