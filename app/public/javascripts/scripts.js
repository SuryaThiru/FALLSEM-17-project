$( function () {
        // alert messages
        setTimeout(function () {
            $('.bg-danger').hide({duration: 500, direction: 'top'});
            $('.bg-success').hide({duration: 500, direction: 'top'});
        }, 1000);

        // login id check
        $('#login-id').on('keyup', function() {
            let val = $(this).val();

            if (val === '') {
                $(this).css('background-color', '#fff');
            }
            else if (!val.match(/^\d+$/)) {
                $(this).css('background-color', '#ffb1b1');
            }
            else {
                $(this).css('background-color', '#fff');
            }
        });

        // links in table rows
        $('.clickable-row').click(function () {
            let url = window.location + '/' + $(this).attr('data-href');
            window.open(url, '_self');
        });


        // animations
        $('.bg-2 > *').css('visibility', 'hidden');
        $(window).scroll(function (event) {
            let scroll = $(window).scrollTop();

            // index 2nd row
            let row2 = $('.bg-2').offset().top;
            if (scroll >= row2 + 5) {
                $('.bg-2 > *').css('visibility', 'visible');
                $('.bg-2 > h1').addClass('animated fadeInDown');
            }

        })
});
