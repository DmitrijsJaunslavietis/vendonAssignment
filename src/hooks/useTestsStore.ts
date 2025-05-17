import { create } from "zustand";
import type { TestInstance, Test, QuestionWithAnswers, UserAnswer, CorrectAnswer } from "../types/test.types";

interface TestsStore {
    testInstances: TestInstance[] | [];
    tests: Test[] | [];
    questions: QuestionWithAnswers[] | [];
    actions: {
        addTestInstance: (testInstance: TestInstance) => void;
        setTestInsances: (testInstances: TestInstance[]) => void;
        setTests: (tests: Test[]) => void;
        setQuestions: (questions: QuestionWithAnswers[]) => void;
        setCorrectAnswers: (testInstanceId: string, correctAnswers: CorrectAnswer[]) => void;
        setAnswer: (testInstanceId: string, answer: UserAnswer) => void;
        getCurrentTestInstance: (testInstanceId: string) => TestInstance | undefined;
    };
}

const useTestsStore = create<TestsStore>((set) => ({
    testInstances: [],
    currentTestInstance: undefined,
    tests: [],
    questions: [],
    actions: {
        addTestInstance: (testInstance) => {
            set((state) => ({
                testInstances: [...state.testInstances, testInstance],
            }));
        },
        setTestInsances: (testInstances) => {
            set(() => ({ testInstances }));
        },
        setTests: (tests) => {
            set(() => ({ tests }));
        },
        setQuestions: (questions) => {
            set(() => ({ questions }));
        },
        setCorrectAnswers: (testInstanceId, correctAnswers) => {
            set((state) => {
                const updatedTestInstances = state.testInstances.map((instance) => {
                    if (instance.id === testInstanceId) {
                        return {
                            ...instance,
                            finished: true,
                            answers: instance.answers.map((answer) =>({
                                ...answer,
                                correctAnswerId: correctAnswers.find(
                                    (correctAnswer) => correctAnswer.questionId === answer.questionId
                                )?.correctAnswerId,
                            })),
                        };
                    }
                    return instance;
                });
                return { testInstances: updatedTestInstances };
            });
        },
        setAnswer: (testInstanceId, answer) => {
            set((state) => ({
                testInstances: state.testInstances.map((instance) => {
                    if (instance.id === testInstanceId) {
                        return {
                            ...instance,
                            answers: [...instance.answers, answer],
                        };
                    }
                    return instance;
                })
            }));
        },
        getCurrentTestInstance: (testInstanceId): TestInstance | undefined => {
            const testInstance = useTestsStore.getState().testInstances.find(
                (instance) => instance.id === testInstanceId
            );
            return testInstance;
        }
    }
}));

export const useQuestions = () => useTestsStore((state) => state.questions);
export const useTests = () => useTestsStore((state) => state.tests);
export const useTestInstances = () => useTestsStore((state) => state.testInstances);
export const useTestsActions = () => useTestsStore((state) => state.actions);