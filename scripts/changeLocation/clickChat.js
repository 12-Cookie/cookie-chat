// const chatEls = document.querySelectorAll("#chat-views ul .chat-card");

const clickChat = (chatEl, id) => {
  chatEl.addEventListener("click", () => {
    if (
      window.location.pathname === "/" ||
      window.location.pathname === "/index.html"
    ) {
      window.location.href = `./views/chatRoom.html?id=${id}`;
    } else {
      window.location.href = `./chatRoom.html?id=${id}`;
    }
  });
};

export default clickChat;

// chatEls.forEach((chatEl) => {});
