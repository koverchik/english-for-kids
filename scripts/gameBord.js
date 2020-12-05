function GameBord() {
  this.elements = {
    startButton: null,
    sequence: null,
  };

  this.score = {
    now: null,
    correctly: 0,
    wrong: 0
  };

this.createRandomSound = function(){
    let arrayNamberCard = new Set();

    function createNamber(array) {

      if(array.size < 8){
        array.add(getRandom(0, 7));
        createNamber(array);
      }
      return array;
    }

    function getRandom(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    this.elements.sequence = Array.from(createNamber(arrayNamberCard));
    this.score.now = this.elements.sequence[0];
  };
  // Состояние игры
this.stateGame = function(){
  let button = document.getElementById('button-for-game');
  this.elements.startButton = button;
  button.innerText = "Repeat"
  button.classList.add("repeat-audio");


  let blockForScore = new DocumentFragment();
  blockForScore =`
  <div class="alert alert-dismissible alert-info" id="score-table">
    <strong>Score:</strong>
  </div>
  `;
  document.getElementById('header-app').insertAdjacentHTML("afterend", blockForScore)
  // проигрываение аудио
  this.playAudio(this.score.now);
  };
  // Поигрываение аудио - функция
this.playAudio = function(){
    let namber = this.score.now;
    let listElemnts = document.getElementsByClassName("card-window");
    listElemnts[namber].querySelector(".audio-word").play();
  };
  //Отслеживание кликов по карточке
this.clickCard = function(namber, img){
    let audioObjSuccess = new Audio("/english-for-kids/audio/correct-ansver.mp3");
    let audioObjWrong = new Audio("/english-for-kids/audio/incorrect-answer.mp3");

    if(namber == this.score.now){

      img.style.filter = "grayscale(100%)";
      img.classList.add("stop-play-song");
      let fragmentSuccess = new DocumentFragment();
      fragmentSuccess =`
      <span class="badge badge-pill badge-success">&#10004;</span>
      `
      document.getElementById('score-table').insertAdjacentHTML("beforeend", fragmentSuccess);

      if(this.score.correctly < 7){
        audioObjSuccess.play();
        this.score.correctly = this.score.correctly + 1;
        this.score.now = this.elements.sequence[this.elements.sequence.indexOf(this.score.now) + 1];
        setTimeout(() => this.playAudio(), 1500);

        }else{
          this.endGame();
        }
          }else{

            if(!img.classList.contains("stop-play-song")){
            audioObjWrong.play();
            let fragmentWrong = new DocumentFragment();
            fragmentWrong =`
            <span class="badge badge-pill badge-warning">&#10008;</span>
            `
            document.getElementById('score-table').insertAdjacentHTML("beforeend", fragmentWrong);
            this.score.wrong = this.score.wrong + 1;

            }

      }

    };

this.endGame = function(){
    let audioObjSuccess = new Audio("/english-for-kids/audio/correct-ansver.mp3");
    let audioObjWrong = new Audio("/english-for-kids/audio/incorrect-answer.mp3");
    let fragment = new DocumentFragment();

    let img = "";
    let massage = "";
    if(this.score.wrong == 0){
      img = "img/success-game.jpg";
      massage = "Поздравляем!";
      audioObjSuccess.play();

    }else {
      audioObjWrong.play();
      img = "img/failure-game.jpg";
      massage = "Колличество ошибок " + this.score.wrong;
    }
    fragment =`
    <div class="end-game-bord">
      <img src="${img}" alt="Поздравление">
      <div><p class="text-info">${massage}</p></div>
    </div>
    `
    document.body.insertAdjacentHTML("beforeend", fragment);

    setTimeout(() => this.deleteEndWindow(), 5000);
  };

this.deleteEndWindow = function(){
  window.location.href = '/english-for-kids/';

  }

}
// Скрытие названия карточек
function changeWiew() {
  let allCardsWord = document.getElementsByClassName("wrapper-card-word");
  for (var i = 0; i < allCardsWord.length; i++) {
  allCardsWord[i].style.display = "none";
  }
}

// Заполнение карточкой всего пространства
function fillImage() {
  let allCardsWord = document.getElementsByClassName("card-body");
  for (var i = 0; i < allCardsWord.length; i++) {
    allCardsWord[i].style.margin = "0";
    allCardsWord[i].style.padding = "0";
    allCardsWord[i].firstElementChild.style.margin = "0";
    allCardsWord[i].firstElementChild.style.height = "100%";
  }
}

// Клик по кнопке Play
document.getElementById('switch-train-play').addEventListener("click", function () {

  // внешний вид
  changeWiew();
  fillImage();
  document.getElementById('switch-train-play').style.display = "none";

  (function createCard() {
  // Кнопка Start
  let fragment = new DocumentFragment();
  fragment =`
  <button type="button" class="btn btn-danger button-start" id="button-for-game">Start game</button>
  `;
  document.getElementById('header-app').insertAdjacentHTML("beforeend", fragment);
  })();

  document.getElementById('switch-train-play').style.display = "none";

  if(document.getElementById('button-for-game')){
    let newGAme = new GameBord();

    // Остановка звука по клику
    let allCardsWord = document.getElementsByClassName("card-window");
    for (var i = 0; i < allCardsWord.length; i++) {
      allCardsWord[i].classList.add("stop-play");
    }

// Старт игры
  newGAme.createRandomSound();
  newGAme.stateGame()

// Отслеживание кликов по кнопке
  let buttonRepeat = newGAme.elements.startButton;
  buttonRepeat.addEventListener("click", function (){
    newGAme.playAudio();
  });

  // newGAme.clickCard();

  document.getElementById('wrapper-cards-game').addEventListener("click", function (){
    let nowElem = event.target.parentElement.parentElement.parentElement;
    newGAme.clickCard(event.target.getAttribute("data-id"), event.target);
  });

// Стирание данных о предыдущей игре
  document.getElementById('slider-menu-list').addEventListener("click", function () {
  newGAme.score.correctly = 0;
  newGAme.score.wrong = 0;
  newGAme.createRandomSound();
  let score = document.getElementById('score-table');
  let listResult = score.getElementsByTagName("span");
  for (var i = 0; i < listResult.length; i++) {
    listResult[i].remove();
    }
  changeWiew();
  fillImage();
  document.getElementById('switch-train-play').style.display = "none";
  // Остановка звука по клику
  let allCardsWord = document.getElementsByClassName("card-window");
  for (var i = 0; i < allCardsWord.length; i++) {
    allCardsWord[i].classList.add("stop-play");
  }

  })

  }


});
