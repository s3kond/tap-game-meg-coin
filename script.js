let coinCounter = 0;
let profitPerTap = 1;
let upgradeCost = 10;
let energyCounter = 1000;

const upgradeButton = document.getElementById('update-left');
const modal = document.getElementById('upgradeModal');
const closeBtn = document.getElementsByClassName('close')[0];
const upgradeCostDisplay = document.getElementById('upgradeCost');
const upgradeButtonInsideModal = document.getElementById('upgradeButton');
const coinClicker = document.getElementById('coin');
const coinImage = coinClicker.querySelector('img');
const telegramNicknameDisplay = document.getElementById('telegram-nickname-display');

// Показать модальное окно
upgradeButton.onclick = function() {
    modal.style.display = 'block';
}

// Скрыть модальное окно
closeBtn.onclick = function() {
    modal.style.display = 'none';
}

// Скрыть модальное окно при клике вне его
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// Улучшение кликов
upgradeButtonInsideModal.onclick = function() {
    if (coinCounter >= upgradeCost) {
        profitPerTap++;
        coinCounter -= upgradeCost;
        energyCounter += 500;
        document.getElementById('coin-counter').innerText = coinCounter.toLocaleString();
        document.getElementById('energy-counter').innerText = energyCounter.toLocaleString() + "/1000";
        upgradeCost *= 2;
        upgradeCostDisplay.innerText = upgradeCost.toLocaleString();
        document.getElementById('profit-per-tap').innerText = profitPerTap;
    }
}

// Клик по монете
coinClicker.onclick = function() {
    coinCounter += profitPerTap;
    document.getElementById('coin-counter').innerText = coinCounter.toLocaleString();
    if (energyCounter > 0) {
        energyCounter--;
        document.getElementById('energy-counter').innerText = energyCounter.toLocaleString() + "/1000";
    }
    animateCoin();
}

// Анимация монеты при клике
function animateCoin() {
    coinImage.classList.add('animate');
    setTimeout(() => {
        coinImage.classList.remove('animate');
    }, 200);
}

// Запросить ник телеграма из URL
window.onload = function() {
    // Инициализация Telegram Web App
    const tg = window.Telegram.WebApp;
    tg.ready();
    
    const user = tg.initDataUnsafe.user;
    if (user) {
        telegramNicknameDisplay.innerText = user.username || user.first_name;
    }
}
