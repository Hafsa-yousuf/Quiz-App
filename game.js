const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text")); // convert collection into array
const progressText = document.getElementById("progress-text");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressbarfull");
const loader = document.getElementById("loader");
const game = document.getElementById("game");

// now we are making some variables:
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

/* // fetching question from the local json file. cut the question element from the file and put it into question.json file and here we are fecthing the question from it.
// In json file key in the object should be in quotation mark
let questions = [];
fetch("Question.json")
    .then((Response) => {
        // console.log(Response.status);
        // console.log(Response.ok);
        return Response.json();
    }).then((loadedquestions) => {
        console.log(loadedquestions);
        questions = loadedquestions;
        startGame(); // here we are loading our game after fatching the question.
    })
    .catch((error) =>{
    console.log("Fetch Error" , error)
    });  */

// now we are fetching questions from the  external Api called "open Trivia"
let questions = [];
fetch(
  "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple"
)
  .then((Response) => {
    return Response.json();
  })
  .then((loadedquestions) => {
    console.log(loadedquestions.results);
    questions = loadedquestions.results.map((loadedquestion) => {
      const formattedQuestion = {
        question: loadedquestion.question,
      };

      const Answerchoices = [...loadedquestion.incorrect_answers];
      formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
      // Insert the correct answer into a random position (1–4) inside the answer choices array.
      // `formattedQuestion.answer` is a 1-based index (user-facing), so subtract 1 to get the correct array index (0-based).
      // The splice inserts the correct answer without removing any existing items.
      Answerchoices.splice(
        formattedQuestion.answer - 1,
        0,
        loadedquestion.correct_answer
      );

      Answerchoices.forEach((choice, index) => {
        formattedQuestion["choice" + (index + 1)] = choice;
      });
      return formattedQuestion;
    });
    startGame();
  })
  .catch((error) => {
    console.log("Fetch Error", error);
  });

//Making constants
const correct_Bonus = 10; // when user give the correct answer it will get 10 points as bonus
const max_Questions = 3;

const startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
  game.classList.remove("hidden");
  loader.classList.add("hidden");
};

const getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= max_Questions) {
    localStorage.setItem("MostRecentScore", score);
    //go to the end page
    return window.location.assign("./end.html");
  }
  questionCounter++;
  progressText.innerHTML = `Question ${questionCounter}/${max_Questions}`;

  //update the progress bar//
  progressBarFull.style.width = `${(questionCounter / max_Questions) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset.number;
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionIndex, 1); // It deletes the question that was presented. It is used to avoid repetition.
  console.log(availableQuestions);
  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedchoice = parseInt(e.target.dataset.number);

    const Answerchoice =
      selectedchoice === currentQuestion.answer ? "correct" : "incorrect";
    if (Answerchoice === "correct") {
      incrementScore(correct_Bonus);
    }
    //console.log(Answerchoice);

    // Optional: Add visual feedback.
    e.target.parentElement.classList.add(Answerchoice);

    setTimeout(() => {
      e.target.parentElement.classList.remove(Answerchoice);
      getNewQuestion();
    }, 1000);
  });
});

const incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};
