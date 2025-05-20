import { render, screen, fireEvent } from "@testing-library/react";
import { describe, vi, expect, test } from "vitest";
import { StartAssessmentPage } from "./StartAssessmentPage";

// Moke react-router navigate
const mockedNavigate = vi.fn();
vi.mock("react-router", async () => {
    const actual = await vi.importActual("react-router");
    return {
        ...actual,
        useNavigate: () => mockedNavigate,
    };
});

describe("StartAssessmentPage", () => {
    test("starts assessment when name and test are selected", () => {
        renderPage();
        const nameInput = screen.getByTestId("nameinput");
        const testSelect = screen.getByTestId("testselect");
        const startButton = screen.getByText(/start test/i);
        fireEvent.change(nameInput, { target: { value: "John Doe" } });
        fireEvent.change(testSelect, { target: { value: 1 } });

        fireEvent.click(startButton);
        expect(mockedNavigate).toHaveBeenCalled();
    });

    test("shows error if name and test is not selected", () => {
        renderPage();
        const nameInput = screen.getByTestId("nameinput");
        const testSelect = screen.getByTestId("testselect");
        const startButton = screen.getByText(/start test/i);
        fireEvent.change(nameInput, { target: { value: "" } });
        fireEvent.change(testSelect, { target: { value: "" } });

        fireEvent.click(startButton);
        expect(
            screen.getByText(/Please select a test and enter your name./i)
        ).toBeInTheDocument();
    });

    test("shows error if no name value", () => {
        renderPage();
        const nameInput = screen.getByTestId("nameinput");
        const testSelect = screen.getByTestId("testselect");
        const startButton = screen.getByText(/start test/i);
        fireEvent.change(nameInput, { target: { value: "" } });
        fireEvent.change(testSelect, { target: { value: 1 } });

        fireEvent.click(startButton);
        expect(
            screen.getByText(/Please select a test and enter your name./i)
        ).toBeInTheDocument();
    });

    test("shows error if no test value", () => {
        renderPage();
        const nameInput = screen.getByTestId("nameinput");
        const testSelect = screen.getByTestId("testselect");
        const startButton = screen.getByText(/start test/i);
        fireEvent.change(nameInput, { target: { value: "John Doe" } });
        fireEvent.change(testSelect, { target: { value: "" } });

        fireEvent.click(startButton);
        expect(
            screen.getByText(/Please select a test and enter your name./i)
        ).toBeInTheDocument();
    });

    test("is disabled when loading", () => {
        renderPage();
        const nameInput = screen.getByTestId("nameinput");
        const testSelect = screen.getByTestId("testselect");
        const startButton = screen.getByText(/start test/i);
        fireEvent.change(nameInput, { target: { value: "John Doe" } });
        fireEvent.change(testSelect, { target: { value: 1 } });

        fireEvent.click(startButton);
        expect(startButton).toBeDisabled();
    });
});

const renderPage = () => {
    return render(<StartAssessmentPage />);
};
