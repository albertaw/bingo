Bingo.InputManager = (function () {	
	
	//clicking get new board sets the board
	var enableBtnSetBoard = function () {
		$('#btnSetBoard').click(function () {
			Bingo.GUIManager.resetUsedCellNums();
			Bingo.GUIManager.setBoard();
			console.log("set board clicked");
		});
	};
	
	//clicking start new game begins the timer to call numbers
	var enableBtnNewGame = function () {
		$('#btnNewGame').click(function () {
			Bingo.GameStateManager.changeState("onStart");
		});
	};
	
	//clicking call bingo checks for a win
	var enableBtnCheckBingo = function () {
		$('#btnCheckBingo').click(function () {
			Bingo.GameStateManager.checkWin();
			console.log("check bingo clicked");
		});
	};
	
	
	//mouse down changes cell border style to inset
	//mouse up changes cell border style to outset
	//clicking a cell marks it as selected if it isn't already selected,
	//and makes it unselected if it is selected. 
	var addMouseListener = function () {
		//mousing over/out of a cell toggles highlighting the cell
		$('#bingoBoard td').click(function () {
			$(this).toggleClass("selected");
			this.isSelected = true;
			console.log(this.iD);
		});
	}
	
	//the arrow keys allow you to navigate the squares
	//the space bar allows you to select a square. enable during gameplay
	var addKeyboardListener;
	
	var handleWindowResize = function () {
		$(window).resize(function () {
			//Bingo.GUIManager.setWidth();
			Bingo.GUIManager.setCellHeight();
		});
	};
	var init = function () {
		
		enableBtnSetBoard();
		enableBtnNewGame();
		enableBtnCheckBingo();
		addMouseListener();
		//addKeyboardListener();
		//handleWindowResize();
	};
	
	//disable buttons, remove listeners
	var cleanup;
	
	return {
	
		init: init
		
	}
	
})();

Bingo.InputManager.init();