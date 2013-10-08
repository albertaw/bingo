<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Bingo</title>
		<link rel="stylesheet" type="text/css" href="css/bootstrap.css">
		<link rel="stylesheet" type="text/css" href="css/style.css" >
		
	</head>
	<body id="games">
	
	
	<div class="main container">
		<div class="row">
		<h1 class="message span12">Let's Play Bingo!</h1>
		</div>

		<div class="row">

			<div class="span3 gameInfo">
				<a id="checkBingo" class="btn btn-large btn-primary btn-block">Call Bingo!</a>
				<a id="btnStartBingo" class="btn btn-large btn-primary btn-block">Start New Game</a>
			</div>
		
			<div id="bingo" class="span6">
			
				<table id="bingoBoard">
					<thead>
						<th>B</th>
						<th>I</th>
						<th>N</th>
						<th>G</th>
						<th>O</th>
					</thead>
					
				</table>
			
			</div>
			<div class="span3"></div>
		</div>
	</div><!------------end container--------------->	
		<script src="js/jquery.js"></script>
		<script src="js/bootstrap.js"></script>
		<script src="js/bingo.js"></script>
		
	</body>
</html>
