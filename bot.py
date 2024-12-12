from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, CommandHandler, ContextTypes

WEB_APP_URL = "file:///C:/Users/DarkByte/Desktop/bot_invest/index.html"  # Ссылка на ваше приложение

# Команда /start
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    keyboard = [
        [
            InlineKeyboardButton("Запустить приложение", web_app={"url": WEB_APP_URL})
        ]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)

    await update.message.reply_text(
        "Добро пожаловать! Нажмите кнопку ниже, чтобы запустить приложение.",
        reply_markup=reply_markup
    )

# Основной метод запуска бота
async def main():
    API_TOKEN = "7560343139:AAGUsqYeE1OC-jUfFR0HSy1FCYUiydszNc4"

    application = Application.builder().token(API_TOKEN).build()

    application.add_handler(CommandHandler("start", start))

    await application.run_polling()

if name == "__main__":
    import asyncio
    asyncio.run(main())