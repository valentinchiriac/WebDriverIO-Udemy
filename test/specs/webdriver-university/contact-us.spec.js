import allureReporter from "@wdio/allure-reporter";
import ContactUsPage from "../../pageObjects/webdriver-university/contact-us.page";

const assert = require("assert");

describe("webdriver university - contact us page", function () {
  // this.retries(1);

  beforeEach(async () => {
    await ContactUsPage.open();
    //await browser.url('/Contact-Us/contactus.html');
    console.log("Browser capabilities:", browser.capabilities);
  });
  it("valid submission - all informations are provided correctly", async function () {
    // this.retries(2);
    allureReporter.addFeature("Contact us page - valid Submission");
    allureReporter.addDescription(
      "Validate contact Us page by submitting all data"
    );
    allureReporter.addSeverity("Critical");
    await ContactUsPage.submitForm_UsingRandomData(
      "Bruce Lee",
      "Van Damme",
    );

    await expect(ContactUsPage.successfulSubmissionHeader).toHaveText(
      "Thank You for your Message!"
    );
  });

  it("invalid submission - all informations are NOT provided correctly", async () => {
    allureReporter.addFeature("Contact us page - invalid Submission");
    allureReporter.addDescription(
      "Validate contact Us page by not submitting all data"
    );
    allureReporter.addSeverity("Medium");

    await ContactUsPage.submitForm("Sarah", "Bivolaru", "", "blabla!");

    await expect(ContactUsPage.unsuccessfulSubmissionHeader).toHaveText(expect.stringContaining(
      "Error: all fields are required")
    );
    await expect(ContactUsPage.unsuccessfulSubmissionHeader).toHaveText(expect.stringContaining(
      "Error: Invalid email address")
    );
  });

  it('only insert the first name', async() => {
    allureReporter.addFeature("Contact us page - only first name");
    allureReporter.addDescription(
      "Validate contact Us page by submitting only first name"
    );
    allureReporter.addSeverity("Medium");

    await ContactUsPage.submitForm("Serghei", "", "", "");

    await expect(ContactUsPage.unsuccessfulSubmissionHeader).toHaveText(expect.stringContaining(
      "Error: all fields are required")
    );
    await expect(ContactUsPage.unsuccessfulSubmissionHeader).toHaveText(expect.stringContaining(
      "Error: Invalid email address"));
  });
});