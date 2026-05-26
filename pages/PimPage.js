// @ts-check

const BasePage = require('./BasePage');

/**
 * Página PIM con operaciones de validación, alta y búsqueda de empleados
 * @extends {BasePage}
 */
class PimPage extends BasePage {
  /**
   * Inicializa los locators principales de la sección PIM
   * @param {import('@playwright/test').Page} page - Instancia de página de Playwright
   */
  constructor(page) {
    super(page);

    this.pimTitle = page.locator('h6');
    this.employeeNameLabel = page.getByText('Employee Name', { exact: true });
    this.employeeIdLabel = page.getByText('Employee Id', { exact: true });
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.resetButton = page.getByRole('button', { name: 'Reset' });
    this.addButton = page.getByRole('button', { name: 'Add' });
    
    // Locators para agregar empleado
    this.firstNameInput = page.locator('input[name="firstName"]');
    this.lastNameInput = page.locator('input[name="lastName"]');
    this.saveButton = page.getByRole('button', { name: 'Save' });
    
    // Locators para búsqueda
    this.idSearchInput = page.locator('div.oxd-input-group:has-text("Employee Id") input');
  }

  /**
   * Retorna si la página PIM está cargada
   * @returns {Promise<boolean>} true cuando URL y título de PIM son correctos
   */
  async isPimPageVisible() {
    try {
      await this.page.waitForURL(/pim/);
      await this.waitForVisible(this.pimTitle);

      const pimTitleText = (await this.pimTitle.innerText()).trim();

      return pimTitleText === 'PIM';
    } catch {
      return false;
    }
  }

  /**
   * Retorna la visibilidad de los elementos principales de PIM
   * @returns {Promise<boolean[]>} Arreglo de flags de visibilidad por elemento
   */
  async arePimMainElementsVisible() {
    const locators = [
      this.employeeNameLabel,
      this.employeeIdLabel,
      this.searchButton,
      this.resetButton,
      this.addButton,
    ];

    const visibilityResults = [];

    for (const locator of locators) {
      try {
        await this.waitForVisible(locator);
        visibilityResults.push(true);
      } catch {
        visibilityResults.push(false);
      }
    }

    return visibilityResults;
  }

  /**
   * Agrega un nuevo empleado desde el formulario de alta
   * @param {string} firstName - Nombre del empleado
   * @param {string} lastName - Apellido del empleado
   * @returns {Promise<void>} Promesa resuelta cuando termina el guardado
   */
  async addEmployee(firstName, lastName) {
    await this.click(this.addButton);
    await this.fill(this.firstNameInput, firstName);
    await this.fill(this.lastNameInput, lastName);
    await this.click(this.saveButton);
  }

  /**
   * Busca un empleado por su identificador en la grilla de PIM
   * @param {string} id - Identificador del empleado a buscar
   * @returns {Promise<void>} Promesa resuelta cuando se ejecuta la búsqueda
   */
  async searchEmployeeById(id) {
    await this.fill(this.idSearchInput, id);
    await this.click(this.searchButton);
  }
}

module.exports = PimPage;
