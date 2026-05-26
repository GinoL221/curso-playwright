// @ts-check

const { expect } = require('@playwright/test');
const BasePage = require('./BasePage');

/**
 * Página de login con acciones y validaciones del formulario de autenticación
 * @extends {BasePage}
 */
class LoginPage extends BasePage {
  /**
   * Inicializa los locators necesarios para interactuar con el login
   * @param {import('@playwright/test').Page} page - Instancia de página de Playwright
   */
  constructor(page) {
    super(page);

    // Actualizar estos locators si cambia la pantalla de login
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('button[type="submit"]');
    this.errorMessage = page.getByRole('alert');
    this.loginTitle = page.getByRole('heading', { name: /login/i });
  }

  /**
   * Abre la ruta de login de la aplicación
   * @returns {Promise<void>} Promesa resuelta cuando termina la navegación
   */
  async goToLogin() {
    await this.open('/web/index.php/auth/login');
  }

  /**
   * Retorna si los elementos principales del login están visibles
   * @returns {Promise<boolean>} true cuando todos los elementos están visibles
   */
  async isLoginPageVisible() {
    try {
      await this.waitForVisible(this.loginTitle);
      await this.waitForVisible(this.usernameInput);
      await this.waitForVisible(this.passwordInput);
      await this.waitForVisible(this.loginButton);

      return true;
    } catch {
      return false;
    }
  }

  /**
   * Completa el campo de usuario en el formulario de login
   * @param {string} username - Nombre de usuario a ingresar
   * @returns {Promise<void>} Promesa resuelta cuando el campo queda completo
   */
  async enterUsername(username) {
    await this.fill(this.usernameInput, username);
  }

  /**
   * Completa el campo de contraseña en el formulario de login
   * @param {string} password - Contraseña a ingresar
   * @returns {Promise<void>} Promesa resuelta cuando el campo queda completo
   */
  async enterPassword(password) {
    await this.fill(this.passwordInput, password);
  }

  /**
   * Hace click en el botón de ingreso
   * @returns {Promise<void>} Promesa resuelta cuando se ejecuta el click
   */
  async clickLogin() {
    await this.click(this.loginButton);
  }

  /**
   * Ejecuta el flujo completo de login con usuario y contraseña
   * @param {string} username - Nombre de usuario para autenticarse
   * @param {string} password - Contraseña para autenticarse
   * @returns {Promise<void>} Promesa resuelta cuando termina el flujo
   */
  async login(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  /**
   * Verifica que el mensaje de error contenga el texto esperado
   * @param {string} expectedMessage - Texto esperado en la alerta de error
   * @returns {Promise<void>} Promesa resuelta cuando la validación termina
   */
  async validateErrorMessage(expectedMessage) {
    await expect(this.errorMessage).toContainText(expectedMessage);
  }
}

module.exports = LoginPage;
