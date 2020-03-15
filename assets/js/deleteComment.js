import axios from "axios";

const deleteCommentBtn = document.getElementsByClassName("delete_commment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");

const decreaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
};
const deleteComment = async id => {
  const commentId = id;
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${commentId}/comment/delete`,
    method: "POST",
    data: { videoId }
  });
};

const handleClick = event => {
  const button = event.target;
  const text = event.target.previousElementSibling;
  const div = event.target.nextElementSibling;
  const id = div.innerHTML;
  commentList.removeChild(button);
  commentList.removeChild(text);
  decreaseNumber();
  deleteComment(id);
  //fake remove , I have to delete db
};

function init() {
  for (var Btn of deleteCommentBtn) {
    Btn.addEventListener("click", handleClick);
  }
}
// every button works

if (deleteCommentBtn) {
  init();
}
