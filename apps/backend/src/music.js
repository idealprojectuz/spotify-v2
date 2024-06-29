import ytdlcore from "ytdl-core";

export const getByOneMusic = async (videoId) => {
  // let info = await ytdlcore.getInfo(
  //   "https://music.youtube.com/watch?v=" + videoId,
  //   {
  //     lang: "en",
  //   }
  // );
  // "https://music.youtube.com/watch?v=" +
  // let info = await ytdlcore("https://music.youtube.com/watch?v=" + videoId, {
  //   lang: "en",
  //   format: "audioonly",
  // });
  let info = await ytdlcore.getInfo(
    "https://music.youtube.com/watch?v=" + videoId,
    {
      lang: "en",

      format: "audioonly",
    }
  );

  const formats = await ytdlcore.filterFormats(info.formats, "audioonly");
  return formats;
};
