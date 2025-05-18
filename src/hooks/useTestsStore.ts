import { create } from "zustand";
import type { Test } from "../types/test.types";

interface TestsStore {
    tests: Test[] | [];
    actions: {
        setTests: (tests: Test[]) => void;
    };
}

const useTestsStore = create<TestsStore>((set) => ({
    tests: [],
    actions: {
        setTests: (tests) => {
            set(() => ({ tests }));
        },
    }
}));

export const useTests = () => useTestsStore((state) => state.tests);
export const useTestsActions = () => useTestsStore((state) => state.actions);