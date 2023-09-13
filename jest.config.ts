module.exports = {
    // Typescript setup from Jest themselves
    preset: 'ts-jest',
    // properly mount vue components using jsdom
    testEnvironment: 'jsdom',
    moduleFileExtensions: ["js", "jsx", "mjs", "ts", "vue"],
    // Collect coverage for all the test scenarios
    collectCoverage: true,
    collectCoverageFrom: [
        "<rootDir>/components/**/*.vue",
        "<rootDir>/pages/**/*.vue"
    ],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/$1",
    },
    transform: {
        '^.+\\.(js|jsx|mjs)$': 'babel-jest',
        '^.+\\.(ts|tsx)$': 'ts-jest',
        ".+\\.(css|scss|png|jpg|svg)$": "jest-transform-stub",
        ".*\\.(vue)$": "@vue/vue3-jest",
    },
    transformIgnorePatterns: [
        "node_modules/(?!(nuxt3|unenv))",
    ],
    testEnvironmentOptions: {
        customExportConditions: ["node", "node-addons"],
    },
};