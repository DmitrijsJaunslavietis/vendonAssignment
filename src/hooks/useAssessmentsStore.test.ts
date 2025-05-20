import { describe, expect, test } from "vitest";
import { useAssessmentsStore } from "./useAssessmentsStore";

describe("useAssessmentsStore", () => {
    test("should have initial state", () => {
        const store = useAssessmentsStore.getState();
        expect(store.assessments).toEqual([]);
    });

    test("should set assessments", () => {
        const store = useAssessmentsStore.getState();
        const assessments = [{ id: 1, name: "Test 1" }];
        store.actions.setAssessments(assessments);
        const updatedStore = useAssessmentsStore.getState();
        expect(updatedStore.assessments).toEqual(assessments);
    });

    test("should set assessments to empty array", () => {
        const store = useAssessmentsStore.getState();
        store.actions.setAssessments([]);
        const updatedStore = useAssessmentsStore.getState();
        expect(updatedStore.assessments).toEqual([]);
    });
});
