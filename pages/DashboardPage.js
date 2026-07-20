// @ts-check

const BasePage = require('./BasePage');

/**
 * Página de dashboard con validaciones y navegación de menú principal
 * @extends {BasePage}
 */
class DashboardPage extends BasePage {
  /**
   * Inicializa locators usados en el dashboard
   * @param {import('@playwright/test').Page} page - Instancia de página de Playwright
   */
  constructor(page) {
    super(page);

    this.dashboardTitle = page.locator('h6');
    // Sin rol ni aria-label accesible en el markup de OrangeHRM; se usa la clase como único selector estable
    this.userDropdownName = page.locator('.oxd-userdropdown-name');
    this.searchInput = page.locator('input[placeholder="Search"]');
  }

  /**
   * Retorna si el dashboard cargó con URL, título y usuario visibles
   * @returns {Promise<boolean>} true cuando la vista principal de dashboard está lista
   */
  async isDashboardVisible() {
    try {
      await this.page.waitForURL(/dashboard/);
      await this.waitForVisible(this.dashboardTitle);
      await this.waitForVisible(this.userDropdownName);

      const titleText = (await this.dashboardTitle.innerText()).trim();

      return titleText === 'Dashboard';
    } catch {
      return false;
    }
  }

  /**
   * Verifica si una opción de menú específica está visible
   * @param {string} optionName - Nombre de la opción a validar
   * @returns {Promise<boolean>} true cuando la opción de menú es visible
   */
  async isMenuOptionVisible(optionName) {
    try {
      const option = this.page.getByRole('link', { name: optionName });
      await this.waitForVisible(option);

      return true;
    } catch {
      return false;
    }
  }

  /**
   * Verifica si múltiples opciones de menú están visibles
   * @param {string[]} options - Lista de opciones a validar
   * @returns {Promise<boolean[]>} Resultado booleano por cada opción evaluada
   */
  async areMultipleMenuOptionsVisible(options) {
    await this.page.getByRole('link', { name: options[0] }).waitFor();

    const visibleOptions = [];

    for (const option of options) {
      visibleOptions.push(await this.isMenuOptionVisible(option));
    }

    return visibleOptions;
  }

  /**
   * Busca una opción de menú escribiendo en el campo de búsqueda
   * @param {string} optionName - Nombre de la opción a buscar
   * @returns {Promise<void>} Promesa resuelta cuando termina la búsqueda
   */
  async searchMenuOption(optionName) {
    await this.fill(this.searchInput, optionName);
  }

  /**
   * Abre una opción de menú por su nombre visible
   * @param {string} optionName - Nombre de la opción de menú a abrir
   * @returns {Promise<void>} Promesa resuelta cuando se ejecuta el click
   */
  async openMenuOption(optionName) {
    await this.page.getByRole('link', { name: optionName }).click();
  }

  /**
   * Retorna si el nombre del usuario logueado es visible
   * @returns {Promise<boolean>} true cuando el nombre del usuario está visible
   */
  async isLoggedUserVisible() {
    try {
      await this.waitForVisible(this.userDropdownName);

      return true;
    } catch {
      return false;
    }
  }
}

module.exports = DashboardPage;
