
const fs = require('fs');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
const https = require('https');
const prompt = require('prompt-sync')();
const { USERNAME, PASSWORD } = require('./secret');

async function Task1a() {
  console.log("Starting Task1a...");  

  let browser = await puppeteer.launch({ headless: false, defaultViewport: false });
  let page = await browser.newPage();

  await page.goto("https://www.eais.go.kr/");

  await page.waitForSelector("button.btnLogin.btnLine.btnNormal.btnLine_blue");
  await page.click("button.btnLogin.btnLine.btnNormal.btnLine_blue");

  // if (browser) await browser.close();
}

async function Task1b() {
  puppeteer.use(StealthPlugin());
  puppeteer.use(AdblockerPlugin({ blockTrackers: true }));

  console.log("Starting Task1b...");  

  let browser = await puppeteer.launch({ headless: false, defaultViewport: false, args: ['--start-maximized'] });
  
  try {
    let page = await browser.newPage();
    await page.goto("https://pcsupport.lenovo.com/my/en");
  
    // handle account login
  
    await page.waitForXPath("(//button[@class='btn btn-default myaccount'])[1]");
    let buttonMyAccountHandle = await page.$x("(//button[@class='btn btn-default myaccount'])[1]");
    await buttonMyAccountHandle[0].hover();
  
    await page.waitForXPath("(//div[@class='account-field']/a[@class='account-signin'])[1]");
    let linkSignInHandle = await page.$x("(//div[@class='account-field']/a[@class='account-signin'])[1]");
    await linkSignInHandle[0].click();
  
    await page.waitForXPath("//input[@id='UserID']");
    let inputUsernameHandle = await page.$x("//input[@id='UserID']");
    await inputUsernameHandle[0].type("rarahim75@gmail.com");
  
    await page.waitForXPath("//input[@id='Password']");
    let inputPasswordHandle = await page.$x("//input[@id='Password']");
    await inputPasswordHandle[0].type("Farhan@02");
    
    await page.waitForXPath("//input[@id='captcha']");
  
    // solve captcha manually
    let answer = prompt("Enter verification code: ");
  
    let inputCaptchaHandle = await page.$x("//input[@id='captcha']");
    await inputCaptchaHandle[0].type(answer);
  
    let buttonSignInHandle = await page.$x("//div[@id='btnsignin']");
    await buttonSignInHandle[0].click();
  
    //----------------
  
    await page.waitForXPath("//input[@placeholder='Search PC Support']");
    let inputSearchHandle = await page.$x("//input[@placeholder='Search PC Support']");
    await inputSearchHandle[0].type("IdeaPad 1 14ALC7 Laptop");
    
    await page.waitForTimeout(1000);
  
    await inputSearchHandle[0].press("Enter");
  
    await page.waitForXPath("(//span[text()='Guides & Manuals'])[3]");
    await page.evaluate(() => { cancelCookieConfig(); });
    await page.waitForTimeout(3000);
  
    await page.click("#moli_close_btn");
  
    let buttonGuidesHandle = await page.$x("(//span[text()='Guides & Manuals'])[3]/..");
    await buttonGuidesHandle[0].click();
  
    await page.waitForXPath("(//a[contains(text(), 'View PDF')])[4]");
    let buttonSafetyHandle = await page.$x("(//a[contains(text(), 'View PDF')])[4]");
    await buttonSafetyHandle[0].click();
  
    await page.waitForTimeout(3000);
  
    let pages = await browser.pages();
  
    let url = await pages[2].url();
    console.log(url);
  
    https.get(url, (res) => {
      const file = fs.createWriteStream("download.pdf");
  
      res.pipe(file);
  
      file.on("finish", () => {
        file.close();
        console.log("File downloaded.");
      })
  
    });
  } catch (error) {
    console.error(error);
  } finally {
    if (browser) await browser.close();
    console.log("Done."); 
  }
}

async function Task1c() {
  puppeteer.use(StealthPlugin());
  puppeteer.use(AdblockerPlugin({ blockTrackers: true }));

  console.log("Starting Task1c...");  

  let browser = await puppeteer.launch({ headless: false, defaultViewport: false, args: ['--start-maximized'] });
  
  try {
    let page = await browser.newPage();
    await page.goto("https://pcsupport.lenovo.com/my/ko");
  
    // handle account login

    await page.waitForXPath("(//button[@class='btn btn-default myaccount'])[1]");
    let buttonMyAccountHandle = await page.$x("(//button[@class='btn btn-default myaccount'])[1]");
    await buttonMyAccountHandle[0].hover();
  
    await page.waitForXPath("(//div[@class='account-field']/a[@class='account-signin'])[1]");
    let linkSignInHandle = await page.$x("(//div[@class='account-field']/a[@class='account-signin'])[1]");
    await linkSignInHandle[0].click();
  
    await page.waitForXPath("//input[@id='UserID']");
    let inputUsernameHandle = await page.$x("//input[@id='UserID']");
    await inputUsernameHandle[0].type(USERNAME);
  
    await page.waitForXPath("//input[@id='Password']");
    let inputPasswordHandle = await page.$x("//input[@id='Password']");
    await inputPasswordHandle[0].type(PASSWORD);
    
    await page.waitForXPath("//input[@id='captcha']");
  
    // solve captcha manually
    let answer = prompt("Enter verification code: ");
  
    let inputCaptchaHandle = await page.$x("//input[@id='captcha']");
    await inputCaptchaHandle[0].type(answer);
  
    let buttonSignInHandle = await page.$x("//div[@id='btnsignin']");
    await buttonSignInHandle[0].click();
  
    //----------------
  
    await page.waitForXPath("//div[@class='supportSearchBox home-search']//input");
    let inputSearchHandle = await page.$x("//div[@class='supportSearchBox home-search']//input");
    await inputSearchHandle[0].type("IdeaPad 1 14ALC7 Laptop");
    
    await page.waitForTimeout(1000);
  
    await inputSearchHandle[0].press("Enter");
  
    await page.waitForXPath("(//li[@class='navtiles mse-task-for-psp-section-guides-manuals'])[3]/a");
    await page.evaluate(() => { cancelCookieConfig(); });
  
    // await page.click("#moli_close_btn");
  
    let buttonGuidesHandle = await page.$x("(//li[@class='navtiles mse-task-for-psp-section-guides-manuals'])[3]/a");
    await buttonGuidesHandle[0].click();
  
    await page.waitForXPath("(//div[@class='document_item_ug_one'])[4]//a");
    let buttonSafetyHandle = await page.$x("(//div[@class='document_item_ug_one'])[4]//a");
    await buttonSafetyHandle[0].click();
  
    await page.waitForTimeout(3000);
  
    let pages = await browser.pages();
  
    let url = await pages[2].url();
    console.log(url);
  
    https.get(url, (res) => {
      const file = fs.createWriteStream(".\\files\\download_ko.pdf");
  
      res.pipe(file);
  
      file.on("finish", () => {
        file.close();
        console.log("File downloaded.");
      })
    });
  } catch (error) {
    console.error(error);
  } finally {
    if (browser) await browser.close();
    console.log("Done."); 
  }
}

Task1c();