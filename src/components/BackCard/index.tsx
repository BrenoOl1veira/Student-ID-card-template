import { Barcode } from '@/components/Barcode';
import { BrandMark } from '@/components/BrandMark';
import { StudentQRCode } from '@/components/QRCode';
import { formatDate } from '@/utils/masks';
import type { StudentCardData } from '@/types/student';

export function BackCard({ data }: { data: StudentCardData }) {
  const validation = `estudante:${data.enrollment}|cpf:${data.cpf}|validade:${data.validUntil}`;

  return (
    <article className="relative mx-auto aspect-[.62] w-full max-w-[375px] overflow-hidden rounded-[3px] border border-slate-200 bg-white p-2 text-slate-600 shadow-card sm:p-3">
      <div className="relative h-full overflow-hidden border border-slate-100 p-3 sm:p-6">
        <div aria-hidden className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-brand via-cyan-500 to-brand" />
        <div className="mt-2 sm:mt-3">
          <BrandMark />
        </div>
        <div className="mt-4 border-y border-slate-100 py-3 sm:mt-8 sm:py-6">
          <p className="text-[9px] font-bold uppercase tracking-[.18em] text-brand sm:text-[10px]">Identificação estudantil</p>
          <h3 className="mt-2 text-lg font-bold leading-tight text-slate-800 sm:text-xl">{data.fullName}</h3>
          <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-3 text-xs sm:mt-6 sm:gap-x-4 sm:gap-y-5 sm:text-sm">
            <div>
              <dt>Matrícula</dt>
              <dd>{data.enrollment || '—'}</dd>
            </div>
            <div>
              <dt>Emissão</dt>
              <dd>{formatDate(data.issuedAt)}</dd>
            </div>
            <div>
              <dt>Unidade</dt>
              <dd>{data.unit || '—'}</dd>
            </div>
            <div>
              <dt>Modalidade</dt>
              <dd>{data.modality || '—'}</dd>
            </div>
          </dl>
        </div>
        <div className="mt-4 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
          <div>
            <p className="mb-2 text-[9px] font-semibold uppercase tracking-wide text-slate-400 sm:text-[10px]">Validação</p>
            <Barcode value={data.enrollment.replace(/\D/g, '')} />
          </div>
          <div className="rounded-lg border border-slate-100 p-1">
            <StudentQRCode value={validation} />
          </div>
        </div>
        <p className="absolute bottom-3 left-3 right-3 border-t border-slate-100 pt-2 text-center text-[9px] leading-relaxed text-slate-400 sm:bottom-6 sm:left-6 sm:right-6 sm:pt-3 sm:text-[10px]">
          Documento de uso interno. Válido até {formatDate(data.validUntil)}.
        </p>
      </div>
    </article>
  );
}
