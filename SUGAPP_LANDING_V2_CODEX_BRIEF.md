# SugApp Landing V2 — Brief integral de implementación para Codex

> **Archivo de trabajo para Codex**
>
> Ubicación esperada: raíz del repositorio `sugapp-landing`.
>
> Objetivo: actualizar la landing actual hasta una versión comercial, compacta, coherente y cercana a publicación, preservando su identidad y transformando el trabajo estratégico reciente en una experiencia navegable.
>
> Este documento es autocontenido. No debe interpretarse como una invitación a crear solamente documentación o prototipos: se espera inspección, implementación, validación y entrega funcional de principio a fin.

---

## 1. Instrucción principal

Inspeccioná primero todo el repositorio y comprendé el estado real de la landing antes de modificar archivos.

Tomá como fuentes de verdad, en este orden:

1. el código y los activos existentes;
2. este brief;
3. la documentación vigente del proyecto;
4. el SOM de SugApp, si está disponible dentro del workspace o como fuente del proyecto;
5. el comportamiento comprobado de la versión publicada.

Versión pública de referencia:

```text
https://fmsuga.github.io/sugapp-landing/
```

No rediseñes la marca desde cero.

La landing actual ya contiene elementos que representan a SugApp y deben preservarse, especialmente:

- la introducción minimalista de SugApp;
- el hero y su lenguaje visual;
- la sensación tecnológica sobria;
- las burbujas o mensajes tipo WhatsApp que se desplazan de manera interactiva;
- la idea de partir de problemas reales;
- el tono directo y cercano;
- las animaciones que tienen una función narrativa;
- la arquitectura simple, estática y publicable en GitHub Pages.

El trabajo consiste en **evolucionar la versión actual**, no reemplazarla por una plantilla genérica.

No te detengas después de analizar, planificar o crear archivos vacíos.

Debés:

1. inspeccionar;
2. registrar brevemente el baseline;
3. planificar la intervención;
4. implementar la actualización completa;
5. probarla;
6. corregir problemas;
7. actualizar la documentación necesaria;
8. informar el resultado final.

Podés crear, modificar, mover o eliminar archivos cuando sea necesario, siempre que preserves lo valioso del proyecto y mantengas una estructura comprensible.

---

# 2. Contexto comercial

SugApp está dejando de ser una landing que enumera capacidades y pasa a convertirse en una marca preparada para ofrecer soluciones reales.

La prioridad inmediata es:

> Terminar una landing comercial convincente para comenzar a ofrecer servicios y validar la propuesta con clientes reales.

SugApp trabaja principalmente para:

- pequeños y medianos negocios;
- comercios;
- profesionales;
- estudios;
- prestadores de servicios;
- emprendimientos;
- operaciones locales que todavía dependen de WhatsApp, planillas, papeles o herramientas dispersas.

SugApp no debe presentarse como:

- una agencia grande;
- una software factory corporativa;
- una empresa ficticia con muchos empleados;
- una empresa especializada exclusivamente en inteligencia artificial;
- una marca que pretende resolver cualquier cosa sin límites;
- una colección de tecnologías;
- un portfolio de estudiante;
- una plantilla SaaS genérica.

Debe sentirse como:

- un estudio tecnológico independiente;
- un taller digital;
- una marca pequeña pero seria;
- una propuesta cercana y profesional;
- alguien que primero entiende cómo trabaja el negocio;
- alguien capaz de construir una solución inicial y acompañar su evolución.

Principio comercial central:

> SugApp no vende tecnología por sí misma. Moderniza tareas, procesos y formas de trabajar mediante soluciones digitales claras.

---

# 3. Evidencia de mercado que fundamenta la actualización

La investigación inicial de competencia argentina analizó 16 proveedores.

Hallazgos relevantes:

- integraciones, automatización, dashboards e IA aparecen con mucha frecuencia;
- “software a medida”, “IA” y “automatización” están saturados como mensajes genéricos;
- catálogo digital aparece explícitamente en solo 2 de 16 empresas;
- turnos aparece en 6 de 16 y suele estar escondido dentro de servicios amplios;
- 12 de 16 empresas no publican precios;
- los precios públicos se concentran en productos delimitados o SaaS;
- 14 de 16 competidores conducen a una conversación, diagnóstico, llamada o demo;
- las empresas generan mayor confianza cuando muestran procesos, casos, alcance, soporte y problemas concretos;
- la especialización por industria ayuda a que el visitante se reconozca;
- la IA suele comunicarse mejor cuando está vinculada a un proceso real, no como producto abstracto.

No muestres estas estadísticas en la web pública.

Usalas como criterio de diseño:

- pocos productos claros;
- problemas antes que tecnologías;
- industrias como vía de entrada;
- demos o experiencias concretas;
- soluciones adaptables;
- conversación guiada;
- transparencia de alcance;
- capacidad de empezar de forma simple y crecer después.

---

# 4. Objetivo de la nueva versión

La home debe seguir siendo breve.

No debe intentar explicar cada producto, cada industria y cada posibilidad en una sola página.

Debe cumplir cinco funciones:

1. hacer que el visitante se sienta identificado;
2. explicar rápidamente qué clase de ayuda ofrece SugApp;
3. presentar una oferta comercial ordenada;
4. permitir explorar soluciones o industrias sin llenar la home de texto;
5. conducir a una conversación útil.

La nueva arquitectura será:

```text
Home breve
    ↓
Soluciones específicas
    ↓
Industrias
    ↓
Experiencias o demos
    ↓
Orientación guiada
    ↓
Contacto
```

La home actúa como puerta de entrada.

El detalle vive en:

- páginas HTML de soluciones;
- paneles contextuales de industrias;
- experiencias interactivas;
- conversación guiada;
- futuros casos de estudio.

---

# 5. Oferta comercial inicial

Debe distinguirse entre **productos vendibles** y **familias narrativas**.

## 5.1. Productos comerciales iniciales

Estos son los productos que deben estructurar las páginas internas:

1. Landing profesional.
2. Sitio web institucional.
3. Catálogo digital con pedidos o consultas por WhatsApp.
4. Sistema de turnos y reservas.
5. Automatizaciones.
6. Software a medida.

Además existe un servicio transversal:

7. Mantenimiento y evolución.

No inventes funciones, integraciones, casos ni disponibilidad.

Si una solución todavía no posee una implementación o demo suficientemente sólida:

- presentala con prudencia;
- no afirmes que ya fue entregada a clientes;
- no fabriques capturas;
- no publiques métricas ficticias;
- podés indicarla como solución bajo consulta o experiencia en desarrollo;
- mantené el lenguaje centrado en posibilidades reales.

## 5.2. Familias visibles en la home

Los productos deben organizarse en seis familias:

### Presencia Digital

- Landing profesional.
- Sitio web institucional.

### Ventas Digitales

- Catálogo digital.
- Pedidos o consultas por WhatsApp.
- E-commerce como evolución o proyecto bajo consulta, no como promesa automática.

### Gestión del Negocio

- Turnos y reservas.
- Paneles administrativos.
- Futuras soluciones de stock, ventas y reportes.

No presentes un ERP integral como producto disponible.

### Automatización de Procesos

- Formularios.
- Notificaciones.
- Integración con planillas.
- Flujos de WhatsApp.
- Registro de información.
- Procesos repetitivos.
- IA solo cuando aporte valor concreto.

### Soluciones a Medida

- Herramientas internas.
- Sistemas específicos.
- Paneles.
- Integraciones.
- Productos que no encajan en un paquete existente.

### Mantenimiento y Evolución

- Correcciones.
- Optimización.
- Nuevas funciones.
- Acompañamiento.
- Mejoras progresivas.
- Soporte sobre soluciones existentes cuando el proyecto pueda mantenerse responsablemente.

---

# 6. Principio de adaptabilidad

La landing debe comunicar explícitamente que las soluciones no son paquetes rígidos.

No usar frases como:

> “Podemos sacar cosas para que sea más barato.”

Eso devalúa la percepción.

Comunicarlo así:

## Copy principal recomendado

> **Empezá con lo necesario. Sumá cuando tenga sentido.**

Texto de apoyo:

> Cada solución puede ajustarse al alcance, la operación y el presupuesto del negocio. Podemos construir una primera versión concreta, combinar servicios y ampliarla después sin obligarte a pagar desde el inicio por funciones que todavía no necesitás.

Versión corta para páginas internas:

> **Alcance adaptable: empezá con lo esencial y evolucioná sin reconstruir todo desde cero.**

Esta idea debe sentirse como una ventaja:

- modularidad;
- inversión controlada;
- crecimiento progresivo;
- solución adaptada;
- posibilidad de combinar productos;
- menor complejidad inicial.

No debe convertirse en una promesa de precios extremadamente bajos ni de trabajo ilimitado.

---

# 7. Estructura global de la home

La estructura objetivo es:

```text
1. Intro SugApp
2. Header
3. Hero
4. Burbujas o mensajes de necesidades reales
5. Familias de soluciones
6. Experiencias visuales
7. Adaptabilidad
8. Evidencia o proyectos reales
9. Contacto
10. Footer
```

El orientador interactivo no necesita ocupar una sección larga. Debe poder abrirse desde el hero, el header o un launcher discreto.

Las industrias viven principalmente en el header y en un panel contextual. No deben generar una sección extensa que alargue innecesariamente la home.

El proceso de trabajo, si se conserva, debe comprimirse. No dedicar una sección enorme a explicarlo.

Formato sugerido:

```text
Entender → Definir → Construir → Evolucionar
```

Puede integrarse dentro de la sección final, las páginas de producto o el contacto.

---

# 8. Intro minimalista

Preservar la introducción inicial de SugApp si ya existe.

Comportamiento deseado:

- fondo limpio;
- palabra “SugApp” centrada;
- aparición breve;
- desaparición mediante fade, blur o transición elegante;
- sin esperar demasiado;
- no bloquear repetidamente al usuario durante la misma navegación;
- respetar `prefers-reduced-motion`;
- no agregar frases, slogans ni objetos decorativos durante la intro.

La intro debe sentirse como una firma, no como una pantalla de carga.

---

# 9. Header y navegación

## 9.1. Navegación principal

Usar una navegación compacta:

```text
SugApp
Soluciones
Industrias
Experiencias
Proyectos
Contacto
```

Podrá existir un CTA discreto en el extremo derecho:

```text
Contar mi caso
```

No convertir el header en una barra llena de botones.

## 9.2. Mega menú de Soluciones

Debe inspirarse en la claridad del ejemplo de competencia compartido, pero no copiar su diseño, colores ni composición exacta.

En escritorio debe sentirse editorial, institucional y ordenado.

Estructura recomendada:

### Presencia Digital

- Landing profesional.
- Sitio institucional.

### Ventas Digitales

- Catálogo digital.
- Pedidos por WhatsApp.

### Gestión

- Turnos y reservas.
- Gestión comercial, si existe una demo real.
- Paneles internos.

### Más soluciones

- Automatización.
- Software a medida.
- Mantenimiento y evolución.

Agregar una columna final de orientación:

> **¿No sabés cuál te conviene?**  
> Contanos cómo trabajás y te ayudamos a encontrar un primer paso.

CTA:

```text
Usar el orientador
```

## 9.3. Mega menú de Industrias

Priorizar rubros cercanos y comprensibles para el mercado local.

### Comercios

- Kioscos y despensas.
- Ferreterías y corralones.
- Dietéticas.
- Indumentaria.
- Librerías y papelerías.
- Comercios minoristas.

### Servicios y profesionales

- Inmobiliarias.
- Peluquerías.
- Profesionales y estudios.
- Psicología y salud.
- Gimnasios.
- Alojamientos y turismo.

### Operaciones

- Gastronomía y rotiserías.
- Distribuidoras y mayoristas.
- Agro y actividades rurales.

Columna final:

> **¿Tu actividad no aparece?**  
> Podemos analizar cómo trabajás y diseñar una solución adaptada.

CTA:

```text
Contar mi caso
```

## 9.4. Comportamiento

En escritorio:

- apertura por clic;
- opcionalmente apertura por hover con demora breve;
- el clic siempre debe funcionar;
- cierre al hacer clic fuera;
- cierre con `Escape`;
- foco correctamente administrado;
- sin parpadeos al mover el cursor;
- no cubrir de forma torpe toda la pantalla;
- no desbordar el viewport.

En mobile:

- menú lateral o desplegable de pantalla completa;
- Soluciones e Industrias funcionan como acordeones;
- enlaces táctiles amplios;
- no depender de hover;
- scroll interno solo si es necesario;
- cierre claro;
- conservar el foco y la accesibilidad.

---

# 10. Hero

El hero actual representa a SugApp y debe conservar su identidad general.

No lo reemplaces por una composición genérica.

No usar en el hero imágenes ligadas a Solitario Hunting.

No agregar dos o tres CTAs compitiendo.

## 10.1. Copy recomendado

Eyebrow opcional:

> Soluciones digitales para comercios, profesionales y PyMEs.

Título principal:

> **Modernizá tu forma de trabajar.**

Subtítulo:

> **Desde eso que hoy te quita tiempo hasta lo que está frenando el próximo paso de tu negocio.**

Puede agregarse una línea explicativa secundaria solo si es visualmente necesaria:

> Creamos páginas, sistemas y herramientas digitales adaptadas a la forma en que trabajás.

No usar las tres frases si producen redundancia. Priorizá jerarquía y aire.

## 10.2. Acción principal

Eliminar el botón de contacto del hero.

Mantener una sola acción:

```text
Explorar soluciones
```

Debe conducir a la sección de familias.

Puede tener:

- flecha descendente;
- subrayado animado;
- línea vertical;
- movimiento breve y suave;
- cambio de opacidad;
- microinteracción al pasar el cursor.

No usar un botón genérico excesivamente grande.

## 10.3. Indicador de continuidad

Hacer evidente que existe más contenido debajo.

Puede resolverse mediante:

- flechas discretas;
- una línea que desciende;
- una etiqueta “Seguí explorando”;
- un indicador que reacciona al scroll;
- una animación suave que no distraiga.

Debe desaparecer o transformarse cuando el visitante empieza a desplazarse.

Debe respetar `prefers-reduced-motion`.

## 10.4. Orientador desde el hero

Agregar un acceso secundario no invasivo:

> ¿No sabés por dónde empezar?

Al activarlo abre el Orientador SugApp.

No presentarlo como un chatbot omnisciente.

---

# 11. Burbujas de WhatsApp y necesidades

Esta parte es identitaria y debe preservarse.

No convertirla en una lista estática de problemas.

Mantener:

- movimiento horizontal o desplazamiento interactivo;
- sensación de mensajes reales;
- lenguaje cotidiano;
- diversidad de necesidades;
- respuesta al cursor o al scroll;
- buena adaptación a mobile.

Mejoras permitidas:

- ajustar velocidad;
- reducir ruido;
- mejorar legibilidad;
- agregar pausa al hover o foco;
- evitar mareo;
- permitir interacción con teclado;
- corregir solapamientos;
- mejorar el loop;
- respetar movimiento reducido.

La sección debe contar esta parte de la historia:

```text
El visitante expresa un problema
    ↓
SugApp lo interpreta
    ↓
Existe una solución o un primer paso posible
```

Copy de transición recomendado:

> **Detrás de cada mensaje hay algo que puede simplificarse.**

Desde esa frase debe surgir naturalmente la sección institucional de soluciones.

---

# 12. Sección institucional de soluciones

Esta es la sección comercial central.

Debe sentirse:

- institucional;
- ordenada;
- sobria;
- clara;
- confiable;
- integrada al lenguaje global;
- menos lúdica que las burbujas;
- más concreta que el hero.

## 12.1. Encabezado

Título:

> **Soluciones para cada etapa de tu negocio.**

Texto:

> Podés empezar por algo puntual y hacerlo crecer con el tiempo. Cada solución se adapta a lo que realmente necesitás.

## 12.2. Formato visual

No usar una grilla convencional de seis cards idénticas.

Preferir:

- acordeón editorial;
- lista de gran formato;
- paneles horizontales;
- filas que se expanden;
- índices tipográficos;
- división clara por jerarquías.

Las tres primeras familias deben tener mayor protagonismo:

1. Presencia Digital.
2. Ventas Digitales.
3. Gestión del Negocio.

Las otras tres pueden funcionar como segunda capa:

4. Automatización de Procesos.
5. Soluciones a Medida.
6. Mantenimiento y Evolución.

Cada familia cerrada debe mostrar solo:

- índice;
- nombre;
- una frase breve;
- indicador de expansión.

Al abrirse:

- productos incluidos;
- explicación de dos o tres líneas;
- enlace a páginas internas;
- acceso a una experiencia cuando exista;
- CTA de consulta únicamente cuando sea útil.

No llenar cada panel con párrafos largos.

## 12.3. Contenido sugerido

### Presencia Digital

Frase:

> Una presencia profesional para que te encuentren, entiendan lo que ofrecés y puedan contactarte con facilidad.

Productos:

- Landing profesional.
- Sitio institucional.

### Ventas Digitales

Frase:

> Mostrá productos, recibí consultas o pedidos y empezá a vender online sin sumar complejidad innecesaria.

Productos:

- Catálogo digital.
- Pedidos por WhatsApp.
- Evolución a tienda cuando el negocio lo requiera.

### Gestión del Negocio

Frase:

> Ordená turnos, información y tareas internas con herramientas construidas alrededor de tu operación.

Productos:

- Turnos y reservas.
- Paneles internos.
- Gestión comercial modular, solo si existe capacidad demostrable.

### Automatización de Procesos

Frase:

> Reducí cargas manuales, pasos repetidos y errores conectando las herramientas que ya usás.

Productos o ejemplos:

- Formularios y registros.
- Avisos y recordatorios.
- Planillas.
- WhatsApp.
- Procesamiento de información.
- IA aplicada a una tarea concreta.

### Soluciones a Medida

Frase:

> Cuando el problema no encaja en un paquete, diseñamos una solución alrededor de tu forma de trabajar.

Productos:

- Sistemas internos.
- Integraciones.
- Paneles específicos.
- Primeras versiones de productos.

### Mantenimiento y Evolución

Frase:

> Una solución útil no termina al publicarse: puede corregirse, mejorarse y crecer junto al negocio.

Servicios:

- Correcciones.
- Optimización.
- Nuevas funciones.
- Acompañamiento.
- Soporte.

---

# 13. Páginas HTML de soluciones

La home debe conducir a páginas internas compactas.

Crear páginas independientes para:

```text
soluciones/landing-profesional.html
soluciones/sitio-institucional.html
soluciones/catalogo-digital.html
soluciones/turnos-reservas.html
soluciones/automatizaciones.html
soluciones/software-a-medida.html
soluciones/mantenimiento-evolucion.html
```

Si la estructura actual utiliza otra convención de rutas, adaptala de manera coherente.

Todas deben compartir:

- header;
- footer;
- estilos;
- navegación;
- componentes;
- lenguaje visual;
- scripts comunes;
- accesibilidad;
- responsive;
- SEO individual.

No crear siete diseños diferentes.

## 13.1. Estructura de cada página

### Hero breve

Debe hablar del resultado.

### Problema que resuelve

Dos o tres problemas claros.

### Qué puede incluir

Lista modular y realista.

### Empezá con lo necesario

Explicar alcance adaptable.

### Ideal para

Industrias o perfiles relacionados.

### Cómo puede evolucionar

Una progresión simple, no una promesa contractual.

### Experiencia o demo

Solo cuando exista material real.

### CTA

- Contar mi caso.
- Ver experiencia.
- Volver a soluciones.

## 13.2. Contenido base por producto

### Landing profesional

Resultado:

> Presentá una propuesta clara, generá confianza y convertí visitas en consultas.

Puede incluir:

- estructura de una página;
- diseño responsive;
- copy y jerarquía;
- WhatsApp o formulario;
- SEO técnico básico;
- analítica preparada;
- publicación;
- mantenimiento opcional.

No prometer posicionamiento garantizado.

### Sitio institucional

Resultado:

> Organizá la información de tu empresa en una presencia profesional que pueda crecer.

Puede incluir:

- varias secciones o páginas;
- servicios;
- empresa;
- proyectos;
- galería;
- contacto;
- contenido administrable bajo alcance;
- SEO técnico básico;
- mantenimiento.

### Catálogo digital

Resultado:

> Mostrá productos y recibí pedidos o consultas sin asumir desde el inicio la complejidad de un e-commerce completo.

Puede incluir:

- categorías;
- buscador;
- productos;
- imágenes;
- detalle;
- carrito o selección;
- generación del pedido;
- envío a WhatsApp;
- adaptación visual;
- futuro panel o stock como evolución.

No afirmar que procesa pagos si no está implementado.

### Turnos y reservas

Resultado:

> Permití que tus clientes consulten disponibilidad y reserven sin coordinar cada turno manualmente.

Puede incluir:

- servicios;
- horarios;
- disponibilidad;
- datos del cliente;
- confirmación;
- panel;
- recordatorios como módulo;
- cancelación o reprogramación según alcance.

### Automatizaciones

Resultado:

> Evitá cargar, copiar o avisar lo mismo una y otra vez.

Ejemplos:

- formulario a planilla;
- pedido a registro;
- aviso automático;
- procesamiento de PDF o datos;
- resumen o reporte;
- integración con una herramienta existente.

No vender “IA” como explicación suficiente.

### Software a medida

Resultado:

> Diseñá una herramienta alrededor de tu operación cuando una solución genérica no alcanza.

Debe dejar claro:

- requiere diagnóstico;
- el alcance se define por etapas;
- no existe precio universal;
- puede comenzar con una primera versión;
- la propiedad, mantenimiento e infraestructura se acuerdan.

### Mantenimiento y evolución

Resultado:

> Corregí, optimizá o ampliá una solución sin esperar a que quede obsoleta.

Puede incluir:

- mantenimiento correctivo;
- mejoras;
- nuevas funciones;
- optimización;
- revisión;
- soporte;
- bolsa de horas o mensualidad futura, sin publicar un modelo no definido.

---

# 14. Experiencias visuales

No usar una grilla típica de cards de demos.

Implementar una sección de experiencias con tres conjuntos visuales apilados.

Título sugerido:

> **Experiencias para explorar.**

Texto:

> No alcanza con explicar una idea. Algunas soluciones se entienden mejor cuando podés recorrerlas.

## 14.1. Conjuntos

### Presencia

Puede mostrar:

- landing;
- sitio institucional;
- vista mobile.

### Ventas

Puede mostrar:

- catálogo;
- categorías;
- pedido por WhatsApp;
- resumen del pedido.

### Gestión

Puede mostrar, solo con material real:

- turnos;
- stock;
- panel;
- reportes.

## 14.2. Interacción

En escritorio:

- las vistas parecen fotografías o interfaces apiladas;
- se separan al hacer hover o focus;
- una tarjeta toma protagonismo;
- aparece el nombre;
- existe una acción clara para abrir la experiencia;
- no usar transformaciones exageradas;
- evitar que el contenido salga del viewport.

En mobile:

- tap para expandir;
- control para avanzar;
- swipe solo si se implementa de manera robusta;
- no depender de hover;
- conservar botones visibles;
- sin carruseles imposibles de controlar.

## 14.3. Fuente de las imágenes

Prioridad:

1. capturas reales existentes;
2. fragmentos reales del proyecto;
3. previews construidos con HTML y CSS a partir de interfaces reales;
4. placeholders claramente identificados como experiencia en preparación.

No fabricar clientes, resultados ni capturas engañosas.

No usar mockups genéricos de bancos de imágenes.

## 14.4. Relación con productos

Cada experiencia debe indicar la familia a la que pertenece.

Ejemplo:

```text
Ventas Digitales
Catálogo y pedidos
Abrir experiencia
```

No repetir “Ver demo” en toda la página sin contexto.

---

# 15. Orientador SugApp

Construir un orientador interactivo pequeño y enfocado.

Su propósito es:

- interpretar la necesidad inicial;
- realizar preguntas simples;
- recomendar un camino;
- demostrar capacidad de construir herramientas inteligentes;
- ayudar al visitante que todavía no sabe nombrar una solución;
- permitir que quien solo investiga continúe explorando sin presión.

## 15.1. Posicionamiento

No presentarlo como una inteligencia artificial general.

Nombre recomendado:

```text
Orientador SugApp
```

Copy:

> **¿No sabés qué necesitás todavía? Contame cómo trabajás.**

## 15.2. Implementación inicial

La landing es estática y se publica en GitHub Pages.

Por lo tanto:

- no exponer claves de API;
- no guardar secretos en frontend;
- no conectar un modelo externo directamente desde el navegador;
- no crear un backend improvisado;
- no simular una IA omnisciente.

Implementar una primera versión funcional mediante:

- árbol de decisión;
- máquina de estados;
- reglas declarativas;
- respuestas breves;
- datos centralizados;
- arquitectura preparada para sustituir el motor por una API segura en el futuro.

Puede describirse públicamente como:

- orientador;
- guía interactiva;
- asistente de soluciones.

No afirmar que usa IA si la versión implementada no la usa realmente.

## 15.3. Flujo recomendado

Pregunta 1:

> ¿Qué tipo de actividad tenés?

Opciones:

- Comercio.
- Servicios.
- Profesional o estudio.
- Operación o distribución.
- Estoy desarrollando una idea.
- Solo estoy mirando.

Pregunta 2:

> ¿Qué te gustaría mejorar primero?

Opciones:

- Que me encuentren y contacten.
- Mostrar productos o vender.
- Organizar turnos o tareas.
- Ahorrar trabajo manual.
- Necesito algo específico.
- No estoy seguro.

Pregunta 3:

> ¿Cómo lo resolvés hoy?

Opciones contextuales:

- WhatsApp.
- Papeles.
- Planillas.
- Una web desactualizada.
- Varias herramientas separadas.
- Todavía no lo hago.
- Otro.

Pregunta 4:

> ¿Cómo preferís empezar?

Opciones:

- Con una versión simple.
- Con una solución más completa.
- Quiero comparar opciones.
- Solo quiero explorar.

## 15.4. Resultado

Ejemplo:

> Por lo que contás, podrías empezar con un catálogo digital y pedidos por WhatsApp. Es más simple que una tienda completa y puede ampliarse después con stock, clientes o pagos.

Acciones:

- Ver esta solución.
- Explorar una experiencia.
- Contar mi caso.
- Volver a empezar.

## 15.5. Comportamiento

- abrir desde hero y mega menú;
- panel lateral, modal o ventana integrada;
- no ocupar todo el viewport en desktop sin necesidad;
- foco atrapado;
- cerrar con Escape;
- conservar progreso mientras permanece abierto;
- reiniciar al cerrar solo si resulta más claro;
- no enviar información a servicios externos;
- no solicitar datos sensibles;
- no generar respuestas largas;
- no bloquear la navegación.

---

# 16. Industrias

Las industrias deben ayudar al visitante a responder:

> “¿Esto sirve para un negocio como el mío?”

No crear en esta etapa quince páginas SEO completas.

Implementar un mega menú y un panel contextual reutilizable.

## 16.1. Comportamiento inicial

Al seleccionar una industria:

- abrir un modal, drawer o panel amplio;
- actualizar el hash o un estado compartible cuando sea práctico;
- mostrar contenido específico;
- permitir ir a soluciones relacionadas;
- permitir abrir el orientador;
- permitir contacto;
- cerrar y volver al contexto anterior.

## 16.2. Estructura del panel

Ejemplo:

```text
Soluciones para corralones y ferreterías

Una explicación breve centrada en problemas reales.

Qué se podría mejorar:
- Consulta de productos.
- Presupuestos.
- Pedidos.
- Stock.
- Información dispersa.

Soluciones relacionadas:
- Sitio institucional.
- Catálogo digital.
- Gestión comercial.
- Software a medida.

Formas de comenzar:
- Presencia y catálogo.
- Catálogo más gestión.
- Proyecto adaptado.

[Ver catálogo digital]
[Contar mi caso]
```

El lenguaje debe usar:

- “podríamos ayudarte con”;
- “una solución posible”;
- “según el alcance”;
- “puede comenzar por”.

No afirmar que existe una implementación vertical terminada cuando no existe.

## 16.3. Industrias iniciales y enfoque

### Kioscos y comercios

Problemas:

- precios y productos dispersos;
- pedidos por mensajes;
- stock poco visible;
- ventas sin reportes.

Soluciones posibles:

- catálogo;
- pedidos;
- stock;
- ventas;
- reportes;
- panel.

### Ferreterías y corralones

Problemas:

- muchos productos;
- consultas repetidas;
- presupuestos;
- información de stock;
- pedidos.

Soluciones posibles:

- sitio institucional;
- catálogo;
- solicitud de presupuesto;
- pedidos por WhatsApp;
- stock;
- proveedores como evolución.

### Gastronomía y rotiserías

Problemas:

- menú cambiante;
- pedidos desordenados;
- retiro o envío;
- disponibilidad.

Soluciones posibles:

- menú o catálogo;
- pedidos;
- WhatsApp;
- turnos de retiro;
- gestión simple.

### Inmobiliarias

Problemas:

- propiedades desactualizadas;
- dependencia del desarrollador para cada cambio;
- fotos y datos difíciles de gestionar;
- consultas sin seguimiento.

Soluciones posibles:

- sitio premium;
- propiedades;
- filtros;
- panel autoadministrable;
- estados;
- formularios;
- WhatsApp;
- SEO por propiedad como evolución.

### Peluquerías

Problemas:

- coordinación manual;
- huecos en agenda;
- recordatorios;
- consultas repetidas.

Soluciones posibles:

- landing;
- turnos;
- servicios;
- recordatorios;
- panel de agenda.

### Profesionales y estudios

Problemas:

- poca presencia;
- consultas desordenadas;
- formularios;
- agenda;
- documentos o información dispersa.

Soluciones posibles:

- sitio;
- landing;
- turnos;
- formularios;
- automatización;
- portales bajo consulta.

### Alojamientos y turismo

Problemas:

- presentación visual;
- consultas internacionales;
- disponibilidad;
- reservas.

Soluciones posibles:

- sitio;
- galería;
- consulta de reserva;
- contenido bilingüe bajo alcance;
- automatización de respuestas.

### Distribuidoras y mayoristas

Problemas:

- catálogos extensos;
- pedidos recurrentes;
- clientes;
- stock;
- compras.

Soluciones posibles:

- catálogo;
- pedidos;
- panel;
- stock;
- clientes;
- órdenes de compra como evolución.

## 16.4. Arquitectura futura

Centralizar los contenidos en un objeto o archivo de datos.

Ejemplo conceptual:

```js
const industries = {
  corralones: {
    title: "...",
    summary: "...",
    problems: [],
    solutions: [],
    paths: []
  }
};
```

Esto permitirá convertir más adelante industrias prioritarias en páginas:

```text
industrias/corralones.html
industrias/inmobiliarias.html
industrias/kioscos.html
```

No construir esas páginas ahora salvo que la arquitectura actual lo vuelva trivial y no retrase el objetivo principal.

---

# 17. Proyectos y evidencia

Mantener únicamente proyectos reales.

No inventar:

- clientes;
- testimonios;
- métricas;
- logos;
- casos;
- resultados;
- años de experiencia.

La sección debe ser compacta.

Puede mostrar:

- producto propio;
- demo funcional;
- sistema de pedidos;
- landing o sitio desarrollado;
- proyecto real disponible en el repositorio.

Cada entrada debe explicar:

- qué problema aborda;
- qué se construyó;
- qué demuestra sobre SugApp;
- estado real.

No convertir esta sección en un portfolio enorme.

Si Solitario Hunting permanece, debe presentarse como evidencia técnica o producto propio y no dominar el posicionamiento comercial.

No usar imágenes de Solitario en el hero.

---

# 18. Contacto

Mantener el tono actual:

> **Contame qué necesitás mejorar.**

Texto:

> No hace falta llegar con una solución definida. Podemos empezar por entender el problema y encontrar un primer paso posible.

Puede incluir accesos rápidos:

- Necesito una web.
- Quiero mostrar o vender productos.
- Quiero ordenar mi trabajo.
- Quiero automatizar.
- Necesito algo específico.

El formulario debe:

- ser corto;
- tener etiquetas visibles;
- validar;
- permitir elegir una solución;
- permitir incluir la recomendación del orientador;
- preparar un mensaje útil;
- no perder datos al cometer un error;
- evitar campos innecesarios.

No inventar un correo o número de WhatsApp.

Centralizar datos de contacto en una configuración sencilla.

Si todavía faltan datos definitivos:

- conservar un fallback claro;
- documentar exactamente dónde configurarlos;
- no dejar botones rotos;
- no publicar promesas como “te respondemos en 5 minutos”.

---

# 19. Dirección visual

Preservar la dirección “taller digital”:

- grafito;
- hueso o blanco cálido;
- acento sobrio;
- grilla;
- líneas;
- piezas ensambladas;
- sensación técnica sin parecer una terminal;
- tipografía clara;
- detalles monoespaciados con moderación.

La sección de soluciones debe sentirse institucional.

Las experiencias pueden ser más dinámicas.

Las burbujas conservan el tono humano.

El orientador debe sentirse como una herramienta de la misma marca, no como un widget externo.

## Evitar

- degradados violeta/azul de SaaS;
- neón;
- glassmorphism excesivo;
- blobs;
- partículas;
- esferas 3D genéricas;
- iconos enormes;
- cards repetidas por todas partes;
- sombras pesadas;
- texto centrado en todas las secciones;
- animaciones en cada elemento;
- cursores personalizados;
- carruseles sin control;
- estética de plantilla;
- exceso de emojis;
- aspecto de “agencia IA”.

Principio:

> Cada interacción debe ayudar a comprender, explorar o avanzar.

---

# 20. Movimiento e interacción

Mantener movimiento con propósito.

Puede usarse para:

- intro;
- indicador de scroll;
- burbujas;
- acordeón;
- mega menús;
- separación de experiencias;
- apertura del orientador;
- panel de industrias;
- transiciones entre estados.

Requisitos:

- animaciones cortas;
- easing natural;
- sin retrasar contenido;
- sin saltos de layout;
- sin pérdida de foco;
- respetar `prefers-reduced-motion`;
- evitar scroll hijacking;
- no bloquear el scroll;
- no forzar autoplay agresivo;
- mantener buen rendimiento en teléfonos medios.

---

# 21. Responsive

Validar como mínimo:

```text
390 px
768 px
1440 px
```

También revisar anchos intermedios.

## Mobile

- header usable;
- acordeones cómodos;
- mega menú convertido en navegación mobile;
- burbujas legibles;
- experiencias controlables por tap;
- modales sin cortar contenido;
- inputs sin overflow;
- botones con tamaño táctil;
- texto sin líneas excesivamente largas;
- sin scroll horizontal accidental.

## Desktop

- ancho de lectura razonable;
- mega menús alineados;
- experiencia apilada con suficiente espacio;
- header integrado;
- no llenar toda la pantalla con bloques innecesarios;
- conservar ritmo editorial.

---

# 22. Accesibilidad

Requisitos mínimos:

- HTML semántico;
- jerarquía correcta de encabezados;
- enlace para saltar al contenido;
- foco visible;
- navegación completa con teclado;
- botones reales para acciones;
- enlaces reales para navegación;
- `aria-expanded` en acordeones y menús;
- `aria-controls` cuando corresponda;
- modales con nombre accesible;
- foco atrapado en modales;
- retorno del foco al cerrar;
- cierre con Escape;
- textos alternativos reales;
- contraste suficiente;
- mensajes dinámicos con `aria-live`;
- movimiento reducido;
- formularios etiquetados;
- errores comprensibles.

No resolver accesibilidad agregando ARIA incorrecta sobre elementos genéricos.

---

# 23. Arquitectura técnica

Priorizar la arquitectura actual del proyecto.

Si continúa siendo HTML, CSS y JavaScript sin build, conservar ese enfoque.

No migrar a React, Next, Astro o un framework sin una necesidad real.

La web debe seguir publicándose fácilmente en GitHub Pages.

Separar responsabilidades cuando la complejidad lo justifique.

Estructura orientativa:

```text
index.html

soluciones/
├── landing-profesional.html
├── sitio-institucional.html
├── catalogo-digital.html
├── turnos-reservas.html
├── automatizaciones.html
├── software-a-medida.html
└── mantenimiento-evolucion.html

css/
├── styles.css
└── pages.css

js/
├── main.js
├── navigation.js
├── industries.js
├── assistant.js
├── experiences.js
└── data/
    ├── industries.js
    └── solutions.js

assets/
├── images/
└── icons/

README.md
CHANGELOG.md
```

No copies esta estructura si genera fragmentación artificial.

Podés mantener menos archivos si cada uno sigue siendo comprensible.

No crear:

- `final.js`;
- `new-final.js`;
- `styles2.css`;
- archivos duplicados;
- código muerto;
- comentarios que contradicen el comportamiento.

## JavaScript

- usar módulos cuando resulte coherente;
- manejar fallos;
- no depender de clases CSS frágiles;
- centralizar datos repetidos;
- no mezclar contenido, estado y manipulación sin necesidad;
- no usar librerías para interacciones que pueden resolverse con JavaScript nativo;
- evitar listeners duplicados;
- no dejar errores en consola.

## CSS

- reutilizar variables;
- conservar sistema de espaciado;
- componentes consistentes;
- no acumular excepciones;
- eliminar estilos obsoletos;
- evitar especificidad excesiva;
- asegurar estados hover, focus, expanded y disabled;
- mantener diseño responsive sin hacks puntuales.

---

# 24. SEO base

La oferta ya tiene suficiente definición para incorporar una base SEO correcta.

Implementar:

- `title` único por página;
- `meta description` única;
- canonical;
- Open Graph;
- rutas internas correctas;
- navegación cruzada entre productos e industrias;
- `sitemap.xml`;
- `robots.txt`;
- idioma `es-AR`;
- headings coherentes;
- texto visible útil;
- enlaces descriptivos;
- nombres de archivo claros;
- imágenes con tamaño y texto alternativo.

No:

- repetir palabras clave;
- crear párrafos largos solo para SEO;
- inventar ubicación o dirección;
- inventar reseñas;
- publicar schemas con datos no confirmados;
- prometer rankings.

Si se agrega JSON-LD, utilizar únicamente datos verificables.

---

# 25. Rendimiento

- no agregar videos pesados sin necesidad;
- optimizar imágenes;
- usar dimensiones explícitas;
- lazy load fuera del primer viewport;
- evitar dependencias grandes;
- evitar fuentes innecesarias;
- no descargar icon libraries completas;
- minimizar trabajo durante scroll;
- no crear loops de animación permanentes cuando CSS sea suficiente;
- evitar layout shifts;
- mantener carga razonable en redes móviles.

No sacrificar mantenibilidad por una puntuación artificial.

---

# 26. Precios

No publicar precios definitivos en esta tarea.

La investigación encontró referencias, pero todavía no existe una política final para cada producto.

No inventar:

- precio desde;
- mensualidad;
- costos de hosting;
- mantenimiento;
- descuentos;
- plazos contractuales.

Preparar, si resulta útil, una estructura de datos o componente que pueda mostrar en el futuro:

- precio desde;
- plazo;
- incluye;
- no incluye.

Debe permanecer oculto o sin valor visible mientras no exista una decisión humana confirmada.

---

# 27. Futuro producto de gestión — dirección, no implementación

Después de publicar la landing, una prioridad probable será desarrollar un producto de gestión modular para comercios.

No implementarlo en esta tarea.

La landing debe dejar preparada la narrativa para esa evolución.

Núcleo futuro posible:

- productos;
- categorías;
- stock;
- ventas;
- métodos de pago;
- movimientos;
- usuarios;
- panel;
- reportes esenciales.

Módulos futuros:

- proveedores;
- compras;
- clientes;
- cuentas corrientes;
- múltiples sucursales;
- códigos de barras;
- pedidos;
- facturación;
- catálogo público.

Posicionamiento futuro:

> Lo necesario para ordenar un comercio, sin empezar por un sistema sobredimensionado.

Caso piloto posible:

- kiosco de un conocido;
- setup bonificado;
- costos e infraestructura cubiertos;
- mensualidad reducida;
- observación de uso;
- feedback;
- caso real.

No mostrar este acuerdo en la landing.

## Segunda vertical futura

Sitio inmobiliario premium autoadministrable:

- propiedades;
- fotos;
- filtros;
- estados;
- panel;
- formularios;
- WhatsApp;
- SEO por propiedad.

No construirlo ahora.

La sección de industrias debe permitir que ambas direcciones encajen posteriormente sin rehacer la navegación.

---

# 28. Qué preservar y qué transformar

## Preservar

- identidad visual actual;
- intro;
- hero como pieza principal;
- burbujas tipo WhatsApp;
- tono argentino y cercano;
- voseo;
- interacción;
- lenguaje centrado en problemas;
- publicación simple;
- código comprensible;
- contacto;
- proyectos reales;
- sobriedad.

## Transformar

- servicios genéricos en familias claras;
- home extensa o ambigua en home breve y navegable;
- botón de contacto del hero en exploración;
- “demos” repetidas en experiencias contextualizadas;
- lista de tecnologías en resultados;
- industrias abstractas en paneles específicos;
- adaptabilidad implícita en mensaje explícito;
- navegación simple en mega menús útiles;
- consultas difusas en orientador guiado.

## Eliminar o evitar

- secciones redundantes;
- texto genérico;
- afirmaciones que no pueden demostrarse;
- servicios que no pueden explicarse;
- elementos visuales sin función;
- CTA repetidos;
- enlaces muertos;
- placeholders públicos;
- contenido viejo que contradiga la nueva oferta;
- comentarios o documentación obsoleta.

---

# 29. Secuencia de implementación

Usá esta secuencia para reducir retrabajo.

## Fase A — Baseline

1. Inspeccionar archivos.
2. Ejecutar la landing.
3. Revisar 390, 768 y 1440 px.
4. Identificar intro, hero, burbujas, secciones, navegación y contacto.
5. Detectar código reutilizable.
6. Revisar enlaces, errores y assets.
7. Registrar un plan breve en el mecanismo existente del proyecto.

No detenerse.

## Fase B — Arquitectura y datos

1. Definir rutas de soluciones.
2. Centralizar datos de industrias.
3. Centralizar datos del orientador.
4. Definir componentes compartidos.
5. Ajustar navegación.

## Fase C — Home

1. Actualizar hero.
2. Implementar indicador de scroll.
3. Preservar y pulir burbujas.
4. Crear sección institucional.
5. Crear experiencias apiladas.
6. Incorporar adaptabilidad.
7. Compactar evidencia.
8. Ajustar contacto.
9. Integrar launcher del orientador.

## Fase D — Navegación avanzada

1. Mega menú Soluciones.
2. Mega menú Industrias.
3. Panel contextual.
4. Mobile navigation.
5. Teclado y foco.

## Fase E — Orientador

1. Flujo de preguntas.
2. Motor de reglas.
3. Recomendaciones.
4. Enlaces internos.
5. Transferencia al formulario.
6. Estados accesibles.

## Fase F — Páginas de solución

1. Crear plantilla.
2. Crear las siete páginas.
3. Completar copy realista.
4. Enlazar familias e industrias.
5. Metadatos.

## Fase G — Calidad

1. Responsive.
2. Accesibilidad.
3. enlaces.
4. rutas.
5. consola.
6. sintaxis.
7. performance.
8. reduced motion.
9. SEO técnico.
10. documentación.

---

# 30. Criterios de aceptación

La tarea se considera terminada cuando:

## Identidad

- la landing sigue siendo reconocible como la versión actual de SugApp;
- la intro se conserva;
- las burbujas se conservan y funcionan;
- no parece una plantilla nueva;
- no parece una agencia genérica.

## Hero

- tiene el nuevo enfoque cercano;
- existe una sola acción principal;
- el contacto no compite en el hero;
- el scroll es evidente;
- el orientador puede abrirse.

## Soluciones

- existen seis familias;
- se entienden en pocos segundos;
- las tres principales tienen mayor jerarquía;
- el contenido no alarga excesivamente la home;
- cada familia conduce a páginas o acciones reales.

## Páginas internas

- existen las rutas definidas;
- comparten diseño;
- tienen copy específico;
- son responsive;
- tienen SEO básico;
- no inventan datos.

## Industrias

- existe mega menú;
- existen industrias locales;
- cada industria abre contenido útil;
- recomienda soluciones;
- existe salida hacia contacto u orientación;
- el contenido es centralizado y mantenible.

## Experiencias

- no son una grilla genérica;
- usan composición apilada;
- funcionan con mouse, teclado y tap;
- solo muestran material real o claramente indicado;
- están conectadas con productos.

## Orientador

- funciona sin servicios externos;
- hace preguntas simples;
- recomienda soluciones;
- contempla “solo estoy mirando”;
- puede transferir contexto al contacto;
- no expone secretos;
- no finge capacidades.

## Adaptabilidad

- aparece el mensaje “Empezá con lo necesario. Sumá cuando tenga sentido” o una versión equivalente;
- se entiende que el alcance puede ajustarse;
- no suena a baja calidad ni a regateo.

## Calidad

- no hay errores en consola;
- no hay IDs duplicados;
- no hay rutas rotas;
- no hay scroll horizontal accidental;
- los menús funcionan con teclado;
- los modales gestionan foco;
- `prefers-reduced-motion` funciona;
- la web funciona en 390, 768 y 1440 px;
- GitHub Pages puede publicarla sin build complejo;
- documentación actualizada.

---

# 31. Validaciones esperadas

Ejecutar todas las validaciones disponibles.

Como mínimo:

- servidor local;
- revisión visual de las páginas;
- validación de sintaxis JavaScript;
- comprobación de enlaces internos;
- comprobación de assets;
- comprobación de IDs;
- búsqueda de errores de consola;
- pruebas de navegación por teclado;
- responsive;
- reduced motion;
- `git diff --check`.

Usar Playwright si está disponible y aporta valor.

No instalar una infraestructura de testing enorme para una landing estática.

Crear scripts de validación pequeños si ayudan a repetir comprobaciones.

---

# 32. Documentación

Actualizar:

- `README.md`;
- `CHANGELOG.md`, si existe;
- guía de estructura o configuración;
- canal de contacto pendiente;
- cómo ejecutar localmente;
- cómo agregar una industria;
- cómo agregar una solución;
- cómo modificar el orientador;
- cómo reemplazar una experiencia;
- cómo publicar.

No crear documentación innecesaria.

No modificar el SOM desde este proyecto.

Si aparece un aprendizaje generalizable, registrarlo como recomendación, no como cambio directo al SOM.

---

# 33. Restricciones

No:

- inventar información;
- usar claves en frontend;
- crear un backend externo sin autorización;
- iniciar sesión en servicios;
- cambiar la identidad principal;
- agregar dependencias innecesarias;
- migrar de stack por preferencia;
- publicar precios;
- llenar la web de texto;
- construir el sistema de stock ahora;
- construir quince páginas de industrias;
- fabricar testimonios;
- utilizar logos de clientes inexistentes;
- afirmar experiencia sectorial no demostrada;
- dejar el trabajo a mitad de camino;
- limitarse a entregar recomendaciones.

---

# 34. Autonomía

Podés tomar decisiones reversibles de diseño e implementación cuando:

- respeten este brief;
- preserven la identidad;
- simplifiquen;
- mejoren claridad;
- no inventen hechos;
- puedan justificarse.

No preguntes por detalles menores que puedan resolverse inspeccionando el repositorio.

Solo detenete si falta una decisión humana irreversible, como:

- datos de contacto reales;
- precio definitivo;
- identidad legal;
- publicación de información privada;
- uso de una API paga;
- eliminación de un activo importante sin reemplazo.

Cuando falte un dato de ese tipo:

- implementá la estructura;
- usá una configuración clara;
- documentá el pendiente;
- continuá con todo lo demás.

---

# 35. Entrega final de Codex

Al finalizar, informar:

1. baseline encontrado;
2. decisiones principales;
3. archivos creados;
4. archivos modificados;
5. secciones preservadas;
6. secciones reemplazadas;
7. páginas nuevas;
8. funcionamiento del mega menú;
9. funcionamiento de industrias;
10. funcionamiento del orientador;
11. experiencias implementadas;
12. validaciones realizadas;
13. pendientes humanos;
14. limitaciones reales;
15. comandos para ejecutar y validar;
16. próximos pasos recomendados.

No describas trabajo que no hayas realizado.

---

# 36. Resultado esperado

La versión final debe transmitir:

> SugApp entiende problemas cotidianos, propone un primer paso realista, construye soluciones adaptables y puede acompañar su evolución.

Un visitante debería poder comprender en menos de un minuto:

- qué hace SugApp;
- para quién trabaja;
- cuáles son sus soluciones principales;
- cómo se adaptan;
- qué podría servirle a su industria;
- dónde explorar;
- cómo pedir orientación;
- cómo iniciar una conversación.

La home debe quedar breve.

El ecosistema debe sentirse más grande que la home.

La experiencia debe quedar suficientemente pulida para acercar a SugApp a su publicación comercial y a la búsqueda de sus primeros clientes.
