// Создание каточек меню
class CardMenu {
  constructor(name, img, word) {
    this.name = name;
    this.img = img;
    this.word = word;
  }

  createCard() {
  let fragment = new DocumentFragment();
  return fragment =`
  <div class="card mb-3 manu-card-window">
    <figure class="card-body">
     <p><img src="${this.img}" alt="${this.word}" width="100%"></p>
     <figcaption class="card-text">${this.name}</figcaption>
    </figure>
  </div>
    `;
      }

}

document.getElementById('wrapper-card').addEventListener("click", function () {
  let namber = 2;
  if(event.target.tagName == "FIGURE" || event.target.tagName == "FIGCAPTION"){
    namber += cards[0].indexOf(event.target.textContent.trim());
      } else if(event.target.tagName == "IMG"){
    namber += cards[0].indexOf(event.target.parentNode.nextElementSibling.textContent.trim());
    }

    if(document.getElementById('wrapper-card')){
      let list = document.getElementById('wrapper-card').children;
      for (var i = list.length-1; i >= 0; i--) {
        list[i].remove();
      }
      document.getElementById('wrapper-card').setAttribute("id", "wrapper-cards-game");
      createBlockCards(namber);
      // Синхнонизация с выезжающим меню
      let nameCategory = namber - 2;
      let listItem = document.getElementsByClassName("list-group-item");
      for (var i = 0; i < listItem.length; i++) {
        if(listItem[i].textContent == cards[0][nameCategory]){
          listItem[i].classList.add("active");
          listItem[i].firstElementChild.style.filter = "invert(100%)";
        }
          if(listItem[i].firstElementChild.classList.contains("active")){
          listItem[i].firstElementChild.classList.remove("active");
          listItem[i].firstElementChild.firstElementChild.style.filter = "unset";
        }
      }
      playWords();
      rotateIcon();
      mouseoutCard();
      }

});

//Уход с карточки и переворок обратно
function mouseoutCard() {
      let cardBack = document.getElementsByClassName("card-body-back");

      for (var i = 0; i < cardBack.length; i++) {
        cardBack[i].addEventListener("mouseleave", function () {
          let thisCard = this.parentElement.parentElement;
          thisCard.classList.remove("stop-play");
          thisCard.querySelector(".card-body-back").style.display = "none"
          thisCard.querySelector(".card-body").style.display = "block";
          thisCard.style.transform = "";
          thisCard.querySelector(".flipper").style.transform = "";


        });
      }

}
// Создание карточек слов

class CardWord {
  constructor(word, translation, image, audioSrc, index) {
    this.word = word;
    this.translation = translation;
    this.image = image;
    this.audioSrc = audioSrc;
    this.state = true;
    this.index = index;

    }

  createCard() {
  let fragment = new DocumentFragment();

  return fragment =`
  <div class="card-window">
  <div class="flipper card mb-3">
    <figure class="card-body">
     <p><img src="${this.image}" alt="${this.word}" width="100%" data-id="${this.index}"></p>
     <div class="wrapper-card-word">
      <figcaption class="card-text word-english">${this.word}</figcaption>
       <div class="rotate-icon"><img src="img/rotate.svg" alt="rotate"></div>
       <audio class="audio-word">
         <source src="${this.audioSrc}" type="audio/mpeg">
       </audio>
      </div>
    </figure>
    <figure class="card-body-back">
     <p><img src="${this.image}" alt="${this.word}" data-id="${this.index}" width="100%"></p>
     <div class="wrapper-card-word">
      <figcaption class="card-text translation">${this.translation}</figcaption>
    </div>
    </figure>
    </div>
  </div>
    `;
    }
}
// Переворот карточек по клику
function rotateIcon() {

    let allCardsWord = document.getElementsByClassName("rotate-icon");
    let counter = 180;
    for (var i = 0; i < allCardsWord.length; i++) {
      allCardsWord[i].addEventListener("click", function () {
        let allCard = this.parentElement.parentElement.parentElement.parentElement;

             allCard.querySelector(".card-body-back").style.display = "block";
             allCard.querySelector(".card-body").style.display = "none";
             allCard.style.transform = "rotateY(180deg)";
             allCard.querySelector(".flipper").style.transform = "rotateY(180deg)";
             allCard.classList.add("stop-play");


        });
      }
}

// Произношение слов

function playWords() {
  let allCardsWord = document.getElementsByClassName("card-window");
  for (var i = 0; i < allCardsWord.length; i++) {
    allCardsWord[i].addEventListener("click", function () {
        if(!this.classList.contains("stop-play")){this.querySelector(".audio-word").play();}
      })
  }
}
//Создание блока карточек

function createBlockCards(namber) {
  cards[namber].forEach(function (currentValue, index, array) {
  let newCard = new CardWord(cards[namber][index]["word"], cards[namber][index]["translation"], cards[namber][index]["image"], cards[namber][index]["audioSrc"], index);
  document.getElementById('wrapper-cards-game').insertAdjacentHTML("beforeend", newCard.createCard());


  });
  document.getElementById('switch-train-play').style.visibility = "visible";
}

cards[0].forEach(function (currentValue, index, array) {
let newCard = new CardMenu(currentValue, cards[2+index][1]['image'], cards[3][index]['word']);
document.getElementById('wrapper-card').insertAdjacentHTML("beforeend", newCard.createCard());
});
