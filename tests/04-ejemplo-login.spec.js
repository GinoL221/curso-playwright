const { test, expect } = require('../fixtures/fixtures');
const users = require('../data/users.json');

test('Ejemplo de flujos de login (refactorizado)', async ({ loginPage, dashboardPage }) => {
  await loginPage.goToLogin();
  
  // Validar elementos iniciales
  await loginPage.validateLoginPageLoaded();
  
  // Intento fallido
  await loginPage.login('Admin', 'admin1');
  await loginPage.validateErrorMessage('Invalid credentials');
  
  // Intento exitoso
  await loginPage.login(users.validUser.username, users.validUser.password);
  await dashboardPage.validateDashboardLoaded();
  await dashboardPage.validateMenuOptionVisible('Admin');
});