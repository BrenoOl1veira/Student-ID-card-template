import { describe, expect, it } from 'vitest';
import { cpfMask, dateMask, formatDate } from './masks';
describe('masks', () => { it('formats CPF', () => expect(cpfMask('07952540750')).toBe('079.525.407-50')); it('formats date', () => expect(dateMask('03031976')).toBe('03/03/1976')); it('handles incomplete dates safely', () => expect(formatDate('03/03')).toBe('—')); });
