import express from "express";
import routes from "../routes";
import {
  getUpload,
  postUpload,
  videoDetail,
  getEditVideo,
  postEditVideo,
  deleteVideo
} from "../Controllers/videoController";
import { multerSingleVideo } from "../middleware";

const videoRouter = express.Router();

//videoRouter.get(routes.home, (req, res) => res.send(""));
//localhost:4000/videos
videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, multerSingleVideo, postUpload);

videoRouter.get(routes.videoDetail(), videoDetail);

videoRouter.get(routes.editVideo(), getEditVideo);
videoRouter.post(routes.editVideo(), postEditVideo);

videoRouter.get(routes.deleteVideo(), deleteVideo);

export default videoRouter;
