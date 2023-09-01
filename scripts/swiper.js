import Swiper from "swiper";
import "swiper/css";

const swiper = new Swiper(".swiper", {
  slidesPerView: "auto",
  spaceBetween: 20,
  observer: true, // 추가
  observeParents: true, // 추가
});

export default swiper;
