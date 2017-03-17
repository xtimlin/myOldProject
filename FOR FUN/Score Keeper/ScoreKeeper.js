var Ascore = document.getElementById("Ascore");
var A = 0;
var Bscore = document.getElementById("Bscore");
var B = 0;

var gameover = false;
var winnerscore = 5;

 var numofgame = document.getElementById("numofgame");
var setnumofgame = document.getElementById("setnumofgame");
setnumofgame.addEventListener("click", function(){
	numofgame.innerText = setnumofgame.value;
	winnerscore = Number(setnumofgame.value);
});


var player1 = document.getElementById("player1");
player1.addEventListener("click", function(){
	if(gameover === true){
		alert("gameover!! click reset for new game");
		return;
	}
	A++;
	Ascore.innerText = A;
	if(A === winnerscore){
		Ascore.style.color = "green";
		gameover = true;
		alert("player1 win!!");
	}
});


var player2 = document.getElementById("player2");
player2.addEventListener("click", function(){
	if(gameover === true){
		alert("gameover!! click reset for new game");
		return;
	}
	B++;
	Bscore.innerText = B;
	if(B === winnerscore){
		Bscore.style.color = "green";
		gameover = true;
		alert("player2 win!!");
	}
});



var reset = document.getElementById("reset");
reset.addEventListener("click", function(){
	A = 0;
	B = 0;
	gameover = false;
	Ascore.innerText = A;
	Ascore.style.color = "black";
	Bscore.innerText = B;
	Bscore.style.color = "black";
});


