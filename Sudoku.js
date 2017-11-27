function Sudoku() {
    this.arr = [];
    this.result = [];
    this.getArr = false;
}

Sudoku.prototype = {
    constructor: Sudoku,
    init: function () {
        for (var i = 0; i < 9; i++) {
            this.arr[i] = [];
            for (var j = 0; j < 9; j++) {
                this.arr[i][j] = 0;
            }
        }
    },

    generateNum: function () {
        return Math.floor(Math.random() * 9 + 1);
    },

    generateIndex: function () {
        return Math.floor(Math.random() * 9);
    },

    fill: function (n) {
        var row = Math.floor(n / 9), col = n % 9;
        if (this.getArr) return;
        if (n == 81) {
            for (var i = 0; i < 9; i++) {
                this.result[i] = this.arr[i].slice(0);
            }
            console.log(this.result);
            this.getArr = true;
        } else {
            var newArr = [];
            for (var i = 1; i < 10; i++) {
                var data = this.generateNum();
                while (newArr.indexOf(data) != -1) {
                    data = this.generateNum();
                }
                newArr.push(data);
                this.arr[row][col] = data;
                if (this.gameCheck(n, data, this.arr).result) {
                    this.fill(n + 1);
                }
            }
            this.arr[row][col] = 0;
            console.log(this.arr);
        }
    },
    gameCheck: function (n, curData, puzzleArr) {
        var row = Math.floor(n / 9), col = n % 9;
        for (var t = 0; t < 9; t++) {
            if (t != col && puzzleArr[row][t] == curData) {
                return {
                    result: false,
                    row: row,
                    col: t
                };
            } else if (t != row && puzzleArr[t][col] == curData) {
                return {
                    result: false,
                    row: t,
                    col: col
                };
            }
        }
        var gongRow = Math.floor(row / 3) * 3;
        var gongCol = Math.floor(col / 3) * 3;
        var index = 3 * (row % 3) + col % 3;
        var times = 0;
        for (var i = gongRow; i < gongRow + 3; i++) {
            for (var j = gongCol; j < gongCol + 3; j++) {
                if (puzzleArr[i][j] === 0) continue;
                if ((times != index) && (puzzleArr[i][j] == curData)) {
                    return {
                        result: false,
                        row: i,
                        col: j
                    };
                }
                times++;
            }
        }
        return {
            result: true
        };
    },

    newSudoku: function () {
        console.log('qwe');
        this.init();
        this.fill(9);
        var newArr = this.result.slice(0);
        return newArr;
    },

    mackBlank: function (degree, puzzle) {
        var newPuzzle = [];
        for (var i = 0; i < 9; i++) {
            newPuzzle[i] = puzzle[i].slice(0);
        }

        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                var rate = Math.floor(this.generateIndex() / degree);
                newPuzzle[i][j] = rate ? 0 : newPuzzle[i][j];
            }
        }
        var newArr = newPuzzle.slice(0);
        return newArr;
    },

};

var sudoku = new Sudoku();
sudoku.newSudoku();


