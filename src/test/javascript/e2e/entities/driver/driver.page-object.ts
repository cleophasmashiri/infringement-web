import { element, by, ElementFinder } from 'protractor';

export class DriverComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-driver div table .btn-danger'));
  title = element.all(by.css('jhi-driver div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class DriverUpdatePage {
  pageTitle = element(by.id('jhi-driver-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  firstNameInput = element(by.id('field_firstName'));
  lastNameInput = element(by.id('field_lastName'));
  middleNameInput = element(by.id('field_middleName'));
  emailInput = element(by.id('field_email'));
  nationalIdNumberInput = element(by.id('field_nationalIdNumber'));
  cellNumberInput = element(by.id('field_cellNumber'));
  provinceInput = element(by.id('field_province'));
  cityInput = element(by.id('field_city'));
  suburbInput = element(by.id('field_suburb'));
  streetNameInput = element(by.id('field_streetName'));
  streetPropertyNumberInput = element(by.id('field_streetPropertyNumber'));
  unitNumberInput = element(by.id('field_unitNumber'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setFirstNameInput(firstName: string): Promise<void> {
    await this.firstNameInput.sendKeys(firstName);
  }

  async getFirstNameInput(): Promise<string> {
    return await this.firstNameInput.getAttribute('value');
  }

  async setLastNameInput(lastName: string): Promise<void> {
    await this.lastNameInput.sendKeys(lastName);
  }

  async getLastNameInput(): Promise<string> {
    return await this.lastNameInput.getAttribute('value');
  }

  async setMiddleNameInput(middleName: string): Promise<void> {
    await this.middleNameInput.sendKeys(middleName);
  }

  async getMiddleNameInput(): Promise<string> {
    return await this.middleNameInput.getAttribute('value');
  }

  async setEmailInput(email: string): Promise<void> {
    await this.emailInput.sendKeys(email);
  }

  async getEmailInput(): Promise<string> {
    return await this.emailInput.getAttribute('value');
  }

  async setNationalIdNumberInput(nationalIdNumber: string): Promise<void> {
    await this.nationalIdNumberInput.sendKeys(nationalIdNumber);
  }

  async getNationalIdNumberInput(): Promise<string> {
    return await this.nationalIdNumberInput.getAttribute('value');
  }

  async setCellNumberInput(cellNumber: string): Promise<void> {
    await this.cellNumberInput.sendKeys(cellNumber);
  }

  async getCellNumberInput(): Promise<string> {
    return await this.cellNumberInput.getAttribute('value');
  }

  async setProvinceInput(province: string): Promise<void> {
    await this.provinceInput.sendKeys(province);
  }

  async getProvinceInput(): Promise<string> {
    return await this.provinceInput.getAttribute('value');
  }

  async setCityInput(city: string): Promise<void> {
    await this.cityInput.sendKeys(city);
  }

  async getCityInput(): Promise<string> {
    return await this.cityInput.getAttribute('value');
  }

  async setSuburbInput(suburb: string): Promise<void> {
    await this.suburbInput.sendKeys(suburb);
  }

  async getSuburbInput(): Promise<string> {
    return await this.suburbInput.getAttribute('value');
  }

  async setStreetNameInput(streetName: string): Promise<void> {
    await this.streetNameInput.sendKeys(streetName);
  }

  async getStreetNameInput(): Promise<string> {
    return await this.streetNameInput.getAttribute('value');
  }

  async setStreetPropertyNumberInput(streetPropertyNumber: string): Promise<void> {
    await this.streetPropertyNumberInput.sendKeys(streetPropertyNumber);
  }

  async getStreetPropertyNumberInput(): Promise<string> {
    return await this.streetPropertyNumberInput.getAttribute('value');
  }

  async setUnitNumberInput(unitNumber: string): Promise<void> {
    await this.unitNumberInput.sendKeys(unitNumber);
  }

  async getUnitNumberInput(): Promise<string> {
    return await this.unitNumberInput.getAttribute('value');
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class DriverDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-driver-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-driver'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
