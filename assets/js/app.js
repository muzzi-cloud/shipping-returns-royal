(() => {
  "use strict";
  const CART_KEY = "royal_cart_v2";
  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => [...root.querySelectorAll(s)];
  const money = n => "Rs " + Number(n || 0).toLocaleString("en-PK");
  const products = () => window.ROYAL_PRODUCTS || [];
  const getCart = () => { try { const data=JSON.parse(localStorage.getItem(CART_KEY)||"[]"); return Array.isArray(data)?data:[]; } catch { return []; } };
  const saveCart = cart => { try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch {} updateCartCount(); };
  const productById = id => products().find(p => p.id === Number(id));
  const cartQty = () => getCart().reduce((n,item)=>n+item.qty,0);
  const cartTotal = () => getCart().reduce((n,item)=>{const p=productById(item.id);return n+(p?p.price*item.qty:0)},0);
  function toast(message) { const el=$(".toast"); if(!el)return; el.textContent=message;el.classList.add("show");clearTimeout(window.__royalToast);window.__royalToast=setTimeout(()=>el.classList.remove("show"),2600); }
  function updateCartCount(){ $$(".cart-count").forEach(el=>el.textContent=cartQty()); }
  function productCard(p) {
    return `<article class="product-card">
      <a class="product-image product-image-${safe(p.tone)}" href="contact.html" aria-label="Ask about ${esc(p.name)}">
        <img src="${esc(p.image)}" alt="${esc(p.name)}" loading="lazy" onerror="this.style.display='none';this.parentElement.classList.add('image-fallback')">
        ${p.badge?`<span class="product-badge">${esc(p.badge)}</span>`:""}<span class="quick-view">Ask about item ↗</span>
      </a>
      <div class="product-meta"><span>${esc(p.category)}</span><span>${esc(p.sku)}</span></div>
      <h3><a href="contact.html">${esc(p.name)}</a></h3>
      <div class="product-price"><strong>${money(p.price)}</strong>${p.oldPrice?`<del>${money(p.oldPrice)}</del><span class="save-tag">Save ${Math.round((p.oldPrice-p.price)/p.oldPrice*100)}%</span>`:""}</div>
      <button class="add-button" data-add="${p.id}" type="button"><span>＋</span> Add to bag</button>
    </article>`;
  }
  function renderProducts(targetId, opts={}) {
    const target=document.getElementById(targetId); if(!target)return;
    let list=products();
    if(opts.featured)list=list.filter(p=>p.featured);
    if(opts.limit)list=list.slice(0,opts.limit);
    target.innerHTML=list.map(productCard).join("");
  }
  function initShop() {
    const target=$("#shop-products"); if(!target)return;
    const cats=[...new Set(products().map(p=>p.category))];
    const catWrap=$("#category-filters");
    catWrap.innerHTML=`<label class="filter-check"><input type="radio" name="category" value="all" checked><span>All products</span><b>${products().length}</b></label>`+cats.map(c=>`<label class="filter-check"><input type="radio" name="category" value="${esc(c)}"><span>${esc(c)}</span><b>${products().filter(p=>p.category===c).length}</b></label>`).join("");
    const params=new URLSearchParams(location.search); if(params.has("category")&&cats.includes(params.get("category"))){const r=$(`input[name="category"][value="${CSS.escape(params.get("category"))}"]`);if(r)r.checked=true;}
    const apply=()=>{
      const term=($("#product-search").value||"").trim().toLowerCase();
      const cat=$('input[name="category"]:checked')?.value||"all";
      const min=Number($("#min-price").value||0), max=Number($("#max-price").value||Infinity);
      const range=Number($("#price-range").value||15000);
      const sort=$("#sort-products").value;
      let list=products().filter(p=>(cat==="all"||p.category===cat)&&`${p.name} ${p.category} ${p.description} ${p.sku}`.toLowerCase().includes(term)&&p.price>=min&&p.price<=Math.min(max,range));
      if(sort==="price-low")list.sort((a,b)=>a.price-b.price);if(sort==="price-high")list.sort((a,b)=>b.price-a.price);if(sort==="name")list.sort((a,b)=>a.name.localeCompare(b.name));if(sort==="featured")list.sort((a,b)=>Number(b.featured)-Number(a.featured)||a.id-b.id);
      target.innerHTML=list.map(productCard).join("");$("#result-count").textContent=list.length;
      $("#active-filter-label").textContent=cat==="all"?"All essentials":cat;
      $("#empty-state").hidden=!!list.length;target.hidden=!list.length;
      $("#range-value").textContent=money(range);
    };
    ["product-search","min-price","max-price","price-range","sort-products"].forEach(id=>$("#"+id).addEventListener("input",apply));
    catWrap.addEventListener("change",apply);
    const clear=()=>{$("#product-search").value="";$("#min-price").value="";$("#max-price").value="";$("#price-range").value=15000;$("#sort-products").value="featured";$('input[name="category"][value="all"]').checked=true;apply();};
    $("#clear-filters").addEventListener("click",clear);$("#empty-clear").addEventListener("click",clear);apply();
  }
  function renderCart() {
    const wrap=$("#cart-items");if(!wrap)return;
    const cart=getCart();
    if(!cart.length){wrap.innerHTML=`<div class="empty-cart"><div class="empty-cart-icon">＋</div><h2>Your bag is taking a breather.</h2><p>Nothing here yet. Explore the collection and add something useful.</p><a class="button button-primary" href="shop.html">Explore products →</a></div>`;$("#cart-summary").classList.add("summary-muted");return;}
    $("#cart-summary").classList.remove("summary-muted");
    wrap.innerHTML=`<div class="cart-table-head"><span>Product</span><span>Quantity</span><span>Total</span></div>`+cart.map(item=>{const p=productById(item.id);if(!p)return"";return `<article class="cart-row"><div class="cart-product"><div class="cart-thumb"><img src="${esc(p.image)}" alt="" onerror="this.style.display='none'"></div><div><span class="cart-category">${esc(p.category)}</span><h3>${esc(p.name)}</h3><strong>${money(p.price)}</strong><button class="remove-item" data-remove="${p.id}">Remove</button></div></div><div class="quantity-control"><button data-qty="${p.id}" data-delta="-1" aria-label="Decrease quantity">−</button><span>${item.qty}</span><button data-qty="${p.id}" data-delta="1" aria-label="Increase quantity">＋</button></div><strong class="row-total">${money(p.price*item.qty)}</strong></article>`}).join("");
    $("#cart-subtotal").textContent=money(cartTotal());$("#cart-total").textContent=money(cartTotal());
  }
  function initCheckout(){
    const wrap=$("#checkout-items");if(!wrap)return;
    const cart=getCart();wrap.innerHTML=cart.length?cart.map(i=>{const p=productById(i.id);return p?`<div class="checkout-item"><span>${esc(p.name)} <b>× ${i.qty}</b></span><strong>${money(p.price*i.qty)}</strong></div>`:""}).join(""):`<p>Your bag is empty. <a href="shop.html">Shop the collection</a>.</p>`;
    $("#checkout-total").textContent=money(cartTotal());
    $("#checkout-form").addEventListener("submit",e=>{e.preventDefault();if(!getCart().length){toast("Please add a product before continuing.");return;}const form=new FormData(e.currentTarget);const name=String(form.get("name")||"there").trim().split(/\s+/)[0];const summary={name,phone:form.get("phone"),city:form.get("city"),items:getCart().map(i=>({id:i.id,qty:i.qty})),total:cartTotal()};const confirmation=$("#checkout-confirmation");if(confirmation)confirmation.remove();const box=document.createElement("div");box.id="checkout-confirmation";box.className="demo-success";box.innerHTML=`<strong>Demo request prepared, ${esc(summary.name)}.</strong><p>Your estimated product total is ${money(summary.total)}. Nothing has been sent to a store. In a real deployment, connect this step to a secure order backend.</p>`;e.currentTarget.prepend(box);toast("Demo request preview created.");});
  }
  function safe(s){return String(s||"").toLowerCase().replace(/[^a-z0-9-]/g,"-");}
  function esc(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
  document.addEventListener("click",e=>{
    const add=e.target.closest("[data-add]");if(add){const id=Number(add.dataset.add),cart=getCart(),found=cart.find(i=>i.id===id);if(found)found.qty=Math.min(99,found.qty+1);else cart.push({id,qty:1});saveCart(cart);toast("Added to your bag.");add.classList.add("added");add.innerHTML="<span>✓</span> Added";setTimeout(()=>{if(add.isConnected){add.classList.remove("added");add.innerHTML="<span>＋</span> Add to bag";}},1300);}
    const remove=e.target.closest("[data-remove]");if(remove){saveCart(getCart().filter(i=>i.id!==Number(remove.dataset.remove)));renderCart();toast("Item removed.");}
    const qty=e.target.closest("[data-qty]");if(qty){const cart=getCart(),item=cart.find(i=>i.id===Number(qty.dataset.qty));if(item){item.qty+=Number(qty.dataset.delta);saveCart(cart.filter(i=>i.qty>0));renderCart();}}
  });
  document.addEventListener("DOMContentLoaded",()=>{
    updateCartCount();$$("[data-year]").forEach(el=>el.textContent=new Date().getFullYear());
    const menu=$(".menu-toggle"),nav=$(".main-nav");if(menu&&nav)menu.addEventListener("click",()=>{const open=nav.classList.toggle("nav-open");menu.setAttribute("aria-expanded",String(open));menu.textContent=open?"×":"☰";});
    const search=$(".search-panel");$$(".search-open").forEach(b=>b.addEventListener("click",()=>{if(search){search.hidden=false;$("#global-search")?.focus();}}));$$(".search-close").forEach(b=>b.addEventListener("click",()=>{if(search)search.hidden=true;}));
    $("#global-search")?.addEventListener("keydown",e=>{if(e.key==="Enter"){location.href="shop.html?q="+encodeURIComponent(e.currentTarget.value);}});
    const query=new URLSearchParams(location.search).get("q");if(query&&$("#product-search"))$("#product-search").value=query;
    ["contact-form","newsletter-form"].forEach(id=>{const f=$("#"+id);if(f)f.addEventListener("submit",e=>{e.preventDefault();f.reset();toast("Demo only: connect a form service before launch.");});});
  });
  window.renderProducts=renderProducts;window.initShop=initShop;window.renderCart=renderCart;window.initCheckout=initCheckout;
})();