// Scores à afficher avec le nom sur la page des Meilleurs Scores
const ListeMeilleursScores = document.getElementById("ListeMeilleursScores");
const MeilleursScores = JSON.parse(localStorage.getItem("MeilleursScores")) || [];

ListeMeilleursScores.innerHTML = MeilleursScores
  .map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`;
  })
  .join("");
