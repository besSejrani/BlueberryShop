// TS Paths
const getJestMappersFromTSConfig = require("tsconfig-paths-jest-mapper");

const moduleNameMapper = getJestMappersFromTSConfig();
// =================================================================================================

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/src/Utils/test/setup.ts"],
  moduleNameMapper,
};
