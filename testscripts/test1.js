const { data } = require("./data.js");
const trials = 100000;
const samples = 100;

console.log("Starting...");
console.time("Test Random Index");
testRandomIndex();
console.timeEnd("Test Random Index");
console.time("Test Shuffle");
testShuffle();
console.timeEnd("Test Shuffle");


function testRandomIndex(){
	for(let i = 0; i < trials; i++){
		let n = {};
		let i = 0;
		let f = 0;
		while(i < samples){
			let index = Math.floor(Math.random() * data.length);
			if(!n[index]){
				n[index] = true;
				if (!data[index]) f++;
				i++;
			}
		}
	}
}

function testShuffle(){
	for(let i = 0; i < trials; i++){
		let n = shuffle(data);
		let f = 0;
		for (let i = 0; i < samples; i++) {
			if (!n[Math.floor(Math.random() * n.length)]) f++;
		}
	}
}



function shuffle(array) {
	let currentIndex = array.length,
		randomIndex;

	// While there remain elements to shuffle...
	while (currentIndex != 0) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
	}

	return array;
}

