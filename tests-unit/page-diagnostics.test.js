const test = require('node:test');
const assert = require('node:assert/strict');
const LoginPage = require('../pages/LoginPage');
const DashboardPage = require('../pages/DashboardPage');
const PimPage = require('../pages/PimPage');

function fakePage({ failure, title = 'Dashboard' } = {}) {
  const locator = {
    waitFor: async () => { if (failure) throw failure; },
    innerText: async () => title,
  };
  return {
    locator: () => locator,
    getByRole: () => locator,
    getByText: () => locator,
    waitForURL: async () => { if (failure) throw failure; },
  };
}

for (const [name, Page, method, args] of [
  ['login', LoginPage, 'isLoginPageVisible', []],
  ['dashboard', DashboardPage, 'isDashboardVisible', []],
  ['menu option', DashboardPage, 'isMenuOptionVisible', ['PIM']],
  ['logged user', DashboardPage, 'isLoggedUserVisible', []],
  ['PIM', PimPage, 'isPimPageVisible', []],
  ['PIM elements', PimPage, 'arePimMainElementsVisible', []],
]) {
  test(`${name} preserves the original Playwright failure`, async () => {
    const failure = new Error('locator failure');
    const page = new Page(fakePage({ failure }));
    await assert.rejects(() => page[method](...args), error => error === failure);
  });
}

test('dashboard visibility retains its boolean result for a successful page', async () => {
  const page = new DashboardPage(fakePage());
  assert.equal(await page.isDashboardVisible(), true);
  const wrongPage = new DashboardPage(fakePage({ title: 'Wrong title' }));
  assert.equal(await wrongPage.isDashboardVisible(), false);
});

test('PIM element visibility retains its successful result array', async () => {
  const page = new PimPage(fakePage());
  assert.deepEqual(await page.arePimMainElementsVisible(), [true, true, true, true, true]);
});
