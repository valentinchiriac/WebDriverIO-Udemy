describe("add items to cart", () => {
  beforeEach(async () => {
    await browser.maximizeWindow();
    await browser.url("https://automationteststore.com/");
  });
  it("add specific 'skin care products' to basket and validate cart total sum", async () => {
    const skincareLinks = await $$("//a[contains(text(), 'Skincare')]");
    await skincareLinks[1].click();

    const skincareProducts_Header_Links = await $$(
      ".fixed_wrapper .prdocutname"
    );

    const itemPrices = [];

    for (const header of skincareProducts_Header_Links) {
      const temporaryHeaderText = await header.getText();

      if (
        temporaryHeaderText.toLowerCase() == "creme precieuse nuit 50ml" ||
        temporaryHeaderText.toLowerCase() == "total moisture facial cream"
      ) {
        const attribute = await header.getAttribute("href");
        //console.log(attribute);
        //https://automationteststore.com/index.php?rt=product/product&amp;path=43&amp;product_id=93
        //https://automationteststore.com/index.php?rt=product/product&amp;path=43&amp;product_id=66

        const itemId = attribute.split("id=").pop();
        console.log(itemId);

        // //a[@data-id="66"]
        await $('//a[@data-id="' + itemId + '"]').click();

        // //a[@data-id="93"]/following-sibling::div/div[@class='pricenew']
        // //a[@data-id="93"]/following-sibling::div/div[@class='oneprice']

        itemPrices.push(
          await $(
            "//a[@data-id='" +
              itemId +
              "']/following-sibling::div/div[@class='pricenew']" +
              "| //a[@data-id='" +
              itemId +
              "']/following-sibling::div/div[@class='oneprice']"
          ).getText()
        );
      }
    }

    // Format prices and calculate total (moved outside loop)
    const formattedItemPrices = [];
    itemPrices.forEach((price) => {
      formattedItemPrices.push(price.replace("$", ""));
    });

    var itemsTotalPrice = 0;
    formattedItemPrices.forEach(
      (price) => (itemsTotalPrice += parseFloat(price))
    );
    console.log("Items total price is " + itemsTotalPrice);
    await browser.pause(5000);
    
    
    await $("//span[text()='Cart']").click();
    await expect(browser).toHaveUrl(expect.stringContaining("checkout"));

    var temporaryShipingRate = await $("//span[text()='Flat Shipping Rate:']/ ../following-sibling::td").getText();
    var shippingRate = temporaryShipingRate.replace('$', '');
    itemsTotalPrice = itemsTotalPrice + parseFloat(shippingRate);
    console.log("Items total price + Shipping Rate: " + itemsTotalPrice); //260$

    //extracting cart total
    var cartTotal = await (await $("//span[text()='Total:']/ ../following-sibling::td")).getText();
    cartTotal = cartTotal.replace('$', '');
    await expect(itemsTotalPrice).toEqual(parseFloat(cartTotal));


    await browser.pause(3000);

  });
});
