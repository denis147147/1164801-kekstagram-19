'use strict';

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var DESCRIPTIONS = [
  'Тустим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];

var minLikes = 15;
var maxLikes = 200;

var totalPost = 25;

var usersPhotos = [];
for (var i = 0; i < totalPost; i++) {
  usersPhotos[i] = i + 1;
};

var getRandomItem = function (arr) {
  return Math.floor([Math.floor(Math.random() * (arr.length))], 1);
};

var getRandomItemRange = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

var getRandomArray = function (arr) {
  return arr[Math.floor(Math.random() * (arr.length))];
};

var newPhoto = function (usersPhotos, COMMENTS) {
  this.url = 'photos/' + getRandomItem(usersPhotos) + '.jpg';
  this.likes = getRandomItemRange(minLikes,maxLikes);
  this.comments = getRandomArray(COMMENTS);
};

var usersPosts = [];
for (i = 0; i < totalPost; i++) {
  usersPosts[i] = new newPhoto(usersPhotos, COMMENTS);
};

var pictureTemplate = document.querySelector('#picture');
var pictureList = document.querySelector('.pictures');

var renderPhoto = function (photo) {
  var photoElement = pictureTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img') = photo.url;
  photoElement.querySelector('.picture__likes') = photo.likes;
  photoElement.querySelector('picture__comments') = photo.comments;
  return photoElement;
};

var pictureSocial = document.querySelector('.social');
pictureSocial.querySelector('img.social__picture').src = usersPosts[0].url;
pictureSocial.querySelector('.social__likes').textContent = usersPosts[0].Likes;
pictureSocial.querySelector('.social__comments').textContent = usersPosts[0].comments;
pictureSocial.classList.remove('hidden');
