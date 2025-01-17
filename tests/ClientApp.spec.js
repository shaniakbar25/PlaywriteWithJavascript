const { test, expect } = require('@playwright/test');

test("On ClientApp geting text of 1st product", async ({page})=>{
    const email ="arslanakbar712@gmail.com";
    const productName = 'ZARA COAT 3';
    const product = await page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator('#userEmail').fill(email);
    await page.locator('#userPassword').fill("Arslan123");
    await page.locator('[value="Login"]').click();
    await page.waitForLoadState('networkidle');
    
    // await page.locator('.card-body b').first().waitFor();
    const titles = await page.locator('.card-body b').allTextContents();
    console.log(titles);

    const count = await product.count();

    for(let i =0; i < count; i++){
        if(await product.nth(i).locator("b").textContent() === productName){            
            await product.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    const bool = page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();
    await page.locator("[placeholder*='Country']").pressSequentially("pak")
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionCount = await dropdown.locator("button").count();

    for(let i=0; i<optionCount; i++){
        
    const text = await dropdown.locator("button").nth(i).textContent();
        if(text === " Pakistan"){
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.locator(".action__submit").click();
    await expect(await page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");

    for(let i = 0; i < await rows.count(); ++i){
        const rowOrderId = await rows.nth(i).locator('th').textContent();
        if(orderId.includes(rowOrderId)){
            await rows.nth(i).locator('button').first().click();
            break;
        }
    }
    const orderIDDetail = await page.locator(".col-text").textContent();
    await expect(orderId.includes(orderIDDetail)).toBeTruthy();
});