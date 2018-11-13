const gridArray = [];

$('.row').each(function (rowIndex, rowElement) {
    gridArray[rowIndex] = [];
    $(rowElement).children().each(function (cellIndex, cellElement) {
        gridArray[rowIndex].push($(cellElement));
    })
});
console.log(gridArray[0][1].text());
$(document).ready(function () {

    initializeTheGame();

    $('a.restart-button').click(function () {
        restartGame();
    });
});

function initializeTheGame() {
    addTile();
    addTile();
}

function restartGame() {
    $('div.cell').attr('class', 'cell');
    $('div.cell').text('');
    $('.game-over').hide();
    initializeTheGame();
}

function addTile() {
    const existEmptySpace = $('.cell:not([class*="tile"])').length > 1;

    if (!existEmptySpace) {
        $('.game-over').show();
        return;
    }
    let bool = '';
    const randomElement = getRandomElement();

    if (!$(randomElement).is('.cell:not([class*="tile"])')) {
        addTile();
    } else {
        const randomTileValue = getRandomTileValue();
        $(randomElement).addClass('tile-' + randomTileValue);
        $(randomElement).text(randomTileValue);
    }
};

function getRandomTileValue() {
    const randomNumber = getRandomNumber(10);

    if (randomNumber < 9) {
        return 2;
    } else {
        return 4;
    }
}

function getRandomNumber(maxValue) {
    const randomNumber = Math.random() * maxValue;
    const roundedDownNumber = Math.floor(randomNumber);

    return roundedDownNumber;
}

function getRandomElement() {
    const randomPosition = getRandomNumber(16);
    return $('.cell')[randomPosition];
}




document.onkeydown = function (e) {
    let getGameOverVisibility = $('.game-over').is(":hidden");
    if (getGameOverVisibility) {
        switch (e.keyCode) {
            case 37:
                goLeft();
                break;
            case 38:
                goUp();
                break;
            case 39:
                goRight();
                break;
            case 40:
                goDown();
                break;
        }
    }
};


function goDownTrimEmptyCells() {
    let elementMoved = false;
    for (let x = 3; x > 0; x--) {
        for (let y = 0; y < 4; y++) {
            const currentElement = gridArray[x][y];
            const nextElement = gridArray[x - 1][y];

            const currentElementValue = currentElement.text();
            const nextElementValue = nextElement.text();
            if (currentElementValue == '') {
                if (nextElementValue > 0) {
                    currentElement.text(nextElementValue);
                    $(currentElement).addClass('tile-' + nextElementValue);
                    nextElement.text('');
                    nextElement.removeClass('tile-' + nextElementValue);
                    elementMoved = true;
                }
            }
        }
    }
    if (elementMoved) {
        goDownTrimEmptyCells();
    }
}

function goDown() {
    let elementMovedDown = false;

    goDownTrimEmptyCells();

    for (let x = 3; x > 0; x--) {
        for (let y = 0; y < 4; y++) {
            const currentElement = gridArray[x][y];
            const nextElement = gridArray[x - 1][y];

            const currentElementValue = currentElement.text();
            const nextElementValue = nextElement.text();

            if (currentElementValue > 0) {
                if (nextElementValue > 0) {
                    if (currentElementValue === nextElementValue) {
                        console.log('tile1 = tile2');
                        currentElement.text('');
                        $(currentElement).removeClass('tile-' + currentElementValue);
                        $(nextElement).removeClass('tile-' + nextElementValue);
                        const newValue = parseInt(currentElementValue) + parseInt(nextElementValue);
                        nextElement.text(newValue);
                        nextElement.addClass('tile-' + newValue);
                        elementMovedDown = true;
                    } else {
                        console.log('tile1 != tile2');
                        // do nothing
                    }
                } else {
                    console.log('tile2 == 0');
                }
            } else {
                console.log('tile1 == 0');
                // do nothing
                if (nextElementValue > 0) {
                    elementMovedDown = true;
                }
            }
        }
    }

    goDownTrimEmptyCells();

    if (elementMovedDown) {
        addTile();
    }
}

function commonTrimEmptyCode(currentElement, nextElement) {
    const currentElementValue = currentElement.text();
    const nextElementValue = nextElement.text();
    if (currentElementValue == '') {
        if (nextElementValue > 0) {
            currentElement.text(nextElementValue);
            $(currentElement).addClass('tile-' + nextElementValue);
            nextElement.text('');
            nextElement.removeClass('tile-' + nextElementValue);
            elementMoved = true;
        }
    }
}

function goUpTrimEmptyCells() {
    let elementMoved = false;
    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 4; y++) {
            const currentElement = gridArray[x][y];
            const nextElement = gridArray[x + 1][y];

            commonTrimEmptyCode(currentElement, nextElement);
        }
    }
    if (elementMoved) {
        goUpTrimEmptyCells();
    }
}

function goUp() {
    let elementMovedUp = false;

    goUpTrimEmptyCells();

    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 4; y++) {
            const currentElement = gridArray[x][y];
            const nextElement = gridArray[x + 1][y];

            const currentElementValue = currentElement.text();
            const nextElementValue = nextElement.text();

            if (currentElementValue > 0) {
                if (nextElementValue > 0) {
                    if (currentElementValue === nextElementValue) {
                        console.log('tile1 = tile2');
                        currentElement.text('');
                        $(currentElement).removeClass('tile-' + currentElementValue);
                        $(nextElement).removeClass('tile-' + nextElementValue);
                        const newValue = parseInt(currentElementValue) + parseInt(nextElementValue);
                        nextElement.text(newValue);
                        nextElement.addClass('tile-' + newValue);
                        elementMovedUp = true;
                    } else {
                        console.log('tile1 != tile2');
                        // do nothing
                    }
                } else {
                    console.log('tile2 == 0');
                }
            } else {
                console.log('tile1 == 0');
                // do nothing
                if (nextElementValue > 0) {
                    elementMovedUp = true;
                }
            }
        }
    }

    goUpTrimEmptyCells();

    if (elementMovedUp) {
        addTile();
    }
}

function goRightTrimEmptyCells() {
    let elementMoved = false;
    for (let x = 0; x < 4; x++) {
        for (let y = 3; y > 0; y--) {
            const currentElement = gridArray[x][y];
            const nextElement = gridArray[x][y - 1];

            commonTrimEmptyCode(currentElement, nextElement);
        }
    }
    if (elementMoved) {
        goRightTrimEmptyCells();
    }
}

function goRight() {
    let elementMovedRight = false;
    goRightTrimEmptyCells();
    for (let x = 0; x < 4; x++) {
        for (let y = 3; y > 0; y--) {
            const currentElement = gridArray[x][y];
            const nextElement = gridArray[x][y - 1];

            const currentElementValue = currentElement.text();
            const nextElementValue = nextElement.text();

            if (currentElementValue > 0) {
                if (nextElementValue > 0) {
                    if (currentElementValue === nextElementValue) {
                        console.log('tile1 = tile2');
                        currentElement.text('');
                        $(currentElement).removeClass('tile-' + currentElementValue);
                        $(nextElement).removeClass('tile-' + nextElementValue);
                        const newValue = parseInt(currentElementValue) + parseInt(nextElementValue);
                        nextElement.text(newValue);
                        nextElement.addClass('tile-' + newValue);
                        elementMovedRight = true;

                    } else {
                        console.log('tile1 != tile2');
                        // do nothing
                    }
                } else {
                    console.log('tile2 == 0');
                }
            } else {
                console.log('tile1 == 0');
                // do nothing
                if (nextElementValue > 0) {
                    elementMovedRight = true;
                }
            }
        }
    }
    goRightTrimEmptyCells();
    if (elementMovedRight) {
        addTile();
    }
}

function goLeftTrimEmptyCells() {
    let elementMoved = false;
    for (let x = 0; x < 4; x++) {
        for (let y = 0; y < 3; y++) {
            const currentElement = gridArray[x][y];
            const nextElement = gridArray[x][y + 1];
            console.log('x',x,'y',y,'curent',currentElement.text());
            console.log('x',x,'y',y+1,'next',nextElement.text());

            commonTrimEmptyCode(currentElement, nextElement);
        }
    }
    if (elementMoved) {
        goLeftTrimEmptyCells();
    }
}

function goLeft() {
    let elementMovedLeft = false;
    goLeftTrimEmptyCells();
    for (let x = 0; x < 4; x++) {
        for (let y = 0; y < 3; y++) {
            const currentElement = gridArray[x][y];
            const nextElement = gridArray[x][y + 1];

            const currentElementValue = currentElement.text();
            const nextElementValue = nextElement.text();

            if (currentElementValue > 0 && nextElementValue > 0 && currentElementValue === nextElementValue) {
                        console.log('tile1 = tile2');
                        currentElement.text('');
                        $(currentElement).removeClass('tile-' + currentElementValue);
                        $(nextElement).removeClass('tile-' + nextElementValue);
                        const newValue = parseInt(currentElementValue) + parseInt(nextElementValue);
                        nextElement.text(newValue);
                        nextElement.addClass('tile-' + newValue);
                        elementMovedLeft = true;               
            }
            if (!(currentElementValue > 0) && nextElementValue > 0) {
                elementMovedLeft = true;
            }
        }
    }
    goLeftTrimEmptyCells();
    if (elementMovedLeft) {
        addTile();
    }
}