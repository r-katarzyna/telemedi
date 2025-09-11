import { test, expect } from '@playwright/test';
import { loginCredentials } from './testdata';
import { loginPageElements , homePageElements , makePrescriptionConsultationPageElements, documentationPageElements, menuBar, myData} from './locators';
import { testVariablesForSearchInput, testData } from './testvariables';
import { beforeEach } from 'node:test';

test.beforeEach('As a user I want to log in', async ({ page }) => {

    await page.goto(loginCredentials.url);
    await page.fill(loginPageElements.usernameInput, loginCredentials.username);
    await page.fill(loginPageElements.passwordInput, loginCredentials.password);
    await page.click(loginPageElements.loginBtn);

})


// 1. As a user i want to get an prescription //
test('As a user i want to get an prescription', async ({ page }) => {

    await page.click(homePageElements.makeAnAppointmentBtn);
    await page.click(homePageElements.prescriptionBtn);
    await page.click(makePrescriptionConsultationPageElements.searchInput);
    await page.fill(makePrescriptionConsultationPageElements.searchInput, testVariablesForSearchInput.medicine);
    
    const option = page.locator(makePrescriptionConsultationPageElements.option);
    await expect(option).toBeVisible();
    await option.click();
    
    await page.click(makePrescriptionConsultationPageElements.checkboxCheckAll);
    await page.getByText(makePrescriptionConsultationPageElements.scheduleForFreeBtn).click();

});

// 2. As a user I want to upload medical documentation //
test('As a user i want to upload medical documentation', async({page}) => {

    await page.getByText(documentationPageElements.documentationBtn).click();    
    await page.getByText(documentationPageElements.uploadFileBtn).click();
    await page.getByText(documentationPageElements.dragAndDropBtn).click();
    const inputFile = page.locator(documentationPageElements.inputTypeFile);
    await inputFile.setInputFiles(testData.pdfFilePath);

    /*Sprawdzić
    const chosenFileTitle = page.getByText("Wybrany plik:");
    await expect(choosenFileTitle).toBeAttached();
    const chosenFile = page.getByText("przykladowy-plik-pdf.pdf (Brak podglądu)")
    await expect(chosenFile).toBeAttached();*/

    await page.locator(documentationPageElements.addBtn).click();
    
    const firstRow = page.locator(documentationPageElements.tableFirstRow).first();
    await expect(firstRow).toContainText(testData.testPdfFile);

});

// 3. As a user I want to log out //
test('As a user I want to log out', async ({ page }) => {

    await page.waitForTimeout(15000);
    await page.getByLabel(menuBar.menuBtn).click();
    await page.getByText(menuBar.logOutBtn).click();

    await expect(page.locator(loginPageElements.usernameInput)).toBeAttached();
    await expect(page.locator(loginPageElements.passwordInput)).toBeAttached();
    await expect(page.locator(loginPageElements.loginBtn)).toBeAttached(); 

});

// 4. As a user I want to edit my pesronal data //
test('As a user I want to edit my personal data', async ({ page }) => {

    await page.waitForTimeout(15000);
    await page.getByLabel(menuBar.menuBtn).click();
    await page.getByText(menuBar.myDataOption).click();
    await page.waitForTimeout(15000);
    await page.locator('div').filter({ hasText: /^Dane personalneEdytuj$/ }).getByRole('button').click();
    /*część: /^Dane personalneEdytuj$/ to wyrażenie regularne (RegExp) i oznacza:
    /.../	Oznacza wyrażenie regularne (nie zwykły tekst)
    ^	Początek tekstu
    Dane personalneEdytuj	Dokładny tekst, którego szukasz
    $	Koniec tekstu*/
    await page.getByText(myData.saveBtn).click();

    const nameDl = page.locator('dl').filter({ hasText: 'Imię' });
    const surnameDl = page.locator('dl').filter({ hasText: 'Nazwisko' });
    const nationalityDl = page.locator('dl').filter({ hasText: 'Obywatelstwo' });
    const personalIdNumberDl = page.locator('dl').filter({ hasText: 'PESEL' });
    const sexDl = page.locator('dl').filter({ hasText: 'Płeć' });
    const defaultTimezoneDl = page.locator('dl').filter({ hasText: 'Domyślna strefa czasowa' });
    await expect(nameDl).toContainText("Pacjent");  
    await expect(surnameDl).toContainText("Testowy"); 
    await expect(nationalityDl).toContainText("PL"); 
    await expect(personalIdNumberDl).toContainText("*6132"); 
    await expect(sexDl).toContainText("Mężczyzna"); 
    await expect(defaultTimezoneDl).toContainText("Europe/Warsaw");

});

// 5. As a user I want to change language //
test('As a user I want to change language', async ({ page }) => {

    await page.waitForTimeout(15000);
    await page.getByLabel("Profil użytkownika").click();
    await page.locator('div :has-text("Język:")').locator('[class = "MuiPaper-root MuiAccordion-root jss242 MuiPaper-elevation1"]').click();
    await page.getByText("English").click();

    await page.waitForTimeout(40000);
    await page.getByLabel("User profile").click();
    await page.waitForTimeout(15000);
    const languageMenu = page.locator('div :has-text("Language:")').locator('[class = "MuiPaper-root MuiAccordion-root jss242 MuiPaper-elevation1"]')
    await expect(languageMenu).toHaveText("Language: English");

});