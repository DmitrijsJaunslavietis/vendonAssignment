import { create } from "zustand";
import type { TestInstance } from "../types/test.types";

interface TestsHistoryStore {
    testInstances: TestInstance[] | [];
    setTestInstances: (testInstance: TestInstance[]) => void;
}

const useTestsHistoryStore = create<TestsHistoryStore>((set) => ({
    testInstances: [],
    setTestInstances: (testInstances) => {
        set(() => ({ testInstances }));
    }
}));

export const useTestInstancesHistory = () => useTestsHistoryStore((state) => state.testInstances);