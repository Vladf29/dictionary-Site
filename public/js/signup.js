'use strict'

$('form').submit(function (event) {
    event.preventDefault();
    const data = {
        email: $(this).find('[name=email]').val(),
        name: $(this).find('[name=name]').val(),
        password: $(this).find('[name=password]').val(),
    }

    $.ajax({
        method: 'POST',
        url: '/users/signup',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function () {
            location.href = '/users/login';
        },
        error: function () {
            location.reload();
        }
    });
});