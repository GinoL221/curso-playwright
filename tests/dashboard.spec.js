const { test } = require('../fixtures/fixtures');
const users = require('../data/users.json');

test.describe('Dashboard - OrangeHRM', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToLogin();
    await loginPage.login(users.validUser.username, users.validUser.password);
  });

  test('Validar dashboard y usuario logueado', async ({ dashboardPage }) => {
    await dashboardPage.validateDashboardLoaded();
    await dashboardPage.validateLoggedUserVisible();
  });

  test('Validar multiples opciones del menu lateral', async ({ dashboardPage }) => {
    await dashboardPage.validateDashboardLoaded();
    await dashboardPage.validateMultipleMenuOptions(users.menuOptions);
  });

  test('Buscar opcion del menu lateral', async ({ dashboardPage }) => {
    await dashboardPage.validateDashboardLoaded();
    await dashboardPage.searchMenuOption('PIM');
    await dashboardPage.validateMenuOptionVisible('PIM');
  });
});