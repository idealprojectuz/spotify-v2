"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const grammy_1 = require("grammy");
const path_1 = require("path");
// console.log();
dotenv_1.default.config({
    path: (0, path_1.join)(process.cwd(), "..", "..") + "/.env",
});
const token = process.env.TOKEN;
const bot = new grammy_1.Bot(token); // <-- put your bot token between the ""
// You can now register listeners on your bot object `bot`.
// grammY will call the listeners when users send messages to your bot.
bot;
// Handle the /start command.
bot.command("start", (ctx) => {
    // ctx.replyWithPhoto(
    //   ,
    //   {
    //     caption:
    //       "Hello 👋 welcome to our bot you can listen to music through our bot To search for music go to Mini Apps through the menu below",
    //   }
    // );
    // ctx.reply("ok");
    ctx.replyWithPhoto("AgACAgIAAxkBAAMEZm-3kLQHAAGtpAo-_-rS0KUmFtFYAAKz1zEbuUeAS3i6OQbJDg25AQADAgADeQADNQQ", {
        caption: "Hello 👋 welcome to our bot you can listen to music through our bot To search for music go to Mini Apps through the menu below",
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: "Mini Apps",
                        web_app: {
                            url: "https://t.me/MiniAppsBot",
                        },
                    },
                ],
            ],
        },
    });
});
bot.on("message", (ctx) => {
    console.log(ctx.update.message);
});
// Now that you specified how to handle messages, you can start your bot.
// This will connect to the Telegram servers and wait for messages.
// Start the bot.
bot.start({
    onStart(botInfo) {
        console.log("Bot is up!");
        console.log(botInfo);
    },
});
