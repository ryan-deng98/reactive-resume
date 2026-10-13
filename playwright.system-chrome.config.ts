import { defineConfig } from "@playwright/test";
import config from "./playwright.config";

// Optional local baseline runner when the managed Chromium download is unavailable or slow.
// Keep the same specs, fixtures, assertions, server setup, and artifact settings.
export default defineConfig(config, { use: { channel: "chrome" } });
