var quizBtn = document.querySelector(".quiz-btn");
var timer = document.querySelector("#timer");
var time = 0;

//creating array to hold objects for each quiz question
var questions = [
    {
        "question": "Commonly used data types do NOT include:",
        "choices": ["1. Strings", "2. Booleans", "3. Alerts", "4. Numbers"],
        "correct-choice": "3. Alerts"
    }
];

console.log(questions[0].question);

// clean up function to remove existing html from main section
var cleanUp = function() {
    var mainBody = document.querySelector("#main-body")
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

//add click event listener to the quiz button to start functions
quizBtn.addEventListener("click", timerStart);

