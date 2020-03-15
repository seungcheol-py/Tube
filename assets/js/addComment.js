import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");
const currentUserName = document.getElementById("jsUserName");

const increaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};

const addComment = comment => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const button = document.createElement("button");
  span.innerHTML = `${currentUserName.innerHTML} : ${comment}`;
  li.appendChild(span);
  commentList.prepend(li, button); //append를 사용하면 가장 밑에 새 댓글이 추가된다. // 두 개를 동시에 붙이자!
  button.innerHTML = `X`;
  const handleButtonClick = event => {
    const Btn = event.target;
    const text = event.target.previousElementSibling;
    commentList.removeChild(Btn);
    commentList.removeChild(text);
    console.log(event);
  };
  button.addEventListener("click", handleButtonClick);
  //fake comment도 삭제 가능하도록
  increaseNumber();
};

const sendComment = async comment => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/comment`,
    method: "POST",
    data: { comment } //comment:comment 좌측: videoController의 postAddComment의comment 우측: 위의 변수
  });
  if (response.status === 200) {
    addComment(comment);
  }
};

const handleSubmit = event => {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value; //적혀있는 값을 받아와서
  sendComment(comment);
  commentInput.value = ""; //빈 칸으로 만들어주기
  //   location.reload(); 댓글 입력 이후 새로고침하고 싶을 경우
};

function init() {
  addCommentForm.addEventListener("submit", handleSubmit);
}

if (addCommentForm) {
  init();
}
