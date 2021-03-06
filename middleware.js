import routes from "./routes";
import multer from "multer";

const multerVideo = multer({ dest: "upload/videos/" });
const multerAvatar = multer({ dest: "upload/avatars/" });

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "Wetube";
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null;
  next();
};

export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};

export const multerSingleVideo = multerVideo.single("videoFile");
export const multerSingleAvatar = multerAvatar.single("avatar");
