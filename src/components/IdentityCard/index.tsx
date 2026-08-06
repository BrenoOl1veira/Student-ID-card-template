import { BrandMark } from '@/components/BrandMark';
import { StudentPhoto } from '@/components/StudentPhoto';
import { formatDate } from '@/utils/masks';
import type { IdentityCardProps } from './types';

const Info = ({ label, value, wide }: { label: string; value?: string; wide?: boolean }) => (
  <div className={wide ? 'col-span-2' : ''}>
    <dt className="text-[9px] font-bold uppercase tracking-[.11em] text-slate-400 sm:text-[10px]">{label}</dt>
    <dd className="mt-1 truncate text-[12px] font-medium text-slate-600 sm:text-[15px]">{value || '—'}</dd>
  </div>
);

export function IdentityCard({ data, cardRef }: IdentityCardProps) {
  return (
    <article
      ref={cardRef}
      aria-label="Prévia da carteirinha"
      className="card-print relative mx-auto aspect-[.62] w-full max-w-[375px] overflow-hidden rounded-[3px] border border-slate-200 bg-white p-2 shadow-card sm:p-3"
    >
      <div className="relative h-full overflow-hidden border border-slate-100 px-3 pb-4 pt-4 sm:px-6 sm:pb-6 sm:pt-7">
        <div aria-hidden className="absolute -right-20 -top-16 h-52 w-52 rounded-full border-[30px] border-brand/5" />
        <div aria-hidden className="absolute -bottom-28 -left-20 h-48 w-48 rounded-full border-[22px] border-cyan-500/5" />
        <div className="relative">
          <BrandMark />
          <div className="mx-auto mt-2 h-px w-20 bg-gradient-to-r from-transparent via-brand/40 to-transparent" />
          <p className="mt-2 text-center text-[8px] font-bold uppercase tracking-[.2em] text-brand sm:mt-3 sm:text-[9px]">
            Identidade estudantil
          </p>
          <div className="mt-3 sm:mt-4">
            <StudentPhoto src={data.photoUrl} name={data.fullName} />
          </div>
          <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-3 leading-tight sm:mt-7 sm:gap-x-4 sm:gap-y-4">
            <Info label="Nome" value={data.fullName} wide />
            <Info label="CPF" value={data.cpf} />
            <Info label="Nascimento" value={formatDate(data.birthDate)} />
            <Info label="Curso" value={data.course} wide />
            <Info label="Matrícula" value={data.enrollment} />
            <Info label="Validade" value={formatDate(data.validUntil)} />
          </dl>
        </div>
        <footer className="absolute bottom-3 left-3 right-3 border-t border-slate-100 pt-3 text-center text-[9px] leading-relaxed text-slate-400 sm:bottom-7 sm:left-6 sm:right-6 sm:pt-4 sm:text-[10px]">
          Válida mediante apresentação de documento
          <br />
          de identidade oficial com foto.
        </footer>
      </div>
    </article>
  );
}
