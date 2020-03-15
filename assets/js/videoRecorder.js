const recordContainer = document.getElementById("jsRecordContainer");
const recordButton = document.getElementById("jsRecordButton");
const videoPreview = document.getElementById("jsVideoPreview");

let streamObject;
let videoRecorder;

const handleVideoData = event => {
  const { data: videoFile } = event;
  const link = document.createElement("a");
  link.href = URL.createObjectURL(videoFile);
  link.download = "recorded.webm";
  document.body.appendChild(link);
  link.click();
};

const startRecording = () => {
  videoRecorder = new MediaRecorder(streamObject);
  videoRecorder.start();
  videoRecorder.addEventListener("dataavailable", handleVideoData);
  recordButton.addEventListener("click", stopRecording);
};

const stopRecording = () => {
  videoRecorder.stop();
  streamObject.getVideoTracks()[0].stop(); //카메라 끄기
  recordButton.removeEventListener("click", stopRecording);
  recordButton.addEventListener("click", getVideo);
  recordButton.innerHTML = "Start recording";
};

const getVideo = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true
    });
    videoPreview.srcObject = stream;
    // videoPreview.muted = true;
    videoPreview.play();
    recordButton.innerHTML = "Stop recording";
    streamObject = stream;
    startRecording(streamObject);
  } catch (error) {
    recordButton.innerHTML = "Can't record";
  } finally {
    recordButton.removeEventListener("click", getVideo);
  }
};

function init() {
  recordButton.addEventListener("click", getVideo);
}

if (recordContainer) {
  init();
}
