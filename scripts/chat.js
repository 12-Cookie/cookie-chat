import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getDatabase, ref, set, onValue } from "firebase/database";
import app from "./firebase";
import { v4 as uuid } from "uuid";
import loading from "./loading";

loading(true);

const user = JSON.parse(localStorage.getItem("user"));

const firestore = getFirestore(app);

let queryString = window.location.search;
let queryParams = new URLSearchParams(queryString);
let parameterValue = queryParams.get("id");

const chatTitle = document.querySelector(".chat-title");
const chatBox = document.querySelector(".chat-room-mid");
const chatRoomHeader = document.querySelector(".chat-room-header");
const chatRoomBottom = document.querySelector(".chat-room-bottom");

const getCollectionData = async (collectionName) => {
  const querySnapshot = await getDocs(collection(firestore, collectionName));

  const data = querySnapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });

  return data;
};

const createChatRoom = async () => {
  const cardData = await getCollectionData("room");
  const card = cardData.filter((card) => card.id === parameterValue)[0];
  // console.log(card);

  chatTitle.textContent = card.title;
  chatBox.style.borderColor = card.color;
  chatRoomHeader.style.backgroundColor = card.color;
  chatRoomBottom.style.backgroundColor = card.color;
  loading(false);
};

createChatRoom();

const chatInput = document.querySelector(".chat-input");
const submitBtn = document.querySelector(".submit-mg");

const database = getDatabase(app);

const writeUserData = (value, uid, mid, time) => {
  set(ref(database, parameterValue + "/" + mid), {
    time: time,
    value: value,
    uid: uid,
  })
    .then(() => {
      console.log("good");
    })
    .catch((error) => {
      console.log(error);
    });
};

let mg;
chatInput.addEventListener("input", (e) => {
  mg = e.target.value;
  // console.log(mg);
});

const uploadChat = () => {
  chatInput.value = "";
  let currentTime = new Date();
  let time = {
    seconds: Math.floor(currentTime / 1000),
    nanoseconds: currentTime.getMilliseconds() * 1000000,
  };

  writeUserData(mg, user.uid, uuid(), time);
};

submitBtn.addEventListener("click", uploadChat);
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && chatInput.value !== "") {
    submitBtn.click();
  }
});

const starCountRef = ref(database, parameterValue + "/");
onValue(starCountRef, (snapshot) => {
  const data = snapshot;
  updateMessage(data);
});

const updateMessage = (data) => {
  chatBox.innerHTML = "";

  const chat = [];
  data.forEach((v) => {
    chat.push(v.val());
  });

  chat.sort((a, b) => {
    if (a.time.seconds === b.time.seconds) {
      return a.time.nanoseconds - b.time.nanoseconds;
    } else {
      return a.time.seconds - b.time.seconds;
    }
  });

  chat.forEach((v) => {
    const el = document.createElement("div");
    // console.log(v);
    if (user.uid === v.uid) {
      el.classList.add("me");
    } else {
      el.classList.add("you");
    }
    el.innerHTML = /* html */ `
      <div>${v.value}</div>
    `;
    chatBox.appendChild(el);
  });
};

// // 채팅 색상 목록  rgb(171, 71, 188)보라,
// rgb(255, 167, 38)주황, rgb(239, 83, 80)빨갈,
// rgb(92, 107, 192)파랑, rgb(120, 144, 156)회색,
// rgb(141, 110, 99)갈색, rgb(156, 204, 101)초록,
// rgb(38, 166, 154)형광?
