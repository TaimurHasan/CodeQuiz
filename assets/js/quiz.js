var mainBody = document.querySelector("#main-body")
var quizBtn = document.querySelector(".quiz-btn");
var timer = document.querySelector("#timer");
var time = 75;
var questionNumber = 0;

//creating array to hold objects for each quiz question
var questions = [
    {
        "question": "Commonly used data types do NOT include:",
        "choices": ["Strings", "Booleans", "Alerts", "Numbers"],
        "correctChoice": "Alerts"
    },
    {
        "question": "Commonly used data types do sdfSDFdf include:",
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
            if(time > 0) {
                timer.textContent = "Time: " + time;
                time--;
            } else if (time <= 0) {
                clearInterval(timeInterval);
                time = 0;
                timer.textContent = "Time: " + time;
            }
        }, 1000
    )
}


//function to start the quiz
var quizStart = function () {
    cleanUp();
    timerStart();
    quizCreator(questionNumber);
}

var quizCreator = function (questionNumber) {
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
        targetEl = "";
        targetData = "";
        var correctHeader = document.createElement("h2");
        correctHeader.className = "question-response correct";
        correctHeader.textContent = "CORRECT!"

        mainBody.appendChild(correctHeader);
        questionNumber++;
        setTimeout(quizStart, 2000);
    } else if (targetData === "incorrect") {
        var correctHeader = document.createElement("h2");
        correctHeader.className = "question-response incorrect";
        correctHeader.textContent = "INCORRECT!"

        mainBody.appendChild(correctHeader);

        time = time - 10;
    }
    
};
//add click event listener to the quiz button to start functions
quizBtn.addEventListener("click", quizStart);
mainBody.addEventListener("click", quizChecker);

