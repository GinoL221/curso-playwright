// @ts-check

const base = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const DashboardPage = require('../pages/DashboardPage');
const PimPage = require('../pages/PimPage');
const RecruitmentPage = require('../pages/Recruitments');

// Extendemos el test base de Playwright para incluir nuestras páginas

/**
 * Tipos de fixtures personalizados para reutilizar Page Objects en los tests
 * @typedef {object} AppFixtures
 * @property {LoginPage} loginPage - Fixture que inicializa LoginPage y expone setup/use/teardown
 * @property {DashboardPage} dashboardPage - Fixture que inicializa DashboardPage y expone setup/use/teardown
 * @property {PimPage} pimPage - Fixture que inicializa PimPage y expone setup/use/teardown
 * @property {RecruitmentPage} recruitmentPage - Fixture que inicializa RecruitmentPage y expone setup/use/teardown
 */

/** @type {import('@playwright/test').TestType<import('@playwright/test').PlaywrightTestArgs & import('@playwright/test').PlaywrightTestOptions, AppFixtures>} */
const test = base.test.extend({
  // Definimos una fixture para cada página
  /**
   * Crea y provee una instancia de LoginPage durante el ciclo setup/use/teardown del test
   * @param {{ page: import('@playwright/test').Page }} args - Argumentos base de Playwright
   * @param {(loginPage: LoginPage) => Promise<void>} use - Callback de uso de la fixture
   * @returns {Promise<void>} Promesa resuelta al completar el ciclo de fixture
   */
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  
  /**
   * Crea y provee una instancia de DashboardPage durante el ciclo setup/use/teardown del test
   * @param {{ page: import('@playwright/test').Page }} args - Argumentos base de Playwright
   * @param {(dashboardPage: DashboardPage) => Promise<void>} use - Callback de uso de la fixture
   * @returns {Promise<void>} Promesa resuelta al completar el ciclo de fixture
   */
  dashboardPage: async ({ page }, use) => {
    const dashboardPage = new DashboardPage(page);
    await use(dashboardPage);
  },

  /**
   * Crea y provee una instancia de PimPage durante el ciclo setup/use/teardown del test
   * @param {{ page: import('@playwright/test').Page }} args - Argumentos base de Playwright
   * @param {(pimPage: PimPage) => Promise<void>} use - Callback de uso de la fixture
   * @returns {Promise<void>} Promesa resuelta al completar el ciclo de fixture
   */
  pimPage: async ({ page }, use) => {
    const pimPage = new PimPage(page);
    await use(pimPage);
  },

  /**
   * Crea y provee una instancia de RecruitmentPage durante el ciclo setup/use/teardown del test
   * @param {{ page: import('@playwright/test').Page }} args - Argumentos base de Playwright
   * @param {(recruitmentPage: RecruitmentPage) => Promise<void>} use - Callback de uso de la fixture
   * @returns {Promise<void>} Promesa resuelta al completar el ciclo de fixture
   */
  recruitmentPage: async ({ page }, use) => {
    const recruitmentPage = new RecruitmentPage(page);
    await use(recruitmentPage);
  },
});

module.exports = { test, expect: base.expect };
