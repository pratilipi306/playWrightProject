import { defineConfig } from '@playwright/test';

export default defineConfig({

    testDir: './testUtils',
    timeout: 30000,
    reporter: [["html", { open: "always" }]],
    use: {
        headless: false
    },



});


