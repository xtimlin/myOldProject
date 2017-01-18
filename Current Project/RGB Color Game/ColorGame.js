var redValue = 0;
var greenValue = 0;
var blueValue = 0;

var squares = document.querySelectorAll(".square");
var rgbColor = [];
var message = document.getElementById("message");

for(var i = 0; i < squares.length; i++){
	redValue = Math.floor(Math.random() * 255);
	greenValue = Math.floor(Math.random() * 255);
	blueValue = Math.floor(Math.random() * 255);

	rgbColor.push({"red" : redValue, "green" : greenValue, "blue" : blueValue});
	squares[i].style.backgroundColor = 'rgb(' + redValue + ',' + greenValue + ',' + blueValue + ')';
	// console.log("RGB(" + rgbColor[i].red + ", " + rgbColor[i].green + ", " + rgbColor[i].blue + ")");

}


var num = Math.floor(Math.random() * 6);
var guessValue = document.getElementById("guessValue");

guessValue.textContent = "rgb(" + rgbColor[num].red + ", " + rgbColor[num].green + ", " + rgbColor[num].blue + ")";

var lis = document.querySelectorAll(".square");
for(var i = 0; i < lis.length; i++){
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
	for(var i = 0; i < squares.length; i++){
		squares[i].style.background = color;
	}
}