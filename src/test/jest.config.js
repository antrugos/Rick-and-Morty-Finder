module.exports = {
    preset: 'ts-jest',
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
    },
    moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
    testEnvironment: "jsdom",
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/src/__mocks__/fileMock.js',
        '\\.(css|less)$': 'identity-obj-proxy'
    },
};