import app from "./firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const emailInput = document.querySelector(".email input");
const pwInput = document.querySelector(".pw input");
const loginBtn = document.querySelector(".log-in-btn");

const auth = getAuth();

let email = "";
let pw = "";

emailInput.addEventListener("input", (e) => {
  email = e.target.value;
  console.log(email);
});
pwInput.addEventListener("input", (e) => {
  pw = e.target.value;
  console.log(pw);
});

loginBtn.addEventListener("click", () => {
  signInWithEmailAndPassword(auth, email, pw)
    .then((userCredential) => {
      const user = userCredential.user;
      window.location.href = "../index.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
});
