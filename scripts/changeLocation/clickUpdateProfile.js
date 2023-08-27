import { db } from '../firebase.js';
import {
  doc,
  setDoc,
  getDocs,
  collection,
  query,
  where,
} from 'https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js';

const goUpdatePage = document.querySelector('.go-update-page');
const goProfilePage = document.querySelector('.go-profile-page');
const url = new URL(window.location);
const urlParams = url.searchParams;
const userID = urlParams.get('id');

const userSnap = await getDocs(
  query(collection(db, 'users'), where('name', '==', userID))
);

const userDoc = userSnap.docs[0];
const userDisplayName = document.getElementById('userDisplayName');
userDisplayName.innerText = userDoc.data().name;

if (goUpdatePage) {
  goUpdatePage.addEventListener('click', () => {
    window.location.href = `./updateMyPage.html?id=${userID}`;
  });
}

if (goProfilePage) {
  goProfilePage.addEventListener('click', () => {
    window.location.href = './myPage.html';
  });
}

document.querySelector('.submit-btn').addEventListener('click', async (e) => {
  e.preventDefault();
  await setDoc(doc(db, 'users', userID), {
    name: nameInput.value,
    email: emailInput.value,
    // 필드 이름 수정 필요
    phon: phoneInput.value,
  }).then(() => {
    window.location.href = '/';
  });
});
