'use strict';
var heightBarChart = 150;
var widthBarChart = 40;
var distanceBetweenColumns = 50;
var colorOfUserColumn = 'rgba(255, 0, 0, 1)';
var colorOfAnotherUserColumn = 'blue';

window.renderStatistics = function (ctx, names, times) {
  paintCloud(ctx);
  paintBarChart(ctx, names, times);
};

// отрисовка облака и текста
var paintCloud = function (ctx) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(110, 20, 420, 270);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(100, 10, 420, 270);
  ctx.textBaseline = 'hanging';
  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000000';
  ctx.fillText('Ура вы победили!', 150, 20);
  ctx.fillText('Список результатов:', 150, 40);
};

// отприсовка гистограммы
var paintBarChart = function (ctx, names, times) {
  var roundTimes = roundOffTimes(times);
  var maxTime = findMaxTime(roundTimes);
  var barChartSizeCoefficient = findBarChartSizeCoefficient(maxTime);
  var heightOfItemsBarChart = findheightOfItemsBarChart(barChartSizeCoefficient, roundTimes);
  for (var i = 0; i < roundTimes.length; i++) {
    var coordinateX = 160 + i * distanceBetweenColumns + i * widthBarChart;
    var coordinateY = 90 + heightBarChart - heightOfItemsBarChart[i];
    ctx.fillStyle = colorOfAnotherUserColumn;
    if (names[i] === 'Вы') {
      ctx.fillStyle = colorOfUserColumn;
    }
    ctx.fillRect(coordinateX, coordinateY, widthBarChart, heightOfItemsBarChart[i]);
    ctx.textBaseline = 'hanging';
    ctx.font = '16px PT Mono';
    ctx.fillStyle = '#000000';
    ctx.fillText(names[i], coordinateX, 100 + heightBarChart);
    ctx.fillText(roundTimes[i], coordinateX, coordinateY - 20);
  }
};

// Поиск максимального времени
var findMaxTime = function (times) {
  var max = times[0];
  for (var i = 0; i < times.length; i++) {
    if (times[i] > max) {
      max = times[i];
    }
  }
  return max;
};

// Округление времени прохождения игры  к целому числу.
var roundOffTimes = function (times) {
  var roundTimes = [];
  for (var i = 0; i < times.length; i++) {
    roundTimes[i] = Math.ceil(times[i]);
  }
  return roundTimes;
};

// Поиск коэффициента для отрисовки гистограммы
var findBarChartSizeCoefficient = function (maxTime) {
  return heightBarChart / maxTime;
};

// Поиск высот столбцов гистограммы
var findheightOfItemsBarChart = function (coefficient, times) {
  var heights = [];
  for (var i = 0; i < times.length; i++) {
    heights[i] = times[i] * coefficient;
  }
  return heights;
};
