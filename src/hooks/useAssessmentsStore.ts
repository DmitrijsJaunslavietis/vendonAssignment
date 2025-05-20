import { create } from "zustand";
import type { Assessment } from "../types/test.types";

interface useAssessmentsStore {
    assessments: Assessment[] | [];
    actions: {
        setAssessments: (tests: Assessment[]) => void;
    };
}

export const useAssessmentsStore = create<useAssessmentsStore>((set) => ({
    assessments: [],
    actions: {
        setAssessments: (assessments) => {
            set(() => ({ assessments }));
        },
    }
}));

export const useAssessments = () => useAssessmentsStore((state) => state.assessments);
export const useAssessmentsActions = () => useAssessmentsStore((state) => state.actions);