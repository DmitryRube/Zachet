import initialCards from "../utils/initialCards.js";

console.log(initialCards);

let index = Math.floor(Math.random() * initialCards.length);

let cardsArray = initialCards.map((item) => item); //все изображения

let lastId = 0;

function getNewCardId(){
  return ++lastId;
}
const cardTemplate = document.querySelector('#card').content;
const cards = document.querySelector('.cards');
function createCard(data)
{
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardLink = cardElement.querySelector('.card__image');
  cardLink.src = data.link;
  cardLink.alt = data.name;
  const cardTitle = cardElement.querySelector('.card__title');
  cardTitle.textContent = data.name;
  cards.append(cardElement); 
  const buttonDelete = cardElement.querySelector('.card__remove');
  const buttonLike = cardElement.querySelector('.card__like');
  createEventLForDelete(buttonDelete);
  createEventForLike(buttonLike);
  checkClickCard(cardLink);
}

cardsArray.forEach(card => {
  createCard(card);
});

function AddNewCard(data)
{
  cardsArray.push(data);
  createCard(data);
  console.log(cardsArray);
}


const nn = 'BYD';
const ll = 'https://i.ytimg.com/vi/9O0yfwbYSvY/maxresdefault.jpg';


AddNewCard({name:nn, link:ll});

console.log(cardsArray);

let buttonAddImage = document.querySelector('.popup__button');
buttonAddImage.addEventListener('click', ()=>{
  const name = document.querySelector('#popup__input_title').value;
  const link = document.querySelector('#popup__input_link').value;
  AddNewCard({name:name, link:link});
});



let profileImage = document.querySelector('.profile__image');
function ShowImage(){
  if(profileImage.classList.contains('profile__image_unvisiable')){
    profileImage.classList.remove('profile__image_unvisiable');
  }
  else {
    profileImage.classList.add('profile__image_unvisiable');
  }
}
function imageExists(image_url){
  var http = new XMLHttpRequest();
  http.open('HEAD', image_url, false);
  http.send();
  return http.status != 404;
}
profileImage.addEventListener('click', ShowImage);
const formElement = document.getElementById('form1');
var list = [];
formElement.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(formElement); 
  const name = formData.get('popupTitle'); 
  const link = formData.get('popupLink');
  if(imageExists(link) && link != "" && name != ""){
    createCard({name: name, link: link});
  } 
});

function deleteFromCards(id){
  cardsArray.forEach(function(card, index) {
    if(card.id === id){
      cardsArray.splice(index, 1);
    }
  });
}
function removeParent(){
  let revDiv = this.parentElement;
  revDiv.remove();
  deleteFromCards(this.parentElement.id);
}