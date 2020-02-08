import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/TubeDatabase", {
  useNewUrlParser: true,
  useFindAndModify: false
});

const db = mongoose.connection;

const handleOpen = () => console.log("Connected to DB");
const handleError = error => console.log(`Error on DB Connection:${error}`);

db.once("open", handleOpen);
db.on("error", handleError);

// videosFiles는 array다. 왼쪽 파란색은 대소문자 따지는데 오른쪽은 안 따진다.
export const videoFiles = [
  {
    id: 342143,
    title: "Busking",
    description: "Busking in Thai, Perfect",
    views: 24,
    videoFile:
      "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
    // "/Videos/V1.mp4"라고 치면 http://localhost:4000/ 이 된다.
    creator: {
      name: "seungcheol",
      age: 27,
      id: 12142
    }
  },
  {
    id: 114247,
    title: "Fish",
    description: "Fish BBQ with CEO",
    views: 6,
    videoFile:
      "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
    creator: {
      name: "sooyeon",
      age: 24,
      id: 156
    }
  }
];
