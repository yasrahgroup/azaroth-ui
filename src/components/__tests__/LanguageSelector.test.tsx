import { render, screen, fireEvent } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18n";
import LanguageSelector from "../LanguageSelector";

describe("LanguageSelector", () => {
  it("renders flag icons correctly", () => {
    render(
      <I18nextProvider i18n={i18n}>
        <LanguageSelector />
      </I18nextProvider>
    );

    // Check if the flag span is present in the button
    const flagSpan = screen.getByRole("button").querySelector("span.fi");
    expect(flagSpan).toBeInTheDocument();
    expect(flagSpan).toHaveClass("fi", "fi-gb"); // Default is GB for English
  });

  it("opens dropdown and shows flag icons in options", () => {
    render(
      <I18nextProvider i18n={i18n}>
        <LanguageSelector />
      </I18nextProvider>
    );

    // Click to open dropdown
    const button = screen.getByRole("button");
    fireEvent.click(button);

    // Check if dropdown is open and contains flag spans
    const dropdown = screen.getByText("AR").closest("div");
    expect(dropdown).toBeInTheDocument();

    // We assert dropdown is not null to satisfy TypeScript
    expect(dropdown).not.toBeNull();
    const flagSpans = dropdown!.querySelectorAll("span.fi");
    expect(flagSpans.length).toBeGreaterThan(0);
  });
});
