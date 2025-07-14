
import { testVariablesForSearchInput } from './testvariables';

//Login Page Elements//
export const loginPageElements = {
    usernameInput : "#username",
    passwordInput : "#password",
    loginBtn : 'button :text-is("Zaloguj się")'
};

//Home Page Elements//
export const homePageElements = {
    makeAnAppointmentBtn : 'button :text-is("Umów się")',
    prescriptionBtn : 'button :text-is("Recepta")'
};

//"make-prescription-consultation" Page Elements//
export const makePrescriptionConsultationPageElements = {
    searchInput : '#telemedico-widget #react-select-2-input',
    option : 'div.css-1gl4k7y > div : ' + testVariablesForSearchInput.dose
};
