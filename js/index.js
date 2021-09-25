//Create an array to store all the colors
var buttonColors = ["green", "yellow", "red", "blue"];

//Create an array to store all the game pattern (the colors the game is giving)
var gamePattern = [];

//Create an array to store the user's selected colors
 var userClickedColors = [];

//Create a variable to store game level
var gameLevel = 0;

//Create a vaariable to store game store
var gameState = false;

//Listen for keypress to start the game
$(document).keypress(function(){
    //Check whether the game has started already
    //Is gameState === false
    if(!gameState){
        //Set the game state to true
        gameState = true;

        // Get the random color
        nextPattern();

        
    }
});

        //Check for user's click event on the button
        $(".btn").click(function(){
            var selectedColor = $(this).attr("id");

         //Add the selected color to the userClickedColors
        userClickedColors.push(selectedColor); 

        //Play the sound for the selected color
        playSound(selectedColor);

        //animate the selected color
        animateButtonPress(selectedColor);
        

        //check for user pattern
        var lastElementIndex = userClickedColors.length - 1;


        console.log(userClickedColors);
        console.log(gamePattern);
        console.log("==========");

        if(userClickedColors[lastElementIndex] === gamePattern[lastElementIndex]){
            if(userClickedColors.length === gamePattern.length){
                  
        // Get the next sequence
               setTimeout(function(){
                userClickedColors = [];
                nextPattern();
               }, 1000);
            }
           
        }else{          
            // change background to error color
            $("body").addClass("game-over");

            setTimeout(function(){
            $("body").removeClass("game-over");

            }, 100);

            // play wrong sound
            playSound("wrong");

            // Set title  to game over
            $("h1").text("Game Over, Press Any Key to Restart");

            // Rest the game
            restGame();
        }
       

        // //check if the user clicked the correct color in the order
        // if(userClickedColors[lastElementIndex] === gamePattern[lastElementIndex]){
            
        //     //Check if the pattern is completed
        //     if(userClickedColors.length === gamePattern.length){
        //         // Set the user clicked pattern array to empty
        //         userClickedColors = [];

        //         // Get the next sequence
        //        setTimeout(function(){
        //         nextPattern();
        //        }, 1000);

        //     }
        // }else{

       





        //     //  //Set the game level to 0
        //     //  gameLevel = 0;

        //     //  //Set the game pattern to an empty array
        //     //  gamePattern = [];

        //     // // set user clicked pattern to empty
        //     // userClickedColors = [];

        // }


            
        });

        function playSound(soundName){
            var audio = new Audio("sounds/" + soundName + ".mp3");
            audio.play();
        }


        function animateButtonPress(selectedColor){
            $("#" + selectedColor).addClass("selected-color");

            setTimeout(function(){
            $("#" + selectedColor).removeClass("selected-color");
            },100);
        }


        function nextPattern(){
            //Set the game level to 1
            gameLevel++;

            //Set the title to game level
            $("h1").text("Level " + gameLevel);

            //Generate a random number from 0 to 3
            var randomNumber = Math.floor(Math.random() * 4);

            //Select a color using the random number
            var randomColor = buttonColors[randomNumber];
            
            //Play the color sound
            playSound(randomColor);

            //animate the selected color
            animateButtonPress(randomColor);

            //Add the random color to the game pattern
            gamePattern.push(randomColor);
    
        }

        function restGame(){
            gameState = false;

            gameLevel= 0;

            userClickedColors = [];

            gamePattern = [];
        }
