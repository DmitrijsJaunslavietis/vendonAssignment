import { render, screen } from "@testing-library/react";
import { describe, vi, expect, test } from "vitest";
import { EndTestView } from "./EndTestView";

// Moke react-router navigate
const mockedNavigate = vi.fn();
vi.mock("react-router", async () => {
    const actual = await vi.importActual("react-router");
    return {
        ...actual,
        useNavigate: () => mockedNavigate,
    };
});

describe("EndTestPage", () => {
    test("shows name user typed in the beginning of the test", () => {
        renderPage();
        const userName = screen.getByTestId("user-name");
        expect(userName).toBeInTheDocument();
    });

    test("shows total questions and correct answers", () => {
        renderPage();
        const testResults = screen.getByTestId("test-results");
        expect(testResults).toBeInTheDocument();
        expect(testResults).toHaveTextContent(`You have answered correctly ${8} out of ${10} questions.`);
    });
});

const renderPage = () => {
    const Wrapper = () => {
        const user = "John Doe";

        return (
            <EndTestView user={user} totalQuestions={10} correctAnswers={8} />
        );
    };
    return render(<Wrapper />);
};
