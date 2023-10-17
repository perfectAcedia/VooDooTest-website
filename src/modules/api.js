export default async function getProductList() {
  try {
    const response = await fetch(
      "https://voodoo-sandbox.myshopify.com/products.json"
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
