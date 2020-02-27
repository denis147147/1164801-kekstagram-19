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

var generateRandomUserPhotos = function () {
  var randomUserPhotos = [];
  for (var i = 0; i < userPosts; i++) {
    randomUserPhotos.push({
      url: 'photos/' + (i + 1) + '.jpg',
      desctiption: 'Описание фотографии',
      likes: randomNumber(minLikes, maxLikes),
      comments: randomComments()
    });
  }
  return randomUserPhotos;
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

var photos = generateRandomUserPhotos();

var userPhotoTemplateElement = document.querySelector('#picture').content.querySelector('.picture');
var picturesElement = document.querySelector('.pictures');

renderUserPhotos(photos);

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

var renderFullSizePhoto = function (index) {
  fullSizePhotoElement.querySelector('img').src = photos[index].url;
  fullSizePhotoElement.querySelector('.likes-count').textContent = photos[index].likes;
  fullSizePhotoElement.querySelector('.comments-count').textContent = photos[index].comments.length + generateRandomNumber(COMMENTS_COUNT_MIN, COMMENTS_COUNT_MAX);
  fullSizePhotoElement.querySelector('.social__caption').textContent = photos[index].description;
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
