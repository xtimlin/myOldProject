/**************************************************
https://en.wikipedia.org/wiki/High_card_by_suit
1	-> 2 		
2	-> 3		
3	-> 4		
4	-> 5		
5	-> 6		
6	-> 7		clubs(♣) 	: A 		A14	-> smaller Joker
7	-> 8		diamonds(♦)	: B 		B14 -> big Joker
8	-> 9		hearts(♥)	: C
9	-> 10		spades(♠)	: D
10	-> J
11	-> Q
12	-> K
13	-> A
14	-> Joker

**************************************************/

var suit = ["A", "B", "C", "D"];
var rank = [1,2,3,4,5,6,7,8,9,10,11,12,13];

var poker = {
	deck : [],				//un-used card deck
	useddeck : [],			//used card deck

	numberOfplayer : 0,		//number of player
	cardsonhand : [],		//will save all player's card as array into this array, 2D array size: n * 5, n for number of player
	winningresult : [],		//cards for each player's poker hand categories and the highest card for that categories

	sendPokerCardButton : true,
	getwinnerButton : false,

	/***********************************************
	create a new deck of cards
		1. initialize the whole deck by use the suit and rank array
		2. initialize datas (unused, used, numberOfplayer) 
		3. push joker
			A14 small joker
			B14 big joker
		4.initialize the player tag in html
	***********************************************/
	init: function(num){
		var count = 1;
		for(var i = 0; i < rank.length; i++){
		 	for(var j = 0; j < suit.length; j++){
		 		this.deck.push({"suit" : suit[j], "rank" : rank[i], "order" : count++});
		 	}
		}
		this.deck.push({"suit" : "A", "rank" : 14, "order" : 53}); //small joker
		this.deck.push({"suit" : "B", "rank" : 14, "order" : 54}); //big joker
		this.unused = 52;
		this.used = 0;
		this.numberOfplayer = num;
		poker.sendPokerCardButton = true;
		poker.getwinnerButton = false;

		if(num >= 1){
			document.getElementById("player1").innerText = "Player1";
		}
		if(num >= 2){
			document.getElementById("player2").innerText = "Player2";
		}
		if(num >= 3){
			document.getElementById("player3").innerText = "Player3";
		}
		if(num == 4){
			document.getElementById("player4").innerText = "Player4";
		}
	},

	/***********************************************
	Shuffle the deck
		1. Loop 50 times
			separate: select a random number, separate the deck in to 2 decks
			together: put the second deck infront of the first deck
	***********************************************/
	shuffle: function(){
		var Rnum = 0;
		var part = [];
		for(var i = 0; i < 50; i++){
			rnum = Math.floor((Math.random() * 53) + 1);
			part = this.deck.splice(rnum, this.deck.length);
			for(var j = 0; j < part.length; j++){
				this.deck.unshift(part[j]);
			}
		}
	},


	/***********************************************
	re-shuffle when card's demand more than supply
		1. pop all the cards back to the un-used card deck
		2. shuffle the un-used card deck
	***********************************************/
	reshuffle : function(){
		while(this.useddeck.length > 0){
			this.deck.push(this.useddeck.pop());
		}
		poker.shuffle();
	},


	/***********************************************
	Deal one card to each player in turns until every player has 5 cards in hand
		1. check the remaining number of card in the un-used card deck 
			reshuffle card if needed
		2. creat n empty array into cardsonhand array (n for number of player)
		3. send one card into each array that creats in step2 
			(until all array has 5 cards)
	***********************************************/
	sendcard : function(){
		document.getElementById("winnerid").innerText = "Winner: Pending";
		if(poker.deck.length < 5 * poker.numberOfplayer){
			poker.reshuffle();
		}

		for(var i = 0; i < poker.numberOfplayer; i++){
			poker.cardsonhand.push([]);
		}

		var fontCardFromDeck
		var i = 0;

		while(i < poker.numberOfplayer * 5){
			fontCardFromDeck = poker.deck.shift();
			poker.cardsonhand[i % poker.numberOfplayer].push(fontCardFromDeck);

			i++;
		}
	},


	/***********************************************
	Display what card each player holds
		//1. check if all the player have enought cards on hand
		2.display each card by calling the function getcardimage(cardObject, HTML_ID)
	***********************************************/
	displayCard : function(){
		var Idstring;
		for(var i = 0; i < poker.numberOfplayer; i++){
			for(var j = 0; j < 5; j++){
				Idstring = "p" + (i + 1).toString() + (j + 1).toString();
				poker.getcardimage(this.cardsonhand[i][j], Idstring);
			}
		}
	},

	/**********************************************************
	link the object information to their own image
		1. all image need to set the name to format [suit]+[rank]+png
		2. find the image and display it
	**********************************************************/
	getcardimage : function(obj, id){
		var string = obj.suit.toString() + obj.rank.toString() + ".png";
		document.getElementById(id).src = string;
	},


	/**********************************************************
	sort cards for each player
		Quick player's hand card by order
	**********************************************************/
	sort : function(){
		for(var index = 0; index < poker.cardsonhand.length; index++){
			poker.quicksort(index, 0, poker.cardsonhand[index].length - 1);
		}
	},

	quicksort : function(index, start, end){
		if (start >= end) {
            return;
        }
        
        var left = start, right = end;
        var pivot = poker.cardsonhand[index][Math.floor((start + end) / 2)];

        while (left <= right) {
            while (left <= right && poker.cardsonhand[index][left].order < pivot.order) {
                left++;
            }
            while (left <= right && poker.cardsonhand[index][right].order > pivot.order) {
                right--;
            }
            if (left <= right) {
                var temp = poker.cardsonhand[index][left];
                poker.cardsonhand[index][left] = poker.cardsonhand[index][right];
                poker.cardsonhand[index][right] = temp;
                
                left++;
                right--;
            }
        }
        
        poker.quicksort(index, start, right);
        poker.quicksort(index, left, end);

	},

	//fill result to the winningresult []
	/**********************************************************
	find the result for each index array from cardsonhand(2d array)
		1. need to run the sort card first
		2. be careful on executing the higher winning changce checking function first
		3. set the label on html tag for each sub-array result
		4. push all the result to winningresult array further compare check
	**********************************************************/
	findresult : function(){
		
		var result = null;
		var temp = [];
		for(var i = 0; i < this.cardsonhand.length; i++){
			temp = this.cardsonhand[i];

			result = poker.FiveKind(temp);//-------------------------10

			if(result == null){
				result = poker.StraightFlush(temp);//----------------9
			}
			if(result == null){
				result = poker.FourKind(temp);//---------------------8
			}
			if(result === null){
				result = poker.FullHouse(temp);//--------------------7
			}
			if(result === null){
				result = poker.Flush(temp);//------------------------6
			}
			if(result === null){
				result = poker.Straight(temp);//---------------------5
			}
			if(result === null){
				result = poker.ThreeKind(temp);//--------------------4
			}
			if(result === null){
				result = poker.TwoPair(temp);//----------------------3
			}
			if(result === null){
				result = poker.OnePair(temp);//----------------------2
			}
			if(result === null){
				result = poker.HighCard(temp);//---------------------1
			}


			if(i == 0){
				document.getElementById("player1result").innerText = result.Message;
			}else if(i == 1){
				document.getElementById("player2result").innerText = result.Message;
			}else if(i == 2){
				document.getElementById("player3result").innerText = result.Message;
			}else{
				document.getElementById("player4result").innerText = result.Message;
			}
			
			this.winningresult.push(result);
		}
	},

	//winningresult []
	/**********************************************************
	further compare check
		1. (data check) need to run findresult function first in order to run this function
		2. first aompare the winning level for each object
		3. if both are the same winning level then compare higher card rank for each object
		4. if same in step 2 and 3 then compare the suit for each object

		5. try to highlight the winner card's background
	**********************************************************/
	findWinner : function(){
		var winner = 0;

		for(var i = 1; i < this.numberOfplayer; i++){
			if(poker.winningresult[winner].level <  poker.winningresult[i].level){
				winner = i;
			}
			if(this.winningresult[winner].level ===  this.winningresult[i].level){
				if(this.winningresult[winner].card.rank < this.winningresult[i].card.rank){
					winner = i;
				}
				if(this.winningresult[winner].card.rank === this.winningresult[i].card.rank){
					if(this.winningresult[winner].card.suit < this.winningresult[i].card.suit){
						winner = i;
					}
				}
			}
		}

		//highlight background
		if(winner === 0){
			document.getElementById("winner1").style.background= "#ccffcc";
		}
		if(winner === 1){
			document.getElementById("winner2").style.background= "#ccffcc";
		}
		if(winner === 2){
			document.getElementById("winner3").style.background= "#ccffcc";
		}
		if(winner === 3){
			document.getElementById("winner4").style.background= "#ccffcc";
		}

		var message = "Player" + (winner + 1) + " is winning";
		// alert(message);
		document.getElementById("winnerid").innerText = message;
	},


	/**********************************************************
		check cardsonhand
	**********************************************************/
	handCardCheck : function(arr){
		for(var i = 0; i < 5; i++){
			if(arr[i].suit < "A" || arr[i].suit > "D"){
				return "Card Error!!";
				alert("Card Error!!");
			}
			if(arr[i].rank < 1 || arr[i].rank > 13){
				return "Card Error!!";
				alert("Card Error!!");
			}
		}
	},


	/**********************************************************
	move used card to used-card deck and reset data for next game
		1. move all the used card in cardsonhand[] to useddeck[] (pop out all the data, make it empty)
		2. empty winningresult[]
		3. set all the card image to white
		4. set all the result label
	**********************************************************/
	sendcardandreset : function(){
		for(var i = 0; i < this.cardsonhand.length; i++){
			// for(var j = 0; j < cardsonhand[i].length; i++){
			while(this.cardsonhand[i].length > 0){
				this.useddeck.push(this.cardsonhand[i].pop());
			}
		}
		this.cardsonhand = [];
		this.winningresult = [];

		var Idstring = "";
		for(var i = 1; i <= poker.numberOfplayer; i++){
			for(var j = 1; j <= 5; j++){
				Idstring = "p" + i.toString() + j.toString();
				document.getElementById(Idstring).src = "whitecard.png"
			}
			document.getElementById("player" + i.toString() + "result").innerText = "";
			document.getElementById("winner" + i.toString()).style.background= "white";
		}
	},


	wait : function(ms){
		var start = new Date().getTime();
		var end = start;
		while(end < start + ms) {
			end = new Date().getTime();
		}
	},

	/*************************************************************************************************************************************************************************************************************************************************************
	following function are implement from the given web page: 
								https://en.wikipedia.org/wiki/List_of_poker_hand_categories
	************************************************************************************************************************************************************************************************************************/
	//Five of a kind [x,x,x,x,14], higest winning chance level 10
	FiveKind : function(arr){
		if(arr[0].rank === arr[1].rank && arr[1].rank === arr[2].rank && arr[2].rank === arr[3].rank && arr[4].rank === 14 ||	//[x,x,x,x,joker]
			arr[0].rank === 14 && arr[1].rank === arr[2].rank && arr[2].rank === arr[3].rank && arr[3].rank !== arr[4].rank){	//[joker,x,x,x,x]
				return {"card" : arr[2], "level" : 10, "Message" : "Five of Kind"};	// console.log("level: " +  10);
		}else{
			return null;	// console.log("null-10");
		}
	},

	// Straight flush [1,2,3,4,5], same suit, winning chance level 9
	StraightFlush : function(arr){
		if(poker.Flush(arr) === null || poker.Straight(arr) === null){
			return null;	// console.log("null-9");
		}else{
			return {"card" : arr[4], "level" : 9, "Message" : "Straight Flush"};	// console.log("level: " +  9);
		}
	},


	// Four of a kind [x,x,x,x,y], winning chance level 8
	FourKind : function(arr){
		if(arr[0].rank === arr[1].rank && arr[1].rank === arr[2].rank && arr[2].rank === arr[3].rank || 	//[x,x,x,x,y]
			arr[1].rank === arr[2].rank && arr[2].rank === arr[3].rank && arr[3].rank === arr[4].rank){		//[y,x,x,x,x]
			return {"card" : arr[1], "level" : 8, "Message" : "Four of Kind"};	// console.log("level: " +  8);
		}else{
			return null;	// console.log("null-8");
		}
	},


	// Full house [x,x,x,y,y], winning chance level 7
	FullHouse : function(arr){
		if(arr[0].rank == arr[1].rank && arr[1].rank == arr[2].rank && arr[3].rank == arr[4].rank || 	//[x,x,x,y,y]
			arr[0].rank == arr[1].rank && arr[2].rank == arr[3].rank && arr[3].rank == arr[4].rank){	//[y,y,x,x,x]
			return {"card" : arr[2], "level" : 7, "Message" : "Full House"};	// console.log("level: " +  7);
		}else{
			return null;	// console.log("null-7");
		}
	},

	// Flush [i,j,k,l,m] same suit, winning chance level 6
	Flush : function(arr){
		if(arr[4].rank === 14){
			return null;
		}
		if(arr[0].suit === arr[1].suit && arr[1].suit === arr[2].suit && arr[2].suit === arr[3].suit && arr[3].suit === arr[4].suit){
			return {"card" : arr[4], "level" : 6, "Message" : "Flush"};	// console.log("level: " +  6);
		}
		return null;	// console.log("null-6");
	},


	// Straight [x,x+1,x+2,x+3,x+4] not same suit, winning chance level 5
	Straight : function(arr){
		if(arr[4].rank === 14){
			return null;
		}
		if(arr[0].rank + 1 === arr[1].rank && arr[1].rank + 1 === arr[2].rank && arr[2].rank + 1 === arr[3].rank && arr[3].rank + 1 === arr[4].rank){
			return {"card" : arr[4], "level" : 5, "Message" : "Straight"};			//console.log("level: " +  5);
		}
		return null;	// console.log("null-5");
	},

	// Three Kind [x,x,x,y,z], winning chance level 4
	ThreeKind : function(arr){
		if(arr[0].rank === arr[1].rank && arr[1].rank === arr[2].rank || 	//[x,x,x,y,z]
			arr[1].rank === arr[2].rank && arr[2].rank === arr[3].rank || 	//[y,x,x,x,z]
			arr[2].rank === arr[3].rank && arr[3].rank === arr[4].rank){	//[y,z,x,x,x]
			return {"card" : arr[2], "level" : 4, "Message" : "Three of Kind"};	// console.log("level: " +  4);
		}else{
			return null;	// console.log("null-4");
		}
	},

	// Two Pair, winning chance level 3
	TwoPair : function(arr){
		if(arr[0].rank === arr[1].rank && arr[2].rank === arr[3].rank){			//[x,x,y,y,z]
			return {"card" : arr[2], "level" : 3, "Message" : "Two Pair"};	// console.log("level: " +  3);
		}
		else if(arr[0].rank === arr[1].rank && arr[3].rank === arr[4].rank) {	//[x,x,z,y,y]
			return {"card" : arr[4], "level" : 3, "Message" : "Two Pair"};	// console.log("level: " +  3);
		}
		else if(arr[1].rank === arr[2].rank && arr[3].rank === arr[4].rank) {		//[z,x,x,y,y]
			return {"card" : arr[4], "level" : 3, "Message" : "Two Pair"};	// console.log("level: " +  3);
		}
		else{
			return null;	// console.log("null-3");
		}
	},


	// One Pair, winning chance level 2
	OnePair : function(arr){
		var temp = null;
		for(var i = 0; i < arr.length; i++){
			for(var j = i + 1; j < arr.length; j++){
				if(arr[i].rank === arr[j].rank){
					return {"card" : arr[i], "level" : 2, "Message" : "One Pair"};
				}
			}
		}
		return null;
	},

	// HighCard, winning chance level 1
	HighCard : function(arr){
		return {"card" : arr[4], "level" : 1, "Message" : "Higher Card"};	
	}

}



	//init
	var num = prompt("How many player(1-4)?");
	while(1 > num || num > 4 || isNaN(num)){
		alert("Please enter number between 1 to 4");
		var num = prompt("How many player(1-4)?");
	}
	poker.init(num);
	poker.shuffle();

	var sendPokerCard = document.getElementById("sendPokerCard");
	sendPokerCard.addEventListener("click", function(){
		if(poker.sendPokerCardButton == false && poker.getwinnerButton == false){
			if(confirm("Continue?")){
				poker.sendcardandreset();

				poker.sendPokerCardButton = false;
				poker.getwinnerButton = true;
				poker.sendcard();
				poker.sort();
				poker.displayCard();
			}
		}else if(poker.sendPokerCardButton == false && poker.getwinnerButton == true){
			alert("Please Click \"Find Winner\" To Continue!!");
		}else{
			poker.sendPokerCardButton = false;
			poker.getwinnerButton = true;
			poker.sendcard();
			poker.sort();
			poker.displayCard();
		}	
	});


	var getwinner = document.getElementById("getwinner");
	getwinner.addEventListener("click", function(){
		if(poker.sendPokerCardButton == true || poker.sendPokerCardButton == false && poker.getwinnerButton == false){
			alert("Please Click \"Send Card\" for new game!!");
		}else{
			poker.getwinnerButton = false;
			poker.findresult();
			poker.findWinner();
		}
	});
