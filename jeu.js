// Mise en place des constantes  
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
const loader = document.getElementById("loader");
const game = document.getElementById("game");
//initialisation des variables ou valeurs
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];
// Mise en place des questions
let questions = [
	{
		question: "Quelle équipe nationale a gagné la Coupe du Monde de Football en 2002?",
		choice1: "La France",
		choice2: "L'Allemagne",
		choice3: "L'Italie",
		choice4: "Le Brésil",
		answer: 4
	},
	{
		question: "Quelle est la capitale du Canada?",
		choice1: "Québec",
		choice2: "Montreal",
		choice3: "Ottawa",
		choice4: "Ontario",
		answer: 3
	},
	{
		question: "Avec quel pays la France partage-t-elle sa plus longue frontière?",
		choice1: "L'Allemagne",
		choice2: "Le Brésil",
		choice3: "L'Espagne",
		choice4: "La Belgique",
		answer: 2
	},
	{
		question: "Quel est le premier président socialiste français sous la 5ème République?",
		choice1: "Jacque Chirac",
		choice2: "François Hollande",
		choice3: "François Mitterrand",
		choice4: "Charles De Gaulle",
		answer: 3
	},
	{
		question: "Quel est le groupe caractéristique des alcènes?",
		choice1: "Le groupe CO",
		choice2: "Le groupe CHO",
		choice3: "Ils n'en possèdent pas",
		choice4: "Le groupe COO",
		answer: 3
	},
	{
		question: "Quel est l'os le plus long du corps humain?",
		choice1: "le fémur",
		choice2: "L'humérus",
		choice3: "L'ulna",
		choice4: "La fibula",
		answer: 1
	},
	{
		question: "Quelle est la meilleure moyenne obtenue au bac français?",
		choice1: "21.02",
		choice2: "20.79",
		choice3: "21.33",
		choice4: "22.13",
		answer: 3
	},
	{
		question: "Comment s'appelle le petit du Dauphin?",
		choice1: "Le dauphinois",
		choice2: "Le bébé dauphin",
		choice3: "Un dauphin",
		choice4: "Le delphineau",
		answer: 4
	},
	{
		question: "Quel est l'organe regulant le PH sanguin?",
		choice1: "Foie",
		choice2: "Poumons",
		choice3: "Pancréas",
		choice4: "Intestins",
		answer: 2
	},
	{
		question: "Que vaut 154 en base 16?",
		choice1: "9A",
		choice2: "8C",
		choice3: "7D",
		choice4: "2E",
		answer: 1
	}
];

fetch(
	"https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple"
)
// récupère les réponses
  .then(res => {
    return res.json(); //met fin à l'exécution d'une fonction et définit une valeur à renvoyer à la fonction appelante.
  })
  //Afficher les questions dans le désorde + Pas dans le meme sens à chaque parties
  .then(loadedQuestions => {
    console.log(loadedQuestions.results);
    questions = loadedQuestions.results.map(loadedQuestion => {
      const formattedQuestion = {
        question: loadedQuestion.question
      };

      const answerChoices = [loadedQuestion.incorrect_answers];
      formattedQuestion.answer = Math.floor(Math.random() * 10) + 1;
      answerChoices.splice(
        formattedQuestion.answer - 1,
        0,
        loadedQuestion.correct_answer
      );

      answerChoices.forEach((choice, index) => {
        formattedQuestion["choice" + (index + 1)] = choice;
      });

      return formattedQuestion;
    });

    startGame();
  })
  .catch(err => {
    console.error(err);
  });

//CONSTANTES
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

//Mise en place du système de points avec couleurs lors d'une mauvaise ou bonne reponse (jusqu'à la fin du code)
startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [
	{
		question: "Quelle équipe nationale a gagné la Coupe du Monde de Football en 2002?",
		choice1: "La France",
		choice2: "L'Allemagne",
		choice3: "L'Italie",
		choice4: "Le Brésil",
		answer: 4
	},
	{
		question: "Quelle est la capitale du Canada?",
		choice1: "Québec",
		choice2: "Montreal",
		choice3: "Ottawa",
		choice4: "Ontario",
		answer: 3
	},
	{
		question: "Avec quel pays la France partage-t-elle sa plus longue frontière?",
		choice1: "L'Allemagne",
		choice2: "Le Brésil",
		choice3: "L'Espagne",
		choice4: "La Belgique",
		answer: 2
	},
	{
		question: "Quel est le premier président socialiste français sous la 5ème République?",
		choice1: "Jacque Chirac",
		choice2: "François Hollande",
		choice3: "François Mitterrand",
		choice4: "Charles De Gaulle",
		answer: 3
	},
	{
		question: "Quel est le groupe caractéristique des alcènes?",
		choice1: "Le groupe CO",
		choice2: "Le groupe CHO",
		choice3: "Ils n'en possèdent pas",
		choice4: "Le groupe COO",
		answer: 3
	},
	{
		question: "Quel est l'os le plus long du corps humain?",
		choice1: "le fémur",
		choice2: "L'humérus",
		choice3: "L'ulna",
		choice4: "La fibula",
		answer: 1
	},
	{
		question: "Quelle est la meilleure moyenne obtenue au bac français?",
		choice1: "21.02",
		choice2: "20.79",
		choice3: "21.33",
		choice4: "22.13",
		answer: 3
	},
	{
		question: "Comment s'appelle le petit du Dauphin?",
		choice1: "Le dauphinois",
		choice2: "Le bébé dauphin",
		choice3: "Un dauphin",
		choice4: "Le delphineau",
		answer: 4
	},
	{
		question: "Quel est l'organe regulant le PH sanguin?",
		choice1: "Foie",
		choice2: "Poumons",
		choice3: "Pancréas",
		choice4: "Intestins",
		answer: 2
	},
	{
		question: "Que vaut 154 en base 16?",
		choice1: "9A",
		choice2: "8C",
		choice3: "7D",
		choice4: "2E",
		answer: 1
	}
];

  getNewQuestion();
  game.classList.remove("hidden");
  loader.classList.add("hidden");
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("ScoresRecents", score); //SAUVEGARDE DU SCORE
    //Aller à la fin de la page
    return window.location.assign("fin.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //Mise à jour de la bar de progression
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerHTML = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerHTML = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};
