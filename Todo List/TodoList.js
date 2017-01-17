var lis = document.querySelectorAll("li");

for(var i = 0; i < lis.length; i++){
		lis[i].addEventListener("mouseover",function(){
			this.style.color = "red";
		});

		lis[i].addEventListener("mouseout",function(){
			this.style.color = "black";
		});

		lis[i].addEventListener("click",function(){
			this.classList.toggle("done");
		});

		lis[i].ondblclick = function(){
		this.parentNode.removeChild(this);
	};
}


var newitem = document.getElementById("newitem");
var add = document.getElementById("add");
var ul = document.getElementById("list");

add.addEventListener("click", function(){
	if(newitem.value === ""){
		alert("Please Enter New Todo!!");
		return;
	}

	var li = document.createElement("li");
	li.appendChild(document.createTextNode(newitem.value));

	li.addEventListener("mouseover",function(){
		this.style.color = "red";
	});

	li.addEventListener("mouseout",function(){
		this.style.color = "black";
	});

	li.addEventListener("click",function(){
		this.classList.toggle("done");
	});

	li.ondblclick = function(){
		this.parentNode.removeChild(this);
	};


	ul.appendChild(li);
	newitem.value = "";

});

