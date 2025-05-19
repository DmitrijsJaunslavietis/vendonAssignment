import { useEffect } from "react";
import { AnswerButton } from "../../components/AnswerButton";
import { Button } from "../../components/Button";
import type { Question } from "../../types/test.types";

interface TestInstanceProps {
    questions: Question[];
    questionIndex: number;
    setQuestionIndex: (index: number) => void;
    selectedAnswer: number | undefined;
    setSelectedAnswer: (answer: number | undefined) => void;
    submitAnswerHandle: () => void;
    submitTestHandle: () => void;
    ratio: number;
}

export const TestInstance = ({
    questions,
    questionIndex,
    setQuestionIndex,
    selectedAnswer,
    setSelectedAnswer,
    submitAnswerHandle,
    submitTestHandle,
    ratio
}: TestInstanceProps) => {

    useEffect(() => {
        console.log("Selected answer changed:", selectedAnswer);
    }, [selectedAnswer]);

    return (
        <div className="mx-auto mt-10 p-10 border border-gray-300 rounded shadow">
            <h1 data-testid="question" className="mb-4 text-xl">
                {questions[questionIndex]?.question}
            </h1>
            <div className="column-1 mb-4">
                {questions[questionIndex]?.answers.map((answer) => (
                    <AnswerButton
                        data-testid="answer-button"
                        selected={selectedAnswer === answer.id}
                        text={answer.answer}
                        onClick={() => {
                            setSelectedAnswer(answer.id);
                        }}
                        key={answer.id}
                    />
                ))}
            </div>
            <progress value={ratio} className="progressBar mb-4" />
            <div className="flex justify-end">
                <Button
                    data-testid="submit-answer"
                    onClick={() => {
                        if (questionIndex < questions.length - 1) {
                            submitAnswerHandle();
                            setQuestionIndex(questionIndex + 1);
                        } else {
                            submitTestHandle();
                        }
                    }}
                    disabled={selectedAnswer === undefined}
                >
                    {questionIndex < questions.length - 1
                        ? "Next Question"
                        : "Finish Test"}
                </Button>
            </div>
        </div>
    );
};