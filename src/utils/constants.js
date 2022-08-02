// Элементы страницы и селекторы
export const popupProfile = document.querySelector('#popup-profile'); // Поиск формы
export const editButton = document.querySelector('.profile__edit'); // Кнопка редактирования 

export const nameInput = document.querySelector('#input__popup-name'); // Значение 1. Строка с именем
export const aboutInput = document.querySelector('#input__popup-about'); // Значение 2. Строка о себе
export const formEditProfile = document.querySelector('#form-profile'); // Попап по форме

// Добавление карточек 
export const popupCard = document.querySelector('#popup-card'); // Форма
export const openPopupCardButton = document.querySelector('.profile__add'); // Добавление
export const formAddCard = document.querySelector('#form-card'); // Форма карточки

export const cardsTemplate = document.querySelector('#templatecard').content; // Заготовки для карточки.
export const cardContainer = document.querySelector('.cards'); // Контейнер с карточками

export const popupCardSaveButton = document.querySelector('#save-popup-card'); // Сохранение формы
export const popupBig = document.querySelector('#popupbig'); // Попап-картинка

export const nameProfile = '.profile__name'; // Поиск имени 
export const aboutProfile = '.profile__about'; // Поиск о себе 
export const avatarProfile = '.profile__avatar'; // Аватар профиля 

export const popupConfirm = document.querySelector('.popup_confirm'); // Форма подтверждения удаления
export const popupEditAvatar = document.querySelector('.profile__avatar') // Попап аватара
export const saveNewAvatar = document.querySelector('#form-avatar') // Форма аватара
export const popupAvatarSelector = document.querySelector('.popup_avatar');

export const popupImg = document.querySelector('.popup__image'); // Картинка 
export const popupImgText = document.querySelector('.popup__figcaption'); // Подпись к картинке
export const likeButton = document.querySelector('.card__like'); // Лайк