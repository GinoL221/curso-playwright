const { test } = require('../fixtures/fixtures');
const users = require('../data/users.json');

test.describe('Login - OrangeHRM', () => {
  test('Login exitoso con usuario valido', async ({ loginPage, dashboardPage }) => {
    await loginPage.goToLogin();
    await loginPage.validateLoginPageLoaded();
    await loginPage.login(users.validUser.username, users.validUser.password);

    await dashboardPage.validateDashboardLoaded();
  });

  for (const invalidUser of users.invalidUsers) {
    test(`Login invalido con usuario ${invalidUser.username}`, async ({ loginPage }) => {
      await loginPage.goToLogin();
      await loginPage.validateLoginPageLoaded();
      await loginPage.login(invalidUser.username, invalidUser.password);

      await loginPage.validateErrorMessage(invalidUser.message);
    });
  }
});