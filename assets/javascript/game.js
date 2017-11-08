//Initialize/start game on window load
window.onload =  function () {

	//Create an array of words
	var wordCategory = [
		['tennis', 'badminton', 'soccer', 'basketball', 'football', 'swimming', 'billiards', 'archery', 'bowling', 'boxing'],
		['fish', 'hedgehog', 'dogs', 'cats', 'rabbits', 'snake', 'hamster', 'pigs', 'birds', 'ferrets'],
		['vegetable', 'fruits', 'pizza', 'burrito', 'steak', 'pasta', 'turkey', 'meat', 'seafood', 'beans']
	];
	
	//function that will output the selected word
	var game = createHangmanGame(wordCategory);

	//Get Users guess key
	document.onkeypress = game.handleKeyPress;
}

//function that will output the selected word 
//function createHangmanGame(words) {
function createHangmanGame(wordCategory) {

	//Choose word ramdonly
	var chosenWord;						
	var rightGuessCounter;
	var guessesleft;
	var counterWin = 0;	
	var underscoredGuessedWord;        //number of letters in the chosen word
	var wrongKeys;
	var letterPosition;

	//DOM Manipulation
	var underscoreHtmlElement = document.getElementById('underscore');
	var showNumGuessleft = document.getElementById('numguessleft');
	var showGuessLetterHTMLElement = document.getElementById('guessletters');
	var showWinner = document.getElementById('winner');

	reset();

	function reset() {
		//Ramdomize category from wordCategory
		var randomNum = Math.floor(Math.random() * wordCategory.length);
		var category = wordCategory[randomNum];

		//Ramdomize word in the selected category
		randomNum = Math.floor(Math.random() * category.length );		
		chosenWord = category[randomNum];

		console.log(chosenWord);
		rightGuessCounter = 0;
		guessesleft = 10;
		
		underscoredGuessedWord = generateGuessedWord(chosenWord, '_'); 
		wrongKeys = [];
		letterPosition = {};
		storeLetterPos();

	    //create underscore based on the length of word
		underscoreHtmlElement.innerHTML = underscoredGuessedWord.join(' ');
		showNumGuessleft.innerHTML = 'NUMBER OF GUESSES REMAINING IS ';
		showGuessLetterHTMLElement.innerHTML = 'LETTERS ALREADY GUESS ';
	}

	//Store indeces of each letter position on chosen word   
	function storeLetterPos() {
		for (var i = 0; i < chosenWord.length; i++ ) {
			var arrayOfIndexes = letterPosition[chosenWord[i]];
			if (arrayOfIndexes === undefined) {
				letterPosition[chosenWord[i]] = [];
			}
			letterPosition[chosenWord[i]].push(i);
		}
	}

	function generateGuessedWord(word, separator)  {
		var guessedWord = [];
		for(var i = 0; i < word.length; i++) {
			guessedWord.push(separator);
		}
		return guessedWord;
	}
		
	//Processing of all the valid keys
	function handleValidKeyPress(indeces, event) {
	
		//check if event keys are already in the indeces of array 
		
		if (underscoredGuessedWord.indexOf(event.key) === -1) {
    		
    		//add to right words array
			for(var i = 0; i < indeces.length; i++) {
				underscoredGuessedWord[indeces[i]] = event.key;
				rightGuessCounter++;
		    }
		    //Put all the correct guessed letter keys in place of the underscore
			underscoreHtmlElement.innerHTML = underscoredGuessedWord.join(' ');
    	}
	}

	//Processing all the invalid keys 
	function handleInvalidKeyPress(event) {

		//Check if an invalid letter key is pressed again
		if (wrongKeys.indexOf(event.key) === -1) {

			//Lists of all the invalid letters guessed
			wrongKeys.push(event.key);
		
			//Compile all the incorrect letter keys guessed
			showGuessLetterHTMLElement.innerHTML = 'LETTERS ALREADY GUESS ' + wrongKeys.join(' ').toUpperCase();

			//Check the number of Guess Remaining 
			if (wrongKeys.length <= 10) {
				guessesleft = guessesleft - 1; 
				showNumGuessleft.innerHTML = 'NUMBER OF GUESSES REMAINING IS: ' + guessesleft ;
			}
		}
	}

	//win or lose processing
	function winLoseChecker() {
		if( chosenWord.length === rightGuessCounter ) {
			counterWin = counterWin + 1;
	 		showWinner.innerHTML = 	'WIN ' + counterWin;
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

			if (isAlpha) {

				var indeces= letterPosition[event.key];

				//Check if the key value exists
				if( indeces ) {
					handleValidKeyPress(indeces, event); 
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