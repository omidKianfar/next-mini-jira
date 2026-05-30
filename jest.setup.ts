import '@testing-library/jest-dom';
import 'whatwg-fetch';

const originalError = console.error;
console.error = (...args) => {
  if (args[0] && args[0].includes('ReactDOMTestUtils.act')) {
    return;
  }
  originalError(...args);
};
