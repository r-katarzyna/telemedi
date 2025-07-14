import { test, expect } from '@playwright/test';
import { loginCredentials } from './testdata';
import { loginPageElements } from './locators';


//1. As a user i want to get an prescription //
test('As a user i want to get an prescription', async ({ page }) => {

    await page.goto(loginCredentials.url);
    await page.fill(loginPageElements.usernameInput, loginCredentials.username);
    await page.fill(loginPageElements.passwordInput, loginCredentials.password);
    await page.click(loginPageElements.loginBtn);
    await page.click(loginPageElements.makeAnAppointmentBtn);
    await page.click(loginPageElements.prescriptionBtn);

});