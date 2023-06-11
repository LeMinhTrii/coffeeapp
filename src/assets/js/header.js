export const handleCart = () => {
  const cart = document.querySelector(".--cart");
  cart.addEventListener("click", (ev) => {
    document.querySelector(".header-cart").classList.toggle("active");
  });
};
export const handeCLose = () => {
  document.querySelector(".close").addEventListener("click", (ev) => {
    document.querySelector(".header-cart").classList.remove("active");
  });
  // document.addEventListener("click", () => {
  //   document.querySelector(".header-cart").classList.remove("active");
  // });
};
export const handleSroll = () => {
  const header = document.querySelector(".header"),
    iconhd = document.querySelector(".header-icon"),
    cart = document.querySelector(".header-cart");

  header.classList.remove("active");
  window.addEventListener("scroll", () => {
    window.pageYOffset >= header.clientHeight + 30
      ? (header.classList.add("active"),
        iconhd.classList.add("active"),
        cart.classList.add("position"),
        (document.querySelector(".userbox").style.bottom = "-225px"))
      : (header.classList.remove("active"),
        iconhd.classList.remove("active"),
        cart.classList.remove("position"),
        (document.querySelector(".userbox").style.bottom = "-250px"));
  });
};
export const handleScrollTop = () => {
  document.querySelector(".header-icon").addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
};
export const handleUser = () => {
  document.querySelector(".user").addEventListener("click", () => {
    document.querySelector(".userbox").classList.toggle("active");
  });
};
