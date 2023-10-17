import createProductList from "./src/modules/productList";
import { textRender } from "./src/modules/utils";
import "./style.css";

// const PRODUCT_LIST = await getProductList();
// const arrayOfProducts = PRODUCT_LIST.products;
const cartButton = document.getElementById("cartButton");
const arrowButton = document.getElementById("arrowDown");
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
    importantElement.classList.remove("bottom-0");
    importantElement.classList.add("-bottom-[70px]");
    importantInfoElement.classList.remove("hidden");
    importantInfoElement.classList.add("flex");
    isInfoOpen = true;
  } else {
    importantElement.classList.add("bottom-0");
    importantElement.classList.remove("-bottom-[70px]");
    importantInfoElement.classList.remove("flex");
    importantInfoElement.classList.add("hidden");
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