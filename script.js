var nmbr = document.querySelectorAll(".number");
var sgn = document.querySelectorAll(".sign");
var brckt = document.querySelectorAll(".bracket");
var screenText = document.getElementById("screentext");	
for(var i = 0 ; i < nmbr.length ; i++) {
	nmbr[i].addEventListener("click", function() {
		var txt = screenText.textContent;
		if(txt[txt.length-1] != ")") {
		    screenText.textContent += this.textContent;
		}	
	});
}
for(var i = 0 ; i < sgn.length ; i++) {
	sgn[i].addEventListener("click", function() {
		var txt = screenText.textContent;
		if(txt !== "" && txt[txt.length-1] !== " " && txt[txt.length-1] !== "(") {
		    screenText.textContent += " " + this.textContent + " ";
	    }
	});
}
brckt[0].addEventListener("click", function() {
	var txt = screenText.textContent;
	if(txt[txt.length-1] === " " || txt[txt.length-1] === "(") {
	    screenText.textContent += this.textContent;
    }
});
brckt[1].addEventListener("click", function() {
	var txt = screenText.textContent;
	if(txt[txt.length-1] !== " ") {
	    screenText.textContent += this.textContent;
    }
});
var stringSolver = function(problem) {
	//breaking the string into numbers and signs
	var numbers = [];
	var signs = ["+"];
	var temp = "";
	var probLength = problem.length;
	for(var i = 0 ; i < probLength ; i++) {
		var flag;
		if(!isNaN(parseInt(problem[i])) || problem[i] === ".") {
			temp += problem[i];
			flag = true;
		}
		else {
			if(flag === true) {
			    numbers.push(parseFloat(temp));
			    temp = "";
			    flag = false;
			}
			if(problem[i] === "+" || problem[i] === "-" || problem[i] === "*" || problem[i] === "/") {
				signs.push(problem[i]);
			}
		}
	}
	numbers.push(parseFloat(temp));
	console.log(numbers);
	console.log(signs);
	//solving the question using the numbers array and signs array
	var answer = 0;
	var length = numbers.length;
	for (var i = 0 ; i < length ; i++) {
		if(signs[i]==="/") {
			numbers[i-1] /= numbers[i];
			numbers[i-1] = parseFloat(numbers[i-1].toFixed(3));
			numbers.splice(i,1);
			signs.splice(i,1);
			length--;
			i--;
		}
	}
	for (var i = 0 ; i < length ; i++) {
		if(signs[i]==="*") {
			numbers[i-1] *= numbers[i];
			numbers[i-1] = parseFloat(numbers[i-1].toFixed(3));
			console.log(numbers[i-1]);
			numbers.splice(i,1);
			signs.splice(i,1);
			length--;
            i--;  	
    	}
	}
	for (var i = 0 ; i < length ; i++) {
		if(signs[i]==="+") {
			answer += numbers[i];
		}
		else {
			answer -= numbers[i];
		}
	}
	return answer;
}
var bracketSeperator = function(question) {
	var len = question.length;
	var numOfBrackets = 0;
	for(var i = 0 ; i < len ; i++) {
		if(question[i] === "(") {
			numOfBrackets++;
		}
	}
	var bracketsClosed = 0;
	for(var i = 0 ; i < len ; i++) {
		if(question[i] === ")") {
			bracketsClosed++;
		}
	}
	if (screenText.textContent === "") {
		screenText.textContent = "Enter an Expression";
	}
	else if(numOfBrackets === 0) {
		screenText.textContent = stringSolver(question);
	}
	else if (numOfBrackets !== bracketsClosed) {
		screenText.textContent = "Wrong Expression";
	}
	else {
	    for(var i = 0 ; i < numOfBrackets ; i++) {
	        var length = question.length;
	        var bracketOpen = [];
	        var bracketClose = [];
            for(var j = 0 ; j < length ; j++) {
		        if(question[j] === "(") {
			        bracketOpen.push(j);
	    	    }
		        if(question[j] === ")") {
			        bracketClose.push(j);
		        }
	        }
		    for(var j = 0 ; bracketOpen[j] < bracketClose[0] ; j++);
		    j--;
		    var temp = question.slice(bracketOpen[j]+1,bracketClose[0]);
		    var part = stringSolver(temp);
		    var left = question.substring(0, bracketOpen[j]-1);
		    var right = question.substring(bracketClose[0]+1);
		    question = left + " " + part + right;
		    screenText.textContent = stringSolver(question);
	    }
	}
}
document.getElementById("equal").addEventListener("click", function() {bracketSeperator(screenText.textContent);});
var clearOne = function() {
	var txt = screenText.textContent;
	if(txt[txt.length-1] === " ") {
		txt = txt.substring(0, txt.length-3);
	    screenText.textContent = txt;
	}
	else {
		txt = txt.substring(0, txt.length-1);
		screenText.textContent = txt;
	}
}
var clearAll = function() {
	screenText.textContent = "";
}
document.getElementById("clearone").addEventListener("click", clearOne);
document.getElementById("clearall").addEventListener("click", clearAll);