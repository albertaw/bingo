<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Bingo</title>
		<link rel="stylesheet" type="text/css" href="css/bootstrap.css">
		<link rel="stylesheet" type="text/css" href="css/style.css" >
		
	</head>
	<body id="games">
	
		<div id="navbar">
			<ul class="">
				<li><a href="index.php"><img alt="home" src="img/icons/home-32.png"></a></li>
				<li><a href="games.php"><img alt="projects" src="img/icons/dice-32.png"></a></li>
			
				<li><a href="https://github.com/albertaw"><img alt="GitHub" src="img/icons/github-32.png"></a></li>
				<li><a href="https://twitter.com/artificialAl"><img alt="twitter" src="img/icons/twitter-32.png"></a></li>
				<li><a href="mailto:alberta04@gmail.com" target="_top"><img alt="email" src="img/icons/email-32.png"></a></li>
	
			</ul>
		</div><!--------------end nav------------------------>
	
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
