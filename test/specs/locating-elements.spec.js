describe("locating elements in the web page", () => {
  beforeEach(async () => {
    await browser.maximizeWindow();
    await browser.url("https://selectors.webdriveruniversity.com/");
  });
  it("$ - locate elament", async () => {
    await browser.$("//a[@href='#portfolio']").click();
    //await browser.pause(2000);

    const webDriverButton = await $('[data-target="#portfolioModal1"]');
    await webDriverButton.click();
    //await browser.pause(2000);
  });

  it("$$ - locate multiple elements", async () => {
    const expectedTitles = [
      "#",
      "First",
      "Last",
      "Handle",
      "1",
      "2",
      "3",
      "Firstname",
      "Lastname",
      "Age",
    ];
    const actualTitles = [];
    const tableHeaderTitles = await $$("//table//th");
    for (const title of tableHeaderTitles) {
      //console.log(await title.getText());
      actualTitles.push(await title.getText());
    }
    expect(expectedTitles).toEqual(actualTitles);
  });
});
