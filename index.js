const inquirer = require("inquirer");
const Word = require("./Word.js");

let words = ["computer", "hacker", "matrix", "keyboard", "javascript", "node",
	"vim", "html", "css", "laptop", "bootcamp", "sublime", "github", "bootstrap",
	"array", "string", "integer", "boolean", "random", "hangman", "linux"];
let item;

const startingLives = 7;
let lives;

let guesses;

function start(){
	item = new Word(words[Math.floor(Math.random() * words.length)]);
	lives = startingLives;	
	guesses = [];
	guess();
}

function repeat(){
	inquirer.prompt([{
			name: "repeat",
			type: "confirm",
			message: "Play again?"
	}])
	.then(answer => {
		if(answer.repeat) start();
	})
	.catch(err => console.log(err))
}

function guess(){
	if(lives > 0){
		console.log("\033c" + "Lives: " + lives);
		console.log(`
			${item.display().join(" ")}
			: ${guesses.join("-")}
		`)
		inquirer.prompt([{
				name: "char",
				message: ": ",
				validate: answer => {
					if(isNaN(parseInt(answer))){
						if(answer.length === 1){
							return true;
						}
						return "enter one letter";
					}
					return "enter a letter";
				}
		}])
		.then(answer => {
			console.log(guesses.indexOf(answer.char));
			if(!item.guess(answer.char.toLowerCase()) &&
				guesses.indexOf(answer.char) < 0){
				guesses.push(answer.char);
				lives--;
			}
			if(item.isDone()){
				console.log("\033c" + "Lives: " + lives + `

			${item.display().join(" ")}
			You won!`);
				repeat();
				return;
			}
			console.log("\n");
			guess();
		})
		.catch(err => console.log(err))
	} else {
		console.log('\033c' + "Lives: 0" + `

			${item.wordString.split("").join(" ")}
			You Lost!`);
		repeat();		
	}

}

start();