'use strict'

let storageWords = [];
let gameWords = [];
let storageAnswer = [];

let currentWord = {};

const field = $('#answer_user');
const questField = $('#ques_word');

const init = () => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: '/dictionary/game/words',
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                resolve(data);
            },
            error: function (err) {
                reject(err);
            }
        });
    });
}

const game = () => {
    const n = randomNum(0, gameWords.length - 1);
    const w = gameWords.splice(n, 1)[0];
    const word = w.word[0].toUpperCase() + w.word.slice(1);
    questField.text(word);
    field.val('').end().focus();
    currentWord = w;
}

const displayResults = () => {
    $('.js-start-block').attr('data-state', 'hidden');
    $('.js-game-block').attr('data-state', 'hidden');
    $('.js-table').attr('data-state', 'show');

    const tbody = $('.js-table-tbody');
    let tempBody = ``;
    storageAnswer.forEach((item, ind) => {
        let temp = `<tr ${item.correct ? '' : 'class="bg-danger text-white"'}>
                        <td>${ind + 1}</td>;
                        <td>${item.word}</td>;
                        <td>${item.translates}</td>
                        <td>${item.answer}</td>
                    </tr>`;
        tempBody += temp
    });
    tbody.html(tempBody);
    storageAnswer = [];
    gameWords = [];
}

$('.js-start').click(async function () {
    try {
        if (storageWords.length === 0)
            storageWords = await init();
        gameWords = storageWords.slice(0);
        $('.js-start-block').attr('data-state', 'hidden');
        $('.js-game-block').attr('data-state', 'show');
        game();

    } catch (err) {
        console.log(err);
    }
});

$('.js-btns-actions').click(function (event) {
    event.preventDefault();
    const target = $(event.target);
    const action = target.attr('data-action');
    if (!action) return;

    switch (action) {
        case 'answer':
            {
                const val = field.val().toLowerCase();
                if (!val) return;

                if (currentWord.translates.split(',').length > 1)
                    currentWord.correct = currentWord.translates.split(',')
                    .map((item) => item.split(' ').filter(item => item != false)[0]).includes(val);
                else
                    currentWord.correct = val === currentWord.translates;

                currentWord.answer = val;
                storageAnswer.push(currentWord);
                currentWord = {};

                if (gameWords.length !== 0)
                    return game();
                else
                    displayResults();

                break;
            }
        case 'skip':
            {
                break;
            }
        case 'tip':
            {
                break;
            }
        case 'finish':
            {
                displayResults();
                break;
            }
        default:
            break;
    }
});

function randomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}