import { useEffect, useState } from "react";
import data from "../../mockTests/tests.json";
import {
    useQuestions,
    useTestInstances,
    useTestsActions,
} from "../../hooks/useTestsStore";
import { useNavigate, useParams } from "react-router";
import type {
    QuestionWithAnswers,
} from "../../types/test.types";

export const TestInstance = () => {
    const navigate = useNavigate();
    const { instanceId } = useParams();
    const questions = useQuestions();
    const testInstances = useTestInstances();
    const {
        setQuestions,
        setAnswer,
        setCorrectAnswers,
        getCurrentTestInstance,
    } = useTestsActions();
    const [questionIndex, setQuestionIndex] = useState<number>(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | undefined>(
        undefined
    );

    const submitTestHandle = () => {
        submitAnswerHandle();
        if (!instanceId) return;
        //get correct answers from API
        const testId = testInstances.find(
            (instance) => instance.id === instanceId
        )?.testId;
        const correctAnswers = data
            .find((test) => test.id === testId)
            ?.questions.map((question) => ({
                correctAnswerId: question.answers.find(
                    (answer) => answer.isCorrect
                )?.id ?? 0,
                questionId: question.id,
            }));
        // API call end
        if (!correctAnswers) return;
        if (correctAnswers?.some((answer) => answer.correctAnswerId === 0)) {
            //unexpected ERROR
            navigate(-1);
            return;
        }
        setCorrectAnswers(instanceId, correctAnswers);
        navigate(`/test-instance/${instanceId}/end`);
    };

    const submitAnswerHandle = () => {
        if (selectedAnswer && instanceId) {
            const answer = questions[questionIndex].answers.find(
                (answer) => answer.id === selectedAnswer
            );
            if (!answer) return;
            setAnswer(instanceId, {
                id: selectedAnswer,
                questionId: questions[questionIndex].id,
                answer: answer.answer,
                userAnswerId: selectedAnswer,
            });
        }
    };

    useEffect(() => {
        const fetchQuestions = () => {
            if (!instanceId) return;
            const currentTestInstance = getCurrentTestInstance(instanceId);
            if (!currentTestInstance) return;
            if (currentTestInstance.finished) {
                navigate(-1);
                return;
            };
            const { testId } = currentTestInstance;
            // API call by testId start
            let questionsWithAnswers: QuestionWithAnswers[] | [] = [];
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
    }, [setQuestions]);

    return (
        <div>
            <h1>{questions[questionIndex]?.question}</h1>
            {questions[questionIndex]?.answers.map((answer) => (
                <div key={answer.id}>
                    <input
                        type="radio"
                        name="answer"
                        value={answer.answer}
                        onChange={() => {
                            setSelectedAnswer(answer.id);
                        }}
                        checked={answer.id === selectedAnswer}
                    />
                    <label htmlFor={answer.answer}>{answer.answer}</label>
                </div>
            ))}
            <button
                onClick={() => {
                    if (questionIndex < questions.length - 1) {
                        submitAnswerHandle();
                        setQuestionIndex(questionIndex + 1);
                    } else {
                        submitTestHandle();
                    }
                }}
            >
                {questionIndex < questions.length - 1
                    ? "Next Question"
                    : "Finish Test"}
            </button>
        </div>
    );
};
