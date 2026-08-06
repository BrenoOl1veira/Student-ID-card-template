import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Providers } from '@/app/providers';
import '@/styles/globals.css';
export const metadata: Metadata = { title: 'Carteira Digital de Estudante', description: 'Gerador interno de identificação estudantil' };
export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) { return <html lang="pt-BR" suppressHydrationWarning><body><Providers>{children}</Providers></body></html>; }
