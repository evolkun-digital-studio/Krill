import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  clearMocks: true,
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/src/test/setup.tsx"],
  testEnvironment: "jsdom",
  testMatch: ["<rootDir>/src/**/*.{spec,test}.{ts,tsx}"],
};

export default createJestConfig(config);
