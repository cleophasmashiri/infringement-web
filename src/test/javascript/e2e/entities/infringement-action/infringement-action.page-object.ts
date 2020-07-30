import { element, by, ElementFinder } from 'protractor';

export class InfringementActionComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-infringement-action div table .btn-danger'));
  title = element.all(by.css('jhi-infringement-action div h2#page-heading span')).first();
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

export class InfringementActionUpdatePage {
  pageTitle = element(by.id('jhi-infringement-action-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  processInstanceIdInput = element(by.id('field_processInstanceId'));
  notesInput = element(by.id('field_notes'));
  infringementActionTypeSelect = element(by.id('field_infringementActionType'));
  dateDoneInput = element(by.id('field_dateDone'));
  doneByInput = element(by.id('field_doneBy'));

  infringementSelect = element(by.id('field_infringement'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setProcessInstanceIdInput(processInstanceId: string): Promise<void> {
    await this.processInstanceIdInput.sendKeys(processInstanceId);
  }

  async getProcessInstanceIdInput(): Promise<string> {
    return await this.processInstanceIdInput.getAttribute('value');
  }

  async setNotesInput(notes: string): Promise<void> {
    await this.notesInput.sendKeys(notes);
  }

  async getNotesInput(): Promise<string> {
    return await this.notesInput.getAttribute('value');
  }

  async setInfringementActionTypeSelect(infringementActionType: string): Promise<void> {
    await this.infringementActionTypeSelect.sendKeys(infringementActionType);
  }

  async getInfringementActionTypeSelect(): Promise<string> {
    return await this.infringementActionTypeSelect.element(by.css('option:checked')).getText();
  }

  async infringementActionTypeSelectLastOption(): Promise<void> {
    await this.infringementActionTypeSelect.all(by.tagName('option')).last().click();
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

  async infringementSelectLastOption(): Promise<void> {
    await this.infringementSelect.all(by.tagName('option')).last().click();
  }

  async infringementSelectOption(option: string): Promise<void> {
    await this.infringementSelect.sendKeys(option);
  }

  getInfringementSelect(): ElementFinder {
    return this.infringementSelect;
  }

  async getInfringementSelectedOption(): Promise<string> {
    return await this.infringementSelect.element(by.css('option:checked')).getText();
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

export class InfringementActionDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-infringementAction-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-infringementAction'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
