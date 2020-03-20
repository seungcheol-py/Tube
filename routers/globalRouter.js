import express from "express";
import passport from "passport";
import routes from "../routes";
import {
  postJoin,
  getJoin,
  getLogin,
  postLogin,
  logout,
  githubLogin,
  postGithubLogin,
  getMe,
  facebookLogin,
  postFacebookLogin,
  kakaoLogin,
  postKakaoLogin,
  naverLogin,
  postNaverLogin
} from "../Controllers/userController";
import { home, search } from "../Controllers/videoController";
import { onlyPublic, onlyPrivate } from "../middleware";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.logout, onlyPrivate, logout);
globalRouter.get(routes.search, search);

globalRouter.get(routes.me, getMe);

globalRouter.get(routes.gitHub, githubLogin);
globalRouter.get(
  routes.githubCallback,
  passport.authenticate("github", {
    failureRedirect: "/login",
    successFlash: "Welcome"
  }),
  postGithubLogin
);

globalRouter.get(routes.facebook, facebookLogin);
globalRouter.get(
  routes.facebookCallback,
  passport.authenticate("facebook", {
    failureMessage: "/login",
    successFlash: "Welcome"
  }),
  postFacebookLogin
);
globalRouter.get(routes.kakao, kakaoLogin);
globalRouter.get(
  routes.kakaoCallback,
  passport.authenticate("kakao", {
    failureRedirect: "/login",
    successFlash: "Welcome"
  }),
  postKakaoLogin
);

globalRouter.get(routes.naver, naverLogin);
globalRouter.get(
  routes.naverCallback,
  passport.authenticate("naver", {
    failureRedirect: "/login",
    successFlash: "Welcome"
  }),
  postNaverLogin
);

// globalRouter.get(routes.naver);
// globalRouter.get(
//   routes.naverCallback,
//   passport.authenticate("naver", { failureRedirect: "/login" }),
//   postNaverLogin
// );

export default globalRouter;
