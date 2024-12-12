document.addEventListener('DOMContentLoaded', () => {
    // Получаем параметры из URL
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id');
    const token = urlParams.get('token');
    const apiKey = urlParams.get('api_key');

    if (!userId || !token || !apiKey) {
        console.error('Отсутствуют обязательные параметры (id, token, api_key) в URL');
        return;
    }

    // Определяем текущую страницу
    const currentPath = window.location.pathname;

    // Карта соответствия маршрутов и кнопок
    const tabRoutes = {
        '/': 'earnings',       // Главная страница
        '/income': 'income',
        '/withdraw': 'withdraw',
        '/leaders': 'leaders',
        '/profile': 'profile'
    };

    // Подсветка активной кнопки
    const activeTab = tabRoutes[currentPath];
    if (activeTab) {
        const activeButton = document.querySelector(`.button[data-tab="${activeTab}"]`);
        if (activeButton) {
            activeButton.classList.add('active'); // Добавляем класс активности
        }
    }

    // Общая функция для перенаправления с безопасными параметрами
    const navigateTo = (path) => {
        window.location.href = `${path}?id=${userId}&token=${token}&api_key=${apiKey}`;
    };

    // Обработчики для каждой кнопки
    const earningsButton = document.querySelector('.button[data-tab="earnings"]');
    const incomeButton = document.querySelector('.button[data-tab="income"]');
    const withdrawButton = document.querySelector('.button[data-tab="withdraw"]');
    const leadersButton = document.querySelector('.button[data-tab="leaders"]');
    const profileButton = document.querySelector('.button[data-tab="profile"]');
    
    // Вибрация устройства
    if ("vibrate" in navigator) {
            navigator.vibrate(200); // Вибрация на 200 миллисекунд
            console.log("Vibration triggered!");
        } else {
            console.log("Vibration not supported on this device.");
        }

    if (earningsButton) {
        earningsButton.addEventListener('click', () => navigateTo('/'));
    }

    if (incomeButton) {
        incomeButton.addEventListener('click', () => navigateTo('/income'));
    }

    if (withdrawButton) {
        withdrawButton.addEventListener('click', () => navigateTo('/withdraw'));
    }

    if (leadersButton) {
        leadersButton.addEventListener('click', () => navigateTo('/leaders'));
    }

    if (profileButton) {
        profileButton.addEventListener('click', () => navigateTo('/profile'));
    }
});

// Защита от копирования, контекстного меню и отладки
document.addEventListener('selectstart', (event) => {
    event.preventDefault();
});

document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
});

document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && (event.key === 'u' || event.key === 'U')) {
        event.preventDefault(); // Запретить Ctrl+U
    }
    if (event.key === 'F12') {
        event.preventDefault(); // Запретить F12
    }
    if (event.ctrlKey && event.shiftKey && (event.key === 'I' || event.key === 'J')) {
        event.preventDefault(); // Запретить Ctrl+Shift+I и Ctrl+Shift+J
    }
});
