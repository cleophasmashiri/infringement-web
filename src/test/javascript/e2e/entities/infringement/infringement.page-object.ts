import { element, by, ElementFinder } from 'protractor';

export class InfringementComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-infringement div table .btn-danger'));
  title = element.all(by.css('jhi-infringement div h2#page-heading span')).first();
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

export class InfringementUpdatePage {
  pageTitle = element(by.id('jhi-infringement-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  processInstanceIdInput = element(by.id('field_processInstanceId'));
  infringementTypeInput = element(by.id('field_infringementType'));
  dateDoneInput = element(by.id('field_dateDone'));
  doneByInput = element(by.id('field_doneBy'));

  driverSelect = element(by.id('field_driver'));
  vehicleSelect = element(by.id('field_vehicle'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setProcessInstanceIdInput(processInstanceId: string): Promise<void> {
    await this.processInstanceIdInput.sendKeys(processInstanceId);
  }

  async getProcessInstanceIdInput(): Promise<string> {
    return await this.processInstanceIdInput.getAttribute('value');
  }

  async setInfringementTypeInput(infringementType: string): Promise<void> {
    await this.infringementTypeInput.sendKeys(infringementType);
  }

  async getInfringementTypeInput(): Promise<string> {
    return await this.infringementTypeInput.getAttribute('value');
  }

  async setDateDoneInput(dateDone: string): Promise<void> {
    await this.dateDoneInput.sendKeys(dateDone);
  }

  async getDateDoneInput(): Promise<string> {
    return await this.dateDoneInput.getAttribute('value');
  }

  async setDoneByInput(doneBy: string): Promise<void> {
    await this.doneByInput.sendKeys(doneBy);
  }

  async getDoneByInput(): Promise<string> {
    return await this.doneByInput.getAttribute('value');
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

  async vehicleSelectLastOption(): Promise<void> {
    await this.vehicleSelect.all(by.tagName('option')).last().click();
  }

  async vehicleSelectOption(option: string): Promise<void> {
    await this.vehicleSelect.sendKeys(option);
  }

  getVehicleSelect(): ElementFinder {
    return this.vehicleSelect;
  }

  async getVehicleSelectedOption(): Promise<string> {
    return await this.vehicleSelect.element(by.css('option:checked')).getText();
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

export class InfringementDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-infringement-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-infringement'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
