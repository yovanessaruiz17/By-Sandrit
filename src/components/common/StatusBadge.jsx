import React from 'react';
import { Clock, CheckCircle2, CheckCheck, XCircle } from 'lucide-react';

export function StatusBadge({ status, className = '' }) {
  const configs = {
    pending: {
      label: 'Pendiente',
      icon: Clock,
      style: 'bg-amber-50 text-amber-800 border-amber-200/80'
    },
    confirmed: {
      label: 'Confirmada',
      icon: CheckCircle2,
      style: 'bg-emerald-50 text-emerald-800 border-emerald-200/80'
    },
    completed: {
      label: 'Completada',
      icon: CheckCheck,
      style: 'bg-blue-50 text-blue-800 border-blue-200/80'
    },
    cancelled: {
      label: 'Cancelada',
      icon: XCircle,
      style: 'bg-rose-50 text-rose-800 border-rose-200/80'
    }
  };

  const current = configs[status] || configs.pending;
  const Icon = current.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${current.style} ${className}`}>
      <Icon className="w-3.5 h-3.5" />
      <span>{current.label}</span>
    </span>
  );
}
