import { Telegraf } from "telegraf";
import dotenv from "dotenv";
import { join } from "path";
import fs from "fs";
import ytdl from "ytdl-core";
import { musicPhoto, tunnel_url } from "./constants";

dotenv.config({
  path: join(process.cwd(), "..", "..") + "/.env",
});

const token: string = process.env.TOKEN || "";
const bot = new Telegraf(token, {
  telegram: {
    testEnv: false,
  },
});

// bot.on("web_app_data", (ctx) => {
//   console.log(ctx);
// });
// bot.use((ctx, next) => {
//   console.log(ctx);
// });
// bot.use(async (ctx, next) => {
//   console.log(ctx);
// });

interface AudiArtist {
  name: string;
  id: string;
}

interface Audio {
  id: string;
  title: string;
  artists: AudiArtist[];
  thumbnail: string;
}

bot.on("web_app_data", async (ctx) => {
  try {
    const audio: Audio = JSON.parse(ctx.message?.web_app_data?.data);
    const loading = await ctx.reply("⏳");
    ctx.sendChatAction("upload_document");
    // ctx.reply(
    //   "id: " +
    //     audio.id +
    //     " title: " +
    //     audio.title +
    //     " artists: " +
    //     audio.artists[0].name
    // );
    const audioStream = ytdl("https://music.youtube.com/watch?v=" + audio.id, {
      filter: "audioonly",
    });

    ctx
      .replyWithAudio(
        {
          source: audioStream,

          filename: audio.artists[0].name + " - " + audio.title + ".mp3",
        },
        {
          title:
            audio.artists.map((el) => el.name).concat(" ") +
            " - " +
            audio.title,
          caption: "Download from @spotifyuzmuzbot",
          thumbnail: {
            url: audio.thumbnail,
          },
        }
      )
      .then(() => {
        ctx.deleteMessage(loading.message_id);
      });
  } catch (error: any) {
    console.log(error.message);
    ctx.reply("Xatolik yuz berdi");
  }
});

bot.command("test", async (ctx) => {
  try {
    const loading = await ctx.reply("⏳");

    await ctx.replyWithAudio({
      url: "https://music.dasturkhan.uz/listen?hash=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJodHRwczovL3JyNC0tLXNuLXBvdXhnYTVvLXZ1MnMuZ29vZ2xldmlkZW8uY29tL3ZpZGVvcGxheWJhY2s_ZXhwaXJlPTE3MTk2NjQ1MzMmZWk9TmF0X1pzMmxEOW0xNmRzUHhkcW9nQU0maXA9MmEwZSUzQTk3YzAlM0EzZWElM0E0NGQlM0EwJTNBMCUzQTAlM0ExJmlkPW8tQUpuUUducG1IUi1QT25qVGFySzlZVVhteWhDN2NEUGMyYnVXdnJaaHpfYlAmaXRhZz0xNDAmc291cmNlPXlvdXR1YmUmcmVxdWlyZXNzbD15ZXMmeHBjPUVnVm8yYURTTlElM0QlM0QmbWg9R3UmbW09MzElMkMyOSZtbj1zbi1wb3V4Z2E1by12dTJzJTJDc24tNGc1ZWRuZHkmbXM9YXUlMkNyZHUmbXY9bSZtdmk9NCZwbD00OCZnY3I9ZGUmaW5pdGN3bmRicHM9MzY3NTAwJmJ1aT1BYktQLTFNX1Z3cEJwLWs1X25ZMmg0ZTdQWWNBd3RDcEctRktxdDM2cjJxMnF5MTdXME9ZelExV2NZWkxSQzJVX2J3RU5WWHc1dUFsVk9kUiZzcGM9VVdGOWZ4RmFZeFB2NTMtN3JnMVRjbFZGejJ5bTc3dHZkOXQ1T3hmM1E0UTF2OE1BX29JMXRyaUZhY1FFJnZwcnY9MSZzdnB1Yz0xJm1pbWU9YXVkaW8lMkZtcDQmbnM9R0hzc001MUczc2xzcWQtYmJGVGZNamtRJnJxaD0xJmdpcj15ZXMmY2xlbj0yMTU0Mjc1JmR1cj0xMzIuOTUxJmxtdD0xNzE2ODAxODQ5MDg1MjE5Jm10PTE3MTk2NDI1MzQmZnZpcD0xJmtlZXBhbGl2ZT15ZXMmYz1XRUImc2VmYz0xJnR4cD0yMzE4MjI0Jm49aUVRMFg3ck9sa3VrR3cmc3BhcmFtcz1leHBpcmUlMkNlaSUyQ2lwJTJDaWQlMkNpdGFnJTJDc291cmNlJTJDcmVxdWlyZXNzbCUyQ3hwYyUyQ2djciUyQ2J1aSUyQ3NwYyUyQ3ZwcnYlMkNzdnB1YyUyQ21pbWUlMkNucyUyQ3JxaCUyQ2dpciUyQ2NsZW4lMkNkdXIlMkNsbXQmbHNwYXJhbXM9bWglMkNtbSUyQ21uJTJDbXMlMkNtdiUyQ212aSUyQ3BsJTJDaW5pdGN3bmRicHMmbHNpZz1BSGxrSGpBd1JBSWdIUkprTlhQWkY1RmhwR1pGSlAzRTlzYlZvaXhFT2lNMzd3Z0lUdXpER3JBQ0lHTGY3Q1MxM0YzMC0zb1hpSUJOa3U2Wi15bmo4T0VhYzZfQUZUQVlTUzM4JnNpZz1BSmZRZFNzd1JRSWhBTmFVdlBLdU9lNnhWbXJOdkRMMXV4c0dET0RjdmlJRUtPNjRFWDFzV3FUS0FpQkx4NjdNUU5Mdi1QNkRlMjY3MC1yOEVFTC1YVjcxT3pER0E0LUppdHo2Z1ElM0QlM0QiLCJpYXQiOjE3MTk2NDI5MzMsImV4cCI6MTcxOTY0NjUzM30.6uq9EcHIU127ALpJ0ZAwnHOTg-UX1R9WNtoEAtW5oKg",
      filename: "Konsta",
    });
    console.log(loading);
  } catch (error) {
    console.error(error);
  }
});

bot.start((ctx) => {
  const file = {
    source: fs.readFileSync(join(__dirname, "..", "media", "logo.png")),
  };
  ctx.replyWithPhoto(file, {
    caption:
      "Hello 👋 welcome to our bot you can listen to music through our bot. To search for music, go to Mini Apps through the menu below",
    reply_markup: {
      keyboard: [
        [
          {
            text: "Open Music App",
            web_app: {
              url: tunnel_url,
            },
          },
        ],
      ],
      resize_keyboard: true,
    },
  });
});

bot.help((ctx) => {
  ctx.replyWithAudio(
    "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/1c/55/15/1c551554-35ac-1fc5-3924-9b6ede6dc95a/mzaf_15647324962729712637.plus.aac.ep.m4a",
    {
      title: "Music",
    }
  );
});

// Botni ishga tushirish
bot.launch(() => {
  console.log("Bot ishga tushdi");
});

// Graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
