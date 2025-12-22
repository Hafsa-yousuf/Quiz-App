const SaveButton = document.getElementById("saveScoreBtn");
const username = document.getElementById("username");
const MostRecentScore = localStorage.getItem("MostRecentScore") || 0;
const finalscore = document.getElementById("finalscore");

const HighScore = JSON.parse(localStorage.getItem("HighScore")) || [];

finalscore.innerText = MostRecentScore;

const SaveHighScore = (e) => {
  console.log("clicked the save button");
  e.preventDefault(); // Stops the form from submitting
  const score = {
    score: MostRecentScore,
    username: username.value.trim(),
  };

  HighScore.push(score);
  HighScore.sort((a, b) => b.score - a.score);
  HighScore.splice(5);
  localStorage.setItem("HighScore", JSON.stringify(HighScore));
  window.location.assign("./index.html");
  console.log(HighScore);
};

SaveButton.addEventListener("click", SaveHighScore);

// Add Event listner to input box. // Listen for user typing in the input field
username.addEventListener("keyup", () => {
  // console.log(username.value);
  // Enable button only if username is not empty (ignoring spaces)
  SaveButton.disabled = username.value.trim() === "";
});

/// Here we are working for highscore array.
