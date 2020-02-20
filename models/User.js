import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserScehma = new mongoose.Schema({
  name: String,
  email: String,
  avatarUrl: String,
  facebookId: Number,
  githubId: Number
});

UserScehma.plugin(passportLocalMongoose, { usernameField: "email" });

const model = mongoose.model("User", UserScehma);
export default model;
