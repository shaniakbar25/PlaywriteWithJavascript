const { test, expect } = require('@playwright/test');
const exp = require('constants');

test("Browser Context Playwrite test", async ({browser})=>{

    //chrome - plugins/ chookies
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
});

test.only("Page Playwrite test", async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    page.route('**/*.{jpg,png,jpeg}',route=> route.abort());
    console.log(await page.title());
    const userName = page.locator('#username');
    const signIn = page.locator('#signInBtn');
    const cardTitles = page.locator(".card-body a");
    
    page.on('request',request=> console.log(request.url()));
    page.on('response',response=> console.log(response.url(), response.status()));

    //css
    await userName.type("rahulshetty");
    await page.locator('[type="password"]').type("learning");
    await signIn.click();

    console.log(await page.locator("[style *='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');

    //type - fill
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await signIn.click();
    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.nth(2).textContent());
    const allTitles= await cardTitles.allTextContents();
    console.log(allTitles);
});

test("Google Page Playwrite test", async ({page})=>{

    await page.goto("https://google.com");
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
});

test("UI Control", async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    const userName = page.locator('#username');
    const signIn = page.locator('#signInBtn');
    const dropdown = page.locator('select');
    const documentLink = page.locator("[href*='documents-request']");

    //Handle Dropdown
    await dropdown.selectOption("consult");
    await page.locator(".radiotextsty").last().click();
    //Handle Radio Button and check assertions
    await page.locator("#okayBtn").click();
    expect(page.locator(".radiotextsty").last()).toBeChecked();
    await page.locator("#terms").click();
    expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    //assert on attribute
    await expect(documentLink).toHaveAttribute("class","blinkingText");
    
});

test("Handle Child Window", async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator('#username');
    const documentLink = page.locator("[href*='documents-request']");

    const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    documentLink.click(),//listen for any new page pending,reject,fullfilled
    ])//new page is open

    const text = await newPage.locator(".red").textContent();
    console.log(text);
    const arrayText = text.split("@")
    var domain = arrayText[1].split(" ")[0]
    console.log(domain);

    await page.locator(userName).type(domain);
});