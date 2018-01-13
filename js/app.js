/*
 * Create a list that holds all of your cards
 */

var cards = ["fa-diamond", "fa-diamond", "fa-paper-plane-o", "fa-paper-plane-o", "fa-anchor", "fa-anchor", "fa-bolt", "fa-bolt", "fa-cube", "fa-cube", "fa-leaf", "fa-leaf", "fa-bicycle", "fa-bicycle", "fa-bomb", "fa-bomb];

//var need to be used to hold cards
var holdCard = [];
var moves = 0;
var starts = 3;
var matched = 0;
var startGame = false;
var starRating = "3";
var timer;
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// card's html created
function createCard(){
	var cardList = shuffle(cards);
	cardList.forEach(function(card){
		$(".deck").append('<li><i class="card fa ' + card + '"></i></li>');
	})
}

//the function of finding match cards
function matchCard(){
	//flip cards when click
	$(".card").on("click",function(){
		if($(this).hasClass("open show")){return;}
		$(this).toggleClass("fliping open show");
		holdCard.push($(this));
        startGame = true;

       //if the length of holdCard equal to 2
       if(holdCard.length === 2){
       	  if (holdCard[0][0].classList[2] === holdCard[1][0].classList[2]){
       	  	holdCard[0][0].classList.add("bounceIn", "match");
       	  	holdCard[1][0].classList.add("bounceIn", "match");
       	  	$(holdCard[0]).off('click');
       	  	$(holdCard[1]).off('click');
       	  	matched += 1;
       	  	moves++;
       	  	removeOpen();
       	  	winner();
       	  }else{
       	  	holdCard[0][0].classList.add("shake","wrong");
       	  	holdCard[1][0].classList.add("shake","wrong");
       	  	setTImeout(removeClasses,1100);
       	  	setTimeout(removeOpen,1100);
       	  	moves++;
       	  }
       }
       calMoves();
	})
}

//function of calculate the moves
function calMoves(){
	if(moves === 1){
		$("#movesText").text(" Move");
	}else{
		$("#movesText").text(" Moves");
	}
	$("#moves").text(moves.toString());

	if(moves > 0 && moves < 16){
		starRating = starRating;
	}else if(moves >= 16 && moves <= 20){
		$("#starOne").removeClass("fa-star");
		starRating = "2";
	}else if(moves > 20){
		$("#starTwo").removeClass("fa-star");
		starRating = "1";
	}
}
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
 
 //when the game is finish, tit should be open popup
function winner(){
	if(matched === 8){
		var modal = document.getElementById('win-popup');
        var span = document.getElementsByClassName("close")[0];

        $("#total-moves").text(moves);
        $("#total-stars").text(starRating);

        modal.style.display = "block";
        span.onclick = function() {
        	modal.style.display = "none";
        }

        $("#play-again-btn").on("click", function() {
        	location.reload()
        });

        clearInterval(timer);
	}
}

//initiate the holdCard array
function removeOpen(){
	holdCard = [];
}

//remove all classes except matching
function removeClasses(){
	$(".card").removeClass("show open fliping bounceIn shake wrong");
	removeOpen();
}

//Disable clicks
function disableClick(){
	holdCard.froEach(function (card){
		card.off("click");
	})
}

//when click the first card, the timer starts
function startTimer(){
	var clicks = 0;
	$(".card").on("click",function(){
		clicks += 1;
		if(clicks === 1){
			var sec = 0;
			function time (val){
				return val > 9 ? val : "0" + val;
			}
			timer = setInterval(function (){
				$(".seconds").html(time(++sec % 60));
				$(".minutes").html(time(parseInt(sec / 60, 10)));
			}, 1000)
		}
	})
}

//call functions
shuffle(cards);
createCard();
matchCard();
startTimer();

//restart game
function restart(){
	$("#restart").on("click",function (){
		location.reload()
	});
}

restart();

