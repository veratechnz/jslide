// All Custom JS


//Look for every element with a "slider" class attribute. 
//For each one an anononymous function is run
$('.slider').each(function (){
	//Variables are created
	var $this = $(this);
	var $group = $this.find('.slide-group');
	var $slides = $this.find('.slide');
	var buttonArray = [];
	var currentIndex = 0;
	var timeout;

//The move function will create the animated sliding movement between the slides. 
//When it is called it needs to be told which slide to move to.

function move(newIndex) {
	var animateLeft, slideLeft;

	//advance id called to reset the timer.
	advance();

	//If the current slide is showing or a slide is animating, then do nothing.
	if ($group.is(':animated') || currentIndex === newIndex) {
		return;
	}
	//The array is used to update which button id active. 
	buttonArray[currentIndex].removeClass('active');
	buttonArray[newIndex].addClass('active');

	//If/Else based on array that dictates slider activity
	if (newIndex > currentIndex) {
		slideLeft = '100%';
		animateLeft = '-100%';
    } else {
    	slideLeft = '-100%';
    	animateLeft = '100%';
	}
	//Display property is set to block so that it becomes visible
	$slides.eq(newIndex).css( {left: slideLeft, display: 'block'} );
	$group.animate( {left: animateLeft} , function() {
		$slides.eq(currentIndex).css( {display: 'none'} );
		$slides.eq(newIndex).css( {left: 0} );
		$group.css( {left: 0} );
		currentIndex = newIndex;
	});
}

//This function creates the timer. 
function advance() {
	//It starts by clearing the current timer. 
	clearTimeout(timeout);
	//Start timer to run an anonymous function every 4 seconds
	timeout = setTimeout(function(){
		if (currentIndex < ($slides.length - 1)) {
			move(currentIndex + 1);
		} else {
			move(0);
		}
	  }, 6000);
	}

$.each($slides, function(index){
	//Create a button element for the button on each slide
	var $button = $('<button type="button" class="slide-btn">&bull;</button>');
	//If the index number of that slide is the same as the number held in the current index
	//then active will be applied.
	if (index === currentIndex) {
		$button.addClass('active');
	}
	//An event handler is handed to each button. 
	//When it is clicked it calls the move function 
	$button.on('click', function(){
		move(index);
	//The buttons are added to the button div. Also the array of buttons. 
	}).appendTo('.slide-buttons');
	buttonArray.push($button);
	});
	//Advance is called to start the timer
	advance();

  });


