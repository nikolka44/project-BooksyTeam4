import{a as m,S as M,N as S,P as q,K as _,A as x,b as $}from"./assets/vendor-Dal2vjfK.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function o(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(s){if(s.ep)return;s.ep=!0;const a=o(s);fetch(s.href,a)}})();const O=document.querySelector("[data-menu-open]"),I=document.querySelector("[data-menu-close]"),w=document.querySelector("[data-menu]");O.addEventListener("click",()=>{w.classList.add("is-open"),document.body.style.overflow="hidden"});I.addEventListener("click",()=>{w.classList.remove("is-open"),document.body.style.overflow=""});document.querySelectorAll(".nav-link-mob").forEach(e=>e.addEventListener("click",()=>{w.classList.remove("is-open"),document.body.style.overflow=""}));const r={dropdownToggle:document.querySelector(".dropdown-toggle"),dropdownMenu:document.querySelector(".dropdown-menu"),categoriesList:document.querySelector(".categories-list"),bookCardList:document.querySelector(".books-cards-list"),showMoreBtn:document.querySelector(".show-more-btn"),bookModalBackdrop:document.querySelector("#book-modal-backdrop"),bookModalContent:document.querySelector(".book-modal-content"),bookModalClose:document.querySelector("#book-modal-close")};m.defaults.baseURL="https://books-backend.p.goit.global";function y(e,t){throw console.error(`${t} error:`,e.message||e),e}async function N(){try{return(await m.get("/books/category-list")).data.filter(o=>o.list_name&&o.list_name.trim()!=="").map(o=>o.list_name)}catch(e){y(e,"getCategoryList")}}async function V(){try{return(await m.get("/books/top-books")).data.flatMap(o=>o.books)}catch(e){y(e,"getTopBooks")}}async function D(e){try{const{data:t}=await m.get("/books/category",{params:{category:e}});return console.log(t),t}catch(t){y(t,"getBooksByCategory")}}async function H(e){try{const{data:t}=await m.get(`/books/${e}`);return t}catch(t){y(t,"getBookById")}}function R(e){const o=["All categories",...e].map(n=>`<li class="dropdown-item">${n}</li>`).join("");r.dropdownMenu.innerHTML=o}function j(e){const o=["All categories",...e].map(n=>`<li class="categories-item" data-category="${n}">${n}</li>`).join("");r.categoriesList.innerHTML=o}function K(e){const t=e.map(({_id:o,book_image:n,description:s="description || title",title:a,author:l,price:i})=>`<li class="books-card" data-id="${o}">
        <img class="books-card-image" src="${n}" alt="${s}" />
        <div class="books-card-text-wrapper">
          <h3 class="books-card-title">${a}</h3>
          <p class="books-card-author">${l}</p>
        </div>
        <p class="books-card-price">$${i}</p>
        <button class="books-card-btn" type="button">Learn More</button>
      </li>`).join("");r.bookCardList.innerHTML=t}function U(e){return`
    <div class="book-modal-wrapper">
      <img
        src="${e.book_image}"
        alt="${e.title}"
        class="book-modal-image"
      />
      <h2 class="book-modal-title">${e.title}</h2>
      <p class="book-modal-author">${e.author}</p>
      <p class="book-modal-price">$${e.price}</p>

      <div class="book-modal-actions">
        <div class="quantity-control">
          <button class="qty-btn" data-action="decrease">-</button>
          <span class="qty-value">1</span>
          <button class="qty-btn" data-action="increase">+</button>
        </div>
        <button class="add-to-cart-btn">Add To Cart</button>
        <button class="buy-now-btn">Buy Now</button>
      </div>

      <div class="book-modal-details">
        <details>
          <summary>Details</summary>
          <p>${e.description||e.title}</p>
        </details>
        <details>
          <summary>Shipping</summary>
          <p>We ship across the United States within 2–5 business days. All orders are processed through USPS or a reliable courier service. Enjoy free standard shipping on orders over $50.</p>
        </details>
        <details>
          <summary>Returns</summary>
          <p>You can return an item within 14 days of receiving your order, provided it hasn’t been used and is in its original condition. To start a return, please contact our support team — we’ll guide you through the process quickly and hassle-free.</p>
        </details>
      </div>
    </div>
  `}function W(){const e=r.dropdownToggle,t=r.dropdownMenu;!e||!t||e.dataset.dropdownInited!=="true"&&(e.addEventListener("click",o=>{o.stopPropagation(),t.classList.toggle("open"),e.classList.toggle("active")}),t.addEventListener("click",o=>{const n=o.target.closest(".dropdown-item");if(!n)return;e.textContent=n.textContent,t.classList.remove("open"),e.classList.remove("active");const s=n.dataset.category,a=new CustomEvent("category:selected",{detail:{category:s}});document.dispatchEvent(a)}),document.addEventListener("click",o=>{!t.contains(o.target)&&!e.contains(o.target)&&(t.classList.remove("open"),e.classList.remove("active"))}),e.dataset.dropdownInited="true")}function z(){r.bookCardList&&r.bookCardList.dataset.modalInited!=="true"&&(r.bookCardList.addEventListener("click",G),r.bookCardList.dataset.modalInited="true")}async function G(e){const t=e.target.closest(".books-card-btn");if(!t)return;const n=t.closest(".books-card").dataset.id;if(n){console.log(n);try{const s=await H(n);F(s)}catch(s){console.error("❌ Error loading book details:",s)}}}function F(e){r.bookModalContent.innerHTML=U(e),r.bookModalBackdrop.classList.remove("is-hidden"),r.bookModalClose.addEventListener("click",f),r.bookModalBackdrop.addEventListener("click",T),document.addEventListener("keydown",A)}function f(){r.bookModalBackdrop.classList.add("is-hidden"),r.bookModalContent.innerHTML="",r.bookModalClose.removeEventListener("click",f),r.bookModalBackdrop.removeEventListener("click",T),document.removeEventListener("keydown",A)}function T(e){e.target===r.bookModalBackdrop&&f()}function A(e){e.key==="Escape"&&f()}let L=[],Y="All categories",k=0;const J=4;function Q(){return window.innerWidth<768?10:24}function X(){k>=L.length?r.showMoreBtn.classList.add("is-hidden"):r.showMoreBtn.classList.remove("is-hidden")}function C(){const e=L.slice(0,k);K(e),X(),z()}async function h(e){try{Y=e;let t;e==="All categories"||e==="All"||!e?t=await V():t=await D(e),L=t,k=Q(),C()}catch(t){console.error("loadBooksByCategory error:",t)}}function Z(){k+=J,C()}async function ee(){try{const e=await N();R(e),j(e),W(),r.dropdownMenu.addEventListener("click",t=>{const o=t.target.closest(".dropdown-item");if(!o)return;const n=o.dataset.category||o.textContent.trim();r.dropdownToggle.textContent=o.textContent.trim(),h(n)}),r.categoriesList.addEventListener("click",t=>{const o=t.target.closest(".categories-item");if(!o)return;const n=o.dataset.category||o.textContent.trim();r.categoriesList.querySelectorAll(".categories-item").forEach(s=>s.classList.remove("active")),o.classList.add("active"),h(n)})}catch(e){console.error("initCategories error:",e)}}async function te(){await ee(),await h("All categories")}r.showMoreBtn.addEventListener("click",Z);window.addEventListener("resize",()=>{C()});te();new M(".swiper",{modules:[S,q,_,x,$],slidesPerView:1,loop:!1,speed:400,watchOverflow:!0,simulateTouch:!0,grabCursor:!0,navigation:{nextEl:".hero__button--next",prevEl:".hero__button--prev"},autoplay:{delay:5e3,disableOnInteraction:!1},keyboard:{enabled:!0,onlyInViewport:!0},on:{init:function(){E(this)},slideChange:function(){E(this)}}});function E(e){const t=document.querySelector(".hero__button--prev"),o=document.querySelector(".hero__button--next");t.disabled=e.isBeginning,o.disabled=e.isEnd}new M(".swiper-feedbacks",{modules:[S,q,_,x,$],wrapperClass:"feedbacks__list",slideClass:"feedbacks__elements",loop:!1,speed:400,spaceBetween:24,slidesPerView:3,watchOverflow:!0,simulateTouch:!0,grabCursor:!0,autoplay:{delay:5e3,disableOnInteraction:!1},keyboard:{enabled:!0,onlyInViewport:!0},a11y:{enabled:!0,containerRoleDescriptionMessage:"Testimonials slider",slideRole:"listitem",prevSlideMessage:"Previous testimonials",nextSlideMessage:"Next testimonials"},navigation:{nextEl:".feedbacks__btn--next",prevEl:".feedbacks__btn--prev",disabledClass:"is-disabled"},pagination:{el:".feedbacks__dots",clickable:!0,bulletClass:"feedbacks__dots-elem",bulletActiveClass:"is-active",renderBullet:(e,t)=>`<span class="${t}" aria-label="Go to slide group ${e+1}"></span>`},breakpoints:{0:{slidesPerView:1,spaceBetween:16},768:{slidesPerView:2,spaceBetween:24},1440:{slidesPerView:3,spaceBetween:24}}});document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".events-list");if(!e)return;const t=document.querySelectorAll(".item-card"),o=document.querySelector(".events-container"),n=document.createElement("div");n.className="slider-controls",n.innerHTML=`
    <div class="dots"></div>
    <div class="arrows">
      <button class="slider-btn prev" aria-label="Previous slide">
        <svg>
          <use href="/img/icons.svg#icon-left-arrow"></use>
        </svg>
      </button>
      <button class="slider-btn next" aria-label="Next slide">
        <svg>
          <use href="/img/icons.svg#icon-right-arrow"></use>
        </svg>
      </button>
    </div>
  `,o.appendChild(n);const s=n.querySelector(".dots"),a=n.querySelector(".prev"),l=n.querySelector(".next");let i=0,u=1;function P(){s.innerHTML="";const c=u===1?t.length:t.length-u+1;for(let d=0;d<c;d++){const p=document.createElement("span");p.className="dot"+(d===0?" active":""),s.appendChild(p)}}function v(c){e.style.transition="opacity 0.3s ease",e.style.opacity="0",setTimeout(()=>{c(),e.style.opacity="1"},300)}function g(){const c=t.length;t.forEach((p,b)=>{p.style.display=b>=i&&b<i+u?"flex":"none"}),s.querySelectorAll(".dot").forEach((p,b)=>p.classList.toggle("active",b===i)),a.classList.toggle("is-disabled",i===0),l.classList.toggle("is-disabled",i>=c-u)}function B(){const c=window.innerWidth;c>=1440?(u=t.length,t.forEach(d=>d.style.display="flex"),n.style.display="none",e.style.transition="",e.style.opacity="1"):(u=c<768?1:2,n.style.display="flex",i=0,P(),g())}l.addEventListener("click",()=>{const c=t.length;i<c-u&&v(()=>{i++,g()})}),a.addEventListener("click",()=>{i>0&&v(()=>{i--,g()})}),s.addEventListener("click",c=>{if(!c.target.classList.contains("dot"))return;const d=Array.from(s.children).indexOf(c.target);v(()=>{i=d,g()})}),window.addEventListener("resize",B),B()});
//# sourceMappingURL=index.js.map
