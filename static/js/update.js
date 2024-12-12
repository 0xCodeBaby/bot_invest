const apiKey = "_f6V1JTECPOQCMAKiLYBgpd1puvslXstL-_6wGhRsXE";
let localIncomeTimer = 0;
let localWithdrawTimer = 0;
let nextEarningAmount = 0;
let maxEarnings = 0;
let coins = 0;
let isUpdating = false;

// Форматирование времени
function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    if (hours > 0) {
        return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
        return `${minutes}m ${secs}s`;
    } else {
        return `${secs}s`;
    }
}

// Обновление интерфейса
function updateUI() {
    // Таймер до начисления
    const incomeTimerElement = document.getElementById("income-timer");
    incomeTimerElement.innerHTML = `
        <div style="text-align: center;">
            Ingreso en: <span style="color: gold;"> ${localIncomeTimer}</span>
            <div style="color: gold; font-weight: bold; margin-top: 5px;">+ $${nextEarningAmount.toFixed(2)}</div>
        </div>
    `;

    // Таймер до вывода
    const withdrawTimerElement = document.getElementById("withdraw-timer");
    if (coins >= maxEarnings) {
        withdrawTimerElement.textContent = "Retiro disponible";
    } else if (localWithdrawTimer > 0) {
        withdrawTimerElement.innerHTML = `Retiro en: <span style="color: gold;">${formatTime(localWithdrawTimer)}</span>`;
    } else {
        withdrawTimerElement.textContent = "Calculando tiempo para retiro...";
    }

    document.getElementById("balance-amount").textContent = `${coins.toFixed(2)}`;
    document.getElementById("max-earnings").innerHTML = `Máximo ingreso:<br><span style="color: gold;">$${maxEarnings.toFixed(2)}</span>`;
}

// Локальные таймеры
function updateLocalTimers() {
    if (localIncomeTimer > 0) {
        localIncomeTimer--;
    } else if (localIncomeTimer === 0 && !isUpdating) {
        fetchAndUpdateBalance();
    }

    if (localWithdrawTimer > 0) {
        localWithdrawTimer--; // Уменьшение секунда за секундой
    }

    updateUI();
}

// Обновление данных с сервера
async function fetchAndUpdateBalance() {
    try {
        if (isUpdating) return;
        isUpdating = true;

        const userId = new URLSearchParams(window.location.search).get("id");
        const token = new URLSearchParams(window.location.search).get("token");
        const apiKey = new URLSearchParams(window.location.search).get("api_key");

        if (!userId || !token || !apiKey) {
            console.error("Missing required parameters");
            isUpdating = false;
            return;
        }

        const response = await fetch(`/update_balance?id=${userId}&token=${token}&api_key=${apiKey}`);
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);

        const data = await response.json();
        if (!data) throw new Error("Empty response");

        // Сохраняем обновленные данные
        localIncomeTimer = data.time_to_next_earning || localIncomeTimer; // Обновляем только если нужно
        if (data.withdraw_timer > 0) {
            localWithdrawTimer = Math.max(localWithdrawTimer, data.withdraw_timer); // Плавное обновление
        }
        nextEarningAmount = data.next_earning || nextEarningAmount;
        maxEarnings = data.max_earnings || maxEarnings;
        coins = data.coins || coins;

        console.log("[DEBUG] Баланс обновлен:", data);

        isUpdating = false; // Снимаем блокировку
    } catch (error) {
        console.error("[ERROR] Ошибка при обновлении данных:", error);
        isUpdating = false;
    }
}

// Интервалы обновления
function startTimers() {
    setInterval(updateLocalTimers, 1000); // Локальное обновление каждую секунду
    setInterval(fetchAndUpdateBalance, 15000); // Синхронизация с сервером каждые 15 секунд
}

// Запуск таймеров
startTimers();
