const { test, expect } = require('@playwright/test');
const exp = require('constants');

test.describe.configure({mode:'parallel'});
test("Popup validations", async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("https://google.com");
    // await page.goBack();
    // await page.goForward();

    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

    page.on("dialog",dialog => dialog.accept());
    await page.locator('#confirmbtn').click();

    await page.locator("#mousehover").hover();
    const framePage = page.frameLocator("#courses-iframe");
    await framePage.locator("li a[href*='lifetime-access']:visible").click();
    const textCheck = await framePage.locator(".text h2").textContent();
    console.log(textCheck.split(' ')[1]);

})

test("Screenshot & Visual comparision",async({page})=>
    {
        await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
        await expect(page.locator("#displayed-text")).toBeVisible();
        await page.locator('#displayed-text').screenshot({path:'partialScreenshot.png'});
        await page.locator("#hide-textbox").click();
        await page.screenshot({path: 'screenshot.png'});
        await expect(page.locator("#displayed-text")).toBeHidden();
    });

test('visual testing',async({page})=>
{
    //make payment -when you 0 balance
      await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    expect(await page.screenshot()).toMatchSnapshot('landing.png');

})
    