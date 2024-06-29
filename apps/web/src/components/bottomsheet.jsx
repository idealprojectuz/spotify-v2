import React from "react";
import "./bottomsheet.css";
import { request } from "../config/config";
export const Bottomsheet = ({ open, setIsOpen, track }) => {
  //bg-[var(--tg-theme-section-bg-color)] background old
  const [audio, setAudio] = React.useState(null);
  const newthumb = track.thumbnailUrl.replace("w120-h120", "w220-h220");
  const getAudio = async () => {
    try {
      const response = await request("/song/" + track.youtubeId);
      if (response.status == 200) {
        setAudio(response.data);
        return response.data;
      }
    } catch (error) {
      //   Telegram.WebApp.HapticFeedback.notificationOccurred("error");
      console.log(error);
    }
  };
  React.useEffect(() => {
    getAudio();
  }, [track, open]);
  // React.useEffect(() => {
  // const handleOpen = async () => {
  //   if (open) {
  //     // await getAudio funksiyasini chaqirish
  //     getAudio();
  //     // audio holati nullga teng emasligini tekshirish
  //     Telegram.WebApp.setHeaderColor(
  //       Telegram.WebApp.themeParams.secondary_bg_color
  //     );
  //     Telegram.WebApp.MainButton.show();
  //     Telegram.WebApp.MainButton.setParams({
  //       is_active: true,
  //       color: "#1ED760",
  //       text: "Save Telegram",
  //     });
  //   } else {
  //     Telegram.WebApp.MainButton.hide();
  //     Telegram.WebApp.setHeaderColor(Telegram.WebApp.themeParams.bg_color);
  //   }
  // };
  // handleOpen();
  // }, [open, track?.youtubeId]);
  return (
    <div
      style={{
        // boxShadow: "0px -5px 30px 0px var(--tg-theme-section-bg-color)",
        WebkitHeight: "100vh",
        transitionDuration: "0.5s",
      }}
      className={`w-full h-[100vh] overflow-hidden bg-[var(--tg-theme-secondary-bg-color)] ${
        open
          ? "translate-y-[0vh] transition-all "
          : "transition-all  translate-y-[100vh]"
      }     fixed left-0 bottom-0 z-[999] `}>
      <div
        onClick={() => setIsOpen(false)}
        className="close-btn z-[999]  mt-3 cursor-pointer w-[32px] h-[32px] flex justify-center items-center rounded-[100%] bg-[var(--tg-theme-section-bg-color)] absolute right-0 mr-5">
        <svg
          height="18px"
          id="Layer_1"
          // style={{ enableBackground: "new 0 0 512 512" }}
          version="1.1"
          viewBox="0 0 512 512"
          width="18px"
          xmlSpace="preserve"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink">
          <path
            className="fill-[var(--tg-theme-subtitle-text-color)]"
            d="M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z"
          />
        </svg>
      </div>
      <div className="h-full flex items-center flex-col relative">
        <div className="h-[350px]    z-[99] mt-[0px] w-full overflow-hidden   ">
          <img src={newthumb} className="object-cover h-full w-full" />
        </div>
        <div className="text-left block  w-full">
          <h2 className="text-left text-[24px] font-[500]">{track.title}</h2>
          <p className="text-[var(--tg-theme-subtitle-text-color)]">
            {track?.artists?.map((el) => (
              <React.Fragment key={el?.id}>
                <span>{el.name} </span>
              </React.Fragment>
            ))}
            | {track.duration.label}
          </p>
        </div>
        <div className={`  absolute left-0 bottom-0 w-full h-full`}></div>

        <audio controls className="w-full">
          {audio?.map((el, idx) => {
            return (
              <source
                key={idx}
                type={el.mimeType}
                src={`${
                  import.meta.env.VITE_PUBLIC_URL
                }/listen?url=${encodeURIComponent(el.url)}`}
              />
            );
          })}
          {/* <source type={audio?.mimeType} src={audio.url} /> */}
        </audio>
      </div>
    </div>
  );
};
