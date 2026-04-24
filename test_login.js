import puppeteer from 'puppeteer';
import fs from 'fs';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const logs = [];

  page.on('console', msg => {
    logs.push(`[${msg.type()}] ${msg.text()}`);
  });
  page.on('pageerror', error => {
    logs.push(`[PAGE ERROR] ${error.message}\n${error.stack}`);
  });
  page.on('requestfailed', request => {
    logs.push(`[REQUEST FAILED] ${request.url()} ${request.failure().errorText}`);
  });

  await page.goto('http://localhost:5173/login');
  await page.waitForSelector('input[type="email"]');
  
  await page.type('input[type="email"]', 'pranavac6@gmail.com');
  // I don't know the user's password, so I will intercept the signIn call!
  // Wait, I can't easily do that. 
  
  fs.writeFileSync('puppeteer_logs_real.txt', logs.join('\n'));
  await browser.close();
  console.log('Done');
})();
