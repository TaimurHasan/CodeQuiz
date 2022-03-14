var mainBody = document.querySelector("#main-body");
var scorePage = document.querySelector("#display-scores");
var quizBtn = document.querySelector("#start-btn");
var timer = document.querySelector("#timer");
var time = 75;
var questionNumber = 0;
var timeScore = "";
var savedScores = [];

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
        "question": "Arrays in JavaScript can be used to store:",
        "choices": ["Numbers and Strings", "Other Arrays", "Booleans", "All of the above"],
        "correctChoice": "All of the above"
    },
    {
        "question": "String values must be enclosed within ______ when being assigned to variables",
        "choices": ["Commas", "Curly Brackets", "Quotes", "Parenthesis"],
        "correctChoice": "Quotes"
    },
    {
        "question": "A very useful tool used during development and debugging for printing content to the debugger is:",
        "choices": ["JavaScript", "Terminal Bash", "for loops", "console.log"],
        "correctChoice": "console.log"
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
    if(questionNumber === 0) {
        timerStart();
    }
    cleanUp();
    if(questionNumber < questions.length) {
        quizCreator(questionNumber);
    } else {
        console.log("finish");
        endGame();
    }
    
}

var endGame = function() {
    mainBody.removeEventListener("click", quizChecker);
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

    var endPEl = document.createElement("p");
    endPEl.innerHTML = "Thank you for taking on the Coding Quiz Challenge! <br/> Your score was " + timeScore + ". Enter in your initials to save your highscore!"

    // create form to store
    var endFormEl = document.createElement("form");
    endFormEl.className = "end-form";
    endFormEl.innerHTML = "<label>Enter Initials</label><input type='text' name='initials'></input><button type='submit' class='quiz-btn' id='submit-score'>SUBMIT</button>"

    endDivEl.appendChild(endHeadEl);
    endDivEl.appendChild(endPEl);
    endDivEl.appendChild(endFormEl);
    mainBody.appendChild(endDivEl);

    var submitBtn = document.querySelector(".end-form");
    
    submitBtn.addEventListener("submit", submitScore);
}

var submitScore = function (event) {
    event.preventDefault();
    console.log(timeScore);
    var scoreNameInput = document.querySelector("input[name='initials']").value;
    console.log(scoreNameInput);

    // force user to enter a name for saving their score
    if (!scoreNameInput) {
        alert("The initials field cannot be blank. Please enter your initials!");
    } else {

        loadScores();

        var scoreId = savedScores.length + 1;
        var scoreObj = {
            name: scoreNameInput,
            score: timeScore,
            id: scoreId
        }

        savedScores.push(scoreObj);
        // sort by higher score
        savedScores.sort(function(a,b) {return (b.score - a.score)})
        console.log(savedScores);
        localStorage.setItem("score", JSON.stringify(savedScores));

        displayScores();
    };
}

var loadScores = function () {
    savedScores = localStorage.getItem("score", savedScores);

    if(!savedScores) {
        savedScores = [];
        return false;
    }

    savedScores = JSON.parse(savedScores);
}

var displayScores = function () {
    cleanUp();
    loadScores();
    console.log(savedScores);


    var scoreDivEl = document.createElement("div");
    scoreDivEl.className = "score-list";
    var scoreHeadEl = document.createElement("h1");
    scoreHeadEl.textContent = "Name/High-Score";
    

    var scoreListEl = document.createElement("ol");

    // create highscore list up to max of 10 list items
    for (var i = 0; i < Math.min(10, savedScores.length); i++) {
        var scoreItemEl = document.createElement("li");
        var name = savedScores[i].name
        var score = savedScores[i].score
        scoreItemEl.textContent = name + ": " + score;
        scoreListEl.appendChild(scoreItemEl);
    }

    var homeBtn = document.createElement("p");
    homeBtn.className = "quiz-btn";
    homeBtn.innerHTML = "<a href='./index.html'>Home</a>";



    scoreDivEl.appendChild(scoreHeadEl);
    scoreDivEl.appendChild(scoreListEl);
    scoreDivEl.appendChild(homeBtn);
    mainBody.appendChild(scoreDivEl);
}

var quizCreator = function (questionNumber) {
    //start timer only on first question
    
    
    //prevent next questions from loading if time has run out
    if(time === 0) {
        endGame();
        return false;
    }

    //create div to hold question heading and choice list
    var quizDivEl = document.createElement("div");
    quizDivEl.className = "quiz-page";
    quizDivEl.setAttribute("data-clicked", "no");
    
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
    var quizDiv = document.querySelector(".quiz-page");
    var targetClicked = quizDiv.getAttribute("data-clicked");
    console.log(targetClicked);
    
    // if statement to prevent user from clicking button and running control flow multiple times
    if (targetClicked === "no") {
        if (targetData === "correct") {
            quizDiv.setAttribute("data-clicked", "yes");
            var correctHeader = document.createElement("h2");
            correctHeader.className = "question-response correct";
            correctHeader.textContent = "CORRECT!"

            mainBody.appendChild(correctHeader);
            questionNumber++;
            setTimeout(quizStart, 1000);
        } else if (targetData === "incorrect") {
            quizDiv.setAttribute("data-clicked", "yes");
            var correctHeader = document.createElement("h2");
            correctHeader.className = "question-response incorrect";
            correctHeader.textContent = "INCORRECT!"

            mainBody.appendChild(correctHeader);
            time = time - 10;
            questionNumber++;
            setTimeout(quizStart, 1000);
        }
    }
};
//add click event listener to the quiz button to start functions
quizBtn.addEventListener("click", quizStart);
mainBody.addEventListener("click", quizChecker);
scorePage.addEventListener("click", displayScores);