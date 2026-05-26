const { test, expect } = require('../fixtures/fixtures');
const users = require('../data/users.json');

test('Validar modulos del menu lateral', async ({ loginPage, dashboardPage }) => {
  // Arrange
  await loginPage.goToLogin();
  await loginPage.login(users.validUser.username, users.validUser.password);

  // Act
  await dashboardPage.validateDashboardLoaded();
  const modulos = dashboardPage.menuItems;
  const cantidad = await modulos.count();

  let moduloEncontrado = false;

  for (let i = 0; i < cantidad; i++) {
    const nombre = await modulos.nth(i).textContent();
    const texto = nombre?.trim();

    if (texto?.includes('PIM')) {
      moduloEncontrado = true;
      break;
    }
  }

  // Assert
  expect(moduloEncontrado).toBeTruthy();
});