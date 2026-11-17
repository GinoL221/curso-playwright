# OrangeHRM — Automatización de Pruebas con Playwright

Framework de automatización E2E para [OrangeHRM](https://opensource-demo.orangehrmlive.com) usando **Playwright** con **Page Object Model (POM)**.

## Template

Este proyecto es la **implementación de referencia** de la arquitectura Playwright POM + fixtures. Para iniciar un nuevo proyecto con la misma estructura, usá el template genérico:

**[playwright-template](https://github.com/GinoL221/playwright-template)** — capa genérica (BasePage, fixtures, config, Docker) lista para scaffoldear con `gh repo create --template`.

```bash
gh repo create mi-proyecto --template GinoL221/playwright-template --clone
```

## Requisitos

- Node.js 18+
- npm
- Docker (opcional, para entorno aislado)

## Quick start

```bash
# 1. Instalar dependencias
npm install

# 2. Instalar navegadores (Chromium, Firefox y WebKit)
npx playwright install

# 3. Ejecutar todos los tests
npm test

# Solo Chromium
npm run test:chrome

# Con interfaz UI
npm run test:ui
```

Los tests apuntan a `https://opensource-demo.orangehrmlive.com` por defecto.

## Estructura del proyecto

```
├── pages/                  ← Page Object Model
│   ├── BasePage.js         ←   Clase base (click, fill, open, etc.)
│   ├── LoginPage.js        ←   Login
│   ├── DashboardPage.js    ←   Dashboard
│   └── PimPage.js          ←   PIM (empleados)
├── fixtures/
│   └── fixtures.js         ←   Fixtures con page objects inyectados
├── utils/
│   └── listUtil.js         ←   Utilidades para listas
├── tests/                  ←   Specs E2E
│   ├── dashboard-elementos-visibles.spec.js
│   ├── dashboard.spec.js
│   ├── login.spec.js
│   ├── pim-e2e.spec.js
│   └── pim.spec.js
├── tests-unit/             ←   Pruebas offline de los helpers y comandos
├── data/
│   └── users.json          ←   Datos de prueba
├── playwright.config.js    ←   Configuración de Playwright
├── docker-compose.yml      ←   Entorno Docker
└── package.json
```

## Arquitectura: Page Object Model

Cada pantalla de OrangeHRM tiene su propia clase que extiende `BasePage`:

```
BasePage (click, fill, getText, open, waitForVisible)
  ├── LoginPage      → login(username, password)
  ├── DashboardPage  → openMenuOption(option)
  └── PimPage        → addEmployee(firstName, lastName)
```

`BasePage` concentra los métodos genéricos. Los Page Objects hijos heredan la documentación (JSDoc) y agregan métodos de negocio específicos.

Los tests usan **custom fixtures** (`fixtures/fixtures.js`) que inyectan los page objects, evitando instanciarlos manualmente:

```javascript
const { test } = require('../fixtures/fixtures');

test('login exitoso', async ({ loginPage, dashboardPage }) => {
  await loginPage.login('Admin', 'admin123');
  await dashboardPage.openMenuOption('PIM');
});
```

## Configuración

| Variable | Default | Descripción |
|---|---|---|
| `BASE_URL` | `https://opensource-demo.orangehrmlive.com` | URL base de OrangeHRM |
| `CI` | — | Activa retries (2) y forbid `only` |

Definilas en un archivo `.env` en la raíz.

## Comandos

| Comando | Descripción |
|---|---|
| `npm test` | Tests en headless (Chromium, Firefox y WebKit) |
| `npm run test:chrome` | Solo Chromium |
| `npm run test:firefox` | Solo Firefox |
| `npm run test:webkit` | Solo WebKit |
| `npm run test:headed` | Con navegador visible |
| `npm run test:ui` | UI Mode de Playwright |
| `npm run report` | Abrir reporte HTML local |
| `npm run trace` | Ver trace de tests fallidos |
| `npm run allure:open` | Reporte Allure |
| `npm run docker:test` | Tests en Docker; acepta argumentos de Playwright, por ejemplo `-- --project=chromium` |
| `npm run clean` | Borra resultados y reportes generados |
| `node --test "tests-unit/*.test.js"` | Pruebas offline de `tests-unit/`; no acceden a OrangeHRM |

### Reportes

- **HTML**: `playwright-report/` — `npm run report`
- **Allure**: `allure-results/` → `npm run allure:generate && npm run allure:open`. Estos comandos requieren la [CLI de Allure](https://allurereport.org/docs/install/) y Java instalados por separado; `allure-playwright` solo genera los resultados.
- **Traces**: disponibles en `test-results/` para tests con retry

## Docker

```bash
# Instala las dependencias del lockfile y ejecuta los tests en el mismo contenedor
npm run docker:test

# Alternativamente, ejecuta el servicio con Docker Compose
npm run docker:up
```

La imagen incluye los navegadores. `node_modules` vive en un filesystem temporal: cada ejecución empieza vacía y `docker:test` ejecuta `npm ci --ignore-scripts` antes de Playwright. Los comandos antiguos `docker:install` y `docker:setup` operan en contenedores separados; sus instalaciones no se conservan para `docker:test`. La configuración npm del host no se hereda automáticamente en el contenedor; verificá la política activa antes de instalar paquetes.

El contenedor usa UID/GID 1000 por defecto. Para otros valores, pasalos a Compose sin reasignar la variable de solo lectura `UID` de Bash:

```bash
env UID="$(id -u)" GID="$(id -g)" npm run docker:test
```

## Tests incluidos

- **Login**: flujo positivo, negativo, validaciones de campo
- **Dashboard**: carga de módulos, elementos visibles, validaciones
- **PIM**: navegación y elementos principales. El E2E de creación está omitido hasta contar con un entorno aislado y una limpieza verificada.

## Notas técnicas

- **`// @ts-check`** activo en todos los archivos JS — VS Code marca errores de tipos en tiempo real
- **JSDoc** completo en `BasePage.js` y todos los Page Objects — el autocompletado muestra tipos y descripciones
- **CommonJS** (`require` / `module.exports`) — excepciones: `playwright.config.js` usa ESM (requerido por Playwright) y specs generados por Codegen usan `import`
- **Sin TypeScript** — el proyecto usa JS con JSDoc para la verificación de tipos, sin necesidad de compilación

## Licencia

ISC — Proyecto educativo.
