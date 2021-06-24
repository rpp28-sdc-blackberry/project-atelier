import puppeteer from 'puppeteer';
import { spawn } from 'child_process';
import { last } from 'lodash';

let browser;
let serverProcess;

//URL that the webserver will serve our webstie under
const testUrl = 'http://localhost:8080';

beforeAll(async () => {
  //wait until a local webserver is started to test against.
  await new Promise(resolve => {
    serverProcess = spawn('live-server', [`--port=${testUrl.split(':')[2]}`, '--no-browser']);
    // Better wait for a first response from the server to ensure the website is available.
    serverProcess.stdout.on('data', resolve);
  });

  browser = await puppeteer.launch({
    headless: false,
    slowMo: 500
  });
});

afterAll(async () => {
    // Cleanup everything that is still running after all tests are through.
    serverProcess.kill();
    // await browser.close()
});

beforeEach(async () => {
  // Get a new page for each test so that we start fresh.
  page = await browser.newPage();
});
  
afterEach(async () => {
  // Remember to close pages after tests.
  // await page.close()
});

describe('ThumbnailList', () => {
// first two tests can't be run at the same time as the last two tests - run into execution context errors
// must use product_id='22126' to pass last three tests
  xit('should have 7 thumbnails', async () => {
    await page.goto(testUrl);
    return page.$$('.stylePhotodefault')
      .then((thumbnails) => {
        expect(thumbnails.length).toBe(7);
      });
  })
  xit('should have 7 thumbnails after up-click with the correct indices', async () => {
    await page.goto(testUrl);
    const upScroll = await page.waitForSelector('#upScroll-container');
    upScroll.click()
      .then(() => {
        const thumbnails = page.$$('#stylePhotodefault');
        const firstThumbnail = page.$eval("[id='0']", el => el ? true : false);
        const lastThumbnail = page.$eval("[id='10']", el => el ? true : false);
        const scrolledThumbnail = page.$eval("[id='6']", el => el ? false : true);
        expect(thumbnails.length).toBe(7);
        expect(firstThumbnail).toBeTruthy();
        expect(lastThumbnail).toBeTruthy();
        expect(scrolledThumbnail).toBeTruthy();
      });
  })
  it('should have 7 thumbnails after down-click with the correct indices', async () => {
    await page.goto(testUrl);
    const upScroll = await page.waitForSelector('#downScroll-container');
    upScroll.click()
      .then(() => {
        const thumbnails = page.$$('#stylePhotodefault');
        const firstThumbnail = page.$eval("[id='0']", el => el ? false : true);
        const lastThumbnail = page.$eval("[id='7']", el => el ? true : false);
        expect(thumbnails.length).toBe(7);
        expect(lastThumbnail).toBeTruthy();
        expect(firstThumbnail).toBeTruthy();
      });

  });
  it('should scroll correctly after seven up-clicks', async () => {
    await page.goto(testUrl);
    var upScroll = await page.waitForSelector('#upScroll-container');
    await upScroll.click();
    await upScroll.click();
    await upScroll.click();
    await upScroll.click();
    await upScroll.click();
    await upScroll.click();
    await upScroll.click();
    const fifth = page.$eval("[id='5']", el => el ? true : false);
    const sixth = page.$eval("[id='6']", el => el ? true : false);
    const seventh = page.$eval("[id='7']", el => el ? true : false);
    const eighth = page.$eval("[id='8']", el => el ? true : false);
    const nineth = page.$eval("[id='9']", el => el ? true : false);
    const tenth = page.$eval("[id='10']", el => el ? true : false);
    const initial = page.$eval("[id='0']", el => el ? true : false);
    expect(fifth).toBeTruthy();
    expect(sixth).toBeTruthy();
    expect(seventh).toBeTruthy();
    expect(eighth).toBeTruthy();
    expect(nineth).toBeTruthy();
    expect(tenth).toBeTruthy();
    expect(initial).toBeTruthy();

  })
  it('should scroll correctly after five down-clicks', async () => {
    await page.goto(testUrl);
    const downScroll = await page.waitForSelector('#downScroll-container');
    await downScroll.click();
    await downScroll.click();
    await downScroll.click();
    await downScroll.click();
    await downScroll.click();
    const fifth = page.$eval("[id='5']", el => el ? true : false);
    const sixth = page.$eval("[id='6']", el => el ? true : false);
    const seventh = page.$eval("[id='7']", el => el ? true : false);
    const eighth = page.$eval("[id='8']", el => el ? true : false);
    const nineth = page.$eval("[id='9']", el => el ? true : false);
    const tenth = page.$eval("[id='10']", el => el ? true : false);
    const initial = page.$eval("[id='0']", el => el ? true : false);
    expect(fifth).toBeTruthy();
    expect(sixth).toBeTruthy();
    expect(seventh).toBeTruthy();
    expect(eighth).toBeTruthy();
    expect(nineth).toBeTruthy();
    expect(tenth).toBeTruthy();
    expect(initial).toBeTruthy();
  })
})