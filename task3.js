
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
const PDFExtract = require('pdf.js-extract').PDFExtract;
const { translate } = require('google-translate-api-browser');

async function Task3a() {
  const pdfExtract = new PDFExtract();
  const options = {};

  console.log("Starting Task3a...");  

  pdfExtract.extract(".\\files\\demo_123_merged.pdf", options)
    .then(async data => {
      let textList = [];

      data.pages[0].content.forEach(c => {
        if (c.str.trim().length > 0) textList.push(c.str);
      });

      console.log(textList);

      for (let i = 0; i < textList.length; i++) {
        translate(textList[i], { to: "en" })
        .then(res => {
          console.log(res.text)
        })
        .catch(err => {
          console.error(err);
        });
      }
    })
    .catch(err => console.error(err));
}

async function Task3b() {
  puppeteer.use(StealthPlugin());
  puppeteer.use(AdblockerPlugin({ blockTrackers: true }));

  console.log("Starting Task3b...");  

  let browser = await puppeteer.launch({ headless: false, defaultViewport: false });

  try {
    let page = await browser.newPage();
  
    await page.goto("https://translate.google.com/?sl=auto&tl=en&op=docs&hl=en");
  
    let fileToUpload = ".\\files\\demo_123_merged.pdf";
    if (fileToUpload.length == 0)
      throw new Error();

    await page.waitForXPath("(//*[@type='file'])[1]");
    const inputUploadHandle = await page.$x("(//*[@type='file'])[1]", { visible: true });
    await inputUploadHandle[0].uploadFile(fileToUpload);
  
    let buttonTranslate = await page.$x("//button/span[text()='Translate']/..");
    await buttonTranslate[0].click();
  
    await page.waitForXPath("//span[text()='Download translation']", { visible: true });
    // await page.waitForTimeout(1000);
  
    let buttonDownload = await page.$x("//span[text()='Download translation']/..");
    await buttonDownload[0].click();
    
    await page.waitForTimeout(3000);

  } catch (error) {
    console.error(error);
  } finally {
    // if (browser) await browser.close();
    console.log("Done.");  
  }
}

async function Task3c() {
  // puppeteer.use(StealthPlugin());
  puppeteer.use(AdblockerPlugin({ blockTrackers: true }));

  console.log("Starting Task3c..."); 

  let browser = await puppeteer.launch({ headless: false, defaultViewport: false });
  
  try {
    let page = await browser.newPage();
    await page.goto("https://www.onlinedoctranslator.com/en/translationform", { timeout: 120000 });

    let fileToUpload = ".\\files\\demo_123_merged.pdf";
    if (fileToUpload.length == 0)
      throw new Error();

    await page.waitForXPath("//input[@type='file']");
    const inputUploadHandle = await page.$x("//input[@type='file']", { visible: true, timeout: 120000 });
    await inputUploadHandle[0].uploadFile(fileToUpload);

    await page.waitForTimeout(3000);

    await page.waitForXPath("//select[@id='from']");
    let selectLanguageHandle = await page.$x("//select[@id='from']");
    await selectLanguageHandle[0].click();
    await selectLanguageHandle[0].select("ko");
    // await page.waitForTimeout(1000);
    // await selectLanguageHandle[0].click();

    await page.waitForXPath("//input[@id='translation-button' and not(@disabled)]", { visible: true });
    let buttonTranslateHandle = await page.$x("//input[@id='translation-button']");
    await buttonTranslateHandle[0].click();

    await page.waitForXPath("//a[@id='download-link']", { visible: true });
    let buttonDownload = await page.$x("//a[@id='download-link']");
    await buttonDownload[0].click();
    
  } catch (error) {
    console.error(error);
  } finally {
    // if (browser) await browser.close();
    console.log("Done.");  
  }
}

Task3b();