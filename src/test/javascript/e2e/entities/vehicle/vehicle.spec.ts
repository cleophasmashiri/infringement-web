import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { VehicleComponentsPage, VehicleDeleteDialog, VehicleUpdatePage } from './vehicle.page-object';

const expect = chai.expect;

describe('Vehicle e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let vehicleComponentsPage: VehicleComponentsPage;
  let vehicleUpdatePage: VehicleUpdatePage;
  let vehicleDeleteDialog: VehicleDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Vehicles', async () => {
    await navBarPage.goToEntity('vehicle');
    vehicleComponentsPage = new VehicleComponentsPage();
    await browser.wait(ec.visibilityOf(vehicleComponentsPage.title), 5000);
    expect(await vehicleComponentsPage.getTitle()).to.eq('infringementwebApp.vehicle.home.title');
    await browser.wait(ec.or(ec.visibilityOf(vehicleComponentsPage.entities), ec.visibilityOf(vehicleComponentsPage.noResult)), 1000);
  });

  it('should load create Vehicle page', async () => {
    await vehicleComponentsPage.clickOnCreateButton();
    vehicleUpdatePage = new VehicleUpdatePage();
    expect(await vehicleUpdatePage.getPageTitle()).to.eq('infringementwebApp.vehicle.home.createOrEditLabel');
    await vehicleUpdatePage.cancel();
  });

  it('should create and save Vehicles', async () => {
    const nbButtonsBeforeCreate = await vehicleComponentsPage.countDeleteButtons();

    await vehicleComponentsPage.clickOnCreateButton();

    await promise.all([
      vehicleUpdatePage.setPlateNumberInput('plateNumber'),
      vehicleUpdatePage.setMakeInput('make'),
      vehicleUpdatePage.setModelInput('model'),
      vehicleUpdatePage.setEngineNumberInput('engineNumber'),
      vehicleUpdatePage.setChassisNumberInput('chassisNumber'),
      vehicleUpdatePage.setColorInput('color'),
      vehicleUpdatePage.setYearFirstRegisteredInput('yearFirstRegistered'),
      vehicleUpdatePage.driverSelectLastOption(),
    ]);

    expect(await vehicleUpdatePage.getPlateNumberInput()).to.eq('plateNumber', 'Expected PlateNumber value to be equals to plateNumber');
    expect(await vehicleUpdatePage.getMakeInput()).to.eq('make', 'Expected Make value to be equals to make');
    expect(await vehicleUpdatePage.getModelInput()).to.eq('model', 'Expected Model value to be equals to model');
    expect(await vehicleUpdatePage.getEngineNumberInput()).to.eq(
      'engineNumber',
      'Expected EngineNumber value to be equals to engineNumber'
    );
    expect(await vehicleUpdatePage.getChassisNumberInput()).to.eq(
      'chassisNumber',
      'Expected ChassisNumber value to be equals to chassisNumber'
    );
    expect(await vehicleUpdatePage.getColorInput()).to.eq('color', 'Expected Color value to be equals to color');
    expect(await vehicleUpdatePage.getYearFirstRegisteredInput()).to.eq(
      'yearFirstRegistered',
      'Expected YearFirstRegistered value to be equals to yearFirstRegistered'
    );

    await vehicleUpdatePage.save();
    expect(await vehicleUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await vehicleComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Vehicle', async () => {
    const nbButtonsBeforeDelete = await vehicleComponentsPage.countDeleteButtons();
    await vehicleComponentsPage.clickOnLastDeleteButton();

    vehicleDeleteDialog = new VehicleDeleteDialog();
    expect(await vehicleDeleteDialog.getDialogTitle()).to.eq('infringementwebApp.vehicle.delete.question');
    await vehicleDeleteDialog.clickOnConfirmButton();

    expect(await vehicleComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
