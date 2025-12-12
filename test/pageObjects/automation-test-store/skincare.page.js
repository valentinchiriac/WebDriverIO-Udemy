import BasePage from "./base.page";
import ItemComponent from "../automation-test-store/components/item.comp";
import HeaderNavComponent from "../automation-test-store/components/header-nav.comp";
import CartPage from "../automation-test-store/cart.page";

class SkinCarePage extends BasePage {
  get itemComponent() {
    return ItemComponent;
  }

  async addSpecificItems_ValidateTotal(item1, item2) {
    const skincareProducts_Header_Links = await ItemComponent.itemHeaderLinks;

    const itemPrices = [];

    for (const header of skincareProducts_Header_Links) {
      const temporaryHeaderText = await header.getText();

      // below is for debugging purposes
      console.log(await header.getText());

      if (
        temporaryHeaderText.toLowerCase() == item1.toLowerCase() ||
        temporaryHeaderText.toLowerCase() == item2.toLowerCase()
      ) {
        const attribute = await header.getAttribute("href");

        const itemId = attribute.split("id=").pop();
        console.log(itemId);

        // //a[@data-id="66"]
        await $('//a[@data-id="' + itemId + '"]').click();

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

    const formattedItemPrices = [];
    itemPrices.forEach((price) => {
      formattedItemPrices.push(price.replace("$", ""));
    });

    var itemsTotalPrice = 0;
    formattedItemPrices.forEach(
      (price) => (itemsTotalPrice += parseFloat(price))
    );

    console.log("Items total price is " + itemsTotalPrice);

    await HeaderNavComponent.cartLink.click();
    await expect(browser).toHaveUrl(expect.stringContaining("checkout"));

    var temporaryShipingRate = await CartPage.shippingRate.getText();
    var shippingRate = temporaryShipingRate.replace("$", "");
    itemsTotalPrice = itemsTotalPrice + parseFloat(shippingRate);
    console.log("Items total price + Shipping Rate: " + itemsTotalPrice); //260$

    //extracting cart total
    var cartTotal = await CartPage.totalCartAmount.getText();
    cartTotal = cartTotal.replace("$", "");
    await expect(itemsTotalPrice).toEqual(parseFloat(cartTotal));

    await browser.pause(3000);
  }
}
export default new SkinCarePage();
