import { getFirestore, collection, addDoc } from "firebase/firestore";
import app from "../firebase";
import { createPicker } from "https://unpkg.com/picmo@latest/dist/index.js";

const db = getFirestore(app);

const userData = JSON.parse(localStorage.getItem("user"));
console.log(userData);

const colorCardEls = document.querySelectorAll(".card-color div span");
const leftCardEl = document.querySelector(".left-card");
const addImoEl = document.querySelector(".add-imo");
const submitBtnEl = document.querySelector(".submit-chat");
const chatCardTitle = document.querySelector(".chat-card-title");

// 이모티콘 선택장 생성
const imoContainer = document.querySelector(".pickerContainer");
const picker = createPicker({
  rootElement: imoContainer,
});

// 이모티콘 선택장 출력
addImoEl.addEventListener("click", () => {
  imoContainer.classList.toggle("active");
});

// 이모티콘 클릭하면 적용
picker.addEventListener("emoji:select", (selection) => {
  chatCardTitle.textContent = selection.emoji;
  imoContainer.classList.remove("active");
  console.log(selection.emoji);
});

// 색상 변경 코드
let selectedColor;
colorCardEls.forEach((colorCardEl) => {
  colorCardEl.addEventListener("click", () => {
    const backgroundColor = getComputedStyle(colorCardEl).backgroundColor;
    selectedColor = backgroundColor;
    leftCardEl.style.backgroundColor = backgroundColor;
    // console.log(backgroundColor);
  });
});

// 키워드 추가 코드
const cardTagInputEls = document.querySelectorAll(".card-tag input");
const cardTagBox = document.querySelector(".chat-card-tag");
const tags = [];
cardTagInputEls.forEach((cardTagInputEl, i) => {
  cardTagInputEl.addEventListener("change", (e) => {
    const tag = document.querySelector(`.tag-${i}`);
    if (tag) {
      tag.textContent = "# " + e.target.value;
    } else {
      const tagInput = document.createElement("span");
      tagInput.classList.add(`tag-${i}`);
      tagInput.textContent = "# " + e.target.value;
      cardTagBox.appendChild(tagInput);
      // console.log(1);
    }
    //tags 배열에 저장
    const tagText = e.target.value.trim();
    if (tagText) {
      tags.push(tagText);
    }
  });
});

submitBtnEl.addEventListener("click", async (e) => {
  e.preventDefault();

  const newRoomData = {
    title: chatCardTitle.textContent,
    color: selectedColor,
    createdAt: new Date(),
    host: userData.uid,
    likes: 0,
    // host: ,
    tag: tags,
  };

  try {
    const docRef = await addDoc(collection(db, "room"), newRoomData);
    console.log("Document written with ID: ", docRef.id);
    window.location.href = "../index.html";
  } catch (error) {
    console.log(error.message);
  }
});
