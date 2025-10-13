import{a as g,S as L,N as C,P as B,K as E,A as M,b as S}from"./assets/vendor-Dal2vjfK.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function o(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(s){if(s.ep)return;s.ep=!0;const a=o(s);fetch(s.href,a)}})();const A=document.querySelector("[data-menu-open]"),P=document.querySelector("[data-menu-close]"),v=document.querySelector("[data-menu]");A.addEventListener("click",()=>{v.classList.add("is-open"),document.body.style.overflow="hidden"});P.addEventListener("click",()=>{v.classList.remove("is-open"),document.body.style.overflow=""});document.querySelectorAll(".nav-link-mob").forEach(e=>e.addEventListener("click",()=>{v.classList.remove("is-open"),document.body.style.overflow=""}));console.log(document.querySelector("[data-menu-open]"));console.log(document.querySelector("[data-menu]"));const r={dropdownToggle:document.querySelector(".dropdown-toggle"),dropdownMenu:document.querySelector(".dropdown-menu"),categoriesList:document.querySelector(".categories-list"),bookCardList:document.querySelector(".books-cards-list"),showMoreBtn:document.querySelector(".show-more-btn"),bookModalBackdrop:document.querySelector("#book-modal-backdrop"),bookModalContent:document.querySelector(".book-modal-content"),bookModalClose:document.querySelector("#book-modal-close")};g.defaults.baseURL="https://books-backend.p.goit.global";function y(e,t){throw console.error(`${t} error:`,e.message||e),e}async function I(){try{return(await g.get("/books/category-list")).data.filter(o=>o.list_name&&o.list_name.trim()!=="").map(o=>o.list_name)}catch(e){y(e,"getCategoryList")}}async function O(){try{return(await g.get("/books/top-books")).data.flatMap(o=>o.books)}catch(e){y(e,"getTopBooks")}}async function H(e){try{const{data:t}=await g.get("/books/category",{params:{category:e}});return console.log(t),t}catch(t){y(t,"getBooksByCategory")}}async function V(e){try{const{data:t}=await g.get(`/books/${e}`);return t}catch(t){y(t,"getBookById")}}function N(e){const o=["All categories",...e].map(n=>`<li class="dropdown-item">${n}</li>`).join("");r.dropdownMenu.innerHTML=o}function D(e){const o=["All categories",...e].map(n=>`<li class="categories-item" data-category="${n}">${n}</li>`).join("");r.categoriesList.innerHTML=o}function W(e){const t=e.map(({_id:o,book_image:n,description:s="description || title",title:a,author:l,price:i})=>`<li class="books-card" data-id="${o}">
        <img class="books-card-image" src="${n}" alt="${s}" />
        <div class="books-card-text-wrapper">
          <h3 class="books-card-title">${a}</h3>
          <p class="books-card-author">${l}</p>
        </div>
        <p class="books-card-price">$${i}</p>
        <button class="books-card-btn" type="button">Learn More</button>
      </li>`).join("");r.bookCardList.innerHTML=t}function j(e){return`
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
  `}function R(){const e=r.dropdownToggle,t=r.dropdownMenu;!e||!t||e.dataset.dropdownInited!=="true"&&(e.addEventListener("click",o=>{o.stopPropagation(),t.classList.toggle("open"),e.classList.toggle("active")}),t.addEventListener("click",o=>{const n=o.target.closest(".dropdown-item");if(!n)return;e.textContent=n.textContent,t.classList.remove("open"),e.classList.remove("active");const s=n.dataset.category,a=new CustomEvent("category:selected",{detail:{category:s}});document.dispatchEvent(a)}),document.addEventListener("click",o=>{!t.contains(o.target)&&!e.contains(o.target)&&(t.classList.remove("open"),e.classList.remove("active"))}),e.dataset.dropdownInited="true")}function K(){r.bookCardList&&r.bookCardList.dataset.modalInited!=="true"&&(r.bookCardList.addEventListener("click",U),r.bookCardList.dataset.modalInited="true")}async function U(e){const t=e.target.closest(".books-card-btn");if(!t)return;const n=t.closest(".books-card").dataset.id;if(n){console.log(n);try{const s=await V(n);z(s)}catch(s){console.error("❌ Error loading book details:",s)}}}function z(e){r.bookModalContent.innerHTML=j(e),r.bookModalBackdrop.classList.remove("is-hidden"),r.bookModalClose.addEventListener("click",k),r.bookModalBackdrop.addEventListener("click",q),document.addEventListener("keydown",x)}function k(){r.bookModalBackdrop.classList.add("is-hidden"),r.bookModalContent.innerHTML="",r.bookModalClose.removeEventListener("click",k),r.bookModalBackdrop.removeEventListener("click",q),document.removeEventListener("keydown",x)}function q(e){e.target===r.bookModalBackdrop&&k()}function x(e){e.key==="Escape"&&k()}let $=[],Z="All categories";function F(){return window.innerWidth<768?10:24}function _(){const e=F(),t=$.slice(0,e);W(t),K()}async function f(e){try{Z=e;let t;e==="All categories"||e==="All"||!e?t=await O():t=await H(e),$=t,_()}catch(t){console.error("loadBooksByCategory error:",t)}}async function G(){try{const e=await I();N(e),D(e),R(),r.dropdownMenu.addEventListener("click",t=>{const o=t.target.closest(".dropdown-item");if(!o)return;const n=o.dataset.category||o.textContent.trim();r.dropdownToggle.textContent=o.textContent.trim(),f(n)}),r.categoriesList.addEventListener("click",t=>{const o=t.target.closest(".categories-item");if(!o)return;const n=o.dataset.category||o.textContent.trim();r.categoriesList.querySelectorAll(".categories-item").forEach(s=>s.classList.remove("active")),o.classList.add("active"),f(n)})}catch(e){console.error("initCategories error:",e)}}async function Y(){await G(),await f("All categories")}window.addEventListener("resize",()=>{_()});Y();new L(".swiper",{modules:[C,B,E,M,S],slidesPerView:1,loop:!1,speed:400,watchOverflow:!0,simulateTouch:!0,grabCursor:!0,navigation:{nextEl:".hero__button--next",prevEl:".hero__button--prev"},autoplay:{delay:5e3,disableOnInteraction:!1},keyboard:{enabled:!0,onlyInViewport:!0},on:{init:function(){h(this)},slideChange:function(){h(this)}}});function h(e){const t=document.querySelector(".hero__button--prev"),o=document.querySelector(".hero__button--next");t.disabled=e.isBeginning,o.disabled=e.isEnd}new L(".swiper-feedbacks",{modules:[C,B,E,M,S],wrapperClass:"feedbacks__list",slideClass:"feedbacks__elements",loop:!1,speed:400,spaceBetween:24,slidesPerView:3,watchOverflow:!0,simulateTouch:!0,grabCursor:!0,autoplay:{delay:5e3,disableOnInteraction:!1},keyboard:{enabled:!0,onlyInViewport:!0},a11y:{enabled:!0,containerRoleDescriptionMessage:"Testimonials slider",slideRole:"listitem",prevSlideMessage:"Previous testimonials",nextSlideMessage:"Next testimonials"},navigation:{nextEl:".feedbacks__btn--next",prevEl:".feedbacks__btn--prev",disabledClass:"is-disabled"},pagination:{el:".feedbacks__dots",clickable:!0,bulletClass:"feedbacks__dots-elem",bulletActiveClass:"is-active",renderBullet:(e,t)=>`<span class="${t}" aria-label="Go to slide group ${e+1}"></span>`},breakpoints:{0:{slidesPerView:1,spaceBetween:16},768:{slidesPerView:2,spaceBetween:24},1440:{slidesPerView:3,spaceBetween:24}}});document.addEventListener("DOMContentLoaded",()=>{if(!document.querySelector(".events-list"))return;const t=document.querySelectorAll(".item-card"),o=document.querySelector(".events-container"),n=document.createElement("div");n.className="slider-controls",n.innerHTML=`
    <div class="dots"></div>
    <div class="arrows">
      <button class="slider-btn prev" aria-label="Previous slide">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.707 12.5049L4.414 8.21188H14V6.21188H4.414L8.707 1.91888L7.293 0.504883L0.585999 7.21188L7.293 13.9189L8.707 12.5049Z" fill="white"/>
        </svg>
      </button>
      <button class="slider-btn next" aria-label="Next slide">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.293 12.5049L6.707 13.9189L13.414 7.21188L6.707 0.504883L5.293 1.91888L9.586 6.21188H0V8.21188H9.586L5.293 12.5049Z" fill="white"/>
        </svg>
      </button>
    </div>
  `,o.appendChild(n);const s=n.querySelector(".dots"),a=n.querySelector(".prev"),l=n.querySelector(".next");let i=0,d=1;function T(){s.innerHTML="";const c=d===1?t.length:t.length-d+1;for(let u=0;u<c;u++){const p=document.createElement("span");p.className="dot"+(u===0?" active":""),s.appendChild(p)}}function m(){const c=t.length;t.forEach((p,b)=>{p.style.display=b>=i&&b<i+d?"flex":"none"}),s.querySelectorAll(".dot").forEach((p,b)=>p.classList.toggle("active",b===i)),a.classList.toggle("is-disabled",i===0),l.classList.toggle("is-disabled",i>=c-d)}function w(){const c=window.innerWidth;c>=1440?(d=t.length,t.forEach(u=>u.style.display="flex"),n.style.display="none"):(d=c<768?1:2,n.style.display="flex",i=0,T(),m())}l.addEventListener("click",()=>{const c=t.length;i<c-d&&(i++,m())}),a.addEventListener("click",()=>{i>0&&(i--,m())}),s.addEventListener("click",c=>{if(!c.target.classList.contains("dot"))return;i=Array.from(s.children).indexOf(c.target),m()}),window.addEventListener("resize",w),w()});async function J(){try{const e=await getCategoryList();renderCategoryList(e)}catch(e){console.error(e)}}J();async function Q(){try{const e=await getTopBooks(),o=window.innerWidth<768?e.slice(0,10):e.slice(0,24);renderBookCardlist(o)}catch(e){console.error("initBooks error:",e)}}Q();
//# sourceMappingURL=index.js.map
