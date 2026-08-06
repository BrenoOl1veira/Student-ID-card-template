'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Moon, RotateCcw, Sun } from 'lucide-react';
import { BackCard } from '@/components/BackCard';
import { CardActions } from '@/components/CardActions';
import { IdentityCard } from '@/components/IdentityCard';
import { StudentForm } from '@/components/StudentForm';
import { INITIAL_STUDENT } from '@/constants/defaults';
import { useThemeStore } from '@/store/useThemeStore';
import type { StudentCardData } from '@/types/student';

export function CardGeneratorPage() {
  const [data, setData] = useState<StudentCardData>(INITIAL_STUDENT);
  const [back, setBack] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { dark, toggle } = useThemeStore();
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);
  const update = useCallback((values: StudentCardData) => setData(values), []);

  return <main className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100"><header className="bg-brand text-white shadow-sm dark:bg-slate-900 dark:ring-1 dark:ring-slate-800"><div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4"><h1 className="text-lg font-medium sm:text-xl">Carteira Digital de Estudante</h1><button aria-label="Alternar tema" onClick={toggle} className="rounded-lg p-2 hover:bg-white/15">{dark ? <Sun size={19} /> : <Moon size={19} />}</button></div></header><div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 lg:grid-cols-[410px_1fr]"><section className="rounded-2xl bg-white p-5 shadow-sm transition-colors dark:bg-slate-900 dark:shadow-black/20"><h2 className="mb-5 text-lg font-semibold">Dados do estudante</h2><StudentForm onData={update} /></section><section className="flex flex-col items-center gap-5"><div className="flex w-full items-center justify-center gap-3"><p className="text-sm font-medium text-slate-500 dark:text-slate-400">Prévia em tempo real</p><button onClick={() => setBack((value) => !value)} className="inline-flex items-center gap-1 rounded-md border border-slate-200 px-2 py-1 text-xs text-slate-500 dark:border-slate-700 dark:text-slate-300"><RotateCcw size={13} /> {back ? 'Ver frente' : 'Ver verso'}</button></div><div ref={cardRef} className="w-full max-w-[375px]">{back ? <BackCard data={data} /> : <IdentityCard data={data} />}</div><CardActions target={cardRef} /></section></div></main>;
}
