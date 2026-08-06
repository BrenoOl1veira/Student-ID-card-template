import type { StudentCardData } from '@/types/student';
export const INITIAL_STUDENT = { fullName: 'Nome do estudante', cpf: '', birthDate: '', course: '', enrollment: '', unit: '', campus: '', modality: '', period: '', issuedAt: '', validUntil: '' } as const satisfies StudentCardData;
