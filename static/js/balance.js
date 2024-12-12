document.addEventListener('DOMContentLoaded', () => {
    const incomeTimerElement = document.querySelector('#income-timer');
    const withdrawTimerElement = document.querySelector('#withdraw-timer');
    const incomeAmountElement = document.querySelector('#income-amount');
    const balanceAmountElement = document.querySelector('#balance-amount');
    const maxEarningsElement = document.querySelector('#max-earnings');

    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id');

    if (!userId) {
        console.error('User ID отсутствует в URL');
        return;
    }

    let nextIncomeTimeInSeconds = 15; // Таймер до следующего начисления
    let remainingTimeInSeconds = 0;  // Время до полного вывода

    function updateIncomeTimer() {
        if (nextIncomeTimeInSeconds <= 0) {
            // Когда таймер доходит до 0:
            fetchBalance(); // Обновляем баланс
            nextIncomeTimeInSeconds = 15; // Сбрасываем таймер
        } else {
            nextIncomeTimeInSeconds--;
        }

        const minutes = Math.floor(nextIncomeTimeInSeconds / 60);
        const seconds = nextIncomeTimeInSeconds % 60;
        incomeTimerElement.textContent = `Ingreso en: ${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    function updateWithdrawTimer() {
        if (remainingTimeInSeconds <= 0) {
            withdrawTimerElement.textContent = "¡Retiro disponible!";
        } else {
            const hours = Math.floor(remainingTimeInSeconds / 3600);
            const minutes = Math.floor((remainingTimeInSeconds % 3600) / 60);
            const seconds = remainingTimeInSeconds % 60;

            withdrawTimerElement.textContent = `Antes del retiro: ${hours}h ${minutes}m ${seconds.toString().padStart(2, '0')}s`;
            remainingTimeInSeconds--;
        }
    }

    function updateTimers() {
        if (remainingTimeInSeconds > 0) {
            const hours = Math.floor(remainingTimeInSeconds / 3600);
            const minutes = Math.floor((remainingTimeInSeconds % 3600) / 60);
            const seconds = remainingTimeInSeconds % 60;

            document.getElementById('withdraw-timer').textContent =
                `Antes del retiro: ${hours}h ${minutes}m ${seconds}s`;

            remainingTimeInSeconds--;
        }
    }
    
    // Ваш API-ключ
    const apiKey = "_f6V1JTECPOQCMAKiLYBgpd1puvslXstL-_6wGhRsXE";

    // Метод для получения баланса

    
    async function fetchBalance(userId) {
        try {
            const response = await fetch(`https://cdfe-195-123-217-161.ngrok-free.app/get_balance?id=${userId}`, {
                method: 'GET',
                headers: {
                    "X-API-Key": API_KEY, // Передаем ключ здесь
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error("Ошибка при получении баланса:", error);
        }
    }

    setInterval(updateTimers, 1000);  // Обновляем таймер каждую секунду
    // Обновляем баланс каждые 15 секунд
    setInterval(fetchBalance, 15000);

    // Первый вызов сразу при загрузке страницы
    fetchBalance();
});
