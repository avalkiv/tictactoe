var context;
var xBoard = [];
var oBoard = [];
var width, height; // width and height of Board
var winCombinations =  [['0 0', '1 0', '2 0'], ['0 1', '1 1', '2 1'], ['0 2', '1 2', '2 2'],
                        ['0 0', '0 1', '0 2'], ['1 0', '1 1', '1 2'], ['2 0', '2 1', '2 2'],
                        ['0 0', '1 1', '2 2'], ['2 0', '1 1', '0 2']]; // winning combinations

/**
 * Paint the Board for the game
 * |0 0|1 0|2 0|
 * |0 1|1 1|2 1|
 * |0 2|1 2|2 2|
 */
function  paintBoard() {
    var board = document.getElementById('canvas');

    width   = board.width;
    height  = board.height;
    context = board.getContext('2d');

    // Paint the board
    context.beginPath();
    context.strokeStyle = "#000";
    context.lineWidth = 3;

    context.moveTo((width / 3), 0);
    context.lineTo((width / 3), height);

    context.moveTo((width / 3) * 2, 0);
    context.lineTo((width / 3) * 2, height);

    context.moveTo(0, (height / 3));
    context.lineTo(width, (height / 3));

    context.moveTo(0, 2 * (height / 3));
    context.lineTo(width, 2 * (height / 3));

    context.stroke();
    context.closePath();
}

window.onload = function() {
    paintBoard();
};

/**
 *  Paint the X
 *  @param float
 *  @param float
 */
function paintX(x, y) {
    var pair = x + " " + y;

    if (xBoard.indexOf(pair) != -1 || oBoard.indexOf(pair) != -1) {
        return false;
    } else {
        context.beginPath();
        context.strokeStyle = '#FF0000';

        var offsetX = (width / 3) * 0.1;
        var offsetY = (height / 3) * 0.1;

        var beginX = x * (width / 3) + offsetX;
        var beginY = y * (height / 3) + offsetY;

        var endX = (x + 1) * (width / 3) - offsetX * 2;
        var endY = (y + 1) * (height / 3) - offsetY * 2;

        context.moveTo(beginX, beginY);
        context.lineTo(endX, endY);

        context.moveTo(beginX, endY);
        context.lineTo(endX, beginY);

        context.stroke();
        context.closePath();

        xBoard[xBoard.length] = pair;

        return true;
    }

}

/**
 * Paint the O
 * @param float
 * @param float
 */
function paintO(x, y) {
    var pair = x + " " + y;

    if ((xBoard.indexOf(pair) != -1) || (oBoard.indexOf(pair) != -1)) {
        return false;
    } else {
        context.beginPath();
        context.strokeStyle = '#0000FF';

        var offsetX = (width / 3) * 0.1;
        var offsetY = (height / 3) * 0.1;

        var beginX = x * (width / 3) + offsetX;
        var beginY = y * (height / 3) + offsetY;

        var endX = (x + 1) * (width / 3) - offsetX * 2;
        var endY = (y + 1) * (height / 3) - offsetY * 2;

        context.arc(beginX + ((endX - beginX) / 2), beginY + ((endY - beginY) / 2), (endX - beginX) / 2, 0, Math.PI * 2);

        context.stroke();
        context.closePath();
        oBoard[oBoard.length] = pair;

        return true;
    }
}

/**
 * Player move on the Board
 * @param event
 */
function movePlayer(e) {
    var x = Math.floor(e.clientX / (width / 3));
    var y = Math.floor(e.clientY / (height / 3));

    if(paintX(x, y)) {
        if(checkWins()) {
            restart();
        } else if(oBoard.length == 0) {
            setTimeout('firstMoveComputer()', 400);
        } else {
            setTimeout('moveComputer()', 400);
        }
    }
}

/**
 * Computer move on the Board
 */
function firstMoveComputer() {
    var x = Math.floor(Math.random() * 3);
    var y = Math.floor(Math.random() * 3);

    if(!paintO(x, y)) {
        firstMoveComputer();
    } else {
        if(checkWins()) {
            restart();
        }
    }
}

function checkWins() {
    for(var i = 0; i < winCombinations.length; i++) {
        a = winCombinations[i][0];
        b = winCombinations[i][1];
        c = winCombinations[i][2];

        if(xBoard.indexOf(a) != -1 && xBoard.indexOf(b) != -1 && xBoard.indexOf(c) != -1) {
            alert("Player win!");
            return true;
        } else if(oBoard.indexOf(a) != -1 && oBoard.indexOf(b) != -1 && oBoard.indexOf(c) != -1) {
            alert("Computer win!");
            return true;
        } else if (xBoard.length == 5) {
            alert("Nobody win!");
            return true;
        }
    }
}

function restart() {
    context.clearRect (0, 0, width , height);
    xBoard = [];
    oBoard = [];
    paintBoard();
}

function moveComputer() {

    /** Defense
     * |x|x|x|
     * | | | |
     * | | | |
     */
    if(xBoard.indexOf('0 0') !== -1 && xBoard.indexOf('1 0') !== -1) {
        paintO(2, 0);

        if(checkWins()) {
            restart();
        }
        return true;
    }
    if(xBoard.indexOf('0 0') !== -1 && xBoard.indexOf('2 0') !== -1) {
        paintO(1, 0);
        if(checkWins()) {
            restart();
        }
        return true;
    }
    if(xBoard.indexOf('1 0') !== -1 && xBoard.indexOf('2 0') !== -1) {
        paintO(0, 0);
        if(checkWins()) {
            restart();
        }
        return true;
    }

    /**
     * |x| | |
     * |x| | |
     * |x| | |
     */
    if(xBoard.indexOf('0 0') !== -1 && xBoard.indexOf('0 1') !== -1) {
        paintO(0, 2);
        if(checkWins()) {
            restart();
        }
        return true;
    }
    if(xBoard.indexOf('0 0') !== -1 && xBoard.indexOf('0 2') !== -1) {
        paintO(0, 1);
        if(checkWins()) {
            restart();
        }
        return true;
    }
    if(xBoard.indexOf('0 1') !== -1 && xBoard.indexOf('0 2') !== -1) {
        paintO(0, 0);
        if(checkWins()) {
            restart();
        }
        return true;
    }

    /**
     * |x| | |
     * | |x| |
     * | | |x|
     */
    if(xBoard.indexOf('0 0') !== -1 && xBoard.indexOf('1 1') !== -1) {
        paintO(2, 2);
        if(checkWins()) {
            restart();
        }
        return true;
    }
    if(xBoard.indexOf('0 0') !== -1 && xBoard.indexOf('2 2') !== -1) {
        paintO(1, 1);
        if(checkWins()) {
            restart();
        }
        return true;
    }
    if(xBoard.indexOf('1 1') !== -1 && xBoard.indexOf('2 2') !== -1) {
        paintO(0, 0);
        if(checkWins()) {
            restart();
        }
        return true;
    }

    /**
     * | | | |
     * |x|x|x|
     * | | | |
     */
    if(xBoard.indexOf('0 1') !== -1 && xBoard.indexOf('1 1') !== -1) {
        paintO(2, 1);
        if(checkWins()) {
            restart();
        }
        return true;
    }
    if(xBoard.indexOf('0 1') !== -1 && xBoard.indexOf('2 1') !== -1) {
        paintO(1, 1);
        if(checkWins()) {
            restart();
        }
        return true;
    }
    if(xBoard.indexOf('1 1') !== -1 && xBoard.indexOf('2 1') !== -1) {
        paintO(0, 1);
        if(checkWins()) {
            restart();
        }
        return true;
    }

    /**
     * | |x| |
     * | |x| |
     * | |x| |
     */
    if(xBoard.indexOf('1 0') !== -1 && xBoard.indexOf('1 1') !== -1) {
        paintO(1, 2);
        if(checkWins()) {
            restart();
        }
        return true;
    }
    if(xBoard.indexOf('1 0') !== -1 && xBoard.indexOf('1 2') !== -1) {
        paintO(1 ,1);
        if(checkWins()) {
            restart();
        }
        return true;
    }
    if(xBoard.indexOf('1 1') !== -1 && xBoard.indexOf('1 2') !== -1) {
        paintO(1, 0);
        if(checkWins()) {
            restart();
        }
        return true;
    }

    /**
     * | | |x|
     * | |x| |
     * |x| | |
     */
    if(xBoard.indexOf('2 0') !== -1 && xBoard.indexOf('1 1') !== -1) {
        paintO(0, 2);
        if(checkWins()) {
            restart();
        }
        return true;
    }
    if(xBoard.indexOf('2 0') !== -1 && xBoard.indexOf('0 2') !== -1) {
        paintO(1, 1);
        if(checkWins()) {
            restart();
        }
        return true;
    }
    if(xBoard.indexOf('1 1') !== -1 && xBoard.indexOf('0 2') !== -1) {
        paintO(2, 0);
        if(checkWins()) {
            restart();
        }
        return true;
    }

    /**
     * | | | |
     * | | | |
     * |x|x|x|
     */
    if(xBoard.indexOf('0 2') !== -1 && xBoard.indexOf('1 2') !== -1) {
        paintO(2, 2);
        if(checkWins()) {
            restart();
        }
        return true;
    }
    if(xBoard.indexOf('0 2') !== -1 && xBoard.indexOf('2 2') !== -1) {
        paintO(1, 2);
        if(checkWins()) {
            restart();
        }
        return true;
    }
    if(xBoard.indexOf('1 2') !== -1 && xBoard.indexOf('2 2') !== -1) {
        paintO(0, 2);
        if(checkWins()) {
            restart();
        }
        return true;
    }

    /**
     * | | |x|
     * | | |x|
     * | | |x|
     */
    if(xBoard.indexOf('2 0') !== -1 && xBoard.indexOf('2 1') !== -1) {
        paintO(2, 2);
        if(checkWins()) {
            restart();
        }
        return true;
    }
    if(xBoard.indexOf('2 0') !== -1 && xBoard.indexOf('2 2') !== -1) {
        paintO(2, 1);
        if(checkWins()) {
            restart();
        }
        return true;
    }
    if(xBoard.indexOf('2 1') !== -1 && xBoard.indexOf('2 2') !== -1) {
        paintO(2, 0);
        if(checkWins()) {
            restart();
        }
        return true;
    }
}