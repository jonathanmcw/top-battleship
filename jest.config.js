export default {
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },
    moduleNameMapper: {
        '\\.css$': '<rootDir>/tests/jest.mock.js', // Corrected regex for CSS files
    },
};