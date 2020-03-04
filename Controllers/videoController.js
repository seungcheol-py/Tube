import routes from "../routes";
import Video from "../models/Video";

export const home = async (req, res) => {
  try {
    const videoFiles = await Video.find({}).sort({ _id: -1 });
    res.render("home", { pageTitle: "Home", videoFiles });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", videoFiles: [] });
  }
};

export const search = async (req, res) => {
  //const searchTerm = req.query.term;
  const {
    query: { term: searchTerm }
  } = req;
  let videos = [];
  try {
    videos = await Video.find({ title: { $regex: searchTerm, $options: "i" } });
  } catch (error) {
    console.log(error);
  }
  res.render("search", { pageTitle: "Search", searchTerm, videos });
};

export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });

export const postUpload = async (req, res) => {
  const PATH = req.file.path;
  const newVideo = await Video.create({
    fileUrl: PATH,
    title: req.body.title,
    description: req.body.description,
    creator: req.user.id
  });
  req.user.videos.push(newVideo.id);
  req.user.save();
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const designatedVideo = await Video.findById(id).populate("creator");
    res.render("videoDetail", {
      pageTitle: designatedVideo.title,
      designatedVideo
    });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const getEditVideo = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const designatedVideo = await Video.findById(id);
    if (String(designatedVideo.creator) !== req.user.id) {
      throw Error();
    } else {
      res.render("editVideo", {
        pageTitle: `Edit ${designatedVideo.title}`,
        designatedVideo
      });
    }
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description }
  } = req;
  try {
    await Video.findOneAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    await Video.findOneAndRemove({ _id: id });
  } catch (error) {}
  res.redirect(routes.home);
};
