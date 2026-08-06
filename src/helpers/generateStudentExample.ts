import { CAMPUSES, COURSES, PERIODS, UNITS } from '@/constants/studentOptions';
import type { StudentFormValues } from '@/validators/studentSchema';

const choose = <T,>(items: readonly T[]) => items[Math.floor(Math.random() * items.length)];
const pad = (value: number) => String(value).padStart(2, '0');

function generateCpf() {
  const digits = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10));
  const digit = (base: number[]) => { const total = base.reduce((sum, current, index) => sum + current * (base.length + 1 - index), 0); const remainder = (total * 10) % 11; return remainder === 10 ? 0 : remainder; };
  digits.push(digit(digits));
  digits.push(digit(digits));
  return `${digits.slice(0, 3).join('')}.${digits.slice(3, 6).join('')}.${digits.slice(6, 9).join('')}-${digits.slice(9).join('')}`;
}

export function generateStudentExample(): StudentFormValues {
  const firstName = choose(['Ana', 'Beatriz', 'Bruno', 'Camila', 'Gabriel', 'Isabela', 'João', 'Larissa', 'Lucas', 'Mariana']);
  const lastName = choose(['Almeida', 'Barbosa', 'Costa', 'Ferreira', 'Martins', 'Oliveira', 'Pereira', 'Santos', 'Silva']);
  const birthYear = 1997 + Math.floor(Math.random() * 8);
  const birthMonth = 1 + Math.floor(Math.random() * 12);
  const birthDay = 1 + Math.floor(Math.random() * 28);
  const today = new Date();
  const issuedAt = `${pad(today.getDate())}/${pad(today.getMonth() + 1)}/${today.getFullYear()}`;
  const validUntil = `${pad(today.getDate())}/${pad(today.getMonth() + 1)}/${today.getFullYear() + 1}`;
  const unit = choose(UNITS);
  return { fullName: `${firstName} ${lastName}`, cpf: generateCpf(), birthDate: `${pad(birthDay)}/${pad(birthMonth)}/${birthYear}`, course: choose(COURSES), enrollment: `${today.getFullYear()}${String(Math.floor(1000000 + Math.random() * 8999999))}`, unit, campus: CAMPUSES[UNITS.indexOf(unit)], modality: choose(['Presencial', 'EAD', 'Flex']), period: choose(PERIODS), issuedAt, validUntil };
}
