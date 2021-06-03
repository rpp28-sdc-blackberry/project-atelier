const frisby = require('frisby');

var sum = (a, b) => {
  return a + b;
};

describe('Jest test', () => {

  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });

})

describe('Puppeteer test', () => {
  beforeAll(async () => {
    await page.goto('https://google.com');
  });

  it('should be titled "Google"', async () => {
    await expect(page.title()).resolves.toMatch('Google');
  });
});

describe('Frisby test', () => {

  it('should be a teapot', function () {
    return frisby.get('http://httpbin.org/status/418')
      .expect('status', 418);
  });

})