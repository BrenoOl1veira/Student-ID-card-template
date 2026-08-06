export function BrandMark() {
  return (
    <div className="flex items-center justify-center gap-2.5 text-slate-900">
      <img
        src="./assets/estacio-logo.webp"
        width={44}
        height={44}
        alt="Logo Estácio"
        className="h-11 w-11 object-contain drop-shadow-sm"
      />
      <span className="text-[1.85rem] font-black tracking-[-.06em]">Estácio</span>
    </div>
  );
}
