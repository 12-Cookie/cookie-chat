const chatEls = document.querySelectorAll("#chat-views ul .chat-card");

chatEls.forEach((chatEl) => {
  chatEl.addEventListener("click", () => {
    if (
      window.location.pathname === "/" ||
      window.location.pathname === "/index.html"
    ) {
      window.location.href = "./views/chatRoom.html";
    } else {
      window.location.href = "./chatRoom.html";
    }
  });
});
