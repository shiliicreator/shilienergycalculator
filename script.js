скрипт
// script.js

/**
 * Константы для количества дней в месяце и году (с учётом среднего в году 365.25 дней и в месяце 30.44 дней).
 */
const DAYS_IN_YEAR = 365.25;
const DAYS_IN_MONTH = 30.44;
const HOURS_IN_DAY = 24;
const HOURS_IN_WEEK = 168; // 24 * 7

/**
 * Функция для инициализации калькулятора после загрузки DOM.
 */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('energy-form');
  const resultDiv = document.getElementById('result');

  form.addEventListener('submit', event => {
    event.preventDefault();

    // Считываем и валидируем данные из полей ввода
    const devicePowerInput = document.getElementById('devicePower');
    const usageTimeInput = document.getElementById('usageTime');
    const electricityCostInput = document.getElementById('electricityCost');

    // Преобразуем значения в числа (float или integer)
    const devicePower = parseFloat(devicePowerInput.value);
    const usageTime = parseFloat(usageTimeInput.value);
    const electricityCost = parseFloat(electricityCostInput.value);

    // Проверяем, что все значения - числа и не являются NaN
    if (
      isNaN(devicePower) ||
      isNaN(usageTime) ||
      isNaN(electricityCost) ||
      devicePower < 0 ||
      usageTime < 0 ||
      electricityCost < 0
    ) {
      alert('Пожалуйста, введите корректные положительные числа.');
      return;
    }

    // Выполняем расчёты
    const calculationResults = calculateEnergyCosts(devicePower, usageTime, electricityCost);

    // Отображаем результаты на странице
    displayResults(calculationResults, resultDiv);
  });
});

/**
 * Функция для расчёта энергопотребления и стоимости.
 * @param {number} power - мощность прибора в Вт
 * @param {number} hours - время работы в часах
 * @param {number} costPerKWh - стоимость электроэнергии (руб. за кВт·ч)
 * @id70533735 (@returns) {Object} - объект с результатами
 */
function calculateEnergyCosts(power, hours, costPerKWh) {
  // Переводим мощность из Вт (W) в кВт (kW)
  const powerInKW = power / 1000;

  // Общая энергия, потреблённая за указанное время (кВт·ч)
  const totalEnergy = powerInKW * hours;

  // Общая стоимость за указанное время
  const totalCost = totalEnergy * costPerKWh;

  // Стоимость при непрерывной работе (1 час)
  const costPerHour = powerInKW * costPerKWh;

  // Стоимость при непрерывной работе (1 день)
  const costPerDay = costPerHour * HOURS_IN_DAY;

  // Стоимость при непрерывной работе (1 неделя)
  const costPerWeek = costPerHour * HOURS_IN_WEEK;

  // Стоимость при непрерывной работе (1 месяц)
  const costPerMonth = costPerDay * DAYS_IN_MONTH;

  // Стоимость при непрерывной работе (1 год)
  const costPerYear = costPerDay * DAYS_IN_YEAR;

  return {
    totalCost,
    costPerHour,
    costPerDay,
    costPerWeek,
    costPerMonth,
    costPerYear
  };
}

/**
 * Функция для отображения результатов на странице.
 * @param {Object} results - объект с результатами расчёта
 * @param {HTMLElement} container - элемент, куда выводить результаты
 */
function displayResults(results, container) {
  // Округляем результаты до двух знаков после запятой
  const {
    totalCost,
    costPerHour,
    costPerDay,
    costPerWeek,
    costPerMonth,
    costPerYear
  } = results;

  // Формируем HTML с выводом результатов
  container.innerHTML = `
    <p><strong>Общая стоимость потреблённой энергии за указанное время:</strong> ${totalCost.toFixed(2)} руб.</p>
    <p><strong>При непрерывной работе:</strong></p>
    <ul>
      <li>За 1 час: ${costPerHour.toFixed(2)} руб.</li>
      <li>За 1 день: ${costPerDay.toFixed(2)} руб.</li>
      <li>За 1 неделю: ${costPerWeek.toFixed(2)} руб.</li>
      <li>За 1 месяц : ${costPerMonth.toFixed(2)} руб.</li>
      <li>За 1 год: ${costPerYear.toFixed(2)} руб.</li>
    </ul>
  `;
}