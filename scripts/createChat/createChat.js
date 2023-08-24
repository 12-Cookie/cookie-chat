const colorCardEls = document.querySelectorAll(".card-color div span");
const leftCardEl = document.querySelector(".left-card");

// 색상 변경 코드
colorCardEls.forEach((colorCardEl) => {
  colorCardEl.addEventListener("click", () => {
    const backgroundColor = getComputedStyle(colorCardEl).backgroundColor;

    leftCardEl.style.backgroundColor = backgroundColor;
  });
});

// 키워드 추가 코드
const cardTagInputEls = document.querySelectorAll(".card-tag input");
const cardTagBox = document.querySelector(".chat-card-tag");

cardTagInputEls.forEach((cardTagInputEl, i) => {
  cardTagInputEl.addEventListener("change", (e) => {
    const tag = document.querySelector(`.tag-${i}`);
    if (tag) {
      // if ((e.target.value = "")) {
      //   console.log(1);
      // } else {
      //   console.log(2);
      // }
      // console.log(typeof e.target.value);
      tag.textContent = "# " + e.target.value;
    } else {
      const tagInput = document.createElement("span");
      tagInput.classList.add(`tag-${i}`);
      tagInput.textContent = "# " + e.target.value;
      cardTagBox.appendChild(tagInput);
      console.log(1);
    }
    // console.log(e.target.value);
  });
});
