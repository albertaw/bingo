/**********************************************************
 * GAME STATE MANAGER
 * Defines game loop and rules for gameplay, switching
 * screnes, and othe game states.
 *********************************************************/

 Bingo.GameStateManager = (function () {
 
	var currentState;
	var draw;	//interval ID
	var millisecondsPerFrame = 2 * 1000;
	var counter = 0;	//manages the number draws
	var hasDrawnAllNumbers = false;
	var isUsedPick = [];	//Array of boole values to use from 1-75
	var score;	//the sum of the bit values of the set squares
	//The sums of bit values for different winning states
	var wins = [31,992,27648,1015808,32505856,1082401,2164802,4325508,8659208,17318416,17039425,1114384];
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
	
	var changeState = function (gameState) {
		switch (gameState) {
			case "onStart": 
				handleStart();
				break;
			case "onEnd": 
				handleEnd();
				break;
			case "onPause": 
				handlePause();
				break;
			case "onResume":
				handleResume();
				break;
			case "onWin":
				handleWin();
				break;
			case "onLose":
				handleLose();
					break;
		//on quit?
		}
	};
	
	
	
	//at the initialization of the game
	var handleStart = function () {
		currentState = "onStart";
		//initialize all values
		counter = 0;
		//hasDrawnAllNumbers = false;
		resetIsUsedPick();
		Bingo.GUIManager.resetNumberList();
		update();	//to update the screen without the timer delay
		drawNumber();
	};
	
	//when checking for win
	var handlePause = function () {
		currentState = "onPause";
	};
	
	//restarting during the game, after checking for win and a losing state
	var handleResume = function () {
		currentState = "onResume";
		drawNumber();
	};
	
	//after a win 
	var handleWin = function () {
		if (currentState == "onEnd") {
			display("Game Over");	//do not allow player to call bingo when game has ended
		} else if (currentState == "startingState") {	//just for consistency, it should be impossible to have a win when no numbers have been called
			display("Press start.");
		} else {
			currentState = "onWin";
			display("You win!");
			//animate winning cells green
			//go to ending state
		}
	};
	
	//after checking for win and a losing state
	var handleLose = function () {
		if (currentState == "onEnd") {
			display("Game Over");	//do not allow player to call bingo when game has ended
		} else if (currentState == "startingState") {
			display("Press start.");
		} else {
			//currentState = "onLose";
			display("Not a win.");
		//animate selected cells red
		//go to resume state?
			changeState("onResume");
		}
	};
	
	//after drawing all numbers, after a win?
	var handleEnd = function () {
		currentState = "onEnd";
		display("No More Numbers");
		clearInterval(draw);
		
	};
	
	var display = function (text) {
		$('#calledNumber').text(text);
	};
	
	//for every frame display/draw a random number, add selected class to the 
	//corresponding cell for called numbers, mark the number as used, 
	//check if hasDrawnAllNumbers
	var update = function () {
		if (counter == 75) {
			//hasDrawnAllNumbers = true; //allows state change to end game
			changeState("onEnd");
		} else {
			var num = getNumber();
			display(getLetter(num) + num);
			//Bingo.GUIManager.numberList[num].isSelected = true;
			Bingo.GUIManager.numberList[num].className = "selected";
			counter++
		}
	
	};
	
	var drawNumber = function () {
		draw = setInterval(update, millisecondsPerFrame);
	};

	var getNumber = function () {
		var randomNum;
		
		do {
			randomNum = Math.floor(Math.random() * 75 + 1);	
		} 
		//look in the "basket" of available numbers (marked false/unpicked)  
		while (Bingo.GUIManager.numberList[randomNum].isSelected);
		isUsedPick[randomNum] = true;
		Bingo.GUIManager.numberList[randomNum].isSelected = true;
		//console.log(randomNum);
		return randomNum;
		
	};
	
	var resetIsUsedPick = function () {
		for (var i = 0; i < isUsedPick.length; i++) {
			isUsedPick[i] = false;
		}
	};
	
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
	
	
	//pauses the game to verify if selected cells form a winning state
	//if it is change to winning state, else resume the game
	var checkWin = function () {
		clearInterval(draw);
		setScore();
		if (isWin()) {
			changeState("onWin");
		} else {
			changeState("onLose");
		}
	};
	
	//compares the selected cell's number to the drawn numbers then adds the 
	//bit value of the selected cell to the score
	var setScore = function () {
		var max = Bingo.GUIManager.boardCells.length;
		var num = Bingo.GUIManager.boardCells;
		score = 0;	
		for (var i = 0; i < max; i++) {	//loop through cells
			var index = num[i].number;
			if ((num[i].isSelected) && 	//if number is picked on the board
				(isUsedPick[num[i].number])) {	//and number has been called
				//console.log('score: ' + Math.pow(2, Bingo.board.squares[i].indicator));
				score += Math.pow(2, i);	//add the value to score
				console.log(i);
			}
		}
			console.log("score:" + score);
	};
	
	//compares player's score to winning scores by determining if the contain the same bits
	//if there is more than one winning combination it doesn't register as a winner???
	var isWin = function () {
		var max = wins.length;
		for (var i = 0; i < max; i++) {
			if ((wins[i] & score) === wins[i]) {	
				return true;
			}
		}
		//return false;
	};
	
	var init = function () {
		currentState = "startingState";
	
	};
	
	return {
		changeState: changeState,
		checkWin: checkWin,
		display: display,
		init:init
	}
 
 })();
 
 Bingo.GameStateManager.init();
// console.log(Bingo.GUIManager.boardCells.length);