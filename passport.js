import passport from "passport";
import GithubStrategy from "passport-github";
import FacebookStrategy from "passport-facebook";
import KakaoStrategy from "passport-kakao";
import NaverStrategy from "passport-naver";

import User from "./models/User";
import {
  githubLoginCallback,
  facebookLoginCallback,
  kakaoLoginCallback,
  naverLoginCallback
} from "./Controllers/userController";
import routes from "./routes";

passport.use(User.createStrategy());

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: `http://localhost:4000${routes.githubCallback}`
    },
    githubLoginCallback
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FB_ID,
      clientSecret: process.env.FB_SECRET,
      callbackURL: `http://localhost:4000${routes.facebookCallback}`,
      profileFields: ["id", "displayName", "photos", "email"],
      scope: ["public_profile", "email"]
    },
    facebookLoginCallback
  )
);

passport.use(
  new KakaoStrategy(
    {
      clientID: process.env.KT_ID,
      clientSecret: process.env.KT_SECRET,
      callbackURL: `http://localhost:4000${routes.kakaoCallback}`
    },
    kakaoLoginCallback
  )
);

passport.use(
  new NaverStrategy(
    {
      clientID: process.env.NV_ID,
      clientSecret: process.env.NV_SECRET,
      callbackURL: `http://localhost:4000${routes.naverCallback}`
    },
    naverLoginCallback
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
