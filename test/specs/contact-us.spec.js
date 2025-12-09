import allureReporter from "@wdio/allure-reporter";
import ContactUsPage from "../pageObjects/webdriver-university/contact-us.page";

const assert = require('assert');

describe('webdriver university - contact us page', function() {
    // this.retries(1);

    beforeEach(async() => {
        await ContactUsPage.open();
        //await browser.url('/Contact-Us/contactus.html');
        console.log(`>>Browser Object: + ${JSON.stringify(browser)}`);
    });
    it('valid submission - all informations are provided correctly', async function() {
        // this.retries(2);
        allureReporter.addFeature("Contact us page - valid Submission");
        allureReporter.addDescription("Validate contact Us page by submitting all data");
        allureReporter.addSeverity("Critical");
        // const firstName = await $('//*[@name="first_name"]')
        // const lastName = await $('//*[@name="last_name"]');
        // const emailAdress = await $('//*[@name="email"]');
        // const message = await $('//*[@name="message"]');
        // const submitButton = await $('//input[@value="SUBMIT"]');

        // await firstName.setValue("Batman");
        // await lastName.setValue("Van Damme");
        // await emailAdress.setValue("batman@vandamme.com");
        // await message.setValue("Bine v-am gasit! La multi ani colegi!");

        ContactUsPage.submitForm("Bruce Lee", "Van Damme", "batman@vandamme.com", "Bine v-am gasit! La multi ani colegi!");
        
        //await browser.debug();
        //await submitButton.click();
        //await browser.waitThenClick(submitButton);

        const successfulSubmissionHeader = $('#contact_reply > h1');
        console.log(`successfulSubmissionHeader Element: `+ JSON.stringify(await successfulSubmissionHeader))
        await expect(successfulSubmissionHeader).toHaveText('Thank You for your Message!')

        // Jest assertion:
        // const successfulSubmissionHeader2 = await $('#contact_reply > h1').getText();
        // await expect(successfulSubmissionHeader2).toEqual('Thank You for your Message!333')
    });

    it('invalid submission - all informations are NOT provided correctly', async() => {
        allureReporter.addFeature("Contact us page - invalid Submission");
        allureReporter.addDescription("Validate contact Us page by not submitting all data");
        allureReporter.addSeverity("Medium");
        // const firstName = await $('//*[@name="first_name"]')
        // const lastName = await $('//*[@name="last_name"]');
        // const message = await $('//*[@name="message"]');
        // const submitButton = await $('//input[@value="SUBMIT"]');

        // await firstName.setValue("Batman");
        // await lastName.setValue("Van Damme");
        // //await emailAdress.setValue("batman@vandamme.com");
        // await message.setValue("Bine v-am gasit! La multi ani colegi!");
        // await submitButton.click();

        ContactUsPage.submitForm("Sarah", "Bivolaru", "", "blabla!");

        const unsuccessfulSubmissionHeader = $('body');
        const bodyText = await unsuccessfulSubmissionHeader.getText();
        await expect(unsuccessfulSubmissionHeader).toHaveText('Error: all fields are required');
        await expect(unsuccessfulSubmissionHeader).toHaveText('Error: Invalid email address');
        //assert.ok(bodyText.includes('Error: all fields are required'), `Missing expected message: 'Error: all fields are required'\nActual: ${bodyText}`);
        //assert.ok(bodyText.includes('Error: Invalid email address'), `Missing expected message: 'Error: Invalid email address'\nActual: ${bodyText}`);
    });
});