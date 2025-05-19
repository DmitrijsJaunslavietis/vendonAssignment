import { useCallback, useEffect, useMemo, useState } from "react";
import data from "../../mockTests/tests.json";
import { useNavigate, useParams } from "react-router";
import type { Question } from "../../types/test.types";
import {
    useCurrentTestInstance,
    usePassedTestQuestions,
    useTestInstanceActions,
} from "../../hooks/useTestInstanceStore";
import { TestInstance } from "./TestInstance";

export const TestInstancePage = () => {
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
    const questions = useMemo(
        () => testInstance?.questions ?? [],
        [testInstance]
    );
    const ratio = useMemo(() => {
        if (!testInstance) return 0;
        const { questions } = testInstance;
        return passedTestQuestions / questions.length;
    }, [passedTestQuestions, testInstance]);

    const submitAnswerHandle = useCallback(() => {
        if (selectedAnswer && testInstance) {
            setAnswer(questions[questionIndex].id, selectedAnswer);
            setSelectedAnswer(undefined);
        }
    }, [questionIndex, selectedAnswer, setAnswer, testInstance, questions]);

    const submitTestHandle = useCallback(() => {
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
        setCorrectAnswers(correctAnswers);
        navigate(`/test-instance/${instanceId}/end`);
    }, [
        instanceId,
        navigate,
        setCorrectAnswers,
        testInstance,
        submitAnswerHandle,
    ]);

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
        <TestInstance
            questions={questions}
            questionIndex={questionIndex}
            setQuestionIndex={setQuestionIndex}
            selectedAnswer={selectedAnswer}
            setSelectedAnswer={setSelectedAnswer}
            submitAnswerHandle={submitAnswerHandle}
            submitTestHandle={submitTestHandle}
            ratio={ratio}
        />
    );
};
