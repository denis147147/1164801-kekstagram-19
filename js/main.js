'use strict';

var COMMENTS = [
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


var generateRandomNumber = function (from, to) {
  return Math.round(Math.random() * (to - from) + from);
};

var getRandomItem = function (items) {
  return items[generateRandomNumber(0, items.length - 1)];
};

var generateRandomComment = function () {
  return {
    avatar: 'img/avatar-' + generateRandomNumber(AVATAR_MIN, AVATAR_MAX) + '.svg',
    message: getRandomItem(MESSAGES),
    name: getRandomItem(USER_NAMES)
  };
};

var generateRandomComments = function () {
  var comments = [];
  for (var i = 0; i < COMMENTS_LIMIT; i++) {
    comments.push(generateRandomComment());
  }
  return comments;
};

var generateRandomUserPhotos = function (userPhotos) {
  var randomUserPhotos = [];
  for (var i = 0; i < userPhotos; i++) {
    var photo = {
      url: 'photos/' + (i + 1) + '.jpg',
      desctiption: 'Описание фотографии',
      likes: generateRandomNumber(LIKES_COUNT_MIN, LIKES_COUNT_MAX),
      comments: generateRandomComment(AVATAR_MIN, AVATAR_MAX)
    };
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

var createComment = function (comment) {
  var commentElement = commentsTemplateElement.cloneNode(true);

  var commentAvatarElement = commentElement.querySelector('.social__picture');
  commentAvatarElement.src = comment.avatar;
  commentAvatarElement.alt = comment.name;
  commentAvatarElement.width = '35';
  commentAvatarElement.height = '35';
  commentElement.querySelector('.social__text').textContent = comment.message;

  return commentElement;
};

var renderComments = function (comments) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < comments.length; i++) {
    fragment.appendChild(createComment(comments[i]));
  }
  commentsElement.appendChild(fragment);
};

var renderFullSizePhoto = function (sizePhoto) {
  fullSizePhotoElement.querySelector('img').src = photos.url;
  fullSizePhotoElement.querySelector('.likes-count').textContent = generateRandomUserPhotos.photos.likes;
  fullSizePhotoElement.querySelector('.comments-count').textContent = generateRandomUserPhotos.photos.comments.length;
  fullSizePhotoElement.querySelector('.social__caption').textContent = generateRandomUserPhotos.photos.description;
  renderComments(generateRandomComments());
};

var photos = generateRandomUserPhotos();

var userPhotoTemplateElement = document.querySelector('#picture').content.querySelector('.picture');
var picturesElement = document.querySelector('.pictures');
var commentsElement = document.querySelector('.social__comments');
var commentsTemplateElement = document.querySelector('.social__comment');

renderUserPhotos(photos);

var fullSizePhotoElement = document.querySelector('.big-picture');
fullSizePhotoElement.classList.remove('hidden');

renderFullSizePhoto(0);

var commentsCountElement = document.querySelector('.social__comment-count');
commentsCountElement.classList.add('hidden');
var commentsLoaderElement = document.querySelector('.comments-loader');
commentsLoaderElement.classList.add('hidden');
document.body.classList.add('modal-open');
