//Moyen plus rapide pour donner la valeur
const nom = document.getElementById("nom");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const ScoreFinal = document.getElementById("ScoreFinal");
const ScoresRecents = localStorage.getItem("ScoresRecents");
// const donne une valeur nom modifiable pendant l'execution du site
const MeilleursScores = JSON.parse(localStorage.getItem("MeilleursScores")) || [];
// transformation de la valeur avant de l'enregistrer
const MAX_HIGH_SCORES = 5;

ScoreFinal.innerText = ScoresRecents;
//rassemblement des valeurs dans ScoreFinal dans ScoresRecents
nom.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !nom.value;
});
// il faut écrire son nom pour pouvoir l'enregistrer
saveMeilleurScore = e => {
  console.log("Cliquez sur le bouton Sauvegarder");
  e.preventDefault();
//Calcul du score + sauvegarde du score
  const score = {
    score: ScoresRecents,
    name: nom.value
  };
  MeilleursScores.push(score);
  MeilleursScores.sort((a, b) => b.score - a.score);
  MeilleursScores.splice(5);

  localStorage.setItem("MeilleursScores", JSON.stringify(MeilleursScores)); //convertion du valeur MeilleursScores en json
  window.location.assign("index.html");
};
