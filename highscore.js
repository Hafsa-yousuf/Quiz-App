const Highscorelist = document.getElementById("highscoreList");
const Highscore = JSON.parse(localStorage.getItem("HighScore")) || [];

///In JavaScript, .map() is a built-in array method used to create a new array by applying a function to each element of the original array.
Highscorelist.innerHTML = 
Highscore.map(list =>{
    return`<li class = "high-score-list">${list.username} - ${list.score}</li>` ;
})
.join("");
console.log(Highscorelist);