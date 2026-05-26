// @ts-check

const { test, expect } = require('../fixtures/fixtures');
const users = require('../data/users.json');

test.describe('Login - OrangeHRM', () => {
  test('Login exitoso con usuario valido', async ({ loginPage, dashboardPage }) => {
    await loginPage.goToLogin();
    const isLoginPageVisible = await loginPage.isLoginPageVisible();
    expect(isLoginPageVisible).toBe(true);
    await loginPage.login(users.validUser.username, users.validUser.password);

    const isDashboardVisible = await dashboardPage.isDashboardVisible();
    expect(isDashboardVisible).toBe(true);
  });

  for (const invalidUser of users.invalidUsers) {
    test(`Login invalido con usuario ${invalidUser.username}`, async ({ loginPage }) => {
      await loginPage.goToLogin();
      const isLoginPageVisible = await loginPage.isLoginPageVisible();
      expect(isLoginPageVisible).toBe(true);
      await loginPage.login(invalidUser.username, invalidUser.password);

      await loginPage.validateErrorMessage(invalidUser.message);
    });
  }
});
