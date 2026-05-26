const { test } = require('../fixtures/fixtures');
const users = require('../data/users.json');

test('Login con credenciales incorrectas', async ({ loginPage }) => {
  // Arrange
  await loginPage.goToLogin();

  // Act
  await loginPage.login(users.invalidUsers[0].username, users.invalidUsers[0].password);

  // Assert
  await loginPage.validateErrorMessage('Invalid credentials');
});