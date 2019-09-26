$(function () {
    console.log("jquery ready");

    $('#click_me').on('click', function () {
        let message = $('#input_count').val();
        $.ajax({
            url: "ajax-post.php",
            type: "POST",
            data: {action: 'sent_info',
                    message: message },
            success: function (respond) {
                obj = $.parseJSON(respond);
                console.log(obj);


                /***
                 * перевірка типу даних чи це object
                 * */
                if (typeof obj === 'object') {
                    console.log('array it');
                    // $.each(obj, function (index, value) {
                        // $('.main-content').append('<p>' + value + '</p>');
                        $('.main-content').prepend('<div class="message-wrap"><p>' + obj['message'] + '</p><span>'+ obj['time'] +'</span></div>');
                    // }
                }
                else {
                    $('.main-content').prepend('<p>' + obj + '</p>');
                }

            }
        })

        $('#input_count').val(null);
    })

});