import { screen } from "@testing-library/react";
import {
  blankLocations,
  renderWithProviders,
  responseBlank,
} from "./test_utils/utils";
import { describe, expect, it, Mock, vi } from "vitest";
import { FlightDetails } from "../pages";
import { useLocation } from "react-router-dom";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useLocation: vi.fn(),
  };
});

describe("Flight Details", () => {
  it("renders Flight Details of one result", () => {
    const mockUseLocation = useLocation as Mock;
    mockUseLocation.mockReturnValue({
      state: {
        flightResult: responseBlank.data[0],
        locations: blankLocations,
        orderType: responseBlank.type,
      },
    });
    renderWithProviders(<FlightDetails />);

    expect(screen.getByTestId("segment-title-0")).toBeInTheDocument();
    expect(screen.getByTestId("price-column")).toBeInTheDocument();
  });
});
