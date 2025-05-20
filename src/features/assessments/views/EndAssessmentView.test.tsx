import { render, screen } from "@testing-library/react";
import { describe, vi, expect, test } from "vitest";
import { EndAssessmentView } from "./EndAssessmentView";

// Moke react-router navigate
const mockedNavigate = vi.fn();
vi.mock("react-router", async () => {
    const actual = await vi.importActual("react-router");
    return {
        ...actual,
        useNavigate: () => mockedNavigate,
    };
});

describe("EndAssessmentPage", () => {
    test("shows name user typed in the beginning of the assessment", () => {
        renderPage();
        const userName = screen.getByTestId("user-name");
        expect(userName).toBeInTheDocument();
    });

    test("shows total questions and correct answers", () => {
        renderPage();
        const assessmentResults = screen.getByTestId("test-results");
        expect(assessmentResults).toBeInTheDocument();
        expect(assessmentResults).toHaveTextContent(
            `You have answered correctly ${8} out of ${10} questions.`
        );
    });
});

const renderPage = () => {
    const Wrapper = () => {
        const user = "John Doe";

        return (
            <EndAssessmentView
                user={user}
                totalQuestions={10}
                correctAnswers={8}
            />
        );
    };
    return render(<Wrapper />);
};
