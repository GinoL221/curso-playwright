const { test } = require('../fixtures/fixtures');
const users = require('../data/users.json');

test.describe('PIM - OrangeHRM', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToLogin();
    await loginPage.login(users.validUser.username, users.validUser.password);
  });

  test('Acceder a la seccion PIM', async ({ dashboardPage, pimPage }) => {
    await dashboardPage.validateDashboardLoaded();
    await dashboardPage.openMenuOption('PIM');
    await pimPage.validatePimPageLoaded();
  });

  test('Validar elementos principales de la seccion PIM', async ({ dashboardPage, pimPage }) => {
    await dashboardPage.validateDashboardLoaded();
    await dashboardPage.openMenuOption('PIM');
    await pimPage.validatePimPageLoaded();
    await pimPage.validatePimMainElements();
  });
});