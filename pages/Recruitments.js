const { expect } = require('@playwright/test');
const BasePage = require('./BasePage');

class Recruitment extends BasePage {
  constructor(page) {
    super(page);

    this.recruitmentTitle = page.locator('h6');
    this.candidateNameInput = page.locator('input[placeholder="Type for hints..."]').first();
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.resetButton = page.getByRole('button', { name: 'Reset' });
    this.addButton = page.getByRole('button', { name: 'Add' });
  }

  async validateRecruitmentPageLoaded() {
    await expect(this.page).toHaveURL(/recruitment/);
    await expect(this.recruitmentTitle).toHaveText('Recruitment');
  }

  async validateRecruitmentPageElements() {
    await expect(this.candidateNameInput).toBeVisible();
    await expect(this.searchButton).toBeVisible();
    await expect(this.resetButton).toBeVisible();
    await expect(this.addButton).toBeVisible();
  }

  async searchCandidate(name) {
    await this.fill(this.candidateNameInput, name);
    await this.click(this.searchButton);
  }
}

module.exports = Recruitment;