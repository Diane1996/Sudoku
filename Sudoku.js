
var arr = [], result = [];
for(var i = 0; i < 9; i++) {
	arr[i] = [];
	for(var j = 0; j < 9; j++) {
		arr[i][j] = 0;
	}
}

var generateNum = function () {
	return Math.floor(Math.random() * 9 + 1);
};

var generateIndex = function () {
	return Math.floor(Math.random() * 9);	
};

var init = function () {
	for(var i = 0; i < 9; i ++) {
		arr[0][i] = i + 1;
	}
	for(var k = 0; k < 9; k++) {
		var i = generateIndex();
		var j = generateIndex();
		var t = arr[0][i]
		arr[0][i] = arr[0][j];
		arr[0][j] = t;
	}
};

var getArr = false;
var fill = function(n) {
	var row = Math.floor(n / 9), col = n % 9;	

	if(getArr) return;
	if (n == 81) {
		for(var i = 0; i < 9; i++) {
			result[i] = [];
			for(var j = 0; j < 9; j++) {
				result[i][j] = arr[i][j];
			}
		}
		console.log(result);
		getArr = true;
	} else {
		var newArr = [];
		for (var i = 1; i < 10; i++) {
			var data = generateNum();
			while(newArr.indexOf(data) != -1) {
				data = generateNum();
			}
			newArr.push(data);
			arr[row][col] = data;
			if(gameCheck(n, data, arr).result) {
				fill(n + 1);
			}
		}
		arr[row][col] = 0;
	}
};

var gameCheck = function(n, curData, blankArr) {
	var row = Math.floor(n / 9), col = n % 9;
	var t;
	for(t = 0; t < 9; t++) {
		if (t != col && blankArr[row][t] == curData) {
			return {
				result:false,
				row: row,
				col: t
			};
		} else if(t != row && blankArr[t][col] == curData) {
			return {
				result:false,
				row: t,
				col: col
			};
		}
	}

	var gongRow = Math.floor(row / 3) * 3;
	var gongCol = Math.floor(col / 3) * 3;
	var index = 3*(row % 3) + col % 3;
	var i, j, times = 0;
	for (i = gongRow; i < gongRow + 3; i++) {
		for(j = gongCol; j < gongCol + 3; j++) {
			if(blankArr[i][j] === 0) continue;
			if((times != index) && (blankArr[i][j] == curData)) {
				return {
					result:false,
					row: i,
					col: j
				};
			}
			times++;
		}
	}
	return {
		result:true,
		row: row,
		col: col
	};
};

var newSudoku = function () {
	init();
	fill(9);
	return result;
};

var mackBlank = function (degree, result) {
	var blankArr = [];
	for(var i = 0; i < 9; i++) {
		blankArr[i] = [];
		for(var j = 0; j < 9; j++) {
			blankArr[i][j] = result[i][j];
		}
	}
	for(var i = 0; i < 9; i ++) {
		var newArr = [];
		for(var j = 0; j < degree; j++) {
			var index = generateIndex();
			while(newArr.indexOf(index) != -1) {
				index = generateIndex();
			}
			newArr.push(index);
			blankArr[i][index] = 0;	
		}
	}
	return blankArr;
};

newSudoku();
