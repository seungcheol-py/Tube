import express from "express";
import routes from "../routes";
import {
  upload,
  videoDetail,
  editVideo,
  deleteVideo
} from "../Controllers/videoController";

const videoRouter = express.Router();

//videoRouter.get(routes.home, (req, res) => res.send(""));
//localhost:4000/videos
videoRouter.get(routes.upload, upload);
videoRouter.get(routes.videoDetail, videoDetail);
videoRouter.get(routes.editVideo, editVideo);
videoRouter.get(routes.deleteVideo, deleteVideo);

export default videoRouter;
