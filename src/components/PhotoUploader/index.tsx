'use client';
import { ImageUp, X } from 'lucide-react';
import { useRef, useState } from 'react';
import type { PhotoUploaderProps } from './types';
export function PhotoUploader({ value, onChange }: PhotoUploaderProps) {
  const input = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const setFile = (file?: File) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => onChange(String(reader.result));
    reader.readAsDataURL(file);
  };
  return (
    <div className={`relative rounded-xl border-2 border-dashed p-4 text-center transition ${dragging ? 'border-brand bg-sky-50 dark:bg-sky-950/50' : 'border-slate-200 dark:border-slate-700'}`} onDragOver={(event) => { event.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={(event) => { event.preventDefault(); setDragging(false); setFile(event.dataTransfer.files[0]); }}>
      <input ref={input} className="sr-only" type="file" accept="image/*" onChange={(event) => setFile(event.target.files?.[0])} />
      <button type="button" onClick={() => input.current?.click()} className="flex w-full flex-col items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300">
        <ImageUp className="text-brand" />
        <span>{value ? 'Trocar foto' : 'Arraste uma foto ou clique aqui'}</span>
        <span className="text-xs font-normal text-slate-400 dark:text-slate-500">PNG, JPG ou WEBP</span>
      </button>
      {value ? <button onClick={() => onChange(undefined)} type="button" aria-label="Remover foto" className="absolute right-2 top-2 rounded-full p-1 text-slate-400 hover:bg-slate-100"><X size={16} /></button> : null}
    </div>
  );
}
