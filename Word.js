let Letter = require("./letter.js");

class Word{
	constructor(word){
		this.wordString = word;
		this.word = []; 
		word.split("").forEach(value => this.word.push(new Letter(value)))
	}

	display(){
		let endWord = [];
		this.word.forEach(value => endWord.push(value.show()))
		return endWord
	}

	guess(char){
		let right = false;
		this.word.forEach(value => {
			if(value.check(char))
				right = true;
		})	
		return right;
	}

	isDone(){
		let done = true;
		this.display().forEach(value => {
			if(value === "-")
				done = false;
		})
		return done;
	}
}

module.exports = Word;