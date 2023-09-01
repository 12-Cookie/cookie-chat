import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import clickChat from "./changeLocation/clickChat";
import app from "./firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

const userData = JSON.parse(localStorage.getItem("user"));

const cardContainer = document.querySelector(".card-container");
const chatListBtn = document.querySelector(".chat-list");
const myChatBtn = document.querySelector(".my-chat");
const likeChatBtn = document.querySelector(".like-chat");

const firestore = getFirestore(app);

async function getCollectionData(collectionName, user) {
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

  const likeCard = [];
  if (user) {
    user.likes.forEach((like) => {
      const data = cards.filter((card) => like === card.id);
      likeCard.push(data[0]);
    });
  }

  const myCard = [];
  cards.forEach((card) => {
    if (card.host === user.id) {
      myCard.push(card);
    }
  });

  chatListBtn.addEventListener("click", () => {
    viewCardData(cards);
  });
  myChatBtn.addEventListener("click", () => {
    viewCardData(myCard);
    const addCardBtn = document.createElement("li");
    addCardBtn.classList.add("swiper-slide", "add-chat");
    addCardBtn.textContent = "채팅방 추가하기";
    addCardBtn.addEventListener("click", () => {
      window.location.href = "./views/createChat.html";
    });
    cardContainer.appendChild(addCardBtn);
  });
  likeChatBtn.addEventListener("click", () => {
    viewCardData(likeCard);
  });
  viewCardData(cards);
}

const viewCardData = (cards) => {
  cardContainer.innerHTML = "";
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
};

const createChatCard = ({ color, createdAt, likes, tag, title, id }) => {
  const date = formatTimestamp(createdAt);
  const chatCardEl = document.createElement("li");

  chatCardEl.classList.add("swiper-slide", "chat-card");
  chatCardEl.style.marginRight = "20px";
  chatCardEl.style.backgroundColor = color;

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

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = userData.uid;
    let docRef = doc(firestore, "users", uid);
    getDoc(docRef)
      .then((docSnapshot) => {
        const userData = docSnapshot.data();
        const user = { ...userData };

        getCollectionData("room", user);

        localStorage.setItem("user", JSON.stringify(userData));
      })
      .catch((error) => {
        console.log(error);
      });
    // console.log(auth.currentUser);
  } else {
    window.location.href = "./views/mainPage.html";
  }
});
