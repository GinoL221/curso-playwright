# Producto

Qué es este proyecto, para quién, qué cubre y en qué estado está. Para instalación y comandos, consultá el [README](README.md); para las reglas de trabajo con agentes, [AGENTS.md](AGENTS.md).

## Propósito

Framework educativo de pruebas end-to-end sobre [OrangeHRM](https://opensource-demo.orangehrmlive.com) con **Playwright**, **Page Object Model (POM)** y reportes **Allure**. Es el trabajo final de un curso de testing automatizado y la **implementación de referencia** de [playwright-template](https://github.com/GinoL221/playwright-template).

## Público

- Quien cursa o revisa el trabajo final y necesita ver un POM completo y ejecutable.
- Quien parte del template y busca un ejemplo concreto de su arquitectura.

## Alcance

- Flujos E2E de OrangeHRM: login, dashboard y PIM (empleados).
- Page Objects en `pages/`, fixtures con inyección de dependencias en `fixtures/fixtures.js`, datos de prueba en `data/`.
- Ejecución en Chromium, Firefox y WebKit, local o en Docker.
- Reportes HTML de Playwright y Allure, más screenshot, video y trace ante fallos.

## Fuera de alcance

- Pruebas de API independientes.
- Pruebas de carga o rendimiento.
- Un entorno propio de OrangeHRM: los tests apuntan por defecto a una demo pública que no controlamos (`BASE_URL`).

## Cobertura actual

| Módulo | Archivos | Estado |
|---|---|---|
| Login | `tests/login.spec.js` | Activo: acceso válido e inválidos parametrizados con `data/users.json` |
| Dashboard | `tests/dashboard.spec.js`, `tests/dashboard-elementos-visibles.spec.js` | Activo: carga, usuario logueado, menú lateral y búsqueda de opciones |
| PIM | `tests/pim.spec.js` | Activo: navegación y elementos principales |
| PIM (alta) | `tests/pim-e2e.spec.js` | **Omitido** (`test.skip`) |

Son 9 tests activos y 1 omitido por navegador.

El alta de empleados queda omitida hasta contar con un entorno aislado y una limpieza verificada de los datos creados. Ejecutarla contra la demo pública crearía registros en un entorno compartido.

## Estado y verificación

Verificado el 2026-11-17 sobre el árbol de trabajo local, **sin commit**:

- **Docker (copia aislada):** `npm run docker:test` terminó con 27 tests aprobados y 3 omitidos en Chromium, Firefox y WebKit.
- **Pruebas offline:** 13 aprobadas con `node --test "tests-unit/*.test.js"`.
- **Revisión nativa:** aprobada después de corregir que `docker:test` descartaba los argumentos.

**No verificado:**

- Ejecución remota del workflow de CI (`.github/workflows/playwright.yml`).
- Generación del reporte Allure, que además requiere la CLI de Allure y Java.
- WebKit en el host: faltan librerías del sistema; en Docker funciona.

## Decisiones técnicas

| Decisión | Motivo |
|---|---|
| POM con assertions en los tests | Separar la navegación y las acciones de la verificación. Excepción existente: `LoginPage.validateErrorMessage()`. |
| Fixtures personalizadas | Evitar instanciar Page Objects a mano en cada test. |
| JavaScript con `// @ts-check` y JSDoc | Chequeo de tipos y autocompletado sin paso de compilación. `typescript` está como dependencia de desarrollo solo para ese chequeo. |
| CommonJS | Convención general; `playwright.config.js` usa ESM porque Playwright lo requiere. |
| Allure además del reporte HTML | Mayor detalle de pasos en los reportes. |
| Docker con `node_modules` efímero | Cada ejecución parte limpia y `docker:test` corre `npm ci --ignore-scripts`. |
| Alta de empleados deshabilitada | Evitar efectos sobre un entorno compartido (ver Cobertura actual). |

## Pendientes

- [ ] Completar la cobertura de los flujos principales del trabajo final.
- [ ] Reactivar el alta de empleados con un entorno aislado y limpieza verificada.
- [ ] Verificar el workflow de CI de forma remota.
- [ ] Alinear el README con el estado real (ver Riesgos).

## Riesgos

- **Dependencia externa:** la demo pública puede cambiar su interfaz o no estar disponible, y eso rompe tests sin que haya un cambio en el repo. Ya ocurrió con un selector de clase que desapareció y se reemplazó por un locator accesible.
- **Datos compartidos:** otras personas usan la misma demo; evitá modificar datos ajenos.
- **README desactualizado en tres puntos:**
  - Indica "Node.js 18+", sin contrastar con los requisitos de Playwright 1.60 (las pruebas offline se ejecutaron con Node 24).
  - Indica "Sin TypeScript", aunque `typescript` figura en las dependencias de desarrollo.
  - La tabla de comandos omite `docker:test` y las pruebas offline.
