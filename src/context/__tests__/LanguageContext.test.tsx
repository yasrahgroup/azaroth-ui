//import React from "react";
import { render, screen } from "@testing-library/react";
import { LanguageProvider, LanguageContext } from "../LanguageContext";
import { act } from "react-dom/test-utils";

describe("LanguageContext", () => {
  it("should provide default locale", () => {
    render(
      <LanguageProvider>
        <LanguageContext.Consumer>
          {({ locale }) => <div data-testid="locale">{locale}</div>}
        </LanguageContext.Consumer>
      </LanguageProvider>
    );

    expect(screen.getByTestId("locale").textContent).toBe("en");
  });

  it("should change locale", () => {
    render(
      <LanguageProvider>
        <LanguageContext.Consumer>
          {({ locale, setLocale }) => (
            <div>
              <div data-testid="locale">{locale}</div>
              <button
                onClick={() => setLocale("es")}
                data-testid="change-locale"
              >
                Change to Spanish
              </button>
            </div>
          )}
        </LanguageContext.Consumer>
      </LanguageProvider>
    );

    expect(screen.getByTestId("locale").textContent).toBe("en");
    act(() => {
      screen.getByTestId("change-locale").click();
    });
    expect(screen.getByTestId("locale").textContent).toBe("es");
  });
});
