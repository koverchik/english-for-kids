//Слайдер-меню

const wrapperMenu = document.createElement("div");
wrapperMenu.setAttribute("id", "all-menu");
const baseElementMenu = document.createElement("ul");
baseElementMenu.classList.add("menu-slider");
baseElementMenu.setAttribute("id", "slider-menu-list");

cards[0].forEach(function callback(currentValue, index, array) {
  let fragment = new DocumentFragment();
  fragment =`
  <li>
    <a href="#" class="list-group-item list-group-item-action"><img src="img/${cards[1][index]}">${currentValue}</a>
  </li>
    `;
    baseElementMenu.insertAdjacentHTML("afterbegin", fragment);
    }
);

let burgerMenu = new DocumentFragment();
burgerMenu =`

  <div class="menu-burger" id="close-slider-menu" >
  <img src="img/close.png" alt="menu">
  </div>
<div id="background-menu">
</div>
  `;
function hideMenu() {
  document.getElementById('all-menu').style.display = 'none';
}

wrapperMenu.insertAdjacentHTML("afterbegin", burgerMenu);
wrapperMenu.append(baseElementMenu);
document.getElementById('header-app').append(wrapperMenu);

document.getElementById('header-button-menu').addEventListener("click", function () {
document.getElementById('all-menu').style.display = 'flex';
document.getElementById('all-menu').style.animation = 'move-to-screan 2s 1';
});

document.getElementById('close-slider-menu').addEventListener("click", function () {
document.getElementById('all-menu').style.animation = 'hide-to-screan 2s 1';
setTimeout(hideMenu, 2000);
});
document.getElementById('background-menu').addEventListener("click", function () {
document.getElementById('all-menu').style.animation = 'hide-to-screan 2s 1';
setTimeout(hideMenu, 2000);
});

// Создание блоков карточек по клику в меню
document.getElementById('slider-menu-list').addEventListener("click", function () {
  
let listItem = this.children;

// Удаление маркера активной категории

for (var i = 0; i < listItem.length; i++) {
  if(listItem[i].firstElementChild.classList.contains("active")){
    listItem[i].firstElementChild.classList.remove("active");
    listItem[i].firstElementChild.firstElementChild.style.filter = "unset";
  }
}

document.getElementById('all-menu').style.animation = 'hide-to-screan 2s 1';
setTimeout(hideMenu, 2000);
let namber = 2;

if(event.target.tagName == "IMG"){
   namber += cards[0].indexOf(event.target.parentNode.textContent.trim());
   event.target.parentNode.classList.add("active");
   event.target.style.filter = "invert(100%)";
}else {
  namber += cards[0].indexOf(event.target.textContent.trim());
  event.target.classList.add("active");
  event.target.firstElementChild.style.filter = "invert(100%)";
}

if(document.getElementById('wrapper-cards-game') == null){
  let list = document.getElementById('wrapper-card').children;
  for (var i = list.length-1; i >= 0; i--) {
     list[i].remove();
  }
  document.getElementById('wrapper-card').setAttribute("id", "wrapper-cards-game");
  createBlockCards(namber);
  playWords();
  rotateIcon();
  mouseoutCard();

}else {
  let list = document.getElementById('wrapper-cards-game').children;
  for (var i = list.length-1; i >= 0; i--) {
     list[i].remove();
  }
  createBlockCards(namber);
  playWords();
  rotateIcon();
  mouseoutCard();
}

});
