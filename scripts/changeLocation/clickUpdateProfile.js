import { db } from '../firebase.js';
import {
  doc,
  setDoc,
  getDocs,
  collection,
} from 'https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js';

const goUpdatePage = document.querySelector('.go-update-page');
const goProfilePage = document.querySelector('.go-profile-page');
// const url = new URL(window.location);
// const urlParams = url.searchParams;
// const userID = urlParams.get('id');

const user = {
  id: 'xzIZIHffe8QpmF8GnBN6',
  email: 'test@test.com',
  isLogin: 'true',
  likes: ['sCBgQQYu52Au7HTdbq7g', '3v6iOUQhzX9WA1Qer4Ao'],
  name: 'user1',
  phone: '010-1111-1111',
};

localStorage.setItem('user', JSON.stringify(user));
const userID = JSON.parse(localStorage.getItem('user')).id;

const userSnap = await getDocs(collection(db, 'users'));
const userDoc = userSnap.docs.filter((doc) => doc.id === userID);
const userDisplayName = document.getElementById('userDisplayName');
userDisplayName.innerText = userDoc[0].data().name;

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

const setDocOptions = {
  merge: true,
};

document.querySelector('.submit-btn').addEventListener('click', async (e) => {
  e.preventDefault();
  await setDoc(
    doc(db, 'users', userID),
    {
      name: nameInput.value,
      email: emailInput.value,
      phone: phoneInput.value,
    },
    setDocOptions
  ).then(() => {
    window.location.href = '/';
  });
});
