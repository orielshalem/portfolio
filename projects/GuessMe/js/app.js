'use strict';

var gLastRes = null;

$(document).ready(init);

function init() {
    createQuestsTree();
    $('.btn-success').click(onStartGuessing);
    $('.btn-info').click(() => onUserResponse('yes'));
    $('.btn-danger').click(() => onUserResponse('no'))
    $('.btn-outline-primary').click(() => {
        onAddGuess();
        return false
    });
}

function onStartGuessing() {
    // Hide the game-start section
    $('.game-start').hide()
    renderQuest();
    // Show the quest section
    $('.quest').show()
}

function renderQuest() {
    // Select the <h2> inside quest and update its text by the currQuest text
    $('.quest h2').text(getCurrQuest().txt)
}

function onUserResponse(res) {

    // If this node has no children
    if (isChildless(getCurrQuest())) {
        if (res === 'yes') {
            onRestartGame();
            // Improve UX
        } else {
            // Hide and show new-quest section
            $('.quest').hide()
            $('.alert-danger').show()
            $('.new-quest').show().addClass('roll-in-left')
        }
    } else {
        // Update the lastRes global var
        gLastRes = res
        moveToNextQuest(res);
        renderQuest();
    }
}

function onAddGuess() {
    // Get the inputs' values
    var newQuestTxt = $('#newQuest').val()
    var newGuessTxt = $('#newGuess').val()
    // Call the service addGuess
    if (addGuess(newQuestTxt, newGuessTxt, gLastRes)) onRestartGame();
}

function onRestartGame() {
    $('.quest').hide()
    $('.new-quest').hide();
    $('.alert-danger').hide()
    $('.game-start').show();
    restartGame()
    gLastRes = null;

}

