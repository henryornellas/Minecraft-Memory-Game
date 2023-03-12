var userClickedPattern = [];
var buttonColors = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var level = 0;
var started = false;

//Selects random color from array
function nextSequence(){
  var randomNumber = Math.floor(Math.random()*4);

  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);
  $('.' + randomChosenColor).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);

  $('h1').text('Level ' + level);

  level++;
}

//Click event listener
$('.btn').click(function(){
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  playSound(this.id);
  animatePress(this.id);
  checkAnswer(userClickedPattern.length - 1);
});

//Sound function
function playSound(event){
  var audio = new Audio('sounds/'+ event + '.mp3');
  audio.play();
}

//Button animation when clicked
function animatePress(currentColor){
  $('.' + currentColor).addClass('pressed');
  setTimeout(function(){
    $('.' + currentColor).removeClass('pressed');
  }, 100);
}

//Starts game when key is pressed
$(document).keydown(function(){
  if(!started){
    nextSequence();
    $('h1').text('Level ' + level);
    started = true;
  }
});

//Checks if the player answer is correct
function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
        userClickedPattern = [];
      },1000);
    }
  }else{
    playSound('wrong');
    $('body').addClass('game-over');
    $('h1').text('Game over, press any key to restart');
    setTimeout(function(){
      $('body').removeClass('game-over');
    }, 200);
    startOver();
  }
}

//Resets the values to 0
function startOver(){
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
}
