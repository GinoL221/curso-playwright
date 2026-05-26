// @ts-check

const { test, expect } = require('../fixtures/fixtures');
const users = require('../data/users.json');

test('Validar elementos visibles del menu lateral', async ({ loginPage, dashboardPage }) => {
  // Arrange
  await loginPage.goToLogin();
  await loginPage.login(users.validUser.username, users.validUser.password);

  // Act y Assert
  const isDashboardVisible = await dashboardPage.isDashboardVisible();
  expect(isDashboardVisible).toBe(true);

  const visibleOptions = await dashboardPage.areMultipleMenuOptionsVisible(['Admin', 'PIM', 'Leave', 'Time']);
  expect(visibleOptions.every(Boolean)).toBe(true);
});
