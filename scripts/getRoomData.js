import { getFirestore, collection, getDocs } from "firebase/firestore";
import clickChat from "./changeLocation/clickChat";
import app from "./firebase";

const cardContainer = document.querySelector(".card-container");

const firestore = getFirestore(app);

async function getCollectionData(collectionName) {
  const querySnapshot = await getDocs(collection(firestore, collectionName));
  const cards = querySnapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });

  cards.sort((a, b) => {
    if (a.createdAt.seconds === b.createdAt.seconds) {
      return b.createdAt.nanoseconds - a.createdAt.nanoseconds;
    } else {
      return b.createdAt.seconds - a.createdAt.seconds;
    }
  });

  // console.log(cards);
  cards.forEach((v) => {
    let data = {
      color: v.color,
      createdAt: v.createdAt,
      likes: v.likes,
      tag: v.tag,
      title: v.title,
      id: v.id,
    };
    cardContainer.appendChild(createChatCard(data));
  });
}

const createChatCard = ({ color, createdAt, likes, tag, title, id }) => {
  const date = formatTimestamp(createdAt);
  const chatCardEl = document.createElement("li");

  chatCardEl.classList.add("swiper-slide", "chat-card");
  chatCardEl.style.marginRight = "20px";

  chatCardEl.innerHTML = /* html */ `
    <div class="chat-card-header">
      <span>${date}</span>
      <div class="empty"></div>
      <i class="fa-regular fa-heart"></i>
      <span>${likes}</span>
    </div>
    <div class="chat-card-title">${title}</div>
    <div class="chat-card-tag">
      ${tag
        .map((v) => {
          return `<span>#${v}</span>`;
        })
        .join("")}
    </div>
  `;
  clickChat(chatCardEl, id);
  return chatCardEl;
};

const formatTimestamp = (obj) => {
  const date = new Date(obj.seconds * 1000 + obj.nanoseconds / 1000000);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}월 ${day}일`;
};

getCollectionData("room");
