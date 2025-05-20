import { describe, expect, test } from "vitest";
import { useAssessmentInstanceStore } from "./useAssessmentInstanceStore";
import type { AssessmentInstance, Question } from "../types/test.types";

describe("useAssessmentInstanceStore", () => {
    test("should set current instance", () => {
        const setCurrentInstance =
            useAssessmentInstanceStore.getState().actions.setCurrentInstance;
        const instance: AssessmentInstance = {
            id: "string",
            user: "test-user",
            assessmentId: 1,
            questions: [],
            finished: false,
        };
        setCurrentInstance(instance);
        expect(useAssessmentInstanceStore.getState().currentInstance).toEqual(
            instance
        );
    });

    test("should set questions", () => {
        const setCurrentInstance =
            useAssessmentInstanceStore.getState().actions.setCurrentInstance;
        const instance: AssessmentInstance = {
            id: "string",
            user: "test-user",
            assessmentId: 1,
            questions: [],
            finished: false,
        };
        const questions: Question[] = [
            {
                id: 1,
                question: "Question 1",
                answers: [
                    { id: 1, answer: "Answer 1" },
                    { id: 2, answer: "Answer 2" },
                ],
            },
            {
                id: 2,
                question: "Question 2",
                answers: [
                    { id: 3, answer: "Answer 3" },
                    { id: 4, answer: "Answer 4" },
                ],
            },
        ];
        setCurrentInstance({ ...instance, questions });
        expect(
            useAssessmentInstanceStore.getState().currentInstance?.questions
        ).toEqual(questions);
    });

    test("should set answer", () => {
        const setAnswer =
            useAssessmentInstanceStore.getState().actions.setAnswer;
        const setCurrentInstance =
            useAssessmentInstanceStore.getState().actions.setCurrentInstance;
        const instance: AssessmentInstance = {
            id: "string",
            user: "test-user",
            assessmentId: 1,
            questions: [],
            finished: false,
        };
        const questions: Question[] = [
            {
                id: 1,
                question: "Question 1",
                answers: [
                    { id: 1, answer: "Answer 1" },
                    { id: 2, answer: "Answer 2" },
                ],
            },
            {
                id: 2,
                question: "Question 2",
                answers: [
                    { id: 3, answer: "Answer 3" },
                    { id: 4, answer: "Answer 4" },
                ],
            },
        ];
        setCurrentInstance({ ...instance, questions });
        setAnswer(1, 1);
        expect(
            useAssessmentInstanceStore.getState().currentInstance?.questions[0]
                .result
        ).toEqual({
            userAnswerId: 1,
        });
    });

    test("should reset passed assessment questions", () => {
        const resetPassedAssessmentQuestions =
            useAssessmentInstanceStore.getState().actions
                .resetPassedAssessmentQuestions;
        const setCurrentInstance =
            useAssessmentInstanceStore.getState().actions.setCurrentInstance;
        const instance: AssessmentInstance = {
            id: "string",
            user: "test-user",
            assessmentId: 1,
            questions: [],
            finished: false,
        };
        setCurrentInstance(instance);
        resetPassedAssessmentQuestions();
        expect(
            useAssessmentInstanceStore.getState().passedAssessmentQuestions
        ).toEqual(0);
    });

    test("should set correct answers", () => {
        const setCorrectAnswers =
            useAssessmentInstanceStore.getState().actions.setCorrectAnswers;
        const setCurrentInstance =
            useAssessmentInstanceStore.getState().actions.setCurrentInstance;
        const instance: AssessmentInstance = {
            id: "string",
            user: "test-user",
            assessmentId: 1,
            questions: [],
            finished: false,
        };
        const questions: Question[] = [
            {
                id: 1,
                question: "Question 1",
                result: {
                    userAnswerId: 2,
                },
                answers: [
                    { id: 1, answer: "Answer 1" },
                    { id: 2, answer: "Answer 2" },
                ],
            },
            {
                id: 2,
                question: "Question 2",
                result: {
                    userAnswerId: 3,
                },
                answers: [
                    { id: 3, answer: "Answer 3" },
                    { id: 4, answer: "Answer 4" },
                ],
            },
        ];
        setCurrentInstance({ ...instance, questions });
        const correctAnswers = [
            { questionId: 1, correctAnswerId: 1 },
            { questionId: 2, correctAnswerId: 3 },
        ];
        setCorrectAnswers(correctAnswers);
        expect(
            useAssessmentInstanceStore.getState().currentInstance?.questions[0]
                .result
        ).toEqual({
            userAnswerId: 2,
            correctAnswerId: 1,
        });
        expect(
            useAssessmentInstanceStore.getState().currentInstance?.questions[1]
                .result
        ).toEqual({
            userAnswerId: 3,
            correctAnswerId: 3,
        });
    });

    test("should increase passedAssessmentQuestions count", () => {
        const setAnswer =
            useAssessmentInstanceStore.getState().actions.setAnswer;
        const setCurrentInstance =
            useAssessmentInstanceStore.getState().actions.setCurrentInstance;
        const instance: AssessmentInstance = {
            id: "string",
            user: "test-user",
            assessmentId: 1,
            questions: [],
            finished: false,
        };
        const questions: Question[] = [
            {
                id: 1,
                question: "Question 1",
                answers: [
                    { id: 1, answer: "Answer 1" },
                    { id: 2, answer: "Answer 2" },
                ],
            },
            {
                id: 2,
                question: "Question 2",
                answers: [
                    { id: 3, answer: "Answer 3" },
                    { id: 4, answer: "Answer 4" },
                ],
            },
        ];
        setCurrentInstance({ ...instance, questions });
        setAnswer(1, 1);
        expect(
            useAssessmentInstanceStore.getState().passedAssessmentQuestions
        ).toEqual(1);
        setAnswer(2, 2);
        expect(
            useAssessmentInstanceStore.getState().passedAssessmentQuestions
        ).toEqual(2);
    });
});
