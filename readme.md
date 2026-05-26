# Playwright Professional Framework - OrangeHRM

Este repositorio contiene un framework de automatización profesional basado en Playwright para la aplicación OrangeHRM.

## Características Principales

- **Page Object Model (POM):** Estructura modular y mantenible.
- **Fixtures Personalizadas:** Inyección de dependencias para tests más limpios.
- **Data-Driven Testing:** Datos de prueba centralizados en archivos JSON.
- **Manejo de Ambientes:** Soporte para variables de entorno mediante `.env`.
- **Dockerizado:** Ejecución consistente y rápida mediante Docker y Docker Compose.
- **Reportes Avanzados:** Integración con Allure Playwright.

## Requisitos Previos

- [Docker](https://docs.docker.com/get-docker/) y [Docker Compose](https://docs.docker.com/compose/install/).
- [Node.js](https://nodejs.org/) (opcional, para desarrollo local fuera de Docker).

## Instalación y Configuración

1.  Clonar el repositorio.
2.  Crear el archivo de ambiente:
    ```bash
    cp .env.example .env
    ```
3.  Instalar dependencias locales (opcional):
    ```bash
    npm install
    ```

## Ejecución de Pruebas

### Usando Docker (Recomendado)

Para ejecutar toda la suite de pruebas:
```bash
docker-compose up --abort-on-container-exit
```

### Usando NPM local

```bash
# Todos los tests
npm test

# Modo UI
npm run test:ui

# Proyectos específicos
npm run test:chrome
npm run test:firefox
```

## Reportes

### Playwright Report
```bash
npm run report
```

### Allure Report
```bash
# Generar
npm run allure:generate
# Abrir
npm run allure:open
```

## Estructura del Proyecto

- `data/`: Archivos JSON con datos de prueba.
- `fixtures/`: Configuración de fixtures personalizadas.
- `pages/`: Page Objects que encapsulan locators y acciones.
- `tests/`: Casos de prueba organizados por módulo.
- `utils/`: Utilidades y helpers genéricos.
