'use strict'
const MINE = '💣'
const EMPTY = ''
const FLAG = '🚩'
const BOMBED = '💥'
const HEART = '❤️'
const HINT = '<img onclick="hintClicked()" src="img/hint.png" alt=""></img>'
const smiley = {
    dead: '<img onClick="init()" src="img/Dead.jpg" alt=""></img>',
    happy: '<img onClick="init()" src="img/happy.jpg" alt=""></img>',
    victori: '<img onClick="init()" src="img/victori.png" alt=""></img>'
}
var gTimeInterval;
var gBoard;
var gGame;
var gLevel;
var gSize;

function setGlobals() {
    gGame = {
        isOn: false,
        hintMode: false,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0,
        lifeLeft: 3,
        hintsLeft: 3
    }
    gLevel = {
        easy: {
            size: 4,
            mines: 2,
        },
        medium: {
            size: 8,
            mines: 12,
        },
        expert: {
            size: 12,
            mines: 30,
        }
    }
    if (!gSize) gSize = gLevel.easy;
    clearInterval(gTimeInterval)
    gTimeInterval = null
}

function init() {
    setGlobals()
    gBoard = buildBoard()
    renderPage()
    gGame.isOn = true
}

function renderPage() {
    renderTable(gBoard, '.table');
    renderHeader()
    renderButtons()
    renderHints()
    document.querySelector('.play-again').innerHTML = '';
    document.querySelector('.smiley').innerHTML = smiley.happy;
}

function renderButtons() {
    var strHTML = ` <button class="button" onclick="changeSize(this.innerText)">Easy</button>
                    <button class="button" onclick="changeSize(this.innerText)">Medium</button>
                    <button class="button" onclick="changeSize(this.innerText)">Expert</button>`
    document.querySelector('.buttons').innerHTML = strHTML;
}

function renderHeader() {
    var strHTML = `<div class="timer"></div><div class="smiley"></div><div class="life"></div>`
    document.querySelector('header').innerHTML = strHTML;
    renderTimer(0)
    renderLifeLeft()
}
function renderTimer() {
    var strHTML = `<h2>Time:<span class=""> ${gGame.secsPassed}</span></h2>`
    document.querySelector('.timer').innerHTML = strHTML;
}

function renderLifeLeft() {
    var strHTML = `<h2><span class="left">${HEART}${HEART}${HEART}</span></h2>`
    document.querySelector('.life').innerHTML = strHTML;
}

function buildBoard() {
    var board = [];
    for (var i = 0; i < gSize.size; i++) {
        board[i] = []
        for (var j = 0; j < gSize.size; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isBombed: false,
                isMarked: false,
            };
        }
    }
    return board;
}


function setMines(takenI, takenJ) {
    for (var m = 0; m < gSize.mines; m++) {
        var i = getRandomInt(0, gSize.size - 1)
        var j = getRandomInt(0, gSize.size - 1)
        if (gBoard[i][j].isMine || (i === takenI && j === takenJ)) m--
        gBoard[i][j].isMine = true
    }
}

function renderTable(mat, selector) {
    var cell;
    var strHTML = '<table border="1"><tbody>';
    for (var i = 0; i < mat.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < mat[0].length; j++) {
            if ((!gGame.isOn) && gBoard[i][j].isMine) {
                cell = MINE
            } else {
                cell = '';
            }
            var className = `cell-${i}-${j} cell`;
            strHTML += '<td oncontextmenu="cellMarked(this); return false;" onClick="cellClicked(this)" class="' + className + '">' + cell + '</td>'
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>';
    var elContainer = document.querySelector(selector);
    elContainer.innerHTML = strHTML;
}

function changeSize(elSize) {
    elSize = elSize.toLowerCase()
    gSize = gLevel[elSize]
    init()
}

function getCellCoord(strCellId) {
    var parts = strCellId.split('-')
    var coord = { i: +parts[1], j: +parts[2] };
    return coord;
}


function renderCell(location, value) {
    var elCell = document.querySelector(`.cell-${location.i}-${location.j}`);
    elCell.innerHTML = value;
}

function gameOver() {
    gGame.isOn = false;
    renderTable(gBoard, '.table');
    clearInterval(gTimeInterval)
    renderPlayAgain()
}

function startTime() {
    gTimeInterval = setInterval(() => {
        gGame.secsPassed++
        document.querySelector('.timer h2 span').innerHTML = gGame.secsPassed;
    }, 1000)
}

function cellMarked(elCell) {
    var coord = getCellCoord(elCell.classList[0])
    if ((!gGame.isOn) || (gBoard[coord.i][coord.j].isShown)) return
    if (gBoard[coord.i][coord.j].isMarked) {
        gBoard[coord.i][coord.j].isMarked = false
        renderCell(coord, EMPTY)
        gGame.markedCount--
    } else {
        gBoard[coord.i][coord.j].isMarked = true
        renderCell(coord, FLAG)
        gGame.markedCount++
        if (checkGameOver()) gameOver()
    }
    if (gGame.secsPassed === 0) startTime()
}

function checkGameOver() {
    var limit = (gSize.size ** 2) - gSize.mines
    return ((limit === gGame.shownCount) && (gGame.markedCount === gSize.mines) || (gGame.lifeLeft === 0))
}

function renderPlayAgain() {
    var strHTML
    if (gGame.lifeLeft > 0) {
        strHTML = '<button class="button" onclick="init()" >You Win! let\'s play again</button>'
        document.querySelector('.smiley').innerHTML = smiley.victori
    } else {
        document.querySelector('.smiley').innerHTML = smiley.dead
        strHTML = '<button class="button" onclick="init()" >let\'s try again?</button>'
    }
    document.querySelector('.play-again').innerHTML = strHTML;
}

function setMinesNegsCount(board) {
    var emptyCells = []
    for (var x = 0; x < board.length; x++) {
        for (var y = 0; y < board.length; y++) {
            var mineNegCount = 0;
            for (var i = x - 1; i <= x + 1; i++) {
                if (i < 0 || i > board.length - 1) continue
                for (var j = y - 1; j <= y + 1; j++) {
                    if ((i === x && j === y) || (j < 0 || j > board.length - 1)) continue
                    if (board[i][j].isMine) {
                        mineNegCount++
                    }
                }
            }
            emptyCells.push({ x, y })
            board[x][y].minesAroundCount = mineNegCount
        }
    }
}


function openCellsAround(coord) {
    for (var i = coord.i - 1; i <= coord.i + 1; i++) {
        if (i < 0 || i > gBoard.length - 1) continue
        for (var j = coord.j - 1; j <= coord.j + 1; j++) {
            if ((i === coord.i && j === coord.j) || (j < 0 || j > gBoard.length - 1)
                || (gBoard[i][j].isShown === true)) continue
            renderCell({ i, j }, gBoard[i][j].minesAroundCount)
            gGame.shownCount++;
            gBoard[i][j].isShown = true
            var elCell = document.querySelector(`.cell-${i}-${j}`)
            elCell.classList.add('clicked')
            if (gBoard[i][j].minesAroundCount === 0 && (gBoard[i][j].isShown)) {
                openCellsAround({ i, j })
            }
        }
    }
    return
}

function renderHints() {
    var strHTML = '';
    for (var i = 0; i < gGame.hintsLeft; i++) {
        strHTML += HINT;
    }
    document.querySelector('.hints').innerHTML = strHTML;
}

function hintClicked() {
    if (gGame.hintMode === true) return
    gGame.hintMode = true;
    gGame.hintsLeft--
    var strHTML = 'Hint mode go for it!'
    document.querySelector('.hint-mode').innerHTML = strHTML;
}

function getHint(coord) {
    for (var i = coord.i - 1; i <= coord.i + 1; i++) {
        if (i < 0 || i > gBoard.length - 1) continue
        for (var j = coord.j - 1; j <= coord.j + 1; j++) {
            if (j < 0 || j > gBoard.length - 1) continue
            if (gGame.hintMode) {
                (gBoard[i][j].isMine) ? renderCell({ i, j }, MINE) : renderCell({ i, j }, gBoard[i][j].minesAroundCount)
            } else if (gBoard[i][j].isShown) {
                renderCell({ i, j }, gBoard[i][j].minesAroundCount)
            } else if (gBoard[i][j].isBombed) {
                renderCell({ i, j }, BOMBED)
            } else {
                renderCell({ i, j }, '')
            }
        }
    }
    if (!gGame.isOn) {
        setTimeout(() => {
            getHint(coord)
            renderHints()
            gGame.hintMode = false;
            gGame.isOn = true;
        }, 2000)
    }
}

function cellClicked(elCell) {
    var coord = getCellCoord(elCell.classList[0])
    var i = coord.i
    var j = coord.j
    if ((!gGame.isOn) || (gBoard[i][j].isMarked) || (gBoard[i][j].isShown)) return
    if (gGame.hintMode) {
        gGame.isOn = false
        getHint(coord)
        document.querySelector('.hint-mode').innerHTML = '';
        return
    }
    if (gBoard[i][j].isMine) {
        gGame.lifeLeft--
        var strHTML = '';
        if (gGame.lifeLeft === 0) {
            document.querySelector('.left').innerHTML = '';
        } else {
            for (let i = 0; i < gGame.lifeLeft; i++) {
                strHTML += HEART
                document.querySelector('.left').innerHTML = strHTML;
            }
        }
        gBoard[i][j].isBombed = true;
        renderCell(coord, BOMBED)
        document.querySelector('.smiley').innerHTML = smiley.dead
        if (checkGameOver()) gameOver()
        return
    }
    document.querySelector('.smiley').innerHTML = smiley.happy
    gGame.shownCount++;
    elCell.classList.add('clicked')
    gBoard[i][j].isShown = true
    if (gGame.shownCount === 1) {
        setMines()
        setMinesNegsCount(gBoard)
    }
    if (gBoard[i][j].minesAroundCount === 0) openCellsAround(coord)
    renderCell(coord, gBoard[i][j].minesAroundCount)
    if (gGame.secsPassed === 0) startTime()
    if (checkGameOver()) gameOver()
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}