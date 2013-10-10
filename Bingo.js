/**
* A bingo game that generates a 5 x 5 card with random values 1-15 in the B column
* 16-30 in the I column, 31-45 in the N column, 46-60 in th G column, and 61-75 in the O column.
* The game will display random values from the card giving the column letter and a value
* and the user must select the corresponding square. To win the game a player must have 
* 5 selected squares in a row going horizontally, vertically, or diagonally. 
*
*/

var Bingo = {};

Bingo.board =(function () {

	/**
	*	Map of Board and Winning states:
	*
	* 17039425							1114384
	*   \								  /
	*	 B		 I		 N		 G		 O	
	*
	*    1   |   2   |   4   |   8   |   16		= 31
	* -------|-------|-------|-------|--------			
	*   32   |   64  |  128  |  256  |  512		= 992
	* -------|-------|-------|-------|--------
	*  1024  |  2048 |   0   |  8192 | 16384	= 27648
	* -------|-------|-------|-------|--------
	* 32768  | 65536 | 131072| 262144| 524288	= 1015808
	* -------|-------|-------|-------|--------
	* 1048576|2097152|4194304|8388608|16777216	= 32505856
	* ========================================
	* 1082401 2164802 4325508 8659208 17318416
	*
	*/
	
	var squares = [];	//table cells stored in an array so we don't have to use getElementById
	
	// marks the square as selected 
	
	var set = function () {
		this.className = 'pickedBG';
		console.log(Math.pow(2, this.indicator));
		//check if unclicked, correctness will be validated on checkWin
		
			
			this.style.backgroundImage="url('../img/icons/circle-128.png)";
			this.style.backgroundRepeat = 'no-repeat';
			this.style.backgroundPosition = 'center';
			this.style.backgroundSize = 'cover';
			
		
	};
	

	/*
	* Creates an HTML table for the board and assigns indicators to 
	* each cell and starts a new game?  See about making 9int
	*/
	var makeBoard = function (numRows, numColumns) {
		
		var board = $('#bingoBoard'), //make a table element
			indicator = 0,	//adds a property to the cells in order to calculate the bit value without looping?
			row,
			cell;
		
		for (var i = 0; i < numRows; i++) {
			row = document.createElement('tr');	//append the rows to the table
			board.append(row);
			for (var j = 0; j < numColumns; j++) {
				cell = document.createElement('td');
				cell.indicator = indicator;
				cell.className = "tableData";
				//cell.onclick = set;	//Attach the click event handler to each cell  maybe the event handlers can be grouped separately
				row.appendChild(cell);	//append the cells to the rows 
				squares[indicator] = cell;	//Adds the cells to the squares array
				indicator++;
			}
		}
		
		console.log('board created');
		
	};
	
	//An array initialzed 76 so we can use the indices 1-75 which correspond to the numbers drawn 
	//for setting the squares
	var isUsedNum = [];	
	
	//to reuse the numbers again for setting the board
	var resetUsedNums = function () {
		for(var i = 1; i <= 75; i++){
			isUsedNum[i] = false;	
		}
	};
	

	
	//helper function for setBoard
	var setSquare = function (square) {
		resetUsedNums()
		var newNum,
	
		//the numbers 0-4 correspond to each row.  0: B column 1-15, 1: I 16-30, 2: N 31-45, 3: G 46-60, 4: O 61-75.
		colPlace = [0,1,2,3,4,0,1,2,3,4,0,1,2,3,4,0,1,2,3,4,0,1,2,3,4], 
		colBasis = colPlace[square] * 15;
			
		do {
			newNum = colBasis + (Math.floor(Math.random()*15 + 1));
		} while (isUsedNum[newNum]);	//if there is a value at index newNum we will keep looking until the value is false (no number)
		isUsedNum[newNum] = true;	//when a unique number is found we mark it's index true
		//add properties to squares
		Bingo.board.squares[square].innerHTML = newNum;
		Bingo.board.squares[square].number = newNum;
		squares[square].className = "";
		
		
		//Bingo.board.squares[square].letter = getLetter(newNum);
		Bingo.board.squares[square].selected = false;//ensures that a selected square has been drawn
	};
	
	
	var setBoard = function () {
		resetUsedNums();
		
		for (var i = 0; i < 25; i++) {
			if (i === 12) {
				Bingo.board.squares[12].number = 0;
				Bingo.board.squares[12].innerHTML = "Free";
				Bingo.board.squares[12].id = "free";
				Bingo.board.squares[12].isSelected = true;
				
			} 
			else {
				setSquare(i);
				//console.log(Bingo.board.squares[i].number);
			}
		}
	}
	
	var initBoard = function () {
		makeBoard(5, 5);
		//resetUsedNums();
		//setBoard();
		//disable clicking on the board
	}
	
	return {
		makeBoard: makeBoard,
		setBoard: setBoard,
		initBoard: initBoard,
		squares: squares,
		resetUsedNums: resetUsedNums
	}

})();
/******************************************************************************

******************************************************************************/

Bingo.game = (function () {

	//the bit value of the set square
	var score = 0;	
	
	//The sums of bit values for different winning states
	var wins = [31,992,27648,1015808,32505856,1082401,2164802,4325508,8659208,17318416,17039425,1114384];
	
	var getLetter =  function (i) {
		var letter;
		if (i > 60) {
			letter = "O";
		} else if (i > 45) {
			letter = "G";
		} else if (i > 30) {
			letter = "N";
		} else if (i > 15) {
			letter = "I";
		} else {
			letter = "B";
		}
		return letter;
	};
	
	//Array of boole values to use from 1-75
	var isUsedPick = [];
		
	//this goes into an infinite loop if all the numbers have been drawn but the player hasn't won the game
	var getNumber = function () {
		var randomNum;
		
		do {
			randomNum = Math.floor(Math.random() * 75 + 1);	
		} 
		//look in the "basket" of available numbers (marked unpicked)  
		while (isUsedPick[randomNum]);
		isUsedPick[randomNum] = true;
		return randomNum;
		
	};
	
	//Boole value to check if all numbers have been used
	var hasDrawnAllNumbers = false;
	
	//picks the random numbers;
	var draw;
	
	var setMessage = function (string){
		$('.message').text(string);
	};
	var counter = 0;
	//This should be generic so it can be used for other games
	var drawNumber = function () {
		//if (numPicks === Bingo.board.squares.length) {	
		if (counter == 75) {
			hasDrawnAllNumbers = true;
		}
		
		if (!hasDrawnAllNumbers) {
			//start = 5;	//reset clock start
			num = getNumber();
			setMessage(getLetter(num) + num);
			counter++
			console.log(num);
			//startClock();
			//numPicks++;
		}
		else {
			clearInterval(draw);
			setMessage("No More Numbers");
			console.log(counter);
			
		}
	};
	
	var repeatDraw = function () {
		draw = setInterval(function(){ drawNumber() }, 5000);
	};
		
	
	//initializes the board with values
	var startNewGame = function () {
		//initialize these values so the game recalculates properly
		score = 0;
		counter = 0;
		hasDrawnAllNumbers = false;
		//clear bingo chips
		//TODO enable clicking on the board
		
		
		//Bingo.board.initBoard();
		//so we can reuse the numbers to draw from
		for(var i = 1; i <= 75; i++){
			isUsedPick[i] = false;	
		}
		Bingo.board.setBoard();
		drawNumber();
		repeatDraw();
	};
	
	
	//players score based on the squares selected must equal one of the winning scores
	var isWin = function () {
		for (var i = 0; i < wins.length; i++) {
			//must have single '&' to perform binary arithmetic, not sure how this works
			if ((wins[i] & score) === wins[i]) {	
				return true
			}
		}
		return false;
	};
	
	var getScore = function () {
		for (var i = 0; i < 25; i++) {
			if ((Bingo.board.squares[i].className === "pickedBG") && (isUsedPick[Bingo.board.squares[i].number])){
			console.log('score: ' + Math.pow(2, Bingo.board.squares[i].indicator));
			score += Math.pow(2, Bingo.board.squares[i].indicator);
			}
		} 
	};
	

	//checks if the selected numbers have been drawn and add up to a winning score
	var checkWin = function () {
		getScore();
		if (isWin()) {
			clearInterval(draw);
			setMessage("You win!");
			console.log("You win");
		} else {
			clearInterval(draw);
			setMessage("Not a winner.");
			console.log("Not a winner");
			repeatDraw();
		}
	};
	
	return {
		startNewGame: startNewGame,
		getNumber: getNumber,
		getLetter: getLetter,
		getScore: getScore,
		checkWin: checkWin,
		draw: draw,
		hasDrawnAllNumbers: hasDrawnAllNumbers,
		setMessage: setMessage
	}	
	
})();  

/******************************************************************************

******************************************************************************/

Bingo.events = (function () {	
	
	var boardListener = function () {
		//for (var i = 0; i < Bingo.board.squares.length; i++) {
			$('td').on('click', function () {
				$(this).toggleClass("pickedBG");
				//console.log(this.className);
				console.log(Math.pow(2, this.indicator));
				//set score
				//set 
			});
		//}
		
	};
	
	//initializing a new game
	var btnBingoListener = function () {
		$('#btnStartBingo').on('click', function () {
			// clearInterval(Bingo.game.draw);
			Bingo.game.startNewGame();
			console.log('game started');
			//btnReloadListener(Bingo.game); 
		});
	};
	
	//needs to be generic to work for any bingo game
	var btnCheckListener = function () {
		$('#checkBingo').on('click', function () {
			Bingo.game.checkWin();
			console.log('check for win');
		});
	};
		
	//starting a new game after initialization, this should clear the board and start a new game
	var btnReloadListener = function (game) {
		$('#reload').on('click', function () {
			clearInterval(game.draw);
			//clearInterval(clock);
			game.startNewGame();
		});
	};
	
	var init = function () {
		btnBingoListener();
		btnCheckListener();
		boardListener();
	}
		
	return {
		init: init
		}
	
})();

Bingo.board.initBoard();
Bingo.events.init();	     
