var mainBody = document.querySelector("#main-body")
var quizBtn = document.querySelector("#start-btn");
var timer = document.querySelector("#timer");
var time = 5;
var questionNumber = 0;
var timeScore = "";

//creating array to hold objects for each quiz question
var questions = [
    {
        "question": "Commonly used data types do NOT include:",
        "choices": ["Strings", "Booleans", "Alerts", "Numbers"],
        "correctChoice": "Alerts"
    },
    {
        "question": "The condition in an if/else statement is enclosed in:",
        "choices": ["Quotes", "Parenthesis", "Curly Brackets", "Square Brackets"],
        "correctChoice": "Parenthesis"
    },
    {
        "question": "BLA BLA:",
        "choices": ["Strings", "Booleans", "Alerts", "Numbers"],
        "correctChoice": "Alerts"
    }
];

// clean up function to remove existing html from main section
var cleanUp = function() {
    mainBody.innerHTML = "";
}

//function to start timer 
var timerStart = function () {
   
    // time interval with function that will decrement time variable by 1 every second
    var timeInterval = window.setInterval(
        function () {
                if(time > 0 && questionNumber < questions.length) {
                    timer.textContent = "Time: " + time;
                    time--;
                } else if (time <= 0 && questionNumber < questions.length) {
                    clearInterval(timeInterval);
                    timer.textContent = "Time: " + time;
                    alert("You have run out of time!");
                    endGame();
                }
            }, 1000
    )
}


//function to start the quiz
var quizStart = function () {
    cleanUp();
    if(questionNumber < questions.length) {
        quizCreator(questionNumber);
    } else {
        console.log("finish");
        endGame();
    }
    
}

var endGame = function() {
    cleanUp();
    //save time as score
    timeScore = Math.max(0, time);

    time = 0;
    timer.textContent = "Time: " + time;
    console.log(timeScore);
    
    var endDivEl = document.createElement("div");
    endDivEl.className = "quiz-page";

    var endHeadEl = document.createElement("h2");
    endHeadEl.textContent = "All Done!"

    // create form to store
    var endFormEl = document.createElement("form");
    endFormEl.className = "end-form";
    endFormEl.innerHTML = "<label>Enter Initials</label><input type='text'></input><button type='button' class='quiz-btn' id='submit-score'>SUBMIT</button>"

    endDivEl.appendChild(endHeadEl);
    endDivEl.appendChild(endFormEl);
    mainBody.appendChild(endDivEl);

    var submitBtn = document.querySelector("#submit-score");
    console.log(submitBtn);
    submitBtn.addEventListener("click", submitScore);
}

var submitScore = function () {

    console.log(timeScore);
    localStorage.setItem("score", timeScore);
}

var quizCreator = function (questionNumber) {
    //start timer only on first question
    if(questionNumber === 0) {
        timerStart();
    }
    
    //prevent next questions from loading if time has run out
    if(time === 0) {
        endGame();
        return false;
    }

    //create div to hold question heading and choice list
    var quizDivEl = document.createElement("div");
    quizDivEl.className = "quiz-page";
    
    //create question heading
    var quizHeadEl = document.createElement("h2");
    quizHeadEl.textContent = questions[questionNumber].question;
    
    //for loop to create choice list
    var quizListEl = document.createElement("ol");
    quizListEl.className = "quizList";

 
    for (var i = 0; i < questions[questionNumber].choices.length; i++) {
        var listItemEl = document.createElement("li");
        listItemEl.className = "quiz-btn";
        listItemEl.textContent = questions[questionNumber].choices[i];
        //add data-attribute to list to assing correct status to the right answer
        if (questions[questionNumber].choices[i] === questions[questionNumber].correctChoice) {
            listItemEl.setAttribute("data-correct", "correct");
        } else {
            listItemEl.setAttribute("data-correct", "incorrect");
        }

        quizListEl.appendChild(listItemEl);
    }


    quizDivEl.appendChild(quizHeadEl);
    quizDivEl.appendChild(quizListEl);

    mainBody.appendChild(quizDivEl);

}

var quizChecker = function (event) {
    //if chosen button has data attribute of correct, say correct and set timeout to go to next question
    //if not, then remove 10 seconds from timer and move on
    var targetEl = event.target;
    var targetData = targetEl.getAttribute("data-correct");
    
    if (targetData === "correct") {
        var correctHeader = document.createElement("h2");
        correctHeader.className = "question-response correct";
        correctHeader.textContent = "CORRECT!"

        mainBody.appendChild(correctHeader);
        questionNumber++;
        setTimeout(quizStart, 1000);
    } else if (targetData === "incorrect") {
        var correctHeader = document.createElement("h2");
        correctHeader.className = "question-response incorrect";
        correctHeader.textContent = "INCORRECT!"

        mainBody.appendChild(correctHeader);
        time = time - 10;
        questionNumber++;
        setTimeout(quizStart, 1000);
    }
    
};
//add click event listener to the quiz button to start functions
quizBtn.addEventListener("click", quizStart);
mainBody.addEventListener("click", quizChecker);

