"use strict";

var wlp = "at_wishlist",
  wishlistItems = JSON.parse(localStorage.getItem(wlp)),
  wraper = document.querySelector("list-wishlist-products"),
  limit = wraper.dataset.limit;

if (wishlistItems === null) wishlistItems = [];
var wishlistItems = wishlistItems.filter(item => item);


class ProductListWishlist extends SlideSection {
  constructor() {
    super();
  }
  init() {
    this.connectedCallback();
  }
  initData() {
    var savedProductsArr = JSON.parse(localStorage.getItem(wlp));
    const index = savedProductsArr.indexOf(this.dataset.id);
    if (index > -1) savedProductsArr.splice(index, 1);
    let cleanedItems = savedProductsArr.filter(item => item);
    this.getStoredProducts(cleanedItems);
  }
  getStoredProducts(p) {
    const limit = this.dataset?.limit;
    if (limit) {
      var query = "",
        ajaxURL = "";

      if (p && p.length > 0) {
        const sortedIds = p.slice();
        const idsToUse = sortedIds.slice(0, limit);
        query = idsToUse.join("%20OR%20id:");
        ajaxURL = `&q=id:${query}`;
      }
    }
    fetch(`${this.dataset.url}${ajaxURL}`)
      .then((response) => response.text())
      .then((text) => {
        const html = document.createElement("div");
        html.innerHTML = text;
        const wishlistProducts = html.querySelector(".wishlistPrList");
        const wishlistDiv = document.querySelector(".wishlistPrList");
        if (
          wishlistProducts &&
          wishlistProducts.innerHTML.trim().length
        ) {
          wishlistDiv.innerHTML = wishlistProducts.innerHTML;
        }
        if (wishlistProducts.innerHTML.trim().length === 0) {
          var wishlistSec = document.querySelector(".list-wishlist-product");
          wishlistSec.remove();
        }
      })
      .finally(() => {
        if(this.querySelector(".swiper-wrapper")) this.initSlide();
        if(theme.mlcurrency) currenciesChange(document.querySelectorAll('product-card span.money'));
        initializeScrollAnimationTrigger();
        initializeVideos();
      })
      .catch((e) => {
        console.error(e);
      });
  }
  connectedCallback() {
    const __this = this;
    const handleIntersection = (entries, observer) => {
      if (!entries[0].isIntersecting) return;
      observer.unobserve(this);
      __this.initData();
    };

    new IntersectionObserver(handleIntersection.bind(this), {
      rootMargin: "0px 0px 400px 0px",
    }).observe(this);
  }
}
customElements.define("list-wishlist-products", ProductListWishlist);