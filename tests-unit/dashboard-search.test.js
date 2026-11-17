const test = require('node:test');
const assert = require('node:assert/strict');

const cases = new Map();
const fixturePath = require.resolve('../fixtures/fixtures');
const original = require(fixturePath);
const fakeTest = (name, callback) => cases.set(name, callback);
fakeTest.describe = (_name, callback) => callback();
fakeTest.beforeEach = () => {};
require.cache[fixturePath].exports = {
  test: fakeTest,
  expect: value => ({
    toBe: expected => assert.equal(value, expected),
    toBeVisible: async () => assert.equal(value.visible(), true),
    toBeHidden: async () => assert.equal(value.visible(), false),
  }),
};
require('../tests/dashboard.spec');
require.cache[fixturePath].exports = original;

const searchCase = cases.get('Buscar opcion del menu lateral');

function dashboard(filterWorks) {
  let filtered = false;
  return {
    page: { getByRole: () => ({ visible: () => !filtered }) },
    isDashboardVisible: async () => true,
    searchMenuOption: async () => { filtered = filterWorks; },
    isMenuOptionVisible: async () => true,
  };
}

test('search rejects a menu that does not filter', async () => {
  await assert.rejects(() => searchCase({ dashboardPage: dashboard(false) }));
});

test('search accepts a filtered menu with PIM visible', async () => {
  await searchCase({ dashboardPage: dashboard(true) });
});
