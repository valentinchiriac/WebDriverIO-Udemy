import BasePage from "./base.page";
import DataGenerator from "../../../utils/data-generator";
import dataGenerator from "../../../utils/data-generator";

class ContactUsPage extends BasePage{
    open(){
        return super.open('/Contact-Us/contactus.html');
    }

    get inputFirstName(){
        return $('//*[@name="first_name"]');
    }

    get inputLastName(){
        return $('//*[@name="last_name"]');
    }

    get inputEmailAddress(){
        return $('//*[@name="email"]');
    }

    get inputMessage(){
        return $('//*[@name="message"]');
    }

    get submitButton(){
        return $('//input[@value="SUBMIT"]');
    }

    get successfulSubmissionHeader(){
        return $('#contact_reply > h1');
    }

    get unsuccessfulSubmissionHeader(){
        return $('body');
    }

    async submitForm(firstName, lastName, emailAddress, message){
        await this.inputFirstName.setValue(firstName);
        await this.inputLastName.setValue(lastName);
        await this.inputEmailAddress.setValue(emailAddress);
        await this.inputMessage.setValue(message);
        await this.submitButton.click();
    }

    async submitForm_UsingRandomData(firstName, lastName){
        await this.inputFirstName.setValue(firstName);
        await this.inputLastName.setValue(lastName);
        await this.inputEmailAddress.setValue("AutoEmail_" + dataGenerator.generateRandomSring() + "@endava.com");
        await this.inputMessage.setValue("AutoMessage_: " + dataGenerator.generateRandomSring());
        await this.submitButton.click();
    }
}
export default new ContactUsPage();