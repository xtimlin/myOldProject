var redValue = 0;
var greenValue = 0;
var blueValue = 0;

var squares = document.querySelectorAll(".square");
var rgbColor = [];
var result = document.getElementById("result");

for(var i = 0; i < squares.length; i++){
	redValue = Math.floor(Math.random() * 255);
	greenValue = Math.floor(Math.random() * 255);
	blueValue = Math.floor(Math.random() * 255);

	rgbColor.push({"red" : redValue, "green" : greenValue, "blue" : blueValue});
	squares[i].style.backgroundColor = 'rgb(' + redValue + ',' + greenValue + ',' + blueValue + ')';
	console.log("RGB(" + rgbColor[i].red + ", " + rgbColor[i].green + ", " + rgbColor[i].blue + ")");

}


var num = Math.floor(Math.random() * 6);
var guessValue = document.getElementById("guessValue");

guessValue.textContent = "RGB(" + rgbColor[num].red + ", " + rgbColor[num].green + ", " + rgbColor[num].blue + ")";

var lis = document.querySelectorAll(".square");
for(var i = 0; i < lis.length; i++){
	lis[i].addEventListener("click", function(){
		
		alert(this.style.backgroundColor);
		// if(this.id == num){
		// 	result.innerText = "you got it!!";
		// }else{
		// 	result.innerText = "try again!!";
			
		// }
	});
}


function check(k) {
	console.log(rgbColor[k].red + " " + rgbColor[k].green + " " + rgbColor[k].blue);
}