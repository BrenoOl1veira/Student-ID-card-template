'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Sparkles } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { PhotoUploader } from '@/components/PhotoUploader';
import { INITIAL_STUDENT } from '@/constants/defaults';
import { CAMPUSES, COURSES, PERIODS, UNITS } from '@/constants/studentOptions';
import { generateStudentExample } from '@/helpers/generateStudentExample';
import { cpfMask, dateMask } from '@/utils/masks';
import { studentSchema, type StudentFormValues } from '@/validators/studentSchema';

type SelectField = 'course' | 'unit' | 'campus' | 'period';

export function StudentForm({ onData }: { onData: (data: StudentFormValues) => void }) {
  const { register, watch, setValue, getValues, reset, formState: { errors } } = useForm<StudentFormValues>({ resolver: zodResolver(studentSchema), defaultValues: INITIAL_STUDENT, mode: 'onChange' });
  const data = watch();
  useEffect(() => {
    onData(getValues());
    const subscription = watch((values) => onData(values as StudentFormValues));
    return () => subscription.unsubscribe();
  }, [getValues, onData, watch]);

  const input = (name: keyof StudentFormValues, label: string, mask?: (value: string) => string) => <label className="grid gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-200">{label}<input {...register(name)} onChange={(event) => setValue(name, mask ? mask(event.target.value) : event.target.value, { shouldValidate: true })} className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-slate-900 outline-none ring-brand transition focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100" />{errors[name] && <small className="text-rose-500">{errors[name]?.message}</small>}</label>;
  const select = (name: SelectField, label: string, options: readonly string[]) => <label className="grid gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-200">{label}<select {...register(name)} className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-slate-900 outline-none ring-brand transition focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"><option value="">Selecione</option>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select>{errors[name] && <small className="text-rose-500">{errors[name]?.message}</small>}</label>;

  return <form className="space-y-4" noValidate><button type="button" onClick={() => reset(generateStudentExample())} className="flex w-full items-center justify-center gap-2 rounded-lg border border-brand/20 bg-sky-50 px-3 py-2.5 text-sm font-semibold text-brand transition hover:bg-sky-100 dark:border-sky-400/20 dark:bg-sky-950/50 dark:text-sky-300 dark:hover:bg-sky-900/60"><Sparkles size={16} /> Preencher exemplo aleatório</button><PhotoUploader value={data.photoUrl} onChange={(photoUrl) => setValue('photoUrl', photoUrl, { shouldValidate: true })} />{input('fullName', 'Nome completo')}<div className="grid grid-cols-2 gap-3">{input('cpf', 'CPF', cpfMask)}{input('birthDate', 'Nascimento', dateMask)}</div>{select('course', 'Curso', COURSES)}{input('enrollment', 'Matrícula')}<div className="grid grid-cols-2 gap-3">{select('unit', 'Unidade', UNITS)}{select('campus', 'Campus', CAMPUSES)}</div><div className="grid grid-cols-2 gap-3">{input('modality', 'Modalidade')}{select('period', 'Período', PERIODS)}</div><div className="grid grid-cols-2 gap-3">{input('issuedAt', 'Data de emissão', dateMask)}{input('validUntil', 'Validade', dateMask)}</div></form>;
}
