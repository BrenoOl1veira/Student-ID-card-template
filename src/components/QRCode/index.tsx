'use client';
import QRCode from 'qrcode';
import { useEffect, useState } from 'react';
export function StudentQRCode({ value }: { value: string }) { const [source, setSource] = useState(''); useEffect(() => { QRCode.toDataURL(value, { margin: 1, width: 140, color: { dark: '#075f89', light: '#ffffff' } }).then(setSource); }, [value]); return source ? <img src={source} width={92} height={92} alt="QR Code de validação" /> : <div className="h-[92px] w-[92px] animate-pulse bg-slate-100" aria-label="Gerando código QR" />; }
