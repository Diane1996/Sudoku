window.onload = function () {
    var degree = 4;
    var blankArr;
    var newBlankArr = [];
    var numKey = 0, timer, curIndex;
    var outer = document.getElementsByClassName('outer')[0];
    var wrapper = document.getElementsByClassName('wrapper')[0];

    var easy = document.getElementsByClassName('easy')[0];
    var normal = document.getElementsByClassName('normal')[0];
    var difficult = document.getElementsByClassName('difficult')[0];

    var newGame = document.getElementsByClassName('newGame')[0];
    var reset = document.getElementsByClassName('reset')[0];
    var cancel = document.getElementsByClassName('cancel')[0];
    var mark = document.getElementsByClassName('mark')[0];

    var liList = wrapper.getElementsByTagName("li");
    var number = document.getElementsByClassName('number');
    var floatKey = document.getElementsByClassName('floatKey')[0];

    easy.onclick = function() {
        degree = 3;
        clearBoard();
    };

    normal.onclick = function() {
        degree = 4;
        clearBoard();
    };

    difficult.onclick = function() {
        degree = 5;
        clearBoard();
    };

    var clearBoard = function () {
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                liList[i * 9 + j].className = '';
                liList[i * 9 + j].innerHTML = '';
            }
        }

    };

    var newBoard = function () {
        for (var i = 0; i < 9; i++) {
            var ul = document.createElement("ul");
            if (i === 2 || i === 5) {
                ul.style.borderBottom = '2px solid #000';
            }
            wrapper.appendChild(ul);
            for (var j = 0; j < 9; j++) {
                var liItem = document.createElement('li');
                if (j === 2 || j === 5) {
                    liItem.style.borderRight = '2px solid #000';
                }
                ul.appendChild(liItem);
            }
        }


    };

    var fillBoard = function () {
        for (var i = 0; i < 9; i++) {
            newBlankArr[i] = [];
            for (var j = 0; j < 9; j++) {
                newBlankArr[i][j] = blankArr[i][j];
                liList[i * 9 + j].className = '';
                liList[i * 9 + j].innerHTML = blankArr[i][j];
                if (liList[i * 9 + j].innerHTML == 0) {
                    liList[i * 9 + j].innerHTML = '';
                } else {
                    liList[i * 9 + j].className = 'origin';
                }
            }
        }
    };

    var inputKey = function () {
        for (var i = 0; i < liList.length; i++) {
            var index;
            liList[i].index = i;
            newGame.onclick = newGameFun;
            reset.onclick = resetFun;
            liList[i].onclick = function () {
                if (liList[this.index].className !== 'origin') {
                    index = this.index;
                    var row = Math.floor(index / 9), col = index % 9;

                    if (numKey != 0) {
                        var data = gameCheck(index, numKey, newBlankArr);
                        if (data.result) {
                            liList[index].innerHTML = numKey;
                            newBlankArr[row][col] = numKey;
                            console.log(newBlankArr);
                            if (isGameover()) {
                                alert('你赢了！');
                            }
                        } else {
                            var clashIndex = 9 * data.row + data.col;
                            if (clashIndex !== index) {
                                clearTimeout(timer);
                                liList[clashIndex].classList.add('pulse');
                                timer = setTimeout(function () {
                                    liList[clashIndex].classList.remove('pulse');
                                }, 500);
                            }
                        }
                    }

                    cancel.onclick = function () {
                        cancelFun(index);
                    };

                    for (var j = 0; j < liList.length; j++) {
                        liList[j].classList.remove('select');
                    }

                    mark.onclick = function () {
                        markFun(index);
                    };

                    liList[index].classList.add('select');
                    window.document.onkeydown = function (e) {
                        keydownFun(e, index);
                    }
                }
            }
        }
    };

    var isGameover = function () {
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                if (newBlankArr[i][j] == 0) {
                    return false;
                }
            }
        }
        return true;
    };

    var newGameFun = function () {
        blankArr = mackBlank(degree);
        fillBoard();
    };

    var resetFun = function () {
        fillBoard();
    };

    var cancelFun = function (index) {
        var row = Math.floor(index / 9), col = index % 9;
        liList[index].innerHTML = '';
        blankArr[row][col] = 0;
        newBlankArr[row][col] = 0;
    };

    var markFun = function (index) {
        var color = liList[index].style.color;
        if (color === 'red') {
            liList[index].style.color = '#000';
        } else {
            liList[index].style.color = 'red';
        }
    };

    var keydownFun = function (e, index) {
        if (e.keyCode > 48 && e.keyCode < 58) {
            var row = Math.floor(index / 9), col = index % 9;
            var key = String.fromCharCode(e.keyCode);
            var data = gameCheck(index, key, newBlankArr);
            if (data.result) {
                liList[index].innerHTML = key;
                newBlankArr[row][col] = key;
                console.log(newBlankArr);
                if (isGameover()) {
                    alert('你赢了！');
                }
            } else {
                var clashIndex = 9 * data.row + data.col;
                if (clashIndex !== index) {
                    clearTimeout(timer);
                    liList[clashIndex].classList.add('pulse');
                    timer = setTimeout(function () {
                        liList[clashIndex].classList.remove('pulse');
                    }, 500);
                }
            }
        }
    };

    var numBoardFun = function () {
        for (var i = 0; i < 9; i++) {
            number[i].index = i;
            number[i].onclick = function (ev) {
                var floatHTML = floatKey.innerHTML;
                var floatDisplay = floatKey.style.display;
                var numHTML = number[this.index].innerHTML;
                if (floatHTML === numHTML && floatDisplay === 'block') {
                    numKey = 0;
                    floatKey.style.display = 'none';
                } else {
                    numKey = numHTML;
                    floatKey.style.display = 'block';
                    floatKey.innerHTML = numHTML;
                    document.onmousemove = function (ev) {
                        mouseMove(ev, floatKey);
                        // numBoardFun();
                    }
                }
            }
        }

    };

    var mousePosition= function (ev) {
        if (ev.pageX || ev.pageY) {
            return {x: ev.pageX + 1, y: ev.pageY + 1}
        }

        return {
            x: ev.clientX + document.body.scrollLeft - document.body.clientLeft + 1,
            y: ev.clientY + document.body.scrollTop - document.body.clientTop + 1
        }
    }

    var mouseMove = function (ev, floadKey) {
        ev = ev || window.event;
        var mousePos = mousePosition(ev);
        floadKey.style.left = mousePos.x + 'px';
        floadKey.style.top = mousePos.y + 'px';
    }

    newBoard();
    inputKey();
    numBoardFun();


};