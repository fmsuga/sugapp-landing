const {test,expect}=require('@playwright/test');
const routes=['/','/soluciones/landing-profesional.html','/soluciones/sitio-institucional.html','/soluciones/catalogo-digital.html','/soluciones/turnos-reservas.html','/soluciones/automatizaciones.html','/soluciones/software-a-medida.html','/soluciones/mantenimiento-evolucion.html'];

for(const width of [390,768,1440])test(`home ${width}px`,async({page})=>{
  const errors=[];page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});page.on('pageerror',e=>errors.push(e.message));
  await page.setViewportSize({width,height:900});await page.goto('http://127.0.0.1:8123/',{waitUntil:'networkidle'});await page.evaluate(()=>sessionStorage.setItem('sugapp-intro','seen'));await page.reload();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();expect(errors).toEqual([]);
  const heroLayout=await page.locator('.hero-content').evaluate(root=>{const copy=root.querySelector('.hero-copy'),title=root.querySelector('h1'),lineHeight=parseFloat(getComputedStyle(copy).lineHeight);return{copyLines:Math.round(copy.getBoundingClientRect().height/lineHeight),titleTop:title.getBoundingClientRect().top/innerHeight,linesFit:[...root.querySelectorAll('.hero-title-line')].every(line=>line.scrollWidth<=root.clientWidth+1)}});expect(heroLayout.copyLines).toBeLessThanOrEqual(width<600?4:2);expect(heroLayout.titleTop).toBeLessThan(.62);expect(heroLayout.linesFit).toBeTruthy();
});

test('rutas internas',async({page})=>{for(const path of routes){const response=await page.goto(`http://127.0.0.1:8123${path}`);expect(response.status()).toBe(200);await expect(page.locator('h1')).toHaveCount(1)}});

test('menús, industria, acordeón y orientador',async({page})=>{
  await page.setViewportSize({width:1440,height:900});await page.goto('http://127.0.0.1:8123/');await page.evaluate(()=>sessionStorage.setItem('sugapp-intro','seen'));await page.reload();
  await page.getByRole('button',{name:'Soluciones',exact:true}).click();await expect(page.locator('#solutions-menu')).toBeVisible();await page.keyboard.press('Escape');await expect(page.locator('#solutions-menu')).toBeHidden();
  await page.getByRole('button',{name:'Industrias',exact:true}).click();await page.getByRole('button',{name:'Kioscos y comercios'}).click();await expect(page.getByRole('dialog',{name:/Kioscos/})).toBeVisible();await page.keyboard.press('Escape');
  await page.locator('[data-solution-tab="1"]').click();await expect(page.locator('#solution-detail h3')).toHaveText('Ventas Digitales');await page.getByRole('button',{name:'¿Por dónde empiezo?'}).click();
  for(const choice of ['Comercio','Mostrar productos o vender','WhatsApp','Con una versión simple'])await page.getByRole('button',{name:choice}).click();
  await expect(page.locator('[data-advisor-content] h3')).toHaveText('Catálogo digital');await page.keyboard.press('Escape');await expect(page.locator('[data-advisor-dialog]')).toBeHidden();
});

test('formulario accesible y movimiento reducido',async({page})=>{await page.emulateMedia({reducedMotion:'reduce'});await page.goto('http://127.0.0.1:8123/#contacto');await expect(page.locator('[data-intro]')).toHaveCount(0);await page.locator('[data-contact-form] button[type=submit]').click();await expect(page.locator('[data-form-status]')).toContainText('Completá');await expect(page.locator('#contact-name')).toBeFocused()});

test('refinamiento visual e interacción recuperada',async({page})=>{
  await page.setViewportSize({width:1440,height:900});await page.goto('http://127.0.0.1:8123/');await page.evaluate(()=>sessionStorage.setItem('sugapp-intro','seen'));await page.reload();
  await expect(page.locator('.site-header')).not.toContainText('Contar mi caso');await expect(page.locator('.hero .eyebrow')).toHaveCount(0);await expect(page.locator('.solution-index')).toHaveCount(0);
  const heroCta=page.locator('.hero-action');
  await page.waitForFunction(()=>[...document.querySelectorAll('.hero-title-word')].every(word=>getComputedStyle(word).opacity==='1'));
  const menuButton=page.getByRole('button',{name:'Soluciones',exact:true});await menuButton.click();expect(await page.locator('.nav-chevron').first().evaluate(el=>getComputedStyle(el).transform)).not.toBe('none');await page.keyboard.press('Escape');
  await page.locator('[data-solution-tab="0"]').focus();await page.keyboard.press('ArrowRight');await expect(page.locator('[data-solution-tab="1"]')).toBeFocused();await expect(page.locator('#solution-detail')).toHaveAttribute('aria-labelledby','solution-tab-sales');
  await page.evaluate(()=>scrollTo(0,document.querySelector('#necesidades').offsetTop+260));await page.waitForTimeout(60);await expect(page.locator('[data-marquee]').first()).toHaveAttribute('data-scroll-direction','down');await page.evaluate(()=>scrollBy(0,-220));await page.waitForTimeout(25);await expect(page.locator('[data-marquee]').first()).toHaveAttribute('data-scroll-direction','up');
  await page.waitForTimeout(700);const motion=await page.locator('[data-marquee]').first().evaluate(async row=>{const track=row.querySelector('.marquee-track'),samples=[];for(let i=0;i<30;i++){await new Promise(requestAnimationFrame);samples.push(new DOMMatrixReadOnly(getComputedStyle(track).transform).m41)}const steps=samples.slice(1).map((value,index)=>Math.abs(value-samples[index]));return{unique:new Set(samples).size,maxStep:Math.max(...steps),travel:Math.abs(samples.at(-1)-samples[0])}});expect(motion.unique).toBeGreaterThanOrEqual(12);expect(motion.maxStep).toBeLessThanOrEqual(1);expect(motion.travel).toBeGreaterThan(10);
  const marquee=page.locator('[data-marquee]').first();await marquee.focus();const before=await marquee.locator('.marquee-track').evaluate(el=>getComputedStyle(el).transform);await page.keyboard.press('ArrowRight');const after=await marquee.locator('.marquee-track').evaluate(el=>getComputedStyle(el).transform);expect(after).not.toBe(before);
  const crisp=await page.locator('[data-message-marquees]').evaluate(root=>{const bubble=root.querySelector('.client-message'),track=root.querySelector('.marquee-track'),matrix=new DOMMatrixReadOnly(getComputedStyle(track).transform);return{rotation:getComputedStyle(root).transform,bubbleTransform:getComputedStyle(bubble).transform,fontSize:parseFloat(getComputedStyle(bubble).fontSize),weight:getComputedStyle(bubble).fontWeight,filter:getComputedStyle(bubble).filter,trackX:matrix.m41}});expect(crisp.rotation).not.toBe('none');expect(crisp.bubbleTransform).toBe('none');expect(crisp.fontSize).toBeGreaterThanOrEqual(16);expect(Number(crisp.weight)).toBeGreaterThanOrEqual(500);expect(crisp.filter).toBe('none');expect(Number.isInteger(crisp.trackX)).toBeTruthy();
  await expect(heroCta).toHaveClass(/is-ready/,{timeout:3000});await expect(heroCta).toBeVisible();
  await page.setViewportSize({width:390,height:844});await page.reload();await page.locator('[data-solution-mobile="1"]').click();await expect(page.locator('#solution-mobile-sales')).toBeVisible();await expect(page.locator('#solution-mobile-presence')).toBeHidden();
});
