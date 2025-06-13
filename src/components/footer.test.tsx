import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "./footer";

describe("Footer component", () => {
  it("renders all footer text elements", () => {
    render(<Footer />);

    expect(screen.getByText("Double-click to edit a todo")).toBeInTheDocument();
    expect(screen.getByText("Created by Purnachandra Yadav PV")).toBeInTheDocument();
    expect(screen.getByText("Part of Opteamix")).toBeInTheDocument();
  });
});
/* this renders all footer text elements */