/*
 * Create a list that holds all of your cards
 */

 var allCards = $('.deck').children();
 var container = $('.deck');
 var shuffleCards = [...allCards];
 var seconds = 0;
 


  function initGame() {
    $ratingStars.removeClass('fa-star-o').addClass('fa-star');

    starCounter();
  }
  $('.deck').one('click', function startCounter() {

    function pad(val) {
      return val > 9 ? val : "0" + val;
    }
    setInterval(function() {
      $("#seconds").html(pad(++seconds % 60));
      $("#minutes").html(pad(parseInt(seconds / 60, 10) + ' :'));
    }, 1000);
    return seconds;

  });


  function stopCounter() {
    clearInterval(function() {
      $("#seconds").html(pad(++seconds % 60));
      $("#minutes").html(pad(parseInt(seconds / 60, 10) + ' :'));
    }, 1000);
    return seconds;
  }
 /* Display the cards on the page
   - shuffle the list of cards using the provided "shuffle" method below
 */
 shuffle(allCards);
/*
   - loop through each card and create its HTML
   
    - add each card's HTML to the page
 */
 for (var i = 0; i < allCards.length;i ++){
 	container.append('<li class="card"><i class="fa fa-' + shuffleCards[i] + '"></i></li>')
 }
 

  
 
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
 var moveNum = 0;
 var matchNum = 0;
 var chosen = [];


//add the card to a *list* of "open" cards 
function clickCard(event){
	if($(this).hasClass('open')){
		return;
	}
	event.preventDefault();
	var target = event.currentTarget;
    $(event.target).addClass('open list');
    chosen.push(target);
    compare(chosen);
    return chosen;
}

//compare the cards
function compare(chosen){
	for(var i = 0; i < chosen.length; i ++){
		let card1 = chosen[0];
		let card2 = chosen[1];
		if (chosen.length >1){
			cardMatched();
		}else{
			setTimeout(noMatched,500);
			return false;
		}
	}
}

//if the cards do match, lock the cards in the open position
function cardMatched(){
	chosen.forEach(function(cards) {
		cards.className = card.className + 'matchNum';
		chosen = [];
		matchNum ++;
	});

	if (matchNum === 16){
		setTimeout(gameOver, 1000);
	}
	increment();
}

//if the cards do not match, remove the cards from the list and hide the card's symbol 
function noMatched(){
	chosen = [];
	$('.card').removeClass('open list');
	increment();
}

//increment the move counter and display it on the page
function increment(){
	moveNum++;
	$('.move').text(moveNum);
	starNum(moveNum);
}

//the number of star depends on the moves
function starNum(move){
	 if (move > 8) {
      $('.stars').find('i').eq(2).removeClass('fa-star').addClass('fa-star-o');

    }

    if (move > 15) {
      $('.stars').find('i').eq(1).removeClass('fa-star').addClass('fa-star-o');
    }
}

//if all cards have matched, display a message with the final score
function messageShow(){
	var rating;
	if(moveNum > 8 || seconds < 25){
		rating = 1;
	}
	if(moveNum > 15 || seconds < 50){
		rating = 2;
	}
    if(moveNum > 20 || seconds < 100){
		rating = 3;
	}
	confirm('Your game is completed,and you won the game with ' + moveNum + 'steps. \n in ' +seconds.toFixed() + 'seconds. \n Your score is ' + rating + '\n Do you want to play again?');
	if (true){
		location.reload();
		clearInterval(counter);
	}else {
		alert("Thank you for playing");
		$('.container').hide();
	}

}

$('.restart').click(function(){
	location.reload();
});

initGame();
