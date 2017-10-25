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
});
