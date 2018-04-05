let inquirer = require("inquirer");
let Word = require("./Word.js");

let words = ["computer", "hacker", "matrix", "keyboard", "javascript", "node",
	"vim", "html", "css", "laptop", "bootcamp", "sublime", "github", "bootstrap",
	"array", "string", "integer", "boolean", "random", "hangman", "linux"];
let item = new Word(words[Math.floor(Math.random() * words.length)]);

function repeat(){
	inquirer.prompt([{
			name: "repeat",
			type: "confirm",
			message: "Play again?"
	}])
	.then(answer => {
		if(answer.repeat){
			lives = 5;
			item = new Word(words[Math.floor(Math.random() * words.length)]);
			guess();
		}
	})
	.catch(err => console.log(err))
}

let lives = 5;
function guess(){
	if(lives > 0){
		console.log('\033c');
		console.log("Lives: " + lives);
		console.log(`
			${item.display().join(" ")}
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
			if(!item.guess(answer.char.toLowerCase()))
				lives--;
			if(item.isDone()){
				console.log("\033c" + "\nLives: " + lives);
				console.log(`
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
		console.log('\033c' + "\nLives: 0")
		console.log(`
			${item.wordString.split("").join(" ")}
			You lost!`)
		repeat();		
	}

}

guess();