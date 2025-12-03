const assert = require('assert');

describe('webdriver university - contact us page', () => {
    beforeEach(async() => {
        await browser.maximizeWindow();
        await browser.url('/Contact-Us/contactus.html');
        console.log(`>>Browser Object: + ${JSON.stringify(browser)}`);
    });
    it('valid submission - all informations are provided correctly', async() => {
        const firstName = await $('//*[@name="first_name"]')
        const lastName = await $('//*[@name="last_name"]');
        const emailAdress = await $('//*[@name="email"]');
        const message = await $('//*[@name="message"]');
        const submitButton = await $('//input[@value="SUBMIT"]');

        await firstName.setValue("Batman");
        await lastName.setValue("Van Damme");
        await emailAdress.setValue("batman@vandamme.com");
        await message.setValue("Bine v-am gasit! La multi ani colegi!");
        
        //await browser.debug();
        await submitButton.click();

        const successfulSubmissionHeader = $('#contact_reply > h1');
        console.log(`successfulSubmissionHeader Element: `+ JSON.stringify(await successfulSubmissionHeader))
        await expect(successfulSubmissionHeader).toHaveText('Thank You for your Message!')

        // Jest assertion:
        // const successfulSubmissionHeader2 = await $('#contact_reply > h1').getText();
        // await expect(successfulSubmissionHeader2).toEqual('Thank You for your Message!333')
    });
    it('invalid submission - all informations are NOT provided correctly', async() => {
        const firstName = await $('//*[@name="first_name"]')
        const lastName = await $('//*[@name="last_name"]');
        const message = await $('//*[@name="message"]');
        const submitButton = await $('//input[@value="SUBMIT"]');

        await firstName.setValue("Batman");
        await lastName.setValue("Van Damme");
        //await emailAdress.setValue("batman@vandamme.com");
        await message.setValue("Bine v-am gasit! La multi ani coaielor!");
        await submitButton.click();
        const unsuccessfulSubmissionHeader = await $('body');
        const bodyText = await unsuccessfulSubmissionHeader.getText();
        assert.ok(bodyText.includes('Error: all fields are required'), `Missing expected message: 'Error: all fields are required'\nActual: ${bodyText}`);
        assert.ok(bodyText.includes('Error: Invalid email address'), `Missing expected message: 'Error: Invalid email address'\nActual: ${bodyText}`);
    });
});