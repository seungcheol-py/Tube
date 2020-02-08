import { videoFiles } from "../db";
import routes from "../routes";

export const home = (req, res) =>
  res.render("home", { pageTitle: "Home", videoFiles });

export const search = (req, res) => {
  const searchTerm = req.query.term;
  /* 
  const {
    query: { term: searchTerm }
  } = req;
  */
  res.render("search", {
    pageTitle: "Search",
    searchTerm: searchTerm,
    videoFiles
  });
};
// searchTerm (왼쪽) 이라는 변수는 searchTerm(오른쪽)을 의미한다.
// searchTerm (오른쪽)은 term에 할당된 이름이다.

export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });

export const postUpload = (req, res) => {
  console.log(req.body.videoFile);
  console.log(req.body.title);
  console.log(req.body.description);
  res.redirect(`/videos${routes.videoDetail()}`);
};

export const videoDetail = (req, res) =>
  res.render("videoDetail", { pageTitle: "Video Detail" });

export const editVideo = (req, res) =>
  res.render("editVideo", { pageTitle: "Edit Video" });

export const deleteVideo = (req, res) =>
  res.render("deleteVideo", { pageTitle: "Delete Video" });
