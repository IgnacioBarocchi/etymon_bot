import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import { findOne } from "./lib/dbClient";
dotenv.config();

type ProcessEnv = string;
if (!process.env.TELEGRAM_TOKEN_KEY) {
  process.exit(1);
}
const TOKEN: ProcessEnv = process.env.TELEGRAM_TOKEN_KEY;
const BOT = new TelegramBot(TOKEN, { polling: true });

BOT.onText(
  /\/etm (.+)/,
  async (
    msg: TelegramBot.Message,
    match: RegExpExecArray | null
  ): Promise<void> => {
    const chatId = msg.chat.id;
    if (match?.[1]) {
      const etm = match[1];
      BOT.sendMessage(chatId, await findOne(etm));
    }
  }
);
