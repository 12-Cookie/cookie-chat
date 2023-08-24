const goPpdatePage = document.querySelector(".go-update-page");
const goProfilePage = document.querySelector(".go-profile-page");

if (goPpdatePage) {
  goPpdatePage.addEventListener("click", () => {
    window.location.href = "./updateMyPage.html";
  });
}

if (goProfilePage) {
  goProfilePage.addEventListener("click", () => {
    window.location.href = "./myPage.html";
  });
}
