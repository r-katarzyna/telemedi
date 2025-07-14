import { test, expect } from '@playwright/test';
import { loginCredentials } from './testdata';
import { loginPageElements , homePageElements , makePrescriptionConsultationPageElements } from './locators';
import { testVariablesForSearchInput } from './testvariables';


//1. As a user i want to get an prescription //
test('As a user i want to get an prescription', async ({ page }) => {

    await page.goto(loginCredentials.url);
    await page.fill(loginPageElements.usernameInput, loginCredentials.username);
    await page.fill(loginPageElements.passwordInput, loginCredentials.password);
    await page.click(loginPageElements.loginBtn);
    await page.click(homePageElements.makeAnAppointmentBtn);
    await page.click(homePageElements.prescriptionBtn);
    await page.click(makePrescriptionConsultationPageElements.searchInput);
    await page.fill(makePrescriptionConsultationPageElements.searchInput, testVariablesForSearchInput.medicine);
    await page.click(makePrescriptionConsultationPageElements.option);
    //xx//
});