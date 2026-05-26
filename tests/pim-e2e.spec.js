// @ts-check

const { test, expect } = require('../fixtures/fixtures');
const users = require('../data/users.json');

test.describe('PIM - End to End', () => {
  
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToLogin();
    await loginPage.login(users.validUser.username, users.validUser.password);
  });

  test('Debe permitir agregar un nuevo empleado exitosamente', async ({ dashboardPage, pimPage }) => {
    const firstName = 'Gentleman';
    const lastName = 'Tester';

    // Navegar a PIM
    await dashboardPage.openMenuOption('PIM');
    const isPimPageVisible = await pimPage.isPimPageVisible();
    expect(isPimPageVisible).toBe(true);

    // Act: Agregar empleado
    await pimPage.addEmployee(firstName, lastName);

    // Assert: Verificar que redirigió a la página de detalles personales (o similar)
    // En OrangeHRM suele contener 'viewPersonalDetails' en la URL
    await pimPage.page.waitForURL(/viewPersonalDetails/);
  });

});
