// Import the jest-dom library which provides custom test matchers for DOM testing
import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock any browser APIs or modules that are not available in the test environment
// For example, if you're using the Web Speech API, you might want to mock it here
// This is also a good place to set up any global test configurations or mocks

// Mock for the matchMedia API
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
