const config = {
  roots: ["./src"],
  reporters: [
    "default",
    [
      "jest-html-reporters",
      {
        publicPath: "./coverage",
        filename: "coverage.html",
        expand: true,
      },
    ],
  ],
  collectCoverage: true,
  collectCoverageFrom: ["**/*.{js,ts}", "!**/node_modules/**"],
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/dist/",
    "<rootDir>/coverage/",
  ],
  transform: {
    "^.+\\.(ts)$": "ts-jest",
    "^.+\\.(js)$": "babel-jest",
  },
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};

module.exports = config;
