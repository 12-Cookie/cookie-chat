import app from "./firebase";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
const auth = getAuth(app);

let pathArr = window.location.pathname.split("/");

export function setHeaderName() {
  const signUpOrName = document.querySelector(".signup-or-name");
  const signUpLink = document.querySelector(".signup-link");
  const signInLink = document.querySelector(".signin-link");
  const signinInOrlogout = document.querySelector(".signin-or-logout");

  const userData = JSON.parse(localStorage.getItem("user"));
  onAuthStateChanged(auth, (user) => {
    if (user) {
      //로그인 되있을 때
      if (signUpLink) {
        signUpLink.setAttribute(
          "href",
          pathArr.length > 2 ? "./myPage.html" : "./views/myPage.html"
        );
        signUpOrName.innerText = `${userData.name}님`;
      }

      if (signinInOrlogout) {
        signInLink.setAttribute(
          "href",
          pathArr.length > 2 ? "./login.html" : "./views/login.html"
        );
        signinInOrlogout.innerText = `로그아웃`;
        signinInOrlogout.addEventListener("click", logOut);
      }
    } else {
      //로그인 안되있을 때
      if (signinInOrlogout) {
        signUpLink.setAttribute(
          "href",
          pathArr.length > 2 ? "./signup.html" : "./views/signup.html"
        );
        signUpOrName.innerText = "회원가입";
      }

      if (signinInOrlogout) {
        signinInOrlogout.innerText = `로그인`;
        signinInOrlogout.removeEventListener("click", logOut);
      }
    }
  });
}

const logOut = () => {
  signOut(auth)
    .then(() => {
      console.log("로그아웃");
      localStorage.setItem("user", JSON.stringify([]));
    })
    .catch((error) => {
      console.log(error);
    });
};

setHeaderName();
