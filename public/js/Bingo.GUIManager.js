/**
 * This manager handles the creation, update and destruction of game elements.
 */

var Bingo = {};
Bingo.GUIManager = (function () {
	
	//Board properties
	var cellHeight;
	var minCellHeight;
	var maxCellHeight;
	var cellWidth;
	var minCellWidth;
	var maxCellWidth;
	var tableHeight;
	var minTableHeight;
	var maxTableHeight;
	var tableWidth;
	var minTableWidth;
	var maxTableWidth;
	var boardCells = [];	//maps cells to their IDs, value, style, sounds?
	var numberList = {};	//map of numbers and whether they have been called or not
	//ex: numberList[0] returns cell.isSelected: true, cell.className: selected
	
	var getCellID;
	
	//returns the cell and its properties based on its ID
	var getCellByID = function(ID) {
	
	};
	
	//returns the list of cells with their properties
	var getCellList;
	
	//creates table with cells and appends table to page
	var createBoard;
	
	//animates the board onto the screen
	var drawBoard;
	
	var setCellHeight = function () {
		var height = $(window).height();
		cellWidth = $('#bingoBoard td').css('width');
		$('#bingoBoard td').css('height', height/8);
	};
	//Adds properties to cells then adds cells to cell array
	var setBoard = function () {
		//resetUsedNums();	
		//get the table's child cells
		var board = document.getElementById('bingoBoard');
		var cell = board.getElementsByTagName('td');
		var cellID = 0;		//assigns a numeric identifer to cells when initializing board
		//for each table cell
		for (var i = 0; i < cell.length; i++) {
			//if it is the middle cell, set special properties
			if (i == 12) {
				boardCells[i] = cell[i];
				boardCells[i].iD = cellID;
				boardCells[12].innerHTML = "Free";
				boardCells[12].isSelected = true;
				boardCells[12].className = "default selected";
			} else {
				boardCells[i] = cell[i];	//add cell to array,
				boardCells[i].iD = cellID; // set the cell's ID for computing its bit value
				boardCells[i].isSelected = false;	
				boardCells[i].className = "default"; //set the cell's style
				setSquare(i);	//set the cell's numeric value
			}
			cellID++;	//increment the cellID
		}
	};
	
		
	//assigns a random bingo number to each square.  helper function for setBoard
	var setSquare = function(square) {
		var newNum;	//randomly generated number to assign to cell's value
		//the numbers 0-4 correspond to each row.  0: B column 1-15, 1: I 16-30, 2: N 31-45, 3: G 46-60, 4: O 61-75.
		var colPlace = [0,1,2,3,4,0,1,2,3,4,0,1,2,3,4,0,1,2,3,4,0,1,2,3,4]; 
		
		var colBasis = colPlace[square] * 15;

		do {
			newNum = colBasis + (Math.floor(Math.random()*15 + 1));
		} while (isUsedNum[newNum]);	//if there is a value at index newNum we will keep looking until the value is false (no number)
		isUsedNum[newNum] = true;	//when a unique number is found we mark it's index true
		boardCells[square].innerHTML = newNum;
		boardCells[square].number = newNum;
	}
	
	//An array of 76 boolean values so we can use the indices 1-75 which correspond to the numbers drawn 
	//for setting the squares
	var isUsedNum = [];	
	
	//to reuse the numbers again for setting the board
	var resetUsedCellNums = function () {
		for(var i = 1; i <= 75; i++){
			isUsedNum[i] = false;	
		}
	};
	
	var drawNumberList;
	
	var setNumberList = function () {
		var board = document.getElementById('calledNumbers');
		var indicator = 1;	
		//create 5 rows
		for (var i = 1; i <= 15; i++) {
			var row = document.createElement('tr');
			board.appendChild(row);
			//for each create 5 table cells with their corresponding number
			for (var j = 0; j < 5; j++) {
				var cell = document.createElement('td');
				//console.log(i);
				row.appendChild(cell);
				//the cell to the right equals 15 times the column number + the value
				//of the cell to the left
				cell.innerHTML = i + 15 * j;
				cell.isSelected = false;	//manages what numbers are available to draw
				cell.className = "defaultList";
				numberList[i + 15 * j] = cell; 
				indicator++;
				
			}
			
		}
		//for testing
		//numberList[4].className = "selected";
		//numberList[75].className = "selected";
	};
	
	//puts all of the numbers back into the basket
	var resetNumberList = function () {
		for(var i in numberList) {
			numberList[i].isSelected = false;
			numberList[i].className = "defaultList";	
		}
	};
	
	//create, set and draw the board
	var init = function () {
		setBoard();
		setNumberList();
		//setCellHeight();
		console.log($('#bingoBoard td').css('width'));
	};
	
	var cleanup = function () {
		resetUsedCellNums();
		resetNumberList();
	};
	
	return {
	
		setBoard: setBoard,
		boardCells: boardCells,
		numberList: numberList,
		resetUsedCellNums: resetUsedCellNums, 
		resetNumberList: resetNumberList,
		setCellHeight: setCellHeight,
		init: init,
		cleanup: cleanup
	}

})();

Bingo.GUIManager.init();
