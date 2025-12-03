describe('async vs sync - webdriver example', () => {
    it('async vs sync', async () => {
        await browser.url("/");

        await expect(browser).toHaveUrl("https://webdriveruniversity.com/")
    });
});