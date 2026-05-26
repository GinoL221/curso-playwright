// @ts-check

const BasePage = require('./BasePage');

/**
 * Página de reclutamiento con validaciones y búsqueda de candidatos
 * @extends {BasePage}
 */
class Recruitment extends BasePage {
  /**
   * Inicializa locators utilizados en la sección de reclutamiento
   * @param {import('@playwright/test').Page} page - Instancia de página de Playwright
   */
  constructor(page) {
    super(page);

    this.recruitmentTitle = page.locator('h6');
    this.candidateNameInput = page.locator('input[placeholder="Type for hints..."]').first();
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.resetButton = page.getByRole('button', { name: 'Reset' });
    this.addButton = page.getByRole('button', { name: 'Add' });
  }

  /**
   * Retorna si la página de reclutamiento cargó correctamente
   * @returns {Promise<boolean>} true cuando URL y título de reclutamiento son correctos
   */
  async isRecruitmentPageVisible() {
    try {
      await this.page.waitForURL(/recruitment/);
      await this.waitForVisible(this.recruitmentTitle);

      const recruitmentTitleText = (await this.recruitmentTitle.innerText()).trim();

      return recruitmentTitleText === 'Recruitment';
    } catch {
      return false;
    }
  }

  /**
   * Retorna la visibilidad de los elementos principales de reclutamiento
   * @returns {Promise<boolean[]>} Arreglo de flags de visibilidad por elemento
   */
  async areRecruitmentPageElementsVisible() {
    const locators = [
      this.candidateNameInput,
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
   * Busca un candidato por nombre en la pantalla de reclutamiento
   * @param {string} name - Nombre del candidato a buscar
   * @returns {Promise<void>} Promesa resuelta cuando se ejecuta la búsqueda
   */
  async searchCandidate(name) {
    await this.fill(this.candidateNameInput, name);
    await this.click(this.searchButton);
  }
}

module.exports = Recruitment;
