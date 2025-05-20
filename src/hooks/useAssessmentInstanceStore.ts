import { create } from "zustand";
import type { CorrectAnswer, AssessmentInstance } from "../types/assessment.types";

interface useAssessmentInstanceStore {
    currentInstance: AssessmentInstance | undefined;
    passedAssessmentQuestions: number;
    actions: {
        resetPassedAssessmentQuestions: () => void;
        setCurrentInstance: (instance: AssessmentInstance | undefined) => void;
        setAnswer: (questionId: number, answer: number) => void;
        setCorrectAnswers: (correctAnswers: CorrectAnswer[]) => void;
    };
}

//logic for managing the state of a assessment instance
export const useAssessmentInstanceStore = create<useAssessmentInstanceStore>(
    set => ({
        currentInstance: undefined,
        passedAssessmentQuestions: 0,
        actions: {
            resetPassedAssessmentQuestions: () => {
                set(() => ({ passedAssessmentQuestions: 0 }));
            },
            setCurrentInstance: instance => {
                set(() => ({ currentInstance: instance }));
            },
            //sets user answer for question
            //answer is stored in current instances questions array question object as result
            setAnswer: (questionId, answer) => {
                set(state => ({
                    passedAssessmentQuestions:
                        state.passedAssessmentQuestions + 1,
                    currentInstance: state.currentInstance
                        ? {
                              ...state.currentInstance,
                              questions: state.currentInstance.questions.map(
                                  question => {
                                      if (question.id === questionId) {
                                          return {
                                              ...question,
                                              result: {
                                                  userAnswerId: answer,
                                              },
                                          };
                                      }
                                      return question;
                                  }
                              ),
                          }
                        : undefined,
                }));
            },
            //sets correct answers for questions in the end of the assessment
            setCorrectAnswers: correctAnswers => {
                set(state => ({
                    currentInstance: state.currentInstance
                        ? {
                              ...state.currentInstance,
                              finished: true,
                              questions: state.currentInstance.questions.map(
                                  question => {
                                      return {
                                          ...question,
                                          result: {
                                              userAnswerId:
                                                  question.result
                                                      ?.userAnswerId ?? 0,
                                              correctAnswerId:
                                                  correctAnswers.find(
                                                      answer => {
                                                          return (
                                                              answer.questionId ===
                                                              question.id
                                                          );
                                                      }
                                                  )?.correctAnswerId,
                                          },
                                      };
                                  }
                              ),
                          }
                        : undefined,
                }));
            },
        },
    })
);

export const useCurrentAssessmentInstance = () =>
    useAssessmentInstanceStore(state => state.currentInstance);
export const usePassedAssessmentQuestions = () =>
    useAssessmentInstanceStore(state => state.passedAssessmentQuestions);
export const useAssessmentInstanceActions = () =>
    useAssessmentInstanceStore(state => state.actions);
