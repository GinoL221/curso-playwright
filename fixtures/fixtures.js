const base = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const DashboardPage = require('../pages/DashboardPage');
const PimPage = require('../pages/PimPage');
const RecruitmentPage = require('../pages/Recruitments');

// Extendemos el test base de Playwright para incluir nuestras páginas
const test = base.test.extend({
  // Definimos una fixture para cada página
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  
  dashboardPage: async ({ page }, use) => {
    const dashboardPage = new DashboardPage(page);
    await use(dashboardPage);
  },

  pimPage: async ({ page }, use) => {
    const pimPage = new PimPage(page);
    await use(pimPage);
  },

  recruitmentPage: async ({ page }, use) => {
    const recruitmentPage = new RecruitmentPage(page);
    await use(recruitmentPage);
  },
});

module.exports = { test, expect: base.expect };
