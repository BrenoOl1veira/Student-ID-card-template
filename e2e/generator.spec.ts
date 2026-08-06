import { expect, test } from '@playwright/test';
test('renders the student card generator', async ({ page }) => { await page.goto('/'); await expect(page.getByRole('heading', { name: 'Carteira Digital de Estudante' })).toBeVisible(); await page.getByLabel('Nome completo').fill('Ana Silva'); await expect(page.getByText('Ana Silva')).toBeVisible(); });
