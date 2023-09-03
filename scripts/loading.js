const mainContent = document.querySelector("main");
const loadingEl = document.querySelector(".loading");

const loading = (loading) => {
  if (loading) {
    mainContent.style.display = "none";
    loadingEl.style.display = "inline-block";
  } else {
    mainContent.style.display = "block";
    loadingEl.style.display = "none";
  }
};

export default loading;
