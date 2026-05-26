// @ts-check
import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

// Leer el archivo .env
dotenv.config();

export default defineConfig({
  testDir: "./tests",

  timeout: 30000,

  fullyParallel: false,

  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [["list"], ["html"], ["allure-playwright"]],

  use: {
    baseURL: process.env.BASE_URL || "https://opensource-demo.orangehrmlive.com",

    headless: true,

    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "chromium",
      use: { browserName: "chromium" },
    },
    {
      name: "firefox",
      use: { browserName: "firefox" },
    },
    /*
    {
      name: "webkit",
      use: { browserName: "webkit" },
    },
    */
  ],
});
