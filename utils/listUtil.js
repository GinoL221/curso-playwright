// @ts-check

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

module.exports = {
  captureTextsFromList,
};
