module.exports = {
  clearMocks: true,
  roots: ['<rootDir>/src'],
  testPathIgnorePatterns: ['/node_modules/'],
  collectCoverage: true,
  // collectCoverageFrom: ['<rootDir>/src/*.{js,jsx}'],
  coverageDirectory: '.coverage',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./node_modules/jest-enzyme/lib/index.js'],
};
