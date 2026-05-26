// @ts-check

/**
 * Clase base con acciones reutilizables para interactuar con páginas
 */
class BasePage {
  /**
   * Inicializa la página base con la instancia de Playwright
   * @param {import('@playwright/test').Page} page - Instancia de la página de Playwright
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Navega a una ruta relativa dentro de la aplicación
   * @param {string} path - Ruta relativa a abrir
   * @returns {Promise<void>} Promesa que se resuelve cuando la navegación finaliza
   */
  async open(path) {
    await this.page.goto(path);
  }

  /**
   * Hace click sobre un locator recibido por parámetro
   * @param {import('@playwright/test').Locator} locator - Locator del elemento a clickear
   * @returns {Promise<void>} Promesa que se resuelve al completar el click
   */
  async click(locator) {
    await locator.click();
  }

  /**
   * Completa un campo usando un locator y un valor de texto
   * @param {import('@playwright/test').Locator} locator - Locator del campo a completar
   * @param {string} value - Texto a ingresar en el campo
   * @returns {Promise<void>} Promesa que se resuelve cuando el campo queda completo
   */
  async fill(locator, value) {
    await locator.fill(value);
  }

  /**
   * Obtiene el texto interno de un elemento localizado
   * @param {import('@playwright/test').Locator} locator - Locator del elemento objetivo
   * @returns {Promise<string>} Texto interno del elemento
   */
  async getText(locator) {
    return await locator.innerText();
  }

  /**
   * Espera a que un elemento sea visible en pantalla
   * @param {import('@playwright/test').Locator} locator - Locator del elemento a esperar
   * @returns {Promise<void>} Promesa que se resuelve cuando el elemento está visible
   */
  async waitForVisible(locator) {
    await locator.waitFor({ state: 'visible' });
  }
}

module.exports = BasePage;
