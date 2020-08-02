//@ts-ignore
process.env["NTBA_FIX_319"] = 1;

import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import { findOne } from "./lib/dbClient";
dotenv.config();

type ProcessEnv = string;
if (!process.env.TELEGRAM_TOKEN_KEY) {
  process.exit(1);
}

const TOKEN: ProcessEnv = process.env.TELEGRAM_TOKEN_KEY;
// Create a bot that uses 'polling' to fetch new updates
const BOT = new TelegramBot(TOKEN, { polling: true });

BOT.onText(
  /^/m,
  async function (
    msg: TelegramBot.Message,
    match: RegExpExecArray | null
  ): Promise<void> {
    const chatId = msg.chat.id;
    if (match?.[1]) {
      const etymologie = match[1];
      // Send a message to the chat acknowledging receipt of their message
      BOT.sendMessage(chatId, await findOne(etymologie));
    }
  }
);
