'use strict';


var MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var USER_NAMES = [
  'Cергей',
  'Федя',
  'Василий',
  'Николай',
  'Екатерина',
  'Анастасия'
];

var COMMENTS_LIMIT = 6;
var AVATAR_MIN = 1;
var AVATAR_MAX = 6;
var COMMENTS_COUNT_MIN = 0;
var COMMENTS_COUNT_MAX = 50;
var USER_PHOTOS_LIMIT = 25;
var LIKES_COUNT_MIN = 15;
var LIKES_COUNT_MAX = 200;

var generateRandomNumber = function (from, to) {
  return Math.round(Math.random() * (to - from) + from);
};

var getRandomItem = function (items) {
  return items[generateRandomNumber(0, items.length - 1)];
};

var generateRandomComment = function (commentsNumber) {
  var comments = [];
  for (var i = 0; i < commentsNumber; i++){
    comments.push ({
        avatar: 'img/avatar-' + generateRandomNumber(AVATAR_MIN, AVATAR_MAX) + '.svg',
        message: MESSAGES [getRandomItem(1,COMMENTS_LIMIT)],
        name: USER_NAMES [getRandomItem(1,(USER_NAMES.length - 1))]
      });
    return comments;
  }
};

var generateRandomUserPhotos = function (userPhotos) {
  var randomUserPhotos = [];
  for (var i = 0; i < userPhotos; i++) {
    var photo = {
      url: 'photos/' + (i + 1) + '.jpg',
      desctiption: 'Описание фотографии',
      likes: generateRandomNumber(LIKES_COUNT_MIN, LIKES_COUNT_MAX),
      comments: generateRandomComment()
    };
    randomUserPhotos.push(photo);
  }
  return randomUserPhotos;
};



var createUserPhotoElement = function (userPhoto) {
  var userPhotoElement = userPhotoTemplateElement.cloneNode(true);

  userPhotoElement.querySelector('.picture__img').src = userPhoto.url;
  userPhotoElement.querySelector('.picture__comments').textContent = userPhoto.comments.length + generateRandomNumber(COMMENTS_COUNT_MIN, COMMENTS_COUNT_MAX);
  userPhotoElement.querySelector('.picture__likes').textContent = userPhoto.likes;

  return userPhotoElement;
};

var renderUserPhotos = function (photos) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photos.length; i++) {
    fragment.appendChild(createUserPhotoElement(photos[i]));
  }
  picturesElement.appendChild(fragment);
};

var photos = generateRandomUserPhotos();

var userPhotoTemplateElement = document.querySelector('#picture').content.querySelector('.picture');
var picturesElement = document.querySelector('.pictures');

renderUserPhotos(photos);
