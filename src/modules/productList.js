import getProductList from "./api";
import {
  addEventListenerOnDecreaseButton,
  addEventListenerOnIncreaseButton,
  addEventListenerOnTrashButton,
  addProductHTML,
} from "./cartManager";
import createPagination from "./pagination";
import { normalizedPrice } from "./utils";

const totalCostElement = cart
  .querySelector("#footer")
  .querySelector("#totalPrice")
  .querySelector("#quantity");
const cartProducts = new Map();

export default async function createProductList() {
  const PRODUCT_LIST = await getProductList();
  const arrayOfProducts = PRODUCT_LIST.products;
  let currentPage = 1;
  let itemsPerPage = 24;

  function displayList(arrData, itemsPerPage, page) {
    const element = document.getElementById("catalog");
    element.innerHTML = "";
    page--;

    const start = itemsPerPage * page;
    const end = start + itemsPerPage;
    const paginatedData = arrData.slice(start, end);

    paginatedData.map((product) => {
      const newElement = document.createElement("article");
      const image = product.images[0];
      const price = product.variants[0].price;
      const source = product.vendor;

      newElement.classList.add("h-full", "lg:max-w-[300px]", "mx-auto");
      newElement.innerHTML = `
                  <div class="border relative rounded h-[300px] w-full">
                    <img class="w-full h-full" src="${
                      image?.src || "./src/assets/icons/V-logo.png"
                    }" alt="product foto">
                    <div
                      class="absolute top-[10px] left-[10px] h-[24px] !bg-black rounded"
                    >
                      <h3 class="h-full px-[10px] font-normal text-xs text-white flex items-center justify-center">${source}</h3>
                    </div>
                  </div>
                  <div class="mt-[10px] flex justify-between">
                    <div class="flex flex-col font-bold text-sm">
                      <h3 class="">${product.title}</h3>
                      <h3 class="">${normalizedPrice(price) + ` KR.`}</h3>
                    </div>
                    <div class="flex flex-col text-sm">
                      <h3 class="font-medium flex justify-end">Condition</h3>
                      <h3 class="font-normal flex justify-end">Rating</h3>
                    </div>
                  </div>
                  <button
                    name="addButton"
                    data-id="${product.id}"
                    type="button"
                    class="disabled:opacity-50 mt-[10px] px-3 py-2 w-full h-[42px] font-bold text-center text-sm text-white !bg-black rounded hover:bg-blue-800"
                  >
                    ADD TO CART
                  </button>
            `;
      element.appendChild(newElement);

      const button = document.querySelector(`[data-id='${product.id}']`);

      button.addEventListener("click", () => {
        const product = arrayOfProducts.find(
          (product) => product.id === +button.dataset.id
        );
        if (!cartProducts.has(product.id)) {
          cartProducts.set(product.id, product);
          const cartProduct = cartProducts.get(product.id);
          addProductHTML(cartProduct);
          addEventListenerOnIncreaseButton(product);
          addEventListenerOnDecreaseButton(product);
          addEventListenerOnTrashButton(product, button);
          totalCostElement.innerHTML = normalizedPrice(
            +totalCostElement.innerHTML + +product.variants[0].price
          );
        }
        button.setAttribute("disabled", "");
      });
    });
  }

  function displayPagination(current) {
    const paginationElement = document.getElementById("links");
    paginationElement.innerHTML = "";
    const paginationButtons = createPagination(current);

    paginationButtons.forEach((number) => {
      const buttonElement = createPaginationButtons(number);
      paginationElement.appendChild(buttonElement);
    });
  }

  function createPaginationButtons(page) {
    const newElement = document.createElement("li");
    newElement.classList.add(
      "cursor-pointer",
      "text-lg",
      "font-normal",
      "border",
      "rounded-full",
      "w-[39px]",
      "h-[39px]",
      "flex",
      "justify-center",
      "items-center"
    );
    newElement.textContent = page;

    if (currentPage === page) {
      newElement.classList.add("text-white", "bg-black");
      newElement.setAttribute("id", "active");
    }

    newElement.addEventListener("click", () => {
      currentPage = page;
      displayList(arrayOfProducts, itemsPerPage, currentPage);
      displayPagination(currentPage);

      newElement.classList.add("text-white", "bg-black");
      newElement.setAttribute("id", "active");
    });

    return newElement;
  }

  displayList(arrayOfProducts, itemsPerPage, currentPage);
  displayPagination(currentPage);
}

export function deleteMapElement(id) {
  cartProducts.delete(+id);
}
