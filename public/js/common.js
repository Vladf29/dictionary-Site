'use strict'

$(function () {

    $('.js-tw').click(function (event) {
        const target = event.target;
        const action = $(target).attr('data-action');
        if (!action) return;

        switch (action) {
            case 'edit':
                {
                    const parent = $(target).closest('tr');
                    const edit = parent.find('td[data-edit]');
                    if (!edit) return;

                    edit.each(function () {
                        const text = $(this).text();
                        const temp = `
                            <div data-initial-value='${text}'>
                                <input class='form-control' name='${$(this).attr('data-prop')}' value='${text}'>
                            </div>`;
                        $(this).html(temp);
                    });

                    const p = $(target).closest('.t-w');
                    p.find('[data-on=edit]').attr('data-state', 'show');
                    $(target).attr('data-state', 'hidden');
                    break;
                }
            case 'ok':
                {
                    const parent = $(target).closest('tr');
                    const edit = parent.find('td[data-edit]');
                    if (!edit) return;

                    const data = {};

                    edit.each(function () {
                        const attr = $(this).attr('data-prop');
                        data[attr] = $(this).find('.form-control').val();
                        $(this).html(data[attr]);
                    });

                    const p = $(target).closest('.t-w');
                    p.find('[data-on=edit]').attr('data-state', 'hidden');
                    p.find('[data-on=completeEdit]').attr('data-state', 'show');

                    $.ajax({
                        method: 'PUT',
                        url: '/dictionary/edit',
                        data: JSON.stringify({
                            id: parent.attr('data-word-id'),
                            data: data
                        }),
                        contentType: 'application/json',
                        complete: function () {
                            location.href = location.href;
                        }
                    })
                    break;
                }
            case 'cancel':
                {
                    const parent = $(target).closest('tr');
                    const edit = parent.find('td[data-edit]');
                    if (!edit) return;


                    edit.each(function () {
                        const val = $(this).find('[data-initial-value]').attr('data-initial-value');
                        $(this).html(val);
                    });

                    const p = $(target).closest('.t-w');
                    p.find('[data-on=edit]').attr('data-state', 'hidden');
                    p.find('[data-on=completeEdit]').attr('data-state', 'show');
                    break;
                }
            case 'delete':
                {
                    const parent = $(target).closest('tr');
                    if (!confirm('Are you sure?')) return;

                    $.ajax({
                        method: 'DELETE',
                        url: '/dictionary/delete',
                        data: JSON.stringify({
                            id: parent.attr('data-word-id')
                        }),
                        contentType: 'application/json',
                        complete: function () {
                            location.href = location.href;
                        }
                    });

                }
            default:
                break;
        }
    });

    $('.js-checkbox-dictionary').click(function (event) {
        const tr = $(this).closest('tr');
        const idWord = tr.attr('data-word-id');
        const ingame = tr.attr('data-ingame');
        $.ajax({
            method: 'POST',
            url: '/dictionary/ingame',
            data: JSON.stringify({
                idWord,
                ingame: ingame === 'true' ? false : true
            }),
            contentType: 'application/json',
            success: function (data) {
                if (data.status === 'OK')
                    tr.attr('data-ingame', data.ingame);
            },
            error: function (err) {

            }
        });
    });
});