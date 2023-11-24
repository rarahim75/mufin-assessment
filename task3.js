
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
const PDFExtract = require('pdf.js-extract').PDFExtract;
const { translate } = require('google-translate-api-browser');

  /* 
    Task 3 was a bit tricky. First, i attempted to do it like what was suggested in the Performance
    Assessment guide i.e. extract the text content from PDF file, translate them and finally overlapping
    the original content in place (i believe that is what was meant in the guide). I searched for a
    good library that could extract text content from a PDF file but i could not find one which was
    reliable and accurate. I'm confident if i had more time, i would be able to find one but for the
    purpose of this demo, i had decided to try an alternative approach and that is to find free online PDF
    file translator and automate it to do exactly that.

    I tried with 2 websites.  One is DocTranslator (Task3b) and the other one Google Translator (Task3c).
    As DocTranslator still uses Google Translator behind the scene, it is slower than using Google Translator
    directly.

    So, for Task 3, my final solution is Task3c. Task3a is my latest attempt at using an NPM module to extract
    raw text content from PDF, but it did not work too well.
  */

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

async function Task3c() {
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

Task3c();