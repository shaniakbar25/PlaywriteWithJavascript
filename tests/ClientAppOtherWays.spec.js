const { test, expect } = require('@playwright/test');

test("On ClientApp geting text of 1st product", async ({page})=>{
    const email ="arslanakbar712@gmail.com";
    const productName = 'ZARA COAT 3';
    const product = await page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    await page.getByPlaceholder('email@example.com').fill(email);
    await page.getByPlaceholder('enter your passsword').fill("Arslan123");
    await page.getByRole('button', {name:"Login"}).click();
    await page.waitForLoadState('networkidle');
    await page.locator('.card-body b').first().waitFor();

    await page.locator(".card-body").filter({hasText:"ZARA COAT 3"}).getByRole("button", {name:"Add to Cart"}).click();
    await page.getByRole("listitem").getByRole("button",{name:"CART"}).click();
    await expect(page.getByText('ZARA COAT 3')).toBeVisible();
    
    await page.getByRole("button", {name:"Checkout"}).click();


    await page.getByPlaceholder("Select Country").pressSequentially("pak")
    
    await page.getByRole("button", {name:"Pakistan"}).click();
    await page.getByText("PLACE ORDER").click();
    await expect(page.getByText("Thankyou for the order.")).toBeVisible();

    
});