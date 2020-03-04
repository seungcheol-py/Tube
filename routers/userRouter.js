import express from "express";
import routes from "../routes";
import {
  userDetail,
  getEditProfile,
  postEditProfile,
  getChangePassword,
  postChangePassword
} from "../Controllers/userController";
import { onlyPrivate, multerSingleAvatar } from "../middleware";

const userRouter = express.Router();

userRouter.get(routes.editProfile, onlyPrivate, getEditProfile);
userRouter.post(
  routes.editProfile,
  onlyPrivate,
  multerSingleAvatar,
  postEditProfile
);

userRouter.get(routes.changePassword, onlyPrivate, getChangePassword);
userRouter.post(routes.changePassword, onlyPrivate, postChangePassword);

userRouter.get(routes.userDetail(), userDetail);
//제일 아래로

export default userRouter;
