/**
 * Slot availability calculation engine
 * Respects business hours, service duration, closed days, and occupied appointments
 */

export function getDayOfWeekNumber(dateString) {
  const [year, month, day] = dateString.split('-').map(Number);
  const dateObj = new Date(year, month - 1, day);
  return dateObj.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
}

export function parseMinutesFromTime(timeStr) {
  if (!timeStr) return 0;
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + (m || 0);
}

export function formatTimeFromMinutes(totalMinutes) {
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

export function getAvailableSlots({
  dateString,
  serviceDurationMinutes = 60,
  businessHoursList = [],
  existingAppointments = []
}) {
  if (!dateString) return { isClosed: false, slots: [], reason: 'Fecha no seleccionada' };

  const dayOfWeek = getDayOfWeekNumber(dateString);
  const daySchedule = businessHoursList.find(bh => bh.day_of_week === dayOfWeek);

  if (!daySchedule || daySchedule.is_closed) {
    return {
      isClosed: true,
      slots: [],
      reason: 'El establecimiento se encuentra cerrado los días seleccionados.'
    };
  }

  const openMins = parseMinutesFromTime(daySchedule.open_time || '08:00');
  const closeMins = parseMinutesFromTime(daySchedule.close_time || '18:00');

  // Interval step between slot options (e.g., 30 mins)
  const slotStepMins = 30;
  const slots = [];

  // Filter appointments for the selected date that are not cancelled
  const dateAppointments = existingAppointments.filter(
    apt => apt.appointment_date === dateString && apt.status !== 'cancelled'
  );

  for (let currentMins = openMins; currentMins + serviceDurationMinutes <= closeMins; currentMins += slotStepMins) {
    const slotEndMins = currentMins + serviceDurationMinutes;
    const time24 = formatTimeFromMinutes(currentMins);

    // Check collision with any existing appointment
    const hasCollision = dateAppointments.some(apt => {
      const aptStart = parseMinutesFromTime(apt.appointment_time);
      const aptDuration = apt.service_duration || apt.services?.duration_minutes || 60;
      const aptEnd = aptStart + aptDuration;

      // Overlap condition: start < aptEnd AND slotEnd > aptStart
      return currentMins < aptEnd && slotEndMins > aptStart;
    });

    slots.push({
      time: time24,
      available: !hasCollision
    });
  }

  return {
    isClosed: false,
    slots,
    daySchedule
  };
}
