const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playButton = document.getElementById("jsPlayButton");
const volumeButton = document.getElementById("jsVolumeButton");
const screenButton = document.getElementById("jsFullScreen");

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
  } else {
    videoPlayer.muted = true;
    volumeButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
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

function init() {
  playButton.addEventListener("click", handlePlayClick);
  volumeButton.addEventListener("click", handleVolumeClick);
  if (screenButton) {
    screenButton.addEventListener("click", goFullScreen);
  }
}

if (videoContainer) {
  init();
}
