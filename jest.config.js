/** @type {import("jest").Config} **/

module.exports = {
  preset: "ts-jest",

  testEnvironment: "node",

  roots: ["<rootDir>/src"],

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },

  testMatch: ["<rootDir>/src/**/*.test.ts"],

  clearMocks: true,

  coverageProvider: "v8",

  bail: true,
};
