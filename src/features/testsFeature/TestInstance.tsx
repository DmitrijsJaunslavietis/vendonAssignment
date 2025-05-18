import { useEffect, useMemo, useState } from "react";
import data from "../../mockTests/tests.json";
import { useNavigate, useParams } from "react-router";
import type { Question } from "../../types/test.types";
import {
    useCurrentTestInstance,
    usePassedTestQuestions,
    useTestInstanceActions,
} from "../../hooks/useTestInstanceStore";
import { Button } from "../../components/Button";
import { AnswerButton } from "../../components/AnswerButton";

export const TestInstance = () => {
    const navigate = useNavigate();
    const { instanceId } = useParams();
    const testInstance = useCurrentTestInstance();
    const passedTestQuestions = usePassedTestQuestions();
    const { setQuestions, setAnswer, setCorrectAnswers } =
        useTestInstanceActions();
    const [questionIndex, setQuestionIndex] = useState<number>(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | undefined>(
        undefined
    );
    const questions = testInstance?.questions ?? [];
    const ratio = useMemo(() => {
        if (!testInstance) return 0;
        const { questions } = testInstance;
        return (passedTestQuestions / questions.length);
    }, [passedTestQuestions, testInstance]);

    const submitTestHandle = () => {
        submitAnswerHandle();
        const testId = testInstance?.testId;
        //get correct answers from API
        const correctAnswers = data
            .find((test) => test.id === testId)
            ?.questions.map((question) => ({
                correctAnswerId:
                    question.answers.find((answer) => answer.isCorrect)?.id ??
                    0,
                questionId: question.id,
            }));
        // API call end
        if (!correctAnswers) return;
        if (correctAnswers?.some((answer) => answer.correctAnswerId === 0)) {
            //unexpected ERROR
            navigate(-1);
            return;
        }
        console.log("correctAnswers", correctAnswers);
        setCorrectAnswers(correctAnswers);
        navigate(`/test-instance/${instanceId}/end`);
    };

    const submitAnswerHandle = () => {
        if (selectedAnswer && testInstance) {
            setAnswer(questions[questionIndex].id, selectedAnswer);
            setSelectedAnswer(undefined);
        }
    };

    useEffect(() => {
        const fetchQuestions = () => {
            if (!testInstance) return;
            if (testInstance.finished) {
                navigate(-1);
                return;
            }
            const { testId } = testInstance;
            // API call by testId start
            let questionsWithAnswers: Question[] | [] = [];
            const questionsData = data.find(
                (test) => test.id === testId
            )?.questions;
            if (questionsData) {
                questionsWithAnswers = questionsData.map((question) => ({
                    id: question.id,
                    testId: testId,
                    question: question.question,
                    answers: question.answers.map((answer) => ({
                        id: answer.id,
                        questionId: question.id,
                        answer: answer.answer,
                    })),
                }));
            }
            // API call by testId end

            setQuestions(questionsWithAnswers);
        };
        fetchQuestions();
    }, []);

    return (
        <div className="mx-auto mt-10 p-10 border border-gray-300 rounded shadow">
            <h1 className="mb-4 text-xl">
                {questions[questionIndex]?.question}
            </h1>
            <div className="column-1 mb-10">
                {questions[questionIndex]?.answers.map((answer) => (
                    <AnswerButton
                        selected={selectedAnswer === answer.id}
                        text={answer.answer}
                        onClick={() => {
                            setSelectedAnswer(answer.id);
                        }}
                        key={answer.id}
                    />
                ))}
            </div>
            <progress value={ratio} />
            <div className="flex justify-end">
                <Button
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
