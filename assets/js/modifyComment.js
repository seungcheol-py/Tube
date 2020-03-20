import axios from "axios";

const commentNumber = document.getElementById("jsCommentNumber");
const currentUserName = document.getElementById("jsUserName");
const addCommentForm = document.getElementById("jsAddComment");
const addCommentBtn = document.getElementById("commentBtn");

const commentList = document.getElementById("jsCommentList");
const deleteCommentBtn = document.getElementsByClassName("delete_comment");

//frontend-addcomment
const increaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};

//frontend-deletecomment
const decreaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
};

//frontend-addcomment
const addComment = (comment, commentId) => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const button = document.createElement("button");
  span.innerHTML = `${currentUserName.innerHTML} : ${comment}`;
  li.appendChild(span);
  commentList.prepend(li, button); //append를 사용하면 가장 밑에 새 댓글이 추가된다. // 두 개를 동시에 붙이자!
  button.innerHTML = `X`;
  button.id = commentId;
  button.addEventListener("click", handleClick);
  increaseNumber();
};

//backend-addcomment
const sendComment = async comment => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/comment`,
    method: "POST",
    data: { comment } //comment:comment 좌측: videoController의 postAddComment의comment 우측: 위의 변수
  });
  if (response.status === 200) {
    const { commentId } = response.data;
    addComment(comment, commentId);
  }
};

//frontend-addcomment
const handleSubmit = event => {
  event.preventDefault(); // 새로고침 방지
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value; //적혀있는 값을 받아와서
  sendComment(comment);
  commentInput.value = ""; //빈 칸으로 만들어주기
  //   location.reload(); 댓글 입력 이후 새로고침하고 싶을 경우
};

//backend-deletecomment
const deleteComment = async id => {
  const commentId = id;
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${commentId}/comment/delete`,
    method: "POST",
    data: { videoId }
  });
  console.log(response);
};

//frontend-deletecomment
const handleClick = event => {
  const {
    target: button,
    target: { previousElementSibling: text },
    target: { id }
  } = event;
  commentList.removeChild(button);
  commentList.removeChild(text);
  decreaseNumber();
  deleteComment(id);
  //fake remove , I have to delete db
};

function init() {
  addCommentForm.addEventListener("submit", handleSubmit);
  for (var Btn of deleteCommentBtn) {
    Btn.addEventListener("click", handleClick);
  }
  // every button works
}

if (addCommentForm) {
  init();
}
