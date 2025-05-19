import { create } from "zustand";
import type { TestInstance } from "../types/test.types";

interface TestsHistoryStore {
    testInstances: TestInstance[] | [];
    actions: {
        setTestInstances: (testInstance: TestInstance) => void;
    }
}

const useTestsHistoryStore = create<TestsHistoryStore>((set) => ({
    testInstances: [],
    actions: {
        // Function to set test instances in the store
        // If the test instance already exists, it updates the instance
        // Otherwise, it adds the new instance to the list
        setTestInstances: (testInstance) => {
            set((state) => {
                const haveTestInstance = state.testInstances.some((instance) => instance.id === testInstance.id);
                if (!haveTestInstance) {
                    return { testInstances: [...state.testInstances, testInstance] };
                }
                return {
                    testInstances: state.testInstances.map((instance) => {
                        if (instance.id === testInstance.id) {
                            return {
                                ...instance,
                                ...testInstance,
                            };
                        }
                        return instance;
                    })
                };
            });
        }
    }
}));

export const useTestsHistory = () => useTestsHistoryStore((state) => state.testInstances);
export const useTestsHistoryActions = () => useTestsHistoryStore((state) => state.actions);
