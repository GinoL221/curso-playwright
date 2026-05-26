const { test } = require('../fixtures/fixtures');
const users = require('../data/users.json');

test('Validar que el usuario se muestra en el dashboard', async ({ loginPage, dashboardPage }) => {
  // Arrange
  await loginPage.goToLogin();
  await loginPage.login(users.validUser.username, users.validUser.password);

  // Assert
  await dashboardPage.validateDashboardLoaded();
  await dashboardPage.validateLoggedUserVisible();
});