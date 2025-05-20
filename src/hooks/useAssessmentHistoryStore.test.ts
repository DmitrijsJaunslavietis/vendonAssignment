import { describe, expect, test } from "vitest";
import { useAssessmentHistoryStore } from "./useAssessmentHistoryStore";
import type { AssessmentInstance } from "../types/test.types";


describe("useAssessmentsHistoryStore", () => {
    test("should have initial state", () => {
        const store = useAssessmentHistoryStore.getState();
        expect(store.assessmentInstances).toEqual([]);
    });

    test("should set assessment instances", () => {
        const store = useAssessmentHistoryStore.getState();
        const assessmentInstance: AssessmentInstance = {
            id: "string",
            user: "test-user",
            assessmentId: 1,
            questions: [],
            finished: false
        };
        store.actions.setAssessmentInstances(assessmentInstance);
        const updatedStore = useAssessmentHistoryStore.getState();
        expect(updatedStore.assessmentInstances).toEqual([assessmentInstance]);
    });
    
    test("should update existing assessment instance", () => {
        const store = useAssessmentHistoryStore.getState();
        const assessmentInstance: AssessmentInstance = {
            id: "string",
            user: "test-user",
            assessmentId: 1,
            questions: [],
            finished: false
        };
        store.actions.setAssessmentInstances(assessmentInstance);
        const updatedStore = useAssessmentHistoryStore.getState();
        expect(updatedStore.assessmentInstances).toEqual([assessmentInstance]);

        const updatedAssessmentInstance: AssessmentInstance = {
            ...assessmentInstance,
            finished: true
        };
        store.actions.setAssessmentInstances(updatedAssessmentInstance);
        const finalStore = useAssessmentHistoryStore.getState();
        expect(finalStore.assessmentInstances).toEqual([updatedAssessmentInstance]);
    });

});