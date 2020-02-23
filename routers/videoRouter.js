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
import { multerSingleVideo, onlyPrivate } from "../middleware";

const videoRouter = express.Router();

//videoRouter.get(routes.home, (req, res) => res.send(""));
//localhost:4000/videos
videoRouter.get(routes.upload, onlyPrivate, getUpload);
videoRouter.post(routes.upload, onlyPrivate, multerSingleVideo, postUpload);

videoRouter.get(routes.videoDetail(), videoDetail);

videoRouter.get(routes.editVideo(), onlyPrivate, getEditVideo);
videoRouter.post(routes.editVideo(), onlyPrivate, postEditVideo);

videoRouter.get(routes.deleteVideo(), onlyPrivate, deleteVideo);

export default videoRouter;
