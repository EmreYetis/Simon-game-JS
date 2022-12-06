var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

function nextSequence() {
    userClickedPattern = [];

    var randomNumber = Math.floor((Math.random()*4));
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("."+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
    level++;
    $("h1").text("Level "+level);
    
}

$(".btn").click(function(){   
    var userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1); 
})

function playSound(name) {
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("."+currentColour).addClass("pressed");
    setTimeout(function() {
        $("."+currentColour).removeClass("pressed");
    }, 100);
}

$(document).keypress(function(event) {
    $("h1").text("Level 0");
    nextSequence();
    started = true;
}) 

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");  
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
                },1000);
        }
        

    } 
    else {
        console.log("wrong");  
        var wrongaudio = new Audio("sounds/wrong.mp3");
        wrongaudio.play(); 

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;

}



