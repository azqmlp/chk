// Словарь с переводами
const translations = {
    ru: {
        welcome: "Добро пожаловать!",
        description: "Мы помогаем сделать ваш переезд из Китая в Казахстан простым и удобным.",
        consultation: "Получить консультацию",
        formTitle: "Заполните заявку",
        nameLabel: "Ваше имя",
        emailLabel: "Ваш Email",
        questionLabel: "Ваш вопрос",
        submitButton: "Отправить",
    },
    kz: {
        welcome: "Қош келдіңіздер!",
        description: "Біз сіздің Қытайдан Қазақстанға көшуіңізді қарапайым әрі ыңғайлы етуге көмектесеміз.",
        consultation: "Кеңес алу",
        formTitle: "Өтінімді толтырыңыз",
        nameLabel: "Сіздің атыңыз",
        emailLabel: "Сіздің Email мекенжайыңыз",
        questionLabel: "Сіздің сұранымыңыз",
        submitButton: "Жіберу",
    },
    cn: {
        welcome: "欢迎！",
        description: "我们帮助您轻松方便地从中国搬到哈萨克斯坦。",
        consultation: "获取咨询",
        formTitle: "填写申请",
        nameLabel: "您的名字",
        emailLabel: "您的电子邮箱",
        questionLabel: "您的问题",
        submitButton: "提交",
    },
};

// Функция переключения языка
function switchLanguage(lang) {
    const elementsToUpdate = Object.keys(translations[lang]);
    elementsToUpdate.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = translations[lang][id];
        }
    });
}

// Обработка кликов по кнопкам переключения языка
document.querySelectorAll(".lang-switch").forEach((button) => {
    button.addEventListener("click", () => {
        const lang = button.getAttribute("data-lang");
        switchLanguage(lang);
    });
});

const express = require("express");
const fetch = require("node-fetch");

const app = express();
app.use(express.json());

const botToken = "8144023433:AAFcqkU5A23WP3gdpRWlp8OFLBP_O5xDm84";
const chatId = "909383897";

app.post("/send-message", async (req, res) => {
    const { name, email, question } = req.body;
    const message = `📝 Новая заявка:\n\n👤 Имя: ${name}\n📧 Email: ${email}\n❓ Вопрос: ${question}`;

    try {
        const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chat_id: chatId, text: message }),
        });

        if (response.ok) {
            res.status(200).send("Заявка успешно отправлена!");
        } else {
            res.status(500).send("Ошибка при отправке заявки.");
        }
    } catch (error) {
        res.status(500).send("Ошибка соединения с Telegram API.");
    }
});

app.listen(3000, () => console.log("Сервер запущен на порту 3000"));
