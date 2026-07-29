const shared = {
  benefits: ["Menos pasos manuales", "Información más clara", "Una base preparada para crecer"],
  businessTypes: ["Profesionales", "Comercios", "Equipos de servicios", "Emprendimientos"],
  includes: ["Diseño adaptado al uso real", "Configuración inicial", "Acompañamiento para empezar"],
  scaling: ["Una primera versión útil", "Nuevas capacidades", "Conexiones con otras soluciones"]
};

const make = (family, slug, name, shortBenefit, visualType, extra = {}) => ({
  family, slug, name, shortBenefit, visualType,
  heroTitle: extra.heroTitle || `${name}, adaptado a la forma real de trabajar de tu negocio.`,
  description: extra.description || `${shortBenefit} El alcance se define a partir de lo que necesitás resolver hoy, sin cerrar la posibilidad de crecer después.`,
  benefits: extra.benefits || shared.benefits,
  businessTypes: extra.businessTypes || shared.businessTypes,
  includes: extra.includes || shared.includes,
  scaling: extra.scaling || shared.scaling,
  complete: Boolean(extra.complete)
});

export const families = [
  { id:"presencia", name:"Presencia digital", subtitle:"Lo que tus clientes ven, recorren y utilizan.", description:"Experiencias públicas para presentar, vender, recibir consultas o facilitar una acción.", color:"var(--presence)" },
  { id:"gestion", name:"Sistemas de gestión", subtitle:"Lo que organiza el trabajo cotidiano de tu negocio.", description:"Herramientas internas que reúnen información, estados y tareas en un lugar claro.", color:"var(--management)" },
  { id:"automatizacion", name:"Automatización e integración", subtitle:"Lo que conecta procesos y evita tareas repetitivas.", description:"Flujos que hacen avanzar la información y dejan el control humano donde importa.", color:"var(--automation)" }
];

export const products = [
  make("presencia","landing-page","Landing Page","Una página enfocada en convertir interés en consultas.","landing"),
  make("presencia","sitio-institucional","Sitio Institucional","Tu propuesta, servicios e identidad explicados con claridad.","landing"),
  make("presencia","catalogo-online","Catálogo Online","Productos ordenados para consultar desde cualquier dispositivo.","landing"),
  make("presencia","tienda-online","Tienda Online","Una experiencia propia para mostrar y vender por internet.","landing"),
  make("presencia","portfolio-profesional","Portfolio Profesional","Tu trabajo presentado de una forma que genere confianza.","landing"),
  make("presencia","portal-reservas","Portal de Reservas","Disponibilidad y reservas al alcance de tus clientes.","appointments"),
  make("presencia","pagina-evento","Página de Evento","Toda la información y las acciones importantes en un solo recorrido.","landing"),
  make("presencia","web-personalizada","Web personalizada","Una experiencia digital diseñada alrededor de una necesidad específica.","landing"),

  make("gestion","sistema-turnos","Sistema de Turnos","Reservas ordenadas para vos, tu equipo y tus clientes.","appointments",{
    complete:true,
    heroTitle:"Una agenda que acompaña la forma real de trabajar de tu equipo.",
    description:"Puede comenzar como una agenda simple y sumar disponibilidad online, profesionales, recursos, recordatorios, pagos o sedes cuando realmente haga falta.",
    benefits:["Menos coordinación por mensajes","Disponibilidad siempre clara","Confirmaciones y seguimiento desde un mismo lugar","Una experiencia más simple para cada cliente"],
    businessTypes:["Profesional independiente","Peluquería","Centro de estética","Consultorio","Cancha de fútbol","Academia","Negocio con varios servicios","Organización con múltiples profesionales"],
    includes:["Agenda y disponibilidad","Servicios y duración","Datos esenciales de clientes","Estados, cancelaciones y reprogramaciones","Accesos para el equipo","Acompañamiento y capacitación"],
    scaling:["Agenda básica","Disponibilidad online","Varios profesionales o recursos","Recordatorios y confirmaciones","Pagos, sedes e integraciones"]
  }),
  make("gestion","control-stock","Control de Stock","Existencias, movimientos y alertas en un mismo lugar.","stock"),
  make("gestion","gestion-pedidos","Gestión de Pedidos","Cada pedido visible desde que entra hasta que se entrega.","orders"),
  make("gestion","gestion-clientes","Gestión de Clientes","Información y seguimiento sin perder contexto entre mensajes.","dashboard"),
  make("gestion","panel-administrativo","Panel Administrativo","Lo importante para operar y decidir, reunido en una vista.","dashboard"),
  make("gestion","sistema-caja","Sistema de Caja","Movimientos cotidianos claros y fáciles de revisar.","dashboard"),
  make("gestion","gestion-proveedores","Gestión de Proveedores","Compras, contactos y pendientes mejor organizados.","stock"),
  make("gestion","sistema-rubro","Sistema personalizado por rubro","Una herramienta construida alrededor de una operación particular.","dashboard"),

  make("automatizacion","bot-whatsapp","Bot de WhatsApp","Consultas frecuentes y derivaciones mejor organizadas.","assistant"),
  make("automatizacion","recordatorios","Recordatorios Automáticos","Avisos oportunos sin depender de una tarea manual.","automation"),
  make("automatizacion","formularios-inteligentes","Formularios Inteligentes","Datos completos desde el inicio, sin tantas idas y vueltas.","forms"),
  make("automatizacion","automatizacion-consultas","Automatización de Consultas","Respuestas iniciales y contexto preparado para continuar.","assistant"),
  make("automatizacion","integracion-web-gestion","Integración entre Web y Gestión","Lo que ocurre en la web llega directamente al sistema interno.","automation"),
  make("automatizacion","notificaciones-seguimiento","Notificaciones y Seguimiento","Cada persona recibe la novedad que necesita en el momento justo.","automation"),
  make("automatizacion","asistente-ia","Asistente con IA","Ayuda contextual para consultar, organizar y preparar trabajo.","assistant"),
  make("automatizacion","flujos-personalizados","Flujos personalizados","Procesos conectados según las reglas reales del negocio.","automation")
];

export const findProduct = (slug) => products.find((product) => product.slug === slug);
