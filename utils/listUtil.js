// @ts-check

const { expect } = require('@playwright/test');

/**
 * Recorre una lista de elementos, captura sus textos y los devuelve normalizados
 * @param {import('@playwright/test').Locator} locator - Locator que representa la colección de elementos
 * @returns {Promise<string[]>} Lista de textos limpios en el orden en que aparecen
 */
async function captureTextsFromList(locator) {
  const texts = [];

  await locator.first().waitFor();

  const count = await locator.count();

  for (let i = 0; i < count; i++) {
    const text = await locator.nth(i).innerText();
    const cleanText = text.trim();

    texts.push(cleanText);
  }

  return texts;
}

/**
 * Valida que la lista de textos capturados coincida exactamente con la esperada
 * @param {string[]} actualTexts - Textos obtenidos en la UI
 * @param {string[]} expectedTexts - Textos esperados para la validación
 * @returns {Promise<void>} Promesa resuelta cuando la comparación finaliza
 */
async function validateTextsList(actualTexts, expectedTexts) {
  expect(actualTexts).toEqual(expectedTexts);
}

module.exports = {
  captureTextsFromList,
  validateTextsList
};
