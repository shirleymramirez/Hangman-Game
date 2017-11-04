//  Variables Declaration 
//=================================================

//Create an array of words
var words = ["cats", "dogs", "singer", "peach", "table", "candy", "computer"];

//Create variables to hold the number of wins, guesses left and guessed letter
var wins = 0;
var guessesleft = 0;
var letterguessed = 0;

//Choose word randomly
var randNum = Math.floor(Math.random() * words.length);
var chosenWord = words[randNum];
var underscore =[];
var correctWord = [];
var wrongKeys = [];
var lives;
var counter;           // Count correct geusses
var guessesleft;          

console.log(chosenWord);

//Get Elements
var showWinner = document.getElementById("winner");
var showCurrentWord = document.getElementsByClassName("currentword");
var underscoreHtmlElement = document.getElementById("underscore");
var showNumGuessleft = document.getElementById("numguessleft");
var showGuessLetterHTMLElement = document.getElementById("guessletters");


//  Main Function 
//=================================================
//create underscore based on the length word
for( var i = 0; i < chosenWord.length; i++ ) {
	underscore.push('_');
}

 underscoreHtmlElement.innerHTML = underscore;
	
//This function is run whenever the user presses a key
//document.onkeyup = function(event) {// check onkeyup events
document.onkeypress = function(event) {
	console.log(event);
	//Determines which key was pressed.
	var userGuess = event.key;
	
	//Check if the key pressed by the user is in the chosen Words
	var index = chosenWord.indexOf(userGuess);

	if( index > -1 ) {
		//add to right words array
		underscore[index] = userGuess;
		underscoreHtmlElement.innerHTML = underscore;
	}

	else {
		//List of letters already guessed 
		wrongKeys.push(userGuess);
		console.log(wrongKeys);
		showGuessLetterHTMLElement.innerHTML = "Letters Already Guess " + wrongKeys.join(', ');	

		//Number of Guess Remaining
		if (wrongKeys.length <= 10) {
			guessesleft = 10 - wrongKeys.length; //Look for set time out
			console.log(guessesleft);
			showNumGuessleft.innerHTML = "Number of Guesses Remaining is: " + guessesleft;
		}
	}

	//wins all the underscore has letter
	if ( chosenWord === underscore.join('')) {
		showWinner.innerHTML = "You Win!!!"
	}
	//List of wrong pressed letters
	console.log(wrongKeys.length);
	if ( wrongKeys.length === 10 ) {
		// lost
		alert("Sorry, you have lost!");
	}
}
 //Reset the game
 if ((wrongKeys.length === 10) || (chosenWord === underscore.join('') ) ){
 	document.onclick();
 }


