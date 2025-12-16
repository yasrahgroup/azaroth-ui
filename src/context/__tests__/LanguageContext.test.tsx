import { render, screen, act } from "@testing-library/react";
import { LanguageProvider, useLanguage } from "../LanguageContext";
import i18n from "i18next";

// Mock i18next
jest.mock("i18next", () => ({
  language: "en",
  changeLanguage: jest.fn().mockResolvedValue("en"),
  on: jest.fn(),
  off: jest.fn(),
  t: jest.fn().mockImplementation((key) => key),
}));

// Test component that uses the hook
const TestComponent = () => {
  const { locale, setLocale, t, isRTL } = useLanguage();

  return (
    <div>
      <div data-testid="locale">{locale}</div>
      <div data-testid="isRTL">{isRTL ? "true" : "false"}</div>
      <div data-testid="translation">{t("app.title")}</div>
      <button onClick={() => setLocale("ar")} data-testid="change-locale">
        Change to Arabic
      </button>
    </div>
  );
};

describe("LanguageContext", () => {
  it("provides default language", () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    expect(screen.getByTestId("locale")).toHaveTextContent("en");
    expect(screen.getByTestId("isRTL")).toHaveTextContent("false");
  });

  it("changes language", async () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    expect(screen.getByTestId("locale")).toHaveTextContent("en");

    await act(async () => {
      screen.getByTestId("change-locale").click();
    });

    expect(i18n.changeLanguage).toHaveBeenCalledWith("ar");
  });

  it("handles RTL languages", () => {
    // Mock isRTL function
    const originalIsRTL = jest.requireActual("../LanguageContext").isRTL;
    jest
      .spyOn(require("../LanguageContext"), "isRTL")
      .mockImplementation((lang) => lang === "ar");

    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    // Test initial RTL state
    expect(screen.getByTestId("isRTL")).toHaveTextContent("false");

    // Restore original implementation
    jest.requireMock("../LanguageContext").isRTL = originalIsRTL;
  });
});
