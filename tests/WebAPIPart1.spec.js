const { test, expect, request } = require('@playwright/test');
const {APiUtils} = require('../utils/APiUtils');
const loginPayload = {userEmail: "arslanakbar712@gmail.com", userPassword: "Arslan123"};
const orderPayload= {orders:[{country: "Pakistan", productOrderedId: "6581ca979fd99c85e8ee7faf"}]};
let response;

test.beforeAll(async ()=>
{
    
    const apiContext = await request.newContext();
    const apiUtils = new APiUtils(apiContext,loginPayload);
    response = await apiUtils.createOrder(orderPayload);
    
})


   
test("@API Place The Order", async ({page})=>{
    
    page.addInitScript(value =>{
        window.localStorage.setItem('token', value);
    },response.token);


    const email ="arslanakbar712@gmail.com";
    const productName = 'ZARA COAT 3';
    const product = await page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
     
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");

    for(let i = 0; i < await rows.count(); ++i){
        const rowOrderId = await rows.nth(i).locator('th').textContent();
        if(response.orderId.includes(rowOrderId)){
            await rows.nth(i).locator('button').first().click();
            break;
        }
    }
    const orderIDDetail = await page.locator(".col-text").textContent();
    await expect(response.orderId.includes(orderIDDetail)).toBeTruthy();
    
});

