//Coding quiz JS - Nicholas krilis

// Global variables
let quizQuestionField = document.querySelector("#quiz-question");
let startButton = document.querySelector("#start-quiz");
let quizOptions = document.querySelector("#quiz-buttons");
let title = document.querySelector("#quiz-heading");
let timeEl = document.querySelector("#time");
let scoreEl = document.querySelector("#scores");
let clearEl = document.querySelector("#clear-scores");

let secondsLeft;

let quizCount = 0;
let score = 0;

let userList = [];

function users(name, highScore)
{
    this.name = name;
    this.highScore = highScore;
}

let quizBank = [
{
    question : "Inside which HTML element do we put the JavaScript?",
    answer : "script",
    choices : ["scripting","javascript","script","js"]
},
{
    question : "Where is the correct place to insert a JavaScript?",
    answer : "End of body tag",
    choices : ["In the head tag","End of body tag","In the header","In a div tag"]
},
{
    question : "The external JavaScript file must contain the \<script\> tag.",
    answer : "True",
    choices : ["True","False"]
},
{
    question : "How do you create a function in JavaScript?",
    answer : "function myFunction()",
    choices : ["function myFunction()" , "function = myFunction()" , "function:myFunction()" , "function.myFunction()"]
},
{
    question : "How do you call a function named 'myFunction'?",
    answer : "myFunction()",
    choices : ["function call myFunction()" , "myFunction.myFunction()" , "myFunction()" , "call myFunction()"]
},
{
    question : "How to write an IF statement in JavaScript?",
    answer : "if(i===5)",
    choices : ["if i = 5" , "if(i===5)" , "condition.if i == 5" , "if {i=5}"]
},
{
    question : "How to write an IF statement for executing some code if 'i' is NOT equal to 5?",
    answer : "if(i != 5)",
    choices : ["if i !< 5" , "if(i not 5)" , "if(i <> 5)" , "if(i != 5)"]
},
{
    question : "How does a WHILE loop start?",
    answer : "while (i <= 10)",
    choices : ["while (i <= 10; i++)" , "while (i <= 10)" , "while i <= 10" , "while i to 10"]
},
{
    question : "How do you round the number 7.25, to the nearest integer?",
    answer : "Math.round(7.25)",
    choices : ["rnd(7.25)" , "round(7.25)" , "Math.round(7.25)" , "JSON.parse(7.25)"]
},
{
    question : "JavaScript is the same as Java.",
    answer : "False",
    choices : ["True","False"]
},
];

// When the clear button is pressed remove local storage items
clearEl.addEventListener("click", function(){
    localStorage.clear();
    generateHighscores();
});
// When clicked start the quiz
startButton.addEventListener("click", startQuiz);
// When clicked start the timer
startButton.addEventListener("click", setTime);


function setTime() 
{
    secondsLeft = 120;
    // Sets interval in variable
    var timerInterval = setInterval(function() 
    {
      secondsLeft--;
      timeEl.textContent = "Available time: " + secondsLeft;
  
      if(secondsLeft === 0 ) 
      {
        // Stops execution of action at set interval
        clearInterval(timerInterval);

        document.querySelectorAll('.question').forEach(item => item.remove());

        // Calls function to create and append image
       displayScore();
      }
      else if(quizCount >= quizBank.length)
      {
        clearInterval(timerInterval);
      }
  
    }, 1000);
  }
  

function startQuiz()
{
    document.querySelector("h2").textContent = "Coding Quiz";
    // Remove the start quiz button
    startButton.remove(startButton);

    title.textContent = "";

    //Remove each question choice button
    document.querySelectorAll('.question').forEach(item => item.remove());

    if(quizCount < quizBank.length)
    {
        quizQuestionField.textContent = quizBank[quizCount].question;

        // Create a button for every question choice
        for(let i = 0; i < quizBank[quizCount].choices.length; i ++)
        {
            const btn = document.createElement("button");
            btn.classList.add("question", "btn" , "btn-primary" , "mb-2" , "pt-2" , "pb-2");
            btn.innerHTML = quizBank[quizCount].choices[i];
            quizOptions.appendChild(btn)
        }

        checkAnswer();
    }
    else
    {
        displayScore();
    }

}

function checkAnswer()
{
    // This will iterate through every element with the class name question and
    // add a event listener so I can store the selection after it's clicked
    document.querySelectorAll('.question').forEach(item => {
        item.addEventListener('click', event => 
        {
          if(item.innerHTML === quizBank[quizCount].answer)
          {
            console.log("correct");
            quizCount ++;
            score ++;
            startQuiz();
          }
          else
          {
            console.log("incorrect");
            quizCount ++;
            secondsLeft = secondsLeft - 5;
            startQuiz();
          }

        })
      })
    
}

function displayScore()
{
    // Conditional statement for how the quiz ended
    if(secondsLeft === 0)
    {
        title.textContent = "Out of Time";
    }
    else
    {
        title.textContent = "Congragulations You Finished with Time to Spare!";
    }

    quizQuestionField.textContent = "Your score is: "+ Math.round((score/quizBank.length)*100) + "%";

    // Create an input field for user's name
    let nameField = document.createElement("input");
    nameField.classList.add("input-group" , "mb-3");
    nameField.setAttribute("type","text");
    nameField.setAttribute("id","name");
    nameField.classList.add('name');

    // Add the input field to the html
    quizOptions.appendChild(nameField);

    // Create a button element
    let confirm = document.createElement("button")
    confirm.classList.add("btn" , "btn-primary");
    confirm.textContent = "Save your Highscore and Play again";
    confirm.setAttribute("type", "submit");

    // Add the button to the html
    quizOptions.appendChild(confirm);

    // Save the user's name and score when button is clicked
    confirm.addEventListener("click", function()
    {
        let nameEntered = document.getElementById("name").value;

        if(nameEntered != "")
        {
            userList.push(new users(nameEntered, score));

            console.log(nameEntered);
            console.log(JSON.stringify(userList));

            localStorage.setItem("user", JSON.stringify(userList))

            quizCount = 0;
            score = 0;
            confirm.remove(confirm);
            nameField.remove(nameField);
            generateHighscores();
            startQuiz();
        }
        else
        {
            alert("Please enter a name!")
        }
    })

    confirm.addEventListener("click", setTime);

}

function generateHighscores()
{
    // remove elements from list to prevent duplicates
    document.querySelectorAll('.alert').forEach(item => item.remove());

    let scoreList = JSON.parse(localStorage.getItem("user"));

    // iterate through each object in storage and append the data to highscores area
    for(let i = 0; i < scoreList.length; i ++)
    {
        const scoreElement = document.createElement("div");
        scoreElement.classList.add("alert", "alert-primary");
        scoreElement.setAttribute("role" , "alert");
        scoreElement.textContent = scoreList[i].name + "  " + Math.round((scoreList[i].highScore/quizBank.length)*100) + "%";
        scoreEl.appendChild(scoreElement);
    }
}