'use strict';

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var userNames = [
  'Cергей',
  'Федя',
  'Василий',
  'Николай',
  'Екатерина',
  'Анастасия'
];

var avatarNumber = 6;
var commentsMin = 0;
var commentsMax = 30;
var userPosts = 25;
var minLikes = 15;
var maxLikes = 200;

var randomNumber = function (from, to) {
  return Math.round(Math.random() * (to - from) + from);
};

var getRandomItem = function (items) {
  return items[randomNumber(0, items.length - 1)];
};

var randomComment = function () {
  return {
    avatar: 'img/avatar-' + randomNumber(1, 6) + '.svg',
    message: getRandomItem(COMMENTS),
    name: getRandomItem(userNames)
  };
};

var randomComments = function () {
  var comments = [];
  for (var i = 0; i < avatarNumber; i++) {
    comments.push(randomComment());
  }
  return comments;
};

var randomUserPhoto = function () {
  var randomUserPhoto = [];
  for (var i = 0; i < userPosts; i++) {
    randomUserPhoto.push({
      url: 'photos/' + (i + 1) + '.jpg',
      desctiption: 'Описание фотографии',
      likes: randomNumber(minLikes, maxLikes),
      comments: randomComments()
    });
  }
  return randomUserPhoto;
};

var createUserPhotoElement = function (userPhoto) {
  var userPhotoElement = userPhotoTemplateElement.cloneNode(true);

  userPhotoElement.querySelector('.picture__img').src = userPhoto.url;
  userPhotoElement.querySelector('.picture__comments').textContent = userPhoto.comments.length + randomNumber(commentsMin, commentsMax);
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

var photos = randomUserPhoto();

var userPhotoTemplateElement = document.querySelector('#picture').content.querySelector('.picture');
var picturesElement = document.querySelector('.pictures');

renderUserPhotos(photos);
