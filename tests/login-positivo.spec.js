const { test } = require('../fixtures/fixtures');
const users = require('../data/users.json');

test('Login exitoso', async ({ loginPage, dashboardPage }) => {
  // Arrange
  await loginPage.goToLogin();

  // Act
  await loginPage.login(users.validUser.username, users.validUser.password);

  // Assert
  await dashboardPage.validarDashboard();
});