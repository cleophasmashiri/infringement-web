import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { InfringementComponentsPage, InfringementDeleteDialog, InfringementUpdatePage } from './infringement.page-object';

const expect = chai.expect;

describe('Infringement e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let infringementComponentsPage: InfringementComponentsPage;
  let infringementUpdatePage: InfringementUpdatePage;
  let infringementDeleteDialog: InfringementDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Infringements', async () => {
    await navBarPage.goToEntity('infringement');
    infringementComponentsPage = new InfringementComponentsPage();
    await browser.wait(ec.visibilityOf(infringementComponentsPage.title), 5000);
    expect(await infringementComponentsPage.getTitle()).to.eq('infringementwebApp.infringement.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(infringementComponentsPage.entities), ec.visibilityOf(infringementComponentsPage.noResult)),
      1000
    );
  });

  it('should load create Infringement page', async () => {
    await infringementComponentsPage.clickOnCreateButton();
    infringementUpdatePage = new InfringementUpdatePage();
    expect(await infringementUpdatePage.getPageTitle()).to.eq('infringementwebApp.infringement.home.createOrEditLabel');
    await infringementUpdatePage.cancel();
  });

  it('should create and save Infringements', async () => {
    const nbButtonsBeforeCreate = await infringementComponentsPage.countDeleteButtons();

    await infringementComponentsPage.clickOnCreateButton();

    await promise.all([
      infringementUpdatePage.setProcessInstanceIdInput('processInstanceId'),
      infringementUpdatePage.setInfringementTypeInput('infringementType'),
      infringementUpdatePage.setDateDoneInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      infringementUpdatePage.setDoneByInput('doneBy'),
      infringementUpdatePage.driverSelectLastOption(),
      infringementUpdatePage.vehicleSelectLastOption(),
    ]);

    expect(await infringementUpdatePage.getProcessInstanceIdInput()).to.eq(
      'processInstanceId',
      'Expected ProcessInstanceId value to be equals to processInstanceId'
    );
    expect(await infringementUpdatePage.getInfringementTypeInput()).to.eq(
      'infringementType',
      'Expected InfringementType value to be equals to infringementType'
    );
    expect(await infringementUpdatePage.getDateDoneInput()).to.contain(
      '2001-01-01T02:30',
      'Expected dateDone value to be equals to 2000-12-31'
    );
    expect(await infringementUpdatePage.getDoneByInput()).to.eq('doneBy', 'Expected DoneBy value to be equals to doneBy');

    await infringementUpdatePage.save();
    expect(await infringementUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await infringementComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Infringement', async () => {
    const nbButtonsBeforeDelete = await infringementComponentsPage.countDeleteButtons();
    await infringementComponentsPage.clickOnLastDeleteButton();

    infringementDeleteDialog = new InfringementDeleteDialog();
    expect(await infringementDeleteDialog.getDialogTitle()).to.eq('infringementwebApp.infringement.delete.question');
    await infringementDeleteDialog.clickOnConfirmButton();

    expect(await infringementComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
