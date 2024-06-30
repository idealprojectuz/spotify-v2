import React, { Suspense } from "react";
import "./content.css";
import { Bottomsheet } from "./bottomsheet";
import { useNavigate } from "react-router-dom";
export const Track = ({ track }) => {
  const [open, setIsOpen] = React.useState(false);
  const navigate = useNavigate();
  // const handledownload = async () => {
  //   const sending = {
  //     id: track.youtubeId,
  //     title: track.title,
  //     artists: track.artists,
  //   };
  //   Telegram.WebApp.sendData(JSON.stringify(sending));
  //   // console.log(sending);
  // };
  // Telegram.WebApp.onEvent("mainButtonClicked", handledownload);

  // React.useEffect(() => {
  //   if (open) {
  //     setTimeout(() => {
  //       Telegram.WebApp.MainButton.show();
  //       Telegram.WebApp.setHeaderColor(
  //         Telegram.WebApp.themeParams.secondary_bg_color
  //       );
  // Telegram.WebApp.MainButton.setParams({
  //   is_active: true,
  //   color: "#1ED760",
  //   text: "Save Telegram",
  // }).onClick(() => {
  //   const sending = {
  //     id: track.youtubeId,
  //     title: track.title,
  //     artists: track.artists,
  //   };
  //   alert(JSON.stringify(sending, null, 2));
  //   Telegram.WebApp.sendData(JSON.stringify(sending));
  //   return;
  // });
  // }, 1000);
  // } else {
  // Telegram.WebApp.MainButton.hide();
  // Telegram.WebApp.MainButton.offClick(() => {});
  // Telegram.WebApp.MainButton.disable();
  // }
  // }, [track, open]);
  // Telegram.WebApp.offEvent("mainButtonClicked", handledownload);
  const switchMusic = (videoId) => {
    const searchParams = new URLSearchParams();
    // searchParams.set("videoId", videoId);
    for (const [key, value] of Object.entries(track)) {
      if (key == "artists") {
        searchParams.set(key, JSON.stringify(value));
      } else {
        searchParams.set(key, value);
      }
    }

    navigate("/music?" + searchParams.toString());
  };

  return (
    <>
      <div
        onClick={() => switchMusic(track.youtubeId)}
        className="music-item cursor-pointer w-full flex gap-3 h-[88px] min-h-[100px] rounded-[12px] mb-[10px] text-center">
        <div className="thumbnail  overflow-hidden relative w-[40%] max-w-[100px]  h-full ">
          <img
            src={track.thumbnailUrl}
            alt="thumbnail"
            className="w-full h-full  object-cover rounded-[12px]"
          />
          {/* <div className="thumbnail-overlay flex justify-center items-center  absolute left-0 top-0 w-full h-full  "></div> */}
        </div>
        <div className=" content-wrapper pt-1">
          <h2 className="title text-left break-words">{track.title}</h2>

          <p className="artist text-[12px] text-[var(--tg-theme-subtitle-text-color)]  text-left">
            {track?.artists?.map((el) => (
              <React.Fragment key={el.id}>
                <span>{el.name} </span>
              </React.Fragment>
            ))}
            |{track.duration.label}
          </p>
          {/* <p className="text-left text-[12px]">{}</p> */}
        </div>
      </div>
      {/* <Suspense>
        <Bottomsheet open={open} track={track} setIsOpen={setIsOpen} />
      </Suspense> */}
    </>
  );
};
