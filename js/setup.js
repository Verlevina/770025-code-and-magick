'use strict';
var setup = document.querySelector('.setup');
var names = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'];
var lastNames = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];
var colors = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var eyesColors = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];
var wizards = [];

// рандомное число

var getRandomNumbers = function (quantity) {
  return Math.floor(Math.random() * quantity);
};

var getWizardName = function () {
  var wizardName;
  if (getRandomNumbers(2)) {
    wizardName = names[getRandomNumbers(names.length)] + ' ' + lastNames[getRandomNumbers(lastNames.length)];
  } else {
    wizardName = lastNames[getRandomNumbers(lastNames.length)] + ' ' + names[getRandomNumbers(names.length)];
  }
  return wizardName;
};

// создание объекта данных

var getWizards = function () {
  for (var i = 0; i < 4; i++) {
    wizards[i] = {};
    wizards[i].name = getWizardName();
    wizards[i].coatColor = colors[getRandomNumbers(colors.length)];
    wizards[i].eyesColor = eyesColors[getRandomNumbers(eyesColors.length)];
  }
};

getWizards();

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var similarListElement = document.querySelector('.setup-similar-list');


var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

// показываем блок SETUP

var showSetup = function () {
  setup.classList.remove('hidden');
};

showSetup();

setup.querySelector('.setup-similar').classList.remove('hidden');
