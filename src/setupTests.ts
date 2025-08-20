import '@testing-library/jest-dom';

// Mock react-transition-group
jest.mock('react-transition-group', () => ({
  CSSTransition: ({ children, in: isIn }: any) => (isIn ? children : null),
}));

