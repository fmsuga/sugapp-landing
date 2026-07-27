// Contenido ficticio separado de la lógica para poder sumar rubros sin
// duplicar componentes ni modificar el renderizado.
export const businessDashboards = {
  grocery: {
    name: "Despensa Norte",
    initials: "DN",
    greeting: "Buenas tardes",
    title: "Así viene el día",
    navLabel: "Productos",
    action: "Registrar venta",
    toast: "Venta simulada registrada. La caja y el stock quedarían actualizados.",
    theme: "theme-grocery",
    metrics: [
      { label: "Ventas de hoy", value: "$ 184.600", trend: "+12%", tone: "positive" },
      { label: "Stock bajo", value: "7 productos", trend: "Revisar", tone: "warning" },
      { label: "Caja actual", value: "$ 96.200", trend: "Al día", tone: "neutral" }
    ],
    chartLabel: "Ventas por franja",
    chartTotal: "$ 184.600",
    chart: [34, 52, 41, 68, 83, 61, 92],
    alertTitle: "Atención hoy",
    alerts: [
      { title: "Yerba 1 kg", detail: "Quedan 4 unidades", level: "warning" },
      { title: "Pedido de bebidas", detail: "Llega a las 19:30", level: "info" },
      { title: "Cierre de caja", detail: "Pendiente", level: "neutral" }
    ],
    activityTitle: "Movimientos recientes",
    activity: [
      { title: "Venta #184", detail: "6 productos · $ 8.450", time: "18:32" },
      { title: "Ingreso de mercadería", detail: "Proveedor El Trébol", time: "17:48" },
      { title: "Venta #183", detail: "3 productos · $ 4.200", time: "17:31" }
    ]
  },
  salon: {
    name: "Estudio Nativa",
    initials: "EN",
    greeting: "Agenda de hoy",
    title: "Próximos turnos",
    navLabel: "Agenda",
    action: "Nueva reserva",
    toast: "Reserva simulada creada. El horario dejaría de figurar como disponible.",
    theme: "theme-salon",
    metrics: [
      { label: "Turnos de hoy", value: "11", trend: "8 confirmados", tone: "positive" },
      { label: "Espacios libres", value: "3 horarios", trend: "Ver agenda", tone: "neutral" },
      { label: "Ingresos estimados", value: "$ 126.000", trend: "Hoy", tone: "accent" }
    ],
    chartLabel: "Ocupación semanal",
    chartTotal: "78%",
    chart: [52, 76, 68, 91, 84, 63, 42],
    alertTitle: "Agenda",
    alerts: [
      { title: "15:30 · Corte", detail: "Marina G.", level: "info" },
      { title: "16:15 · Color", detail: "Julieta P.", level: "accent" },
      { title: "17:45 disponible", detail: "45 minutos", level: "positive" }
    ],
    activityTitle: "Actividad reciente",
    activity: [
      { title: "Turno confirmado", detail: "WhatsApp enviado", time: "14:22" },
      { title: "Nueva reserva online", detail: "Corte y peinado", time: "13:57" },
      { title: "Horario liberado", detail: "Cancelación avisada", time: "12:40" }
    ]
  },
  psychology: {
    name: "Agenda Profesional",
    initials: "AP",
    greeting: "Miércoles",
    title: "Organización de sesiones",
    navLabel: "Calendario",
    action: "Agendar sesión",
    toast: "Sesión simulada agendada. Se prepararía una confirmación para enviar.",
    theme: "theme-psychology",
    metrics: [
      { label: "Sesiones de hoy", value: "6", trend: "Próxima 16:00", tone: "positive" },
      { label: "Disponibilidad", value: "4 espacios", trend: "Esta semana", tone: "neutral" },
      { label: "Consultas pendientes", value: "2", trend: "Responder", tone: "warning" }
    ],
    chartLabel: "Ocupación horaria",
    chartTotal: "21 sesiones",
    chart: [48, 72, 64, 88, 59, 32, 18],
    alertTitle: "Recordatorios",
    alerts: [
      { title: "Confirmar sesión", detail: "Jueves · 10:00", level: "info" },
      { title: "Reprogramación solicitada", detail: "Viernes · 17:00", level: "warning" },
      { title: "Horario disponible", detail: "Mañana · 14:30", level: "positive" }
    ],
    activityTitle: "Cambios de agenda",
    activity: [
      { title: "Sesión confirmada", detail: "Mañana · 09:00", time: "14:10" },
      { title: "Consulta recibida", detail: "Disponibilidad semanal", time: "12:36" },
      { title: "Recordatorio preparado", detail: "Sesión de las 16:00", time: "11:15" }
    ]
  }
};

export const websitePreviews = {
  appointments: {
    theme: "preview-appointments",
    url: "turnos.local",
    brand: "Estudio Bienestar",
    nav: "Servicios   Equipo   Contacto",
    eyebrow: "Reservas simples",
    title: "Elegí tu horario sin llamadas.",
    cta: "Ver turnos",
    phoneTitle: "Tu próximo turno, en minutos.",
    phoneCta: "Reservar",
    items: ["Masajes", "Kinesiología", "Bienestar"]
  },
  restaurant: {
    theme: "preview-restaurant",
    url: "lacocina.local",
    brand: "La Cocina",
    nav: "Menú   Reservas   Cómo llegar",
    eyebrow: "Menú de temporada",
    title: "Comida simple, hecha cerca.",
    cta: "Ver menú",
    phoneTitle: "Reservá tu mesa para hoy.",
    phoneCta: "Reservar",
    items: ["Entradas", "Principales", "Postres"]
  },
  store: {
    theme: "preview-store",
    url: "tienda.local",
    brand: "Casa Forma",
    nav: "Novedades   Catálogo   Envíos",
    eyebrow: "Colección actual",
    title: "Objetos útiles para todos los días.",
    cta: "Explorar catálogo",
    phoneTitle: "Comprá desde cualquier lugar.",
    phoneCta: "Ver productos",
    items: ["Cocina", "Textiles", "Organización"]
  }
};

export const operationMethods = {
  form: {
    icon: "01",
    label: "Carga directa",
    title: "Completá los datos del ingreso.",
    description: "Una opción precisa para trabajar desde una computadora.",
    action: "Simular carga",
    result: "Formulario preparado. Antes de guardar, se validarían cantidades y producto."
  },
  scan: {
    icon: "02",
    label: "Escaneo simulado",
    title: "Identificá el producto en un paso.",
    description: "Útil cuando el trabajo ocurre frente a la mercadería.",
    action: "Simular escaneo",
    result: "Código reconocido. El sistema pediría confirmar producto y cantidad."
  },
  voice: {
    icon: "03",
    label: "Entrada por voz",
    title: "Describí la acción con palabras.",
    description: "Una alternativa cuando las manos están ocupadas.",
    action: "Simular dictado",
    result: "Interpretación preparada: 12 unidades. Siempre se confirma antes de actualizar."
  },
  assistant: {
    icon: "04",
    label: "Asistente guiado",
    title: "Resolvé la carga paso a paso.",
    description: "Puede ayudar cuando la acción requiere varias decisiones.",
    action: "Iniciar ejemplo",
    result: "Asistente listo. Haría preguntas breves y mostraría un resumen para confirmar."
  }
};
