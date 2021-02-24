import {showTime} from "./time.js";
const quizData = [
  {
    question: "What is the most used programming language in 2019?",
    a: "Java",
    b: "C",
    c: "Python",
    d: "JavaScript",
    correct: "d",
  },
  {
    question: "Who is the President of US?",
    a: "Florin Pop",
    b: "Donald Trump",
    c: "Ivan Saldano",
    d: "Mihai Andrei",
    correct: "b",
  },
  {
    question: "What does HTML stand for?",
    a: "Hypertext Markup Language",
    b: "Cascading Style Sheet",
    c: "Jason Object Notation",
    d: "Helicopters Terminals Motorboats Lamborginis",
    correct: "a",
  },
  {
    question: "What year was JavaScript launched?",
    a: "1996",
    b: "1995",
    c: "1994",
    d: "none of the above",
    correct: "b",
  },
];
export const popUp = {
  success: {
    icon: "fas fa-check-circle",
    text: "correct",
    type: "success",
  },
  warning: {
    icon: "fas fa-exclamation-circle",
    text: "Incorrect",
    type: "warning",
  },
};
let currentQuestion = 0;
let score = 0;
const questionText = document.querySelector("#question");
const a_text = document.querySelector("#a_text");
const b_text = document.querySelector("#b_text");
const c_text = document.querySelector("#c_text");
const d_text = document.querySelector("#d_text");
const submit = document.querySelector("#submit");
const cover = document.querySelector(".cover-background");
const quizContainer = document.querySelector(".quiz-container");
const answersQuestion = document.querySelectorAll(".answer");

function loadQuiz() {
  deSelectAnswers();
  const currentQuizData = quizData[currentQuestion];
  const { question, a, b, c, d } = currentQuizData;
  questionText.innerHTML = question;
  a_text.innerHTML = a;
  b_text.innerHTML = b;
  c_text.innerHTML = c;
  d_text.innerHTML = d;
}

document.addEventListener("DOMContentLoaded", (e) => {
  loadQuiz();
});

function getSelected() {
  let idAnswer = undefined;
  answersQuestion.forEach((answer) => {
    if (answer.checked === true) {
      idAnswer = answer.id;
    }
  });
  return idAnswer;
}
submit.addEventListener("click", (e) => {
  const getAnswer = getSelected();
  const {success,warning} = popUp;
  if (getAnswer) {
    if(getAnswer === quizData[currentQuestion].correct){
      const {icon,text,type} = success;
      modal(icon,text,type);
      score++;
    }else{
      const {icon,text,type} = warning;
      modal(icon,text,type);
    }
    currentQuestion++;
    if(currentQuestion < quizData.length){
      loadQuiz();
    }else{
      document.body.innerHTML = `
        <div class="result">
          <h2>Congratulation! You have worked hard and get ${score} correct answers!</h2>
        </div>
      `
      cover.classList.remove("scale-bgc");
      quizContainer.remove();
    }
  } else {
      const {icon,text,type} = warning;
      modal(icon,text,type);
  }
});
function deSelectAnswers(){
  answersQuestion.forEach(item => {
    item.checked = false;
  });
}
export function modal(icon, text, type) {
  const popUpElement = document.createElement("div");
  popUpElement.classList.add("pop-up");
  popUpElement.innerHTML = `
            <div class="pop-up__header pop-up__header--${type}">
              <h2>${text}</h2>
              <div class="close">
                  <i class="fas fa-times"></i>
              </div>
            </div>
            <div class="icon-type">
                <i class="${icon} ${type}"></i>
            </div>
        `;
  quizContainer.appendChild(popUpElement);
  const closeBtn = document.querySelector(".close");
  setTimeout((e) => {
    popUpElement.classList.add("modal-down");
  }, 0);
  cover.classList.add("scale-bgc");
  closeBtn.addEventListener("click",closeModal)
}
function closeModal(element){
  element.target.parentElement.parentElement.remove();
  cover.classList.remove("scale-bgc");
  showTime();
}
