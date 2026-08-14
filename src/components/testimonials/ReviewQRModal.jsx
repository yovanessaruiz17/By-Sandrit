import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import {
  Copy,
  Check,
  Download,
  Share2,
  Printer,
  Sparkles,
  ExternalLink,
  MessageCircle,
  QrCode
} from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { useBusiness } from '../../context/BusinessContext';

export function ReviewQRModal({ isOpen, onClose }) {
  const { settings } = useBusiness();
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [generating, setGenerating] = useState(true);
  const printRef = useRef(null);

  const businessName = settings?.business_name || 'BY SANDRIT';
  const stylistName = settings?.stylist_name || 'Sandrit Ríos Molinares';

  // Compute public feedback link
  const reviewUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/dejar-opinion`
    : 'https://by-sandrit.netlify.app/dejar-opinion';

  useEffect(() => {
    if (!isOpen) return;

    setGenerating(true);
    QRCode.toDataURL(
      reviewUrl,
      {
        width: 600,
        margin: 2,
        color: {
          dark: '#2C2422',
          light: '#FFFFFF'
        },
        errorCorrectionLevel: 'H'
      },
      (err, url) => {
        if (!err && url) {
          setQrDataUrl(url);
        }
        setGenerating(false);
      }
    );
  }, [isOpen, reviewUrl]);

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(reviewUrl);
      } else {
        const input = document.createElement('input');
        input.value = reviewUrl;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (e) {
      console.error('Failed to copy', e);
    }
  };

  const handleDownloadQR = () => {
    if (!qrDataUrl) return;
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = `QR-Resenas-By-Sandrit.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleWhatsAppShare = () => {
    const message = encodeURIComponent(
      `¡Hola hermosa! ✨ Gracias por visitarnos en ${businessName}.\n\nTu satisfacción y bienestar son lo más importante para nosotras. ¿Nos regalarías 1 minuto para dejarnos tu opinión y calificación sobre tu atención?\n\nPuedes hacerlo directamente aquí:\n👉 ${reviewUrl}\n\n¡Un abrazo enorme y esperamos verte pronto de nuevo!`
    );
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Código QR Reseñas - By Sandrit</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap');
            body {
              font-family: 'Plus Jakarta Sans', sans-serif;
              margin: 0;
              padding: 40px;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              background-color: #faf7f5;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            .card {
              max-width: 420px;
              width: 100%;
              background: #ffffff;
              border: 2px solid #8C3F52;
              border-radius: 24px;
              padding: 36px 28px;
              text-align: center;
              box-shadow: 0 10px 25px rgba(0,0,0,0.05);
            }
            .brand {
              font-family: 'Playfair Display', serif;
              font-size: 26px;
              font-weight: 700;
              color: #2C2422;
              letter-spacing: 2px;
              text-transform: uppercase;
              margin-bottom: 4px;
            }
            .stylist {
              font-size: 13px;
              color: #8C3F52;
              font-weight: 600;
              margin-bottom: 20px;
            }
            .qr-wrapper {
              background: #faf7f5;
              padding: 16px;
              border-radius: 16px;
              display: inline-block;
              border: 1px solid #efe5e2;
              margin-bottom: 20px;
            }
            .qr-img {
              width: 220px;
              height: 220px;
              display: block;
            }
            .headline {
              font-family: 'Playfair Display', serif;
              font-size: 20px;
              color: #2C2422;
              margin-bottom: 8px;
            }
            .text {
              font-size: 13px;
              color: #736662;
              line-height: 1.5;
              margin-bottom: 16px;
            }
            .link {
              font-size: 11px;
              color: #8C3F52;
              word-break: break-all;
              font-weight: 600;
            }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="brand">${businessName}</div>
            <div class="stylist">${stylistName}</div>
            <div class="qr-wrapper">
              <img class="qr-img" src="${qrDataUrl}" alt="Código QR" />
            </div>
            <div class="headline">¡Tu opinión nos inspira!</div>
            <p class="text">Escanea este código con la cámara de tu celular y cuéntanos cómo fue tu experiencia con nosotras.</p>
            <div class="link">${reviewUrl}</div>
          </div>
          <script>
            window.onload = () => {
              window.print();
              setTimeout(() => window.close(), 500);
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Pedir Reseñas a Clientas"
      subtitle="Enlace & Código QR"
      maxWidth="max-w-xl"
    >
      <div className="space-y-6">
        {/* Explanation header */}
        <div className="bg-[#FAF2F3] border border-[#F2D7D9] rounded-2xl p-4 flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-white text-[#8C3F52] flex items-center justify-center shrink-0 shadow-2xs">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[#2C2422] mb-0.5">
              Comparte tu enlace o exhibe tu QR
            </h4>
            <p className="text-xs text-[#736662] leading-relaxed">
              Tus clientas podrán calificar tu atención (estrellas y comentarios) desde su celular en segundos. Las reseñas se guardarán directamente en tu sistema.
            </p>
          </div>
        </div>

        {/* QR Code Preview Card */}
        <div className="bg-white rounded-2xl border border-[#E8DCD9] p-6 text-center shadow-xs flex flex-col items-center">
          <div className="p-3 bg-[#FAF7F5] rounded-2xl border border-[#EFE5E2] mb-4 shadow-inner inline-block">
            {generating || !qrDataUrl ? (
              <div className="w-48 h-48 flex items-center justify-center text-xs text-[#736662]">
                Generando código QR...
              </div>
            ) : (
              <img
                src={qrDataUrl}
                alt="Código QR para Calificar"
                className="w-48 h-48 sm:w-56 sm:h-56 rounded-lg object-contain"
              />
            )}
          </div>

          <h5 className="font-display font-medium text-base text-[#2C2422] mb-1">
            Código QR de Calificación
          </h5>
          <p className="text-xs text-[#736662] max-w-sm mb-4">
            Ideal para imprimirlo y colocarlo en un portarretratos en tu tocador o recepción.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadQR}
              icon={Download}
            >
              Descargar Imagen QR
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={handlePrint}
              icon={Printer}
            >
              Imprimir Tarjeta
            </Button>
          </div>
        </div>

        {/* Direct Link Section */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C504C]">
            Enlace directo para compartir
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={reviewUrl}
              className="grow px-3.5 py-2.5 bg-white border border-[#D4B8B1] rounded-xl text-xs sm:text-sm text-[#2C2422] select-all focus:outline-none focus:ring-2 focus:ring-[#8C3F52]/20"
            />
            <Button
              variant={copied ? 'secondary' : 'primary'}
              size="md"
              onClick={handleCopyLink}
              icon={copied ? Check : Copy}
              className="shrink-0 min-w-[130px]"
            >
              {copied ? '¡Copiado!' : 'Copiar Enlace'}
            </Button>
          </div>
        </div>

        {/* Action sharing triggers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <button
            onClick={handleWhatsAppShare}
            className="flex items-center justify-center gap-2.5 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-medium transition-all shadow-xs hover:shadow-sm"
          >
            <MessageCircle className="w-4 h-4 shrink-0" />
            <span>Enviar por WhatsApp</span>
          </button>

          <a
            href={reviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 px-4 py-3 bg-stone-100 hover:bg-stone-200 text-[#2C2422] rounded-xl text-xs sm:text-sm font-medium transition-all border border-[#E8DCD9]"
          >
            <ExternalLink className="w-4 h-4 text-[#736662] shrink-0" />
            <span>Ver formulario público</span>
          </a>
        </div>
      </div>
    </Modal>
  );
}
