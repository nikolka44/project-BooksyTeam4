import{a as b,S,N as q,P as x,K as _,A as T,b as $}from"./assets/vendor-Dal2vjfK.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const d of a.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&n(d)}).observe(document,{childList:!0,subtree:!0});function o(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(s){if(s.ep)return;s.ep=!0;const a=o(s);fetch(s.href,a)}})();const I=document.querySelector("[data-menu-open]"),O=document.querySelector("[data-menu-close]"),C=document.querySelector("[data-menu]");I.addEventListener("click",()=>{C.classList.add("is-open"),document.body.style.overflow="hidden"});O.addEventListener("click",()=>{C.classList.remove("is-open"),document.body.style.overflow=""});document.querySelectorAll(".nav-link-mob").forEach(e=>e.addEventListener("click",()=>{C.classList.remove("is-open"),document.body.style.overflow=""}));const r={dropdownToggle:document.querySelector(".dropdown-toggle"),dropdownMenu:document.querySelector(".dropdown-menu"),categoriesList:document.querySelector(".categories-list"),bookCardList:document.querySelector(".books-cards-list"),showMoreBtn:document.querySelector(".show-more-btn"),bookModalBackdrop:document.querySelector("#book-modal-backdrop"),bookModalContent:document.querySelector(".book-modal-content"),bookModalClose:document.querySelector("#book-modal-close"),booksShown:document.querySelector(".books-shown"),booksTotal:document.querySelector(".books-total")};b.defaults.baseURL="https://books-backend.p.goit.global";function k(e,t){throw console.error(`${t} error:`,e.message||e),e}async function N(){try{return(await b.get("/books/category-list")).data.filter(o=>o.list_name&&o.list_name.trim()!=="").map(o=>o.list_name)}catch(e){k(e,"getCategoryList")}}async function V(){try{return(await b.get("/books/top-books")).data.flatMap(o=>o.books)}catch(e){k(e,"getTopBooks")}}async function D(e){try{const{data:t}=await b.get("/books/category",{params:{category:e}});return console.log(t),t}catch(t){k(t,"getBooksByCategory")}}async function H(e){try{const{data:t}=await b.get(`/books/${e}`);return t}catch(t){k(t,"getBookById")}}function R(e){const o=["All categories",...e].map(n=>`<li class="dropdown-item">${n}</li>`).join("");r.dropdownMenu.innerHTML=o}function j(e){const o=["All categories",...e].map(n=>`<li class="categories-item" data-category="${n}">${n}</li>`).join("");r.categoriesList.innerHTML=o}function K(e){return e?e.toLowerCase().split(" ").map(t=>t.charAt(0).toUpperCase()+t.slice(1)).join(" "):""}function U(e){const t=e.map(({_id:o,book_image:n,description:s="description || title",title:a,author:d,price:i})=>{const l=K(a),h=parseInt(i);return`<li class="books-card" data-id="${o}">
        <img class="books-card-image" src="${n}" alt="${s}" />
         <div class="books-card-text-wrapper"> 
            
            <div class="books-card-info">
              <h3 class="books-card-title">${l}</h3> 
              <p class="books-card-author">${d}</p>
            </div>
            
            <p class="books-card-price">$${h}</p> 
          
          </div> 
        <button class="books-card-btn" type="button">Learn More</button>
      </li>`}).join("");r.bookCardList.innerHTML=t}function W(e){return`
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
  `}function z(){const e=r.dropdownToggle,t=r.dropdownMenu;!e||!t||e.dataset.dropdownInited!=="true"&&(e.addEventListener("click",o=>{o.stopPropagation(),t.classList.toggle("open"),e.classList.toggle("active")}),t.addEventListener("click",o=>{const n=o.target.closest(".dropdown-item");if(!n)return;e.textContent=n.textContent,t.classList.remove("open"),e.classList.remove("active");const s=n.dataset.category,a=new CustomEvent("category:selected",{detail:{category:s}});document.dispatchEvent(a)}),document.addEventListener("click",o=>{!t.contains(o.target)&&!e.contains(o.target)&&(t.classList.remove("open"),e.classList.remove("active"))}),e.dataset.dropdownInited="true")}function G(){r.bookCardList&&r.bookCardList.dataset.modalInited!=="true"&&(r.bookCardList.addEventListener("click",F),r.bookCardList.dataset.modalInited="true")}async function F(e){const t=e.target.closest(".books-card-btn");if(!t)return;const n=t.closest(".books-card").dataset.id;if(n){console.log(n);try{const s=await H(n);Y(s)}catch(s){console.error("❌ Error loading book details:",s)}}}function Y(e){r.bookModalContent.innerHTML=W(e),r.bookModalBackdrop.classList.remove("is-hidden"),r.bookModalClose.addEventListener("click",v),r.bookModalBackdrop.addEventListener("click",A),document.addEventListener("keydown",P)}function v(){r.bookModalBackdrop.classList.add("is-hidden"),r.bookModalContent.innerHTML="",r.bookModalClose.removeEventListener("click",v),r.bookModalBackdrop.removeEventListener("click",A),document.removeEventListener("keydown",P)}function A(e){e.target===r.bookModalBackdrop&&v()}function P(e){e.key==="Escape"&&v()}let g=[],J="All categories",p=0;const Q=4;function X(){return window.innerWidth<768?10:24}function Z(){p>=g.length?r.showMoreBtn.classList.add("is-hidden"):r.showMoreBtn.classList.remove("is-hidden")}function B(){p=Math.min(p,g.length);const e=g.slice(0,p);U(e),r.booksShown&&(r.booksShown.textContent=p),r.booksTotal&&(r.booksTotal.textContent=g.length),Z(),G()}async function L(e){try{J=e;let t;e==="All categories"||e==="All"||!e?t=await V():t=await D(e),g=t,p=X(),B()}catch(t){console.error("loadBooksByCategory error:",t)}}function ee(){p+=Q,B()}async function te(){try{const e=await N();R(e),j(e),z(),r.dropdownMenu.addEventListener("click",t=>{const o=t.target.closest(".dropdown-item");if(!o)return;const n=o.dataset.category||o.textContent.trim();r.dropdownToggle.textContent=o.textContent.trim(),L(n)}),r.categoriesList.addEventListener("click",t=>{const o=t.target.closest(".categories-item");if(!o)return;const n=o.dataset.category||o.textContent.trim();r.categoriesList.querySelectorAll(".categories-item").forEach(s=>s.classList.remove("active")),o.classList.add("active"),L(n)})}catch(e){console.error("initCategories error:",e)}}async function oe(){await te(),await L("All categories")}r.showMoreBtn.addEventListener("click",ee);window.addEventListener("resize",()=>{B()});oe();new S(".swiper",{modules:[q,x,_,T,$],slidesPerView:1,loop:!1,speed:400,watchOverflow:!0,simulateTouch:!0,grabCursor:!0,navigation:{nextEl:".hero__button--next",prevEl:".hero__button--prev"},autoplay:{delay:5e3,disableOnInteraction:!1},keyboard:{enabled:!0,onlyInViewport:!0},on:{init:function(){E(this)},slideChange:function(){E(this)}}});function E(e){const t=document.querySelector(".hero__button--prev"),o=document.querySelector(".hero__button--next");t.disabled=e.isBeginning,o.disabled=e.isEnd}new S(".swiper-feedbacks",{modules:[q,x,_,T,$],wrapperClass:"feedbacks__list",slideClass:"feedbacks__elements",loop:!1,speed:400,spaceBetween:24,slidesPerView:3,watchOverflow:!0,simulateTouch:!0,grabCursor:!0,autoplay:{delay:5e3,disableOnInteraction:!1},keyboard:{enabled:!0,onlyInViewport:!0},a11y:{enabled:!0,containerRoleDescriptionMessage:"Testimonials slider",slideRole:"listitem",prevSlideMessage:"Previous testimonials",nextSlideMessage:"Next testimonials"},navigation:{nextEl:".feedbacks__btn--next",prevEl:".feedbacks__btn--prev",disabledClass:"is-disabled"},pagination:{el:".feedbacks__dots",clickable:!0,bulletClass:"feedbacks__dots-elem",bulletActiveClass:"is-active",renderBullet:(e,t)=>`<span class="${t}" aria-label="Go to slide group ${e+1}"></span>`},breakpoints:{0:{slidesPerView:1,spaceBetween:16},768:{slidesPerView:2,spaceBetween:24},1440:{slidesPerView:3,spaceBetween:24}}});document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".events-list");if(!e)return;const t=document.querySelectorAll(".item-card"),o=document.querySelector(".events-container"),n=document.createElement("div");n.className="slider-controls",n.innerHTML=`
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
  `,o.appendChild(n);const s=n.querySelector(".dots"),a=n.querySelector(".prev"),d=n.querySelector(".next");let i=0,l=1;function h(){s.innerHTML="";const c=l===1?t.length:t.length-l+1;for(let u=0;u<c;u++){const m=document.createElement("span");m.className="dot"+(u===0?" active":""),s.appendChild(m)}}function w(c){e.style.transition="opacity 0.3s ease",e.style.opacity="0",setTimeout(()=>{c(),e.style.opacity="1"},300)}function y(){const c=t.length;t.forEach((m,f)=>{m.style.display=f>=i&&f<i+l?"flex":"none"}),s.querySelectorAll(".dot").forEach((m,f)=>m.classList.toggle("active",f===i)),a.classList.toggle("is-disabled",i===0),d.classList.toggle("is-disabled",i>=c-l)}function M(){const c=window.innerWidth;c>=1440?(l=t.length,t.forEach(u=>u.style.display="flex"),n.style.display="none",e.style.transition="",e.style.opacity="1"):(l=c<768?1:2,n.style.display="flex",i=0,h(),y())}d.addEventListener("click",()=>{const c=t.length;i<c-l&&w(()=>{i++,y()})}),a.addEventListener("click",()=>{i>0&&w(()=>{i--,y()})}),s.addEventListener("click",c=>{if(!c.target.classList.contains("dot"))return;const u=Array.from(s.children).indexOf(c.target);w(()=>{i=u,y()})}),window.addEventListener("resize",M),M()});
//# sourceMappingURL=index.js.map
