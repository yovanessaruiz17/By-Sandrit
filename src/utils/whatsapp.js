/**
 * WhatsApp integration helper
 * Generates dynamic WhatsApp message URLs using business settings
 */

export function cleanPhoneNumber(phone) {
  if (!phone) return '573127654780';
  const digits = String(phone).replace(/\D/g, '');
  // Default to Colombia country code 57 if 10 digits
  if (digits.length === 10) {
    return `57${digits}`;
  }
  return digits;
}

export function generateWhatsAppUrl({ phone, message = '' }) {
  const targetPhone = cleanPhoneNumber(phone);
  const encodedText = encodeURIComponent(message.trim());
  return `https://wa.me/${targetPhone}?text=${encodedText}`;
}

export function generateServiceInquiryMessage(serviceName) {
  return `Hola Sandrit 💕, me gustaría recibir más información y agendar una cita para *${serviceName || 'un servicio estético'}*. ¿Qué disponibilidad tienes?`;
}

export function generateGeneralInquiryMessage() {
  return `Hola Sandrit 💕, estoy interesada en tus servicios de estética y bienestar. Quisiera conocer más información.`;
}

export function generateBookingConfirmationMessage({
  serviceName,
  date,
  time,
  customerName,
  customerPhone,
  notes
}) {
  let message = `Hola Sandrit 💕, quiero confirmar una solicitud de cita:\n\n`;
  message += `✨ *Servicio:* ${serviceName || 'Servicio'}\n`;
  message += `📅 *Fecha:* ${date || 'Por definir'}\n`;
  message += `⏰ *Hora:* ${time || 'Por definir'}\n`;
  message += `👤 *Nombre:* ${customerName || 'Cliente'}\n`;
  if (customerPhone) {
    message += `📱 *Teléfono:* ${customerPhone}\n`;
  }
  if (notes) {
    message += `📝 *Observaciones:* ${notes}\n`;
  }
  message += `\n¿Me confirmas disponibilidad? ¡Muchas gracias!`;
  return message;
}
