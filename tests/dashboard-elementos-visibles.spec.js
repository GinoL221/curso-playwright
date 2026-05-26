const { test } = require('../fixtures/fixtures');
const users = require('../data/users.json');

test('Validar elementos visibles del menu lateral', async ({ loginPage, dashboardPage }) => {
  // Arrange
  await loginPage.goToLogin();
  await loginPage.login(users.validUser.username, users.validUser.password);

  // Act y Assert
  await dashboardPage.validateDashboardLoaded();
  await dashboardPage.validateMultipleMenuOptions(['Admin', 'PIM', 'Leave', 'Time']);
});