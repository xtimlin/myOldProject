//total price
var total = 0;

//dropdown function
//either show or hide and update the button text
function dropDown(id, btn){
	var status = document.getElementById(id).style.display;

	if(status == 'none'){
		document.getElementById(id).style.display = "block";
		document.getElementById(btn).innerText = '-';
	}else{
		console.log("this is block");
		document.getElementById(id).style.display = 'none';
		document.getElementById(btn).innerText = '+';
	}
}



//add item to oder list
//first check the div displace or not
//	if it does not display then display it and update the values and the totle, and hide other div
//	if it does display already then update the value
function addItemToOrder(id){
	var checkDisplay = document.getElementById(id).style.display;

	if(checkDisplay == 'none'){
		var temprice = document.getElementById(id+"Price").innerText
		temprice = +temprice.substr(1);
		total += temprice;
		
		document.getElementById('emptyCart').style.display='none';
		document.getElementById('orderItem').style.display='block';

		document.getElementById(id).style.display = 'block';
	}

	if(checkDisplay == 'block'){
		var qty = document.getElementById(id+'Qty').innerText;
		qty = +qty + 1;
		document.getElementById(id+'Qty').innerText = qty;

		var price = document.getElementById(id+'Price').innerText;
		price = price.substr(1);
		total -= +price;
		price = (+price / (qty-1)) * qty;
		total += price;
		document.getElementById(id+'Price').innerText ='$' + price;
	}

	document.getElementById('totalPrice').innerText = total;
}


//Subtract button function
//if qty = 1 then update div value and hide it, then check the total price display empty div if total = 0;
//else qty - 1 and update the value inside this div
function minus(id){
	var qty = document.getElementById(id+'Qty').innerText;
	if(qty == 1){
		
		var price = document.getElementById(id+'Price').innerText;
		price = price.substr(1);
		total -= +price;
		document.getElementById(id).style.display = 'none';
		document.getElementById('totalPrice').innerText = total;
		if(total == 0){
			document.getElementById('emptyCart').style.display='block';
			document.getElementById('orderItem').style.display='none';
		}
		return;
	}

	qty = +qty - 1;
	document.getElementById(id+'Qty').innerText = qty;

	var price = document.getElementById(id+'Price').innerText;
	price = price.substr(1);
	total -= +price;
	price = (+price / (qty+1)) * qty;
	document.getElementById(id+'Price').innerText ='$' + price;
	total += price;

	document.getElementById('totalPrice').innerText = total;
}


//addition button function
//keep adding qty value then update all the value and the total value
function plus(id){
	var qty = document.getElementById(id+'Qty').innerText;
	qty = +qty + 1;
	document.getElementById(id+'Qty').innerText = qty;

	var price = document.getElementById(id+'Price').innerText;
	price = price.substr(1);
	total -= +price;
	price = (+price / (qty-1)) * qty;
	document.getElementById(id+'Price').innerText ='$' + price;
	total += price;

	document.getElementById('totalPrice').innerText = total;
}


//remove the orderItem Div
//update the total price and then reset the value inside the div
//last chaek the total price if it less than 0 the hide it and show another
function remove(id){
	var qty = +document.getElementById(id+'Qty').innerText;
	var price = document.getElementById(id+'Price').innerText;
	price = price.substr(1);
	total -= price;
	price /= qty;

	document.getElementById(id+'Qty').innerText = 1;
	document.getElementById(id+'Price').innerText ='$' + price;
	document.getElementById(id).style.display = 'none';
	document.getElementById('totalPrice').innerText = total;

	if(total == 0){
		document.getElementById('emptyCart').style.display='block';
		document.getElementById('orderItem').style.display='none';
	}
}