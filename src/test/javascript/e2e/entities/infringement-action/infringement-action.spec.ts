import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  InfringementActionComponentsPage,
  InfringementActionDeleteDialog,
  InfringementActionUpdatePage,
} from './infringement-action.page-object';

const expect = chai.expect;

describe('InfringementAction e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let infringementActionComponentsPage: InfringementActionComponentsPage;
  let infringementActionUpdatePage: InfringementActionUpdatePage;
  let infringementActionDeleteDialog: InfringementActionDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load InfringementActions', async () => {
    await navBarPage.goToEntity('infringement-action');
    infringementActionComponentsPage = new InfringementActionComponentsPage();
    await browser.wait(ec.visibilityOf(infringementActionComponentsPage.title), 5000);
    expect(await infringementActionComponentsPage.getTitle()).to.eq('infringementwebApp.infringementAction.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(infringementActionComponentsPage.entities), ec.visibilityOf(infringementActionComponentsPage.noResult)),
      1000
    );
  });

  it('should load create InfringementAction page', async () => {
    await infringementActionComponentsPage.clickOnCreateButton();
    infringementActionUpdatePage = new InfringementActionUpdatePage();
    expect(await infringementActionUpdatePage.getPageTitle()).to.eq('infringementwebApp.infringementAction.home.createOrEditLabel');
    await infringementActionUpdatePage.cancel();
  });

  it('should create and save InfringementActions', async () => {
    const nbButtonsBeforeCreate = await infringementActionComponentsPage.countDeleteButtons();

    await infringementActionComponentsPage.clickOnCreateButton();

    await promise.all([
      infringementActionUpdatePage.setProcessInstanceIdInput('processInstanceId'),
      infringementActionUpdatePage.setNotesInput('notes'),
      infringementActionUpdatePage.infringementActionTypeSelectLastOption(),
      infringementActionUpdatePage.setDateDoneInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      infringementActionUpdatePage.setDoneByInput('doneBy'),
      infringementActionUpdatePage.infringementSelectLastOption(),
    ]);

    expect(await infringementActionUpdatePage.getProcessInstanceIdInput()).to.eq(
      'processInstanceId',
      'Expected ProcessInstanceId value to be equals to processInstanceId'
    );
    expect(await infringementActionUpdatePage.getNotesInput()).to.eq('notes', 'Expected Notes value to be equals to notes');
    expect(await infringementActionUpdatePage.getDateDoneInput()).to.contain(
      '2001-01-01T02:30',
      'Expected dateDone value to be equals to 2000-12-31'
    );
    expect(await infringementActionUpdatePage.getDoneByInput()).to.eq('doneBy', 'Expected DoneBy value to be equals to doneBy');

    await infringementActionUpdatePage.save();
    expect(await infringementActionUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await infringementActionComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last InfringementAction', async () => {
    const nbButtonsBeforeDelete = await infringementActionComponentsPage.countDeleteButtons();
    await infringementActionComponentsPage.clickOnLastDeleteButton();

    infringementActionDeleteDialog = new InfringementActionDeleteDialog();
    expect(await infringementActionDeleteDialog.getDialogTitle()).to.eq('infringementwebApp.infringementAction.delete.question');
    await infringementActionDeleteDialog.clickOnConfirmButton();

    expect(await infringementActionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
