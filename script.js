"use strict";

/* =====================================================
   ДАННЫЕ И НАСТРОЙКИ
===================================================== */

const tasks = [
  { id: 136, level: "A", title: "Проверка заполненности накопителя",
    desc: "Расчёт занятой памяти, проверка диапазонов и ошибок." },
  { id: 137, level: "A", title: "Уровень сложности игры",
    desc: "Определение ранга игрока по количеству побед." },
  { id: 138, level: "A", title: "Срок действия подписки",
    desc: "Проверка количества оставшихся дней подписки." },
  { id: 139, level: "A", title: "Тип интернет-заказа",
    desc: "Классификация заказа по стоимости в тенге." },
  { id: 140, level: "A", title: "Права доступа к файлу",
    desc: "Проверка блокировки и роли пользователя." },

  { id: 141, level: "B", title: "Успешные попытки",
    desc: "Подсчёт успешных и неуспешных попыток." },
  { id: 142, level: "B", title: "Время работы компьютеров",
    desc: "Сумма, среднее, максимум и количество компьютеров." },
  { id: 143, level: "B", title: "Замена запрещённых слов",
    desc: "Замена слова bad без учёта регистра." },
  { id: 144, level: "B", title: "Результаты соревнований",
    desc: "Сортировка результатов, средний балл и топ-3." },
  { id: 145, level: "B", title: "Случайные числа",
    desc: "Генерация десяти чисел от 1 до 50." },
  { id: 146, level: "B", title: "Сравнение групп студентов",
    desc: "Поиск общих имён и студентов только из группы A." },
  { id: 147, level: "B", title: "Частота чисел",
    desc: "Подсчёт повторений каждого числа." },
  { id: 148, level: "B", title: "Фильтрация сообщений",
    desc: "Поиск сообщений длиной более 10 символов." },

  { id: 149, level: "C", title: "Среднее время теста",
    desc: "Функция расчёта среднего времени прохождения теста." },
  { id: 150, level: "C", title: "Уникальность логина",
    desc: "Проверка существующих логинов без учёта регистра." },
  { id: 151, level: "C", title: "Начисление баллов",
    desc: "Сумма баллов за выполненные задания." },
  { id: 152, level: "C", title: "Анализ заказов",
    desc: "Статистика оплаченных, ожидающих и отменённых заказов." },
  { id: 153, level: "C", title: "Свободное оборудование",
    desc: "Фильтрация устройств и изменение их доступности." },
  { id: 154, level: "C", title: "Электронный чек",
    desc: "Расчёт стоимости товаров и общей суммы покупки." },
  { id: 155, level: "C", title: "Прогресс IT-проектов",
    desc: "Анализ процентов выполнения проектов." },

  { id: 156, level: "D", title: "Таймер обратного отсчёта",
    desc: "Запуск, пауза и сброс таймера." },
  { id: 157, level: "D", title: "Цветовая палитра",
    desc: "Выбор цвета, HEX-код и сброс оформления." },
  { id: 158, level: "D", title: "Калькулятор поездки",
    desc: "Расчёт топлива и стоимости автомобильной поездки." },
  { id: 159, level: "D", title: "Генератор вопросов",
    desc: "Случайный выбор вопросов без повторений." },
  { id: 160, level: "D", title: "Регистрация IT-проектов",
    desc: "Форма регистрации, поиск, статусы, localStorage и статистика." }
];

const levelInfo = {
  A: { title: "Условные операторы", subtitle: "Начальный уровень", number: "01" },
  B: { title: "Циклы, массивы и строки", subtitle: "Средний уровень", number: "02" },
  C: { title: "Функции и объекты", subtitle: "Повышенный уровень", number: "03" },
  D: { title: "Интерактивные веб-приложения", subtitle: "Проектный уровень", number: "04" }
};

const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
}[char]));

const formatMoney = value =>
  new Intl.NumberFormat("ru-RU", {
    maximumFractionDigits: 2
  }).format(value) + " ₸";

/* =====================================================
   ГЕНЕРАЦИЯ КАРТОЧЕК
===================================================== */

const container = document.querySelector("#tasksContainer");
const searchInput = document.querySelector("#searchInput");
const levelFilter = document.querySelector("#levelFilter");

function taskDemo(id) {
  switch (id) {
    case 136:
      return `<div class="field">
        <label>Общий объём (ГБ)</label>
        <input type="number" data-field="total" value="64" min="1">
      </div>
      <div class="field">
        <label>Занято (ГБ)</label>
        <input type="number" data-field="used" value="48" min="0">
      </div>`;

    case 137:
      return `<div class="field">
        <label>Количество побед</label>
        <input type="number" data-field="wins" value="18" min="0">
      </div>`;

    case 138:
      return `<div class="field">
        <label>Осталось дней</label>
        <input type="number" data-field="days" value="3">
      </div>`;

    case 139:
      return `<div class="field">
        <label>Сумма заказа (₸)</label>
        <input type="number" data-field="amount" value="25000" min="0">
      </div>`;

    case 140:
      return `<div class="field">
        <label>Роль пользователя</label>
        <select data-field="role">
          <option value="admin">admin</option>
          <option value="editor" selected>editor</option>
          <option value="viewer">viewer</option>
          <option value="unknown">Неизвестная роль</option>
        </select>
      </div>
      <label class="demo-label">
        <input type="checkbox" data-field="blocked"> Заблокировать пользователя
      </label>`;

    case 141:
      return `<p class="demo-label">Массив: true, false, true, true, false, true, false</p>`;

    case 142:
      return `<p class="demo-label">Часы работы: 5, 8, 3, 12, 7, 10, 4</p>`;

    case 143:
      return `<div class="field">
        <label>Исходное сообщение</label>
        <textarea data-field="message">This is a bad example. BAD words are not allowed.</textarea>
      </div>`;

    case 144:
      return `<p class="demo-label">Баллы: 78, 96, 85, 92, 67, 88, 99, 74</p>`;

    case 145:
      return `<p class="demo-label">Генерируются 10 случайных целых чисел от 1 до 50.</p>`;

    case 146:
      return `<p class="demo-label">Группа A: Алия, Арман, Руслан, Мадина</p>
      <p class="demo-label">Группа B: Руслан, Данияр, Алия, Тимур</p>`;

    case 147:
      return `<p class="demo-label">Массив: 2, 4, 2, 5, 4, 2, 7, 5, 4</p>`;

    case 148:
      return `<p class="demo-label">Пять сообщений разной длины.</p>`;

    case 149:
      return `<p class="demo-label">Время теста: 12, 15, 10, 18, 14</p>`;

    case 150:
      return `<div class="field">
        <label>Новый логин</label>
        <input data-field="username" value="Student">
      </div>`;

    case 151:
      return `<p class="demo-label">HTML: 10 ✓ · CSS: 15 ✓ · JavaScript: 20 — · Database: 25 ✓</p>`;

    case 152:
      return `<p class="demo-label">4 заказа с разными статусами и суммами.</p>`;

    case 153:
      return `<div class="field">
        <label>Устройство</label>
        <select data-field="device">
          <option>VR Headset</option>
          <option>3D Printer</option>
          <option>Laptop</option>
          <option>Robot Kit</option>
        </select>
      </div>
      <button class="secondary-btn" data-action="toggle-device">Изменить доступность</button>`;

    case 154:
      return `<p class="demo-label">Мышь × 2 · Клавиатура × 1 · Наушники × 1</p>`;

    case 155:
      return `<p class="demo-label">4 IT-проекта с прогрессом от 45% до 100%.</p>`;

    case 156:
      return `<div class="field">
        <label>Время в секундах</label>
        <input type="number" data-field="seconds" min="1" max="86400" value="60">
      </div>
      <div class="demo-display big-timer" data-timer-display>01:00</div>
      <div class="demo-row">
        <button class="action-btn" data-action="timer-start">Старт</button>
        <button class="secondary-btn" data-action="timer-pause">Пауза</button>
        <button class="secondary-btn" data-action="timer-reset">Сброс</button>
      </div>`;

    case 157:
      return `<div class="color-preview" data-color-preview></div>
      <div class="field">
        <label>Выберите цвет</label>
        <input type="color" data-field="color" value="#7c3aed">
      </div>
      <p class="demo-label">HEX: <strong data-color-code>#7c3aed</strong></p>
      <button class="secondary-btn" data-action="color-reset">Стандартный цвет</button>`;

    case 158:
      return `<div class="demo-form">
        <div class="field"><label>Расстояние (км)</label>
          <input type="number" data-field="distance" value="250" min="0.01" step="any"></div>
        <div class="field"><label>Расход (л/100 км)</label>
          <input type="number" data-field="consumption" value="8" min="0.01" step="any"></div>
        <div class="field"><label>Цена литра (₸)</label>
          <input type="number" data-field="fuel-price" value="250" min="0" step="any"></div>
      </div>`;

    case 159:
      return `<div class="demo-display question-text" data-question>
        Нажмите «Следующий вопрос», чтобы начать.
      </div>
      <p class="demo-label" data-question-count>Показано: 0 из 10</p>
      <div class="demo-row">
        <button class="action-btn" data-action="next-question">Следующий вопрос</button>
        <button class="secondary-btn" data-action="restart-questions">Начать заново</button>
      </div>`;

    case 160:
      return `<form class="demo-form" data-project-form>
        <div class="field">
          <label for="projectName">Название проекта *</label>
          <input id="projectName" name="projectName" maxlength="100" required>
        </div>
        <div class="field">
          <label for="participant">ФИО участника *</label>
          <input id="participant" name="participant" maxlength="120" required>
        </div>
        <div class="field">
          <label for="direction">Направление *</label>
          <select id="direction" name="direction" required>
            <option value="">Выберите направление</option>
            <option>Искусственный интеллект</option>
            <option>Веб-разработка</option>
            <option>Мобильные приложения</option>
            <option>Робототехника</option>
          </select>
        </div>
        <div class="field">
          <label for="submissionDate">Дата подачи *</label>
          <input id="submissionDate" name="submissionDate" type="date" required>
        </div>
        <button class="action-btn" type="submit">Зарегистрировать</button>
        <p class="demo-label">* Обязательные поля. Данные хранятся в этом браузере.</p>
      </form>
      <div class="field" style="margin-top:15px">
        <label for="projectSearch">Поиск по названию</label>
        <input id="projectSearch" data-field="project-search" placeholder="Введите название...">
      </div>
      <div class="project-stats" data-project-stats></div>
      <div class="table-wrap">
        <table>
          <thead><tr>
            <th>Проект / участник</th><th>Направление / дата</th><th>Статус</th><th></th>
          </tr></thead>
          <tbody data-project-rows></tbody>
        </table>
      </div>`;

    default:
      return "";
  }
}

function renderTasks() {
  const query = searchInput.value.trim().toLowerCase();
  const selectedLevel = levelFilter.value;

  const filtered = tasks.filter(task =>
    (selectedLevel === "all" || task.level === selectedLevel) &&
    (String(task.id).includes(query) ||
     task.title.toLowerCase().includes(query) ||
     task.desc.toLowerCase().includes(query))
  );

  const levels = ["A", "B", "C", "D"];

  container.innerHTML = levels.map(level => {
    const items = filtered.filter(task => task.level === level);
    if (!items.length) return "";

    const info = levelInfo[level];

    return `
      <section class="level-section level-${level.toLowerCase()}" id="level-${level.toLowerCase()}">
        <div class="level-heading">
          <span class="level-number">${info.number}</span>
          <div>
            <h2>${info.title}</h2>
            <p>${info.subtitle} · ${items.length} заданий</p>
          </div>
        </div>
        <div class="tasks-grid">
          ${items.map(task => `
            <article class="task-card" data-task-id="${task.id}">
              <div class="task-top">
                <span class="task-number">TASK #${task.id}</span>
                <span class="level-tag">LEVEL ${task.level}</span>
              </div>
              <h3>${task.title}</h3>
              <p class="task-description">${task.desc}</p>
              <div class="task-content">${taskDemo(task.id)}</div>
              ${task.id === 158 ? `
                <div class="task-actions">
                  <button class="action-btn" data-action="calculate-trip">Рассчитать</button>
                </div>` : ""}
              ${task.id < 156 ? `
                <div class="task-actions">
                  <button class="action-btn" data-action="run-task">Выполнить</button>
                </div>` : ""}
              <div class="result" aria-live="polite" data-result></div>
            </article>
          `).join("")}
        </div>
      </section>`;
  }).join("");

  if (!filtered.length) {
    container.innerHTML = `<div class="empty-state">
      Ничего не найдено. Измените запрос или выберите другой уровень.
    </div>`;
  }

  initProjectApp();
}

searchInput.addEventListener("input", renderTasks);
levelFilter.addEventListener("change", renderTasks);

/* =====================================================
   ЗАДАНИЯ 136–155
===================================================== */

const attempts = [true, false, true, true, false, true, false];
const hours = [5, 8, 3, 12, 7, 10, 4];
const results = [78, 96, 85, 92, 67, 88, 99, 74];

const groupA = ["Алия", "Арман", "Руслан", "Мадина"];
const groupB = ["Руслан", "Данияр", "Алия", "Тимур"];

const devices = [
  { name: "VR Headset", available: true },
  { name: "3D Printer", available: false },
  { name: "Laptop", available: true },
  { name: "Robot Kit", available: true }
];

const tasksPoints = [
  { title: "HTML", points: 10, completed: true },
  { title: "CSS", points: 15, completed: true },
  { title: "JavaScript", points: 20, completed: false },
  { title: "Database", points: 25, completed: true }
];

const orders = [
  { id: 1, amount: 12000, status: "paid" },
  { id: 2, amount: 8000, status: "pending" },
  { id: 3, amount: 25000, status: "paid" },
  { id: 4, amount: 15000, status: "cancelled" }
];

const cart = [
  { name: "Мышь", price: 5000, quantity: 2 },
  { name: "Клавиатура", price: 12000, quantity: 1 },
  { name: "Наушники", price: 8000, quantity: 1 }
];

const projects = [
  { name: "AI Chatbot", progress: 90 },
  { name: "Smart Campus", progress: 45 },
  { name: "Mobile App", progress: 100 },
  { name: "Web Platform", progress: 70 }
];

function calculateAverageTime(times) {
  if (!times.length) return 0;
  return times.reduce((sum, time) => sum + time, 0) / times.length;
}

function isUsernameAvailable(username) {
  const usernames = ["admin", "student", "teacher", "guest"];
  return !usernames.some(name =>
    name.toLowerCase() === username.trim().toLowerCase()
  );
}

function calculatePoints(list) {
  return list.reduce((sum, task) =>
    sum + (task.completed ? task.points : 0), 0
  );
}

function getAvailableDevices() {
  return devices.filter(device => device.available);
}

function generateReceipt(list) {
  if (!list.length) return "Корзина пуста.";

  const lines = list.map(item =>
    `${item.name}: ${item.quantity} × ${formatMoney(item.price)} = ${formatMoney(item.quantity * item.price)}`
  );
  const total = list.reduce((sum, item) =>
    sum + item.price * item.quantity, 0
  );

  return [...lines, `ИТОГО: ${formatMoney(total)}`].join("\n");
}

function runTask(id, card) {
  const get = name => card.querySelector(`[data-field="${name}"]`);
  const result = card.querySelector("[data-result]");

  result.classList.remove("error");

  try {
    let output = "";

    switch (id) {
      case 136: {
        const total = Number(get("total").value);
        const used = Number(get("used").value);

        if (!Number.isFinite(total) || !Number.isFinite(used) ||
            total <= 0 || used < 0 || used > total) {
          throw new Error("Проверьте данные: общий объём должен быть больше нуля, а занятая память — от 0 до общего объёма.");
        }

        const percent = used / total * 100;
        let status;

        if (percent < 50) status = "Достаточно места";
        else if (percent <= 89) status = "Память заполняется";
        else status = "Память почти заполнена";

        output = `Занято: ${percent.toFixed(2)}%\n${status}`;
        break;
      }

      case 137: {
        const wins = Number(get("wins").value);
        if (!Number.isInteger(wins) || wins < 0) {
          throw new Error("Количество побед должно быть целым неотрицательным числом.");
        }

        let rank;
        if (wins <= 4) rank = "Новичок";
        else if (wins <= 14) rank = "Любитель";
        else if (wins <= 29) rank = "Профессионал";
        else rank = "Мастер";

        output = `Побед: ${wins}\nУровень: ${rank}`;
        break;
      }

      case 138: {
        const days = Number(get("days").value);
        if (!Number.isInteger(days)) throw new Error("Введите целое количество дней.");

        if (days < 0) output = "Ошибка данных";
        else if (days === 0) output = "Подписка истекла";
        else if (days <= 7) output = "Скоро закончится подписка";
        else output = "Подписка активна";
        break;
      }

      case 139: {
        const amount = Number(get("amount").value);
        if (!Number.isFinite(amount) || amount < 0) {
          throw new Error("Сумма должна быть неотрицательным числом.");
        }

        let category;
        if (amount < 5000) category = "Малый заказ";
        else if (amount < 20000) category = "Средний заказ";
        else if (amount < 50000) category = "Крупный заказ";
        else category = "VIP-заказ";

        output = `Сумма: ${formatMoney(amount)}\nКатегория: ${category}`;
        break;
      }

      case 140: {
        const role = get("role").value;
        const blocked = get("blocked").checked;

        if (blocked) output = "Доступ запрещён: пользователь заблокирован.";
        else if (role === "admin") output = "Администратор: полный доступ к управлению файлом.";
        else if (role === "editor") output = "Редактор: просмотр и редактирование.";
        else if (role === "viewer") output = "Наблюдатель: только просмотр.";
        else output = "Доступ запрещён: неизвестная роль.";
        break;
      }

      case 141: {
        let success = 0;
        let failure = 0;

        for (const attempt of attempts) {
          if (attempt === true) success++;
          else failure++;
        }

        output = `Успешных: ${success}\nНеуспешных: ${failure}\nУспешность: ${(success / attempts.length * 100).toFixed(2)}%`;
        break;
      }

      case 142: {
        const sum = hours.reduce((a, b) => a + b, 0);
        const max = Math.max(...hours);
        const overEight = hours.filter(hour => hour > 8).length;

        output = `Общее время: ${sum} ч\nСреднее: ${(sum / hours.length).toFixed(2)} ч\nМаксимум: ${max} ч\nБолее 8 часов: ${overEight}`;
        break;
      }

      case 143: {
        const message = get("message").value;
        const changed = message.replaceAll(/bad/gi, "***");

        output = `Исходное:\n${message}\n\nИзменённое:\n${changed}`;
        break;
      }

      case 144: {
        const sorted = [...results].sort((a, b) => b - a);
        const average = calculateAverageTime(results);
        const above90 = results.filter(score => score >= 90).length;

        output = `Максимум: ${sorted[0]}\nТоп-3: ${sorted.slice(0, 3).join(", ")}\nПо убыванию: ${sorted.join(", ")}\nСредний балл: ${average.toFixed(2)}\nРезультатов ≥ 90: ${above90}`;
        break;
      }

      case 145: {
        const numbers = [];

        for (let i = 0; i < 10; i++) {
          numbers.push(Math.floor(Math.random() * 50) + 1);
        }

        output = `Массив: ${numbers.join(", ")}\nМинимум: ${Math.min(...numbers)}\nМаксимум: ${Math.max(...numbers)}`;
        break;
      }

      case 146: {
        const common = groupA.filter(name => groupB.includes(name));
        const onlyA = groupA.filter(name => !groupB.includes(name));

        output = `Общие студенты: ${common.join(", ")}\nТолько группа A: ${onlyA.join(", ")}`;
        break;
      }

      case 147: {
        const numbers = [2, 4, 2, 5, 4, 2, 7, 5, 4];
        const frequency = {};

        for (const number of numbers) {
          frequency[number] = (frequency[number] || 0) + 1;
        }

        const maxCount = Math.max(...Object.values(frequency));
        const mostFrequent = Object.keys(frequency)
          .filter(number => frequency[number] === maxCount);

        output = `Частота:\n${JSON.stringify(frequency, null, 2)}\nЧаще всего: ${mostFrequent.join(", ")} (${maxCount} раза)`;
        break;
      }

      case 148: {
        const messages = [
          "Привет",
          "Изучаем программирование",
          "JavaScript",
          "Практическая работа",
          "Код"
        ];

        const selected = messages.filter(message => message.length > 10);
        output = `Сообщения:\n${selected.join("\n")}\nКоличество: ${selected.length}`;
        break;
      }

      case 149: {
        const testTimes = [12, 15, 10, 18, 14];
        output = `Среднее время: ${calculateAverageTime(testTimes).toFixed(2)} минуты`;
        break;
      }

      case 150: {
        const username = get("username").value;
        if (!username.trim()) throw new Error("Введите логин.");

        output = isUsernameAvailable(username)
          ? `Логин "${username}" доступен для регистрации.`
          : `Логин "${username}" уже занят.`;
        break;
      }

      case 151: {
        const total = calculatePoints(tasksPoints);
        const unfinished = tasksPoints.filter(task => !task.completed);

        output = `Набрано баллов: ${total}\nНевыполненных заданий: ${unfinished.length}\nОстались: ${unfinished.map(task => task.title).join(", ")}`;
        break;
      }

      case 152: {
        const paid = orders.filter(order => order.status === "paid");
        const pending = orders.filter(order => order.status === "pending");
        const cancelled = orders.filter(order => order.status === "cancelled");

        const statistics = {
          paidCount: paid.length,
          paidTotal: paid.reduce((sum, order) => sum + order.amount, 0),
          pendingCount: pending.length,
          cancelledCount: cancelled.length,
          cancelledOrders: cancelled.map(order => order.id)
        };

        output = `Статистика:\n${JSON.stringify(statistics, null, 2)}\nОплачено: ${formatMoney(statistics.paidTotal)}`;
        break;
      }

      case 153: {
        const available = getAvailableDevices();
        output = `Доступные устройства:\n${available.map(device => device.name).join(", ")}\nКоличество: ${available.length}`;
        break;
      }

      case 154:
        output = generateReceipt(cart);
        break;

      case 155: {
        const completed = projects.filter(project => project.progress === 100);
        const below50 = projects.filter(project => project.progress < 50);
        const lowest = projects.reduce((min, project) =>
          project.progress < min.progress ? project : min
        );

        output = `Проекты:\n${projects.map(p => `${p.name}: ${p.progress}%`).join("\n")}\n\nЗавершено: ${completed.map(p => p.name).join(", ") || "нет"}\nМенее 50%: ${below50.map(p => p.name).join(", ") || "нет"}\nСредний прогресс: ${calculateAverageTime(projects.map(p => p.progress)).toFixed(2)}%\nМинимальный прогресс: ${lowest.name} (${lowest.progress}%)`;
        break;
      }

      default:
        output = "Для этого задания предусмотрен отдельный интерфейс.";
    }

    result.textContent = output;
  } catch (error) {
    result.classList.add("error");
    result.textContent = error.message || "Произошла ошибка.";
  }
}

/* =====================================================
   МИНИ-ПРОЕКТ №153: ИЗМЕНЕНИЕ ОБОРУДОВАНИЯ
===================================================== */

function toggleDevice(card) {
  const name = card.querySelector('[data-field="device"]').value;
  const device = devices.find(item => item.name === name);
  if (!device) return;

  device.available = !device.available;

  const result = card.querySelector("[data-result]");
  result.classList.remove("error");
  result.textContent = `${device.name}: ${device.available ? "доступно" : "занято"}.\nНажмите «Выполнить», чтобы обновить список доступных устройств.`;
}

/* =====================================================
   МИНИ-ПРОЕКТ №156: ТАЙМЕР
===================================================== */

const timers = new WeakMap();

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
}

function stopTimer(card) {
  const timer = timers.get(card);
  if (timer?.interval) clearInterval(timer.interval);
  if (timer) timer.interval = null;
}

function resetTimer(card) {
  stopTimer(card);

  const input = card.querySelector('[data-field="seconds"]');
  const display = card.querySelector("[data-timer-display]");
  const result = card.querySelector("[data-result]");

  let seconds = Number(input.value);
  if (!Number.isInteger(seconds) || seconds < 1 || seconds > 86400) {
    seconds = 60;
    input.value = "60";
  }

  timers.set(card, { remaining: seconds, interval: null });
  display.textContent = formatTime(seconds);
  result.textContent = "";
  result.classList.remove("error");
}

function startTimer(card) {
  const state = timers.get(card);
  if (!state) resetTimer(card);

  const timer = timers.get(card);
  const display = card.querySelector("[data-timer-display]");
  const result = card.querySelector("[data-result]");

  if (timer.interval) return;

  if (timer.remaining <= 0) {
    result.textContent = "Сначала сбросьте таймер.";
    return;
  }

  result.textContent = "";

  timer.interval = setInterval(() => {
    timer.remaining--;
    display.textContent = formatTime(timer.remaining);

    if (timer.remaining <= 0) {
      stopTimer(card);
      display.textContent = "00:00";
      result.textContent = "Время вышло!";
    }
  }, 1000);
}

/* =====================================================
   МИНИ-ПРОЕКТ №157: ЦВЕТОВАЯ ПАЛИТРА
===================================================== */

function updateColor(card) {
  const color = card.querySelector('[data-field="color"]').value;
  card.querySelector("[data-color-preview]").style.backgroundColor = color;
  card.querySelector("[data-color-code]").textContent = color.toUpperCase();
}

/* =====================================================
   МИНИ-ПРОЕКТ №158: КАЛЬКУЛЯТОР ПОЕЗДКИ
===================================================== */

function calculateTrip(card) {
  const distance = Number(card.querySelector('[data-field="distance"]').value);
  const consumption = Number(card.querySelector('[data-field="consumption"]').value);
  const price = Number(card.querySelector('[data-field="fuel-price"]').value);
  const result = card.querySelector("[data-result]");

  result.classList.remove("error");

  if (!Number.isFinite(distance) || distance <= 0 ||
      !Number.isFinite(consumption) || consumption <= 0 ||
      !Number.isFinite(price) || price < 0) {
    result.classList.add("error");
    result.textContent = "Введите корректные значения. Расстояние и расход должны быть больше нуля, цена — неотрицательной.";
    return;
  }

  const fuel = distance * consumption / 100;
  const cost = fuel * price;

  result.textContent =
    `Расстояние: ${distance} км\n` +
    `Необходимо топлива: ${fuel.toFixed(2)} л\n` +
    `Стоимость поездки: ${formatMoney(cost)}`;
}

/* =====================================================
   МИНИ-ПРОЕКТ №159: ГЕНЕРАТОР ВОПРОСОВ
===================================================== */

const questions = [
  "Что такое переменная в JavaScript?",
  "Чем отличаются let и const?",
  "Для чего используется оператор if...else?",
  "Что делает цикл for?",
  "Как создать массив в JavaScript?",
  "Для чего нужен метод map()?",
  "Чем отличаются == и ===?",
  "Что такое функция и как её объявить?",
  "Для чего используется addEventListener()?",
  "Что такое объект в JavaScript?"
];

const questionStates = new WeakMap();

function restartQuestions(card) {
  const state = {
    remaining: [...questions],
    shown: []
  };

  questionStates.set(card, state);
  card.querySelector("[data-question]").textContent =
    "Нажмите «Следующий вопрос», чтобы начать.";
  card.querySelector("[data-question-count]").textContent =
    `Показано: 0 из ${questions.length}`;

  const result = card.querySelector("[data-result]");
  result.textContent = "";
  result.classList.remove("error");
}

function nextQuestion(card) {
  if (!questionStates.has(card)) restartQuestions(card);

  const state = questionStates.get(card);
  const result = card.querySelector("[data-result]");
  result.classList.remove("error");

  if (state.remaining.length === 0) {
    card.querySelector("[data-question]").textContent = "Вопросы закончились!";
    result.textContent = "Вы ответили на все вопросы. Нажмите «Начать заново», чтобы повторить.";
    return;
  }

  const index = Math.floor(Math.random() * state.remaining.length);
  const [question] = state.remaining.splice(index, 1);
  state.shown.push(question);

  card.querySelector("[data-question]").textContent = question;
  card.querySelector("[data-question-count]").textContent =
    `Показано: ${state.shown.length} из ${questions.length}`;
  result.textContent = "";
}

/* =====================================================
   МИНИ-ПРОЕКТ №160: РЕГИСТРАЦИЯ ПРОЕКТОВ
===================================================== */

const STORAGE_KEY = "codelab-projects-136-160";
const projectStatuses = ["На рассмотрении", "В работе", "Завершён"];

function loadProjects() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const data = raw ? JSON.parse(raw) : [];

    if (!Array.isArray(data)) return [];

    return data.filter(project =>
      project &&
      typeof project.id === "string" &&
      typeof project.name === "string" &&
      typeof project.participant === "string" &&
      typeof project.direction === "string" &&
      typeof project.date === "string" &&
      projectStatuses.includes(project.status)
    );
  } catch (error) {
    console.error("Не удалось прочитать проекты:", error);
    return [];
  }
}

let registeredProjects = loadProjects();

function saveProjects() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(registeredProjects));
    return true;
  } catch (error) {
    console.error("Не удалось сохранить проекты:", error);
    return false;
  }
}

function initProjectApp() {
  const card = container.querySelector('[data-task-id="160"]');
  if (!card) return;

  const form = card.querySelector("[data-project-form]");
  const dateInput = form.elements.submissionDate;

  if (!dateInput.value) {
    dateInput.value = new Date().toLocaleDateString("en-CA");
  }

  renderProjects(card);
}

function renderProjects(card) {
  const tbody = card.querySelector("[data-project-rows]");
  const stats = card.querySelector("[data-project-stats]");
  const query = card.querySelector('[data-field="project-search"]').value
    .trim().toLowerCase();

  const filtered = registeredProjects.filter(project =>
    project.name.toLowerCase().includes(query)
  );

  stats.innerHTML = `
    <div class="mini-stat"><strong>${registeredProjects.length}</strong><span>Всего проектов</span></div>
    <div class="mini-stat"><strong>${registeredProjects.filter(p => p.status === "На рассмотрении").length}</strong><span>На рассмотрении</span></div>
    ${[
      "Искусственный интеллект",
      "Веб-разработка",
      "Мобильные приложения",
      "Робототехника"
    ].map(direction => `
      <div class="mini-stat">
        <strong>${registeredProjects.filter(p => p.direction === direction).length}</strong>
        <span>${escapeHTML(direction)}</span>
      </div>
    `).join("")}
  `;

  if (!filtered.length) {
    tbody.innerHTML = `<tr><td colspan="4">Проекты не найдены.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(project => `
    <tr>
      <td>
        <strong>${escapeHTML(project.name)}</strong><br>
        ${escapeHTML(project.participant)}
      </td>
      <td>
        ${escapeHTML(project.direction)}<br>
        ${escapeHTML(project.date)}
      </td>
      <td>
        <select data-project-status="${escapeHTML(project.id)}" aria-label="Статус проекта">
          ${projectStatuses.map(status => `
            <option ${project.status === status ? "selected" : ""}>${status}</option>
          `).join("")}
        </select>
      </td>
      <td>
        <button class="secondary-btn" data-delete-project="${escapeHTML(project.id)}" aria-label="Удалить проект">Удалить</button>
      </td>
    </tr>
  `).join("");
}

/* =====================================================
   ОБРАБОТЧИКИ СОБЫТИЙ
===================================================== */

container.addEventListener("click", event => {
  const button = event.target.closest("[data-action]");
  if (!button) return;

  const card = button.closest(".task-card");
  if (!card) return;

  const id = Number(card.dataset.taskId);
  const action = button.dataset.action;

  switch (action) {
    case "run-task":
      runTask(id, card);
      break;

    case "toggle-device":
      toggleDevice(card);
      break;

    case "timer-start":
      startTimer(card);
      break;

    case "timer-pause":
      stopTimer(card);
      break;

    case "timer-reset":
      resetTimer(card);
      break;

    case "color-reset": {
      const colorInput = card.querySelector('[data-field="color"]');
      colorInput.value = "#7c3aed";
      updateColor(card);
      break;
    }

    case "calculate-trip":
      calculateTrip(card);
      break;

    case "next-question":
      nextQuestion(card);
      break;

    case "restart-questions":
      restartQuestions(card);
      break;
  }
});

container.addEventListener("input", event => {
  const card = event.target.closest(".task-card");
  if (!card) return;

  if (event.target.matches('[data-field="color"]')) {
    updateColor(card);
  }

  if (event.target.matches('[data-field="seconds"]') &&
      !timers.get(card)?.interval) {
    resetTimer(card);
  }

  if (event.target.matches('[data-field="project-search"]')) {
    renderProjects(card);
  }
});

container.addEventListener("change", event => {
  const statusSelect = event.target.closest("[data-project-status]");

  if (statusSelect) {
    const card = statusSelect.closest(".task-card");
    const id = statusSelect.dataset.projectStatus;
    const project = registeredProjects.find(item => item.id === id);

    if (!project) return;

    const oldStatus = project.status;
    project.status = statusSelect.value;

    if (!saveProjects()) {
      project.status = oldStatus;
      statusSelect.value = oldStatus;
      showProjectMessage(card, "Не удалось сохранить статус. Проверьте настройки хранилища браузера.", true);
      return;
    }

    renderProjects(card);
    showProjectMessage(card, "Статус проекта обновлён.");
  }
});

container.addEventListener("submit", event => {
  if (!event.target.matches("[data-project-form]")) return;

  event.preventDefault();

  const form = event.target;
  const card = form.closest(".task-card");
  const formData = new FormData(form);

  const project = {
    id: crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    name: String(formData.get("projectName") || "").trim(),
    participant: String(formData.get("participant") || "").trim(),
    direction: String(formData.get("direction") || ""),
    date: String(formData.get("submissionDate") || ""),
    status: "На рассмотрении"
  };

  if (!project.name || !project.participant ||
      !project.direction || !project.date) {
    showProjectMessage(card, "Заполните все обязательные поля.", true);
    return;
  }

  if (project.name.length > 100 || project.participant.length > 120) {
    showProjectMessage(card, "Превышена допустимая длина поля.", true);
    return;
  }

  registeredProjects.push(project);

  if (!saveProjects()) {
    registeredProjects.pop();
    showProjectMessage(card, "Не удалось сохранить данные в localStorage.", true);
    return;
  }

  form.reset();
  form.elements.submissionDate.value = new Date().toLocaleDateString("en-CA");

  card.querySelector('[data-field="project-search"]').value = "";
  renderProjects(card);
  showProjectMessage(card, "Проект успешно зарегистрирован.");
});

container.addEventListener("click", event => {
  const deleteButton = event.target.closest("[data-delete-project]");
  if (!deleteButton) return;

  const card = deleteButton.closest(".task-card");
  const id = deleteButton.dataset.deleteProject;
  const index = registeredProjects.findIndex(project => project.id === id);

  if (index < 0) return;

  const [removed] = registeredProjects.splice(index, 1);

  if (!saveProjects()) {
    registeredProjects.splice(index, 0, removed);
    showProjectMessage(card, "Не удалось сохранить изменения.", true);
    return;
  }

  renderProjects(card);
  showProjectMessage(card, "Проект удалён.");
});

function showProjectMessage(card, message, isError = false) {
  const result = card.querySelector("[data-result]");
  result.textContent = message;
  result.classList.toggle("error", isError);
}

/* =====================================================
   ЗАПУСК САЙТА
===================================================== */

renderTasks();

document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    document.querySelectorAll(".nav-link").forEach(item =>
      item.classList.remove("active")
    );
    link.classList.add("active");
  });
});