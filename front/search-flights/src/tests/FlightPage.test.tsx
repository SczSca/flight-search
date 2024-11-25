import { screen } from "@testing-library/react";
import { renderWithProviders } from "./test_utils/utils";
import { describe, expect, it } from "vitest";
import { FlightPages } from "../pages";

describe("Flight Page", () => {
  it("renders Flight Page Results", () => {
    renderWithProviders(<FlightPages />);

    // Verifies elements of modal addNote
    expect(screen.getByTestId("flight-card-0-main-box")).toBeInTheDocument();
    // expect(screen.getByTestId("modal-loading")).toBeInTheDocument(); // ModalLoading necesita un data-testid

    expect(screen.getByTestId("button-filter-0")).toBeInTheDocument();
    expect(screen.getByTestId("button-filter-1")).toBeInTheDocument();
    expect(screen.getByTestId("button-filter-2")).toBeInTheDocument();
  });
});
