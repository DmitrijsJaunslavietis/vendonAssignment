import { fireEvent, render, screen } from "@testing-library/react";
import { describe, vi, expect, test } from "vitest";
import { TestInstance } from "./TestInstance";
import type { Question } from "../../types/test.types";
import { useState } from "react";

const submitAnswerHandle = vi.fn();
const submitTestHandle = vi.fn();

describe("TestInstance", () => {
    test("shows question, answers and Next question button", () => {
        renderPage();
        const questionElement = screen.getByTestId("question");
        const answerElements = screen.getAllByTestId("answer-button");
        const submitButton = screen.getByTestId("submit-answer");
        expect(questionElement).toBeInTheDocument();
        expect(answerElements.length).toBeGreaterThan(0);
        expect(submitButton).toBeInTheDocument();
    });

    test("submit button is disabled when no answer is selected", () => {
        renderPage();
        const submitButton = screen.getByTestId("submit-answer");
        expect(submitButton).toBeDisabled();
    });

    test("submit button is enabled when an answer is selected", async () => {
        renderPage();
        const answerElements = screen.getAllByTestId("answer-button");
        fireEvent.click(answerElements[0]);
        expect(screen.getByTestId("submit-answer")).toBeEnabled();
    });

    test("next question button changes to next question", () => {
        renderPage();
        const answerElements = screen.getAllByTestId("answer-button");
        fireEvent.click(answerElements[0]);
        const submitButton = screen.getByTestId("submit-answer");
        fireEvent.click(submitButton);
        expect(screen.getByTestId("question")).toHaveTextContent(
            questions[1].question
        );
    });

    test("submit button text changed on last question", () => {
        renderPage(true);
        const answerElements = screen.getAllByTestId("answer-button");
        fireEvent.click(answerElements[0]);
        const submitButton = screen.getByTestId("submit-answer");
        expect(submitButton).toHaveTextContent(/Finish Test/i);
    });

    test("submit test button is clicked", () => {
        renderPage(true);
        const answerElements = screen.getAllByTestId("answer-button");
        fireEvent.click(answerElements[0]);
        const submitButton = screen.getByTestId("submit-answer");
        fireEvent.click(submitButton);
        expect(submitAnswerHandle).toHaveBeenCalled();
        expect(submitTestHandle).toHaveBeenCalled();
    });

    test("progress bar is shown", () => {
        renderPage();
        const progressBar = screen.getByRole("progressbar");
        expect(progressBar).toBeInTheDocument();
    });

    test("ratio is correct", () => {
        renderPage();
        const progressBar = screen.getByRole("progressbar");
        expect(progressBar).toHaveAttribute("value", "0.25");
        const answerElements = screen.getAllByTestId("answer-button");
        fireEvent.click(answerElements[0]);
        const submitButton = screen.getByTestId("submit-answer");
        fireEvent.click(submitButton);
        expect(progressBar).toHaveAttribute("value", "0.5");
        fireEvent.click(answerElements[1]);
        fireEvent.click(submitButton);
        expect(progressBar).toHaveAttribute("value", "0.75");
        fireEvent.click(answerElements[2]);
        fireEvent.click(submitButton);
        expect(progressBar).toHaveAttribute("value", "1");
    });
});

const questions: Question[] = [
    {
        id: 1,
        question: "What is the capital of France?",
        answers: [
            {
                id: 1,
                answer: "Berlin",
            },
            {
                id: 2,
                answer: "Madrid",
            },
            {
                id: 3,
                answer: "Paris",
            },
            {
                id: 4,
                answer: "Rome",
            },
        ],
    },
    {
        id: 2,
        question: "What is the largest planet in our solar system?",
        answers: [
            {
                id: 5,
                answer: "Earth",
            },
            {
                id: 6,
                answer: "Jupiter",
            },
            {
                id: 7,
                answer: "Mars",
            },
            {
                id: 8,
                answer: "Saturn",
            },
        ],
    },
    {
        id: 3,
        question: "What is the chemical symbol for gold?",
        answers: [
            {
                id: 9,
                answer: "Au",
            },
            {
                id: 10,
                answer: "Ag",
            },
            {
                id: 11,
                answer: "Hg",
            },
        ],
    },
    {
        id: 4,
        question: "What is the speed of light?",
        answers: [
            {
                id: 12,
                answer: "299,792,458 m/s",
            },
            {
                id: 13,
                answer: "300,000 km/s",
            },
            {
                id: 14,
                answer: "150,000 km/s",
            },
        ],
    },
];

const renderPage = (lastPage: boolean = false) => {
    const Wrapper = () => {
        const [answer, setAnswer] = useState<number | undefined>(undefined);
        const [questionIndex, setQuestionIndex] = useState<number>(lastPage ? 3 : 0);
        const ratio = (questionIndex + 1) / questions.length;

        return (
            <TestInstance
                questions={questions}
                questionIndex={questionIndex}
                setQuestionIndex={setQuestionIndex}
                selectedAnswer={answer}
                setSelectedAnswer={setAnswer}
                submitAnswerHandle={submitAnswerHandle}
                submitTestHandle={submitTestHandle}
                ratio={ratio}
            />
        );
    };

    return render(<Wrapper />);
};
