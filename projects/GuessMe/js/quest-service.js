var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;


function createQuestsTree() {
    gQuestsTree = loadFromStorage('quests-tree')
    if (!gQuestsTree) {
        gQuestsTree = createQuest('Male?');
        gQuestsTree.yes = createQuest('Gandhi');
        gQuestsTree.no = createQuest('Rita');
    }
    gCurrQuest = gQuestsTree;
    gPrevQuest = null;
}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function isChildless(node) {
    return (node.yes === null && node.no === null)
}

function moveToNextQuest(res) {
    // Update the prev, curr global vars
    gPrevQuest = gCurrQuest
    gCurrQuest = gCurrQuest[res]
}

function addGuess(newQuestTxt, newGuessTxt, res) {
    // Create and Connect the 2 Quests to the quetsions tree
    if (!newGuessTxt || !newQuestTxt) return false
    gPrevQuest[res] = createQuest(newQuestTxt)
    gPrevQuest[res].yes = createQuest(newGuessTxt)
    gPrevQuest[res].no = createQuest(gCurrQuest.txt)
    saveToStorage('quests-tree',gQuestsTree)
    return true

}

function restartGame() {
    gCurrQuest = gQuestsTree
}

function getCurrQuest() {
    return gCurrQuest
}

