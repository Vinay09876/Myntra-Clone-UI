let bagItems;

function onLoad() {
  let bagItemsString = localStorage.getItem("bagItems");
  bagItems = bagItemsString ? JSON.parse(bagItemsString) : [];
  displayHtmlHomePage();
  displayBagCountItem();
}
onLoad();

function addtoBag(itemId) {
  bagItems.push(itemId);
  localStorage.setItem("bagItems", JSON.stringify(bagItems));
  displayBagCountItem();
}

function displayBagCountItem() {
  let addItemCount = document.querySelector(".add-item-count");
  if (bagItems.length > 0) {
    addItemCount.style.visibility = "visible";
    addItemCount.innerText = bagItems.length;
  } else {
    addItemCount.style.visibility = "hidden";
  }
}

function displayHtmlHomePage() {
  let itemsContainer = document.querySelector(".items-container");
  if (!itemsContainer) {
    return;
  }
  let innerHtml = "";
  items.forEach((item) => {
    innerHtml += `
    <div class="item_container">
    <img class="item_image" src="${item.image}" alt="Item Image" />
    <div class="rating">${item.rating.stars} ⭐ | ${item.rating.count}</div>
    <div class="brand_name">${item.company}</div>
    <div class="product_name">${item.item_name}</div>
    <div class="price_container">
    <span class="current_price">RS ${item.current_price}</span>
    <span class="original_price">RS ${item.original_price}</span>
    <span class="discount">(${item.discount_percentage}% OFF)</span>
    </div>
    <button class="btn_add_bag" onclick="addtoBag(${item.id})">Add to Bag</button>
    </div>
`;
  });
  itemsContainer.innerHTML = innerHtml;
}
