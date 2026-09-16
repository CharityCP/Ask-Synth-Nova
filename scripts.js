let rows =[];

console.log("JavaScript is connected!");
fetch("data/synth.csv")
.then(function(response) {
	
	console.log("CSV RESPONSE:");
	console.log(response);
	return response.text();
})
.then(function(csvText){
	console.log("CSV DATA:");
	console.log(csvText);
	
	rows = csvText.split("\n");
	let result = searchSynthData(" Synth Nova", rows);
	
	console.log("SEARCH RESULT:");
	console.log(result);
	
	console.log("CSV ROWS:");
	console.log(rows);
	
	console.log("FIRST ROW:");
	console.log(rows[0]);
	
	console.log("SECOND ROW:");
	console.log(rows[1]);
	
	console.log("NUMBER OF ROWS:");
	console.log(rows.length);
});

function parseCSVRow(row) {
	
	let fields =[];
	let currentField = "";
	let insideQuotes = false;
	
	for (let i = 0; i < row.length; i++) {
		
		let character = row[i];
		if (character === '"') {
			insideQuotes = !insideQuotes;
			} else if (character === "," && insideQuotes === false) {
			fields.push(currentField);
			currentField = "";
			
			} else {
			currentField += character;
		} 
	}
	// end for loop
		fields.push(currentField);
		return fields;
}

function searchSynthData(question, rows){
	
	let searchQuestion = question.toLowerCase();
	for (let i= 1; i < rows.length; i++) {
		let currentRow = rows[i].toLowerCase();
		if (currentRow.includes(searchQuestion)) {
			let fields = parseCSVRow(rows[i]);;
			
			console.log("MATCHING FIELDS:");
			console.log(fields);
			return fields;
		}
	}
	return "Icould not locate that information in the Nova Archive.";
}

function cleanQuestion(question) {
	
	let cleanedQuestion = question.toLowerCase();
	
	cleanedQuestion = cleanedQuestion.replace("who is","");
	cleanedQuestion = cleanedQuestion.replace("what is","");
	cleanedQuestion = cleanedQuestion.replace("?","");
	
	return cleanedQuestion.trim();
}

// Connect JavaScript to HTML elements//
const questionInput = document.getElementById("questionInput");
const submitQuestion = document.getElementById("submitQuestion");
const novaResponse = document.getElementById("novaResponse");

submitQuestion.addEventListener("click", function() {
	let question = questionInput.value;
	
	console.log("USER QUESTION");
	console.log(question);
	
	let cleanedQuestion = cleanQuestion(question);
	console.log("CLEANED QUESTION:", cleanedQuestion);
	
	let result = searchSynthData(cleanedQuestion, rows);
	novaResponse.textContent = result;
});