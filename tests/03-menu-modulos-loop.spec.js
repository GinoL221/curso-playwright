const { test, expect } = require('../fixtures/fixtures');
const users = require('../data/users.json');

test('Validar que el modulo PIM existe en el menu', async ({ loginPage, dashboardPage }) => {
  await loginPage.goToLogin();
  await loginPage.login(users.validUser.username, users.validUser.password);

  await dashboardPage.validateDashboardLoaded();

  const modulos = dashboardPage.menuItems;
  const cantidad = await modulos.count();
  let moduloEncontrado = false;

  for (let i = 0; i < cantidad; i++) {
    const nombreModulo = await modulos.nth(i).textContent();
    const texto = nombreModulo?.trim();

    if (texto === 'PIM') {
      moduloEncontrado = true;
      break;
    }
  }

  expect(moduloEncontrado).toBeTruthy();
});