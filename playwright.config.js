const config = {
    testDir: './tests',
    webServer: {
      command: 'cd frontend && npm run dev',
      url: 'http://localhost:5173',
      timeout: 120 * 1000,
      reuseExistingServer: !process.env.CI
    },
    use: {
      baseURL: 'http://localhost:5173',
    }
  };