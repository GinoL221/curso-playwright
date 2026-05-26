// @ts-check

const { test, expect } = require('../fixtures/fixtures');
const users = require('../data/users.json');

test.describe('Dashboard - OrangeHRM', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToLogin();
    await loginPage.login(users.validUser.username, users.validUser.password);
  });

  test('Validar dashboard y usuario logueado', async ({ dashboardPage }) => {
    const isDashboardVisible = await dashboardPage.isDashboardVisible();
    expect(isDashboardVisible).toBe(true);

    const isLoggedUserVisible = await dashboardPage.isLoggedUserVisible();
    expect(isLoggedUserVisible).toBe(true);
  });

  test('Validar multiples opciones del menu lateral', async ({ dashboardPage }) => {
    const isDashboardVisible = await dashboardPage.isDashboardVisible();
    expect(isDashboardVisible).toBe(true);

    const visibleOptions = await dashboardPage.areMultipleMenuOptionsVisible(users.menuOptions);
    expect(visibleOptions.every(Boolean)).toBe(true);
  });

  test('Buscar opcion del menu lateral', async ({ dashboardPage }) => {
    const isDashboardVisible = await dashboardPage.isDashboardVisible();
    expect(isDashboardVisible).toBe(true);

    await dashboardPage.searchMenuOption('PIM');

    const isPimOptionVisible = await dashboardPage.isMenuOptionVisible('PIM');
    expect(isPimOptionVisible).toBe(true);
  });
});
