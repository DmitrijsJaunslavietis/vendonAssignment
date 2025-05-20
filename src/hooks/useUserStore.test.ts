import { describe, expect, test } from "vitest";
import { useUserStore } from "./useUserStore";

describe("useUserStore", () => {
    test("should set user correctly", () => {
        const { setUser } = useUserStore.getState();
        setUser("John Doe");
        const newState = useUserStore.getState();
        expect(newState.user).toBe("John Doe");
    });

    test("should return undefined if no user is set", () => {
        const { user } = useUserStore.getState();
        expect(user).toBeUndefined();
    });
});