import dotenv from "dotenv";
import express from "express";
import { join } from "path";
import { searchMusics } from "node-youtube-music";
import { getByOneMusic } from "./music.js";
import cors from "cors";
import jwt from "jsonwebtoken";
import { authMiddleware } from "./middleware/auth.middleware.js";
import axios from "axios";
dotenv.config({
  path: join(process.cwd(), "..", "..") + "/.env",
});
const app = express();
app.use(cors());
app.use(express.json());

app.get("/song", async (req, res) => {
  try {
    const data = await searchMusics(req.query.q);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(401).json({
      ok: false,
      message: error.message || "Internal Server Error",
    });
  }
});
app.get("/song/:songId", async (req, res) => {
  try {
    // let uri =
    //   "https://rr1---sn-npoe7ns7.googlevideo.com/videoplayback?expire=1719004709&ei=xZl1ZsqMDZGp3LUPjpGnoAQ&ip=45.145.155.162&id=o-ACZCpM0olprIatq9JPe8hNSCXfr60wx2EQ8bMdk4z_Kp&itag=251&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&mh=-l&mm=31%2C29&mn=sn-npoe7ns7%2Csn-npoeened&ms=au%2Crdu&mv=m&mvi=1&pl=25&gcr=us&initcwndbps=1195000&bui=AbKP-1Min1YyKUOBZj-Vwn82m2vSyiM1ABEvnPjoebwxAh3aNDdxnpZcxEjrt27Wp3w-6n1UqDLhyQD9&spc=UWF9f8u-rP1QS6Pcpwwz5gFB5fdX-KQ1orKsXnJRlDUc19m5h26_lBqmXJ8j&vprv=1&svpuc=1&mime=audio%2Fwebm&ns=YsXtKxBP92vs2aiGxTuLRYkQ&rqh=1&gir=yes&clen=3996185&dur=231.821&lmt=1714830289700917&mt=1718982547&fvip=2&keepalive=yes&c=WEB&sefc=1&txp=4532434&n=eVyl0rsFYQ0rmw&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cgcr%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AHlkHjAwRQIgXXySQijm52RCb060ia23N7z828WUBsL6G5Tru6rBsLYCIQDtj7r6EyYC0LUkWvQ0lLG1CnVkEmtqYuNdOmj8aOB5NA%3D%3D&sig=AJfQdSswRQIgMIu6-O08D3NGBOCo44pyv2QjUabWJnpRWw0S9Lac-cMCIQCRcIeplxYlD7_yFNr8jcW80GjBEtSobeV3d7bpgp37AQ%3D%3D";
    // const token = jwt.sign({ uri }, process.env.SECRET_KEY, {
    //   expiresIn: "1h",
    // });
    const formats = await getByOneMusic(req.params.songId);
    const newdata = formats.map((format) => {
      return {
        ...format,
      };
    });
    return res.status(200).json(newdata);
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      ok: false,
      message: error.message || "Something went wrong",
    });
  }
});

app.get("/listen", async (req, res) => {
  // console.log(req.payload);
  try {
    const musicUrl = req.query.url;
    // Range so'rovini olish
    const range = req.headers.range;
    if (!range) {
      return res.status(400).send("Range header is required");
    }

    // Musiqa faylini olish uchun axios so'rovi
    const response = await axios({
      url: musicUrl,
      method: "GET",
      responseType: "stream",
      headers: {
        Range: range,
      },
    });

    // Status kodni tekshirish
    if (response.status === 206) {
      // Content-Range va Content-Length boshliqlarini sozlash
      res.setHeader("Content-Range", response.headers["content-range"]);
      res.setHeader("Content-Length", response.headers["content-length"]);
      res.setHeader("Accept-Ranges", "bytes");
      res.setHeader("Content-Type", response.headers["content-type"]);
      res.status(206);
      // Response'ni stream qilib qaytarish
      response.data.pipe(res);
    } else {
      res.status(response.status).send("Failed to fetch the music file");
    }
  } catch (error) {
    res.status(400).send("error");
  }
});

// app.

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
