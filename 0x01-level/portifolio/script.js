let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");
let header = document.querySelector("header");

window.onscroll = () => {
  if (window.scrollY > 0) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");
    if (top >= offset && top < offset + height) {
      navLinks.forEach((link) => {
        if (link.className === "about") {
          header.style.color = "red";
        }
        link.classList.remove("active");
        document
          .querySelector(`header nav a[href='#${id}']`)
          .classList.add("active");
      });
    }
  });
};
