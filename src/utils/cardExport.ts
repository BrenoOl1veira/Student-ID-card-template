import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';

async function waitForImages(node: HTMLElement) {
  const images = Array.from(node.querySelectorAll('img'));

  await Promise.all(
    images.map((image) => {
      if (image.complete && image.naturalWidth > 0) {
        return Promise.resolve();
      }

      return new Promise<void>((resolve) => {
        image.onload = () => resolve();
        image.onerror = () => resolve();
      });
    }),
  );
}

async function waitForFonts() {
  if (typeof document !== 'undefined' && 'fonts' in document) {
    await document.fonts.ready;
  }
}

export async function captureCardImage(node: HTMLElement) {
  await waitForImages(node);
  await waitForFonts();

  return toPng(node, {
    pixelRatio: 2,
    cacheBust: true,
    backgroundColor: '#fff',
  });
}

function triggerDownload(url: string, filename: string) {
  const link = document.createElement('a');
  link.download = filename;
  link.href = url;
  link.click();
}

export async function downloadPng(node: HTMLElement) {
  try {
    const url = await captureCardImage(node);
    triggerDownload(url, 'carteirinha-estudante.png');
  } catch (error) {
    console.error('Erro ao exportar PNG:', error);
    window.alert('Não foi possível gerar a imagem PNG. Tente novamente.');
  }
}

export async function downloadPdf(node: HTMLElement) {
  try {
    const url = await captureCardImage(node);
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a6' });
    pdf.addImage(url, 'PNG', 0, 0, 105, 148);
    pdf.save('carteirinha-estudante.pdf');
  } catch (error) {
    console.error('Erro ao exportar PDF:', error);
    window.alert('Não foi possível gerar o PDF. Tente novamente.');
  }
}
