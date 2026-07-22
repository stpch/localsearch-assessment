import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({ dir: './' })

const config: Config = {
    clearMocks: true,
    collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/index.ts'],
    coverageReporters: ['text', 'text-summary', 'lcov'],
    roots: ['<rootDir>/src/'],
    setupFilesAfterEnv: ['<rootDir>/src/lib/__tests__/setup.tsx'],
    testEnvironment: 'jsdom',
    testRegex: '.+\\.test\\.tsx?$',
}

export default createJestConfig(config)
