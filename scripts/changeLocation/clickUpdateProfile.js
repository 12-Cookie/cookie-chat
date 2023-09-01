const goUpdatePage = document.querySelector(".go-update-page");
const profileName = document.querySelector(".profile-name");
const profileEmail = document.querySelector(".profile-email");

const userData = JSON.parse(localStorage.getItem("user"));

profileName.textContent = userData.name;
profileEmail.textContent = userData.email;

goUpdatePage.addEventListener("click", () => {
  window.location.href = `./updateMyPage.html`;
});
