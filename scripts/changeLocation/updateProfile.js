import app from "../firebase";
import { doc, setDoc, getFirestore } from "firebase/firestore";

const firestore = getFirestore(app);

const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const goProfilePage = document.querySelector(".go-profile-page");
const submitBtn = document.querySelector(".submit-btn");

const userData = JSON.parse(localStorage.getItem("user"));
const user = { ...userData };
console.log(user);

nameInput.value = user.name;
emailInput.value = user.email;

goProfilePage.addEventListener("click", () => {
  window.location.href = "./myPage.html";
});

const setDocOptions = {
  merge: true,
};

submitBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  user.name = nameInput.value;
  user.email = emailInput.value;

  await setDoc(
    doc(firestore, "users", userData.id),
    {
      name: nameInput.value,
      email: emailInput.value,
    },
    setDocOptions
  ).then(() => {
    localStorage.setItem("user", JSON.stringify(user));
    window.location.href = "/";
  });
});
