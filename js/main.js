import { families, products } from "./product-data.js";
import { renderUniverseExplorer } from "./product-catalog.js";
import { initializeProductNavigation } from "./product-navigation.js";
import { publicNeeds, operationalNeeds } from "./client-messages.js";

const reducedMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const hero=document.querySelector(".hero");
const heroScroll=document.querySelector(".hero-scroll");
const explorerRoot=document.querySelector("[data-family-explorers]");
renderUniverseExplorer(families,products,explorerRoot);

const initializeIntro=()=>{
  window.setTimeout(()=>{heroScroll.classList.add("is-ready");heroScroll.removeAttribute("tabindex");},reducedMotion?0:5000);
  if(reducedMotion) document.documentElement.classList.add("hero-ready");
  else window.setTimeout(()=>document.documentElement.classList.add("hero-ready"),520);
};
const updateHero=()=>{
  const rect=hero.getBoundingClientRect();
  heroScroll.classList.toggle("is-past-hero",rect.bottom<=8);
  const progress=reducedMotion?0:Math.min(1,Math.max(0,-rect.top)/(hero.offsetHeight*.45));
  hero.style.setProperty("--hero-scroll-darkness",(progress*.86).toFixed(3));
};
const initializeReveal=()=>{
  const elements=[...document.querySelectorAll(".reveal")];
  if(reducedMotion||!("IntersectionObserver" in window)){elements.forEach(el=>el.classList.add("is-visible"));return;}
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("is-visible");observer.unobserve(entry.target);}}),{threshold:.12,rootMargin:"0px 0px -7%"});
  elements.forEach(el=>observer.observe(el));
};
const initializeExplorers=()=>{
  const explorer=document.querySelector("[data-universe-explorer]");
  if(!explorer)return;
  const panels=[...explorer.querySelectorAll("[data-universe-panel]")];
  const setActive=familyId=>{
    explorer.classList.toggle("has-active",Boolean(familyId));
    explorer.dataset.active=familyId||"";
    panels.forEach(panel=>{
      const active=panel.dataset.universePanel===familyId;
      panel.classList.toggle("is-active",active);
      panel.classList.toggle("is-condensed",Boolean(familyId)&&!active);
      panel.querySelector("[data-universe-trigger]").setAttribute("aria-expanded",String(active));
      const content=panel.querySelector(".universe-content");
      content.setAttribute("aria-hidden",String(!active));
      content.inert=!active;
    });
  };
  explorer.addEventListener("click",event=>{
    const trigger=event.target.closest("[data-universe-trigger]");
    if(trigger){setActive(explorer.dataset.active===trigger.dataset.universeTrigger?"":trigger.dataset.universeTrigger);return;}
    if(event.target.closest("[data-universe-close]"))setActive("");
  });
  setActive("");
  const syncMobileState=()=>{if(matchMedia("(max-width: 640px)").matches&&!explorer.dataset.active)setActive(families[0].id);};
  syncMobileState();
  addEventListener("resize",syncMobileState,{passive:true});
};
const initializeMarquees=()=>{
  const root=document.querySelector("[data-message-marquees]");
  if(!root)return;
  document.querySelectorAll(".marquee-toggle,[data-marquee-toggle]").forEach(control=>control.remove());
  const escape=value=>String(value).replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[char]));
  const messageMarkup=message=>`<li class="client-message-wrapper"><article class="client-message client-message--${message.tone} client-message--tail-${message.tail} client-message--${message.emphasis==="primary"?"primary":"secondary"}"><p>${escape(message.text)}</p></article></li>`;
  const rowMarkup=(messages,direction,baseVelocity)=>`<div class="marquee-row marquee-row-${direction==="left"?"top":"bottom"}" data-marquee data-direction="${direction}" data-base-velocity="${baseVelocity}">
    <div class="marquee-viewport"><div class="marquee-track">${Array.from({length:3},(_,index)=>`<ul class="marquee-set" ${index>0?'aria-hidden="true"':""}>${messages.map(messageMarkup).join("")}</ul>`).join("")}</div></div>
  </div>`;
  root.innerHTML=rowMarkup(publicNeeds,"left",2.1)+rowMarkup(operationalNeeds,"right",2.45);

  const spring=(value,stiffness,damping)=>({value,target:value,velocity:0,stiffness,damping});
  const updateSpring=(state,delta)=>{
    const acceleration=state.stiffness*(state.target-state.value)-state.damping*state.velocity;
    state.velocity+=acceleration*delta;
    state.value+=state.velocity*delta;
    return state.value;
  };
  const rows=[...root.querySelectorAll("[data-marquee]")].map(row=>({
    element:row,
    track:row.querySelector(".marquee-track"),
    set:row.querySelector(".marquee-set"),
    direction:row.dataset.direction==="left"?-1:1,
    baseVelocity:Number(row.dataset.baseVelocity),
    offset:0,
    setWidth:1,
    dragging:false,
    pointerId:null,
    lastPointerX:0,
    lastPointerTime:0,
    dragVelocity:0,
    visible:true,
    scrollSpring:spring(1,300,42),
    directionSpring:spring(1,220,34)
  }));
  rows.forEach(state=>{
    const row=state.element;
    state.setWidth=state.set.getBoundingClientRect().width;
    state.offset=state.direction>0?-state.setWidth:0;
    const renderDraggedPosition=()=>{
      if(state.offset<=-state.setWidth)state.offset+=state.setWidth;
      if(state.offset>=0)state.offset-=state.setWidth;
      state.track.style.transform=`translate3d(${state.offset}px,0,0)`;
    };
    row.addEventListener("pointerdown",event=>{
      if(event.button!==undefined&&event.button!==0)return;
      state.dragging=true;
      state.pointerId=event.pointerId;
      state.lastPointerX=event.clientX;
      state.lastPointerTime=performance.now();
      state.dragVelocity=0;
      row.classList.add("is-dragging");
      row.setPointerCapture(event.pointerId);
    });
    row.addEventListener("pointermove",event=>{
      if(!state.dragging||event.pointerId!==state.pointerId)return;
      const now=performance.now();
      const elapsed=Math.max(8,now-state.lastPointerTime);
      const distance=event.clientX-state.lastPointerX;
      state.offset+=distance;
      state.dragVelocity=distance/elapsed*1000;
      state.lastPointerX=event.clientX;
      state.lastPointerTime=now;
      renderDraggedPosition();
    });
    const finishDrag=event=>{
      if(!state.dragging||event.pointerId!==state.pointerId)return;
      state.dragging=false;
      state.pointerId=null;
      row.classList.remove("is-dragging");
      if(row.hasPointerCapture(event.pointerId))row.releasePointerCapture(event.pointerId);
    };
    row.addEventListener("pointerup",finishDrag);
    row.addEventListener("pointercancel",finishDrag);
  });
  const resizeObserver=new ResizeObserver(()=>rows.forEach(state=>{
    const previousWidth=state.setWidth;
    state.setWidth=state.set.getBoundingClientRect().width||1;
    if(previousWidth>1)state.offset*=state.setWidth/previousWidth;
  }));
  rows.forEach(state=>resizeObserver.observe(state.set));
  const visibilityObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
    const state=rows.find(item=>item.element===entry.target);
    if(state)state.visible=entry.isIntersecting;
  }),{rootMargin:"120px"});
  rows.forEach(state=>visibilityObserver.observe(state.element));

  let scrollVelocity=0,lastScrollY=scrollY,lastScrollTime=performance.now();
  let viewportVelocityScale=innerWidth<=560 ? .62 : innerWidth<=900 ? .86 : 1;
  let maxScrollBoost=innerWidth<=560 ? 16 : innerWidth<=900 ? 22 : 30;
  addEventListener("resize",()=>{
    viewportVelocityScale=innerWidth<=560 ? .62 : innerWidth<=900 ? .86 : 1;
    maxScrollBoost=innerWidth<=560 ? 16 : innerWidth<=900 ? 22 : 30;
  },{passive:true});
  addEventListener("scroll",()=>{
    const now=performance.now(),elapsed=Math.max(16,now-lastScrollTime);
    scrollVelocity=(scrollY-lastScrollY)/elapsed*1000;
    lastScrollY=scrollY;lastScrollTime=now;
  },{passive:true});
  let previousTime=performance.now();
  const animate=time=>{
    const delta=Math.min(.018,(time-previousTime)/1000);
    previousTime=time;
    scrollVelocity*=Math.pow(.02,delta);
    rows.forEach(state=>{
      if(!state.visible||document.hidden||reducedMotion)return;
      const normalizedScrollVelocity=Math.min(Math.abs(scrollVelocity)/900,1);
      const easedScrollVelocity=normalizedScrollVelocity*normalizedScrollVelocity*(3-2*normalizedScrollVelocity);
      const scrollBoost=easedScrollVelocity*maxScrollBoost;
      state.scrollSpring.target=1+scrollBoost;
      const scrollFactor=Math.max(1,updateSpring(state.scrollSpring,delta));
      state.directionSpring.target=scrollVelocity < -40 ? -1 : 1;
      const scrollDirectionFactor=Math.max(-1,Math.min(1,updateSpring(state.directionSpring,delta)));
      if(!state.dragging&&Math.abs(state.dragVelocity)>.1){
        state.offset+=state.dragVelocity*delta;
        state.dragVelocity*=Math.pow(.045,delta);
      }
      const pauseFactor=state.dragging?0:1;
      const pixelsPerSecond=state.baseVelocity*7*viewportVelocityScale;
      state.offset+=state.direction*scrollDirectionFactor*pixelsPerSecond*scrollFactor*pauseFactor*delta;
      if(state.offset<=-state.setWidth)state.offset+=state.setWidth;
      if(state.offset>=0)state.offset-=state.setWidth;
      state.track.style.transform=`translate3d(${state.offset}px,0,0)`;
    });
    requestAnimationFrame(animate);
  };
  if(!reducedMotion)requestAnimationFrame(animate);
};
const initializeFlows=()=>document.querySelectorAll("[data-flow-choice]").forEach(button=>button.addEventListener("click",()=>{document.querySelectorAll("[data-flow-choice]").forEach(item=>{const active=item===button;item.classList.toggle("is-active",active);item.setAttribute("aria-pressed",String(active));});document.querySelectorAll("[data-flow]").forEach(flow=>flow.hidden=flow.dataset.flow!==button.dataset.flowChoice);}));
const initializeContact=()=>{
  const form=document.querySelector("[data-contact-form]"),context=document.querySelector("[data-contact-context]"),contextValue=document.querySelector("[data-contact-context-value]"),message=form.elements.namedItem("message");
  document.querySelectorAll("[data-contact-prompt]").forEach(button=>button.addEventListener("click",()=>{message.value=button.dataset.contactPrompt;message.focus();}));
  window.addEventListener("sugapp:product-contact",event=>{const product=event.detail.product;if(!product)return;contextValue.textContent=product.name;context.hidden=false;message.value=`Quiero conversar sobre una solución de ${product.name}.`;});
  form.addEventListener("submit",async event=>{event.preventDefault();const data=new FormData(form);const text=`Nombre: ${data.get("name")}\nContacto: ${data.get("contact")}\nTipo: ${data.get("type")||"Sin definir"}\nMensaje: ${data.get("message")}`;const status=document.querySelector("[data-form-status]");try{await navigator.clipboard.writeText(text);status.textContent="Consulta copiada. El envío directo se habilitará cuando se confirme el canal público.";}catch{status.textContent="Consulta preparada. El envío directo se habilitará cuando se confirme el canal público.";}})
};
initializeIntro();initializeReveal();initializeExplorers();initializeMarquees();initializeFlows();initializeProductNavigation();initializeContact();updateHero();
document.querySelector("[data-year]").textContent=new Date().getFullYear();
addEventListener("scroll",updateHero,{passive:true});
