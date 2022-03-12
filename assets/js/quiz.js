var mainBody = document.querySelector("#main-body")
var quizBtn = document.querySelector(".quiz-btn");
var timer = document.querySelector("#timer");
var time = 0;

//creating array to hold objects for each quiz question
var questions = [
    {
        "question": "Commonly used data types do NOT include:",
        "choices": ["Strings", "Booleans", "Alerts", "Numbers"],
        "correct-choice": "3. Alerts"
    }
];

// clean up function to remove existing html from main section
var cleanUp = function() {
    console.log(mainBody);
    mainBody.innerHTML = "";
}

//function to start timer 
var timerStart = function () {
   
    time = 75;
    // time interval with function that will decrement time variable by 1 every second
    var timeInterval = window.setInterval(
        function () {
            if(time > 0) {
                timer.textContent = "Time: " + time;
                time--;
            } else {
                clearInterval(timeInterval);
            }
        }, 1000
    )
}


//function to start the quiz
var quizStart = function () {
    cleanUp();
    quizCreator();
}

var quizCreator = function () {
    //create div to hold question heading and choice list
    var quizDivEl = document.createElement("div");
    quizDivEl.className = "quiz-page";
    
    //create question heading
    var quizHeadEl = document.createElement("h2");
    quizHeadEl.textContent = questions[0].question;
    
    //for loop to create choice list
    var quizListEl = document.createElement("ol");

    for (var i = 0; i < questions[0].choices.length; i++) {
        var listItemEl = document.createElement("li");
        listItemEl.className = "quiz-btn";
        listItemEl.textContent = questions[0].choices[i];
        quizListEl.appendChild(listItemEl);
    }


    quizDivEl.appendChild(quizHeadEl);
    quizDivEl.appendChild(quizListEl);

    mainBody.appendChild(quizDivEl);

}

//add click event listener to the quiz button to start functions
quizBtn.addEventListener("click", quizStart);

