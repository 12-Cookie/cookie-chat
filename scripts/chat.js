import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import app from "./firebase";

const firestore = getFirestore(app);

let queryString = window.location.search;
let queryParams = new URLSearchParams(queryString);
let parameterValue = queryParams.get("id");

const chatBox = document.querySelector("chat-room-mid");

async function getCollectionData(collectionName) {
  const querySnapshot = await getDocs(collection(firestore, collectionName));
  const cards = querySnapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
  const chatRoom = cards.filter((card) => card.id === parameterValue)[0];
  console.log(chatRoom);
}

getCollectionData("room");

// 채팅 색상 목록  rgb(171, 71, 188)보라,
// rgb(255, 167, 38)주황, rgb(239, 83, 80)빨갈,
// rgb(92, 107, 192)파랑, rgb(120, 144, 156)회색,
// rgb(141, 110, 99)갈색, rgb(156, 204, 101)초록,
// rgb(38, 166, 154)형광?
