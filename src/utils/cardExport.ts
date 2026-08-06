import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
const capture = async (node: HTMLElement) => toPng(node, { pixelRatio: 3, cacheBust: true, backgroundColor: '#fff' });
export async function downloadPng(node: HTMLElement) { const url = await capture(node); const a = document.createElement('a'); a.download = 'carteirinha-estudante.png'; a.href = url; a.click(); }
export async function downloadPdf(node: HTMLElement) { const url = await capture(node); const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a6' }); pdf.addImage(url, 'PNG', 0, 0, 105, 148); pdf.save('carteirinha-estudante.pdf'); }
