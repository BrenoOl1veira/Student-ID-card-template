import type { StudentCardData } from '@/types/student';
import type { Ref } from 'react';
export interface IdentityCardProps { data: StudentCardData; cardRef?: Ref<HTMLDivElement>; }
