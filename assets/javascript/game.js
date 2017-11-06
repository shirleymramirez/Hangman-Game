//Initialize/start game on window load
window.onload =  function () {

	//Create an array of words
	var words = [ 'cats', 'boolean','dogs', 'house', 'candy', 'toys', 'piano', 'apple'];
	
	//function that will output the selected word
	var game = createHangmanGame(words);

	//Get Users guess key
	document.onkeypress = game.handleKeyPress;
	//game.start();
}

//function that will output the selected word
function createHangmanGame(words) {

	//Choose word ramdonly
	var randomNum = Math.floor(Math.random() * words.length);
	var chosenWord = words[randomNum];

	var rightGuessCounter = 0;
	var guessesleft = 10;
	var counterWin = 0;
	console.log(chosenWord);

	//number of letters in the chosen word
	var underscoredGuessedWord = generateGuessedWord(chosenWord, '_'); 

	var wrongKeys = [];
	var letterPosition = {};
	var repeats=[];
			
	storeLetterPos();

	//DOM Manipulation
	var underscoreHtmlElement = document.getElementById('underscore');
	var showNumGuessleft = document.getElementById('numguessleft');
	var showGuessLetterHTMLElement = document.getElementById('guessletters');
	var showWinner = document.getElementById('winner');

	function reset() {
		randomNum = Math.floor(Math.random() * words.length);
		chosenWord = words[randomNum];
		rightGuessCounter = 0;
		guessesleft = 10;
		wrongKeys = [];
		underscoredGuessedWord = generateGuessedWord(chosenWord, '_'); 
		console.log(chosenWord);
		underscoreHtmlElement.innerHTML = underscoredGuessedWord;
		showNumGuessleft.innerHTML = 'Number of Guesses Remaining Is ';
		showGuessLetterHTMLElement.innerHTML = 'Letters Already Guess ';
	}

	function storeLetterPos() {
		// for (var i = 0; i < chosenWord.length; i++ ) {
			
		// 	//letterPosition[chosenWord[i]] = [];
		// 	//letterPosition[chosenWord[i]].push(i);
		// }
		//console.log(letterPosition);

		//checking of there are 2 same characters in the guessed word
		for(x = 0, length = chosenWord.length; x < length; x++) {
		    var l = chosenWord.charAt(x)
		    letterPosition[l] = (isNaN(letterPosition[l]) ? 1 : letterPosition[l] + 1);
		}

		//Processing if there are 2 same letter keys
		for (chosenWord in letterPosition) {
		    if (letterPosition.hasOwnProperty(chosenWord) && letterPosition[chosenWord]>1) {
		        underscoredGuessedWord.push(new Array( letterPosition[chosenWord]+ 1 ).join( chosenWord ));
		    }
		}
		console.log(underscoredGuessedWord);

	}

	//create underscore based on the length of word
	underscoreHtmlElement.innerHTML = underscoredGuessedWord;
	function generateGuessedWord(word, separator)  {
		var guessedWord = [];
		for(var i = 0; i < word.length; i++) {
			guessedWord.push(separator);
		}
		return guessedWord;
	}
		
	//Processing of all the valid keys
	function handleValidKeyPress(index, event) {
	
		letterPosition[event.key] = index;
		console.log(letterPosition);

		//add to right words array
		underscoredGuessedWord[index] = event.key;

		rightGuessCounter++;
		console.log('rightGuessCounter ' + rightGuessCounter);

		//Put all the correct guessed letter keys in place of the underscore
		underscoreHtmlElement.innerHTML = underscoredGuessedWord;
	}

	//Processing all the invalid keys 
	function handleInvalidKeyPress(event) {
		//Check if an invalid letter key is pressed again
		if (wrongKeys.indexOf(event.key) === -1) {
			//Lists of all the invalid letters guessed
			wrongKeys.push(event.key);
		
			//Compile all the incorrect letter keys guessed
			showGuessLetterHTMLElement.innerHTML = "Letters Already Guess " + wrongKeys.join( );

			//Check the number of Guess Remaining 
			if (wrongKeys.length <= 10) {
				guessesleft = guessesleft - 1; 
				console.log('guessesleft ' + guessesleft );
				showNumGuessleft.innerHTML = "Number of Guesses Remaining is: " + guessesleft;
			}
		}
	}

	//win or lose processing
	function winLoseChecker() {
		if( chosenWord.length === rightGuessCounter ) {
			console.log('chosenWord.length ' + chosenWord.length);
			counterWin = counterWin + 1;
	 		showWinner.innerHTML = 	'Win ' + counterWin;
	 		reset();
	 	}
	 	else {
	 		if( guessesleft === 0) {
	 			reset();
	 		}
	 	}
	 }

	return {
		//This function is run whenever the user presses a key		
		handleKeyPress: function(event) {
			//Check if the key pressed by the user is in the chosen Words
			var isAlpha = (event.key.match(/^[A-Za-z]{1}$/) !== null);

			if (isAlpha){
				var index = chosenWord.indexOf(event.key);
				console.log(event.key);

				//Check if the key value exists
				if( index > -1  ) {
					handleValidKeyPress(index, event); 
				} 
				else {
					handleInvalidKeyPress(event);
				}

				//Check if user wins or lose
				winLoseChecker();
			}
		},
    } 
}