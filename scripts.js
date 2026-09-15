console.log("JavaScript is connected!");
fetch("data/synth.csv")
.then(function(response) {
	
	console.log("CSV RESPONSE:");
	console.log(response);
});