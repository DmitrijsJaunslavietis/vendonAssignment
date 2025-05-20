import { create } from "zustand";
import type { AssessmentInstance } from "../types/assessment.types";

interface useAssessmentHistoryStore {
    assessmentInstances: AssessmentInstance[] | [];
    actions: {
        setAssessmentInstances: (
            assessmentInstance: AssessmentInstance
        ) => void;
    };
}

export const useAssessmentHistoryStore = create<useAssessmentHistoryStore>(
    set => ({
        assessmentInstances: [],
        actions: {
            // Function to set assessment instances in the store
            // If the assessment instance already exists, it updates the instance
            // Otherwise, it adds the new instance to the list
            setAssessmentInstances: assessmentInstance => {
                set(state => {
                    const haveAssessmentInstance =
                        state.assessmentInstances.some(
                            instance => instance.id === assessmentInstance.id
                        );
                    if (!haveAssessmentInstance) {
                        return {
                            assessmentInstances: [
                                ...state.assessmentInstances,
                                assessmentInstance,
                            ],
                        };
                    }
                    return {
                        assessmentInstances: state.assessmentInstances.map(
                            instance => {
                                if (instance.id === assessmentInstance.id) {
                                    return {
                                        ...instance,
                                        ...assessmentInstance,
                                    };
                                }
                                return instance;
                            }
                        ),
                    };
                });
            },
        },
    })
);

export const useAssessmentHistory = () =>
    useAssessmentHistoryStore(state => state.assessmentInstances);
export const useAssessmentHistoryActions = () =>
    useAssessmentHistoryStore(state => state.actions);
