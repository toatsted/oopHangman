class Letter{
	constructor(char){
		this.char = char;
		this.on = char === " ";
	}

	show(){
		return (this.on) ? this.char : "-";
	}

	check(char){
		if(this.char === char){
			this.on = true;
			return true;
		}
		return false;
	}
}

module.exports = Letter;
