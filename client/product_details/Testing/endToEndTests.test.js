import puppeteer from 'puppeteer';
import { spawn } from 'child_process';
import { exception } from 'console';

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
  it('should not have an h1', async () => {
    await page.goto(testUrl);
    // await page.screenshot({ path: '/screens/basicRender.png' })
    const headlines = await page.$$('h1');

    expect(headlines.length).toBe(0);
  })
  it('should have 7 thumbnails', async () => {
    await page.goto(testUrl);
    const thumbnails = await page.$$('.stylePhoto');

    expect(thumbnails.length).toBe(7);
  })
  it('should have 7 thumbnails after up-click with the correct indices', async () => {
    await page.goto(testUrl);
    await page.click('#upScroll-container');
    const thumbnails = await page.$$('.stylePhoto');
    const firstThumbnail = await page.$$('#0');
    const lastThumbnailOnList = await page.$$('#6');
    const lastThumbnail = await page.$$('#10');
    
    expect(thumbnails.length).toBe(7);
    expect(lastThumbnail).toBeTruthy();
    expect(firstThumbnail).toBeTruthy();
    expect(lastThumbnailOnList).toBeNull();
  })
  it('should have 7 thumbnails after down-click with the correct indices', async () => {
    await page.goto(testUrl);
    await page.click('#upScroll-container');
    const thumbnails = await page.$$('.stylePhoto');
    const lastThumbnail = await page.$$('#7');
    const firstThumbnail = await page.$$('#0');

    expect(thumbnails.length).toBe(7);
    expect(lastThumbnail).toBeTruthy();
    expect(firstThumbnail).toBeNull();
  })
  it('should scroll correctly after seven up-clicks', async () => {
    await page.goto(testUrl);
    await page.click('#upScroll-container');
    await page.click('#upScroll-container');
    await page.click('#upScroll-container');
    await page.click('#upScroll-container');
    await page.click('#upScroll-container');
    await page.click('#upScroll-container');
    await page.click('#upScroll-container');

    const fifth = await page.$$('#5');
    const sixth = await page.$$('#6');
    const seventh = await page.$$('#7');
    const eighth = await page.$$('#8');
    const nineth = await page.$$('#9');
    const tenth = await page.$$('#10');
    const initial = await page.$$('#0');

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
    await page.click('#downScroll-container');
    await page.click('#downScroll-container');
    await page.click('#downScroll-container');
    await page.click('#downScroll-container');
    await page.click('#downScroll-container');
    
    const fifth = await page.$$('#5');
    const sixth = await page.$$('#6');
    const seventh = await page.$$('#7');
    const eighth = await page.$$('#8');
    const nineth = await page.$$('#9');
    const tenth = await page.$$('#10');
    const initial = await page.$$('#0');
    
    expect(fifth).toBeTruthy();
    expect(sixth).toBeTruthy();
    expect(seventh).toBeTruthy();
    expect(eighth).toBeTruthy();
    expect(nineth).toBeTruthy();
    expect(tenth).toBeTruthy();
    expect(initial).toBeTruthy();
  })
})