'use client';
import { Download, FileText, Printer, Share2 } from 'lucide-react';
import type { RefObject } from 'react';
import { captureCardImage, downloadPdf, downloadPng } from '@/utils/cardExport';

export function CardActions({ target }: { target: RefObject<HTMLDivElement | null> }) {
  const get = () => target.current;

  const print = () => {
    document.body.classList.add('printing');
    window.print();
    setTimeout(() => document.body.classList.remove('printing'), 100);
  };

  const share = async () => {
    const current = get();

    if (!current) {
      return;
    }

    try {
      const imageUrl = await captureCardImage(current);
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const file = new File([blob], 'carteirinha-estudante.png', { type: 'image/png' });

      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          title: 'Carteirinha de estudante',
          text: 'Veja a minha carteirinha de estudante.',
          files: [file],
        });
        return;
      }

      if (navigator.share) {
        await navigator.share({
          title: 'Carteirinha de estudante',
          text: 'Veja a minha carteirinha de estudante.',
        });
        return;
      }
    } catch (error) {
      console.error('Erro ao compartilhar:', error);
    }

    try {
      await navigator.clipboard.writeText(window.location.href);
      window.alert('Compartilhamento não suportado neste navegador. O link foi copiado para a área de transferência.');
    } catch {
      window.alert('Não foi possível compartilhar. Tente novamente.');
    }
  };

  return (
    <div className="grid grid-cols-2 gap-2 sm:flex">
      <button type="button" onClick={() => get() && downloadPng(get()!)} className="action">
        <Download size={17} /> PNG
      </button>
      <button type="button" onClick={() => get() && downloadPdf(get()!)} className="action">
        <FileText size={17} /> PDF
      </button>
      <button type="button" onClick={print} className="action">
        <Printer size={17} /> Imprimir
      </button>
      <button type="button" onClick={share} className="action">
        <Share2 size={17} /> Compartilhar
      </button>
    </div>
  );
}
