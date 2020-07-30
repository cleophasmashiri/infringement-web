import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { DriverComponentsPage, DriverDeleteDialog, DriverUpdatePage } from './driver.page-object';

const expect = chai.expect;

describe('Driver e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let driverComponentsPage: DriverComponentsPage;
  let driverUpdatePage: DriverUpdatePage;
  let driverDeleteDialog: DriverDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Drivers', async () => {
    await navBarPage.goToEntity('driver');
    driverComponentsPage = new DriverComponentsPage();
    await browser.wait(ec.visibilityOf(driverComponentsPage.title), 5000);
    expect(await driverComponentsPage.getTitle()).to.eq('infringementwebApp.driver.home.title');
    await browser.wait(ec.or(ec.visibilityOf(driverComponentsPage.entities), ec.visibilityOf(driverComponentsPage.noResult)), 1000);
  });

  it('should load create Driver page', async () => {
    await driverComponentsPage.clickOnCreateButton();
    driverUpdatePage = new DriverUpdatePage();
    expect(await driverUpdatePage.getPageTitle()).to.eq('infringementwebApp.driver.home.createOrEditLabel');
    await driverUpdatePage.cancel();
  });

  it('should create and save Drivers', async () => {
    const nbButtonsBeforeCreate = await driverComponentsPage.countDeleteButtons();

    await driverComponentsPage.clickOnCreateButton();

    await promise.all([
      driverUpdatePage.setFirstNameInput('firstName'),
      driverUpdatePage.setLastNameInput('lastName'),
      driverUpdatePage.setMiddleNameInput('middleName'),
      driverUpdatePage.setEmailInput('email'),
      driverUpdatePage.setNationalIdNumberInput('nationalIdNumber'),
      driverUpdatePage.setCellNumberInput('cellNumber'),
      driverUpdatePage.setProvinceInput('province'),
      driverUpdatePage.setCityInput('city'),
      driverUpdatePage.setSuburbInput('suburb'),
      driverUpdatePage.setStreetNameInput('streetName'),
      driverUpdatePage.setStreetPropertyNumberInput('streetPropertyNumber'),
      driverUpdatePage.setUnitNumberInput('unitNumber'),
    ]);

    expect(await driverUpdatePage.getFirstNameInput()).to.eq('firstName', 'Expected FirstName value to be equals to firstName');
    expect(await driverUpdatePage.getLastNameInput()).to.eq('lastName', 'Expected LastName value to be equals to lastName');
    expect(await driverUpdatePage.getMiddleNameInput()).to.eq('middleName', 'Expected MiddleName value to be equals to middleName');
    expect(await driverUpdatePage.getEmailInput()).to.eq('email', 'Expected Email value to be equals to email');
    expect(await driverUpdatePage.getNationalIdNumberInput()).to.eq(
      'nationalIdNumber',
      'Expected NationalIdNumber value to be equals to nationalIdNumber'
    );
    expect(await driverUpdatePage.getCellNumberInput()).to.eq('cellNumber', 'Expected CellNumber value to be equals to cellNumber');
    expect(await driverUpdatePage.getProvinceInput()).to.eq('province', 'Expected Province value to be equals to province');
    expect(await driverUpdatePage.getCityInput()).to.eq('city', 'Expected City value to be equals to city');
    expect(await driverUpdatePage.getSuburbInput()).to.eq('suburb', 'Expected Suburb value to be equals to suburb');
    expect(await driverUpdatePage.getStreetNameInput()).to.eq('streetName', 'Expected StreetName value to be equals to streetName');
    expect(await driverUpdatePage.getStreetPropertyNumberInput()).to.eq(
      'streetPropertyNumber',
      'Expected StreetPropertyNumber value to be equals to streetPropertyNumber'
    );
    expect(await driverUpdatePage.getUnitNumberInput()).to.eq('unitNumber', 'Expected UnitNumber value to be equals to unitNumber');

    await driverUpdatePage.save();
    expect(await driverUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await driverComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Driver', async () => {
    const nbButtonsBeforeDelete = await driverComponentsPage.countDeleteButtons();
    await driverComponentsPage.clickOnLastDeleteButton();

    driverDeleteDialog = new DriverDeleteDialog();
    expect(await driverDeleteDialog.getDialogTitle()).to.eq('infringementwebApp.driver.delete.question');
    await driverDeleteDialog.clickOnConfirmButton();

    expect(await driverComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
