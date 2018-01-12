/*
 * Create a list that holds all of your cards
 */

var icons = ['bicycle', 'bicycle', 'leaf', 'leaf', 'cube', 'cube', 'anchor', 'anchor', 'paper-plane-o', 'paper-plane-o', 'bolt', 'bolt', 'bomb', 'bomb', 'diamond', 'diamond'],
    open = [],
    match = 0,
    steps = 0,
    secondsCount = 0,
    minutesCount = 0,
    $deck = $('.deck'),
    $scoreCard = $('#score-card'),
    $stepCount = $('.steps'),
    $rating = $('i'),
    $restart = $('.restart'),
    $seconds = $('.seconds'),
    $minutes = $('.minutes'),
    delay = 500,
    rankStar = icons.length / 2,
    rank1 = rankStar + 10,
    rank2 = rankStar + 6,
    rank3 = rankStar + 2;

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

//Initiate Game.
function intGame(){
	intTimer();
	var cards = shuffle(icons);
	$deck.empty();
	match = 0;
	steps = 0;
	$stepCount.text('0');
	#rating.removeClass('fa-star-o').addClass('fa-star');
	for(var i = 0; i < cards.length; i ++){
		$deck.append($('<li class="card"><i class="fa fa-' + cards[i] + '"></i></li>'))
	}
    addCardListener();

};

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

//set rating and scores
function calRating(steps){
	var rating = 3;
	if(steps > rank3 && steps < rank2){
		$rating.eq(2).removeClass('fa-star').addClass('fa-star-o');
		rating = 2;
	}else if(steps > rank2 && steps < rank1){
		$rating.eq(1).removeClass('fa-star').addClass('fa-star-o');
		rating = 1;
	}else if(steps > rank1){
		$rating.eq(0).removeClass('fa-star').addClass('fa-star-o');
		rating = 0;
	}
	return {score: rating};

};

//stop game and display the information about steps and score
function endGame(steps, score){
	stopTimer();
	swal({
		  allowEscapeKey:false,
		  allowOutsideClick:false,
		  title: 'You did a great job and Won!',
		  text: 'With' + steps + 'steps and ' + score + 'Stars.\n Amazing! \n Time Taken: ' + minutesCount + 'Minutes and ' + secondsCount + 'seconds/',
		  type: 'success',
		  confirmButtonColor: '#00897b',
		  confirmButtonText: 'Play again!'
	}).then(function(isConfirm){
		if(isConfirm){
			startGame();
		}
	})
}

//Restart Game
$restart.bind('click', function(){
	swal({
		allowEscapeKey: false,
		allowOutsideClick: false,
		title: 'Wanna try again?',
        text: "Start a new game and lost all progress!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#c62828',
        cancelButtonColor: '#ff8a80',
        confirmButtonText: 'Yes, restart!'
	}).then(function(isConfirm){
		if(isConfirm){
			startGame();
		}
	})
});

var addCardListener = functin(){

	//Flip Card
	$deck.find('')
}

