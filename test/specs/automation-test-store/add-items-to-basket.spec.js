import HomePage from "../../pageObjects/automation-test-store/home.page"
import SkinCarePage from "../../pageObjects/automation-test-store/skincare.page"

describe("add items to cart", () => {
  
  it("add specific 'skin care products' to basket and validate cart total sum", async () => {
    await HomePage.open();

    await HomePage.categoryMenuComponent.categoryMenuLink('Skincare')[1].click();

    await SkinCarePage.addSpecificItems_ValidateTotal("creme precieuse nuit 50ml", "total moisture facial cream");

  });
});
