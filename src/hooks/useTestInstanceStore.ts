import { create } from "zustand";
import type { CorrectAnswer, Question, TestInstance } from "../types/test.types";


interface TestInstanceStore {
    currentInstance: TestInstance | undefined;
    actions: {
        setCurrentInstance: (instance: TestInstance | undefined) => void;
        setQuestions: (questions: Question[]) => void;
        setAnswer: (questionId: number, answer: number) => void;
        setCorrectAnswers: (correctAnswers: CorrectAnswer[]) => void;
    },
};

const useTestInstanceStore = create<TestInstanceStore>((set) => ({
    currentInstance: undefined,
    actions: {
        setCurrentInstance: (instance) => {
            set(() => ({ currentInstance: instance }));
        },
        setQuestions: (questions) => {
            set((state) => ({
                currentInstance: state.currentInstance
                    ? { ...state.currentInstance, questions }
                    : undefined,
            }));
        },
        setAnswer: (questionId, answer) => {
            set((state) => ({
                currentInstance: state.currentInstance
                    ? {
                        ...state.currentInstance,
                        questions: state.currentInstance.questions.map((question) => {
                            if (question.id === questionId) {
                                return {
                                    ...question,
                                    result: {
                                        userAnswerId: answer
                                    }
                                };
                            }
                            return question;
                        })
                    }
                    : undefined
            }));
        },
        setCorrectAnswers: (correctAnswers) => {
            set((state) => ({
                currentInstance: state.currentInstance
                    ? {
                        ...state.currentInstance,
                        finished: true,
                        questions: state.currentInstance.questions.map((question) => {
                            return {
                                ...question,
                                result: {
                                    userAnswerId: question.result?.userAnswerId ?? 0,
                                    correctAnswerId: correctAnswers.find((answer) => {
                                        return answer.questionId === question.id;
                                    })?.correctAnswerId
                                }
                            };
                        })
                    }
                    : undefined
            }));
        }
    },
}));

export const useCurrentTestInstance = () => useTestInstanceStore((state) => state.currentInstance);
export const useTestInstanceActions = () => useTestInstanceStore((state) => state.actions);
