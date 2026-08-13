/**
 * Formatting helpers for prices, dates and times
 */

export function formatPrice(amount, isDemo = false) {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return 'Consultar';
  }
  const formatted = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(amount);

  return isDemo ? `${formatted} (DEMO)` : formatted;
}

export function formatDateSpanish(dateString) {
  if (!dateString) return '';
  // Avoid timezone offsets by parsing date parts
  const [year, month, day] = dateString.split('-').map(Number);
  const dateObj = new Date(year, month - 1, day);
  return dateObj.toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function formatShortDate(dateString) {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('-').map(Number);
  const dateObj = new Date(year, month - 1, day);
  return dateObj.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
}

export function formatDuration(minutes) {
  if (!minutes) return '45 min';
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const remainingMins = minutes % 60;
  if (remainingMins === 0) return `${hours} h`;
  return `${hours} h ${remainingMins} min`;
}

export function formatTime12Hour(time24) {
  if (!time24) return '';
  const [h, m] = time24.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hours12 = h % 12 || 12;
  const minutesStr = String(m).padStart(2, '0');
  return `${hours12}:${minutesStr} ${period}`;
}
