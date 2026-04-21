const { expect } = require('@playwright/test');
const BasePage = require('./BasePage');

class Recruitment extends BasePage {
  constructor(page) {
    super(page);

    this.recruitmentTitle = page.locator('h6');
    }

  async validateRecruitmentPageLoaded() {
    await expect(this.page).toHaveURL(/recruitment/);
    await expect(this.recruitmentTitle).toHaveText('Recruitment');
  }

  async validateRecruitmentPageElements() {
    await expect(this.employeeNameLabel).toBeVisible();
    await expect(this.employeeIdLabel).toBeVisible();
    await expect(this.searchButton).toBeVisible();
    await expect(this.resetButton).toBeVisible();
  }
}

module.exports = Recruitment;