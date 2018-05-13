'use strict'

$('form').find('[name=new_word]').focus();

$('form').submit(function (event) {
    event.preventDefault();
    const data = {
        word: $(this).find('[name=new_word]').val().toLowerCase(),
        translates: $(this).find('[name=new_word_tr]').val()
    }

    $.ajax({
        method: 'POST',
        url: '/dictionary/new_word',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function () {
            location.href = location.href;
        }
    })
});