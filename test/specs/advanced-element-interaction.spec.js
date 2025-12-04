describe("advanced element interactions - examples", () => {
  beforeEach(async function () {
    await browser.maximizeWindow();
  });

  it("inputs", async () => {
    await browser.url("/Contact-Us/contactus.html");
    const firstNameInputField = $("input[placeholder='First Name']");

    await firstNameInputField.addValue("Add your text here");
    await firstNameInputField.addValue("My added text");
    await browser.pause(2000);

    await firstNameInputField.setValue("My new added text, returns!");
    await browser.pause(2000);

    await firstNameInputField.clearValue();
    await browser.pause(2000);
  });

  it("dropDownMenu", async () => {
    await browser.url("/Dropdown-Checkboxes-RadioButtons/index.html");
    const programmingLanguagesSelector = await $("#dropdowm-menu-1");
    await programmingLanguagesSelector.selectByAttribute("value", "python");
    await expect(programmingLanguagesSelector).toHaveValue("python");
    //await browser.pause(2000);

    const technologyOption = await $("#dropdowm-menu-2");
    await technologyOption.selectByIndex(2);
    await expect(technologyOption).toHaveValue("testNG", { ignoreCase: true });
    //await browser.pause(2000);

    const frontEndLanguage = await $("#dropdowm-menu-3");
    await frontEndLanguage.selectByVisibleText("CSS");
    await expect(frontEndLanguage).toHaveValue("CSS", { ignoreCase: true });
    //await browser.pause(2000);
  });

  it("state commands", async () => {
    await browser.url("/Dropdown-Checkboxes-RadioButtons/index.html");

    const lettuceRadioButton = await $('[value="lettuce"]');
    const lettuceRadioButton_isDisplayed =
      await lettuceRadioButton.isDisplayed();
    await expect(lettuceRadioButton_isDisplayed).toEqual(true);
    await expect(lettuceRadioButton).toBeEnabled();

    const lettuceRadioButton_isClickable =
      await lettuceRadioButton.isClickable();
    await expect(lettuceRadioButton_isClickable).toEqual(true);
    await browser.pause(2000);

    const cabbageRadioButton = await $('[value="cabbage"]');
    const cabbageRadioButton_isDisplayed =
      await cabbageRadioButton.isDisplayed();
    await expect(cabbageRadioButton_isDisplayed).toEqual(true);

    const cabbageRadioButton_isClickable =
      await cabbageRadioButton.isClickable();
    await expect(cabbageRadioButton_isClickable).toEqual(false);
  });
  it("actions on the web page", async () => {
    await browser.url("/Actions/index.html");

    //Drag and Drop
    const elementToBeDragged = await $("#draggable");
    const targetElement = await $("#droppable");
    await elementToBeDragged.dragAndDrop(targetElement);
    await browser.pause(2000);

    //Double Click
    const doubleClick = await $("#double-click");
    await doubleClick.doubleClick();
    await browser.pause(3000);

    //Mouse over and element
    await $("//button[text()='Hover Over Me First!']").moveTo();
    const firstLink = await $(
      "//div[@class='dropdown hover']//a[@class='list-alert'][normalize-space()='Link 1']"
    );
    await firstLink.waitForClickable();
    await firstLink.click();
    await browser.pause(3000);

    await $("//button[text()='Hover Over Me Second!']").moveTo();
    const secondLink = await $("(//*[text()='Link 1'])[2]");
    await secondLink.waitForClickable();
    await secondLink.click();
    await browser.pause(3000);

    await $("//button[text()='Hover Over Me Third!']").moveTo();
    const thirdLink = await $("(//*[text()='Link 1'])[3]");
    await thirdLink.waitForClickable();
    await thirdLink.click();
    await browser.pause(3000);
  });

  it("handling multiple web windows", async () => {
    await browser.url("https://webdriveruniversity.com/");
    await browser.newWindow("https://automationteststore.com/");

    let currentWindowTitle = await browser.getTitle();
    console.log(`>> Title of the current window is: ${currentWindowTitle}`);
    await expect(browser).toHaveUrl(
      expect.stringContaining("automationteststore")
    );
    await browser.pause(3000);

    await browser.switchWindow("webdriveruniversity.com");
    let parentWindowTitle = await browser.getTitle();
    console.log(`>>Parent Window Title: ${parentWindowTitle}`);
    await expect(browser).toHaveUrl(expect.stringContaining("webdriver"));
    await browser.pause(3000);

    await $("#contact-us").click();
    await browser.switchWindow("automationtest");
    await browser.closeWindow();

    await browser.switchWindow("webdriveruni");
    console.log(await browser.getTitle());
    await browser.pause(3000);
  });

  it("IFrames", async () => {
    await browser.url("/IFrame/index.html");
    const iFrame = $("#frame");
    await browser.switchFrame(iFrame);
    await $("//a[normalize-space()='Our Products']").click();
    await browser.switchToParentFrame();
    await browser.pause(3000);
  });

  it.only("Alerts handeling", async () => {
    await browser.url("/Popup-Alerts/index.html");
    await $("#button1").click();
    await browser.pause(4000);
    browser.acceptAlert();
    await browser.pause(2000);
  });

  it.only("Alerts handeling 2", async () => {
    await browser.url("/Popup-Alerts/index.html");
    await $("#button4").click();
    const alertText = await browser.getAlertText();
    await expect(alertText).toEqual('Press a button!');

    browser.acceptAlert();
    await expect($('#confirm-alert-text')).toHaveText('You pressed OK!');
    await browser.pause(3000);
  });
});