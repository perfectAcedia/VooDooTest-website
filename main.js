import createProductList from "./src/modules/productList";
import { textRender } from "./src/modules/utils";
import "./style.css";

// const PRODUCT_LIST = await getProductList();
// const arrayOfProducts = PRODUCT_LIST.products;
const cartButton = document.getElementById("cartButton");
const arrowButton = document.getElementById("arrowDown");
const arrowIcon = document.getElementById('arrowIcon')
const sideMenu = document.getElementById("sideMenu");
const closeButton = document.getElementById("closeButton");
const importantElement = document.getElementById("important");
const importantInfoElement = document.getElementById("importantInfo");
let isInfoOpen = false;


textRender(window.innerWidth);
createProductList();

cartButton.addEventListener("click", () => {
  sideMenu.classList.remove("translate-x-full");
  sideMenu.classList.add("translate-x-0");
  if (window.innerWidth >= 1024) {
    sideMenu.style.width = "25%";
  } else {
    sideMenu.style.width = "100%";
  }
});

arrowButton.addEventListener("click", () => {
  if (!isInfoOpen) {
    importantElement.style.bottom = '-65px';
    importantInfoElement.classList.remove("hidden");
    importantInfoElement.classList.add("flex");
    arrowIcon.classList.remove('rotate-0')
    arrowIcon.classList.add('rotate-180');
    isInfoOpen = true;
  } else {
    importantElement.style.bottom = '0';
    importantInfoElement.classList.remove("flex");
    importantInfoElement.classList.add("hidden");
    arrowIcon.classList.remove('rotate-180')
    arrowIcon.classList.add('rotate-0')
    isInfoOpen = false;
  }
});

closeButton.addEventListener("click", () => {
  sideMenu.classList.remove("translate-x-0");
  sideMenu.classList.add("translate-x-full");
});

window.addEventListener("resize", (event) => {
  const screenWidth = event.currentTarget.innerWidth;

  textRender(screenWidth);
});