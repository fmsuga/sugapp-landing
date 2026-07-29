import { families, products } from "./product-data.js";
import { renderFamilyExplorers } from "./product-catalog.js";
import { initializeProductNavigation } from "./product-navigation.js";
import { publicNeeds, operationalNeeds } from "./client-messages.js";

const reducedMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const hero=document.querySelector(".hero");
const heroScroll=document.querySelector(".hero-scroll");
const explorerRoot=document.querySelector("[data-family-explorers]");
renderFamilyExplorers(families,products,explorerRoot);

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
const showStage=(explorer,nextIndex)=>{
  const cards=[...explorer.querySelectorAll("[data-stage-card]")];
  const pills=[...explorer.querySelectorAll("[data-stage-index]")];
  const index=(nextIndex+cards.length)%cards.length;
  explorer.dataset.index=index;
  cards.forEach((card,i)=>{let offset=i-index;if(offset>cards.length/2)offset-=cards.length;if(offset<(-cards.length/2))offset+=cards.length;card.style.setProperty("--offset",offset);card.style.setProperty("--distance",Math.abs(offset));card.classList.toggle("is-active",i===index);card.setAttribute("aria-hidden",i===index?"false":"true");});
  pills.forEach((pill,i)=>pill.classList.toggle("is-active",i===index));
};
const initializeExplorers=()=>{
  document.querySelectorAll("[data-family-explorer]").forEach(explorer=>{
    const move=direction=>showStage(explorer,Number(explorer.dataset.index)+direction);
    explorer.addEventListener("click",event=>{const pill=event.target.closest("[data-stage-index]");if(pill)showStage(explorer,Number(pill.dataset.stageIndex));if(event.target.closest("[data-stage-prev]"))move(-1);if(event.target.closest("[data-stage-next]"))move(1);});
    explorer.querySelector("[data-product-stage]").addEventListener("keydown",event=>{if(event.key==="ArrowLeft"){event.preventDefault();move(-1);}if(event.key==="ArrowRight"){event.preventDefault();move(1);}});
    showStage(explorer,0);
  });
};
const initializeMarquees=()=>{
  const root=document.querySelector("[data-message-marquees]");
  if(!root)return;
  const escape=value=>String(value).replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[char]));
  const messageMarkup=message=>`<li class="client-message-wrapper"><article class="client-message client-message--${message.tone} client-message--tail-${message.tail} client-message--${message.emphasis==="primary"?"primary":"secondary"}"><p>${escape(message.text)}</p></article></li>`;
  const rowMarkup=(messages,direction,baseVelocity,label)=>`<div class="marquee-row marquee-row-${direction==="left"?"top":"bottom"}" data-marquee data-direction="${direction}" data-base-velocity="${baseVelocity}">
    <div class="marquee-viewport"><div class="marquee-track">${Array.from({length:3},(_,index)=>`<ul class="marquee-set" ${index>0?'aria-hidden="true"':""}>${messages.map(messageMarkup).join("")}</ul>`).join("")}</div></div>
    <button class="marquee-toggle" type="button" data-marquee-toggle aria-pressed="false"><span class="marquee-toggle-icon" aria-hidden="true">Ⅱ</span><span class="sr-only">Pausar ${label}</span></button>
  </div>`;
  root.innerHTML=rowMarkup(publicNeeds,"left",2.1,"consultas de la fila superior")+rowMarkup(operationalNeeds,"right",2.45,"consultas de la fila inferior");

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
    toggle:row.querySelector("[data-marquee-toggle]"),
    direction:row.dataset.direction==="left"?-1:1,
    baseVelocity:Number(row.dataset.baseVelocity),
    offset:0,
    setWidth:1,
    hovered:false,
    focusWithin:false,
    touchPaused:false,
    manualPaused:false,
    visible:true,
    hoverSpring:spring(1,220,65),
    scrollSpring:spring(1,300,42)
  }));
  const setPaused=(state,paused)=>{
    state.manualPaused=paused;
    state.element.classList.toggle("is-paused",paused);
    state.toggle.setAttribute("aria-pressed",String(paused));
    state.toggle.querySelector(".marquee-toggle-icon").textContent=paused?"▶":"Ⅱ";
    state.toggle.querySelector(".sr-only").textContent=paused?"Reanudar consultas":"Pausar consultas";
  };
  rows.forEach(state=>{
    const row=state.element;
    const toggle=state.toggle;
    state.setWidth=state.set.getBoundingClientRect().width;
    state.offset=state.direction>0?-state.setWidth:0;
    row.addEventListener("pointerenter",event=>{if(event.pointerType==="mouse")state.hovered=true;});
    row.addEventListener("pointerleave",event=>{if(event.pointerType==="mouse")state.hovered=false;});
    row.addEventListener("focusin",()=>{state.focusWithin=true;});
    row.addEventListener("focusout",event=>{if(!row.contains(event.relatedTarget))state.focusWithin=false;});
    row.addEventListener("pointerdown",event=>{if(event.pointerType==="touch"&&!event.target.closest("[data-marquee-toggle]"))state.touchPaused=!state.touchPaused;});
    toggle.addEventListener("click",()=>setPaused(state,!state.manualPaused));
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
  let maxScrollBoost=innerWidth<=560 ? 14 : innerWidth<=900 ? 18 : 24;
  addEventListener("resize",()=>{
    viewportVelocityScale=innerWidth<=560 ? .62 : innerWidth<=900 ? .86 : 1;
    maxScrollBoost=innerWidth<=560 ? 14 : innerWidth<=900 ? 18 : 24;
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
      state.hoverSpring.target=(state.hovered||state.focusWithin) ? .04 : 1;
      const hoverFactor=updateSpring(state.hoverSpring,delta);
      const normalizedScrollVelocity=Math.min(Math.abs(scrollVelocity)/900,1);
      const easedScrollVelocity=normalizedScrollVelocity*normalizedScrollVelocity*(3-2*normalizedScrollVelocity);
      const scrollBoost=easedScrollVelocity*maxScrollBoost;
      state.scrollSpring.target=1+scrollBoost;
      const scrollFactor=Math.max(1,updateSpring(state.scrollSpring,delta));
      const pauseFactor=state.manualPaused||state.touchPaused?0:1;
      const pixelsPerSecond=state.baseVelocity*3.2*viewportVelocityScale;
      state.offset+=state.direction*pixelsPerSecond*hoverFactor*scrollFactor*pauseFactor*delta;
      if(state.direction<0&&state.offset<=-state.setWidth)state.offset+=state.setWidth;
      if(state.direction>0&&state.offset>=0)state.offset-=state.setWidth;
      state.track.style.transform=`translate3d(${state.offset}px,0,0)`;
    });
    requestAnimationFrame(animate);
  };
  if(!reducedMotion)requestAnimationFrame(animate);
  document.addEventListener("pointerdown",event=>{
    if(event.target.closest("[data-marquee]"))return;
    rows.forEach(state=>{state.touchPaused=false;});
  });
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
