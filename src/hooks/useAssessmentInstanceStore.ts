import { create } from "zustand";
import type { CorrectAnswer, Question, AssessmentInstance } from "../types/test.types";


interface useAssessmentInstanceStore {
    currentInstance: AssessmentInstance | undefined;
    passedAssessmentQuestions: number;
    actions: {
        setCurrentInstance: (instance: AssessmentInstance | undefined) => void;
        setQuestions: (questions: Question[]) => void;
        setAnswer: (questionId: number, answer: number) => void;
        setCorrectAnswers: (correctAnswers: CorrectAnswer[]) => void;
    },
};

//logic for managing the state of a assessment instance
const useAssessmentInstanceStore = create<useAssessmentInstanceStore>((set) => ({
    currentInstance: undefined,
    passedAssessmentQuestions: 0,
    actions: {
        setCurrentInstance: (instance) => {
            set(() => ({ currentInstance: instance }));
        },
        setQuestions: (questions) => {
            set((state) => ({
                passedAssessmentQuestions: 0,
                currentInstance: state.currentInstance
                    ? { ...state.currentInstance, questions }
                    : undefined,
            }));
        },
        //sets user answer for question
        //answer is stored in current instances questions array question object as result
        setAnswer: (questionId, answer) => {
            set((state) => ({
                passedAssessmentQuestions: state.passedAssessmentQuestions + 1,
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
        //sets correct answers for questions in the end of the assessment
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

export const useCurrentAssessmentInstance = () => useAssessmentInstanceStore((state) => state.currentInstance);
export const usePassedAssessmentQuestions = () => useAssessmentInstanceStore((state) => state.passedAssessmentQuestions);
export const useAssessmentInstanceActions = () => useAssessmentInstanceStore((state) => state.actions);
