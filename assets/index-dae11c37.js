(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function t(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(o){if(o.ep)return;o.ep=!0;const i=t(o);fetch(o.href,i)}})();async function H(){try{const e=await fetch("https://voodoo-sandbox.myshopify.com/products.json");if(!e.ok)throw new Error("Network response was not ok");return await e.json()}catch(e){throw console.error("Error fetching data:",e),e}}function a(e){return Math.round(Number(e)*100)/100}function M(e){const n=document.getElementById("info"),t="Important info",r="Important info regarding our services";e>=1024?n.innerHTML=r:n.innerHTML=t}const p=cart.querySelector("#footer").querySelector("#totalPrice").querySelector("#quantity");function P(e){const n=document.getElementById("cartList"),t=document.createElement("article"),r=e.title,o=e.images[0],i=a(e.variants[0].price),c=e.id;t.classList.add("flex","justify-start","gap-[18px]","relative"),t.setAttribute("id",c),t.innerHTML=`
    <div id="image" class="border border-white w-[74px] rounded opacity-50">
        <img class="w-full h-full" src="${(o==null?void 0:o.src)||"./src/assets/icons/V-logo.png"}" alt="product foto" />
    </div>
    <div id="properties" class="flex flex-col gap-y-[12px] font-bold text-sm text-white">
        <h3>${r}</h3>
        <div id="price" class="flex gap-[5px]">
            <h3 id="quantity">${i}</h3>
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
    </button>`,n.appendChild(t)}function C(e){const n=document.getElementById(`${e.id}`),t=n.querySelector("#properties").querySelector("#counter").querySelector("#quantity"),r=n.querySelector("#properties").querySelector("#price").querySelector("#quantity");t.innerHTML++,r.innerHTML=a(e.variants[0].price*t.innerHTML)}function $(e){const n=document.getElementById(`${e.id}`),t=n.querySelector("#properties").querySelector("#counter").querySelector("#quantity");if(t.innerHTML<=1)return;const r=n.querySelector("#properties").querySelector("#price").querySelector("#quantity");t.innerHTML--,r.innerHTML=a(e.variants[0].price*t.innerHTML)}function O(e){document.getElementById(`${e}`).remove()}function D(e,n){const t=document.getElementById(`${e.id}`),r=t.querySelector("#trash"),o=t.querySelector("#properties").querySelector("#counter").querySelector("#quantity");r.addEventListener("click",i=>{n.removeAttribute("disabled","");const c=i.target.parentNode.parentNode.id;p.innerHTML=a(+p.innerHTML-+o.innerHTML*+e.variants[0].price),N(c),O(c)})}function k(e){document.getElementById(`${e.id}`).querySelector("#properties").querySelector("#counter").querySelector("#increase").addEventListener("click",()=>{C(e),p.innerHTML=a(+p.innerHTML+ +e.variants[0].price)})}function R(e){document.getElementById(`${e.id}`).querySelector("#properties").querySelector("#counter").querySelector("#decrease").addEventListener("click",()=>{$(e),p.innerHTML=a(+p.innerHTML-+e.variants[0].price)})}function j(e){const t=[e-2,e-1,e,e+1,e+2],r=t.filter(s=>s>1&&s<25),o=e===5,i=e===25-4,c=e>5,l=e<25-4;return o&&r.unshift(2),i&&r.push(25-1),c&&r.unshift("..."),l&&r.push("..."),[1,...r,25]}const w=cart.querySelector("#footer").querySelector("#totalPrice").querySelector("#quantity"),x=new Map;async function A(){const n=(await H()).products;let t=1,r=24;function o(l,s,g){const f=document.getElementById("catalog");f.innerHTML="",g--;const y=s*g,S=y+s;l.slice(y,S).map(u=>{const L=document.createElement("article"),v=u.images[0],B=u.variants[0].price,I=u.vendor;L.classList.add("h-full","lg:max-w-[300px]","mx-auto"),L.innerHTML=`
                  <div class="border relative rounded h-[300px] w-full">
                    <img class="w-full h-full" src="${(v==null?void 0:v.src)||"./src/assets/icons/V-logo.png"}" alt="product foto">
                    <div
                      class="absolute top-[10px] left-[10px] h-[24px] !bg-black rounded"
                    >
                      <h3 class="h-full px-[10px] font-normal text-xs text-white flex items-center justify-center">${I}</h3>
                    </div>
                  </div>
                  <div class="mt-[10px] flex justify-between">
                    <div class="flex flex-col font-bold text-sm">
                      <h3 class="">${u.title}</h3>
                      <h3 class="">${a(B)+" KR."}</h3>
                    </div>
                    <div class="flex flex-col text-sm">
                      <h3 class="font-medium flex justify-end">Condition</h3>
                      <h3 class="font-normal flex justify-end">Rating</h3>
                    </div>
                  </div>
                  <button
                    name="addButton"
                    data-id="${u.id}"
                    type="button"
                    class="disabled:opacity-50 mt-[10px] px-3 py-2 w-full h-[42px] font-bold text-center text-sm text-white !bg-black rounded hover:bg-blue-800"
                  >
                    ADD TO CART
                  </button>
            `,f.appendChild(L);const h=document.querySelector(`[data-id='${u.id}']`);h.addEventListener("click",()=>{const d=n.find(b=>b.id===+h.dataset.id);if(!x.has(d.id)){x.set(d.id,d);const b=x.get(d.id);P(b),k(d),R(d),D(d,h),w.innerHTML=a(+w.innerHTML+ +d.variants[0].price)}h.setAttribute("disabled","")})})}function i(l){const s=document.getElementById("links");s.innerHTML="",j(l).forEach(f=>{const y=c(f);s.appendChild(y)})}function c(l){const s=document.createElement("li");return s.classList.add("cursor-pointer","text-lg","font-normal","border","rounded-full","w-[39px]","h-[39px]","flex","justify-center","items-center"),s.textContent=l,t===l&&(s.classList.add("text-white","bg-black"),s.setAttribute("id","active")),s.addEventListener("click",()=>{t=l,o(n,r,t),i(t),s.classList.add("text-white","bg-black"),s.setAttribute("id","active")}),s}o(n,r,t),i(t)}function N(e){x.delete(+e)}const W=document.getElementById("cartButton"),K=document.getElementById("arrowDown"),m=document.getElementById("sideMenu"),z=document.getElementById("closeButton"),q=document.getElementById("important"),E=document.getElementById("importantInfo");let T=!1;M(window.innerWidth);A();W.addEventListener("click",()=>{m.classList.remove("translate-x-full"),m.classList.add("translate-x-0"),window.innerWidth>=1024?m.style.width="25%":m.style.width="100%"});K.addEventListener("click",()=>{T?(q.style.bottom="0",E.classList.remove("flex"),E.classList.add("hidden"),T=!1):(q.style.bottom="-70px",E.classList.remove("hidden"),E.classList.add("flex"),T=!0)});z.addEventListener("click",()=>{m.classList.remove("translate-x-0"),m.classList.add("translate-x-full")});window.addEventListener("resize",e=>{const n=e.currentTarget.innerWidth;M(n)});
