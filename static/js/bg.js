document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;

    // Функция для создания плавающего доллара
    function createDollar() {
        const dollar = document.createElement("div");
        dollar.className = "dollar";
        dollar.textContent = "$";

        // Случайная позиция по горизонтали
        dollar.style.left = Math.random() * window.innerWidth + "px";

        // Добавляем доллар в body
        body.appendChild(dollar);

        // Удаляем доллар после завершения анимации
        setTimeout(() => {
            dollar.remove();
        }, 6000); // Соответствует длительности анимации (6s)
    }

    // Интервал для создания новых долларов
    setInterval(() => {
        createDollar();
    }, 1000); // Каждую секунду создаётся новый доллар
});
