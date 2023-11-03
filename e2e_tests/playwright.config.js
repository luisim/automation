const config = {
  globalSetup: require.resolve("./project.setup"),
  reporter: process.env.E2E_REPORTER,
  retries: 0,
  use: {
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: "off",
    storageState: "states/state.json",
    headless: false,

    launchOptions: {
      slowMo: parseInt(process.env.SLOW_MO_TIME || "0")
    }
  },
  timeout: parseInt(process.env.SLOW_MO_TIME || "0") > 0 ? 5 * 30000 : 30000
};

module.exports = config;
