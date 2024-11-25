import { screen } from "@testing-library/react";
import { renderWithProviders } from "./test_utils/utils";
import { describe, expect, it } from "vitest";
import { Home } from "../pages";

describe("Home Page", () => {
  it("renders Home Page", () => {
    renderWithProviders(<Home />);

    // Verifies elements of modal addNote
    expect(screen.getByTestId("heading-home")).toBeInTheDocument();
    // expect(screen.getByTestId("modal-loading")).toBeInTheDocument(); // ModalLoading necesita un data-testid

    expect(screen.getByTestId("search-form")).toBeInTheDocument();
  });
});
