let Convenience_Fees = 99;
let itemBagObject;
onLoad();

function onLoad() {
  displayBagObject();
  displayBagElement();
  displayBagSummary();
}

function displayBagSummary() {
  let bagSummary = document.querySelector(".bag-summary");
  let totalItems = 0;
  let totalMRP = 0;
  let totalDiscount = 0;
  let finalAmount = 0;

  totalItems += itemBagObject.length;

  itemBagObject.forEach((bagItem) => {
    totalMRP += bagItem.original_price;
    totalDiscount += bagItem.original_price - bagItem.current_price;
  });

  finalAmount = totalMRP - totalDiscount + Convenience_Fees;

  bagSummary.innerHTML += `
  <div class="bag-details-container">
              <div class="price-header">PRICE DETAILS (${totalItems} Items)</div>
              <div class="price-item">
                <span class="price-item-tag">Total MRP</span>
                <span class="price-item-value">Rs${totalMRP}</span>
              </div>
              <div class="price-item">
                <span class="price-item-tag">Discount on MRP</span>
                <span class="price-item-value priceDetail-base-discount"
                >-Rs${totalDiscount}</span>
              </div>
              <div class="price-item">
                <span class="price-item-tag">Convenience Fee</span>
                <span class="price-item-value">Rs 99</span>
              </div>
              <hr />
              <div class="price-footer">
                <span class="price-item-tag">Total Amount</span>
                <span class="price-item-value">Rs${finalAmount}</span>
              </div>
          </div>
              <button class="btn-place-order">PLACE ORDER</button>
  `;
}

function displayBagObject() {
  console.log(bagItems);
  itemBagObject = bagItems.map((itemId) => {
    for (let i = 0; i < items.length; i++) {
      if (itemId == items[i].id) {
        return items[i];
      }
    }
  });
}

function displayBagElement() {
  let itemsContainer = document.querySelector(".bag-items-container");
  let innerHtml = "";
  itemBagObject.forEach((bagItem) => {
    innerHtml += generateHtml(bagItem);
  });
  itemsContainer.innerHTML = innerHtml;
}

function removeBagItem(itemId) {
  bagItems = bagItems.filter((bagItemId) => bagItemId != itemId);
  localStorage.setItem("bagItems", JSON.stringify(bagItems));
  displayBagObject();
  displayBagCountItem();
  displayBagElement();
  displayBagSummary();
}

function generateHtml(item) {
  return `<div class="bag-item-container">
              <div class="item-left-part">
                <img
                  class="bag-item-img"
                  src="${item.image}"
                  alt="Product-Image"
                />
              </div>
              <div class="item-right-part">
                  <div class="company">${item.company}</div>
                  <div class="item-name">
                    ${item.item_name}
                  </div>
                  <div class="price-container">
                    <span class="current-price">RS${item.current_price}</span>
                    <span class="original-price">RS ${item.original_price}</span>
                    <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
                  </div>
                  <div class="return-period">
                    <span class="return-period-days">${item.return_period} days</span>return available
                  </div>
                  <div class="delivery-details">
                    Deliveried by
                    <span class="delivery-details-days">${item.delivery_date}</span>
                  </div>
                  <div class="remove-from-cart" onclick="removeBagItem(${item.id})">X</div>
                  </div>
            </div>
            `;
}
