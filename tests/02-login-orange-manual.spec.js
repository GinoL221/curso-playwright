import { test, expect } from '@playwright/test';

/*
1. Completar campos obligatorios de login

Este caso sirve para mostrar lo más básico:

abrir la página
encontrar campos
completar datos

Todavía no valida login, solo interacción.
*/
test('Completar campos obligatorios de login', async ({ page }) => {
  const usuario = 'Admin';
  const password = 'admin123';

  // Abrir la página de login
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  // Completar usuario y contraseña
  await page.fill('input[name="username"]', usuario);
  await page.fill('input[name="password"]', password);
});

/*
flujo real:

completar usuario
completar contraseña
hacer clic en Login
validar que entró correctamente

La validación se hace con la URL del dashboard.
*/
test('Login exitoso y acceso al dashboard', async ({ page }) => {
  const datosLogin = [
    { selector: 'input[name="username"]', valor: 'Admin' },
    { selector: 'input[name="password"]', valor: 'admin123' }
  ];

  // Abrir la página
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  // Completar credenciales
  for (const dato of datosLogin) {
    await page.fill(dato.selector, dato.valor);
  }

  // Hacer clic en el botón Login
  await page.click('button[type="submit"]');

  // Validar que la URL corresponda al dashboard
  await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
});

/**
hacemos login
validamos URL
validamos un elemento visible del dashboard
*/
test('Validar elemento visible en el dashboard', async ({ page }) => {
  const datosLogin = [
    { selector: 'input[name="username"]', valor: 'Admin' },
    { selector: 'input[name="password"]', valor: 'admin123' }
  ];

  // Abrir la página
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  // Completar credenciales
  for (const dato of datosLogin) {
    await page.fill(dato.selector, dato.valor);
  }

  // Iniciar sesión
  await page.click('button[type="submit"]');

  // Validar redirección al dashboard
  await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');

  // Validar texto visible en el dashboard
  await expect(page.locator('h6')).toHaveText('Dashboard');
});