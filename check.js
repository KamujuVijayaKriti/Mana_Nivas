const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.on('console', msg => {
    console.log(`PAGE LOG: ${msg.type()} ${msg.text()}`);
  });

  page.on('pageerror', error => {
    console.log(`PAGE EXCEPTION: ${error.message}`);
  });

  await page.goto('https://kamujuvijayakriti.github.io/Mana_Nivas/', { waitUntil: 'networkidle0', timeout: 60000 });

  const content = await page.evaluate(() => {
    return document.body.innerText;
  });

  console.log("PAGE TEXT EXTRACT:");
  console.log(content.substring(0, 1000));
  
  await browser.close();
})();
