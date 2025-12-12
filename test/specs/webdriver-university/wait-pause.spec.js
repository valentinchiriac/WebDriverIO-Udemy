describe('wait commands - examples', () => {
    beforeEach(async() => {
        await browser.url("/Ajax-Loader/index.html")

        });
    it('pause command', async() => {
       const clickMeButton = await $("//*[text()='CLICK ME!']/..");
       
       await browser.pause(6000);
       await clickMeButton.click();
       //await browser.pause(1000);
    });

    it('waitForButtonToBeClickable', async() => {
        const clickMeButton = await $('#button1');

        //comanda de mai jos asteapta maxim 3 secunde dupa care pica testul
        //await clickMeButton.waitForClickable({timeout:3000});
        await clickMeButton.waitForClickable();
        await clickMeButton.click();
        //await browser.pause(1500);
        
    });

    it('waitForButtonToBeDisplayed', async() => {
        const clickMeButton = await $('#button1');
        await clickMeButton.waitForDisplayed();
        await clickMeButton.click();
    });

     it('waitForButtonToBeDisplayed', async() => {
        const clickMeButton = await $('#button1');
        await clickMeButton.waitForExist();
        await clickMeButton.click();
    });

    it('waitUntil', async() => {
        await browser.url("/Accordion/index.html");
        const loadingStatusMessage = await $('#text-appear-box');
        await loadingStatusMessage.waitUntil(async function(){
            return (await this.getText()) === 'LOADING COMPLETE.'
        },
    {
        timeout:15000,
        timeoutMsg: 'expected text to be different after 15 seconds.'
    })
    });
});