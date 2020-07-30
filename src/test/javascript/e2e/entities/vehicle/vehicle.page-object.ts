import { element, by, ElementFinder } from 'protractor';

export class VehicleComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-vehicle div table .btn-danger'));
  title = element.all(by.css('jhi-vehicle div h2#page-heading span')).first();
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

export class VehicleUpdatePage {
  pageTitle = element(by.id('jhi-vehicle-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  plateNumberInput = element(by.id('field_plateNumber'));
  makeInput = element(by.id('field_make'));
  modelInput = element(by.id('field_model'));
  engineNumberInput = element(by.id('field_engineNumber'));
  chassisNumberInput = element(by.id('field_chassisNumber'));
  colorInput = element(by.id('field_color'));
  yearFirstRegisteredInput = element(by.id('field_yearFirstRegistered'));

  driverSelect = element(by.id('field_driver'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setPlateNumberInput(plateNumber: string): Promise<void> {
    await this.plateNumberInput.sendKeys(plateNumber);
  }

  async getPlateNumberInput(): Promise<string> {
    return await this.plateNumberInput.getAttribute('value');
  }

  async setMakeInput(make: string): Promise<void> {
    await this.makeInput.sendKeys(make);
  }

  async getMakeInput(): Promise<string> {
    return await this.makeInput.getAttribute('value');
  }

  async setModelInput(model: string): Promise<void> {
    await this.modelInput.sendKeys(model);
  }

  async getModelInput(): Promise<string> {
    return await this.modelInput.getAttribute('value');
  }

  async setEngineNumberInput(engineNumber: string): Promise<void> {
    await this.engineNumberInput.sendKeys(engineNumber);
  }

  async getEngineNumberInput(): Promise<string> {
    return await this.engineNumberInput.getAttribute('value');
  }

  async setChassisNumberInput(chassisNumber: string): Promise<void> {
    await this.chassisNumberInput.sendKeys(chassisNumber);
  }

  async getChassisNumberInput(): Promise<string> {
    return await this.chassisNumberInput.getAttribute('value');
  }

  async setColorInput(color: string): Promise<void> {
    await this.colorInput.sendKeys(color);
  }

  async getColorInput(): Promise<string> {
    return await this.colorInput.getAttribute('value');
  }

  async setYearFirstRegisteredInput(yearFirstRegistered: string): Promise<void> {
    await this.yearFirstRegisteredInput.sendKeys(yearFirstRegistered);
  }

  async getYearFirstRegisteredInput(): Promise<string> {
    return await this.yearFirstRegisteredInput.getAttribute('value');
  }

  async driverSelectLastOption(): Promise<void> {
    await this.driverSelect.all(by.tagName('option')).last().click();
  }

  async driverSelectOption(option: string): Promise<void> {
    await this.driverSelect.sendKeys(option);
  }

  getDriverSelect(): ElementFinder {
    return this.driverSelect;
  }

  async getDriverSelectedOption(): Promise<string> {
    return await this.driverSelect.element(by.css('option:checked')).getText();
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

export class VehicleDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-vehicle-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-vehicle'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
