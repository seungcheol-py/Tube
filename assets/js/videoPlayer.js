const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playButton = document.getElementById("jsPlayButton");
const volumeButton = document.getElementById("jsVolumeButton");
const screenButton = document.getElementById("jsFullScreen");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumeRange = document.getElementById("jsVolume");
const playerRange = document.querySelector(".jsVideoPlayer");
const boxOutside = document.querySelector(".jsPlayerBoxOutside");
const boxInside = document.querySelector(".jsPlayerBoxInside");

function handlePlayClick() {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playButton.innerHTML = `<i class="fas fa-pause"></i>`;
  } else {
    videoPlayer.pause();
    playButton.innerHTML = `<i class="fas fa-play"></i>`;
  }
}

function handleVolumeClick() {
  if (videoPlayer.muted) {
    videoPlayer.muted = false;
    volumeButton.innerHTML = '<i class="fas fa-volume-up"></i>';
    volumeRange.value = videoPlayer.volume;
  } else {
    videoPlayer.muted = true;
    volumeButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
    volumeRange.value = 0;
  }
}

function exitFullScreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
  screenButton.innerHTML = '<i class="fas fa-expand"></i>';
  screenButton.removeEventListener("click", exitFullScreen);
  screenButton.addEventListener("click", goFullScreen);
}

function goFullScreen() {
  if (videoContainer.requestFullscreen) {
    videoContainer.requestFullscreen();
  } else if (videoContainer.mozRequestFullScreen) {
    videoContainer.mozRequestFullScreen();
  } else if (videoContainer.webkitRequestFullscreen) {
    videoContainer.webkitRequestFullscreen();
  } else if (videoContainer.msRequestFullscreen) {
    videoContainer.msRequestFullscreen();
  }
  screenButton.innerHTML = '<i class="fas fa-compress"></i>';
  screenButton.removeEventListener("click", goFullScreen);
  screenButton.addEventListener("click", exitFullScreen);
}

const formatDate = seconds => {
  const secondsNumber = parseInt(seconds, 10);
  let hours = Math.floor(secondsNumber / 3600);
  let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
  let totalSeconds = secondsNumber - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (totalSeconds < 10) {
    totalSeconds = `0${totalSeconds}`;
  }
  return `${hours}:${minutes}:${totalSeconds}`;
};

function setTotalTime() {
  console.log(videoPlayer.currentTime);
  totalTime.innerHTML = formatDate(videoPlayer.duration);
  setInterval(getCurrentTime, 500);
}

function getCurrentTime() {
  currentTime.innerHTML = formatDate(videoPlayer.currentTime);
}

function handleEnded() {
  videoPlayer.currentTime = 0;
  playButton.innerHTML = `<i class="fas fa-play"></i>`;
}

function handleDrag(event) {
  const {
    target: { value }
  } = event;
  videoPlayer.volume = value;
  if (value >= 0.7) {
    volumeButton.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else if (value == 0) {
    volumeButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
  } else {
    volumeButton.innerHTML = '<i class="fas fa-volume-down"></i>';
  }
}

function boxMoving() {
  setInterval(boxStarting, 400);
}

function boxStarting() {
  value = videoPlayer.currentTime / videoPlayer.duration;
  processedValue = 300 * value;
  boxInside.style.width = processedValue + "px";
}

function handleBoxClick(event) {
  const { offsetX } = event;
  console.log(offsetX);
  value = offsetX / 300;
  videoPlayer.currentTime = videoPlayer.duration * value;
}

function init() {
  videoPlayer.volume = 0.7;
  playButton.addEventListener("click", handlePlayClick);
  volumeButton.addEventListener("click", handleVolumeClick);
  if (screenButton) {
    screenButton.addEventListener("click", goFullScreen);
  }
  videoPlayer.addEventListener("loadedmetadata", setTotalTime);
  videoPlayer.addEventListener("ended", handleEnded);
  volumeRange.addEventListener("input", handleDrag);
  boxOutside.addEventListener("click", handleBoxClick);
  boxMoving();
}

if (videoContainer) {
  init();
}
