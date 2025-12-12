import BasePage from "./base.page";

class CartPage extends BasePage{
    get shippingRate(){
        return $("//span[text()='Flat Shipping Rate:']/ ../following-sibling::td");
    }

    get totalCartAmount(){
        return $("//span[text()='Total:']/ ../following-sibling::td");
    }
}

export default new CartPage();