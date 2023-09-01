import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import app from "./firebase";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { v4 as uuid } from "uuid";

const user = JSON.parse(localStorage.getItem("user"));

const firestore = getFirestore(app);

let queryString = window.location.search;
let queryParams = new URLSearchParams(queryString);
let parameterValue = queryParams.get("id");

const chatBox = document.querySelector(".chat-room-mid");
const chatRoomHeader = document.querySelector(".chat-room-header");
const chatRoomBottom = document.querySelector(".chat-room-bottom");

async function getCollectionData(collectionName) {
  const querySnapshot = await getDocs(collection(firestore, collectionName));

  const data = querySnapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });

  return data;
}

const createChatRoom = async () => {
  const cardData = await getCollectionData("room");
  const card = cardData.filter((card) => card.id === parameterValue)[0];

  console.log(card);

  const message = await Promise.all(
    card.mid.map(async (id) => await findMessages(id))
  );

  sortByTimeRe(message);

  const messageEl = message.map((v) => {
    return createMessages(user.id, v.uid, v.chat);
  });

  console.log(message);

  messageEl.forEach((v) => {
    chatBox.appendChild(v);
  });

  chatBox.style.borderColor = card.color;
  chatRoomHeader.style.backgroundColor = card.color;
  chatRoomBottom.style.backgroundColor = card.color;
};

const findMessages = async (id) => {
  const messagesData = await getCollectionData("messages");
  const messages = messagesData.filter((message) => message.id === id)[0];
  // console.log(messages);
  return messages;
};

const createMessages = (uid, id, chat) => {
  const wrap = document.createElement("div");
  const text = document.createElement("div");
  text.innerText = chat;
  if (uid === id) {
    wrap.classList.add("me");
  } else {
    wrap.classList.add("you");
  }
  wrap.appendChild(text);
  return wrap;
};

const sortByTimeRe = (data) => {
  data.sort((a, b) => {
    if (a.createdAt.seconds === b.createdAt.seconds) {
      return a.createdAt.nanoseconds - b.createdAt.nanoseconds;
    } else {
      return a.createdAt.seconds - b.createdAt.seconds;
    }
  });
};
// createChatRoom();
// 채팅 색상 목록  rgb(171, 71, 188)보라,
// rgb(255, 167, 38)주황, rgb(239, 83, 80)빨갈,
// rgb(92, 107, 192)파랑, rgb(120, 144, 156)회색,
// rgb(141, 110, 99)갈색, rgb(156, 204, 101)초록,
// rgb(38, 166, 154)형광?
// console.log(user);

const chatTitle = document.querySelector(".chat-title");
const chatInput = document.querySelector(".chat-input");
const submitBtn = document.querySelector(".submit-mg");

const database = getDatabase(app);

function writeUserData(value, uid, mid, time) {
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
}

let mg;
chatInput.addEventListener("input", (e) => {
  mg = e.target.value;
  // console.log(mg);
});

submitBtn.addEventListener("click", () => {
  chatInput.value = "";
  let currentTime = new Date();
  let time = {
    seconds: Math.floor(currentTime / 1000), // 초 단위
    nanoseconds: currentTime.getMilliseconds() * 1000000, // 나노초 단위
  };

  writeUserData(mg, user.uid, uuid(), time);
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
