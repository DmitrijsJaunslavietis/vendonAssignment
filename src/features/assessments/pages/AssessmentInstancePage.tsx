import { useCallback, useEffect, useMemo, useState } from "react";
import data from "../../../mockAssessments/assessments.json";
import { useNavigate } from "react-router";
import type { Question } from "../../../types/test.types";
import { AssessmentInstanceView } from "../views/AssessmentInstanceView";
import {
    useCurrentAssessmentInstance,
    usePassedAssessmentQuestions,
    useAssessmentInstanceActions,
} from "../../../hooks/useAssessmentInstanceStore";

export const AssessmentInstancePage = () => {
    const navigate = useNavigate();
    const currentInstance = useCurrentAssessmentInstance();
    const passedAssessmentQuestions = usePassedAssessmentQuestions();
    const { setAnswer, setCorrectAnswers, setCurrentInstance } =
        useAssessmentInstanceActions();
    const [questionIndex, setQuestionIndex] = useState<number>(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | undefined>(
        undefined
    );

    //getting questions from currentInstance. useMemo is used to avoid unnecessary recalculations
    const questions = useMemo(
        () => currentInstance?.questions ?? [],
        [currentInstance]
    );
    //ratio is used to show progress bar. useMemo is used to avoid unnecessary recalculations
    const ratio = useMemo(() => {
        if (!currentInstance) return 0;
        const { questions } = currentInstance;
        return (passedAssessmentQuestions + 1) / questions.length;
    }, [passedAssessmentQuestions, currentInstance]);

    //answer is set in currentInstance store and removewd from local state, before next question is shown
    const submitAnswerHandle = useCallback(() => {
        if (selectedAnswer && currentInstance) {
            setAnswer(questions[questionIndex].id, selectedAnswer);
            setSelectedAnswer(undefined);
        }
    }, [questionIndex, selectedAnswer, setAnswer, currentInstance, questions]);

    //submitAssessmentHandle is used to submit assessment and get correct answers from API
    //correct answers goes to currentInstance store, where they are used to calculate score
    //if all goes well, user is redirected to end page
    const submitAssessmentHandle = useCallback(() => {
        submitAnswerHandle();
        const assessmentId = currentInstance?.assessmentId;
        //get correct answers from API
        const correctAnswers = data
            .find(assessment => assessment.id === assessmentId)
            ?.questions.map(question => ({
                correctAnswerId:
                    question.answers.find(answer => answer.isCorrect)?.id ?? 0,
                questionId: question.id,
            }));
        // API call end
        if (!correctAnswers) return;
        if (correctAnswers?.some(answer => answer.correctAnswerId === 0)) {
            //unexpected ERROR
            navigate(-1);
            return;
        }
        setCorrectAnswers(correctAnswers);
        navigate(`/assessment-instance/end`);
    }, [navigate, setCorrectAnswers, currentInstance, submitAnswerHandle]);

    //useEffect to fetch questions from API by assessmentId
    //questions are set in currentInstance store, where they are used to show questions and answers
    //if assessment is finished, user is redirected to previous page
    //answers dont have correct answer flag to prevent user from seeing them (for hackermans in dev tools)
    useEffect(() => {
        const fetchQuestions = () => {
            if (!currentInstance) return;
            if (currentInstance.finished) {
                navigate(-1);
                return;
            }
            const { assessmentId } = currentInstance;
            // API call by assessmentId start
            let questionsWithAnswers: Question[] | [] = [];
            const questionsData = data.find(
                assessment => assessment.id === assessmentId
            )?.questions;
            if (questionsData) {
                questionsWithAnswers = questionsData.map(question => ({
                    id: question.id,
                    question: question.question,
                    answers: question.answers.map(answer => ({
                        id: answer.id,
                        answer: answer.answer,
                    })),
                }));
            }
            // API call by assessmentId end

            setCurrentInstance({
                ...currentInstance,
                questions: questionsWithAnswers,
            });
        };
        fetchQuestions();
    }, []);

    return (
        <AssessmentInstanceView
            questions={questions}
            questionIndex={questionIndex}
            setQuestionIndex={setQuestionIndex}
            selectedAnswer={selectedAnswer}
            setSelectedAnswer={setSelectedAnswer}
            submitAnswerHandle={submitAnswerHandle}
            submitAssessmentHandle={submitAssessmentHandle}
            ratio={ratio}
        />
    );
};
