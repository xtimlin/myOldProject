

var squares = document.querySelectorAll(".square");
var rgbColor = [];
var message = document.getElementById("message");

var difficult = 6;
var guess = undefined;
var guessValue = undefined;

init(difficult);



var lis = document.querySelectorAll(".square");
for(var i = 0; i < difficult; i++){
	lis[i].addEventListener("click", function(){
		if(this.style.backgroundColor === guessValue.innerText){
			message.textContent = "You Got It!!";
			changeColor(guessValue.innerText);
		}else{
			message.textContent = "Try Again!!";
			this.style.background = "#232323";
		}

	});
}


function changeColor(color){
	for(var i = 0; i < difficult; i++){
		squares[i].style.background = color;
	}

	document.getElementById("newGame").textContent = "Play Again!!";
	document.getElementById("top").style.background = color;
}


function init(difficult){
	var redValue = 0;
	var greenValue = 0;
	var blueValue = 0;
	rgbColor = [];
	for(var i = 0; i < difficult; i++){
		redValue = Math.floor(Math.random() * 255);
		greenValue = Math.floor(Math.random() * 255);
		blueValue = Math.floor(Math.random() * 255);

		rgbColor.push({"red" : redValue, "green" : greenValue, "blue" : blueValue});
		squares[i].style.backgroundColor = 'rgb(' + redValue + ',' + greenValue + ',' + blueValue + ')';
	}

	guess = Math.floor(Math.random() * difficult);
	guessValue = document.getElementById("guessValue");
	guessValue.textContent = "rgb(" + rgbColor[guess].red + ", " + rgbColor[guess].green + ", " + rgbColor[guess].blue + ")";

	document.getElementById("newGame").textContent = "New Game";
	document.getElementById("top").style.background = "steelblue";
}


var newGame = document.getElementById("newGame");
newGame.addEventListener("click", function(){
	init(difficult);

	var lis = document.querySelectorAll(".square");
	for(var i = 0; i < difficult; i++){
		lis[i].addEventListener("click", function(){
			
			if(this.style.backgroundColor === guessValue.innerText){
				
				document.getElementById("newGame").textContent = "Play Again??";
				changeColor(guessValue.innerText);
			}else{
				message.textContent = "Try Again!!";
				this.style.background = "#232323";
			}
		});
	}
});


var easy = document.getElementById("easy");
easy.addEventListener("click", function(){
	difficult = 3;
	init(difficult);

	for(var i = 3; i < squares.length; i++){
		squares[i].style.background = "#232323";
		// this.addEventListener("click", function(){return;})
	}
	
})

var hard = document.getElementById("hard");
hard.addEventListener("click", function(){
	difficult = 6;
	init(difficult);
})