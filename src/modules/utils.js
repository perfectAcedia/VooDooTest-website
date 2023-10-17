let totalPrice = 0;

export function normalizedPrice(price) {
  // const secondPart = price.split(".")[1];
  // const changedPrice = price;

  // for (const number in secondPart) {
  //   if (number !== 0) {
  //     return Number(changedPrice);
  //   }
  // }

  return Math.round(Number(price) * 100) / 100;
}

export function textRender(screenWidth) {
  const element = document.getElementById("info");
  const shortText = "Important info";
  const longText = "Important info regarding our services";

  if (screenWidth >= 1024) {
    element.innerHTML = longText;
  } else {
    element.innerHTML = shortText;
  }
}

export function calculateTotalPrice(products) {
  for (let product of products) {
    totalPrice += +product.variants[0].price;
  }

  return totalPrice;
}
