# Instrucciones del proyecto

Framework educativo de pruebas E2E de OrangeHRM con Playwright, Page Object Model y reportes Allure. Consultá `README.md` para instalación y uso.

## Arquitectura y convenciones

- Ubicá los Page Objects en `pages/` y reutilizá las fixtures de `fixtures/fixtures.js` en los tests de `tests/`.
- Usá JavaScript con `// @ts-check` y JSDoc en español, siguiendo las convenciones del archivo. El proyecto usa CommonJS en general; respetá las excepciones existentes, como `playwright.config.js`.
- Mantené las assertions en los tests y los Page Objects enfocados en acciones y consultas. `LoginPage.validateErrorMessage()` es una excepción existente; no la cambies sin una tarea específica.
- Preferí locators estables y esperas o assertions deterministas de Playwright; evitá sleeps fijos y selectores acoplados innecesariamente a la estructura visual.
- Priorizá tests aislados y datos de prueba reutilizables; evitá filtrar estado entre tests y preservá información útil para diagnosticar fallos.

## Verificación y precauciones

- Ejecutá la verificación apropiada al cambio. Para acotar una prueba: `npx playwright test tests/login.spec.js --project=chromium`. `npm test` ejecuta los proyectos Chromium, Firefox y WebKit configurados.
- Las pruebas offline de `tests-unit/` usan `node:test`, no tocan OrangeHRM y se ejecutan con `node --test "tests-unit/*.test.js"` (pasar el directorio solo falla en Node 24).
- `npm run docker:test -- --project=chromium` reenvía los argumentos a Playwright dentro de Docker. WebKit se verifica ahí porque en el host pueden faltar sus librerías.
- Los tests apuntan por defecto a la demo pública de OrangeHRM y algunos crean empleados. Antes de ejecutarlos, considerá los efectos sobre el entorno indicado por `BASE_URL` y evitá modificar datos ajenos.
- El test de alta de empleados en `tests/pim-e2e.spec.js` está en `test.skip` hasta contar con un entorno aislado y limpieza verificada de los datos creados. No lo reactives sin una tarea específica.
- Si cambiás scripts o proyectos de navegador, comprobá que `package.json` y `playwright.config.js` sigan siendo coherentes.
- No incluyas secretos ni credenciales en cambios. No versiones reportes o resultados generados sin una razón explícita. Preservá la reproducibilidad local al cambiar Docker o configuración.

## Estado del proyecto en el vault

- Al cerrar una unidad relevante, consultá mediante Obsidian MCP `90-Contenido-Archivado/Curso-Playwright.md`, `01-Conocimiento/Tecnologías/Herramientas/Engram-Vault-Sync.md` y el `AGENTS.md` del vault. Si hay diferencias respaldadas por evidencia, proponé una actualización indicando fuente, secciones y límites; esperá aprobación antes de escribir. Si Obsidian MCP no está disponible, avisá y no afirmes que sincronizaste la nota.

## Referencias opcionales del vault

- Antes de instalar o actualizar paquetes npm, consultá `01-Conocimiento/Tecnologías/Herramientas/npm-pnpm-security-hardening.md` mediante Obsidian MCP y verificá la configuración activa. Si no está disponible, avisá y pedí el contexto necesario antes de una operación que dependa de esa política.
- Para cambios en scripts o configuración de navegadores, consultá, si está disponible, `01-Conocimiento/Conceptos/Drift-Script-Config.md` mediante Obsidian MCP. Contrastá la nota con el estado actual del repositorio.
