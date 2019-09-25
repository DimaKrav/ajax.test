$(function () {
    console.log("jquery ready");

    $('#click_me').on('click', function () {
        let $function2 = 'sent_info' + $('#input_count').val();
        $.ajax({
            url: "ajax-post.php",
            type: "POST",
            data: {action: $function2},
            success: function (respond) {
                obj = $.parseJSON(respond);
                console.log(obj);


                /***
                 * перевірка типу даних чи це object
                 * */
                if (typeof obj === 'object') {
                    console.log('array it');
                    $.each(obj, function (index, value) {
                        $('.main-content').append('<p>' + value + '</p>');
                    })
                }
                else {
                    $('.main-content').append('<p>' + obj + '</p>');
                }

            }
        })
    })

});