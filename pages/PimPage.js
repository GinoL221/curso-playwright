const { expect } = require('@playwright/test');
const BasePage = require('./BasePage');

class PimPage extends BasePage {
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

  async validatePimPageLoaded() {
    await expect(this.page).toHaveURL(/pim/);
    await expect(this.pimTitle).toHaveText('PIM');
  }

  async validatePimMainElements() {
    await expect(this.employeeNameLabel).toBeVisible();
    await expect(this.employeeIdLabel).toBeVisible();
    await expect(this.searchButton).toBeVisible();
    await expect(this.resetButton).toBeVisible();
    await expect(this.addButton).toBeVisible();
  }

  async addEmployee(firstName, lastName) {
    await this.click(this.addButton);
    await this.fill(this.firstNameInput, firstName);
    await this.fill(this.lastNameInput, lastName);
    await this.click(this.saveButton);
  }

  async searchEmployeeById(id) {
    await this.fill(this.idSearchInput, id);
    await this.click(this.searchButton);
  }
}

module.exports = PimPage;