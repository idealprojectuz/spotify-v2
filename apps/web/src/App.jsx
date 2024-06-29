import React, { Suspense } from "react";
import { SearchPanel } from "./components/SearchPanel";
import { Header } from "./components/header";
import { Track } from "./components/track";
import { request } from "./config/config";
import { Bottomsheet } from "./components/bottomsheet";
import ContentLoader from "react-content-loader";

function App() {
  const [user, setUser] = React.useState(null);
  const initProject = () => {
    window?.Telegram?.WebApp?.ready();
    // window?.Telegram?.WebApp?.requestWriteAccess((status) =>
    //   console.log(status)
    // );
    // console.log(Telegram.WebView.receiveEvent());
    Telegram?.WebApp?.expand();
    setUser(Telegram.WebApp.initDataUnsafe);
    // console.log(Telegram.WebApp.disableClosingConfirmation());
    function setThemeClass() {
      document.documentElement.className = Telegram.WebApp.colorScheme;
      Telegram.WebApp.setHeaderColor(Telegram.WebApp.themeParams.bg_color);
      Telegram.WebApp.disableClosingConfirmation();

      // setThemeSettings(Telegram.WebApp.themeParams);
    }

    // console.log(Telegram.WebApp.backgroundColor);
    Telegram.WebApp.onEvent("themeChanged", setThemeClass);
    setThemeClass();
  };
  const [tracks, setTracks] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    initProject();
    getMusic();
  }, []);
  const data = { text: "Hello world" };

  const getMusic = async (search = null) => {
    try {
      setLoading(true);
      const musiclist = await request.get("/song", {
        params: {
          q: search ? search : "konsta " + new Date().getFullYear(),
        },
      });

      if (musiclist.status == 200) {
        setTracks(musiclist.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="relative">
      {/* <Loading /> */}

      <header className="container search-panel-wrapper py-3 rounded-b-[12px]">
        <Header />
        <SearchPanel getMusic={getMusic} />
      </header>
      <main>
        <div className="container mt-[10px]">
          <h2 className="text-[22px] mb-2 font-[500] ">Tracks</h2>

          <div className="track-wrapper">
            {loading ? (
              <>
                <ContentLoader
                  width={"100%"}
                  speed={2}
                  height="80px"
                  style={{ marginBottom: "10px" }}
                  foregroundColor={"var(--tg-theme-secondary-bg-color)"}
                  backgroundColor="var(--tg-theme-section-bg-color)">
                  <rect
                    x="0"
                    y="0"
                    rx={"10px"}
                    // ry={"20px"}
                    // refX={"10px"}
                    width="100%"
                    height={"100%"}
                  />
                </ContentLoader>
                <ContentLoader
                  width={"100%"}
                  speed={2}
                  height="80px"
                  style={{ marginBottom: "10px" }}
                  foregroundColor={"var(--tg-theme-secondary-bg-color)"}
                  backgroundColor="var(--tg-theme-section-bg-color)">
                  <rect
                    x="0"
                    y="0"
                    rx={"10px"}
                    // ry={"20px"}
                    // refX={"10px"}
                    width="100%"
                    height={"100%"}
                  />
                </ContentLoader>
                <ContentLoader
                  width={"100%"}
                  speed={2}
                  height="80px"
                  style={{ marginBottom: "10px" }}
                  foregroundColor={"var(--tg-theme-secondary-bg-color)"}
                  backgroundColor="var(--tg-theme-section-bg-color)">
                  <rect
                    x="0"
                    y="0"
                    rx={"10px"}
                    // ry={"20px"}
                    // refX={"10px"}
                    width="100%"
                    height={"100%"}
                  />
                </ContentLoader>
                <ContentLoader
                  width={"100%"}
                  speed={2}
                  height="80px"
                  style={{ marginBottom: "10px" }}
                  foregroundColor={"var(--tg-theme-secondary-bg-color)"}
                  backgroundColor="var(--tg-theme-section-bg-color)">
                  <rect
                    x="0"
                    y="0"
                    rx={"10px"}
                    // ry={"20px"}
                    // refX={"10px"}
                    width="100%"
                    height={"100%"}
                  />
                </ContentLoader>
                <ContentLoader
                  width={"100%"}
                  speed={2}
                  height="80px"
                  style={{ marginBottom: "10px" }}
                  foregroundColor={"var(--tg-theme-secondary-bg-color)"}
                  backgroundColor="var(--tg-theme-section-bg-color)">
                  <rect
                    x="0"
                    y="0"
                    rx={"10px"}
                    // ry={"20px"}
                    // refX={"10px"}
                    width="100%"
                    height={"100%"}
                  />
                </ContentLoader>
                <ContentLoader
                  width={"100%"}
                  speed={2}
                  height="80px"
                  style={{ marginBottom: "10px" }}
                  foregroundColor={"var(--tg-theme-secondary-bg-color)"}
                  backgroundColor="var(--tg-theme-section-bg-color)">
                  <rect
                    x="0"
                    y="0"
                    rx={"10px"}
                    // ry={"20px"}
                    // refX={"10px"}
                    width="100%"
                    height={"100%"}
                  />
                </ContentLoader>
              </>
            ) : tracks?.length ? (
              tracks?.map((track) => {
                return (
                  <Suspense key={track?.youtubeId}>
                    <Track track={track} />
                  </Suspense>
                );
              })
            ) : (
              <div className="flex justify-center items-center">
                <h2 className="text-center"></h2>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
