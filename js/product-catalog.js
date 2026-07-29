const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;" })[character]);

const visualTemplates = {
  landing:()=>`<div class="mock-browser"><span></span><span></span><span></span><small>tu-negocio.com</small></div><div class="mock-landing"><i>Una experiencia clara</i><strong>Tu negocio,<br>bien presentado.</strong><span>Conocé más</span><div></div></div>`,
  appointments:()=>`<div class="mock-appbar"><strong>Agenda</strong><small>Semana actual</small></div><div class="mock-calendar"><b>Lun</b><b>Mar</b><b>Mié</b><b>Jue</b><b>Vie</b>${Array.from({length:15},(_,i)=>`<i class="${[2,7,11,13].includes(i)?"booked":""}"></i>`).join("")}</div><div class="mock-floating"><small>Próximo turno</small><strong>14:30 · Consulta</strong></div>`,
  stock:()=>`<div class="mock-appbar"><strong>Inventario</strong><small>248 productos</small></div><div class="mock-metrics"><span><small>Stock total</small><b>3.842</b></span><span><small>Alertas</small><b>12</b></span></div><div class="mock-table"><b>Producto</b><b>Disponible</b><span>Café molido</span><i>42 u.</i><span>Leche entera</span><i class="warning">6 u.</i><span>Yerba mate</span><i>28 u.</i></div>`,
  orders:()=>`<div class="mock-appbar"><strong>Pedidos de hoy</strong><small>18 activos</small></div><div class="mock-kanban"><div><b>Recibidos</b><i>#184 · 12:40</i><i>#185 · 12:47</i></div><div><b>Preparando</b><i>#181 · Cocina</i><i>#183 · Cocina</i></div><div><b>Listos</b><i>#179 · Retiro</i></div></div>`,
  dashboard:()=>`<div class="mock-side"><b>SA</b><i></i><i></i><i></i></div><div class="mock-dashboard"><div class="mock-appbar"><strong>Resumen</strong><small>Hoy</small></div><div class="mock-metrics"><span><small>Operaciones</small><b>186</b></span><span><small>Pendientes</small><b>14</b></span></div><div class="mock-chart">${[38,58,44,72,63,88,76].map(h=>`<i style="--height:${h}%"></i>`).join("")}</div></div>`,
  automation:()=>`<div class="mock-flow"><span><small>Cuando sucede</small><b>Nuevo pedido</b></span><i></i><span><small>Organizar</small><b>Validar datos</b></span><i></i><span><small>Entonces</small><b>Avisar al equipo</b></span></div><div class="mock-run"><i></i><span>Último recorrido completado</span><small>hace 2 min</small></div>`,
  assistant:()=>`<div class="mock-chat"><div class="mock-appbar"><strong>Asistente</strong><small>Con contexto</small></div><p>¿Qué necesita seguimiento hoy?</p><p class="answer">Encontré 4 casos y preparé el contexto.</p><span>Escribí una consulta…</span></div><div class="mock-context"><small>Información consultada</small><b>Pedidos</b><b>Clientes</b></div>`,
  forms:()=>`<div class="mock-form"><div class="mock-appbar"><strong>Nueva solicitud</strong><small>Paso 2 de 3</small></div><label>Tipo de servicio<span>Seleccioná una opción</span></label><label>Fecha preferida<span>28 / 07 / 2026</span></label><label>Detalle<span>Contanos brevemente…</span></label><span class="mock-form-action">Continuar</span></div><div class="mock-validation"><i>✓</i><span>Datos completos</span></div>`
};
export const createProductVisual=(type,context="card")=>`<div class="product-visual product-visual-${escapeHtml(type)} product-visual-${context}" aria-hidden="true">${(visualTemplates[type]||visualTemplates.dashboard)()}</div>`;

const featuredByFamily={
  presencia:["landing-page","sitio-institucional","catalogo-online","tienda-online","portal-reservas"],
  gestion:["sistema-turnos","gestion-pedidos","control-stock","gestion-clientes","sistema-rubro"],
  automatizacion:["bot-whatsapp","recordatorios","formularios-inteligentes","integracion-web-gestion","flujos-personalizados"]
};

export const renderUniverseExplorer=(families,products,container)=>{
  container.innerHTML=`<div class="universe-explorer reveal" data-universe-explorer>
    <div class="universe-panels">
      ${families.map((family,familyIndex)=>{
        const allItems=products.filter(product=>product.family===family.id);
        const featured=(featuredByFamily[family.id]||[]).map(slug=>products.find(product=>product.slug===slug)).filter(Boolean);
        const previewSlug={presencia:"landing-page",gestion:"sistema-turnos",automatizacion:"integracion-web-gestion"}[family.id];
        const lead=products.find(product=>product.slug===previewSlug)||featured[0]||allItems[0];
        return `<article class="universe-panel universe-panel-${escapeHtml(family.id)}" id="${escapeHtml(family.id)}" style="--family-color:${family.color}" data-universe-panel="${escapeHtml(family.id)}">
          <button class="universe-trigger" type="button" data-universe-trigger="${escapeHtml(family.id)}" aria-expanded="false" aria-controls="universe-content-${escapeHtml(family.id)}">
            <span class="universe-index">0${familyIndex+1}</span>
            <span class="universe-heading"><strong>${escapeHtml(family.name)}</strong><small>${escapeHtml(family.subtitle)}</small></span>
            <span class="universe-action">Explorar <i aria-hidden="true">↗</i></span>
          </button>
          <div class="universe-preview" aria-hidden="true">${createProductVisual(lead.visualType,"universe")}</div>
          <div class="universe-content" id="universe-content-${escapeHtml(family.id)}">
            <div class="universe-content-bar"><p>Algunas formas de empezar</p><button type="button" data-universe-close>Volver a las tres familias <span aria-hidden="true">×</span></button></div>
            <div class="universe-solutions">
              ${featured.map((product,index)=>`<button class="universe-solution" type="button" data-open-product="${escapeHtml(product.slug)}">
                <span class="universe-solution-visual">${createProductVisual(product.visualType,"universe-card")}</span>
                <span class="universe-solution-copy"><small>0${index+1}</small><strong>${escapeHtml(product.name)}</strong><span>${escapeHtml(product.shortBenefit)}</span></span>
              </button>`).join("")}
            </div>
            <p class="universe-more">Más posibilidades según tu proyecto y tu forma de trabajar.</p>
          </div>
        </article>`;
      }).join("")}
    </div>
  </div>`;
};

const list=(items,className)=>items?.length?`<ul class="${className}">${items.map(item=>`<li>${escapeHtml(item)}</li>`).join("")}</ul>`:"";
export const renderProductDetail=(product,container)=>{
  const complete=product.complete;
  container.innerHTML=`<section class="product-detail-hero"><div class="product-detail-intro"><p>${escapeHtml(product.name)}</p><h1 id="product-detail-title">${escapeHtml(product.heroTitle)}</h1><p>${escapeHtml(product.description)}</p><button class="button button-accent" type="button" data-product-contact>Conversemos sobre tu caso <span aria-hidden="true">↗</span></button></div>${createProductVisual(product.visualType,"hero")}</section>
  <section class="product-detail-band product-benefits"><div><p class="product-section-index">01 / El cambio</p><h2>Qué puede mejorar.</h2></div>${list(product.benefits,"product-benefit-list")}</section>
  <section class="product-detail-band product-businesses"><div><p class="product-section-index">02 / Situaciones</p><h2>Puede adaptarse a realidades distintas.</h2><p>No es una solución cerrada por rubro: se configura alrededor de la actividad y de quienes van a usarla.</p></div>${list(product.businessTypes,"product-business-list")}</section>
  ${product.includes?.length?`<section class="product-detail-band product-includes"><div><p class="product-section-index">03 / Posibilidades</p><h2>Qué puede incluir.</h2><p>${complete?"Una referencia concreta para imaginar el alcance. La combinación final se define según cada caso.":"Contenido inicial de referencia; el alcance concreto se define después de entender la necesidad."}</p></div>${list(product.includes,"product-benefit-list")}</section>`:""}
  <section class="product-detail-band product-scaling"><div><p class="product-section-index">04 / Evolución</p><h2>Puede empezar simple y crecer.</h2><p>Son etapas posibles de una misma solución, no productos separados.</p></div><ol>${product.scaling.map((step,index)=>`<li><small>${String(index+1).padStart(2,"0")}</small><strong>${escapeHtml(step)}</strong></li>`).join("")}</ol></section>
  <section class="product-detail-band product-adaptation"><div><p class="product-section-index">05 / Conexiones</p><h2>También puede trabajar con otras soluciones.</h2></div><p>Puede conectarse con una experiencia web, notificaciones o herramientas de gestión para evitar cargas duplicadas y mantener la información en movimiento.</p></section>
  ${complete?`<section class="product-detail-band product-adaptation"><div><p class="product-section-index">06 / Acompañamiento</p><h2>No se trata de entregarte una herramienta y dejarte solo.</h2></div><p>La implementación contempla el punto de partida, la configuración y una capacitación ajustada a las personas que van a usarla.</p></section>`:""}
  <section class="product-detail-cta"><p>¿Hay algo de tu trabajo que podría funcionar mejor?</p><h2>Empecemos por entenderlo.</h2><button class="button button-accent" type="button" data-product-contact>Contame qué necesitás <span aria-hidden="true">↗</span></button></section>`;
};
