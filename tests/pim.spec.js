// @ts-check

const { test, expect } = require('../fixtures/fixtures');
const users = require('../data/users.json');

test.describe('PIM - OrangeHRM', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToLogin();
    await loginPage.login(users.validUser.username, users.validUser.password);
  });

  test('Acceder a la seccion PIM', async ({ dashboardPage, pimPage }) => {
    const isDashboardVisible = await dashboardPage.isDashboardVisible();
    expect(isDashboardVisible).toBe(true);

    await dashboardPage.openMenuOption('PIM');

    const isPimPageVisible = await pimPage.isPimPageVisible();
    expect(isPimPageVisible).toBe(true);
  });

  test('Validar elementos principales de la seccion PIM', async ({ dashboardPage, pimPage }) => {
    const isDashboardVisible = await dashboardPage.isDashboardVisible();
    expect(isDashboardVisible).toBe(true);

    await dashboardPage.openMenuOption('PIM');

    const isPimPageVisible = await pimPage.isPimPageVisible();
    expect(isPimPageVisible).toBe(true);

    const arePimMainElementsVisible = await pimPage.arePimMainElementsVisible();
    expect(arePimMainElementsVisible.every(Boolean)).toBe(true);
  });
});
