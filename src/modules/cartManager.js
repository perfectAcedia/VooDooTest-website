import { deleteMapElement } from "./productList";
import { normalizedPrice } from "./utils";

const totalCostElement = cart
  .querySelector("#footer")
  .querySelector("#totalPrice")
  .querySelector("#quantity");

export function addProductHTML(product) {
  const element = document.getElementById("cartList");
  const newElement = document.createElement("article");

  const title = product.title;
  const image = product.images[0];
  const price = normalizedPrice(product.variants[0].price);
  const id = product.id;

  newElement.classList.add("flex", "justify-start", "gap-[18px]", "relative");
  newElement.setAttribute("id", id);
  newElement.innerHTML = `
    <div id="image" class="border border-white w-[74px] rounded opacity-50">
        <img class="w-full h-full" src="${
          image?.src || "../../src/assets/icons/V-logo.png"
        }" alt="product foto" />
    </div>
    <div id="properties" class="flex flex-col gap-y-[12px] font-bold text-sm text-white">
        <h3>${title}</h3>
        <div id="price" class="flex gap-[5px]">
            <h3 id="quantity">${price}</h3>
            <h3 id="currency">KR.</h3>
        </div>
        <div id="counter" class="flex">
            <button id="decrease" class="w-[20px] h-[20px]">-</button>
            <h3 id="quantity" class="w-[20px] h-[20px] text-center">1</h3>
            <button id="increase" class="w-[20px] h-[20px]">+</button>
        </div>
    </div>
    <button id="trash" name="trash" class="absolute top-0 right-0">
        <img src="./src/assets/icons/trash-icon.svg" alt="trash icon" />
    </button>`;

  element.appendChild(newElement);
}

export function increaseExistingProductCounter(cartProduct) {
  const productElement = document.getElementById(`${cartProduct.id}`);
  const productCounterElement = productElement
    .querySelector("#properties")
    .querySelector("#counter")
    .querySelector("#quantity");

  const productPriceElement = productElement
    .querySelector("#properties")
    .querySelector("#price")
    .querySelector("#quantity");
  productCounterElement.innerHTML++;
  productPriceElement.innerHTML = normalizedPrice(
    cartProduct.variants[0].price * productCounterElement.innerHTML
  );

  productPriceElement;
}

export function decreaseExistingProductCounter(cartProduct) {
  const productElement = document.getElementById(`${cartProduct.id}`);
  const productCounterElement = productElement
    .querySelector("#properties")
    .querySelector("#counter")
    .querySelector("#quantity");

  if (productCounterElement.innerHTML <= 1) {
    return;
  }
  const productPriceElement = productElement
    .querySelector("#properties")
    .querySelector("#price")
    .querySelector("#quantity");
  productCounterElement.innerHTML--;
  productPriceElement.innerHTML = normalizedPrice(
    cartProduct.variants[0].price * productCounterElement.innerHTML
  );

  productPriceElement;
}

export function deleteProductHTMLElement(id) {
  const productHTMLElementToDelete = document.getElementById(`${id}`);

  productHTMLElementToDelete.remove();
}

export function addEventListenerOnTrashButton(cartProduct, button) {
  const productElement = document.getElementById(`${cartProduct.id}`);
  const productTrashElement = productElement.querySelector("#trash");
  const productCounterElement = productElement
    .querySelector("#properties")
    .querySelector("#counter")
    .querySelector("#quantity");

  productTrashElement.addEventListener("click", (event) => {
    button.removeAttribute("disabled", "");
    const productElementId = event.target.parentNode.parentNode.id;
    totalCostElement.innerHTML = normalizedPrice(
      +totalCostElement.innerHTML -
        +productCounterElement.innerHTML * +cartProduct.variants[0].price
    );
    deleteMapElement(productElementId);
    deleteProductHTMLElement(productElementId);
  });
}

export function addEventListenerOnIncreaseButton(cartProduct) {
  const productElement = document.getElementById(`${cartProduct.id}`);
  const productIncreaseElement = productElement
    .querySelector("#properties")
    .querySelector("#counter")
    .querySelector("#increase");

  productIncreaseElement.addEventListener("click", () => {
    increaseExistingProductCounter(cartProduct);
    totalCostElement.innerHTML = normalizedPrice(
      +totalCostElement.innerHTML + +cartProduct.variants[0].price
    );
  });
}
export function addEventListenerOnDecreaseButton(cartProduct) {
  const productElement = document.getElementById(`${cartProduct.id}`);
  const productTrashElement = productElement
    .querySelector("#properties")
    .querySelector("#counter")
    .querySelector("#decrease");

  productTrashElement.addEventListener("click", () => {
    decreaseExistingProductCounter(cartProduct);
    totalCostElement.innerHTML = normalizedPrice(
      +totalCostElement.innerHTML - +cartProduct.variants[0].price
    );
  });
}
