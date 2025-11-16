module.exports = {
  roots: [
    '<rootDir>/src',
  ],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'ts-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(es-cookie)/)',
  ],
  coverageReporters: ['json', 'lcov', 'text', 'clover', 'json-summary'],
  automock: false,
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  coveragePathIgnorePatterns: [
    '/node_modules/',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 24,
      lines: 44,
    },
  },
};
