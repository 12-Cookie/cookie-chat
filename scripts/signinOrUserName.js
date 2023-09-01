import app from "./firebase";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
const auth = getAuth(app);

export function setHeaderName() {
  const signUpOrName = document.querySelector(".signup-or-name");
  const signUpLink = document.querySelector(".signup-link");
  const signInLink = document.querySelector(".signin-link");
  const signinInOrlogout = document.querySelector(".signin-or-logout");

  onAuthStateChanged(auth, (user) => {
    if (user) {
      //로그인 되있을 때
      if (signUpLink) {
        signUpLink.setAttribute("href", "./views/myPage.html");
        signUpOrName.innerText = `${user.displayName}님`;
      }

      if (signinInOrlogout) {
        signinInOrlogout.innerText = `로그아웃`;
        signinInOrlogout.addEventListener("click", logOut);
      }
    } else {
      //로그인 안되있을 때
      if (signinInOrlogout) {
        signUpLink.setAttribute("./signup.html");
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
      localStorage.setItem("user", []);
    })
    .catch((error) => {
      console.log(error);
    });
};

setHeaderName();
